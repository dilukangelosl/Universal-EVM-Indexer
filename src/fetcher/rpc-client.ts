import { RpcBlock, RpcReceipt } from './types.js';
import { Logger } from 'pino';

export interface RpcClientConfig {
  endpoints: string[];
  timeoutMs: number;
  retries: number;
  retryDelayMs: number;
}

export class JsonRpcClient {
  private currentEndpointIndex = 0;

  constructor(
    private config: RpcClientConfig,
    private logger: Logger
  ) {}

  private getEndpoint(): string {
    return this.config.endpoints[this.currentEndpointIndex];
  }

  private rotateEndpoint() {
    this.currentEndpointIndex = (this.currentEndpointIndex + 1) % this.config.endpoints.length;
    this.logger.warn(`Rotating to RPC endpoint: ${this.getEndpoint()}`);
  }

  async request<T>(method: string, params: any[] = []): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        return await this.makeRequest<T>(method, params);
      } catch (error: any) {
        lastError = error;
        this.logger.warn({
          msg: 'RPC request failed',
          method,
          error: error.message,
          attempt: attempt + 1,
          endpoint: this.getEndpoint()
        });

        if (attempt < this.config.retries - 1) {
          this.rotateEndpoint();
          
          // Special handling for Rate Limits (429)
          let delay = this.config.retryDelayMs * Math.pow(2, attempt);
          if (error.message.includes('429')) {
              delay += 5000 + Math.random() * 5000; // Add 5-10s jitter
              this.logger.warn(`Hit Rate Limit (429). Pausing for ${Math.round(delay)}ms`);
          }
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error(`RPC request failed after ${this.config.retries} attempts`);
  }

  async batchRequest<T>(requests: { method: string; params: any[] }[]): Promise<T[]> {
    if (requests.length === 0) return [];

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.config.retries; attempt++) {
      try {
        return await this.makeBatchRequest<T>(requests);
      } catch (error: any) {
        lastError = error;
        this.logger.warn({
          msg: 'RPC batch request failed',
          batchSize: requests.length,
          error: error.message,
          attempt: attempt + 1,
          endpoint: this.getEndpoint()
        });

        if (attempt < this.config.retries - 1) {
          this.rotateEndpoint();
          
          let delay = this.config.retryDelayMs * Math.pow(2, attempt);
          if (error.message.includes('429')) {
              delay += 5000 + Math.random() * 5000;
              this.logger.warn(`Hit Rate Limit (429) in batch. Pausing for ${Math.round(delay)}ms`);
          }

          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error(`RPC batch request failed after ${this.config.retries} attempts`);
  }

  private async makeRequest<T>(method: string, params: any[]): Promise<T> {
    const response = await fetch(this.getEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params
      }),
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;

    if (data.error) {
      throw new Error(`RPC error: ${data.error.code} - ${data.error.message}`);
    }

    return data.result;
  }

  private async makeBatchRequest<T>(requests: { method: string; params: any[] }[]): Promise<T[]> {
    const payload = requests.map((req, i) => ({
      jsonrpc: '2.0',
      id: i,
      method: req.method,
      params: req.params
    }));

    const response = await fetch(this.getEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any[];

    if (!Array.isArray(data)) {
      throw new Error('Invalid batch response: expected array');
    }

    // Sort by ID to match request order
    const sorted = data.sort((a, b) => (a.id as number) - (b.id as number));

    return sorted.map(item => {
      if (item.error) {
        throw new Error(`RPC error in batch: ${item.error.code} - ${item.error.message}`);
      }
      return item.result;
    });
  }

  async getBlockByNumber(number: number): Promise<RpcBlock | null> {
    const hex = '0x' + number.toString(16);
    return this.request<RpcBlock | null>('eth_getBlockByNumber', [hex, true]);
  }

  async getChainId(): Promise<number> {
    const hex = await this.request<string>('eth_chainId');
    return parseInt(hex, 16);
  }

  async getBlockNumber(): Promise<number> {
    const hex = await this.request<string>('eth_blockNumber');
    return parseInt(hex, 16);
  }
}
