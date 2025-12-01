import { describe, it, expect, beforeAll } from "bun:test";
import { BlockProcessor } from "../../src/processor/block-parser.js";
import { BlockFetcher, BlockFetcherConfig } from "../../src/fetcher/index.js";
import { FetchedBlock, RpcBlock, RpcReceipt } from "../../src/fetcher/types.js";
import { OneBlockWriter } from "../../src/storage/one-block-writer.js";
import { BlockMerger } from "../../src/storage/merger.js";
import { DbinFormatter } from "../../src/proto/dbin.js";
import { sf } from "../../src/proto/compiled.js";
import fs from 'fs';
import path from 'path';
import logger from "pino";

const TEST_DATA_DIR = "./tests/temp_data";

describe("End-to-End Pipeline Unit Test", () => {
    let processor: BlockProcessor;
    let writer: OneBlockWriter;
    let merger: BlockMerger;
    let formatter: DbinFormatter;

    beforeAll(async () => {
        // Clean/Create temp dir
        if (fs.existsSync(TEST_DATA_DIR)) {
            fs.rmSync(TEST_DATA_DIR, { recursive: true });
        }
        fs.mkdirSync(path.join(TEST_DATA_DIR, 'one-blocks'), { recursive: true });

        processor = new BlockProcessor();
        writer = new OneBlockWriter(TEST_DATA_DIR);
        formatter = new DbinFormatter();
        await formatter.init();
        merger = new BlockMerger(formatter);
    });

    it("should process a mock block, write it, and merge it", async () => {
        // 1. Mock Data
        const mockBlock: RpcBlock = {
            number: "0x1",
            hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            parentHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            nonce: "0x0",
            sha3Uncles: "0x0000000000000000000000000000000000000000000000000000000000000000",
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
            timestamp: "0x64f1b5e8", // Some timestamp
            transactions: [],
            uncles: []
        };

        const fetched: FetchedBlock = {
            block: mockBlock,
            receipts: new Map(),
            fetchedAt: Date.now()
        };

        // 2. Process
        const processedBlock = processor.processBlock(fetched);
        // @ts-ignore
        expect(processedBlock.number!.toNumber()).toBe(1);
        expect(processedBlock.transactionTraces.length).toBe(0);

        // 3. Write One-Block
        const meta = await writer.writeOneBlock(processedBlock);
        expect(meta.blockNumber).toBe(1);
        expect(fs.existsSync(meta.localPath)).toBe(true);

        // 4. Merge (Simulating 1 block bundle for test, typically 100)
        // Force merge logic to accept 1 block if we modify merger or just use it as is?
        // Merger expects to just merge what's given.
        const bundle = await merger.mergeBundles(1, [meta]);
        
        expect(bundle.startBlock).toBe(1);
        
        // 5. Verify dbin
        const decodedBlocks = formatter.decodeBundle(bundle.data);
        expect(decodedBlocks.length).toBe(1);
        // @ts-ignore
        expect(decodedBlocks[0].number!.toNumber()).toBe(1);
        
        // Cleanup
        fs.rmSync(TEST_DATA_DIR, { recursive: true });
    });
});
