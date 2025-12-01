import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace sf. */
export namespace sf {

    /** Namespace apechain. */
    namespace apechain {

        /** Namespace type. */
        namespace type {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a Block. */
                interface IBlock {

                    /** Block ver */
                    ver?: (number|null);

                    /** Block hash */
                    hash?: (Uint8Array|null);

                    /** Block number */
                    number?: (number|Long|null);

                    /** Block size */
                    size?: (number|Long|null);

                    /** Block header */
                    header?: (sf.apechain.type.v1.IBlockHeader|null);

                    /** Block uncles */
                    uncles?: (sf.apechain.type.v1.IBlockHeader[]|null);

                    /** Block transactionTraces */
                    transactionTraces?: (sf.apechain.type.v1.ITransactionTrace[]|null);

                    /** Block detailLevel */
                    detailLevel?: (sf.apechain.type.v1.Block.DetailLevel|null);
                }

                /** Represents a Block. */
                class Block implements IBlock {

                    /**
                     * Constructs a new Block.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.IBlock);

                    /** Block ver. */
                    public ver: number;

                    /** Block hash. */
                    public hash: Uint8Array;

                    /** Block number. */
                    public number: (number|Long);

                    /** Block size. */
                    public size: (number|Long);

                    /** Block header. */
                    public header?: (sf.apechain.type.v1.IBlockHeader|null);

                    /** Block uncles. */
                    public uncles: sf.apechain.type.v1.IBlockHeader[];

                    /** Block transactionTraces. */
                    public transactionTraces: sf.apechain.type.v1.ITransactionTrace[];

                    /** Block detailLevel. */
                    public detailLevel: sf.apechain.type.v1.Block.DetailLevel;

                    /**
                     * Creates a new Block instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Block instance
                     */
                    public static create(properties?: sf.apechain.type.v1.IBlock): sf.apechain.type.v1.Block;

                    /**
                     * Encodes the specified Block message. Does not implicitly {@link sf.apechain.type.v1.Block.verify|verify} messages.
                     * @param message Block message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.IBlock, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Block message, length delimited. Does not implicitly {@link sf.apechain.type.v1.Block.verify|verify} messages.
                     * @param message Block message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.IBlock, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Block message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Block
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.Block;

                    /**
                     * Decodes a Block message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Block
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.Block;

                    /**
                     * Verifies a Block message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Block message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Block
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.Block;

                    /**
                     * Creates a plain object from a Block message. Also converts values to other types if specified.
                     * @param message Block
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.Block, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Block to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Block
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace Block {

                    /** DetailLevel enum. */
                    enum DetailLevel {
                        DETAILLEVEL_EXTENDED = 0,
                        DETAILLEVEL_BASE = 2
                    }
                }

                /** Properties of a BlockHeader. */
                interface IBlockHeader {

                    /** BlockHeader parentHash */
                    parentHash?: (Uint8Array|null);

                    /** BlockHeader uncleHash */
                    uncleHash?: (Uint8Array|null);

                    /** BlockHeader coinbase */
                    coinbase?: (Uint8Array|null);

                    /** BlockHeader stateRoot */
                    stateRoot?: (Uint8Array|null);

                    /** BlockHeader transactionsRoot */
                    transactionsRoot?: (Uint8Array|null);

                    /** BlockHeader receiptRoot */
                    receiptRoot?: (Uint8Array|null);

                    /** BlockHeader logsBloom */
                    logsBloom?: (Uint8Array|null);

                    /** BlockHeader difficulty */
                    difficulty?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader number */
                    number?: (number|Long|null);

                    /** BlockHeader gasLimit */
                    gasLimit?: (number|Long|null);

                    /** BlockHeader gasUsed */
                    gasUsed?: (number|Long|null);

                    /** BlockHeader timestamp */
                    timestamp?: (google.protobuf.ITimestamp|null);

                    /** BlockHeader extraData */
                    extraData?: (Uint8Array|null);

                    /** BlockHeader mixHash */
                    mixHash?: (Uint8Array|null);

                    /** BlockHeader nonce */
                    nonce?: (number|Long|null);

                    /** BlockHeader hash */
                    hash?: (Uint8Array|null);

                    /** BlockHeader totalDifficulty */
                    totalDifficulty?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader baseFeePerGas */
                    baseFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader withdrawalsRoot */
                    withdrawalsRoot?: (Uint8Array|null);

                    /** BlockHeader blobGasUsed */
                    blobGasUsed?: (number|Long|null);

                    /** BlockHeader excessBlobGas */
                    excessBlobGas?: (number|Long|null);

                    /** BlockHeader parentBeaconRoot */
                    parentBeaconRoot?: (Uint8Array|null);
                }

                /** Represents a BlockHeader. */
                class BlockHeader implements IBlockHeader {

                    /**
                     * Constructs a new BlockHeader.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.IBlockHeader);

                    /** BlockHeader parentHash. */
                    public parentHash: Uint8Array;

                    /** BlockHeader uncleHash. */
                    public uncleHash: Uint8Array;

                    /** BlockHeader coinbase. */
                    public coinbase: Uint8Array;

                    /** BlockHeader stateRoot. */
                    public stateRoot: Uint8Array;

                    /** BlockHeader transactionsRoot. */
                    public transactionsRoot: Uint8Array;

                    /** BlockHeader receiptRoot. */
                    public receiptRoot: Uint8Array;

                    /** BlockHeader logsBloom. */
                    public logsBloom: Uint8Array;

                    /** BlockHeader difficulty. */
                    public difficulty?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader number. */
                    public number: (number|Long);

                    /** BlockHeader gasLimit. */
                    public gasLimit: (number|Long);

                    /** BlockHeader gasUsed. */
                    public gasUsed: (number|Long);

                    /** BlockHeader timestamp. */
                    public timestamp?: (google.protobuf.ITimestamp|null);

                    /** BlockHeader extraData. */
                    public extraData: Uint8Array;

                    /** BlockHeader mixHash. */
                    public mixHash: Uint8Array;

                    /** BlockHeader nonce. */
                    public nonce: (number|Long);

                    /** BlockHeader hash. */
                    public hash: Uint8Array;

                    /** BlockHeader totalDifficulty. */
                    public totalDifficulty?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader baseFeePerGas. */
                    public baseFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** BlockHeader withdrawalsRoot. */
                    public withdrawalsRoot: Uint8Array;

                    /** BlockHeader blobGasUsed. */
                    public blobGasUsed?: (number|Long|null);

                    /** BlockHeader excessBlobGas. */
                    public excessBlobGas?: (number|Long|null);

                    /** BlockHeader parentBeaconRoot. */
                    public parentBeaconRoot: Uint8Array;

                    /** BlockHeader _blobGasUsed. */
                    public _blobGasUsed?: "blobGasUsed";

                    /** BlockHeader _excessBlobGas. */
                    public _excessBlobGas?: "excessBlobGas";

                    /**
                     * Creates a new BlockHeader instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BlockHeader instance
                     */
                    public static create(properties?: sf.apechain.type.v1.IBlockHeader): sf.apechain.type.v1.BlockHeader;

                    /**
                     * Encodes the specified BlockHeader message. Does not implicitly {@link sf.apechain.type.v1.BlockHeader.verify|verify} messages.
                     * @param message BlockHeader message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.IBlockHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified BlockHeader message, length delimited. Does not implicitly {@link sf.apechain.type.v1.BlockHeader.verify|verify} messages.
                     * @param message BlockHeader message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.IBlockHeader, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BlockHeader message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns BlockHeader
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.BlockHeader;

                    /**
                     * Decodes a BlockHeader message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns BlockHeader
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.BlockHeader;

                    /**
                     * Verifies a BlockHeader message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a BlockHeader message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns BlockHeader
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.BlockHeader;

                    /**
                     * Creates a plain object from a BlockHeader message. Also converts values to other types if specified.
                     * @param message BlockHeader
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.BlockHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this BlockHeader to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for BlockHeader
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a BigInt. */
                interface IBigInt {

                    /** BigInt bytes */
                    bytes?: (Uint8Array|null);
                }

                /** Represents a BigInt. */
                class BigInt implements IBigInt {

                    /**
                     * Constructs a new BigInt.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.IBigInt);

                    /** BigInt bytes. */
                    public bytes: Uint8Array;

                    /**
                     * Creates a new BigInt instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BigInt instance
                     */
                    public static create(properties?: sf.apechain.type.v1.IBigInt): sf.apechain.type.v1.BigInt;

                    /**
                     * Encodes the specified BigInt message. Does not implicitly {@link sf.apechain.type.v1.BigInt.verify|verify} messages.
                     * @param message BigInt message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.IBigInt, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified BigInt message, length delimited. Does not implicitly {@link sf.apechain.type.v1.BigInt.verify|verify} messages.
                     * @param message BigInt message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.IBigInt, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BigInt message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns BigInt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.BigInt;

                    /**
                     * Decodes a BigInt message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns BigInt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.BigInt;

                    /**
                     * Verifies a BigInt message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a BigInt message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns BigInt
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.BigInt;

                    /**
                     * Creates a plain object from a BigInt message. Also converts values to other types if specified.
                     * @param message BigInt
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.BigInt, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this BigInt to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for BigInt
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a TransactionTrace. */
                interface ITransactionTrace {

                    /** TransactionTrace to */
                    to?: (Uint8Array|null);

                    /** TransactionTrace nonce */
                    nonce?: (number|Long|null);

                    /** TransactionTrace gasPrice */
                    gasPrice?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace gasLimit */
                    gasLimit?: (number|Long|null);

                    /** TransactionTrace value */
                    value?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace input */
                    input?: (Uint8Array|null);

                    /** TransactionTrace v */
                    v?: (Uint8Array|null);

                    /** TransactionTrace r */
                    r?: (Uint8Array|null);

                    /** TransactionTrace s */
                    s?: (Uint8Array|null);

                    /** TransactionTrace gasUsed */
                    gasUsed?: (number|Long|null);

                    /** TransactionTrace type */
                    type?: (sf.apechain.type.v1.TransactionTrace.Type|null);

                    /** TransactionTrace accessList */
                    accessList?: (sf.apechain.type.v1.IAccessTuple[]|null);

                    /** TransactionTrace maxFeePerGas */
                    maxFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace maxPriorityFeePerGas */
                    maxPriorityFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace index */
                    index?: (number|null);

                    /** TransactionTrace hash */
                    hash?: (Uint8Array|null);

                    /** TransactionTrace from */
                    from?: (Uint8Array|null);

                    /** TransactionTrace beginOrdinal */
                    beginOrdinal?: (number|Long|null);

                    /** TransactionTrace endOrdinal */
                    endOrdinal?: (number|Long|null);

                    /** TransactionTrace status */
                    status?: (sf.apechain.type.v1.TransactionTraceStatus|null);

                    /** TransactionTrace receipt */
                    receipt?: (sf.apechain.type.v1.ITransactionReceipt|null);

                    /** TransactionTrace blobGas */
                    blobGas?: (number|Long|null);

                    /** TransactionTrace blobGasFeeCap */
                    blobGasFeeCap?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace blobHashes */
                    blobHashes?: (Uint8Array[]|null);
                }

                /** Represents a TransactionTrace. */
                class TransactionTrace implements ITransactionTrace {

                    /**
                     * Constructs a new TransactionTrace.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.ITransactionTrace);

                    /** TransactionTrace to. */
                    public to: Uint8Array;

                    /** TransactionTrace nonce. */
                    public nonce: (number|Long);

                    /** TransactionTrace gasPrice. */
                    public gasPrice?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace gasLimit. */
                    public gasLimit: (number|Long);

                    /** TransactionTrace value. */
                    public value?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace input. */
                    public input: Uint8Array;

                    /** TransactionTrace v. */
                    public v: Uint8Array;

                    /** TransactionTrace r. */
                    public r: Uint8Array;

                    /** TransactionTrace s. */
                    public s: Uint8Array;

                    /** TransactionTrace gasUsed. */
                    public gasUsed: (number|Long);

                    /** TransactionTrace type. */
                    public type: sf.apechain.type.v1.TransactionTrace.Type;

                    /** TransactionTrace accessList. */
                    public accessList: sf.apechain.type.v1.IAccessTuple[];

                    /** TransactionTrace maxFeePerGas. */
                    public maxFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace maxPriorityFeePerGas. */
                    public maxPriorityFeePerGas?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace index. */
                    public index: number;

                    /** TransactionTrace hash. */
                    public hash: Uint8Array;

                    /** TransactionTrace from. */
                    public from: Uint8Array;

                    /** TransactionTrace beginOrdinal. */
                    public beginOrdinal: (number|Long);

                    /** TransactionTrace endOrdinal. */
                    public endOrdinal: (number|Long);

                    /** TransactionTrace status. */
                    public status: sf.apechain.type.v1.TransactionTraceStatus;

                    /** TransactionTrace receipt. */
                    public receipt?: (sf.apechain.type.v1.ITransactionReceipt|null);

                    /** TransactionTrace blobGas. */
                    public blobGas?: (number|Long|null);

                    /** TransactionTrace blobGasFeeCap. */
                    public blobGasFeeCap?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionTrace blobHashes. */
                    public blobHashes: Uint8Array[];

                    /** TransactionTrace _blobGas. */
                    public _blobGas?: "blobGas";

                    /** TransactionTrace _blobGasFeeCap. */
                    public _blobGasFeeCap?: "blobGasFeeCap";

                    /**
                     * Creates a new TransactionTrace instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TransactionTrace instance
                     */
                    public static create(properties?: sf.apechain.type.v1.ITransactionTrace): sf.apechain.type.v1.TransactionTrace;

                    /**
                     * Encodes the specified TransactionTrace message. Does not implicitly {@link sf.apechain.type.v1.TransactionTrace.verify|verify} messages.
                     * @param message TransactionTrace message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.ITransactionTrace, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TransactionTrace message, length delimited. Does not implicitly {@link sf.apechain.type.v1.TransactionTrace.verify|verify} messages.
                     * @param message TransactionTrace message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.ITransactionTrace, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TransactionTrace message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TransactionTrace
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.TransactionTrace;

                    /**
                     * Decodes a TransactionTrace message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TransactionTrace
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.TransactionTrace;

                    /**
                     * Verifies a TransactionTrace message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TransactionTrace message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TransactionTrace
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.TransactionTrace;

                    /**
                     * Creates a plain object from a TransactionTrace message. Also converts values to other types if specified.
                     * @param message TransactionTrace
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.TransactionTrace, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TransactionTrace to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for TransactionTrace
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace TransactionTrace {

                    /** Type enum. */
                    enum Type {
                        TRX_TYPE_LEGACY = 0,
                        TRX_TYPE_ACCESS_LIST = 1,
                        TRX_TYPE_DYNAMIC_FEE = 2,
                        TRX_TYPE_BLOB = 3
                    }
                }

                /** Properties of an AccessTuple. */
                interface IAccessTuple {

                    /** AccessTuple address */
                    address?: (Uint8Array|null);

                    /** AccessTuple storageKeys */
                    storageKeys?: (Uint8Array[]|null);
                }

                /** Represents an AccessTuple. */
                class AccessTuple implements IAccessTuple {

                    /**
                     * Constructs a new AccessTuple.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.IAccessTuple);

                    /** AccessTuple address. */
                    public address: Uint8Array;

                    /** AccessTuple storageKeys. */
                    public storageKeys: Uint8Array[];

                    /**
                     * Creates a new AccessTuple instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AccessTuple instance
                     */
                    public static create(properties?: sf.apechain.type.v1.IAccessTuple): sf.apechain.type.v1.AccessTuple;

                    /**
                     * Encodes the specified AccessTuple message. Does not implicitly {@link sf.apechain.type.v1.AccessTuple.verify|verify} messages.
                     * @param message AccessTuple message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.IAccessTuple, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AccessTuple message, length delimited. Does not implicitly {@link sf.apechain.type.v1.AccessTuple.verify|verify} messages.
                     * @param message AccessTuple message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.IAccessTuple, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AccessTuple message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AccessTuple
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.AccessTuple;

                    /**
                     * Decodes an AccessTuple message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AccessTuple
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.AccessTuple;

                    /**
                     * Verifies an AccessTuple message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AccessTuple message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AccessTuple
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.AccessTuple;

                    /**
                     * Creates a plain object from an AccessTuple message. Also converts values to other types if specified.
                     * @param message AccessTuple
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.AccessTuple, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AccessTuple to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for AccessTuple
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** TransactionTraceStatus enum. */
                enum TransactionTraceStatus {
                    UNKNOWN = 0,
                    SUCCEEDED = 1,
                    FAILED = 2,
                    REVERTED = 3
                }

                /** Properties of a TransactionReceipt. */
                interface ITransactionReceipt {

                    /** TransactionReceipt stateRoot */
                    stateRoot?: (Uint8Array|null);

                    /** TransactionReceipt cumulativeGasUsed */
                    cumulativeGasUsed?: (number|Long|null);

                    /** TransactionReceipt logsBloom */
                    logsBloom?: (Uint8Array|null);

                    /** TransactionReceipt logs */
                    logs?: (sf.apechain.type.v1.ILog[]|null);

                    /** TransactionReceipt blobGasUsed */
                    blobGasUsed?: (number|Long|null);

                    /** TransactionReceipt blobGasPrice */
                    blobGasPrice?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionReceipt contractAddress */
                    contractAddress?: (Uint8Array|null);
                }

                /** Represents a TransactionReceipt. */
                class TransactionReceipt implements ITransactionReceipt {

                    /**
                     * Constructs a new TransactionReceipt.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.ITransactionReceipt);

                    /** TransactionReceipt stateRoot. */
                    public stateRoot: Uint8Array;

                    /** TransactionReceipt cumulativeGasUsed. */
                    public cumulativeGasUsed: (number|Long);

                    /** TransactionReceipt logsBloom. */
                    public logsBloom: Uint8Array;

                    /** TransactionReceipt logs. */
                    public logs: sf.apechain.type.v1.ILog[];

                    /** TransactionReceipt blobGasUsed. */
                    public blobGasUsed?: (number|Long|null);

                    /** TransactionReceipt blobGasPrice. */
                    public blobGasPrice?: (sf.apechain.type.v1.IBigInt|null);

                    /** TransactionReceipt contractAddress. */
                    public contractAddress: Uint8Array;

                    /** TransactionReceipt _blobGasUsed. */
                    public _blobGasUsed?: "blobGasUsed";

                    /** TransactionReceipt _blobGasPrice. */
                    public _blobGasPrice?: "blobGasPrice";

                    /**
                     * Creates a new TransactionReceipt instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TransactionReceipt instance
                     */
                    public static create(properties?: sf.apechain.type.v1.ITransactionReceipt): sf.apechain.type.v1.TransactionReceipt;

                    /**
                     * Encodes the specified TransactionReceipt message. Does not implicitly {@link sf.apechain.type.v1.TransactionReceipt.verify|verify} messages.
                     * @param message TransactionReceipt message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.ITransactionReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TransactionReceipt message, length delimited. Does not implicitly {@link sf.apechain.type.v1.TransactionReceipt.verify|verify} messages.
                     * @param message TransactionReceipt message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.ITransactionReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TransactionReceipt message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TransactionReceipt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.TransactionReceipt;

                    /**
                     * Decodes a TransactionReceipt message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TransactionReceipt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.TransactionReceipt;

                    /**
                     * Verifies a TransactionReceipt message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TransactionReceipt message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TransactionReceipt
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.TransactionReceipt;

                    /**
                     * Creates a plain object from a TransactionReceipt message. Also converts values to other types if specified.
                     * @param message TransactionReceipt
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.TransactionReceipt, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TransactionReceipt to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for TransactionReceipt
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a Log. */
                interface ILog {

                    /** Log address */
                    address?: (Uint8Array|null);

                    /** Log topics */
                    topics?: (Uint8Array[]|null);

                    /** Log data */
                    data?: (Uint8Array|null);

                    /** Log index */
                    index?: (number|null);

                    /** Log blockIndex */
                    blockIndex?: (number|null);

                    /** Log ordinal */
                    ordinal?: (number|Long|null);
                }

                /** Represents a Log. */
                class Log implements ILog {

                    /**
                     * Constructs a new Log.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: sf.apechain.type.v1.ILog);

                    /** Log address. */
                    public address: Uint8Array;

                    /** Log topics. */
                    public topics: Uint8Array[];

                    /** Log data. */
                    public data: Uint8Array;

                    /** Log index. */
                    public index: number;

                    /** Log blockIndex. */
                    public blockIndex: number;

                    /** Log ordinal. */
                    public ordinal: (number|Long);

                    /**
                     * Creates a new Log instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Log instance
                     */
                    public static create(properties?: sf.apechain.type.v1.ILog): sf.apechain.type.v1.Log;

                    /**
                     * Encodes the specified Log message. Does not implicitly {@link sf.apechain.type.v1.Log.verify|verify} messages.
                     * @param message Log message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: sf.apechain.type.v1.ILog, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Log message, length delimited. Does not implicitly {@link sf.apechain.type.v1.Log.verify|verify} messages.
                     * @param message Log message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: sf.apechain.type.v1.ILog, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Log message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Log
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sf.apechain.type.v1.Log;

                    /**
                     * Decodes a Log message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Log
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sf.apechain.type.v1.Log;

                    /**
                     * Verifies a Log message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Log message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Log
                     */
                    public static fromObject(object: { [k: string]: any }): sf.apechain.type.v1.Log;

                    /**
                     * Creates a plain object from a Log message. Also converts values to other types if specified.
                     * @param message Log
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: sf.apechain.type.v1.Log, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Log to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Log
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
