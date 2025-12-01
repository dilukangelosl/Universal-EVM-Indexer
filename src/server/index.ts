import { QueryServiceImpl } from '../query/service.js';
import { IndexManager } from '../storage/leveldb/client.js';
import { S3Uploader } from '../storage/s3-client.js';
import { Config } from '../config/index.js';
import { Logger } from 'pino';
import { bytesToHex } from '../utils/bytes.js';

export class ApiServer {
  private queryService: QueryServiceImpl;
  private port: number;

  constructor(
    private config: Config,
    private logger: Logger,
    indexManager?: IndexManager, // Allow injection
    port: number = 3000
  ) {
    this.port = port;
    
    const manager = indexManager || new IndexManager(config.storage.leveldbPath);
    const s3Uploader = new S3Uploader(config.s3);
    this.queryService = new QueryServiceImpl(manager, s3Uploader);
  }

  async start() {
    await this.queryService.init();
    this.logger.info(`Starting API Server on port ${this.port}...`);
    
    Bun.serve({
      port: this.port,
      fetch: this.handleRequest.bind(this),
    });
  }
  
  private async handleRequest(req: Request): Promise<Response> {
      const url = new URL(req.url);
      const path = url.pathname;
      
      try {
          // Health / Status
          if (path === '/status' || path === '/') {
              const state = await this.queryService.getIndexerState();
              return Response.json({ status: 'ok', state });
          }
          
          // GET /block/:number
          if (path.startsWith('/block/')) {
              const blockNumStr = path.split('/')[2];
              const blockNum = parseInt(blockNumStr, 10);
              if (isNaN(blockNum)) return new Response('Invalid block number', { status: 400 });
              
              const block = await this.queryService.getBlock(blockNum);
              // Convert proto to JSON friendly
              return Response.json(this.toJson(block));
          }
          
          // GET /contract/:address/events
          // GET /contract/:address
          if (path.startsWith('/contract/')) {
              const parts = path.split('/');
              const address = parts[2];
              
              if (parts[3] === 'events') {
                  const start = url.searchParams.get('start') ? parseInt(url.searchParams.get('start')!, 10) : undefined;
                  const end = url.searchParams.get('end') ? parseInt(url.searchParams.get('end')!, 10) : undefined;
                  
                  const events = await this.queryService.getEventsForContract(address, {
                      startBlock: start,
                      endBlock: end
                  });
                  
                  return Response.json(events.map(e => this.logToJson(e)));
              } else {
                  const contract = await this.queryService.getContract(address);
                  if (!contract) return new Response('Contract not found', { status: 404 });
                  return Response.json(contract);
              }
          }
          
          return new Response('Not Found', { status: 404 });
          
      } catch (e: any) {
          this.logger.error(`API Error: ${e.message}`);
          return Response.json({ error: e.message }, { status: 500 });
      }
  }
  
  // Helper to make Protobuf objects JSON-friendly (handling Longs/Buffers)
  private toJson(obj: any): any {
      return JSON.parse(JSON.stringify(obj, (key, value) => {
          if (key === 'hash' || key === 'parentHash' || key === 'address' || key === 'to' || key === 'from' || key === 'input' || key === 'data') {
               if (value && value.type === 'Buffer') return '0x' + Buffer.from(value.data).toString('hex');
          }
          return value;
      }));
  }
  
  private logToJson(log: any): any {
       return {
           address: log.address ? '0x' + Buffer.from(log.address).toString('hex') : null,
           topics: log.topics ? log.topics.map((t: any) => '0x' + Buffer.from(t).toString('hex')) : [],
           data: log.data ? '0x' + Buffer.from(log.data).toString('hex') : null,
           blockNumber: typeof log.blockNumber === 'number' ? log.blockNumber : log.blockNumber?.toString(),
           transactionHash: log.transactionHash ? '0x' + Buffer.from(log.transactionHash).toString('hex') : null,
           logIndex: log.index
       };
  }
}
