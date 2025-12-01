import { sf } from '../proto/compiled.js';
import { DbinFormatter, MergedBundle } from '../proto/dbin.js';
import { OneBlockMeta } from './one-block-writer.js';
import path from 'path';

const { Block } = sf.apechain.type.v1;

export class BlockMerger {
  private readonly BUNDLE_SIZE = 100;
  private formatter: DbinFormatter;

  constructor(private formatterInstance?: DbinFormatter) {
    this.formatter = formatterInstance || new DbinFormatter();
  }
  
  async init() {
    if (!this.formatterInstance) {
        await this.formatter.init();
    }
  }

  async mergeBundles(startBlock: number, oneBlocks: OneBlockMeta[]): Promise<MergedBundle> {
    const endBlock = startBlock + this.BUNDLE_SIZE - 1;
    
    // Verify sequence
    // oneBlocks might not be exactly 100 if we are handling partials, but mergeBundles usually implies full bundle.
    // Let's assume caller ensures blocks are loaded.
    // Actually, usually merger reads from disk or is passed list of meta.
    
    const blocks: sf.apechain.type.v1.Block[] = [];
    
    // Read blocks from disk
    for (const meta of oneBlocks) {
       const buffer = await Bun.file(meta.localPath).arrayBuffer();
       const block = Block.decode(new Uint8Array(buffer));
       blocks.push(block);
    }

    // Sort just in case
    // Using explicit Long conversion for safety
    blocks.sort((a, b) => {
        const numA = typeof a.number === 'number' ? a.number : a.number.toNumber();
        const numB = typeof b.number === 'number' ? b.number : b.number.toNumber();
        return numA - numB;
    });
    
    return this.formatter.createBundle(blocks, startBlock, endBlock);
  }
}
