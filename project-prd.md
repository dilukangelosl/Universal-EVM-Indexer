# ApeChain Indexer PRD

## Firehose-Compatible Manual Blockchain Indexer

**Version:** 1.0  
**Last Updated:** November 2024  
**Runtime:** Bun.js / TypeScript

---

## Executive Summary

ApeChain Indexer is a Firehose-compatible blockchain indexing system that achieves the same data extraction and storage patterns as StreamingFast's Firehose, but through manual RPC-based indexing rather than instrumented node integration. The system indexes all blocks from ApeChain, serializes them into Protocol Buffer format following Firehose's `sf.ethereum.type.v2` schema, stores them as flat files (merged blocks), uploads to object storage (S3), and maintains LevelDB indexes for efficient block range and contract lookups.

---

## Problem Statement

Firehose provides the gold standard for blockchain data extraction, but requires:
1. **Instrumented nodes** - Deep integration with blockchain client code (geth patches)
2. **Custom node builds** - Running modified node software with Firehose tracer
3. **Complex infrastructure** - Multiple components (Reader, Merger, Relayer, etc.)

For chains where instrumented nodes aren't available or practical, we need an alternative that:
- Achieves **Firehose-compatible output** (same protobuf schemas, flat file format)
- Works with **standard RPC endpoints** (no node modifications)
- Provides **similar query capabilities** via local indexes
- Enables **Substreams compatibility** for downstream consumers

---

## Goals

### Primary Goals
1. **Firehose Schema Compatibility**: Output blocks using `sf.apechain.type.v1.Block` protobuf schema, modeled after `sf.ethereum.type.v2.Block`
2. **Flat File Storage**: Store blocks in merged 100-block bundles following Firehose's `dbin` packing format
3. **Complete Block Coverage**: Index 100% of ApeChain blocks from genesis to chain head
4. **Local Index Layer**: LevelDB indexes for block ranges, contracts, and S3 key lookups
5. **S3 Object Storage**: Cloud persistence following Firehose's storage patterns

### Secondary Goals
1. **BASE DetailLevel Support**: Extract block headers, transaction receipts, and event logs (RPC-extractable data)
2. **Deterministic Output**: Same input block always produces identical protobuf output
3. **Resumable Indexing**: Checkpoint-based recovery from any failure point
4. **Parallel Historical Indexing**: Concurrent processing of block ranges

### Non-Goals (v1)
1. **EXTENDED DetailLevel**: No trace data, internal calls, storage changes, or balance changes (requires instrumented node)
2. **gRPC Streaming Server**: No real-time Firehose gRPC interface (consumers read from S3/local)
3. **Fork Handling**: No ForkDB or cursor-based fork tracking (simplified model)
4. **Substreams Integration**: No direct Substreams execution (output compatible for import)

---

## Architecture Overview

### Firehose vs ApeChain Indexer Comparison

| Firehose Component | ApeChain Indexer Equivalent | Notes |
|-------------------|----------------------------|-------|
| Instrumented Node | RPC Block Fetcher | Standard JSON-RPC instead of deep traces |
| Reader | Block Processor | Reads from RPC, outputs one-block files |
| Merger | Block Merger | Combines into 100-block bundles |
| Object Store | S3 + LevelDB Index | Same flat file output, added query index |
| Relayer | N/A | No live streaming in v1 |
| Firehose gRPC | Query Service | Local queries against LevelDB index |

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ApeChain Indexer                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  RPC Pool    │───▶│Block Fetcher │───▶│  Extractor   │                  │
│  │ (ApeChain)   │    │  (Batched)   │    │  (Parser)    │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                  │                          │
│                                                  ▼                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                     Proto Encoder (sf.apechain.type.v1)              │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │  │
│  │  │   Block     │  │Transaction  │  │    Log      │                   │  │
│  │  │  Header     │  │   Trace     │  │  (Events)   │                   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                  │                          │
│                                                  ▼                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │ One-Block    │───▶│   Merger     │───▶│Merged Blocks │                  │
│  │   Files      │    │ (100 blocks) │    │   (.dbin)    │                  │
│  │  (Temp)      │    │              │    │              │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                  │                          │
│                      ┌───────────────────────────┼───────────────────────┐  │
│                      │                           │                       │  │
│                      ▼                           ▼                       │  │
│  ┌──────────────────────────┐    ┌──────────────────────────────────┐   │  │
│  │        LevelDB           │    │           S3 Bucket              │   │  │
│  │  ┌────────────────────┐  │    │  ┌────────────────────────────┐  │   │  │
│  │  │ block_range:       │  │    │  │ merged-blocks/             │  │   │  │
│  │  │   {start}-{end}    │  │    │  │   0000000000-0000000099    │  │   │  │
│  │  │   → s3_key         │  │    │  │   0000000100-0000000199    │  │   │  │
│  │  ├────────────────────┤  │    │  │   ...                      │  │   │  │
│  │  │ contract:          │  │    │  ├────────────────────────────┤  │   │  │
│  │  │   {address}        │  │    │  │ one-blocks/ (temp)         │  │   │  │
│  │  │   → deploy_block,  │  │    │  │   0000000000-{hash}-{ts}   │  │   │  │
│  │  │     s3_keys[]      │  │    │  │   ...                      │  │   │  │
│  │  ├────────────────────┤  │    │  └────────────────────────────┘  │   │  │
│  │  │ block_contract:    │  │    │                                  │   │  │
│  │  │   {block_num}      │  │    │                                  │   │  │
│  │  │   → [addresses]    │  │    │                                  │   │  │
│  │  └────────────────────┘  │    └──────────────────────────────────┘   │  │
│  └──────────────────────────┘                                            │  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Protocol Buffer Schema

Following Firehose's naming convention: `sf.[chain].type.v1.Block`

### Package Structure

```
proto/
└── sf/
    └── apechain/
        └── type/
            └── v1/
                └── type.proto
```

### Core Schema Definition

```protobuf
syntax = "proto3";

package sf.apechain.type.v1;

option go_package = "github.com/yourorg/apechain-indexer/types/pb/sf/apechain/type/v1;pbapechain";

import "google/protobuf/timestamp.proto";

// Block is the representation of a block in the ApeChain blockchain.
// This schema follows the Firehose sf.ethereum.type.v2.Block structure
// but is limited to BASE detail level (RPC-extractable data).
//
// The 'ordinal' concept from Firehose is preserved where applicable,
// allowing global ordering of elements within a block.
message Block {
  // Ver represents the data model version of the block
  int32 ver = 1;
  
  // Hash is the block's hash
  bytes hash = 2;
  
  // Number is the block's height
  uint64 number = 3;
  
  // Size is the size in bytes of the RLP encoding of the block
  uint64 size = 4;
  
  // Header contains the block's header information
  BlockHeader header = 5;
  
  // Uncles represents uncle/ommer blocks (empty for PoS chains)
  repeated BlockHeader uncles = 6;
  
  // TransactionTraces hold the execution data of all transactions
  // Note: Limited to BASE level - no internal calls, storage changes
  repeated TransactionTrace transaction_traces = 10;
  
  // DetailLevel indicates the extraction method used
  // For this indexer, always DETAILLEVEL_BASE
  DetailLevel detail_level = 12;
  
  enum DetailLevel {
    DETAILLEVEL_EXTENDED = 0;  // Reserved for instrumented extraction
    DETAILLEVEL_BASE = 2;      // RPC-based extraction (this indexer)
  }
}

message BlockHeader {
  bytes parent_hash = 1;
  bytes uncle_hash = 2;
  bytes coinbase = 3;
  bytes state_root = 4;
  bytes transactions_root = 5;
  bytes receipt_root = 6;
  bytes logs_bloom = 7;
  BigInt difficulty = 8;
  uint64 number = 9;
  uint64 gas_limit = 10;
  uint64 gas_used = 11;
  google.protobuf.Timestamp timestamp = 12;
  bytes extra_data = 13;
  bytes mix_hash = 14;
  uint64 nonce = 15;
  bytes hash = 16;
  BigInt total_difficulty = 17;
  BigInt base_fee_per_gas = 18;
  bytes withdrawals_root = 19;
  optional uint64 blob_gas_used = 22;
  optional uint64 excess_blob_gas = 23;
  bytes parent_beacon_root = 24;
}

message BigInt {
  bytes bytes = 1;
}

// TransactionTrace represents the execution of a transaction.
// For BASE detail level, this includes transaction data and receipt
// but excludes internal calls and state changes.
message TransactionTrace {
  bytes to = 1;
  uint64 nonce = 2;
  BigInt gas_price = 3;
  uint64 gas_limit = 4;
  BigInt value = 5;
  bytes input = 6;
  bytes v = 7;
  bytes r = 8;
  bytes s = 9;
  uint64 gas_used = 10;
  Type type = 12;
  
  enum Type {
    TRX_TYPE_LEGACY = 0;
    TRX_TYPE_ACCESS_LIST = 1;
    TRX_TYPE_DYNAMIC_FEE = 2;
    TRX_TYPE_BLOB = 3;
  }
  
  repeated AccessTuple access_list = 14;
  BigInt max_fee_per_gas = 11;
  BigInt max_priority_fee_per_gas = 13;
  
  // Transaction metadata
  uint32 index = 20;
  bytes hash = 21;
  bytes from = 22;
  
  // Ordinals for global ordering within block
  uint64 begin_ordinal = 25;
  uint64 end_ordinal = 26;
  
  TransactionTraceStatus status = 30;
  TransactionReceipt receipt = 31;
  
  // Blob transaction fields (EIP-4844)
  optional uint64 blob_gas = 33;
  optional BigInt blob_gas_fee_cap = 34;
  repeated bytes blob_hashes = 35;
}

message AccessTuple {
  bytes address = 1;
  repeated bytes storage_keys = 2;
}

enum TransactionTraceStatus {
  UNKNOWN = 0;
  SUCCEEDED = 1;
  FAILED = 2;
  REVERTED = 3;
}

message TransactionReceipt {
  bytes state_root = 1;
  uint64 cumulative_gas_used = 2;
  bytes logs_bloom = 3;
  repeated Log logs = 4;
  optional uint64 blob_gas_used = 5;
  optional BigInt blob_gas_price = 6;
  
  // Contract address if this transaction deployed a contract
  bytes contract_address = 7;
}

message Log {
  bytes address = 1;
  repeated bytes topics = 2;
  bytes data = 3;
  
  // Index relative to transaction
  uint32 index = 4;
  
  // Index relative to block
  uint32 block_index = 6;
  
  // Global ordinal for ordering within block
  uint64 ordinal = 7;
}

// ContractCreation tracks contract deployments
// This is an extension beyond base Firehose schema for indexing purposes
message ContractCreation {
  bytes address = 1;
  bytes deployer = 2;
  bytes transaction_hash = 3;
  uint64 block_number = 4;
  uint32 transaction_index = 5;
  bytes init_code = 6;  // Transaction input data
  uint64 ordinal = 7;
}

// BlockMeta is metadata stored alongside blocks in LevelDB
// Not part of the wire format, used for index management
message BlockMeta {
  uint64 block_number = 1;
  bytes block_hash = 2;
  string s3_key = 3;
  uint64 indexed_at = 4;
  bytes checksum = 5;
  uint64 size_bytes = 6;
  repeated bytes contract_addresses = 7;
  uint32 transaction_count = 8;
  uint32 log_count = 9;
}
```

---

## File Storage Format

### One-Block Files (Temporary)

Following Firehose's one-block file naming convention:

```
{block_number_padded}-{timestamp}-{block_hash_prefix}-{parent_hash_prefix}-{lib_num}
```

Example:
```
0000012345-20241115T143052.0-a1b2c3d4-e5f6g7h8-1
```

**Format**: Single serialized protobuf `Block` message  
**Location**: `{data_dir}/one-blocks/` (local) or `s3://{bucket}/one-blocks/` (remote)  
**Lifecycle**: Temporary, deleted after merging

### Merged Block Files (100-Blocks Bundles)

Following Firehose's merged blocks naming convention:

```
{start_block_padded}-{end_block_padded}
```

Example:
```
0000012300-0000012399
```

**Format**: `dbin` packed format containing 100 serialized `Block` messages  
**Location**: `s3://{bucket}/merged-blocks/`  
**Compression**: gzip

### dbin Packing Format

Firehose uses a simple binary packing format:

```
┌────────────────────────────────────────────────┐
│ Magic Number (4 bytes): "dbin"                 │
├────────────────────────────────────────────────┤
│ Version (1 byte): 0x01                         │
├────────────────────────────────────────────────┤
│ Content Type Length (varint)                   │
├────────────────────────────────────────────────┤
│ Content Type: "sf.apechain.type.v1.Block"      │
├────────────────────────────────────────────────┤
│ For each block:                                │
│   ├── Message Length (varint)                  │
│   └── Serialized Block (protobuf bytes)        │
├────────────────────────────────────────────────┤
│ EOF                                            │
└────────────────────────────────────────────────┘
```

### S3 Key Structure

```
{bucket}/
├── merged-blocks/
│   ├── 0000000000-0000000099.dbin.zst
│   ├── 0000000100-0000000199.dbin.zst
│   └── ...
├── one-blocks/           # Temporary, cleaned after merge
│   └── ...
└── index/
    ├── contracts/        # Contract deployment index files
    │   └── {block_range}.json
    └── state/
        └── indexer-state.json
```

---

## LevelDB Index Schema

### Key Prefixes

| Prefix | Key Format | Value | Purpose |
|--------|-----------|-------|---------|
| `mr:` | `mr:{start_block:010d}` | `MergedRangeIndex` | Map block ranges to S3 keys |
| `ct:` | `ct:{address}` | `ContractIndex` | Contract metadata and block ranges |
| `bc:` | `bc:{block_num:010d}` | `string[]` | Contracts deployed at block |
| `ev:` | `ev:{topic0}` | `EventSignatureIndex` | Event signature lookups |
| `st:` | `st:indexer` | `IndexerState` | Indexer checkpoint/state |
| `ob:` | `ob:{block_num:010d}` | `OneBlockMeta` | Pending one-block files |

### Index Value Types

```typescript
// Merged block range index
interface MergedRangeIndex {
  startBlock: number;
  endBlock: number;
  s3Key: string;
  checksum: string;        // SHA256 of compressed file
  sizeBytes: number;       // Compressed size
  indexedAt: number;       // Unix timestamp
  blockCount: number;      // Should be 100 unless final range
}

// Contract deployment index
interface ContractIndex {
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
  firstEventBlock: number;
  lastEventBlock: number;
}

// Event signature index
interface EventSignatureIndex {
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

// Indexer state checkpoint
interface IndexerState {
  lastMergedBlock: number;      // Last block in a merged bundle
  lastProcessedBlock: number;   // Last block processed (may be in pending one-blocks)
  pendingOneBlocks: number;     // Count of unmerged one-block files
  chainHead: number;            // Last known chain head
  isIndexing: boolean;          // Currently indexing flag
  lastCheckpoint: number;       // Unix timestamp
  version: string;              // Indexer version
}

// One-block file metadata (temporary)
interface OneBlockMeta {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  timestamp: number;
  localPath: string;
  size: number;
}
```

---

## Component Specifications

### 1. RPC Block Fetcher

**Responsibility**: Retrieve block data from ApeChain RPC endpoints

**RPC Methods Used**:
- `eth_getBlockByNumber` - Block headers and transaction list
- `eth_getTransactionReceipt` - Transaction receipts with logs
- `eth_chainId` - Chain identification
- `eth_blockNumber` - Current chain head

**Implementation**:

```typescript
interface BlockFetcherConfig {
  rpcEndpoints: string[];           // Primary + fallback endpoints
  batchSize: number;                // Blocks per batch (default: 10)
  maxConcurrentBatches: number;     // Parallel batches (default: 4)
  requestTimeoutMs: number;         // Per-request timeout (default: 30000)
  retryAttempts: number;            // Max retries (default: 5)
  retryDelayMs: number;             // Base retry delay (default: 1000)
  maxRetryDelayMs: number;          // Max retry delay (default: 30000)
}

interface FetchedBlock {
  block: RpcBlock;                  // eth_getBlockByNumber result
  receipts: Map<string, RpcReceipt>; // txHash -> receipt
  fetchedAt: number;                // Timestamp
}
```

**Batch Fetching Strategy**:
1. Use `eth_getBlockByNumber` with `hydrated: true` for full transaction objects
2. Batch receipt fetching using JSON-RPC batch requests
3. Implement request pooling across multiple RPC endpoints
4. Exponential backoff with jitter on failures

### 2. Block Processor / Extractor

**Responsibility**: Transform RPC responses into protobuf Block messages

**Processing Pipeline**:

```typescript
class BlockProcessor {
  // Transform RPC block to protobuf Block
  processBlock(fetched: FetchedBlock): sf.apechain.type.v1.Block {
    const block = new Block();
    block.ver = 1;
    block.detailLevel = DetailLevel.DETAILLEVEL_BASE;
    
    // Process header
    block.header = this.processHeader(fetched.block);
    block.hash = hexToBytes(fetched.block.hash);
    block.number = BigInt(fetched.block.number);
    block.size = BigInt(fetched.block.size);
    
    // Process transactions with ordinals
    let ordinal = 0;
    for (const tx of fetched.block.transactions) {
      const trace = this.processTransaction(tx, fetched.receipts.get(tx.hash));
      trace.beginOrdinal = ordinal++;
      trace.endOrdinal = ordinal++;
      
      // Process logs with ordinals
      for (const log of trace.receipt.logs) {
        log.ordinal = ordinal++;
      }
      
      block.transactionTraces.push(trace);
    }
    
    return block;
  }
  
  // Detect contract deployments
  extractContractCreations(block: Block): ContractCreation[] {
    const creations: ContractCreation[] = [];
    
    for (const trace of block.transactionTraces) {
      // Contract deployment: tx.to is null and receipt has contractAddress
      if (!trace.to && trace.receipt?.contractAddress) {
        creations.push({
          address: trace.receipt.contractAddress,
          deployer: trace.from,
          transactionHash: trace.hash,
          blockNumber: block.number,
          transactionIndex: trace.index,
          initCode: trace.input,
          ordinal: trace.beginOrdinal,
        });
      }
    }
    
    return creations;
  }
}
```

### 3. Proto Encoder

**Responsibility**: Serialize Block messages to protobuf binary format

**Implementation**:

```typescript
import * as protobuf from 'protobufjs';

class ProtoEncoder {
  private blockType: protobuf.Type;
  
  async init() {
    const root = await protobuf.load('proto/sf/apechain/type/v1/type.proto');
    this.blockType = root.lookupType('sf.apechain.type.v1.Block');
  }
  
  encodeBlock(block: Block): Uint8Array {
    const errMsg = this.blockType.verify(block);
    if (errMsg) throw new Error(`Invalid block: ${errMsg}`);
    
    const message = this.blockType.create(block);
    return this.blockType.encode(message).finish();
  }
  
  decodeBlock(buffer: Uint8Array): Block {
    return this.blockType.decode(buffer) as unknown as Block;
  }
}
```

### 4. One-Block File Writer

**Responsibility**: Write individual block files for later merging

**Implementation**:

```typescript
class OneBlockWriter {
  constructor(
    private dataDir: string,
    private encoder: ProtoEncoder,
  ) {}
  
  async writeOneBlock(block: Block): Promise<OneBlockMeta> {
    const encoded = this.encoder.encodeBlock(block);
    
    // Firehose naming convention
    const filename = this.formatOneBlockName(block);
    const localPath = path.join(this.dataDir, 'one-blocks', filename);
    
    await Bun.write(localPath, encoded);
    
    return {
      blockNumber: Number(block.number),
      blockHash: bytesToHex(block.hash),
      parentHash: bytesToHex(block.header.parentHash),
      timestamp: Number(block.header.timestamp.seconds),
      localPath,
      size: encoded.length,
    };
  }
  
  private formatOneBlockName(block: Block): string {
    const num = String(block.number).padStart(10, '0');
    const ts = this.formatTimestamp(block.header.timestamp);
    const hash = bytesToHex(block.hash).slice(2, 10);
    const parent = bytesToHex(block.header.parentHash).slice(2, 10);
    return `${num}-${ts}-${hash}-${parent}-1`;
  }
}
```

### 5. Block Merger

**Responsibility**: Combine one-block files into 100-block merged bundles

**dbin Format Implementation**:

```typescript
class BlockMerger {
  private readonly BUNDLE_SIZE = 100;
  private readonly DBIN_MAGIC = Buffer.from('dbin');
  private readonly DBIN_VERSION = 0x01;
  private readonly CONTENT_TYPE = 'sf.apechain.type.v1.Block';
  
  async mergeBundles(startBlock: number): Promise<MergedBundle> {
    const endBlock = startBlock + this.BUNDLE_SIZE - 1;
    const oneBlocks = await this.loadOneBlocks(startBlock, endBlock);
    
    // Create dbin packed format
    const chunks: Buffer[] = [];
    
    // Header
    chunks.push(this.DBIN_MAGIC);
    chunks.push(Buffer.from([this.DBIN_VERSION]));
    chunks.push(this.encodeVarint(this.CONTENT_TYPE.length));
    chunks.push(Buffer.from(this.CONTENT_TYPE));
    
    // Blocks
    for (const oneBlock of oneBlocks) {
      const blockData = await Bun.file(oneBlock.localPath).arrayBuffer();
      chunks.push(this.encodeVarint(blockData.byteLength));
      chunks.push(Buffer.from(blockData));
    }
    
    const merged = Buffer.concat(chunks);
    
    // Compress with zstd (or gzip as fallback)
    const compressed = await this.compress(merged);
    
    // Generate filename
    const filename = `${String(startBlock).padStart(10, '0')}-${String(endBlock).padStart(10, '0')}.dbin.zst`;
    
    return {
      filename,
      data: compressed,
      startBlock,
      endBlock,
      checksum: this.sha256(compressed),
      uncompressedSize: merged.length,
      compressedSize: compressed.length,
    };
  }
  
  private encodeVarint(value: number): Buffer {
    const bytes: number[] = [];
    while (value > 127) {
      bytes.push((value & 0x7f) | 0x80);
      value >>>= 7;
    }
    bytes.push(value);
    return Buffer.from(bytes);
  }
}
```

### 6. S3 Upload Manager

**Responsibility**: Upload merged blocks to S3 with reliability

**Implementation**:

```typescript
interface S3Config {
  bucket: string;
  region: string;
  prefix: string;                      // e.g., "apechain-mainnet"
  storageClass: 'STANDARD' | 'INTELLIGENT_TIERING';
  multipartThresholdBytes: number;     // Default: 100MB
  maxRetries: number;
  endpoint?: string;                   // For S3-compatible storage
}

class S3Uploader {
  private client: S3Client;
  
  async uploadMergedBlock(bundle: MergedBundle): Promise<string> {
    const key = `${this.config.prefix}/merged-blocks/${bundle.filename}`;
    
    if (bundle.data.length > this.config.multipartThresholdBytes) {
      await this.multipartUpload(key, bundle.data);
    } else {
      await this.client.send(new PutObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
        Body: bundle.data,
        StorageClass: this.config.storageClass,
        ContentType: 'application/octet-stream',
        Metadata: {
          'x-start-block': String(bundle.startBlock),
          'x-end-block': String(bundle.endBlock),
          'x-checksum': bundle.checksum,
          'x-uncompressed-size': String(bundle.uncompressedSize),
        },
      }));
    }
    
    // Verify upload
    const head = await this.client.send(new HeadObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
    }));
    
    if (head.ContentLength !== bundle.data.length) {
      throw new Error(`Upload verification failed for ${key}`);
    }
    
    return key;
  }
  
  async downloadMergedBlock(s3Key: string): Promise<MergedBundle> {
    const response = await this.client.send(new GetObjectCommand({
      Bucket: this.config.bucket,
      Key: s3Key,
    }));
    
    const data = await response.Body?.transformToByteArray();
    if (!data) throw new Error(`Failed to download ${s3Key}`);
    
    return this.parseMergedBundle(s3Key, Buffer.from(data));
  }
}
```

### 7. LevelDB Index Manager

**Responsibility**: Maintain queryable indexes for block ranges and contracts

**Implementation**:

```typescript
import { Level } from 'level';

class IndexManager {
  private db: Level<string, string>;
  
  async updateIndexes(bundle: MergedBundle, blocks: Block[]): Promise<void> {
    const batch = this.db.batch();
    
    // Update merged range index
    const rangeKey = `mr:${String(bundle.startBlock).padStart(10, '0')}`;
    batch.put(rangeKey, JSON.stringify({
      startBlock: bundle.startBlock,
      endBlock: bundle.endBlock,
      s3Key: bundle.s3Key,
      checksum: bundle.checksum,
      sizeBytes: bundle.compressedSize,
      indexedAt: Date.now(),
      blockCount: blocks.length,
    } as MergedRangeIndex));
    
    // Extract and index contracts
    for (const block of blocks) {
      const contracts = this.extractContracts(block);
      
      for (const contract of contracts) {
        await this.updateContractIndex(batch, contract, bundle);
      }
      
      // Index contracts by block
      if (contracts.length > 0) {
        const blockKey = `bc:${String(block.number).padStart(10, '0')}`;
        batch.put(blockKey, JSON.stringify(contracts.map(c => c.address)));
      }
      
      // Index event signatures
      await this.updateEventIndexes(batch, block, bundle);
    }
    
    // Update indexer state
    batch.put('st:indexer', JSON.stringify({
      lastMergedBlock: bundle.endBlock,
      lastProcessedBlock: bundle.endBlock,
      pendingOneBlocks: 0,
      chainHead: await this.getChainHead(),
      isIndexing: true,
      lastCheckpoint: Date.now(),
      version: '1.0.0',
    } as IndexerState));
    
    await batch.write();
  }
  
  // Query: Get S3 key for a block number
  async getS3KeyForBlock(blockNumber: number): Promise<string | null> {
    const rangeStart = Math.floor(blockNumber / 100) * 100;
    const key = `mr:${String(rangeStart).padStart(10, '0')}`;
    
    try {
      const data = await this.db.get(key);
      const range = JSON.parse(data) as MergedRangeIndex;
      return range.s3Key;
    } catch {
      return null;
    }
  }
  
  // Query: Get contract deployment info
  async getContract(address: string): Promise<ContractIndex | null> {
    const key = `ct:${address.toLowerCase()}`;
    
    try {
      const data = await this.db.get(key);
      return JSON.parse(data) as ContractIndex;
    } catch {
      return null;
    }
  }
  
  // Query: Get all contracts deployed in a block range
  async getContractsInRange(startBlock: number, endBlock: number): Promise<string[]> {
    const contracts: string[] = [];
    
    for await (const [key, value] of this.db.iterator({
      gte: `bc:${String(startBlock).padStart(10, '0')}`,
      lte: `bc:${String(endBlock).padStart(10, '0')}`,
    })) {
      contracts.push(...JSON.parse(value));
    }
    
    return contracts;
  }
}
```

### 8. Main Indexer Orchestrator

**Responsibility**: Coordinate all components for end-to-end indexing

**Implementation**:

```typescript
class ApeChainIndexer {
  constructor(
    private fetcher: BlockFetcher,
    private processor: BlockProcessor,
    private encoder: ProtoEncoder,
    private oneBlockWriter: OneBlockWriter,
    private merger: BlockMerger,
    private s3Uploader: S3Uploader,
    private indexManager: IndexManager,
    private config: IndexerConfig,
  ) {}
  
  async startHistoricalIndexing(fromBlock?: number): Promise<void> {
    const state = await this.indexManager.getState();
    const startBlock = fromBlock ?? (state?.lastMergedBlock ?? 0) + 1;
    const chainHead = await this.fetcher.getChainHead();
    
    this.logger.info(`Starting historical indexing from ${startBlock} to ${chainHead}`);
    
    let currentBlock = startBlock;
    const pendingOneBlocks: OneBlockMeta[] = [];
    
    while (currentBlock <= chainHead) {
      // Fetch batch of blocks
      const batchEnd = Math.min(currentBlock + this.config.batchSize - 1, chainHead);
      const fetchedBlocks = await this.fetcher.fetchBlockRange(currentBlock, batchEnd);
      
      // Process and write one-block files
      for (const fetched of fetchedBlocks) {
        const block = this.processor.processBlock(fetched);
        const meta = await this.oneBlockWriter.writeOneBlock(block);
        pendingOneBlocks.push(meta);
        
        // Extract contracts for logging
        const contracts = this.processor.extractContractCreations(block);
        if (contracts.length > 0) {
          this.logger.debug(`Block ${block.number}: ${contracts.length} contract(s) deployed`);
        }
      }
      
      currentBlock = batchEnd + 1;
      
      // Check if we have 100 blocks ready to merge
      while (pendingOneBlocks.length >= 100) {
        const toMerge = pendingOneBlocks.splice(0, 100);
        await this.mergeAndUpload(toMerge);
      }
      
      // Periodic checkpoint
      if (currentBlock % 1000 === 0) {
        await this.indexManager.checkpoint(currentBlock, pendingOneBlocks.length);
      }
    }
    
    // Handle remaining blocks (less than 100)
    if (pendingOneBlocks.length > 0 && this.config.mergePartialBundles) {
      await this.mergeAndUpload(pendingOneBlocks);
    }
    
    this.logger.info(`Historical indexing complete up to block ${chainHead}`);
  }
  
  private async mergeAndUpload(oneBlocks: OneBlockMeta[]): Promise<void> {
    const startBlock = oneBlocks[0].blockNumber;
    
    // Load blocks for indexing
    const blocks: Block[] = [];
    for (const meta of oneBlocks) {
      const data = await Bun.file(meta.localPath).arrayBuffer();
      blocks.push(this.encoder.decodeBlock(new Uint8Array(data)));
    }
    
    // Merge into bundle
    const bundle = await this.merger.mergeBundles(startBlock);
    
    // Upload to S3
    bundle.s3Key = await this.s3Uploader.uploadMergedBlock(bundle);
    
    // Update indexes
    await this.indexManager.updateIndexes(bundle, blocks);
    
    // Cleanup one-block files
    for (const meta of oneBlocks) {
      await Bun.file(meta.localPath).unlink();
    }
    
    this.logger.info(`Merged and uploaded blocks ${bundle.startBlock}-${bundle.endBlock}`);
  }
  
  async startLiveIndexing(): Promise<void> {
    const state = await this.indexManager.getState();
    let lastBlock = state?.lastProcessedBlock ?? 0;
    
    this.logger.info(`Starting live indexing from block ${lastBlock + 1}`);
    
    const pendingOneBlocks: OneBlockMeta[] = [];
    
    while (true) {
      const chainHead = await this.fetcher.getChainHead();
      
      while (lastBlock < chainHead) {
        const nextBlock = lastBlock + 1;
        const fetched = await this.fetcher.fetchBlock(nextBlock);
        const block = this.processor.processBlock(fetched);
        const meta = await this.oneBlockWriter.writeOneBlock(block);
        pendingOneBlocks.push(meta);
        
        lastBlock = nextBlock;
        
        // Merge when we have 100 blocks
        if (pendingOneBlocks.length >= 100) {
          const toMerge = pendingOneBlocks.splice(0, 100);
          await this.mergeAndUpload(toMerge);
        }
      }
      
      // Wait for new blocks
      await Bun.sleep(this.config.pollIntervalMs);
    }
  }
}
```

---

## Query Interface

### Local Query Service

```typescript
interface QueryService {
  // Block queries
  getBlock(blockNumber: number): Promise<Block>;
  getBlockRange(start: number, end: number): Promise<Block[]>;
  getBlockByHash(hash: string): Promise<Block | null>;
  
  // Contract queries  
  getContract(address: string): Promise<ContractIndex | null>;
  getContractsByDeployer(deployer: string): Promise<ContractIndex[]>;
  getContractsInBlockRange(start: number, end: number): Promise<ContractIndex[]>;
  
  // Event queries
  getEventsForContract(
    address: string,
    options?: { startBlock?: number; endBlock?: number; topics?: string[] }
  ): Promise<Log[]>;
  
  getEventsBySignature(
    topic0: string,
    options?: { startBlock?: number; endBlock?: number }
  ): Promise<Log[]>;
  
  // Index management
  getIndexerState(): Promise<IndexerState>;
  getBlockRangeIndex(startBlock: number): Promise<MergedRangeIndex | null>;
}
```

### Query Implementation

```typescript
class QueryServiceImpl implements QueryService {
  constructor(
    private indexManager: IndexManager,
    private s3Uploader: S3Uploader,
    private encoder: ProtoEncoder,
    private cache: LRUCache<string, Block[]>,
  ) {}
  
  async getBlock(blockNumber: number): Promise<Block> {
    const s3Key = await this.indexManager.getS3KeyForBlock(blockNumber);
    if (!s3Key) throw new Error(`Block ${blockNumber} not indexed`);
    
    const blocks = await this.loadMergedBlocksCached(s3Key);
    const block = blocks.find(b => Number(b.number) === blockNumber);
    
    if (!block) throw new Error(`Block ${blockNumber} not found in bundle`);
    return block;
  }
  
  async getEventsForContract(
    address: string,
    options?: { startBlock?: number; endBlock?: number; topics?: string[] }
  ): Promise<Log[]> {
    const contract = await this.indexManager.getContract(address);
    if (!contract) return [];
    
    const logs: Log[] = [];
    const normalizedAddress = address.toLowerCase();
    
    for (const range of contract.eventRanges) {
      if (options?.startBlock && range.endBlock < options.startBlock) continue;
      if (options?.endBlock && range.startBlock > options.endBlock) continue;
      
      const blocks = await this.loadMergedBlocksCached(range.s3Key);
      
      for (const block of blocks) {
        const blockNum = Number(block.number);
        if (options?.startBlock && blockNum < options.startBlock) continue;
        if (options?.endBlock && blockNum > options.endBlock) continue;
        
        for (const trace of block.transactionTraces) {
          for (const log of trace.receipt?.logs ?? []) {
            if (bytesToHex(log.address).toLowerCase() !== normalizedAddress) continue;
            
            if (options?.topics) {
              const logTopics = log.topics.map(t => bytesToHex(t));
              const matches = options.topics.every((t, i) => 
                !t || logTopics[i]?.toLowerCase() === t.toLowerCase()
              );
              if (!matches) continue;
            }
            
            logs.push(log);
          }
        }
      }
    }
    
    return logs;
  }
  
  private async loadMergedBlocksCached(s3Key: string): Promise<Block[]> {
    const cached = this.cache.get(s3Key);
    if (cached) return cached;
    
    const bundle = await this.s3Uploader.downloadMergedBlock(s3Key);
    const blocks = this.parseDbin(bundle.data);
    
    this.cache.set(s3Key, blocks);
    return blocks;
  }
  
  private parseDbin(data: Buffer): Block[] {
    // Decompress if needed
    const decompressed = this.decompress(data);
    
    // Parse dbin format
    let offset = 0;
    
    // Magic
    const magic = decompressed.subarray(offset, offset + 4);
    if (magic.toString() !== 'dbin') throw new Error('Invalid dbin magic');
    offset += 4;
    
    // Version
    const version = decompressed[offset++];
    if (version !== 1) throw new Error(`Unsupported dbin version: ${version}`);
    
    // Content type
    const [contentTypeLen, contentTypeLenBytes] = this.decodeVarint(decompressed, offset);
    offset += contentTypeLenBytes;
    const contentType = decompressed.subarray(offset, offset + contentTypeLen).toString();
    offset += contentTypeLen;
    
    // Blocks
    const blocks: Block[] = [];
    while (offset < decompressed.length) {
      const [msgLen, msgLenBytes] = this.decodeVarint(decompressed, offset);
      offset += msgLenBytes;
      
      const blockData = decompressed.subarray(offset, offset + msgLen);
      blocks.push(this.encoder.decodeBlock(blockData));
      offset += msgLen;
    }
    
    return blocks;
  }
}
```

---

## Configuration

```typescript
import { z } from 'zod';

const ConfigSchema = z.object({
  // Chain configuration
  chain: z.object({
    name: z.literal('apechain'),
    chainId: z.number().default(33139),  // ApeChain mainnet
    rpcEndpoints: z.array(z.string().url()).min(1),
    startBlock: z.number().default(0),
    blockTimeMs: z.number().default(2000),
  }),
  
  // Indexer settings
  indexer: z.object({
    batchSize: z.number().default(10),           // Blocks per RPC batch
    bundleSize: z.number().default(100),         // Blocks per merged bundle (Firehose standard)
    maxConcurrentBatches: z.number().default(4),
    pollIntervalMs: z.number().default(2000),    // Live indexing poll interval
    mergePartialBundles: z.boolean().default(false), // Merge <100 block bundles
    checkpointIntervalBlocks: z.number().default(1000),
  }),
  
  // Storage configuration
  storage: z.object({
    dataDir: z.string().default('./data'),
    oneBlocksDir: z.string().default('./data/one-blocks'),
    leveldbPath: z.string().default('./data/leveldb'),
    cacheMaxEntries: z.number().default(100),    // Merged block cache
  }),
  
  // S3 configuration
  s3: z.object({
    bucket: z.string(),
    region: z.string().default('us-east-1'),
    prefix: z.string().default('apechain-indexer'),
    storageClass: z.enum(['STANDARD', 'INTELLIGENT_TIERING']).default('STANDARD'),
    endpoint: z.string().optional(),             // For S3-compatible storage
    forcePathStyle: z.boolean().default(false),
  }),
  
  // Logging
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    format: z.enum(['json', 'pretty']).default('json'),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;
```

---

## Project Structure

```
apechain-indexer/
├── src/
│   ├── index.ts                    # Entry point
│   ├── cli.ts                      # CLI commands
│   │
│   ├── config/
│   │   ├── index.ts                # Config loader
│   │   └── schema.ts               # Zod schemas
│   │
│   ├── fetcher/
│   │   ├── index.ts                # Block fetcher
│   │   ├── rpc-client.ts           # JSON-RPC client
│   │   ├── batch-processor.ts      # Batch request handling
│   │   └── types.ts                # RPC response types
│   │
│   ├── processor/
│   │   ├── index.ts                # Block processor
│   │   ├── block-parser.ts         # RPC to proto conversion
│   │   ├── contract-extractor.ts   # Contract detection
│   │   └── ordinal-tracker.ts      # Ordinal assignment
│   │
│   ├── proto/
│   │   ├── encoder.ts              # Proto encoding
│   │   ├── decoder.ts              # Proto decoding
│   │   └── dbin.ts                 # dbin format handler
│   │
│   ├── storage/
│   │   ├── one-block-writer.ts     # One-block file operations
│   │   ├── merger.ts               # 100-block merger
│   │   ├── s3-client.ts            # S3 operations
│   │   └── leveldb/
│   │       ├── client.ts           # LevelDB wrapper
│   │       ├── indexes.ts          # Index schemas
│   │       └── queries.ts          # Query implementations
│   │
│   ├── indexer/
│   │   ├── index.ts                # Main orchestrator
│   │   ├── historical.ts           # Historical sync
│   │   ├── live.ts                 # Live sync
│   │   └── checkpoint.ts           # State management
│   │
│   ├── query/
│   │   └── service.ts              # Query interface
│   │
│   └── utils/
│       ├── logger.ts               # Pino logger
│       ├── metrics.ts              # Prometheus metrics
│       ├── bytes.ts                # Byte utilities
│       └── retry.ts                # Retry logic
│
├── proto/
│   └── sf/
│       └── apechain/
│           └── type/
│               └── v1/
│                   └── type.proto  # Protobuf definitions
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── scripts/
│   ├── generate-proto.ts           # Proto codegen
│   ├── backfill.ts                 # Parallel backfill
│   ├── verify-integrity.ts         # Data verification
│   └── export-blocks.ts            # Export tools
│
├── config/
│   ├── default.json
│   └── production.json
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── bunfig.toml
└── README.md
```

---

## Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Project setup with Bun.js and TypeScript
- [ ] Protobuf schema definition following Firehose conventions
- [ ] Proto code generation and encoder/decoder implementation
- [ ] dbin format implementation
- [ ] Basic RPC client with retry logic

### Phase 2: Block Processing Pipeline (Week 3-4)
- [ ] Block fetcher with batch processing
- [ ] Block processor (RPC to proto conversion)
- [ ] Ordinal tracking implementation
- [ ] One-block file writer
- [ ] 100-block merger
- [ ] Unit tests for core components

### Phase 3: Storage Layer (Week 5-6)
- [ ] S3 client with upload/download
- [ ] LevelDB index manager
- [ ] Index schema implementation
- [ ] Query service implementation
- [ ] Integration tests

### Phase 4: Indexer Orchestration (Week 7-8)
- [ ] Historical indexing flow
- [ ] Live indexing flow
- [ ] Checkpoint/recovery system
- [ ] CLI interface
- [ ] End-to-end tests

### Phase 5: Production Readiness (Week 9-10)
- [ ] Prometheus metrics integration
- [ ] Docker containerization
- [ ] Performance optimization
- [ ] Documentation
- [ ] Load testing

---

## Metrics & Monitoring

```typescript
// Prometheus metrics
const metrics = {
  // Progress
  blocksIndexedTotal: new Counter('indexer_blocks_indexed_total'),
  currentBlockHeight: new Gauge('indexer_current_block_height'),
  chainHeadBlock: new Gauge('indexer_chain_head_block'),
  blocksBehind: new Gauge('indexer_blocks_behind'),
  
  // Performance
  blocksPerSecond: new Gauge('indexer_blocks_per_second'),
  fetchLatencyMs: new Histogram('indexer_fetch_latency_ms'),
  processLatencyMs: new Histogram('indexer_process_latency_ms'),
  mergeLatencyMs: new Histogram('indexer_merge_latency_ms'),
  uploadLatencyMs: new Histogram('indexer_upload_latency_ms'),
  
  // Storage
  mergedBundlesTotal: new Counter('indexer_merged_bundles_total'),
  s3UploadBytesTotal: new Counter('indexer_s3_upload_bytes_total'),
  leveldbSizeBytes: new Gauge('indexer_leveldb_size_bytes'),
  pendingOneBlocks: new Gauge('indexer_pending_one_blocks'),
  
  // Contracts
  contractsIndexedTotal: new Counter('indexer_contracts_indexed_total'),
  
  // Errors
  rpcErrorsTotal: new Counter('indexer_rpc_errors_total'),
  s3ErrorsTotal: new Counter('indexer_s3_errors_total'),
  processingErrorsTotal: new Counter('indexer_processing_errors_total'),
};
```

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Block Coverage | 100% of chain history |
| Data Gaps | Zero missing blocks |
| Historical Indexing Speed | 200+ blocks/second |
| Live Indexing Delay | < 10 seconds from chain head |
| Query Latency (single block) | < 500ms |
| Query Latency (block range) | < 2s for 1000 blocks |
| S3 Upload Success Rate | > 99.9% |
| Recovery Time | < 60 seconds from crash |

---

## Firehose Compatibility Checklist

- [x] **Protobuf Schema**: `sf.apechain.type.v1.Block` following Firehose conventions
- [x] **File Naming**: One-block and merged-block file naming conventions
- [x] **dbin Format**: Binary packing format for merged blocks
- [x] **100-Block Bundles**: Standard bundle size matching Firehose Merger
- [x] **Ordinal System**: Global ordering within blocks
- [x] **DetailLevel Field**: BASE level for RPC-extracted data
- [x] **Object Storage**: S3-compatible flat file storage
- [ ] **EXTENDED DetailLevel**: Not supported (requires instrumented node)
- [ ] **ForkDB**: Simplified model without full fork tracking
- [ ] **gRPC Streaming**: Not implemented in v1

---

## Future Enhancements (v2+)

1. **gRPC Streaming Interface**: Firehose-compatible gRPC server
2. **Substreams Integration**: Direct Substreams execution support
3. **Multi-Chain Support**: Abstract for other EVM chains
4. **EXTENDED Detail Level**: Integration with trace-enabled RPC (debug_traceBlock)
5. **Fork Handling**: Full ForkDB implementation for reorg handling
6. **Distributed Indexing**: Horizontal scaling across workers
7. **Real-Time Subscriptions**: WebSocket-based block streaming

---

*Document Version: 1.0*  
*Firehose Reference: sf.ethereum.type.v2 (StreamingFast)*  
*Author: Engineering Team*