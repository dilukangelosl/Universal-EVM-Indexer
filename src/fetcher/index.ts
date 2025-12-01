import { JsonRpcClient, RpcClientConfig } from './rpc-client.js';
import { FetchedBlock, RpcBlock, RpcReceipt } from './types.js';
import { Logger } from 'pino';

export interface BlockFetcherConfig {
  client: RpcClientConfig;
  batchSize: number;
  maxConcurrentBatches: number;
}

export class BlockFetcher {
  private client: JsonRpcClient;

  constructor(
    private config: BlockFetcherConfig,
    private logger: Logger
  ) {
    this.client = new JsonRpcClient(config.client, logger);
  }

  async getChainHead(): Promise<number> {
    return this.client.getBlockNumber();
  }

  async fetchBlock(blockNumber: number): Promise<FetchedBlock> {
    const [fetched] = await this.fetchBlockRange(blockNumber, blockNumber);
    return fetched;
  }

  async fetchBlockRange(startBlock: number, endBlock: number): Promise<FetchedBlock[]> {
    this.logger.debug(`Fetching block range ${startBlock}-${endBlock}`);
    
    const rangeSize = endBlock - startBlock + 1;
    const batches: number[][] = [];
    
    // Split into batches
    for (let i = 0; i < rangeSize; i += this.config.batchSize) {
      const batch: number[] = [];
      for (let j = 0; j < this.config.batchSize && i + j < rangeSize; j++) {
        batch.push(startBlock + i + j);
      }
      batches.push(batch);
    }

    const results: FetchedBlock[] = [];
    
    // Process batches with concurrency limit
    for (let i = 0; i < batches.length; i += this.config.maxConcurrentBatches) {
      const concurrentBatches = batches.slice(i, i + this.config.maxConcurrentBatches);
      const batchResults = await Promise.all(
        concurrentBatches.map(batch => this.fetchBatch(batch))
      );
      
      for (const batchResult of batchResults) {
        results.push(...batchResult);
      }
    }

    // Sort by block number to ensure order
    return results.sort((a, b) => 
      parseInt(a.block.number, 16) - parseInt(b.block.number, 16)
    );
  }

  private async fetchBatch(blockNumbers: number[]): Promise<FetchedBlock[]> {
    // 1. Fetch blocks
    const blockReqs = blockNumbers.map(num => ({
      method: 'eth_getBlockByNumber',
      params: ['0x' + num.toString(16), true]
    }));

    const blocks = await this.client.batchRequest<RpcBlock | null>(blockReqs);
    
    // Validate blocks and collect transactions
    const validBlocks: RpcBlock[] = [];
    const txHashes: string[] = [];
    const blockMap = new Map<string, RpcBlock>(); // hash -> block

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (!block) {
        throw new Error(`Block ${blockNumbers[i]} not found`);
      }
      
      validBlocks.push(block);
      blockMap.set(block.hash, block);
      
      for (const tx of block.transactions) {
        if (typeof tx === 'string') {
          // Should not happen with hydrated: true
          throw new Error(`Transaction in block ${block.number} is string, expected object`);
        }
        txHashes.push(tx.hash);
      }
    }

    if (txHashes.length === 0) {
      return validBlocks.map(block => ({
        block,
        receipts: new Map(),
        fetchedAt: Date.now()
      }));
    }

    // 2. Fetch receipts in batches (chunk size 100 to avoid massive payloads)
    const receiptBatchSize = 100;
    const receipts: RpcReceipt[] = [];
    
    for (let i = 0; i < txHashes.length; i += receiptBatchSize) {
      const batchHashes = txHashes.slice(i, i + receiptBatchSize);
      const receiptReqs = batchHashes.map(hash => ({
        method: 'eth_getTransactionReceipt',
        params: [hash]
      }));
      
      const batchReceipts = await this.client.batchRequest<RpcReceipt | null>(receiptReqs);
      
      for (let j = 0; j < batchReceipts.length; j++) {
        const receipt = batchReceipts[j];
        if (!receipt) {
           // Receipt might be missing if reorg happened or node is not fully synced?
           // Or for pending? But we are fetching confirmed blocks.
           // We should probably throw or retry for critical missing data.
           // For now, throw to restart process
           throw new Error(`Receipt not found for tx ${batchHashes[j]}`);
        }
        receipts.push(receipt);
      }
    }

    // 3. Assemble results
    const results: FetchedBlock[] = [];
    
    // Group receipts by block
    const receiptsByBlock = new Map<string, Map<string, RpcReceipt>>(); // blockHash -> (txHash -> receipt)
    
    for (const receipt of receipts) {
      if (!receiptsByBlock.has(receipt.blockHash)) {
        receiptsByBlock.set(receipt.blockHash, new Map());
      }
      receiptsByBlock.get(receipt.blockHash)!.set(receipt.transactionHash, receipt);
    }
    
    for (const block of validBlocks) {
      results.push({
        block,
        receipts: receiptsByBlock.get(block.hash) || new Map(),
        fetchedAt: Date.now()
      });
    }

    return results;
  }
}
