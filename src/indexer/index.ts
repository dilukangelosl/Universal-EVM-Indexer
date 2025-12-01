import { BlockFetcher, BlockFetcherConfig } from '../fetcher/index.js';
import { BlockProcessor } from '../processor/block-parser.js';
import { OneBlockWriter, OneBlockMeta } from '../storage/one-block-writer.js';
import { BlockMerger } from '../storage/merger.js';
import { S3Uploader, S3Config } from '../storage/s3-client.js';
import { StateBackupService } from '../storage/state-backup.js';
import { IndexManager } from '../storage/leveldb/client.js';
import { sf } from '../proto/compiled.js';
import { Logger } from 'pino';
import { unlink } from 'fs/promises';
import { AsyncQueue } from '../utils/queue.js';
import Long from 'long';

const { Block } = sf.apechain.type.v1;
type Block = sf.apechain.type.v1.Block;

export interface IndexerConfig {
  chain: {
    chainId: number;
    rpcEndpoints: string[];
    startBlock: number;
    blockTimeMs: number;
  };
  indexer: {
    batchSize: number;
    processingBatchSize: number;
    bundleSize?: number; // Number of blocks per merged bundle file
    maxConcurrentBatches: number;  // How many RPC batches in flight
    pollIntervalMs: number;
    checkpointIntervalBlocks: number;
    mergePartialBundles: boolean;
    backupIntervalMs?: number;
  };
  storage: {
    dataDir: string;
    oneBlocksDir: string;
    leveldbPath: string;
  };
  s3: S3Config;
}

export class UniversalIndexer {
  private uploadQueue = new AsyncQueue(2); 
  private indexQueue = new AsyncQueue(1);
  private isShuttingDown = false;
  private backupService: StateBackupService;

  constructor(
    private fetcher: BlockFetcher,
    private processor: BlockProcessor,
    private oneBlockWriter: OneBlockWriter,
    private merger: BlockMerger,
    private s3Uploader: S3Uploader,
    private indexManager: IndexManager,
    private config: IndexerConfig,
    private logger: Logger
  ) {
      this.backupService = new StateBackupService(config.s3, logger);
  }
  
  async init() {
      // Restore state from S3 if local DB is effectively empty or missing
      try {
          // We must close DB before restoring because restore replaces files
          await this.indexManager.close();
          
          // Attempt restore
          const restored = await this.backupService.restore(this.config.storage.leveldbPath);
          
          // Re-open DB by creating a new instance or if we could re-open
          // Since we injected indexManager, we can't easily replace the instance reference held by others?
          // Actually, CLI holds it.
          // Ideally IndexManager should support re-opening. 
          // Since I haven't added open() to IndexManager yet, I will rely on the fact that `new Level()` inside it 
          // might need to be re-initialized.
          // BUT: `level` instances auto-open. If we closed it, we need to call open().
          // I will add open() to IndexManager. (I will do this in next step).
          // For now, assume it exists or I'll add it.
          // If I don't, standard `level` might auto-open on next operation? No, if closed, must open.
          
          await this.indexManager.open();
      } catch (e: any) {
          this.logger.error(`State restore failed: ${e.message}`);
          // Try to re-open anyway
          try {
              await this.indexManager.open(); 
          } catch {}
      }

      await this.merger.init();
      await this.s3Uploader.init();
      
      // Register shutdown handler
      process.on('SIGINT', () => this.shutdown());
      process.on('SIGTERM', () => this.shutdown());
  }
  
  async shutdown() {
      if (this.isShuttingDown) return;
      this.isShuttingDown = true;
      this.logger.info('Shutting down... waiting for pending operations');
      
      // Wait for queues to drain
      this.logger.info(`Waiting for ${this.uploadQueue.pending} uploads and ${this.indexQueue.pending} index operations...`);
      
      await this.uploadQueue.onIdle();
      await this.indexQueue.onIdle();

      // Wait for any final cleanup
      await new Promise(r => setTimeout(r, 1000));
      
      try {
          // Backup state on shutdown
          this.logger.info('Closing database and performing backup...');
          await this.indexManager.close();
          await this.backupService.backup(this.config.storage.leveldbPath);
      } catch (e: any) {
          this.logger.error(`Backup on shutdown failed: ${e.message}`);
      }
  }

  async startHistoricalIndexing(fromBlock?: number): Promise<void> {
    const state = await this.indexManager.getState();
    let startBlock = fromBlock;
    if (startBlock === undefined) {
        startBlock = (state?.lastMergedBlock ?? 0) + 1;
        if (state?.lastMergedBlock === undefined && this.config.chain.startBlock > 0) {
            startBlock = this.config.chain.startBlock;
        }
    }
    
    const chainHead = await this.fetcher.getChainHead();
    this.logger.info(`Starting historical indexing from ${startBlock} to ${chainHead}`);
    
    let currentFetchBlock = startBlock;
    
    // Pipeline buffer
    const targetBuffer = this.config.indexer.processingBatchSize || 100;
    const concurrency = Math.ceil(targetBuffer / this.config.indexer.batchSize);
    // Bundle size handling
    const bundleSize = this.config.indexer.bundleSize || 100;
    
    this.logger.info(`Pipeline configured: Buffer ${targetBuffer} blocks (${concurrency} concurrent batches of ${this.config.indexer.batchSize}). Merging ${bundleSize} blocks/bundle.`);

    const pendingProcessing: Promise<OneBlockMeta[]>[] = [];
    let pendingMeta: OneBlockMeta[] = [];
    
    // ETA Tracking
    const startTime = Date.now();
    let totalProcessed = 0;
    let lastLogTime = Date.now();
    let lastBackupTime = Date.now();
    const backupInterval = this.config.indexer.backupIntervalMs || 15 * 60 * 1000; // Default 15 mins

    // Main Orchestration Loop
    while (currentFetchBlock <= chainHead && !this.isShuttingDown) {
        
        // 0. Check Scheduled Backup
        if (Date.now() - lastBackupTime > backupInterval) {
            await this.performScheduledBackup();
            lastBackupTime = Date.now();
        }

        // 1. Check Backpressure (S3 Uploads)
        if (this.uploadQueue.pending > 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            continue; // Re-check loop
        }

        // 1. Fill Fetch Queue
        while (pendingProcessing.length < concurrency && currentFetchBlock <= chainHead) {
            const batchEnd = Math.min(currentFetchBlock + this.config.indexer.batchSize - 1, chainHead);
            
            this.logger.debug(`Queueing fetch ${currentFetchBlock}-${batchEnd}`);
            const task = this.fetchAndProcessBatch(currentFetchBlock, batchEnd);
            pendingProcessing.push(task);
            
            currentFetchBlock = batchEnd + 1;
        }
        
        if (pendingProcessing.length === 0) break;
        
        // 2. Wait for oldest batch
        try {
            const metas = await pendingProcessing.shift()!; 
            pendingMeta.push(...metas);
            
            // Update metrics
            totalProcessed += metas.length;
            
            // Log ETA every 10 seconds
            if (Date.now() - lastLogTime > 10000) {
                const elapsed = (Date.now() - startTime) / 1000;
                const bps = elapsed > 0 ? totalProcessed / elapsed : 0;
                const remaining = chainHead - (!pendingMeta.length ? currentFetchBlock : parseMetaBlock(pendingMeta[pendingMeta.length-1]));
                const etaSeconds = bps > 0 ? remaining / bps : 0;
                
                const eta = formatDuration(etaSeconds); // HH:MM:SS or Xh Ym
                
                this.logger.info({
                    timestmap: new Date().toISOString(),
                    progress: `${totalProcessed} blocks processed`,
                    rate: `${bps.toFixed(1)} bps`,
                    remaining: `${remaining} blocks`,
                    ETA: eta
                }, "Sync Progress");
                
                lastLogTime = Date.now();
            }
            
            // 3. Check for Merge
            while (pendingMeta.length >= bundleSize) {
                const chunk = pendingMeta.splice(0, bundleSize);
                await this.mergeAndUpload(chunk);
            }
            
            await this.indexManager.checkpoint(parseMetaBlock(pendingMeta[pendingMeta.length-1] || metas[metas.length-1]), pendingMeta.length);

        } catch (e: any) {
            this.logger.error(`Pipeline error: ${e.message}`);
            throw e; 
        }
    }
    
    // Drain remaining
    while (pendingProcessing.length > 0) {
        const metas = await pendingProcessing.shift()!;
        pendingMeta.push(...metas);
        while (pendingMeta.length >= bundleSize) {
            await this.mergeAndUpload(pendingMeta.splice(0, bundleSize));
        }
    }
    
    this.logger.info(`Historical indexing complete up to block ${chainHead}`);
  }
  
  private async fetchAndProcessBatch(start: number, end: number): Promise<OneBlockMeta[]> {
      const blocks = await this.fetcher.fetchBlockRange(start, end);
      
      const writePromises = blocks.map(async (b) => {
          const block = this.processor.processBlock(b);
          const meta = await this.oneBlockWriter.writeOneBlock(block);
          return meta;
      });
      
      return Promise.all(writePromises);
  }
  
  private async mergeAndUpload(oneBlocks: OneBlockMeta[]): Promise<void> {
    if (oneBlocks.length === 0) return;
    const startBlock = oneBlocks[0].blockNumber;
    const endBlock = oneBlocks[oneBlocks.length - 1].blockNumber;
    
    this.logger.info(`Merging bundle ${startBlock}-${endBlock}`);

    const blockPromises = oneBlocks.map(async (meta) => {
       const buffer = await Bun.file(meta.localPath).arrayBuffer();
       return Block.decode(new Uint8Array(buffer));
    });
    const blocks = await Promise.all(blockPromises);
    
    const bundle = await this.merger.mergeBundles(startBlock, oneBlocks, blocks);
    
    this.uploadQueue.add(async () => {
        try {
            const isLocalMode = this.config.s3.endpoint?.startsWith('file://');
            const hasCreds = !!(this.config.s3.accessKeyId && this.config.s3.secretAccessKey);

            if (!hasCreds && !isLocalMode) {
                 this.logger.warn("Skipping S3 upload (no credentials and not local mode)");
            } else {
                 bundle.s3Key = await this.s3Uploader.uploadMergedBlock(bundle);
            }
            
            this.indexQueue.add(async () => {
                await this.indexManager.updateIndexes(bundle, blocks);
                this.logger.info(`Indexed bundle ${bundle.startBlock}-${bundle.endBlock} (saved to state)`);
            });
            
            await Promise.all(oneBlocks.map(m => unlink(m.localPath).catch(() => {})));
            
        } catch (e: any) {
            this.logger.error(`Upload/Index pipeline failed for ${startBlock}: ${e.message}`);
        }
    });
  }
  
  async startLiveIndexing(): Promise<void> {
      if (this.isShuttingDown) return;

      const state = await this.indexManager.getState();
      let lastProcessedBlock = state?.lastProcessedBlock ?? this.config.chain.startBlock - 1;
      
      this.logger.info(`Starting live indexing from block ${lastProcessedBlock + 1}`);
      
      const pendingOneBlocks: OneBlockMeta[] = [];
      const bundleSize = this.config.indexer.bundleSize || 100;
      let lastBackupTime = Date.now();
      const backupInterval = this.config.indexer.backupIntervalMs || 15 * 60 * 1000;

      while (!this.isShuttingDown) {
        try {
            if (Date.now() - lastBackupTime > backupInterval) {
                await this.performScheduledBackup();
                lastBackupTime = Date.now();
            }

            const chainHead = await this.fetcher.getChainHead();
            
            if (lastProcessedBlock >= chainHead) {
                await new Promise(resolve => setTimeout(resolve, this.config.indexer.pollIntervalMs));
                continue;
            }
            
            const endBlock = Math.min(chainHead, lastProcessedBlock + this.config.indexer.processingBatchSize);
            if (lastProcessedBlock + 1 > endBlock) continue;
  
            const fetchedBlocks = await this.fetcher.fetchBlockRange(lastProcessedBlock + 1, endBlock);
            
            const writePromises = fetchedBlocks.map(async (fetched) => {
              const block = this.processor.processBlock(fetched);
              return {
                  meta: await this.oneBlockWriter.writeOneBlock(block),
                  blockNumber: parseMetaBlockWithBlock(block)
              };
            });
            
            const results = await Promise.all(writePromises);
            
            for (const res of results) {
                pendingOneBlocks.push(res.meta);
                lastProcessedBlock = res.blockNumber;
            }
            
            while (pendingOneBlocks.length >= bundleSize) {
              const toMerge = pendingOneBlocks.splice(0, bundleSize);
              await this.mergeAndUpload(toMerge);
            }
            
            await this.indexManager.checkpoint(lastProcessedBlock, pendingOneBlocks.length);
            
        } catch (error: any) {
            this.logger.error(`Error in live indexing loop: ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, this.config.indexer.pollIntervalMs));
        }
      }
  }

  private async performScheduledBackup() {
      this.logger.info("Performing scheduled state backup...");
      
      // Drain queues to ensure DB consistency
      this.logger.info(`Waiting for queues to drain (${this.uploadQueue.pending} uploads, ${this.indexQueue.pending} writes)...`);
      await this.uploadQueue.onIdle();
      await this.indexQueue.onIdle();
      
      try {
          this.logger.info("Closing database for backup...");
          await this.indexManager.close();
          
          await this.backupService.backup(this.config.storage.leveldbPath);
          
          this.logger.info("Re-opening database...");
          await this.indexManager.open();
          this.logger.info("Scheduled backup complete. Resuming indexing.");
          
      } catch (e: any) {
          this.logger.error(`Scheduled backup failed: ${e.message}`);
          // Try to re-open if it failed closed
          try { await this.indexManager.open(); } catch {}
      }
  }
}

function parseMetaBlock(meta: OneBlockMeta): number {
    return meta.blockNumber;
}

function parseMetaBlockWithBlock(block: Block): number {
    if (typeof block.number === 'number') return block.number;
    return (block.number as Long).toNumber();
}

function formatDuration(seconds: number): string {
    if (seconds === Infinity || isNaN(seconds)) return 'Unknown';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${Math.round(seconds % 60)}s`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ${minutes % 60}m`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h ${minutes % 60}m`;
}
