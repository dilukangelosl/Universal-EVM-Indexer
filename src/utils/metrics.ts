import { Registry, Counter, Gauge, Histogram, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();

// Default node metrics
collectDefaultMetrics({ register: registry });

export const metrics = {
  // Progress
  blocksIndexedTotal: new Counter({
    name: 'indexer_blocks_indexed_total',
    help: 'Total number of blocks indexed',
    registers: [registry]
  }),
  currentBlockHeight: new Gauge({
    name: 'indexer_current_block_height',
    help: 'Current block height being processed',
    registers: [registry]
  }),
  chainHeadBlock: new Gauge({
    name: 'indexer_chain_head_block',
    help: 'Current chain head block height',
    registers: [registry]
  }),
  blocksBehind: new Gauge({
    name: 'indexer_blocks_behind',
    help: 'Number of blocks behind chain head',
    registers: [registry]
  }),
  
  // Performance
  blocksPerSecond: new Gauge({
    name: 'indexer_blocks_per_second',
    help: 'Indexing rate in blocks per second',
    registers: [registry]
  }),
  fetchLatencyMs: new Histogram({
    name: 'indexer_fetch_latency_ms',
    help: 'Latency of RPC block fetches',
    buckets: [50, 100, 200, 500, 1000, 2000, 5000],
    registers: [registry]
  }),
  processLatencyMs: new Histogram({
    name: 'indexer_process_latency_ms',
    help: 'Latency of block processing',
    buckets: [10, 50, 100, 500, 1000],
    registers: [registry]
  }),
  mergeLatencyMs: new Histogram({
    name: 'indexer_merge_latency_ms',
    help: 'Latency of block merging',
    buckets: [100, 500, 1000, 5000, 10000],
    registers: [registry]
  }),
  uploadLatencyMs: new Histogram({
    name: 'indexer_upload_latency_ms',
    help: 'Latency of S3 uploads',
    buckets: [100, 500, 1000, 2000, 5000],
    registers: [registry]
  }),
  
  // Storage
  mergedBundlesTotal: new Counter({
    name: 'indexer_merged_bundles_total',
    help: 'Total merged bundles created',
    registers: [registry]
  }),
  s3UploadBytesTotal: new Counter({
    name: 'indexer_s3_upload_bytes_total',
    help: 'Total bytes uploaded to S3',
    registers: [registry]
  }),
  leveldbSizeBytes: new Gauge({
    name: 'indexer_leveldb_size_bytes',
    help: 'Estimated size of LevelDB',
    registers: [registry]
  }),
  pendingOneBlocks: new Gauge({
    name: 'indexer_pending_one_blocks',
    help: 'Number of pending one-block files',
    registers: [registry]
  }),
  
  // Contracts
  contractsIndexedTotal: new Counter({
    name: 'indexer_contracts_indexed_total',
    help: 'Total contracts indexed',
    registers: [registry]
  }),
  
  // Errors
  rpcErrorsTotal: new Counter({
    name: 'indexer_rpc_errors_total',
    help: 'Total RPC errors',
    registers: [registry]
  }),
  s3ErrorsTotal: new Counter({
    name: 'indexer_s3_errors_total',
    help: 'Total S3 errors',
    registers: [registry]
  }),
  processingErrorsTotal: new Counter({
    name: 'indexer_processing_errors_total',
    help: 'Total processing errors',
    registers: [registry]
  }),
};
