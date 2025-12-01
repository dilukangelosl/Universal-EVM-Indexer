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

  async mergeBundles(startBlock: number, oneBlocks: OneBlockMeta[], loadedBlocks?: sf.apechain.type.v1.Block[]): Promise<MergedBundle> {
    // Use configured bundle size if possible, or default to 100, but here we just calculate endBlock based on input
    // However, the header defines range. Ideally we respect config.
    // Assuming oneBlocks contains the correct range.
    const endBlock = oneBlocks[oneBlocks.length-1].blockNumber; // Use actual end block from input
    
    let blocks: sf.apechain.type.v1.Block[];

    if (loadedBlocks) {
        blocks = loadedBlocks;
    } else {
        blocks = [];
        // Read blocks from disk
        for (const meta of oneBlocks) {
            const buffer = await Bun.file(meta.localPath).arrayBuffer();
            const block = Block.decode(new Uint8Array(buffer));
            blocks.push(block);
        }
    }

    // Sort just in case
    // Using explicit Long conversion for safety
    // Using explicit Long conversion for safety
    blocks.sort((a, b) => {
        const numA = typeof a.number === 'number' ? a.number : a.number.toNumber();
        const numB = typeof b.number === 'number' ? b.number : b.number.toNumber();
        return numA - numB;
    });
    
    return this.formatter.createBundle(blocks, startBlock, endBlock);
  }
}
