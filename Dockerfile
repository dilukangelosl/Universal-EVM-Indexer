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

# Expose metrics port if applicable (none specifically in config but good practice)
# EXPOSE 9102 

# Start command
CMD ["bun", "run", "src/index.ts", "start", "-c", "config/run.json"]
