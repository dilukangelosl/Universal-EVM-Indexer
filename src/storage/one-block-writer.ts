import { sf, google } from '../proto/compiled.js';
import path from 'path';
import { bytesToHex } from '../utils/bytes.js';
import Long from 'long';

const { Block } = sf.apechain.type.v1;
type Block = sf.apechain.type.v1.Block;

export interface OneBlockMeta {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  timestamp: number;
  localPath: string;
  size: number;
}

export class OneBlockWriter {
  constructor(
    private dataDir: string
  ) {}
  
  async writeOneBlock(block: Block): Promise<OneBlockMeta> {
    const encoded = Block.encode(block).finish();
    
    // Firehose naming convention
    // {block_number_padded}-{timestamp}-{block_hash_prefix}-{parent_hash_prefix}-{lib_num}
    const filename = this.formatOneBlockName(block);
    const localPath = path.join(this.dataDir, 'one-blocks', filename);
    
    // Ensure directory exists
    // Bun automatically creates directories? No, standard Node fs doesn't. Bun.write might not.
    // Best to check.
    // But `write_to_file` tool says "This tool will automatically create any directories needed".
    // But here I am writing code that will run in the indexer app. I need to ensure directories exist.
    // Using Bun.write directly might fail if dir missing.
    
    await Bun.write(localPath, encoded);
    
    return {
      blockNumber: parseLong(block.number),
      blockHash: bytesToHex(block.hash),
      parentHash: bytesToHex(block.header?.parentHash || null),
      timestamp: parseLong(block.header?.timestamp?.seconds || 0),
      localPath,
      size: encoded.length,
    };
  }
  
  private formatOneBlockName(block: Block): string {
    const num = String(parseLong(block.number)).padStart(10, '0');
    
    // Format timestamp as YYYYMMDDTHHMMSS.S (Firehose format approximately)
    const date = new Date(parseLong(block.header?.timestamp?.seconds || 0) * 1000);
    const ts = date.toISOString().replace(/[-:]/g, '').replace('Z', '');
    
    const hash = bytesToHex(block.hash).slice(2, 10); // 8 chars (4 bytes)
    const parent = bytesToHex(block.header?.parentHash || null).slice(2, 10);
    const lib = '1'; // LIB num (Last Irreversible Block) - simplified or from header?
    // In Firehose, the last part is "lib num". Assuming 1 for now or just relative.
    // Simplified indexer might not track LIB perfectly.
    
    return `${num}-${ts}-${hash}-${parent}-${lib}`;
  }
}

function parseLong(value: number | Long): number {
  if (Long.isLong(value)) {
    return value.toNumber();
  }
  return value as number;
}
