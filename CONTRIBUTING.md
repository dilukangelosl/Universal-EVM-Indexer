# Contributing to ApeChain Indexer

We welcome contributions! This project aims to be a robust, high-performance indexer framework.

## Development Setup

1.  **Prerequisites**:
    -   [Bun](https://bun.sh) runtime (v1.0+).
    -   Node.js compatible environment.

2.  **Install Dependencies**:
    ```bash
    bun install
    ```

3.  **Build**:
    ```bash
    bun run build
    ```

## Running Tests

We use `bun:test` for unit and integration tests. Mocks are provided for RPC and S3 to allow offline testing.

```bash
bun test
```

## Project Structure

-   `src/fetcher`: RPC interactions and block fetching logic.
-   `src/processor`: RPC-to-Protobuf transformation.
-   `src/storage`: Local file writes, Merge logic (dbin), S3 uploads, LevelDB.
-   `src/indexer`: Orchestration engine (Historical/Live loops).
-   `src/proto`: Protobuf definitions and generated code.

## Adding Features

1.  **New Chains**: Update `config` defaults or extend `BlockProcessor` if chain-specific logic is needed.
2.  **Storage Backends**: Implement interfaces in `src/storage` to support IPFS or other stores.

## Pull Request Process

1.  Fork the repo and create a branch.
2.  Add tests for your new feature (use `tests/mocks` if needed).
3.  Ensure `bun test` passes.
4.  Submit PR.

## Code Style

-   Use TypeScript strict mode.
-   Prefer `async/await` and `Promise.all` for concurrency.
-   Logs should be structured (using `pino`).
