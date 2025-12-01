import { sf } from './compiled.js';
import { deflateSync, inflateSync } from 'zlib';
import { ZstdCodec } from 'zstd-codec';

const { Block } = sf.apechain.type.v1;
type Block = sf.apechain.type.v1.Block;

// DBIN format constants
const DBIN_MAGIC = Buffer.from('dbin');
const DBIN_VERSION = 0x01;
const CONTENT_TYPE = 'sf.apechain.type.v1.Block';

export interface MergedBundle {
  filename: string;
  data: Buffer;
  startBlock: number;
  endBlock: number;
  checksum: string;
  uncompressedSize: number;
  compressedSize: number;
  s3Key?: string;
}

export class DbinFormatter {
  private zstd: any;

  async init() {
    return new Promise<void>((resolve) => {
      ZstdCodec.run((binding) => {
        this.zstd = new binding.Simple();
        resolve();
      });
    });
  }

  createBundle(blocks: Block[], startBlock: number, endBlock: number): MergedBundle {
    if (!this.zstd) throw new Error('Zstd not initialized');

    const chunks: Buffer[] = [];

    // Header
    chunks.push(DBIN_MAGIC);
    chunks.push(Buffer.from([DBIN_VERSION]));
    
    // Content Type
    const contentTypeBuffer = Buffer.from(CONTENT_TYPE);
    chunks.push(this.encodeVarint(contentTypeBuffer.length));
    chunks.push(contentTypeBuffer);

    // Blocks
    let uncompressedSize = 0;
    for (const block of blocks) {
      const blockData = Block.encode(block).finish();
      const len = blockData.length;
      chunks.push(this.encodeVarint(len));
      chunks.push(Buffer.from(blockData));
      uncompressedSize += len; // approximate, doesn't include varint overhead
    }

    const merged = Buffer.concat(chunks);
    const compressed = Buffer.from(this.zstd.compress(merged));

    const filename = `${String(startBlock).padStart(10, '0')}-${String(endBlock).padStart(10, '0')}.dbin.zst`;
    
    // Calculate checksum (SHA-256)
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(compressed);
    const checksum = hasher.digest("hex");

    return {
      filename,
      data: compressed,
      startBlock,
      endBlock,
      checksum,
      uncompressedSize: merged.length,
      compressedSize: compressed.length,
    };
  }

  decodeBundle(data: Buffer): Block[] {
    if (!this.zstd) throw new Error('Zstd not initialized');

    const decompressed = Buffer.from(this.zstd.decompress(data));
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

    if (contentType !== CONTENT_TYPE) {
      console.warn(`Warning: Content type mismatch. Expected ${CONTENT_TYPE}, got ${contentType}`);
    }

    // Blocks
    const blocks: Block[] = [];
    while (offset < decompressed.length) {
      const [msgLen, msgLenBytes] = this.decodeVarint(decompressed, offset);
      offset += msgLenBytes;

      if (offset + msgLen > decompressed.length) {
        throw new Error('Message length exceeds buffer');
      }

      const blockData = decompressed.subarray(offset, offset + msgLen);
      blocks.push(Block.decode(blockData));
      offset += msgLen;
    }

    return blocks;
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

  private decodeVarint(buffer: Buffer, offset: number): [number, number] {
    let value = 0;
    let shift = 0;
    let bytesRead = 0;

    while (offset + bytesRead < buffer.length) {
      const byte = buffer[offset + bytesRead];
      value |= (byte & 0x7f) << shift;
      bytesRead++;
      if ((byte & 0x80) === 0) {
        return [value, bytesRead];
      }
      shift += 7;
    }
    
    throw new Error('Invalid varint');
  }
}
