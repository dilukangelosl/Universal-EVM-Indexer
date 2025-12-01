import { QueryServiceImpl } from '../src/query/service.js';
import { IndexManager } from '../src/storage/leveldb/client.js';
import { S3Uploader } from '../src/storage/s3-client.js';
import { loadConfig } from '../src/config/index.js';
import { pino } from 'pino';
import fs from 'fs';

async function runDemo() {
    // Load config
    const config = loadConfig('config/run.json');
    const logger = pino({ level: 'info', transport: { target: 'pino-pretty' } });

    // Override S3 to local if needed or assumes data is there
    // For demo, we point to local dir explicitly
    const localS3Config = {
        ...config.s3,
        endpoint: 'file://' + config.storage.dataDir + '/merged-blocks',
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy'
    };

    // Check if any data exists
    if (!fs.existsSync(localS3Config.endpoint.replace('file://', ''))) {
        logger.error("No merged blocks found locally. Please run the indexer first.");
        process.exit(1);
    }

    const indexManager = new IndexManager(config.storage.leveldbPath);
    const s3Uploader = new S3Uploader(localS3Config); // Local mode
    await s3Uploader.init();

    const queryService = new QueryServiceImpl(indexManager, s3Uploader);
    await queryService.init();

    logger.info("--- Query Demo ---");

    // 1. Get Indexer State
    const state = await queryService.getIndexerState();
    logger.info({ state }, "Indexer State");

    if (!state || state.lastMergedBlock === 0) {
        logger.warn("No blocks merged yet.");
        process.exit(0);
    }

    // 2. Fetch a specific block (e.g., 100)
    const targetBlock = 100;
    try {
        logger.info(`Fetching block ${targetBlock}...`);
        const start = performance.now();
        const block = await queryService.getBlock(targetBlock);
        const end = performance.now();
        
        const blockHash = '0x' + Buffer.from(block.hash).toString('hex');
        logger.info(`Fetched Block ${targetBlock} (${blockHash}) in ${(end-start).toFixed(2)}ms`);
        logger.info(`Transactions: ${block.transactionTraces.length}`);
    } catch (e: any) {
        logger.error(`Failed to fetch block ${targetBlock}: ${e.message}`);
    }

    // 3. Fetch events/logs (Scan for any logs in first bundle)
    // Since we don't know a contract address, let's scan a range and inspect content.
    try {
        logger.info("Scanning for blocks 1-100...");
        const blocks = await queryService.getBlockRange(1, 100);
        let totalLogs = 0;
        let sampleLog: any = null;
        
        for(const b of blocks) {
            if (b.transactionTraces) {
                for(const t of b.transactionTraces) {
                    if(t.receipt && t.receipt.logs) {
                        totalLogs += t.receipt.logs.length;
                        if (!sampleLog && t.receipt.logs.length > 0) sampleLog = t.receipt.logs[0];
                    }
                }
            }
        }
        logger.info(`Found ${totalLogs} logs in 100 blocks.`);
        if (sampleLog) {
            const addr = '0x' + Buffer.from(sampleLog.address).toString('hex');
            logger.info(`Sample Log Contract Address: ${addr}`);
            
            // 4. Query events for that contract
            logger.info(`Querying events for contract ${addr} using Index...`);
            const startQ = performance.now();
            const events = await queryService.getEventsForContract(addr, { startBlock: 1, endBlock: 100 });
            const endQ = performance.now();
            
            logger.info(`Found ${events.length} events for ${addr} in ${(endQ-startQ).toFixed(2)}ms`);
        }
    } catch (e: any) {
        logger.error(e);
    }

    await indexManager.close();
}

runDemo().catch(console.error);
