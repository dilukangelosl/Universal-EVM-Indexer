import { IndexManager } from '../storage/leveldb/client.js';
import { S3Uploader } from '../storage/s3-client.js';
import { DbinFormatter } from '../proto/dbin.js';
import { sf } from '../proto/compiled.js';
import { MergedRangeIndex, ContractIndex, IndexerState } from '../storage/leveldb/types.js';
import { LRUCache } from 'lru-cache';
import { bytesToHex } from '../utils/bytes.js';

const { Block } = sf.apechain.type.v1;
type Block = sf.apechain.type.v1.Block;
type ILog = sf.apechain.type.v1.ILog;

export interface QueryService {
  // Block queries
  getBlock(blockNumber: number): Promise<Block>;
  getBlockRange(start: number, end: number): Promise<Block[]>;
  
  // Contract queries  
  getContract(address: string): Promise<ContractIndex | null>;
  
  // Event queries
  getEventsForContract(
    address: string,
    options?: { startBlock?: number; endBlock?: number; topics?: string[] }
  ): Promise<ILog[]>;
  
  // Index management
  getIndexerState(): Promise<IndexerState | null>;
}

export class QueryServiceImpl implements QueryService {
  private formatter: DbinFormatter;
  private cache: LRUCache<string, Block[]>;

  constructor(
    private indexManager: IndexManager,
    private s3Uploader: S3Uploader,
    cacheMaxEntries: number = 100,
    formatter?: DbinFormatter
  ) {
    this.formatter = formatter || new DbinFormatter();
    this.cache = new LRUCache<string, Block[]>({
        max: cacheMaxEntries
    });
  }
  
  async init() {
     if (!this.formatter['zstd']) {
         await this.formatter.init();
     }
  }
  
  async getBlock(blockNumber: number): Promise<Block> {
    const s3Key = await this.indexManager.getS3KeyForBlock(blockNumber);
    if (!s3Key) throw new Error(`Block ${blockNumber} not indexed`);
    
    const blocks = await this.loadMergedBlocksCached(s3Key);
    const block = blocks.find(b => {
        const num = typeof b.number === 'number' ? b.number : b.number.toNumber();
        return num === blockNumber;
    });
    
    if (!block) throw new Error(`Block ${blockNumber} not found in bundle`);
    return block;
  }
  
  async getBlockRange(start: number, end: number): Promise<Block[]> {
      // This might span multiple bundles.
      // Simplified implementation: Iterate bundles covering the range
      const result: Block[] = [];
      
      // Align start to bundle boundary? No, we check where start is.
      let current = start;
      while (current <= end) {
          const s3Key = await this.indexManager.getS3KeyForBlock(current);
          if (!s3Key) break; 
          
          const blocks = await this.loadMergedBlocksCached(s3Key);
          // add blocks that are in range
          for (const b of blocks) {
              const num = typeof b.number === 'number' ? b.number : b.number.toNumber();
              if (num >= current && num <= end) {
                  result.push(b);
              }
          }
          
          // Move to next bundle start
          // Assuming bundles are 100 blocks
          const bundleStart = Math.floor(current / 100) * 100;
          const nextBundleStart = bundleStart + 100;
          current = nextBundleStart;
      }
      
      return result;
  }
  
  async getContract(address: string): Promise<ContractIndex | null> {
      return this.indexManager.getContract(address);
  }

  async getEventsForContract(
    address: string,
    options?: { startBlock?: number; endBlock?: number; topics?: string[] }
  ): Promise<ILog[]> {
    const contract = await this.indexManager.getContract(address);
    if (!contract) return [];
    
    const logs: ILog[] = [];
    const normalizedAddress = address.toLowerCase();
    
    for (const range of contract.eventRanges) {
      if (options?.startBlock && range.endBlock < options.startBlock) continue;
      if (options?.endBlock && range.startBlock > options.endBlock) continue;
      
      // If range is relevant, load blocks
      const blocks = await this.loadMergedBlocksCached(range.s3Key);
      
      for (const block of blocks) {
        const blockNum = typeof block.number === 'number' ? block.number : block.number.toNumber();
        if (options?.startBlock && blockNum < options.startBlock) continue;
        if (options?.endBlock && blockNum > options.endBlock) continue;
        
        if (!block.transactionTraces) continue;
        
        for (const trace of block.transactionTraces) {
          if (!trace.receipt || !trace.receipt.logs) continue;
          
          for (const log of trace.receipt.logs) {
            if (bytesToHex(log.address || null).toLowerCase() !== normalizedAddress) continue;
            
            if (options?.topics && options.topics.length > 0) {
              const logTopics = (log.topics || []).map(t => bytesToHex(t));
              const matches = options.topics.every((t, i) => 
                !t || (logTopics[i] && logTopics[i].toLowerCase() === t.toLowerCase())
              );
              if (!matches) continue;
            }
            
            logs.push(log);
          }
        }
      }
    }
    
    return logs;
  }
  
  async getIndexerState(): Promise<IndexerState | null> {
      return this.indexManager.getState();
  }
  
  private async loadMergedBlocksCached(s3Key: string): Promise<Block[]> {
    const cached = this.cache.get(s3Key);
    if (cached) return cached;
    
    const bundle = await this.s3Uploader.downloadMergedBlock(s3Key);
    const blocks = this.formatter.decodeBundle(bundle.data);
    
    this.cache.set(s3Key, blocks);
    return blocks;
  }
}
