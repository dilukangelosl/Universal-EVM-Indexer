import { JsonRpcClient } from '../../src/fetcher/rpc-client.js';
import { RpcBlock, RpcReceipt } from '../../src/fetcher/types.js';

export class MockRpcClient extends JsonRpcClient {
  constructor() {
    super({ endpoints: ['mock'], timeoutMs: 1000, retries: 0, retryDelayMs: 0 }, {} as any);
  }

  // Override methods
  async getBlockNumber(): Promise<number> {
    return 100;
  }

  async batchRequest<T>(requests: { method: string; params: any[] }[]): Promise<T[]> {
    // Simulate batch response
    return requests.map(req => {
      if (req.method === 'eth_getBlockByNumber') {
        const num = parseInt(req.params[0], 16);
        return this.createMockBlock(num) as any;
      }
      if (req.method === 'eth_getTransactionReceipt') {
        return this.createMockReceipt(req.params[0]) as any;
      }
      return null;
    });
  }

  private createMockBlock(number: number): RpcBlock {
    return {
      number: '0x' + number.toString(16),
      hash: '0xhash' + number,
      parentHash: '0xparent' + (number - 1),
      nonce: '0x0',
      sha3Uncles: '0x0',
      logsBloom: '0x0',
      transactionsRoot: '0x0',
      stateRoot: '0x0',
      receiptsRoot: '0x0',
      miner: '0x0',
      difficulty: '0x0',
      totalDifficulty: '0x0',
      extraData: '0x',
      size: '0x100',
      gasLimit: '0x1000',
      gasUsed: '0x100',
      timestamp: '0x60000000',
      transactions: [
        {
          hash: '0xtx' + number,
          blockHash: '0xhash' + number,
          blockNumber: '0x' + number.toString(16),
          from: '0xfrom',
          to: '0xto',
          gas: '0x100',
          gasPrice: '0x1',
          input: '0x',
          nonce: '0x0',
          transactionIndex: '0x0',
          value: '0x0',
          v: '0x0',
          r: '0x0',
          s: '0x0'
        }
      ],
      uncles: []
    };
  }

  private createMockReceipt(txHash: string): RpcReceipt {
    return {
      transactionHash: txHash,
      transactionIndex: '0x0',
      blockHash: '0xblock',
      blockNumber: '0x1',
      from: '0xfrom',
      to: '0xto',
      cumulativeGasUsed: '0x100',
      gasUsed: '0x100',
      contractAddress: null,
      logs: [],
      logsBloom: '0x0',
      status: '0x1',
      effectiveGasPrice: '0x1'
    };
  }
}
