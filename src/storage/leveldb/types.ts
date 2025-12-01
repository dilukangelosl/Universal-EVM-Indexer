export interface MergedRangeIndex {
  startBlock: number;
  endBlock: number;
  s3Key: string;
  checksum: string;        // SHA256 of compressed file
  sizeBytes: number;       // Compressed size
  indexedAt: number;       // Unix timestamp
  blockCount: number;      // Should be 100 unless final range
}

export interface ContractIndex {
  address: string;         // Checksummed address
  deploymentBlock: number;
  deploymentTxHash: string;
  deploymentTxIndex: number;
  deployer: string;
  // Block ranges where this contract has events
  eventRanges: Array<{
    startBlock: number;
    endBlock: number;
    s3Key: string;
    logCount: number;
  }>;
  totalLogs: number;
  firstEventBlock?: number;
  lastEventBlock?: number;
}

export interface EventSignatureIndex {
  topic0: string;          // Keccak256 hash
  name?: string;           // Decoded name if known (e.g., "Transfer")
  signature?: string;      // Full signature if known
  contractAddresses: string[];  // Contracts emitting this event
  blockRanges: Array<{
    startBlock: number;
    endBlock: number;
    s3Key: string;
  }>;
}

export interface IndexerState {
  lastMergedBlock: number;      // Last block in a merged bundle
  lastProcessedBlock: number;   // Last block processed (may be in pending one-blocks)
  pendingOneBlocks: number;     // Count of unmerged one-block files
  chainHead: number;            // Last known chain head
  isIndexing: boolean;          // Currently indexing flag
  lastCheckpoint: number;       // Unix timestamp
  version: string;              // Indexer version
}

// One-block file metadata (temporary)
// Already defined in one-block-writer but re-using here or importing?
// Let's import to avoid duplication if possible, but circular dependency?
// OneBlockMeta is in one-block-writer.ts.
// Let's just import it in client.ts.
