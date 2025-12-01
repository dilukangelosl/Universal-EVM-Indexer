export interface RpcBlock {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: RpcTransaction[];
  uncles: string[];
  baseFeePerGas?: string;
  mixHash?: string;
  withdrawalsRoot?: string;
  parentBeaconBlockRoot?: string;
  blobGasUsed?: string;
  excessBlobGas?: string;
}

export interface RpcTransaction {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string | null;
  transactionIndex: string;
  value: string;
  v: string;
  r: string;
  s: string;
  type?: string;
  accessList?: AccessListEntry[];
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  chainId?: string;
  maxFeePerBlobGas?: string;
  blobVersionedHashes?: string[];
}

export interface AccessListEntry {
  address: string;
  storageKeys: string[];
}

export interface RpcReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: RpcLog[];
  logsBloom: string;
  status: string;
  to: string | null;
  transactionHash: string;
  transactionIndex: string;
  type?: string;
  blobGasUsed?: string;
  blobGasPrice?: string;
}

export interface RpcLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
}

export interface FetchedBlock {
  block: RpcBlock;
  receipts: Map<string, RpcReceipt>;
  fetchedAt: number;
}
