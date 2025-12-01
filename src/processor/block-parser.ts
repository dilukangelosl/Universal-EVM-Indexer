import { sf, google } from '../proto/compiled.js';
import { FetchedBlock, RpcBlock, RpcTransaction, RpcReceipt, RpcLog } from '../fetcher/types.js';
import { hexToBytes, bigIntToBytes } from '../utils/bytes.js';
import Long from 'long';

const { Block, BlockHeader, TransactionTrace, TransactionReceipt, Log, BigInt: PbBigInt } = sf.apechain.type.v1;

// Ordinal tracker class
export class OrdinalTracker {
  private current = 0;
  
  next(): number {
    return this.current++;
  }
  
  constructor(start = 0) {
    this.current = start;
  }
}

export class BlockProcessor {
  processBlock(fetched: FetchedBlock): sf.apechain.type.v1.Block {
    const { block: rpcBlock, receipts } = fetched;
    const ordinals = new OrdinalTracker();
    
    // Start block ordinal tracking
    // Block level usually implies 0 for header etc, but Firehose often starts ordinals per trx
    // But here we preserve the 'ordinal' concept.
    // For Block itself, verify if ordinals are needed on top level? No, only tx traces and logs.

    const header = this.processHeader(rpcBlock);
    const traces: sf.apechain.type.v1.ITransactionTrace[] = [];
    
    for (let i = 0; i < rpcBlock.transactions.length; i++) {
      const tx = rpcBlock.transactions[i];
      const receipt = receipts.get(tx.hash);
      
      if (!receipt) {
        // Should limit this case - only if RPC failed to fetch?
        // But fetcher throws now.
        throw new Error(`Receipt missing for tx ${tx.hash}`);
      }
      
      const trace = this.processTransaction(tx, receipt, i, ordinals);
      traces.push(trace);
    }

    return Block.create({
      ver: 1,
      hash: hexToBytes(rpcBlock.hash),
      number: Long.fromString(rpcBlock.number, true, 16),
      size: Long.fromString(rpcBlock.size, true, 16),
      header,
      uncles: rpcBlock.uncles.map(hash => BlockHeader.create({ hash: hexToBytes(hash) })), // Minimal/Placeholder for now as uncles are full headers usually if available
      transactionTraces: traces,
      detailLevel: Block.DetailLevel.DETAILLEVEL_BASE
    });
  }

  private processHeader(block: RpcBlock): sf.apechain.type.v1.BlockHeader {
    const timestamp = google.protobuf.Timestamp.create({
      seconds: Long.fromString(block.timestamp, true, 16)
    });

    return BlockHeader.create({
      parentHash: hexToBytes(block.parentHash),
      uncleHash: hexToBytes(block.sha3Uncles),
      coinbase: hexToBytes(block.miner),
      stateRoot: hexToBytes(block.stateRoot),
      transactionsRoot: hexToBytes(block.transactionsRoot),
      receiptRoot: hexToBytes(block.receiptsRoot),
      logsBloom: hexToBytes(block.logsBloom),
      difficulty: PbBigInt.create({ bytes: bigIntToBytes(block.difficulty) }),
      number: Long.fromString(block.number, true, 16),
      gasLimit: Long.fromString(block.gasLimit, true, 16),
      gasUsed: Long.fromString(block.gasUsed, true, 16),
      timestamp,
      extraData: hexToBytes(block.extraData),
      mixHash: hexToBytes(block.mixHash),
      nonce: Long.fromString(block.nonce || '0', true, 16),
      hash: hexToBytes(block.hash),
      totalDifficulty: PbBigInt.create({ bytes: bigIntToBytes(block.totalDifficulty) }),
      baseFeePerGas: block.baseFeePerGas ? PbBigInt.create({ bytes: bigIntToBytes(block.baseFeePerGas) }) : null,
      withdrawalsRoot: block.withdrawalsRoot ? hexToBytes(block.withdrawalsRoot) : new Uint8Array(),
      blobGasUsed: block.blobGasUsed ? Long.fromString(block.blobGasUsed, true, 16) : null,
      excessBlobGas: block.excessBlobGas ? Long.fromString(block.excessBlobGas, true, 16) : null,
      parentBeaconRoot: block.parentBeaconBlockRoot ? hexToBytes(block.parentBeaconBlockRoot) : new Uint8Array(),
    });
  }

  private processTransaction(
    tx: RpcTransaction, 
    receipt: RpcReceipt, 
    index: number, 
    ordinals: OrdinalTracker
  ): sf.apechain.type.v1.TransactionTrace {
    const beginOrdinal = ordinals.next();
    
    const logs: sf.apechain.type.v1.ILog[] = [];
    if (receipt.logs) {
        for (const rpcLog of receipt.logs) {
            logs.push(this.processLog(rpcLog, ordinals));
        }
    }
    
    const endOrdinal = ordinals.next();

    const status = receipt.status === '0x1' 
      ? sf.apechain.type.v1.TransactionTraceStatus.SUCCEEDED
      : sf.apechain.type.v1.TransactionTraceStatus.FAILED;

    const protoReceipt = TransactionReceipt.create({
      stateRoot: hexToBytes((receipt as any).root || '0x'), // Legacy root field?
      cumulativeGasUsed: Long.fromString(receipt.cumulativeGasUsed, true, 16),
      logsBloom: hexToBytes(receipt.logsBloom),
      logs,
      contractAddress: receipt.contractAddress ? hexToBytes(receipt.contractAddress) : new Uint8Array(),
      blobGasUsed: receipt.blobGasUsed ? Long.fromString(receipt.blobGasUsed, true, 16) : null,
      blobGasPrice: receipt.blobGasPrice ? PbBigInt.create({ bytes: bigIntToBytes(receipt.blobGasPrice) }) : null,
    });

    // Type is usually "0x0" etc.
    let type = sf.apechain.type.v1.TransactionTrace.Type.TRX_TYPE_LEGACY;
    if (tx.type === '0x1') type = sf.apechain.type.v1.TransactionTrace.Type.TRX_TYPE_ACCESS_LIST;
    if (tx.type === '0x2') type = sf.apechain.type.v1.TransactionTrace.Type.TRX_TYPE_DYNAMIC_FEE;
    if (tx.type === '0x3') type = sf.apechain.type.v1.TransactionTrace.Type.TRX_TYPE_BLOB;

    return TransactionTrace.create({
      to: tx.to ? hexToBytes(tx.to) : new Uint8Array(),
      nonce: Long.fromString(tx.nonce, true, 16),
      gasPrice: PbBigInt.create({ bytes: bigIntToBytes(tx.gasPrice) }),
      gasLimit: Long.fromString(tx.gas, true, 16),
      value: PbBigInt.create({ bytes: bigIntToBytes(tx.value) }),
      input: hexToBytes(tx.input),
      v: hexToBytes(tx.v),
      r: hexToBytes(tx.r),
      s: hexToBytes(tx.s),
      gasUsed: Long.fromString(receipt.gasUsed, true, 16),
      type,
      accessList: tx.accessList?.map(al => ({
        address: hexToBytes(al.address),
        storageKeys: al.storageKeys.map(hexToBytes)
      })) || [],
      maxFeePerGas: tx.maxFeePerGas ? PbBigInt.create({ bytes: bigIntToBytes(tx.maxFeePerGas) }) : null,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? PbBigInt.create({ bytes: bigIntToBytes(tx.maxPriorityFeePerGas) }) : null,
      index,
      hash: hexToBytes(tx.hash),
      from: hexToBytes(tx.from),
      beginOrdinal,
      endOrdinal,
      status,
      receipt: protoReceipt,
      blobGas: tx.maxFeePerBlobGas ? Long.fromString(tx.maxFeePerBlobGas, true, 16) : null, // approximate mapping? RPC blob transaction fields vary
      blobGasFeeCap: tx.maxFeePerBlobGas ? PbBigInt.create({ bytes: bigIntToBytes(tx.maxFeePerBlobGas) }) : null,
      blobHashes: tx.blobVersionedHashes?.map(hexToBytes) || []
    });
  }

  private processLog(log: RpcLog, ordinals: OrdinalTracker): sf.apechain.type.v1.Log {
    return Log.create({
      address: hexToBytes(log.address),
      topics: log.topics.map(hexToBytes),
      data: hexToBytes(log.data),
      index: parseInt(log.logIndex, 16),
      blockIndex: parseInt(log.logIndex, 16), // Same as index within block? Usually logIndex is global index in block.
      ordinal: ordinals.next()
    });
  }
}

// Override receipt interface for 'root' which is legacy but might exist
interface RpcReceiptWithRoot extends RpcReceipt {
    root?: string;
}
