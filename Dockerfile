# Use the official Bun image
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
# Copy package.json and bun.lock (if exists) first to cache dependencies
COPY package.json bun.lock* ./
RUN bun install --scan-imports

# Copy source code
COPY . .

# Create run-data directory (for volume mount)
RUN mkdir -p run-data

# Expose API port
EXPOSE 3000

# Start command with API server enabled
CMD ["bun", "run", "src/index.ts", "start", "-c", "config/run.json", "--serve", "--port", "3000"]
