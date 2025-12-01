# Universal EVM Indexer

A high-performance, Firehose-compatible blockchain indexer for any EVM-compatible chain (ApeChain, Ethereum, Base, etc.). It extracts data via RPC, processes it into structured Protobuf messages, and stores "flat files" in S3 for downstream consumption.

**Author:** Diluk Angelo (https://x.com/cryptoangelodev)

## Features

-   **High Throughput**: Fetches thousands of blocks per minute using concurrent batched RPC requests.
-   **Standard Output**: Produces 100-block merged bundles (`.dbin`) compatible with StreamingFast standards.
-   **Robust**: Handles RPC rate limits, missing S3 credentials, and resumes from checkpoints.
-   **Production Ready**: Prometheus metrics, structured logging, and scalable architecture.

## Quick Start

```bash
# 1. Install
bun install

# 2. Configure
cp config/default.json config/run.json
# Edit config/run.json with your RPC/S3 details

# 3. Run
bun run src/index.ts start -c config/run.json
```

## Configuration

See `config/default.json` for all options. Key performance tuning:

-   `processingBatchSize`: Number of blocks to process in memory per loop (e.g., 1000).
-   `batchSize`: Maximum blocks per single JSON-RPC request (e.g., 20-50).
-   `maxConcurrentBatches`: (Derived or explicit) Parallel RPC requests.

## contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on setting up dev environment and running tests.

## License

MIT
