import { Command } from 'commander';
import { loadConfig } from './config/index.js';
import { UniversalIndexer } from './indexer/index.js';
import { BlockFetcher } from './fetcher/index.js';
import { BlockProcessor } from './processor/block-parser.js';
import { OneBlockWriter } from './storage/one-block-writer.js';
import { BlockMerger } from './storage/merger.js';
import { S3Uploader } from './storage/s3-client.js';
import { IndexManager } from './storage/leveldb/client.js';
import { pino } from 'pino';
import path from 'path';
import fs from 'fs';

export async function runCli() {
  const program = new Command();

  program
    .name('universal-evm-indexer')
    .description('Firehose-compatible manual blockchain indexer for EVM Chains')
    .version('1.0.0');

  program
    .command('start')
    .description('Start the indexer')
    .option('-c, --config <path>', 'Path to config file', 'config/default.json')
    .option('--from-block <number>', 'Start indexing from specific block (overrides state)')
    .option('--mode <mode>', 'Indexing mode: historical or live', 'historical')
    .action(async (options) => {
      try {
        const config = loadConfig(options.config);
        const logger = pino({
            level: config.logging.level,
            transport: config.logging.format === 'pretty' ? { target: 'pino-pretty' } : undefined
        });
        
        logger.info(`Loading config from ${options.config || 'defaults/env'}`);
        
        // Ensure directories
        fs.mkdirSync(config.storage.dataDir, { recursive: true });
        fs.mkdirSync(config.storage.oneBlocksDir, { recursive: true });
        fs.mkdirSync(config.storage.leveldbPath, { recursive: true });

        // Initialize components
        const fetcher = new BlockFetcher({
            client: {
                endpoints: config.chain.rpcEndpoints,
                timeoutMs: 30000, // config?
                retries: 5,
                retryDelayMs: 1000,
            },
            batchSize: config.indexer.batchSize,
            maxConcurrentBatches: config.indexer.maxConcurrentBatches
        }, logger);
        
        const processor = new BlockProcessor();
        const oneBlockWriter = new OneBlockWriter(config.storage.dataDir); // inside writes to one-blocks
        const merger = new BlockMerger();
        const s3Uploader = new S3Uploader(config.s3);
        const indexManager = new IndexManager(config.storage.leveldbPath);
        
        const indexer = new UniversalIndexer(
            fetcher,
            processor,
            oneBlockWriter,
            merger,
            s3Uploader,
            indexManager,
            config,
            logger
        );
        
        await indexer.init();
        
        const fromBlock = options.fromBlock ? parseInt(options.fromBlock, 10) : undefined;
        
        if (options.mode === 'live') {
            await indexer.startLiveIndexing();
        } else {
            await indexer.startHistoricalIndexing(fromBlock);
        }

      } catch (error: any) {
         console.error('Fatal error:', error);
         process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}
