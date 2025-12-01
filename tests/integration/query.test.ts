import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { BlockProcessor } from "../../src/processor/block-parser.js";
import { FetchedBlock, RpcBlock } from "../../src/fetcher/types.js";
import { OneBlockWriter } from "../../src/storage/one-block-writer.js";
import { BlockMerger } from "../../src/storage/merger.js";
import { S3Uploader } from "../../src/storage/s3-client.js";
import { IndexManager } from "../../src/storage/leveldb/client.js";
import { QueryServiceImpl } from "../../src/query/service.js";
import { DbinFormatter } from "../../src/proto/dbin.js";
import fs from 'fs';
import path from 'path';

const TEST_DIR = "./tests/temp_integration_query";
const DB_PATH = path.join(TEST_DIR, "leveldb");
const S3_PATH = path.join(TEST_DIR, "merged-blocks");
const ONE_BLOCKS_PATH = path.join(TEST_DIR, "one-blocks");

describe("Query Service Integration Test", () => {
    let processor: BlockProcessor;
    let writer: OneBlockWriter;
    let merger: BlockMerger;
    let formatter: DbinFormatter;
    let indexManager: IndexManager;
    let s3Uploader: S3Uploader;
    let queryService: QueryServiceImpl;

    beforeAll(async () => {
        // Cleanup
        if (fs.existsSync(TEST_DIR)) fs.rmSync(TEST_DIR, { recursive: true });
        fs.mkdirSync(ONE_BLOCKS_PATH, { recursive: true });
        fs.mkdirSync(S3_PATH, { recursive: true });
        fs.mkdirSync(DB_PATH, { recursive: true });

        processor = new BlockProcessor();
        writer = new OneBlockWriter(ONE_BLOCKS_PATH);
        formatter = new DbinFormatter();
        await formatter.init();
        merger = new BlockMerger(formatter);
        
        indexManager = new IndexManager(DB_PATH);
        
        s3Uploader = new S3Uploader({
            bucket: "test-bucket",
            region: "us-east-1",
            prefix: "test-prefix",
            storageClass: "STANDARD",
            multipartThresholdBytes: 1024 * 1024,
            maxRetries: 3,
            endpoint: `file://${S3_PATH}`, // Local mode
            accessKeyId: "test",
            secretAccessKey: "test"
        }, formatter);
        await s3Uploader.init();

        queryService = new QueryServiceImpl(indexManager, s3Uploader, 100, formatter);
        await queryService.init();
    });

    afterAll(async () => {
        await indexManager.close();
        if (fs.existsSync(TEST_DIR)) fs.rmSync(TEST_DIR, { recursive: true });
    });

    it("should index and query blocks correctly", async () => {
        // 1. Create and Index a Bundle (Blocks 1-100)
        const metas = [];
        const blocks = [];
        
        for (let i = 1; i <= 100; i++) {
            const mockBlock: RpcBlock = {
                number: "0x" + i.toString(16),
                hash: "0x" + i.toString(16).padStart(64, '0'),
                parentHash: "0x" + (i-1).toString(16).padStart(64, '0'),
                nonce: "0x0",
                sha3Uncles: "0x0",
                logsBloom: "0x0",
                transactionsRoot: "0x0",
                stateRoot: "0x0",
                receiptsRoot: "0x0",
                miner: "0x0000000000000000000000000000000000000000",
                difficulty: "0x0",
                totalDifficulty: "0x0",
                extraData: "0x",
                size: "0x100",
                gasLimit: "0xfffff",
                gasUsed: "0x0",
                timestamp: "0x" + (1000000000 + i).toString(16), 
                transactions: [],
                uncles: []
            };
            const fetched: FetchedBlock = { block: mockBlock, receipts: new Map(), fetchedAt: Date.now() };
            const processed = processor.processBlock(fetched);
            const meta = await writer.writeOneBlock(processed);
            metas.push(meta);
            blocks.push(processed);
        }

        // Merge
        const bundle = await merger.mergeBundles(1, metas);
        
        // Upload
        const s3Key = await s3Uploader.uploadMergedBlock(bundle);
        bundle.s3Key = s3Key; // Important: Set s3Key!
        expect(s3Key).toBeTruthy();
        expect(s3Key).toContain("test-prefix/merged-blocks/");

        // Update Index
        await indexManager.updateIndexes(bundle, blocks);

        // 2. Query Block 50
        const block50 = await queryService.getBlock(50);
        // @ts-ignore
        expect(block50.number!.toNumber()).toBe(50);
        
        // 3. Query Range 10-20
        const range = await queryService.getBlockRange(10, 20);
        expect(range.length).toBe(11);
        // @ts-ignore
        expect(range[0].number!.toNumber()).toBe(10);
        // @ts-ignore
        expect(range[10].number!.toNumber()).toBe(20);
        
        // 4. Verify missing block
        let error;
        try {
            await queryService.getBlock(101);
        } catch(e) {
            error = e;
        }
        expect(error).toBeTruthy();
        // @ts-ignore
        expect(error.message).toContain("not indexed");
    });
});
