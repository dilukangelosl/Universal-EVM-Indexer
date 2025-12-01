# Universal EVM Indexer

A high-performance, Firehose-compatible blockchain indexer designed for any EVM-compatible chain (ApeChain, Ethereum, Berachain, etc.).

It extracts raw block data via standard JSON-RPC, processes it into structured Protobuf messages (`sf.apechain.type.v1.Block`), and stores "flat files" (merged bundles) in Object Storage (S3, Backblaze B2, Cloudflare R2) while maintaining a local LevelDB index for ultra-fast random access queries.

**Author:** Diluk Angelo

---

## Key Features

*   **Node-Like Behavior**: Automatically syncs historical data and transitions to "Live Mode" to listen for new blocks indefinitey.
*   **High Throughput**: Fetches thousands of blocks per minute using concurrent batched RPC requests.
*   **Cost-Effective Storage**: Native support for S3-compatible providers (Backblaze B2, R2, Wasabi) to minimize operational costs.
*   **Resilient**: Auto-resumes from checkpoints (LevelDB) and automatically repairs partial batches on restart.
*   **Parallel Querying**: Built-in query service with cached and parallelized S3 fetching (2.5x faster than typical serial requests).
*   **Dockerized**: Production-ready setup included via Docker Compose.

---

## Quick Start (Docker)

The recommended way to run the indexer is using Docker.

### 1. Configure Credentials
Create a `.env` file in the root directory to set your Cloud Storage credentials.
**Example (`.env`):**
```env
# Backblaze B2 / AWS S3 / R2
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET=your-bucket-name
S3_REGION=us-east-005
S3_ENDPOINT=https://s3.us-east-005.backblazeb2.com
```

### 2. Configure Chain
Edit `config/run.json` to set your RPC endpoint and chain details.
```json
{
  "chain": {
    "chainId": 33139,
    "rpcEndpoints": ["https://rpc.apechain.com"], 
    "startBlock": 0
  }
  // ... see config/default.json for full options
}
```

### 3. Run
```bash
docker-compose up -d
```
The indexer will start, fetch blocks, merge them into bundles, and upload them to your storage bucket. Data persistence is handled via the `./run-data` volume.

---

## Development & Local Run

If you prefer running without Docker (requires [Bun](https://bun.sh)):

```bash
# 1. Install Dependencies
bun install

# 2. Setup Environment
# (Ensure .env is created as above)

# 3. Run Indexer
bun run src/index.ts start -c config/run.json
```

### Running the Demo Query
Verify your data is accessible and query the index:

```bash
bun run scripts/demo-query.ts
```
This script will:
1.  Connect to your Cloud Storage (B2/S3).
2.  Fetch the latest indexer state.
3.  Download and inspect a block bundle.
4.  **Benchmark** parallel download speeds versus serial execution.

---

## Configuration Guide

Key settings in `config/run.json`:

| Section | Option | Description |
| :--- | :--- | :--- |
| `indexer` | `batchSize` | Blocks per JSON-RPC request (e.g., 20-50). |
| `indexer` | `processingBatchSize` | Number of blocks processed/merged in memory before upload (e.g. 1000). |
| `indexer` | `maxConcurrentBatches` | How many RPC requests to run in parallel (Control throughput). |
| `s3` | `endpoint` | Custom endpoint for non-AWS providers (e.g., Backblaze, R2). |

### Storage Providers
This indexer includes specific optimizations for:
*   **Cloudflare R2**: Zero egress fees (Recommended for high read usage).
*   **Backblaze B2**: Lowest storage cost (Recommended for archival).
*   **AWS S3**: Standard industry support.

---

## Architecture

1.  **BlockFetcher**: Parallel RPC batching with automatic retry/backoff.
2.  **BlockProcessor**: Converts raw JSON-RPC to strictly typed Protobuf.
3.  **OneBlockWriter**: Writes temp files locally (`dbin` fragments).
4.  **BlockMerger**: Merges 100 blocks into compressed bundles (`.dbin.zst`).
5.  **S3Uploader**: Async upload queue to Object Storage.
6.  **LevelDB**: Stores `block_num -> s3_key` mapping and contract deployment index.

## License

MIT
