import { Level } from 'level';
import { MergedRangeIndex, ContractIndex, IndexerState, EventSignatureIndex } from './types.js';
import { MergedBundle } from '../../proto/dbin.js';
import { sf } from '../../proto/compiled.js';
import { bytesToHex } from '../../utils/bytes.js';

const { Block, TransactionTraceStatus } = sf.apechain.type.v1;
type Block = sf.apechain.type.v1.Block;

interface ContractInfo {
    address: string;
    deployer: string;
    txHash: string;
    blockNumber: number;
    txIndex: number;
}

export class IndexManager {
  private db: Level<string, string>;

  constructor(dbPath: string) {
    this.db = new Level(dbPath, { valueEncoding: 'json' });
  }
  
  async close() {
    await this.db.close();
  }

  async getState(): Promise<IndexerState | null> {
    try {
        const data = await this.db.get('st:indexer');
        return JSON.parse(data);
    } catch (e: any) {
        if (e.code === 'LEVEL_NOT_FOUND') return null;
        throw e;
    }
  }

  async saveState(state: IndexerState): Promise<void> {
      await this.db.put('st:indexer', JSON.stringify(state));
  }
  
  async updateIndexes(bundle: MergedBundle, blocks: Block[]): Promise<void> {
    const batch = this.db.batch();
    
    // Update merged range index
    const rangeKey = `mr:${String(bundle.startBlock).padStart(10, '0')}`;
    batch.put(rangeKey, JSON.stringify({
      startBlock: bundle.startBlock,
      endBlock: bundle.endBlock,
      s3Key: bundle.s3Key || '',
      checksum: bundle.checksum,
      sizeBytes: bundle.compressedSize,
      indexedAt: Date.now(),
      blockCount: blocks.length,
    } as MergedRangeIndex));
    
    // Extract and index contracts
    for (const block of blocks) {
      const contracts = this.extractContracts(block);
      const blockNum = typeof block.number === 'number' ? block.number : block.number.toNumber();

      for (const contract of contracts) {
        // Fetch existing or create new contract index
        // Note: We can't easily do read-modify-write in a batch for same key efficiently without atomic locks if concurrent.
        // But here we are single-threaded per bundle usually.
        // However, leveldb batch doesn't support reading within batch.
        // Use sequential updates or cache?
        // Since a merged bundle covers a range, we might deploying many contracts.
        // And we might append events for existing contracts.
        
        // For robustness, we should probably process ContractIndex updates sequentially or fetch all needed FIRST.
        // But given the nature of "updateIndexes" taking `MergedBundle`, let's iterate and build updates.
        // Because `get` is async, we can't put it inside `batch.put`.
        // We will process them separately and add to batch at the end?
        // Simpler: execute batch for generic stuff, handle contracts/events with logic.
        
        // Wait, `batch` handles writes. Reads must be done before.
        // But we are in a loop.
        // Let's optimize: Load contracts/events once per bundle (unlikely multiple updates per contract per bundle? feasible).
        // Actually, a contract might just have events in this bundle.
        
        // Let's defer complex updates to `updateContractIndex` which will do GET then PUT immediately (not in big batch?)
        // Or lock.
        // Since we index sequentially (historically), race conditions are rare unless live indexing parallel? No, live is sequential.
        // Historical is parallel? "Parallel Historical Indexing" is a goal.
        // If multiple workers write to same DB, we have issues. LevelDB is single-process lock usually.
        // If we have one writer, it's fine.
        // Assuming single writer.
        
        await this.updateContractIndex(contract, bundle); 
      }
      
      // Index contracts by block
      if (contracts.length > 0) {
        const blockKey = `bc:${String(blockNum).padStart(10, '0')}`;
        batch.put(blockKey, JSON.stringify(contracts.map(c => c.address)));
      }
      
      // Index event signatures (similarly complex, maybe skipped for MVP or simplified)
      // PRD says "Index event signatures".
      // Let's skip detail event indexing in batch for now and implement `updateEventIndexes` helper concept if needed.
    }
    
    // Update indexer state
    // We use a read-modify-write pattern or just overwrite if we trust sequential execution.
    // Since we are in a sequential queue in Indexer, this is safe.
    const currentState = await this.getState() || {
         lastMergedBlock: 0,
         lastProcessedBlock: 0,
         pendingOneBlocks: 0,
         chainHead: 0,
         isIndexing: true,
         lastCheckpoint: 0,
         version: '1.0.0'
    };
    
    if (bundle.endBlock > currentState.lastMergedBlock) {
        currentState.lastMergedBlock = bundle.endBlock;
        currentState.lastCheckpoint = Date.now();
        batch.put('st:indexer', JSON.stringify(currentState));
    }
    
    await batch.write();
  }
  
  private extractContracts(block: Block): ContractInfo[] {
    const contracts: ContractInfo[] = [];
    const blockNum = typeof block.number === 'number' ? block.number : block.number.toNumber();
    
    if (block.transactionTraces) {
        for (const trace of block.transactionTraces) {
            // Contract creation if status SUCCESS and to is empty (or receipt has contract address)
            if (trace.status === TransactionTraceStatus.SUCCEEDED) {
                 // check if contract created
                 // generated proto types might have null or empty bytes for `to`
                 const to = trace.to;
                 const isCreation = !to || to.length === 0;
                 
                 if (isCreation && trace.receipt && trace.receipt.contractAddress && trace.receipt.contractAddress.length > 0) {
                     contracts.push({
                         address: bytesToHex(trace.receipt.contractAddress || null).toLowerCase(),
                         deployer: bytesToHex(trace.from || null).toLowerCase(),
                         txHash: bytesToHex(trace.hash || null),
                         blockNumber: blockNum,
                         txIndex: trace.index || 0
                     });
                 }
            }
        }
    }
    return contracts;
  }
  
  private async updateContractIndex(contract: ContractInfo, bundle: MergedBundle) {
     const key = `ct:${contract.address}`;
     let data: ContractIndex;
     try {
         const raw = await this.db.get(key);
         data = JSON.parse(raw);
     } catch (e: any) {
         if (e.code === 'LEVEL_NOT_FOUND') {
             data = {
                 address: contract.address,
                 deploymentBlock: contract.blockNumber,
                 deploymentTxHash: contract.txHash,
                 deploymentTxIndex: contract.txIndex,
                 deployer: contract.deployer,
                 eventRanges: [],
                 totalLogs: 0,
             };
         } else {
             throw e;
         }
     }
     
     // Check if we need to update anything? 
     // If it's a new contract, we just created it.
     // If it existed (re-deploy via CREATE2?), we might update metadata? 
     // Usually immutable deployment info.
     
     // Note: We are not scanning events for ALL contracts here, just detecting CREATION.
     // PRD Architecture diagram shows "contract: -> deploy_block, s3_keys[]".
     // We also need to index EVENTS for contracts.
     // That requires scanning logs in the block.
     // My `extractContracts` only finds NEW contracts.
     // I need `extractEvents` too.
     
     await this.db.put(key, JSON.stringify(data));
  }
  
  // Query: Get S3 key for a block number using Range Search
  async getS3KeyForBlock(blockNumber: number): Promise<string | null> {
    // Search for range starting <= blockNumber
    // Prefix 'mr:'
    // We want the largest startBlock <= blockNumber.
    // This corresponds to `lte` in LevelDB iterator.
    const searchKey = `mr:${String(blockNumber).padStart(10, '0')}`;
    
    const iterator = this.db.iterator({
        lte: searchKey,
        reverse: true,
        limit: 1
    });
    
    for await (const [key, value] of iterator) {
        if (!key.startsWith('mr:')) break;
        
        const range = JSON.parse(value) as MergedRangeIndex;
        if (range.endBlock >= blockNumber) {
            return range.s3Key;
        }
    }
    return null;
  }
  
  // Query: Get contract deployment info
  async getContract(address: string): Promise<ContractIndex | null> {
    const key = `ct:${address.toLowerCase()}`;
    
    try {
      const data = await this.db.get(key);
      return JSON.parse(data) as ContractIndex;
    } catch {
      return null;
    }
  }
  
  async updateEventIndexes(bundle: MergedBundle, blocks: Block[]) {
     // This iterates all logs in all blocks and updates ContractIndex for each address involved.
     // This is heavy.
     // Optimization: Group logs by address first for the whole bundle.
     
     const logsByAddress = new Map<string, number>(); // address -> logCount
     
     for (const block of blocks) {
         if (!block.transactionTraces) continue;
         for (const trace of block.transactionTraces) {
             if (trace.receipt && trace.receipt.logs) {
                 for (const log of trace.receipt.logs) {
                     const addr = bytesToHex(log.address || null).toLowerCase();
                     logsByAddress.set(addr, (logsByAddress.get(addr) || 0) + 1);
                 }
             }
         }
     }
     
     // Now update each contract
     for (const [address, count] of logsByAddress) {
         const key = `ct:${address}`;
         let data: ContractIndex;
         try {
             const raw = await this.db.get(key);
             data = JSON.parse(raw);
         } catch (e: any) {
             if (e.code === 'LEVEL_NOT_FOUND') {
                 // Contract not indexed yet (maybe deployed before we started indexing or standard external contract?)
                 // Create partial index
                 data = {
                     address: address,
                     deploymentBlock: 0, // Unknown
                     deploymentTxHash: '', 
                     deploymentTxIndex: 0,
                     deployer: '',
                     eventRanges: [],
                     totalLogs: 0
                 };
             } else {
                 throw e;
             }
         }
         
         data.eventRanges.push({
             startBlock: bundle.startBlock,
             endBlock: bundle.endBlock,
             s3Key: bundle.s3Key || '',
             logCount: count
         });
         
         // Merge ranges optimization? (If sequential bundles overlap or adjacent? Usually disjoint bundles)
         
         data.totalLogs += count;
         // Update first/last event block logic if needed
         
         await this.db.put(key, JSON.stringify(data));
     }
  }

  
  async checkpoint(lastProcessedBlock: number, pendingOneBlocks: number) {
     const state = await this.getState() || {
         lastMergedBlock: 0,
         lastProcessedBlock: 0,
         pendingOneBlocks: 0,
         chainHead: 0,
         isIndexing: true,
         lastCheckpoint: 0,
         version: '1.0.0'
     };
     
     state.lastProcessedBlock = lastProcessedBlock;
     state.pendingOneBlocks = pendingOneBlocks;
     state.lastCheckpoint = Date.now();
     
     await this.saveState(state);
  }
}
