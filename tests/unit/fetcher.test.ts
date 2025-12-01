import { describe, it, expect } from 'bun:test';
import { BlockFetcher } from '../../src/fetcher/index.js';
import { MockRpcClient } from '../mocks/RpcClientMock.js';
import { pino } from 'pino';

describe('BlockFetcher', () => {
  // @ts-ignore
  const mockClient = new MockRpcClient();
  const logger = pino({ level: 'silent' });
  
  // Override the private client property
  const fetcher = new BlockFetcher({
    client: {} as any,
    batchSize: 10,
    maxConcurrentBatches: 2
  }, logger);
  
  // @ts-ignore
  fetcher.client = mockClient;

  it('should fetch a range of blocks', async () => {
    const blocks = await fetcher.fetchBlockRange(1, 5);
    expect(blocks.length).toBe(5);
    expect(blocks[0].block.number).toBe('0x1');
    expect(blocks[4].block.number).toBe('0x5');
  });

  it('should process batches correctly', async () => {
    // Request 20 blocks (2 batches of 10)
    const blocks = await fetcher.fetchBlockRange(1, 20);
    expect(blocks.length).toBe(20);
    expect(blocks[19].block.number).toBe('0x14'); // 20 in hex
  });
});
