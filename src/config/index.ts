import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { IndexerConfig } from '../indexer/index.js';

const ConfigSchema = z.object({
  chain: z.object({
    chainId: z.number().default(33139),  // ApeChain mainnet
    rpcEndpoints: z.array(z.string().url()).min(1),
    startBlock: z.number().default(0),
    blockTimeMs: z.number().default(2000),
  }),
  indexer: z.object({
    batchSize: z.number().default(20), // RPC batch limit (conservative default)
    processingBatchSize: z.number().default(100), // Indexer loop size (fetch/process/write count)
    bundleSize: z.number().default(100), // Number of blocks per merged bundle file
    maxConcurrentBatches: z.number().default(10), // Parallel RPC requests
    pollIntervalMs: z.number().default(2000),
    checkpointIntervalBlocks: z.number().default(1000),
    mergePartialBundles: z.boolean().default(false),
  }),
  storage: z.object({
    dataDir: z.string().default('./data'),
    oneBlocksDir: z.string().default('./data/one-blocks'),
    leveldbPath: z.string().default('./data/leveldb'),
  }),
  s3: z.object({
    bucket: z.string(),
    region: z.string().default('us-east-1'),
    prefix: z.string().default('apechain-indexer'),
    storageClass: z.enum(['STANDARD', 'INTELLIGENT_TIERING']).default('STANDARD'),
    multipartThresholdBytes: z.number().default(104857600), // 100MB
    maxRetries: z.number().default(3),
    endpoint: z.string().optional(),
    accessKeyId: z.string().optional(),
    secretAccessKey: z.string().optional(),
  }),
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    format: z.enum(['json', 'pretty']).default('json'),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(configPath?: string): Config {
  let config: any = {};
  
  // Load from file if provided
  if (configPath && fs.existsSync(configPath)) {
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(fileContent);
  }
  
  // Override via ENV vars if needed (simplified)
  if (process.env.RPC_ENDPOINT) {
      if (!config.chain) config.chain = {};
      config.chain.rpcEndpoints = [process.env.RPC_ENDPOINT];
  }
  if (process.env.S3_BUCKET) {
      if (!config.s3) config.s3 = {};
      config.s3.bucket = process.env.S3_BUCKET;
  }
  if (process.env.AWS_ACCESS_KEY_ID) {
      if (!config.s3) config.s3 = {};
      config.s3.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  }
  if (process.env.AWS_SECRET_ACCESS_KEY) {
        if (!config.s3) config.s3 = {};
        config.s3.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  }
  if (process.env.S3_ENDPOINT) {
        if (!config.s3) config.s3 = {};
        config.s3.endpoint = process.env.S3_ENDPOINT;
  }
  if (process.env.S3_REGION) {
        if (!config.s3) config.s3 = {};
        config.s3.region = process.env.S3_REGION;
  }
  
  // For strict defaults if missing in file/env
  if (!config.s3 && !process.env.S3_BUCKET) {
      // Allow missing S3 for test/dev if explicitly bypassed or throw
      // Zod will throw for required fields (bucket)
  }

  return ConfigSchema.parse(config);
}
