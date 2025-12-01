/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.sf = (function() {

    /**
     * Namespace sf.
     * @exports sf
     * @namespace
     */
    var sf = {};

    sf.apechain = (function() {

        /**
         * Namespace apechain.
         * @memberof sf
         * @namespace
         */
        var apechain = {};

        apechain.type = (function() {

            /**
             * Namespace type.
             * @memberof sf.apechain
             * @namespace
             */
            var type = {};

            type.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof sf.apechain.type
                 * @namespace
                 */
                var v1 = {};

                v1.Block = (function() {

                    /**
                     * Properties of a Block.
                     * @memberof sf.apechain.type.v1
                     * @interface IBlock
                     * @property {number|null} [ver] Block ver
                     * @property {Uint8Array|null} [hash] Block hash
                     * @property {number|Long|null} [number] Block number
                     * @property {number|Long|null} [size] Block size
                     * @property {sf.apechain.type.v1.IBlockHeader|null} [header] Block header
                     * @property {Array.<sf.apechain.type.v1.IBlockHeader>|null} [uncles] Block uncles
                     * @property {Array.<sf.apechain.type.v1.ITransactionTrace>|null} [transactionTraces] Block transactionTraces
                     * @property {sf.apechain.type.v1.Block.DetailLevel|null} [detailLevel] Block detailLevel
                     */

                    /**
                     * Constructs a new Block.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a Block.
                     * @implements IBlock
                     * @constructor
                     * @param {sf.apechain.type.v1.IBlock=} [properties] Properties to set
                     */
                    function Block(properties) {
                        this.uncles = [];
                        this.transactionTraces = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Block ver.
                     * @member {number} ver
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.ver = 0;

                    /**
                     * Block hash.
                     * @member {Uint8Array} hash
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.hash = $util.newBuffer([]);

                    /**
                     * Block number.
                     * @member {number|Long} number
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.number = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Block size.
                     * @member {number|Long} size
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.size = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Block header.
                     * @member {sf.apechain.type.v1.IBlockHeader|null|undefined} header
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.header = null;

                    /**
                     * Block uncles.
                     * @member {Array.<sf.apechain.type.v1.IBlockHeader>} uncles
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.uncles = $util.emptyArray;

                    /**
                     * Block transactionTraces.
                     * @member {Array.<sf.apechain.type.v1.ITransactionTrace>} transactionTraces
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.transactionTraces = $util.emptyArray;

                    /**
                     * Block detailLevel.
                     * @member {sf.apechain.type.v1.Block.DetailLevel} detailLevel
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     */
                    Block.prototype.detailLevel = 0;

                    /**
                     * Creates a new Block instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {sf.apechain.type.v1.IBlock=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.Block} Block instance
                     */
                    Block.create = function create(properties) {
                        return new Block(properties);
                    };

                    /**
                     * Encodes the specified Block message. Does not implicitly {@link sf.apechain.type.v1.Block.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {sf.apechain.type.v1.IBlock} message Block message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Block.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ver != null && Object.hasOwnProperty.call(message, "ver"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ver);
                        if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.hash);
                        if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.number);
                        if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.size);
                        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                            $root.sf.apechain.type.v1.BlockHeader.encode(message.header, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.uncles != null && message.uncles.length)
                            for (var i = 0; i < message.uncles.length; ++i)
                                $root.sf.apechain.type.v1.BlockHeader.encode(message.uncles[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.transactionTraces != null && message.transactionTraces.length)
                            for (var i = 0; i < message.transactionTraces.length; ++i)
                                $root.sf.apechain.type.v1.TransactionTrace.encode(message.transactionTraces[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                        if (message.detailLevel != null && Object.hasOwnProperty.call(message, "detailLevel"))
                            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.detailLevel);
                        return writer;
                    };

                    /**
                     * Encodes the specified Block message, length delimited. Does not implicitly {@link sf.apechain.type.v1.Block.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {sf.apechain.type.v1.IBlock} message Block message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Block.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Block message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.Block} Block
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Block.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.Block();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.ver = reader.int32();
                                    break;
                                }
                            case 2: {
                                    message.hash = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.number = reader.uint64();
                                    break;
                                }
                            case 4: {
                                    message.size = reader.uint64();
                                    break;
                                }
                            case 5: {
                                    message.header = $root.sf.apechain.type.v1.BlockHeader.decode(reader, reader.uint32());
                                    break;
                                }
                            case 6: {
                                    if (!(message.uncles && message.uncles.length))
                                        message.uncles = [];
                                    message.uncles.push($root.sf.apechain.type.v1.BlockHeader.decode(reader, reader.uint32()));
                                    break;
                                }
                            case 10: {
                                    if (!(message.transactionTraces && message.transactionTraces.length))
                                        message.transactionTraces = [];
                                    message.transactionTraces.push($root.sf.apechain.type.v1.TransactionTrace.decode(reader, reader.uint32()));
                                    break;
                                }
                            case 12: {
                                    message.detailLevel = reader.int32();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Block message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.Block} Block
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Block.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Block message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Block.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ver != null && message.hasOwnProperty("ver"))
                            if (!$util.isInteger(message.ver))
                                return "ver: integer expected";
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                                return "hash: buffer expected";
                        if (message.number != null && message.hasOwnProperty("number"))
                            if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high)))
                                return "number: integer|Long expected";
                        if (message.size != null && message.hasOwnProperty("size"))
                            if (!$util.isInteger(message.size) && !(message.size && $util.isInteger(message.size.low) && $util.isInteger(message.size.high)))
                                return "size: integer|Long expected";
                        if (message.header != null && message.hasOwnProperty("header")) {
                            var error = $root.sf.apechain.type.v1.BlockHeader.verify(message.header);
                            if (error)
                                return "header." + error;
                        }
                        if (message.uncles != null && message.hasOwnProperty("uncles")) {
                            if (!Array.isArray(message.uncles))
                                return "uncles: array expected";
                            for (var i = 0; i < message.uncles.length; ++i) {
                                var error = $root.sf.apechain.type.v1.BlockHeader.verify(message.uncles[i]);
                                if (error)
                                    return "uncles." + error;
                            }
                        }
                        if (message.transactionTraces != null && message.hasOwnProperty("transactionTraces")) {
                            if (!Array.isArray(message.transactionTraces))
                                return "transactionTraces: array expected";
                            for (var i = 0; i < message.transactionTraces.length; ++i) {
                                var error = $root.sf.apechain.type.v1.TransactionTrace.verify(message.transactionTraces[i]);
                                if (error)
                                    return "transactionTraces." + error;
                            }
                        }
                        if (message.detailLevel != null && message.hasOwnProperty("detailLevel"))
                            switch (message.detailLevel) {
                            default:
                                return "detailLevel: enum value expected";
                            case 0:
                            case 2:
                                break;
                            }
                        return null;
                    };

                    /**
                     * Creates a Block message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.Block} Block
                     */
                    Block.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.Block)
                            return object;
                        var message = new $root.sf.apechain.type.v1.Block();
                        if (object.ver != null)
                            message.ver = object.ver | 0;
                        if (object.hash != null)
                            if (typeof object.hash === "string")
                                $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                            else if (object.hash.length >= 0)
                                message.hash = object.hash;
                        if (object.number != null)
                            if ($util.Long)
                                (message.number = $util.Long.fromValue(object.number)).unsigned = true;
                            else if (typeof object.number === "string")
                                message.number = parseInt(object.number, 10);
                            else if (typeof object.number === "number")
                                message.number = object.number;
                            else if (typeof object.number === "object")
                                message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber(true);
                        if (object.size != null)
                            if ($util.Long)
                                (message.size = $util.Long.fromValue(object.size)).unsigned = true;
                            else if (typeof object.size === "string")
                                message.size = parseInt(object.size, 10);
                            else if (typeof object.size === "number")
                                message.size = object.size;
                            else if (typeof object.size === "object")
                                message.size = new $util.LongBits(object.size.low >>> 0, object.size.high >>> 0).toNumber(true);
                        if (object.header != null) {
                            if (typeof object.header !== "object")
                                throw TypeError(".sf.apechain.type.v1.Block.header: object expected");
                            message.header = $root.sf.apechain.type.v1.BlockHeader.fromObject(object.header);
                        }
                        if (object.uncles) {
                            if (!Array.isArray(object.uncles))
                                throw TypeError(".sf.apechain.type.v1.Block.uncles: array expected");
                            message.uncles = [];
                            for (var i = 0; i < object.uncles.length; ++i) {
                                if (typeof object.uncles[i] !== "object")
                                    throw TypeError(".sf.apechain.type.v1.Block.uncles: object expected");
                                message.uncles[i] = $root.sf.apechain.type.v1.BlockHeader.fromObject(object.uncles[i]);
                            }
                        }
                        if (object.transactionTraces) {
                            if (!Array.isArray(object.transactionTraces))
                                throw TypeError(".sf.apechain.type.v1.Block.transactionTraces: array expected");
                            message.transactionTraces = [];
                            for (var i = 0; i < object.transactionTraces.length; ++i) {
                                if (typeof object.transactionTraces[i] !== "object")
                                    throw TypeError(".sf.apechain.type.v1.Block.transactionTraces: object expected");
                                message.transactionTraces[i] = $root.sf.apechain.type.v1.TransactionTrace.fromObject(object.transactionTraces[i]);
                            }
                        }
                        switch (object.detailLevel) {
                        default:
                            if (typeof object.detailLevel === "number") {
                                message.detailLevel = object.detailLevel;
                                break;
                            }
                            break;
                        case "DETAILLEVEL_EXTENDED":
                        case 0:
                            message.detailLevel = 0;
                            break;
                        case "DETAILLEVEL_BASE":
                        case 2:
                            message.detailLevel = 2;
                            break;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Block message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {sf.apechain.type.v1.Block} message Block
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Block.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.uncles = [];
                            object.transactionTraces = [];
                        }
                        if (options.defaults) {
                            object.ver = 0;
                            if (options.bytes === String)
                                object.hash = "";
                            else {
                                object.hash = [];
                                if (options.bytes !== Array)
                                    object.hash = $util.newBuffer(object.hash);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.number = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.number = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.size = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.size = options.longs === String ? "0" : 0;
                            object.header = null;
                            object.detailLevel = options.enums === String ? "DETAILLEVEL_EXTENDED" : 0;
                        }
                        if (message.ver != null && message.hasOwnProperty("ver"))
                            object.ver = message.ver;
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
                        if (message.number != null && message.hasOwnProperty("number"))
                            if (typeof message.number === "number")
                                object.number = options.longs === String ? String(message.number) : message.number;
                            else
                                object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber(true) : message.number;
                        if (message.size != null && message.hasOwnProperty("size"))
                            if (typeof message.size === "number")
                                object.size = options.longs === String ? String(message.size) : message.size;
                            else
                                object.size = options.longs === String ? $util.Long.prototype.toString.call(message.size) : options.longs === Number ? new $util.LongBits(message.size.low >>> 0, message.size.high >>> 0).toNumber(true) : message.size;
                        if (message.header != null && message.hasOwnProperty("header"))
                            object.header = $root.sf.apechain.type.v1.BlockHeader.toObject(message.header, options);
                        if (message.uncles && message.uncles.length) {
                            object.uncles = [];
                            for (var j = 0; j < message.uncles.length; ++j)
                                object.uncles[j] = $root.sf.apechain.type.v1.BlockHeader.toObject(message.uncles[j], options);
                        }
                        if (message.transactionTraces && message.transactionTraces.length) {
                            object.transactionTraces = [];
                            for (var j = 0; j < message.transactionTraces.length; ++j)
                                object.transactionTraces[j] = $root.sf.apechain.type.v1.TransactionTrace.toObject(message.transactionTraces[j], options);
                        }
                        if (message.detailLevel != null && message.hasOwnProperty("detailLevel"))
                            object.detailLevel = options.enums === String ? $root.sf.apechain.type.v1.Block.DetailLevel[message.detailLevel] === undefined ? message.detailLevel : $root.sf.apechain.type.v1.Block.DetailLevel[message.detailLevel] : message.detailLevel;
                        return object;
                    };

                    /**
                     * Converts this Block to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.Block
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Block.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Block
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.Block
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Block.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.Block";
                    };

                    /**
                     * DetailLevel enum.
                     * @name sf.apechain.type.v1.Block.DetailLevel
                     * @enum {number}
                     * @property {number} DETAILLEVEL_EXTENDED=0 DETAILLEVEL_EXTENDED value
                     * @property {number} DETAILLEVEL_BASE=2 DETAILLEVEL_BASE value
                     */
                    Block.DetailLevel = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "DETAILLEVEL_EXTENDED"] = 0;
                        values[valuesById[2] = "DETAILLEVEL_BASE"] = 2;
                        return values;
                    })();

                    return Block;
                })();

                v1.BlockHeader = (function() {

                    /**
                     * Properties of a BlockHeader.
                     * @memberof sf.apechain.type.v1
                     * @interface IBlockHeader
                     * @property {Uint8Array|null} [parentHash] BlockHeader parentHash
                     * @property {Uint8Array|null} [uncleHash] BlockHeader uncleHash
                     * @property {Uint8Array|null} [coinbase] BlockHeader coinbase
                     * @property {Uint8Array|null} [stateRoot] BlockHeader stateRoot
                     * @property {Uint8Array|null} [transactionsRoot] BlockHeader transactionsRoot
                     * @property {Uint8Array|null} [receiptRoot] BlockHeader receiptRoot
                     * @property {Uint8Array|null} [logsBloom] BlockHeader logsBloom
                     * @property {sf.apechain.type.v1.IBigInt|null} [difficulty] BlockHeader difficulty
                     * @property {number|Long|null} [number] BlockHeader number
                     * @property {number|Long|null} [gasLimit] BlockHeader gasLimit
                     * @property {number|Long|null} [gasUsed] BlockHeader gasUsed
                     * @property {google.protobuf.ITimestamp|null} [timestamp] BlockHeader timestamp
                     * @property {Uint8Array|null} [extraData] BlockHeader extraData
                     * @property {Uint8Array|null} [mixHash] BlockHeader mixHash
                     * @property {number|Long|null} [nonce] BlockHeader nonce
                     * @property {Uint8Array|null} [hash] BlockHeader hash
                     * @property {sf.apechain.type.v1.IBigInt|null} [totalDifficulty] BlockHeader totalDifficulty
                     * @property {sf.apechain.type.v1.IBigInt|null} [baseFeePerGas] BlockHeader baseFeePerGas
                     * @property {Uint8Array|null} [withdrawalsRoot] BlockHeader withdrawalsRoot
                     * @property {number|Long|null} [blobGasUsed] BlockHeader blobGasUsed
                     * @property {number|Long|null} [excessBlobGas] BlockHeader excessBlobGas
                     * @property {Uint8Array|null} [parentBeaconRoot] BlockHeader parentBeaconRoot
                     */

                    /**
                     * Constructs a new BlockHeader.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a BlockHeader.
                     * @implements IBlockHeader
                     * @constructor
                     * @param {sf.apechain.type.v1.IBlockHeader=} [properties] Properties to set
                     */
                    function BlockHeader(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * BlockHeader parentHash.
                     * @member {Uint8Array} parentHash
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.parentHash = $util.newBuffer([]);

                    /**
                     * BlockHeader uncleHash.
                     * @member {Uint8Array} uncleHash
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.uncleHash = $util.newBuffer([]);

                    /**
                     * BlockHeader coinbase.
                     * @member {Uint8Array} coinbase
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.coinbase = $util.newBuffer([]);

                    /**
                     * BlockHeader stateRoot.
                     * @member {Uint8Array} stateRoot
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.stateRoot = $util.newBuffer([]);

                    /**
                     * BlockHeader transactionsRoot.
                     * @member {Uint8Array} transactionsRoot
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.transactionsRoot = $util.newBuffer([]);

                    /**
                     * BlockHeader receiptRoot.
                     * @member {Uint8Array} receiptRoot
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.receiptRoot = $util.newBuffer([]);

                    /**
                     * BlockHeader logsBloom.
                     * @member {Uint8Array} logsBloom
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.logsBloom = $util.newBuffer([]);

                    /**
                     * BlockHeader difficulty.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} difficulty
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.difficulty = null;

                    /**
                     * BlockHeader number.
                     * @member {number|Long} number
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.number = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * BlockHeader gasLimit.
                     * @member {number|Long} gasLimit
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.gasLimit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * BlockHeader gasUsed.
                     * @member {number|Long} gasUsed
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * BlockHeader timestamp.
                     * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.timestamp = null;

                    /**
                     * BlockHeader extraData.
                     * @member {Uint8Array} extraData
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.extraData = $util.newBuffer([]);

                    /**
                     * BlockHeader mixHash.
                     * @member {Uint8Array} mixHash
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.mixHash = $util.newBuffer([]);

                    /**
                     * BlockHeader nonce.
                     * @member {number|Long} nonce
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.nonce = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * BlockHeader hash.
                     * @member {Uint8Array} hash
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.hash = $util.newBuffer([]);

                    /**
                     * BlockHeader totalDifficulty.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} totalDifficulty
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.totalDifficulty = null;

                    /**
                     * BlockHeader baseFeePerGas.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} baseFeePerGas
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.baseFeePerGas = null;

                    /**
                     * BlockHeader withdrawalsRoot.
                     * @member {Uint8Array} withdrawalsRoot
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.withdrawalsRoot = $util.newBuffer([]);

                    /**
                     * BlockHeader blobGasUsed.
                     * @member {number|Long|null|undefined} blobGasUsed
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.blobGasUsed = null;

                    /**
                     * BlockHeader excessBlobGas.
                     * @member {number|Long|null|undefined} excessBlobGas
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.excessBlobGas = null;

                    /**
                     * BlockHeader parentBeaconRoot.
                     * @member {Uint8Array} parentBeaconRoot
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    BlockHeader.prototype.parentBeaconRoot = $util.newBuffer([]);

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * BlockHeader _blobGasUsed.
                     * @member {"blobGasUsed"|undefined} _blobGasUsed
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    Object.defineProperty(BlockHeader.prototype, "_blobGasUsed", {
                        get: $util.oneOfGetter($oneOfFields = ["blobGasUsed"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * BlockHeader _excessBlobGas.
                     * @member {"excessBlobGas"|undefined} _excessBlobGas
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     */
                    Object.defineProperty(BlockHeader.prototype, "_excessBlobGas", {
                        get: $util.oneOfGetter($oneOfFields = ["excessBlobGas"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new BlockHeader instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {sf.apechain.type.v1.IBlockHeader=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.BlockHeader} BlockHeader instance
                     */
                    BlockHeader.create = function create(properties) {
                        return new BlockHeader(properties);
                    };

                    /**
                     * Encodes the specified BlockHeader message. Does not implicitly {@link sf.apechain.type.v1.BlockHeader.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {sf.apechain.type.v1.IBlockHeader} message BlockHeader message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    BlockHeader.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.parentHash != null && Object.hasOwnProperty.call(message, "parentHash"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.parentHash);
                        if (message.uncleHash != null && Object.hasOwnProperty.call(message, "uncleHash"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.uncleHash);
                        if (message.coinbase != null && Object.hasOwnProperty.call(message, "coinbase"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.coinbase);
                        if (message.stateRoot != null && Object.hasOwnProperty.call(message, "stateRoot"))
                            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.stateRoot);
                        if (message.transactionsRoot != null && Object.hasOwnProperty.call(message, "transactionsRoot"))
                            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.transactionsRoot);
                        if (message.receiptRoot != null && Object.hasOwnProperty.call(message, "receiptRoot"))
                            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.receiptRoot);
                        if (message.logsBloom != null && Object.hasOwnProperty.call(message, "logsBloom"))
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.logsBloom);
                        if (message.difficulty != null && Object.hasOwnProperty.call(message, "difficulty"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.difficulty, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                        if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                            writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.number);
                        if (message.gasLimit != null && Object.hasOwnProperty.call(message, "gasLimit"))
                            writer.uint32(/* id 10, wireType 0 =*/80).uint64(message.gasLimit);
                        if (message.gasUsed != null && Object.hasOwnProperty.call(message, "gasUsed"))
                            writer.uint32(/* id 11, wireType 0 =*/88).uint64(message.gasUsed);
                        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                            $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                        if (message.extraData != null && Object.hasOwnProperty.call(message, "extraData"))
                            writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.extraData);
                        if (message.mixHash != null && Object.hasOwnProperty.call(message, "mixHash"))
                            writer.uint32(/* id 14, wireType 2 =*/114).bytes(message.mixHash);
                        if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                            writer.uint32(/* id 15, wireType 0 =*/120).uint64(message.nonce);
                        if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                            writer.uint32(/* id 16, wireType 2 =*/130).bytes(message.hash);
                        if (message.totalDifficulty != null && Object.hasOwnProperty.call(message, "totalDifficulty"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.totalDifficulty, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                        if (message.baseFeePerGas != null && Object.hasOwnProperty.call(message, "baseFeePerGas"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.baseFeePerGas, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                        if (message.withdrawalsRoot != null && Object.hasOwnProperty.call(message, "withdrawalsRoot"))
                            writer.uint32(/* id 19, wireType 2 =*/154).bytes(message.withdrawalsRoot);
                        if (message.blobGasUsed != null && Object.hasOwnProperty.call(message, "blobGasUsed"))
                            writer.uint32(/* id 22, wireType 0 =*/176).uint64(message.blobGasUsed);
                        if (message.excessBlobGas != null && Object.hasOwnProperty.call(message, "excessBlobGas"))
                            writer.uint32(/* id 23, wireType 0 =*/184).uint64(message.excessBlobGas);
                        if (message.parentBeaconRoot != null && Object.hasOwnProperty.call(message, "parentBeaconRoot"))
                            writer.uint32(/* id 24, wireType 2 =*/194).bytes(message.parentBeaconRoot);
                        return writer;
                    };

                    /**
                     * Encodes the specified BlockHeader message, length delimited. Does not implicitly {@link sf.apechain.type.v1.BlockHeader.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {sf.apechain.type.v1.IBlockHeader} message BlockHeader message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    BlockHeader.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a BlockHeader message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.BlockHeader} BlockHeader
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    BlockHeader.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.BlockHeader();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.parentHash = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.uncleHash = reader.bytes();
                                    break;
                                }
                            case 3: {
                                    message.coinbase = reader.bytes();
                                    break;
                                }
                            case 4: {
                                    message.stateRoot = reader.bytes();
                                    break;
                                }
                            case 5: {
                                    message.transactionsRoot = reader.bytes();
                                    break;
                                }
                            case 6: {
                                    message.receiptRoot = reader.bytes();
                                    break;
                                }
                            case 7: {
                                    message.logsBloom = reader.bytes();
                                    break;
                                }
                            case 8: {
                                    message.difficulty = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 9: {
                                    message.number = reader.uint64();
                                    break;
                                }
                            case 10: {
                                    message.gasLimit = reader.uint64();
                                    break;
                                }
                            case 11: {
                                    message.gasUsed = reader.uint64();
                                    break;
                                }
                            case 12: {
                                    message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                    break;
                                }
                            case 13: {
                                    message.extraData = reader.bytes();
                                    break;
                                }
                            case 14: {
                                    message.mixHash = reader.bytes();
                                    break;
                                }
                            case 15: {
                                    message.nonce = reader.uint64();
                                    break;
                                }
                            case 16: {
                                    message.hash = reader.bytes();
                                    break;
                                }
                            case 17: {
                                    message.totalDifficulty = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 18: {
                                    message.baseFeePerGas = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 19: {
                                    message.withdrawalsRoot = reader.bytes();
                                    break;
                                }
                            case 22: {
                                    message.blobGasUsed = reader.uint64();
                                    break;
                                }
                            case 23: {
                                    message.excessBlobGas = reader.uint64();
                                    break;
                                }
                            case 24: {
                                    message.parentBeaconRoot = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a BlockHeader message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.BlockHeader} BlockHeader
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    BlockHeader.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a BlockHeader message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    BlockHeader.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.parentHash != null && message.hasOwnProperty("parentHash"))
                            if (!(message.parentHash && typeof message.parentHash.length === "number" || $util.isString(message.parentHash)))
                                return "parentHash: buffer expected";
                        if (message.uncleHash != null && message.hasOwnProperty("uncleHash"))
                            if (!(message.uncleHash && typeof message.uncleHash.length === "number" || $util.isString(message.uncleHash)))
                                return "uncleHash: buffer expected";
                        if (message.coinbase != null && message.hasOwnProperty("coinbase"))
                            if (!(message.coinbase && typeof message.coinbase.length === "number" || $util.isString(message.coinbase)))
                                return "coinbase: buffer expected";
                        if (message.stateRoot != null && message.hasOwnProperty("stateRoot"))
                            if (!(message.stateRoot && typeof message.stateRoot.length === "number" || $util.isString(message.stateRoot)))
                                return "stateRoot: buffer expected";
                        if (message.transactionsRoot != null && message.hasOwnProperty("transactionsRoot"))
                            if (!(message.transactionsRoot && typeof message.transactionsRoot.length === "number" || $util.isString(message.transactionsRoot)))
                                return "transactionsRoot: buffer expected";
                        if (message.receiptRoot != null && message.hasOwnProperty("receiptRoot"))
                            if (!(message.receiptRoot && typeof message.receiptRoot.length === "number" || $util.isString(message.receiptRoot)))
                                return "receiptRoot: buffer expected";
                        if (message.logsBloom != null && message.hasOwnProperty("logsBloom"))
                            if (!(message.logsBloom && typeof message.logsBloom.length === "number" || $util.isString(message.logsBloom)))
                                return "logsBloom: buffer expected";
                        if (message.difficulty != null && message.hasOwnProperty("difficulty")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.difficulty);
                            if (error)
                                return "difficulty." + error;
                        }
                        if (message.number != null && message.hasOwnProperty("number"))
                            if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high)))
                                return "number: integer|Long expected";
                        if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                            if (!$util.isInteger(message.gasLimit) && !(message.gasLimit && $util.isInteger(message.gasLimit.low) && $util.isInteger(message.gasLimit.high)))
                                return "gasLimit: integer|Long expected";
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            if (!$util.isInteger(message.gasUsed) && !(message.gasUsed && $util.isInteger(message.gasUsed.low) && $util.isInteger(message.gasUsed.high)))
                                return "gasUsed: integer|Long expected";
                        if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                            var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                            if (error)
                                return "timestamp." + error;
                        }
                        if (message.extraData != null && message.hasOwnProperty("extraData"))
                            if (!(message.extraData && typeof message.extraData.length === "number" || $util.isString(message.extraData)))
                                return "extraData: buffer expected";
                        if (message.mixHash != null && message.hasOwnProperty("mixHash"))
                            if (!(message.mixHash && typeof message.mixHash.length === "number" || $util.isString(message.mixHash)))
                                return "mixHash: buffer expected";
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            if (!$util.isInteger(message.nonce) && !(message.nonce && $util.isInteger(message.nonce.low) && $util.isInteger(message.nonce.high)))
                                return "nonce: integer|Long expected";
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                                return "hash: buffer expected";
                        if (message.totalDifficulty != null && message.hasOwnProperty("totalDifficulty")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.totalDifficulty);
                            if (error)
                                return "totalDifficulty." + error;
                        }
                        if (message.baseFeePerGas != null && message.hasOwnProperty("baseFeePerGas")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.baseFeePerGas);
                            if (error)
                                return "baseFeePerGas." + error;
                        }
                        if (message.withdrawalsRoot != null && message.hasOwnProperty("withdrawalsRoot"))
                            if (!(message.withdrawalsRoot && typeof message.withdrawalsRoot.length === "number" || $util.isString(message.withdrawalsRoot)))
                                return "withdrawalsRoot: buffer expected";
                        if (message.blobGasUsed != null && message.hasOwnProperty("blobGasUsed")) {
                            properties._blobGasUsed = 1;
                            if (!$util.isInteger(message.blobGasUsed) && !(message.blobGasUsed && $util.isInteger(message.blobGasUsed.low) && $util.isInteger(message.blobGasUsed.high)))
                                return "blobGasUsed: integer|Long expected";
                        }
                        if (message.excessBlobGas != null && message.hasOwnProperty("excessBlobGas")) {
                            properties._excessBlobGas = 1;
                            if (!$util.isInteger(message.excessBlobGas) && !(message.excessBlobGas && $util.isInteger(message.excessBlobGas.low) && $util.isInteger(message.excessBlobGas.high)))
                                return "excessBlobGas: integer|Long expected";
                        }
                        if (message.parentBeaconRoot != null && message.hasOwnProperty("parentBeaconRoot"))
                            if (!(message.parentBeaconRoot && typeof message.parentBeaconRoot.length === "number" || $util.isString(message.parentBeaconRoot)))
                                return "parentBeaconRoot: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a BlockHeader message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.BlockHeader} BlockHeader
                     */
                    BlockHeader.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.BlockHeader)
                            return object;
                        var message = new $root.sf.apechain.type.v1.BlockHeader();
                        if (object.parentHash != null)
                            if (typeof object.parentHash === "string")
                                $util.base64.decode(object.parentHash, message.parentHash = $util.newBuffer($util.base64.length(object.parentHash)), 0);
                            else if (object.parentHash.length >= 0)
                                message.parentHash = object.parentHash;
                        if (object.uncleHash != null)
                            if (typeof object.uncleHash === "string")
                                $util.base64.decode(object.uncleHash, message.uncleHash = $util.newBuffer($util.base64.length(object.uncleHash)), 0);
                            else if (object.uncleHash.length >= 0)
                                message.uncleHash = object.uncleHash;
                        if (object.coinbase != null)
                            if (typeof object.coinbase === "string")
                                $util.base64.decode(object.coinbase, message.coinbase = $util.newBuffer($util.base64.length(object.coinbase)), 0);
                            else if (object.coinbase.length >= 0)
                                message.coinbase = object.coinbase;
                        if (object.stateRoot != null)
                            if (typeof object.stateRoot === "string")
                                $util.base64.decode(object.stateRoot, message.stateRoot = $util.newBuffer($util.base64.length(object.stateRoot)), 0);
                            else if (object.stateRoot.length >= 0)
                                message.stateRoot = object.stateRoot;
                        if (object.transactionsRoot != null)
                            if (typeof object.transactionsRoot === "string")
                                $util.base64.decode(object.transactionsRoot, message.transactionsRoot = $util.newBuffer($util.base64.length(object.transactionsRoot)), 0);
                            else if (object.transactionsRoot.length >= 0)
                                message.transactionsRoot = object.transactionsRoot;
                        if (object.receiptRoot != null)
                            if (typeof object.receiptRoot === "string")
                                $util.base64.decode(object.receiptRoot, message.receiptRoot = $util.newBuffer($util.base64.length(object.receiptRoot)), 0);
                            else if (object.receiptRoot.length >= 0)
                                message.receiptRoot = object.receiptRoot;
                        if (object.logsBloom != null)
                            if (typeof object.logsBloom === "string")
                                $util.base64.decode(object.logsBloom, message.logsBloom = $util.newBuffer($util.base64.length(object.logsBloom)), 0);
                            else if (object.logsBloom.length >= 0)
                                message.logsBloom = object.logsBloom;
                        if (object.difficulty != null) {
                            if (typeof object.difficulty !== "object")
                                throw TypeError(".sf.apechain.type.v1.BlockHeader.difficulty: object expected");
                            message.difficulty = $root.sf.apechain.type.v1.BigInt.fromObject(object.difficulty);
                        }
                        if (object.number != null)
                            if ($util.Long)
                                (message.number = $util.Long.fromValue(object.number)).unsigned = true;
                            else if (typeof object.number === "string")
                                message.number = parseInt(object.number, 10);
                            else if (typeof object.number === "number")
                                message.number = object.number;
                            else if (typeof object.number === "object")
                                message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber(true);
                        if (object.gasLimit != null)
                            if ($util.Long)
                                (message.gasLimit = $util.Long.fromValue(object.gasLimit)).unsigned = true;
                            else if (typeof object.gasLimit === "string")
                                message.gasLimit = parseInt(object.gasLimit, 10);
                            else if (typeof object.gasLimit === "number")
                                message.gasLimit = object.gasLimit;
                            else if (typeof object.gasLimit === "object")
                                message.gasLimit = new $util.LongBits(object.gasLimit.low >>> 0, object.gasLimit.high >>> 0).toNumber(true);
                        if (object.gasUsed != null)
                            if ($util.Long)
                                (message.gasUsed = $util.Long.fromValue(object.gasUsed)).unsigned = true;
                            else if (typeof object.gasUsed === "string")
                                message.gasUsed = parseInt(object.gasUsed, 10);
                            else if (typeof object.gasUsed === "number")
                                message.gasUsed = object.gasUsed;
                            else if (typeof object.gasUsed === "object")
                                message.gasUsed = new $util.LongBits(object.gasUsed.low >>> 0, object.gasUsed.high >>> 0).toNumber(true);
                        if (object.timestamp != null) {
                            if (typeof object.timestamp !== "object")
                                throw TypeError(".sf.apechain.type.v1.BlockHeader.timestamp: object expected");
                            message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                        }
                        if (object.extraData != null)
                            if (typeof object.extraData === "string")
                                $util.base64.decode(object.extraData, message.extraData = $util.newBuffer($util.base64.length(object.extraData)), 0);
                            else if (object.extraData.length >= 0)
                                message.extraData = object.extraData;
                        if (object.mixHash != null)
                            if (typeof object.mixHash === "string")
                                $util.base64.decode(object.mixHash, message.mixHash = $util.newBuffer($util.base64.length(object.mixHash)), 0);
                            else if (object.mixHash.length >= 0)
                                message.mixHash = object.mixHash;
                        if (object.nonce != null)
                            if ($util.Long)
                                (message.nonce = $util.Long.fromValue(object.nonce)).unsigned = true;
                            else if (typeof object.nonce === "string")
                                message.nonce = parseInt(object.nonce, 10);
                            else if (typeof object.nonce === "number")
                                message.nonce = object.nonce;
                            else if (typeof object.nonce === "object")
                                message.nonce = new $util.LongBits(object.nonce.low >>> 0, object.nonce.high >>> 0).toNumber(true);
                        if (object.hash != null)
                            if (typeof object.hash === "string")
                                $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                            else if (object.hash.length >= 0)
                                message.hash = object.hash;
                        if (object.totalDifficulty != null) {
                            if (typeof object.totalDifficulty !== "object")
                                throw TypeError(".sf.apechain.type.v1.BlockHeader.totalDifficulty: object expected");
                            message.totalDifficulty = $root.sf.apechain.type.v1.BigInt.fromObject(object.totalDifficulty);
                        }
                        if (object.baseFeePerGas != null) {
                            if (typeof object.baseFeePerGas !== "object")
                                throw TypeError(".sf.apechain.type.v1.BlockHeader.baseFeePerGas: object expected");
                            message.baseFeePerGas = $root.sf.apechain.type.v1.BigInt.fromObject(object.baseFeePerGas);
                        }
                        if (object.withdrawalsRoot != null)
                            if (typeof object.withdrawalsRoot === "string")
                                $util.base64.decode(object.withdrawalsRoot, message.withdrawalsRoot = $util.newBuffer($util.base64.length(object.withdrawalsRoot)), 0);
                            else if (object.withdrawalsRoot.length >= 0)
                                message.withdrawalsRoot = object.withdrawalsRoot;
                        if (object.blobGasUsed != null)
                            if ($util.Long)
                                (message.blobGasUsed = $util.Long.fromValue(object.blobGasUsed)).unsigned = true;
                            else if (typeof object.blobGasUsed === "string")
                                message.blobGasUsed = parseInt(object.blobGasUsed, 10);
                            else if (typeof object.blobGasUsed === "number")
                                message.blobGasUsed = object.blobGasUsed;
                            else if (typeof object.blobGasUsed === "object")
                                message.blobGasUsed = new $util.LongBits(object.blobGasUsed.low >>> 0, object.blobGasUsed.high >>> 0).toNumber(true);
                        if (object.excessBlobGas != null)
                            if ($util.Long)
                                (message.excessBlobGas = $util.Long.fromValue(object.excessBlobGas)).unsigned = true;
                            else if (typeof object.excessBlobGas === "string")
                                message.excessBlobGas = parseInt(object.excessBlobGas, 10);
                            else if (typeof object.excessBlobGas === "number")
                                message.excessBlobGas = object.excessBlobGas;
                            else if (typeof object.excessBlobGas === "object")
                                message.excessBlobGas = new $util.LongBits(object.excessBlobGas.low >>> 0, object.excessBlobGas.high >>> 0).toNumber(true);
                        if (object.parentBeaconRoot != null)
                            if (typeof object.parentBeaconRoot === "string")
                                $util.base64.decode(object.parentBeaconRoot, message.parentBeaconRoot = $util.newBuffer($util.base64.length(object.parentBeaconRoot)), 0);
                            else if (object.parentBeaconRoot.length >= 0)
                                message.parentBeaconRoot = object.parentBeaconRoot;
                        return message;
                    };

                    /**
                     * Creates a plain object from a BlockHeader message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {sf.apechain.type.v1.BlockHeader} message BlockHeader
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    BlockHeader.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.parentHash = "";
                            else {
                                object.parentHash = [];
                                if (options.bytes !== Array)
                                    object.parentHash = $util.newBuffer(object.parentHash);
                            }
                            if (options.bytes === String)
                                object.uncleHash = "";
                            else {
                                object.uncleHash = [];
                                if (options.bytes !== Array)
                                    object.uncleHash = $util.newBuffer(object.uncleHash);
                            }
                            if (options.bytes === String)
                                object.coinbase = "";
                            else {
                                object.coinbase = [];
                                if (options.bytes !== Array)
                                    object.coinbase = $util.newBuffer(object.coinbase);
                            }
                            if (options.bytes === String)
                                object.stateRoot = "";
                            else {
                                object.stateRoot = [];
                                if (options.bytes !== Array)
                                    object.stateRoot = $util.newBuffer(object.stateRoot);
                            }
                            if (options.bytes === String)
                                object.transactionsRoot = "";
                            else {
                                object.transactionsRoot = [];
                                if (options.bytes !== Array)
                                    object.transactionsRoot = $util.newBuffer(object.transactionsRoot);
                            }
                            if (options.bytes === String)
                                object.receiptRoot = "";
                            else {
                                object.receiptRoot = [];
                                if (options.bytes !== Array)
                                    object.receiptRoot = $util.newBuffer(object.receiptRoot);
                            }
                            if (options.bytes === String)
                                object.logsBloom = "";
                            else {
                                object.logsBloom = [];
                                if (options.bytes !== Array)
                                    object.logsBloom = $util.newBuffer(object.logsBloom);
                            }
                            object.difficulty = null;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.number = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.number = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.gasLimit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.gasLimit = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.gasUsed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.gasUsed = options.longs === String ? "0" : 0;
                            object.timestamp = null;
                            if (options.bytes === String)
                                object.extraData = "";
                            else {
                                object.extraData = [];
                                if (options.bytes !== Array)
                                    object.extraData = $util.newBuffer(object.extraData);
                            }
                            if (options.bytes === String)
                                object.mixHash = "";
                            else {
                                object.mixHash = [];
                                if (options.bytes !== Array)
                                    object.mixHash = $util.newBuffer(object.mixHash);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.nonce = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.nonce = options.longs === String ? "0" : 0;
                            if (options.bytes === String)
                                object.hash = "";
                            else {
                                object.hash = [];
                                if (options.bytes !== Array)
                                    object.hash = $util.newBuffer(object.hash);
                            }
                            object.totalDifficulty = null;
                            object.baseFeePerGas = null;
                            if (options.bytes === String)
                                object.withdrawalsRoot = "";
                            else {
                                object.withdrawalsRoot = [];
                                if (options.bytes !== Array)
                                    object.withdrawalsRoot = $util.newBuffer(object.withdrawalsRoot);
                            }
                            if (options.bytes === String)
                                object.parentBeaconRoot = "";
                            else {
                                object.parentBeaconRoot = [];
                                if (options.bytes !== Array)
                                    object.parentBeaconRoot = $util.newBuffer(object.parentBeaconRoot);
                            }
                        }
                        if (message.parentHash != null && message.hasOwnProperty("parentHash"))
                            object.parentHash = options.bytes === String ? $util.base64.encode(message.parentHash, 0, message.parentHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentHash) : message.parentHash;
                        if (message.uncleHash != null && message.hasOwnProperty("uncleHash"))
                            object.uncleHash = options.bytes === String ? $util.base64.encode(message.uncleHash, 0, message.uncleHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.uncleHash) : message.uncleHash;
                        if (message.coinbase != null && message.hasOwnProperty("coinbase"))
                            object.coinbase = options.bytes === String ? $util.base64.encode(message.coinbase, 0, message.coinbase.length) : options.bytes === Array ? Array.prototype.slice.call(message.coinbase) : message.coinbase;
                        if (message.stateRoot != null && message.hasOwnProperty("stateRoot"))
                            object.stateRoot = options.bytes === String ? $util.base64.encode(message.stateRoot, 0, message.stateRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.stateRoot) : message.stateRoot;
                        if (message.transactionsRoot != null && message.hasOwnProperty("transactionsRoot"))
                            object.transactionsRoot = options.bytes === String ? $util.base64.encode(message.transactionsRoot, 0, message.transactionsRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.transactionsRoot) : message.transactionsRoot;
                        if (message.receiptRoot != null && message.hasOwnProperty("receiptRoot"))
                            object.receiptRoot = options.bytes === String ? $util.base64.encode(message.receiptRoot, 0, message.receiptRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.receiptRoot) : message.receiptRoot;
                        if (message.logsBloom != null && message.hasOwnProperty("logsBloom"))
                            object.logsBloom = options.bytes === String ? $util.base64.encode(message.logsBloom, 0, message.logsBloom.length) : options.bytes === Array ? Array.prototype.slice.call(message.logsBloom) : message.logsBloom;
                        if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                            object.difficulty = $root.sf.apechain.type.v1.BigInt.toObject(message.difficulty, options);
                        if (message.number != null && message.hasOwnProperty("number"))
                            if (typeof message.number === "number")
                                object.number = options.longs === String ? String(message.number) : message.number;
                            else
                                object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber(true) : message.number;
                        if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                            if (typeof message.gasLimit === "number")
                                object.gasLimit = options.longs === String ? String(message.gasLimit) : message.gasLimit;
                            else
                                object.gasLimit = options.longs === String ? $util.Long.prototype.toString.call(message.gasLimit) : options.longs === Number ? new $util.LongBits(message.gasLimit.low >>> 0, message.gasLimit.high >>> 0).toNumber(true) : message.gasLimit;
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            if (typeof message.gasUsed === "number")
                                object.gasUsed = options.longs === String ? String(message.gasUsed) : message.gasUsed;
                            else
                                object.gasUsed = options.longs === String ? $util.Long.prototype.toString.call(message.gasUsed) : options.longs === Number ? new $util.LongBits(message.gasUsed.low >>> 0, message.gasUsed.high >>> 0).toNumber(true) : message.gasUsed;
                        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                            object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                        if (message.extraData != null && message.hasOwnProperty("extraData"))
                            object.extraData = options.bytes === String ? $util.base64.encode(message.extraData, 0, message.extraData.length) : options.bytes === Array ? Array.prototype.slice.call(message.extraData) : message.extraData;
                        if (message.mixHash != null && message.hasOwnProperty("mixHash"))
                            object.mixHash = options.bytes === String ? $util.base64.encode(message.mixHash, 0, message.mixHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.mixHash) : message.mixHash;
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            if (typeof message.nonce === "number")
                                object.nonce = options.longs === String ? String(message.nonce) : message.nonce;
                            else
                                object.nonce = options.longs === String ? $util.Long.prototype.toString.call(message.nonce) : options.longs === Number ? new $util.LongBits(message.nonce.low >>> 0, message.nonce.high >>> 0).toNumber(true) : message.nonce;
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
                        if (message.totalDifficulty != null && message.hasOwnProperty("totalDifficulty"))
                            object.totalDifficulty = $root.sf.apechain.type.v1.BigInt.toObject(message.totalDifficulty, options);
                        if (message.baseFeePerGas != null && message.hasOwnProperty("baseFeePerGas"))
                            object.baseFeePerGas = $root.sf.apechain.type.v1.BigInt.toObject(message.baseFeePerGas, options);
                        if (message.withdrawalsRoot != null && message.hasOwnProperty("withdrawalsRoot"))
                            object.withdrawalsRoot = options.bytes === String ? $util.base64.encode(message.withdrawalsRoot, 0, message.withdrawalsRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.withdrawalsRoot) : message.withdrawalsRoot;
                        if (message.blobGasUsed != null && message.hasOwnProperty("blobGasUsed")) {
                            if (typeof message.blobGasUsed === "number")
                                object.blobGasUsed = options.longs === String ? String(message.blobGasUsed) : message.blobGasUsed;
                            else
                                object.blobGasUsed = options.longs === String ? $util.Long.prototype.toString.call(message.blobGasUsed) : options.longs === Number ? new $util.LongBits(message.blobGasUsed.low >>> 0, message.blobGasUsed.high >>> 0).toNumber(true) : message.blobGasUsed;
                            if (options.oneofs)
                                object._blobGasUsed = "blobGasUsed";
                        }
                        if (message.excessBlobGas != null && message.hasOwnProperty("excessBlobGas")) {
                            if (typeof message.excessBlobGas === "number")
                                object.excessBlobGas = options.longs === String ? String(message.excessBlobGas) : message.excessBlobGas;
                            else
                                object.excessBlobGas = options.longs === String ? $util.Long.prototype.toString.call(message.excessBlobGas) : options.longs === Number ? new $util.LongBits(message.excessBlobGas.low >>> 0, message.excessBlobGas.high >>> 0).toNumber(true) : message.excessBlobGas;
                            if (options.oneofs)
                                object._excessBlobGas = "excessBlobGas";
                        }
                        if (message.parentBeaconRoot != null && message.hasOwnProperty("parentBeaconRoot"))
                            object.parentBeaconRoot = options.bytes === String ? $util.base64.encode(message.parentBeaconRoot, 0, message.parentBeaconRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentBeaconRoot) : message.parentBeaconRoot;
                        return object;
                    };

                    /**
                     * Converts this BlockHeader to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    BlockHeader.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for BlockHeader
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.BlockHeader
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    BlockHeader.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.BlockHeader";
                    };

                    return BlockHeader;
                })();

                v1.BigInt = (function() {

                    /**
                     * Properties of a BigInt.
                     * @memberof sf.apechain.type.v1
                     * @interface IBigInt
                     * @property {Uint8Array|null} [bytes] BigInt bytes
                     */

                    /**
                     * Constructs a new BigInt.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a BigInt.
                     * @implements IBigInt
                     * @constructor
                     * @param {sf.apechain.type.v1.IBigInt=} [properties] Properties to set
                     */
                    function BigInt(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * BigInt bytes.
                     * @member {Uint8Array} bytes
                     * @memberof sf.apechain.type.v1.BigInt
                     * @instance
                     */
                    BigInt.prototype.bytes = $util.newBuffer([]);

                    /**
                     * Creates a new BigInt instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {sf.apechain.type.v1.IBigInt=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.BigInt} BigInt instance
                     */
                    BigInt.create = function create(properties) {
                        return new BigInt(properties);
                    };

                    /**
                     * Encodes the specified BigInt message. Does not implicitly {@link sf.apechain.type.v1.BigInt.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {sf.apechain.type.v1.IBigInt} message BigInt message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    BigInt.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.bytes != null && Object.hasOwnProperty.call(message, "bytes"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.bytes);
                        return writer;
                    };

                    /**
                     * Encodes the specified BigInt message, length delimited. Does not implicitly {@link sf.apechain.type.v1.BigInt.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {sf.apechain.type.v1.IBigInt} message BigInt message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    BigInt.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a BigInt message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.BigInt} BigInt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    BigInt.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.BigInt();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.bytes = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a BigInt message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.BigInt} BigInt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    BigInt.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a BigInt message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    BigInt.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.bytes != null && message.hasOwnProperty("bytes"))
                            if (!(message.bytes && typeof message.bytes.length === "number" || $util.isString(message.bytes)))
                                return "bytes: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a BigInt message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.BigInt} BigInt
                     */
                    BigInt.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.BigInt)
                            return object;
                        var message = new $root.sf.apechain.type.v1.BigInt();
                        if (object.bytes != null)
                            if (typeof object.bytes === "string")
                                $util.base64.decode(object.bytes, message.bytes = $util.newBuffer($util.base64.length(object.bytes)), 0);
                            else if (object.bytes.length >= 0)
                                message.bytes = object.bytes;
                        return message;
                    };

                    /**
                     * Creates a plain object from a BigInt message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {sf.apechain.type.v1.BigInt} message BigInt
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    BigInt.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            if (options.bytes === String)
                                object.bytes = "";
                            else {
                                object.bytes = [];
                                if (options.bytes !== Array)
                                    object.bytes = $util.newBuffer(object.bytes);
                            }
                        if (message.bytes != null && message.hasOwnProperty("bytes"))
                            object.bytes = options.bytes === String ? $util.base64.encode(message.bytes, 0, message.bytes.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytes) : message.bytes;
                        return object;
                    };

                    /**
                     * Converts this BigInt to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.BigInt
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    BigInt.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for BigInt
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.BigInt
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    BigInt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.BigInt";
                    };

                    return BigInt;
                })();

                v1.TransactionTrace = (function() {

                    /**
                     * Properties of a TransactionTrace.
                     * @memberof sf.apechain.type.v1
                     * @interface ITransactionTrace
                     * @property {Uint8Array|null} [to] TransactionTrace to
                     * @property {number|Long|null} [nonce] TransactionTrace nonce
                     * @property {sf.apechain.type.v1.IBigInt|null} [gasPrice] TransactionTrace gasPrice
                     * @property {number|Long|null} [gasLimit] TransactionTrace gasLimit
                     * @property {sf.apechain.type.v1.IBigInt|null} [value] TransactionTrace value
                     * @property {Uint8Array|null} [input] TransactionTrace input
                     * @property {Uint8Array|null} [v] TransactionTrace v
                     * @property {Uint8Array|null} [r] TransactionTrace r
                     * @property {Uint8Array|null} [s] TransactionTrace s
                     * @property {number|Long|null} [gasUsed] TransactionTrace gasUsed
                     * @property {sf.apechain.type.v1.TransactionTrace.Type|null} [type] TransactionTrace type
                     * @property {Array.<sf.apechain.type.v1.IAccessTuple>|null} [accessList] TransactionTrace accessList
                     * @property {sf.apechain.type.v1.IBigInt|null} [maxFeePerGas] TransactionTrace maxFeePerGas
                     * @property {sf.apechain.type.v1.IBigInt|null} [maxPriorityFeePerGas] TransactionTrace maxPriorityFeePerGas
                     * @property {number|null} [index] TransactionTrace index
                     * @property {Uint8Array|null} [hash] TransactionTrace hash
                     * @property {Uint8Array|null} [from] TransactionTrace from
                     * @property {number|Long|null} [beginOrdinal] TransactionTrace beginOrdinal
                     * @property {number|Long|null} [endOrdinal] TransactionTrace endOrdinal
                     * @property {sf.apechain.type.v1.TransactionTraceStatus|null} [status] TransactionTrace status
                     * @property {sf.apechain.type.v1.ITransactionReceipt|null} [receipt] TransactionTrace receipt
                     * @property {number|Long|null} [blobGas] TransactionTrace blobGas
                     * @property {sf.apechain.type.v1.IBigInt|null} [blobGasFeeCap] TransactionTrace blobGasFeeCap
                     * @property {Array.<Uint8Array>|null} [blobHashes] TransactionTrace blobHashes
                     */

                    /**
                     * Constructs a new TransactionTrace.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a TransactionTrace.
                     * @implements ITransactionTrace
                     * @constructor
                     * @param {sf.apechain.type.v1.ITransactionTrace=} [properties] Properties to set
                     */
                    function TransactionTrace(properties) {
                        this.accessList = [];
                        this.blobHashes = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TransactionTrace to.
                     * @member {Uint8Array} to
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.to = $util.newBuffer([]);

                    /**
                     * TransactionTrace nonce.
                     * @member {number|Long} nonce
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.nonce = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionTrace gasPrice.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} gasPrice
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.gasPrice = null;

                    /**
                     * TransactionTrace gasLimit.
                     * @member {number|Long} gasLimit
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.gasLimit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionTrace value.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} value
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.value = null;

                    /**
                     * TransactionTrace input.
                     * @member {Uint8Array} input
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.input = $util.newBuffer([]);

                    /**
                     * TransactionTrace v.
                     * @member {Uint8Array} v
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.v = $util.newBuffer([]);

                    /**
                     * TransactionTrace r.
                     * @member {Uint8Array} r
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.r = $util.newBuffer([]);

                    /**
                     * TransactionTrace s.
                     * @member {Uint8Array} s
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.s = $util.newBuffer([]);

                    /**
                     * TransactionTrace gasUsed.
                     * @member {number|Long} gasUsed
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionTrace type.
                     * @member {sf.apechain.type.v1.TransactionTrace.Type} type
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.type = 0;

                    /**
                     * TransactionTrace accessList.
                     * @member {Array.<sf.apechain.type.v1.IAccessTuple>} accessList
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.accessList = $util.emptyArray;

                    /**
                     * TransactionTrace maxFeePerGas.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} maxFeePerGas
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.maxFeePerGas = null;

                    /**
                     * TransactionTrace maxPriorityFeePerGas.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} maxPriorityFeePerGas
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.maxPriorityFeePerGas = null;

                    /**
                     * TransactionTrace index.
                     * @member {number} index
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.index = 0;

                    /**
                     * TransactionTrace hash.
                     * @member {Uint8Array} hash
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.hash = $util.newBuffer([]);

                    /**
                     * TransactionTrace from.
                     * @member {Uint8Array} from
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.from = $util.newBuffer([]);

                    /**
                     * TransactionTrace beginOrdinal.
                     * @member {number|Long} beginOrdinal
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.beginOrdinal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionTrace endOrdinal.
                     * @member {number|Long} endOrdinal
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.endOrdinal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionTrace status.
                     * @member {sf.apechain.type.v1.TransactionTraceStatus} status
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.status = 0;

                    /**
                     * TransactionTrace receipt.
                     * @member {sf.apechain.type.v1.ITransactionReceipt|null|undefined} receipt
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.receipt = null;

                    /**
                     * TransactionTrace blobGas.
                     * @member {number|Long|null|undefined} blobGas
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.blobGas = null;

                    /**
                     * TransactionTrace blobGasFeeCap.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} blobGasFeeCap
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.blobGasFeeCap = null;

                    /**
                     * TransactionTrace blobHashes.
                     * @member {Array.<Uint8Array>} blobHashes
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    TransactionTrace.prototype.blobHashes = $util.emptyArray;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * TransactionTrace _blobGas.
                     * @member {"blobGas"|undefined} _blobGas
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    Object.defineProperty(TransactionTrace.prototype, "_blobGas", {
                        get: $util.oneOfGetter($oneOfFields = ["blobGas"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * TransactionTrace _blobGasFeeCap.
                     * @member {"blobGasFeeCap"|undefined} _blobGasFeeCap
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     */
                    Object.defineProperty(TransactionTrace.prototype, "_blobGasFeeCap", {
                        get: $util.oneOfGetter($oneOfFields = ["blobGasFeeCap"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new TransactionTrace instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionTrace=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.TransactionTrace} TransactionTrace instance
                     */
                    TransactionTrace.create = function create(properties) {
                        return new TransactionTrace(properties);
                    };

                    /**
                     * Encodes the specified TransactionTrace message. Does not implicitly {@link sf.apechain.type.v1.TransactionTrace.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionTrace} message TransactionTrace message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TransactionTrace.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.to);
                        if (message.nonce != null && Object.hasOwnProperty.call(message, "nonce"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.nonce);
                        if (message.gasPrice != null && Object.hasOwnProperty.call(message, "gasPrice"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.gasPrice, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.gasLimit != null && Object.hasOwnProperty.call(message, "gasLimit"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.gasLimit);
                        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.value, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.input != null && Object.hasOwnProperty.call(message, "input"))
                            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.input);
                        if (message.v != null && Object.hasOwnProperty.call(message, "v"))
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.v);
                        if (message.r != null && Object.hasOwnProperty.call(message, "r"))
                            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.r);
                        if (message.s != null && Object.hasOwnProperty.call(message, "s"))
                            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.s);
                        if (message.gasUsed != null && Object.hasOwnProperty.call(message, "gasUsed"))
                            writer.uint32(/* id 10, wireType 0 =*/80).uint64(message.gasUsed);
                        if (message.maxFeePerGas != null && Object.hasOwnProperty.call(message, "maxFeePerGas"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.maxFeePerGas, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.type);
                        if (message.maxPriorityFeePerGas != null && Object.hasOwnProperty.call(message, "maxPriorityFeePerGas"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.maxPriorityFeePerGas, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                        if (message.accessList != null && message.accessList.length)
                            for (var i = 0; i < message.accessList.length; ++i)
                                $root.sf.apechain.type.v1.AccessTuple.encode(message.accessList[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                            writer.uint32(/* id 20, wireType 0 =*/160).uint32(message.index);
                        if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                            writer.uint32(/* id 21, wireType 2 =*/170).bytes(message.hash);
                        if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                            writer.uint32(/* id 22, wireType 2 =*/178).bytes(message.from);
                        if (message.beginOrdinal != null && Object.hasOwnProperty.call(message, "beginOrdinal"))
                            writer.uint32(/* id 25, wireType 0 =*/200).uint64(message.beginOrdinal);
                        if (message.endOrdinal != null && Object.hasOwnProperty.call(message, "endOrdinal"))
                            writer.uint32(/* id 26, wireType 0 =*/208).uint64(message.endOrdinal);
                        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                            writer.uint32(/* id 30, wireType 0 =*/240).int32(message.status);
                        if (message.receipt != null && Object.hasOwnProperty.call(message, "receipt"))
                            $root.sf.apechain.type.v1.TransactionReceipt.encode(message.receipt, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
                        if (message.blobGas != null && Object.hasOwnProperty.call(message, "blobGas"))
                            writer.uint32(/* id 33, wireType 0 =*/264).uint64(message.blobGas);
                        if (message.blobGasFeeCap != null && Object.hasOwnProperty.call(message, "blobGasFeeCap"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.blobGasFeeCap, writer.uint32(/* id 34, wireType 2 =*/274).fork()).ldelim();
                        if (message.blobHashes != null && message.blobHashes.length)
                            for (var i = 0; i < message.blobHashes.length; ++i)
                                writer.uint32(/* id 35, wireType 2 =*/282).bytes(message.blobHashes[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified TransactionTrace message, length delimited. Does not implicitly {@link sf.apechain.type.v1.TransactionTrace.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionTrace} message TransactionTrace message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TransactionTrace.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TransactionTrace message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.TransactionTrace} TransactionTrace
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TransactionTrace.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.TransactionTrace();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.to = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.nonce = reader.uint64();
                                    break;
                                }
                            case 3: {
                                    message.gasPrice = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 4: {
                                    message.gasLimit = reader.uint64();
                                    break;
                                }
                            case 5: {
                                    message.value = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 6: {
                                    message.input = reader.bytes();
                                    break;
                                }
                            case 7: {
                                    message.v = reader.bytes();
                                    break;
                                }
                            case 8: {
                                    message.r = reader.bytes();
                                    break;
                                }
                            case 9: {
                                    message.s = reader.bytes();
                                    break;
                                }
                            case 10: {
                                    message.gasUsed = reader.uint64();
                                    break;
                                }
                            case 12: {
                                    message.type = reader.int32();
                                    break;
                                }
                            case 14: {
                                    if (!(message.accessList && message.accessList.length))
                                        message.accessList = [];
                                    message.accessList.push($root.sf.apechain.type.v1.AccessTuple.decode(reader, reader.uint32()));
                                    break;
                                }
                            case 11: {
                                    message.maxFeePerGas = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 13: {
                                    message.maxPriorityFeePerGas = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 20: {
                                    message.index = reader.uint32();
                                    break;
                                }
                            case 21: {
                                    message.hash = reader.bytes();
                                    break;
                                }
                            case 22: {
                                    message.from = reader.bytes();
                                    break;
                                }
                            case 25: {
                                    message.beginOrdinal = reader.uint64();
                                    break;
                                }
                            case 26: {
                                    message.endOrdinal = reader.uint64();
                                    break;
                                }
                            case 30: {
                                    message.status = reader.int32();
                                    break;
                                }
                            case 31: {
                                    message.receipt = $root.sf.apechain.type.v1.TransactionReceipt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 33: {
                                    message.blobGas = reader.uint64();
                                    break;
                                }
                            case 34: {
                                    message.blobGasFeeCap = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 35: {
                                    if (!(message.blobHashes && message.blobHashes.length))
                                        message.blobHashes = [];
                                    message.blobHashes.push(reader.bytes());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TransactionTrace message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.TransactionTrace} TransactionTrace
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TransactionTrace.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TransactionTrace message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TransactionTrace.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.to != null && message.hasOwnProperty("to"))
                            if (!(message.to && typeof message.to.length === "number" || $util.isString(message.to)))
                                return "to: buffer expected";
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            if (!$util.isInteger(message.nonce) && !(message.nonce && $util.isInteger(message.nonce.low) && $util.isInteger(message.nonce.high)))
                                return "nonce: integer|Long expected";
                        if (message.gasPrice != null && message.hasOwnProperty("gasPrice")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.gasPrice);
                            if (error)
                                return "gasPrice." + error;
                        }
                        if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                            if (!$util.isInteger(message.gasLimit) && !(message.gasLimit && $util.isInteger(message.gasLimit.low) && $util.isInteger(message.gasLimit.high)))
                                return "gasLimit: integer|Long expected";
                        if (message.value != null && message.hasOwnProperty("value")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.value);
                            if (error)
                                return "value." + error;
                        }
                        if (message.input != null && message.hasOwnProperty("input"))
                            if (!(message.input && typeof message.input.length === "number" || $util.isString(message.input)))
                                return "input: buffer expected";
                        if (message.v != null && message.hasOwnProperty("v"))
                            if (!(message.v && typeof message.v.length === "number" || $util.isString(message.v)))
                                return "v: buffer expected";
                        if (message.r != null && message.hasOwnProperty("r"))
                            if (!(message.r && typeof message.r.length === "number" || $util.isString(message.r)))
                                return "r: buffer expected";
                        if (message.s != null && message.hasOwnProperty("s"))
                            if (!(message.s && typeof message.s.length === "number" || $util.isString(message.s)))
                                return "s: buffer expected";
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            if (!$util.isInteger(message.gasUsed) && !(message.gasUsed && $util.isInteger(message.gasUsed.low) && $util.isInteger(message.gasUsed.high)))
                                return "gasUsed: integer|Long expected";
                        if (message.type != null && message.hasOwnProperty("type"))
                            switch (message.type) {
                            default:
                                return "type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.accessList != null && message.hasOwnProperty("accessList")) {
                            if (!Array.isArray(message.accessList))
                                return "accessList: array expected";
                            for (var i = 0; i < message.accessList.length; ++i) {
                                var error = $root.sf.apechain.type.v1.AccessTuple.verify(message.accessList[i]);
                                if (error)
                                    return "accessList." + error;
                            }
                        }
                        if (message.maxFeePerGas != null && message.hasOwnProperty("maxFeePerGas")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.maxFeePerGas);
                            if (error)
                                return "maxFeePerGas." + error;
                        }
                        if (message.maxPriorityFeePerGas != null && message.hasOwnProperty("maxPriorityFeePerGas")) {
                            var error = $root.sf.apechain.type.v1.BigInt.verify(message.maxPriorityFeePerGas);
                            if (error)
                                return "maxPriorityFeePerGas." + error;
                        }
                        if (message.index != null && message.hasOwnProperty("index"))
                            if (!$util.isInteger(message.index))
                                return "index: integer expected";
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            if (!(message.hash && typeof message.hash.length === "number" || $util.isString(message.hash)))
                                return "hash: buffer expected";
                        if (message.from != null && message.hasOwnProperty("from"))
                            if (!(message.from && typeof message.from.length === "number" || $util.isString(message.from)))
                                return "from: buffer expected";
                        if (message.beginOrdinal != null && message.hasOwnProperty("beginOrdinal"))
                            if (!$util.isInteger(message.beginOrdinal) && !(message.beginOrdinal && $util.isInteger(message.beginOrdinal.low) && $util.isInteger(message.beginOrdinal.high)))
                                return "beginOrdinal: integer|Long expected";
                        if (message.endOrdinal != null && message.hasOwnProperty("endOrdinal"))
                            if (!$util.isInteger(message.endOrdinal) && !(message.endOrdinal && $util.isInteger(message.endOrdinal.low) && $util.isInteger(message.endOrdinal.high)))
                                return "endOrdinal: integer|Long expected";
                        if (message.status != null && message.hasOwnProperty("status"))
                            switch (message.status) {
                            default:
                                return "status: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                break;
                            }
                        if (message.receipt != null && message.hasOwnProperty("receipt")) {
                            var error = $root.sf.apechain.type.v1.TransactionReceipt.verify(message.receipt);
                            if (error)
                                return "receipt." + error;
                        }
                        if (message.blobGas != null && message.hasOwnProperty("blobGas")) {
                            properties._blobGas = 1;
                            if (!$util.isInteger(message.blobGas) && !(message.blobGas && $util.isInteger(message.blobGas.low) && $util.isInteger(message.blobGas.high)))
                                return "blobGas: integer|Long expected";
                        }
                        if (message.blobGasFeeCap != null && message.hasOwnProperty("blobGasFeeCap")) {
                            properties._blobGasFeeCap = 1;
                            {
                                var error = $root.sf.apechain.type.v1.BigInt.verify(message.blobGasFeeCap);
                                if (error)
                                    return "blobGasFeeCap." + error;
                            }
                        }
                        if (message.blobHashes != null && message.hasOwnProperty("blobHashes")) {
                            if (!Array.isArray(message.blobHashes))
                                return "blobHashes: array expected";
                            for (var i = 0; i < message.blobHashes.length; ++i)
                                if (!(message.blobHashes[i] && typeof message.blobHashes[i].length === "number" || $util.isString(message.blobHashes[i])))
                                    return "blobHashes: buffer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a TransactionTrace message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.TransactionTrace} TransactionTrace
                     */
                    TransactionTrace.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.TransactionTrace)
                            return object;
                        var message = new $root.sf.apechain.type.v1.TransactionTrace();
                        if (object.to != null)
                            if (typeof object.to === "string")
                                $util.base64.decode(object.to, message.to = $util.newBuffer($util.base64.length(object.to)), 0);
                            else if (object.to.length >= 0)
                                message.to = object.to;
                        if (object.nonce != null)
                            if ($util.Long)
                                (message.nonce = $util.Long.fromValue(object.nonce)).unsigned = true;
                            else if (typeof object.nonce === "string")
                                message.nonce = parseInt(object.nonce, 10);
                            else if (typeof object.nonce === "number")
                                message.nonce = object.nonce;
                            else if (typeof object.nonce === "object")
                                message.nonce = new $util.LongBits(object.nonce.low >>> 0, object.nonce.high >>> 0).toNumber(true);
                        if (object.gasPrice != null) {
                            if (typeof object.gasPrice !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.gasPrice: object expected");
                            message.gasPrice = $root.sf.apechain.type.v1.BigInt.fromObject(object.gasPrice);
                        }
                        if (object.gasLimit != null)
                            if ($util.Long)
                                (message.gasLimit = $util.Long.fromValue(object.gasLimit)).unsigned = true;
                            else if (typeof object.gasLimit === "string")
                                message.gasLimit = parseInt(object.gasLimit, 10);
                            else if (typeof object.gasLimit === "number")
                                message.gasLimit = object.gasLimit;
                            else if (typeof object.gasLimit === "object")
                                message.gasLimit = new $util.LongBits(object.gasLimit.low >>> 0, object.gasLimit.high >>> 0).toNumber(true);
                        if (object.value != null) {
                            if (typeof object.value !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.value: object expected");
                            message.value = $root.sf.apechain.type.v1.BigInt.fromObject(object.value);
                        }
                        if (object.input != null)
                            if (typeof object.input === "string")
                                $util.base64.decode(object.input, message.input = $util.newBuffer($util.base64.length(object.input)), 0);
                            else if (object.input.length >= 0)
                                message.input = object.input;
                        if (object.v != null)
                            if (typeof object.v === "string")
                                $util.base64.decode(object.v, message.v = $util.newBuffer($util.base64.length(object.v)), 0);
                            else if (object.v.length >= 0)
                                message.v = object.v;
                        if (object.r != null)
                            if (typeof object.r === "string")
                                $util.base64.decode(object.r, message.r = $util.newBuffer($util.base64.length(object.r)), 0);
                            else if (object.r.length >= 0)
                                message.r = object.r;
                        if (object.s != null)
                            if (typeof object.s === "string")
                                $util.base64.decode(object.s, message.s = $util.newBuffer($util.base64.length(object.s)), 0);
                            else if (object.s.length >= 0)
                                message.s = object.s;
                        if (object.gasUsed != null)
                            if ($util.Long)
                                (message.gasUsed = $util.Long.fromValue(object.gasUsed)).unsigned = true;
                            else if (typeof object.gasUsed === "string")
                                message.gasUsed = parseInt(object.gasUsed, 10);
                            else if (typeof object.gasUsed === "number")
                                message.gasUsed = object.gasUsed;
                            else if (typeof object.gasUsed === "object")
                                message.gasUsed = new $util.LongBits(object.gasUsed.low >>> 0, object.gasUsed.high >>> 0).toNumber(true);
                        switch (object.type) {
                        default:
                            if (typeof object.type === "number") {
                                message.type = object.type;
                                break;
                            }
                            break;
                        case "TRX_TYPE_LEGACY":
                        case 0:
                            message.type = 0;
                            break;
                        case "TRX_TYPE_ACCESS_LIST":
                        case 1:
                            message.type = 1;
                            break;
                        case "TRX_TYPE_DYNAMIC_FEE":
                        case 2:
                            message.type = 2;
                            break;
                        case "TRX_TYPE_BLOB":
                        case 3:
                            message.type = 3;
                            break;
                        }
                        if (object.accessList) {
                            if (!Array.isArray(object.accessList))
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.accessList: array expected");
                            message.accessList = [];
                            for (var i = 0; i < object.accessList.length; ++i) {
                                if (typeof object.accessList[i] !== "object")
                                    throw TypeError(".sf.apechain.type.v1.TransactionTrace.accessList: object expected");
                                message.accessList[i] = $root.sf.apechain.type.v1.AccessTuple.fromObject(object.accessList[i]);
                            }
                        }
                        if (object.maxFeePerGas != null) {
                            if (typeof object.maxFeePerGas !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.maxFeePerGas: object expected");
                            message.maxFeePerGas = $root.sf.apechain.type.v1.BigInt.fromObject(object.maxFeePerGas);
                        }
                        if (object.maxPriorityFeePerGas != null) {
                            if (typeof object.maxPriorityFeePerGas !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.maxPriorityFeePerGas: object expected");
                            message.maxPriorityFeePerGas = $root.sf.apechain.type.v1.BigInt.fromObject(object.maxPriorityFeePerGas);
                        }
                        if (object.index != null)
                            message.index = object.index >>> 0;
                        if (object.hash != null)
                            if (typeof object.hash === "string")
                                $util.base64.decode(object.hash, message.hash = $util.newBuffer($util.base64.length(object.hash)), 0);
                            else if (object.hash.length >= 0)
                                message.hash = object.hash;
                        if (object.from != null)
                            if (typeof object.from === "string")
                                $util.base64.decode(object.from, message.from = $util.newBuffer($util.base64.length(object.from)), 0);
                            else if (object.from.length >= 0)
                                message.from = object.from;
                        if (object.beginOrdinal != null)
                            if ($util.Long)
                                (message.beginOrdinal = $util.Long.fromValue(object.beginOrdinal)).unsigned = true;
                            else if (typeof object.beginOrdinal === "string")
                                message.beginOrdinal = parseInt(object.beginOrdinal, 10);
                            else if (typeof object.beginOrdinal === "number")
                                message.beginOrdinal = object.beginOrdinal;
                            else if (typeof object.beginOrdinal === "object")
                                message.beginOrdinal = new $util.LongBits(object.beginOrdinal.low >>> 0, object.beginOrdinal.high >>> 0).toNumber(true);
                        if (object.endOrdinal != null)
                            if ($util.Long)
                                (message.endOrdinal = $util.Long.fromValue(object.endOrdinal)).unsigned = true;
                            else if (typeof object.endOrdinal === "string")
                                message.endOrdinal = parseInt(object.endOrdinal, 10);
                            else if (typeof object.endOrdinal === "number")
                                message.endOrdinal = object.endOrdinal;
                            else if (typeof object.endOrdinal === "object")
                                message.endOrdinal = new $util.LongBits(object.endOrdinal.low >>> 0, object.endOrdinal.high >>> 0).toNumber(true);
                        switch (object.status) {
                        default:
                            if (typeof object.status === "number") {
                                message.status = object.status;
                                break;
                            }
                            break;
                        case "UNKNOWN":
                        case 0:
                            message.status = 0;
                            break;
                        case "SUCCEEDED":
                        case 1:
                            message.status = 1;
                            break;
                        case "FAILED":
                        case 2:
                            message.status = 2;
                            break;
                        case "REVERTED":
                        case 3:
                            message.status = 3;
                            break;
                        }
                        if (object.receipt != null) {
                            if (typeof object.receipt !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.receipt: object expected");
                            message.receipt = $root.sf.apechain.type.v1.TransactionReceipt.fromObject(object.receipt);
                        }
                        if (object.blobGas != null)
                            if ($util.Long)
                                (message.blobGas = $util.Long.fromValue(object.blobGas)).unsigned = true;
                            else if (typeof object.blobGas === "string")
                                message.blobGas = parseInt(object.blobGas, 10);
                            else if (typeof object.blobGas === "number")
                                message.blobGas = object.blobGas;
                            else if (typeof object.blobGas === "object")
                                message.blobGas = new $util.LongBits(object.blobGas.low >>> 0, object.blobGas.high >>> 0).toNumber(true);
                        if (object.blobGasFeeCap != null) {
                            if (typeof object.blobGasFeeCap !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.blobGasFeeCap: object expected");
                            message.blobGasFeeCap = $root.sf.apechain.type.v1.BigInt.fromObject(object.blobGasFeeCap);
                        }
                        if (object.blobHashes) {
                            if (!Array.isArray(object.blobHashes))
                                throw TypeError(".sf.apechain.type.v1.TransactionTrace.blobHashes: array expected");
                            message.blobHashes = [];
                            for (var i = 0; i < object.blobHashes.length; ++i)
                                if (typeof object.blobHashes[i] === "string")
                                    $util.base64.decode(object.blobHashes[i], message.blobHashes[i] = $util.newBuffer($util.base64.length(object.blobHashes[i])), 0);
                                else if (object.blobHashes[i].length >= 0)
                                    message.blobHashes[i] = object.blobHashes[i];
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a TransactionTrace message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {sf.apechain.type.v1.TransactionTrace} message TransactionTrace
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TransactionTrace.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.accessList = [];
                            object.blobHashes = [];
                        }
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.to = "";
                            else {
                                object.to = [];
                                if (options.bytes !== Array)
                                    object.to = $util.newBuffer(object.to);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.nonce = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.nonce = options.longs === String ? "0" : 0;
                            object.gasPrice = null;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.gasLimit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.gasLimit = options.longs === String ? "0" : 0;
                            object.value = null;
                            if (options.bytes === String)
                                object.input = "";
                            else {
                                object.input = [];
                                if (options.bytes !== Array)
                                    object.input = $util.newBuffer(object.input);
                            }
                            if (options.bytes === String)
                                object.v = "";
                            else {
                                object.v = [];
                                if (options.bytes !== Array)
                                    object.v = $util.newBuffer(object.v);
                            }
                            if (options.bytes === String)
                                object.r = "";
                            else {
                                object.r = [];
                                if (options.bytes !== Array)
                                    object.r = $util.newBuffer(object.r);
                            }
                            if (options.bytes === String)
                                object.s = "";
                            else {
                                object.s = [];
                                if (options.bytes !== Array)
                                    object.s = $util.newBuffer(object.s);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.gasUsed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.gasUsed = options.longs === String ? "0" : 0;
                            object.maxFeePerGas = null;
                            object.type = options.enums === String ? "TRX_TYPE_LEGACY" : 0;
                            object.maxPriorityFeePerGas = null;
                            object.index = 0;
                            if (options.bytes === String)
                                object.hash = "";
                            else {
                                object.hash = [];
                                if (options.bytes !== Array)
                                    object.hash = $util.newBuffer(object.hash);
                            }
                            if (options.bytes === String)
                                object.from = "";
                            else {
                                object.from = [];
                                if (options.bytes !== Array)
                                    object.from = $util.newBuffer(object.from);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.beginOrdinal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.beginOrdinal = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.endOrdinal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.endOrdinal = options.longs === String ? "0" : 0;
                            object.status = options.enums === String ? "UNKNOWN" : 0;
                            object.receipt = null;
                        }
                        if (message.to != null && message.hasOwnProperty("to"))
                            object.to = options.bytes === String ? $util.base64.encode(message.to, 0, message.to.length) : options.bytes === Array ? Array.prototype.slice.call(message.to) : message.to;
                        if (message.nonce != null && message.hasOwnProperty("nonce"))
                            if (typeof message.nonce === "number")
                                object.nonce = options.longs === String ? String(message.nonce) : message.nonce;
                            else
                                object.nonce = options.longs === String ? $util.Long.prototype.toString.call(message.nonce) : options.longs === Number ? new $util.LongBits(message.nonce.low >>> 0, message.nonce.high >>> 0).toNumber(true) : message.nonce;
                        if (message.gasPrice != null && message.hasOwnProperty("gasPrice"))
                            object.gasPrice = $root.sf.apechain.type.v1.BigInt.toObject(message.gasPrice, options);
                        if (message.gasLimit != null && message.hasOwnProperty("gasLimit"))
                            if (typeof message.gasLimit === "number")
                                object.gasLimit = options.longs === String ? String(message.gasLimit) : message.gasLimit;
                            else
                                object.gasLimit = options.longs === String ? $util.Long.prototype.toString.call(message.gasLimit) : options.longs === Number ? new $util.LongBits(message.gasLimit.low >>> 0, message.gasLimit.high >>> 0).toNumber(true) : message.gasLimit;
                        if (message.value != null && message.hasOwnProperty("value"))
                            object.value = $root.sf.apechain.type.v1.BigInt.toObject(message.value, options);
                        if (message.input != null && message.hasOwnProperty("input"))
                            object.input = options.bytes === String ? $util.base64.encode(message.input, 0, message.input.length) : options.bytes === Array ? Array.prototype.slice.call(message.input) : message.input;
                        if (message.v != null && message.hasOwnProperty("v"))
                            object.v = options.bytes === String ? $util.base64.encode(message.v, 0, message.v.length) : options.bytes === Array ? Array.prototype.slice.call(message.v) : message.v;
                        if (message.r != null && message.hasOwnProperty("r"))
                            object.r = options.bytes === String ? $util.base64.encode(message.r, 0, message.r.length) : options.bytes === Array ? Array.prototype.slice.call(message.r) : message.r;
                        if (message.s != null && message.hasOwnProperty("s"))
                            object.s = options.bytes === String ? $util.base64.encode(message.s, 0, message.s.length) : options.bytes === Array ? Array.prototype.slice.call(message.s) : message.s;
                        if (message.gasUsed != null && message.hasOwnProperty("gasUsed"))
                            if (typeof message.gasUsed === "number")
                                object.gasUsed = options.longs === String ? String(message.gasUsed) : message.gasUsed;
                            else
                                object.gasUsed = options.longs === String ? $util.Long.prototype.toString.call(message.gasUsed) : options.longs === Number ? new $util.LongBits(message.gasUsed.low >>> 0, message.gasUsed.high >>> 0).toNumber(true) : message.gasUsed;
                        if (message.maxFeePerGas != null && message.hasOwnProperty("maxFeePerGas"))
                            object.maxFeePerGas = $root.sf.apechain.type.v1.BigInt.toObject(message.maxFeePerGas, options);
                        if (message.type != null && message.hasOwnProperty("type"))
                            object.type = options.enums === String ? $root.sf.apechain.type.v1.TransactionTrace.Type[message.type] === undefined ? message.type : $root.sf.apechain.type.v1.TransactionTrace.Type[message.type] : message.type;
                        if (message.maxPriorityFeePerGas != null && message.hasOwnProperty("maxPriorityFeePerGas"))
                            object.maxPriorityFeePerGas = $root.sf.apechain.type.v1.BigInt.toObject(message.maxPriorityFeePerGas, options);
                        if (message.accessList && message.accessList.length) {
                            object.accessList = [];
                            for (var j = 0; j < message.accessList.length; ++j)
                                object.accessList[j] = $root.sf.apechain.type.v1.AccessTuple.toObject(message.accessList[j], options);
                        }
                        if (message.index != null && message.hasOwnProperty("index"))
                            object.index = message.index;
                        if (message.hash != null && message.hasOwnProperty("hash"))
                            object.hash = options.bytes === String ? $util.base64.encode(message.hash, 0, message.hash.length) : options.bytes === Array ? Array.prototype.slice.call(message.hash) : message.hash;
                        if (message.from != null && message.hasOwnProperty("from"))
                            object.from = options.bytes === String ? $util.base64.encode(message.from, 0, message.from.length) : options.bytes === Array ? Array.prototype.slice.call(message.from) : message.from;
                        if (message.beginOrdinal != null && message.hasOwnProperty("beginOrdinal"))
                            if (typeof message.beginOrdinal === "number")
                                object.beginOrdinal = options.longs === String ? String(message.beginOrdinal) : message.beginOrdinal;
                            else
                                object.beginOrdinal = options.longs === String ? $util.Long.prototype.toString.call(message.beginOrdinal) : options.longs === Number ? new $util.LongBits(message.beginOrdinal.low >>> 0, message.beginOrdinal.high >>> 0).toNumber(true) : message.beginOrdinal;
                        if (message.endOrdinal != null && message.hasOwnProperty("endOrdinal"))
                            if (typeof message.endOrdinal === "number")
                                object.endOrdinal = options.longs === String ? String(message.endOrdinal) : message.endOrdinal;
                            else
                                object.endOrdinal = options.longs === String ? $util.Long.prototype.toString.call(message.endOrdinal) : options.longs === Number ? new $util.LongBits(message.endOrdinal.low >>> 0, message.endOrdinal.high >>> 0).toNumber(true) : message.endOrdinal;
                        if (message.status != null && message.hasOwnProperty("status"))
                            object.status = options.enums === String ? $root.sf.apechain.type.v1.TransactionTraceStatus[message.status] === undefined ? message.status : $root.sf.apechain.type.v1.TransactionTraceStatus[message.status] : message.status;
                        if (message.receipt != null && message.hasOwnProperty("receipt"))
                            object.receipt = $root.sf.apechain.type.v1.TransactionReceipt.toObject(message.receipt, options);
                        if (message.blobGas != null && message.hasOwnProperty("blobGas")) {
                            if (typeof message.blobGas === "number")
                                object.blobGas = options.longs === String ? String(message.blobGas) : message.blobGas;
                            else
                                object.blobGas = options.longs === String ? $util.Long.prototype.toString.call(message.blobGas) : options.longs === Number ? new $util.LongBits(message.blobGas.low >>> 0, message.blobGas.high >>> 0).toNumber(true) : message.blobGas;
                            if (options.oneofs)
                                object._blobGas = "blobGas";
                        }
                        if (message.blobGasFeeCap != null && message.hasOwnProperty("blobGasFeeCap")) {
                            object.blobGasFeeCap = $root.sf.apechain.type.v1.BigInt.toObject(message.blobGasFeeCap, options);
                            if (options.oneofs)
                                object._blobGasFeeCap = "blobGasFeeCap";
                        }
                        if (message.blobHashes && message.blobHashes.length) {
                            object.blobHashes = [];
                            for (var j = 0; j < message.blobHashes.length; ++j)
                                object.blobHashes[j] = options.bytes === String ? $util.base64.encode(message.blobHashes[j], 0, message.blobHashes[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.blobHashes[j]) : message.blobHashes[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this TransactionTrace to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TransactionTrace.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for TransactionTrace
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.TransactionTrace
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    TransactionTrace.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.TransactionTrace";
                    };

                    /**
                     * Type enum.
                     * @name sf.apechain.type.v1.TransactionTrace.Type
                     * @enum {number}
                     * @property {number} TRX_TYPE_LEGACY=0 TRX_TYPE_LEGACY value
                     * @property {number} TRX_TYPE_ACCESS_LIST=1 TRX_TYPE_ACCESS_LIST value
                     * @property {number} TRX_TYPE_DYNAMIC_FEE=2 TRX_TYPE_DYNAMIC_FEE value
                     * @property {number} TRX_TYPE_BLOB=3 TRX_TYPE_BLOB value
                     */
                    TransactionTrace.Type = (function() {
                        var valuesById = {}, values = Object.create(valuesById);
                        values[valuesById[0] = "TRX_TYPE_LEGACY"] = 0;
                        values[valuesById[1] = "TRX_TYPE_ACCESS_LIST"] = 1;
                        values[valuesById[2] = "TRX_TYPE_DYNAMIC_FEE"] = 2;
                        values[valuesById[3] = "TRX_TYPE_BLOB"] = 3;
                        return values;
                    })();

                    return TransactionTrace;
                })();

                v1.AccessTuple = (function() {

                    /**
                     * Properties of an AccessTuple.
                     * @memberof sf.apechain.type.v1
                     * @interface IAccessTuple
                     * @property {Uint8Array|null} [address] AccessTuple address
                     * @property {Array.<Uint8Array>|null} [storageKeys] AccessTuple storageKeys
                     */

                    /**
                     * Constructs a new AccessTuple.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents an AccessTuple.
                     * @implements IAccessTuple
                     * @constructor
                     * @param {sf.apechain.type.v1.IAccessTuple=} [properties] Properties to set
                     */
                    function AccessTuple(properties) {
                        this.storageKeys = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * AccessTuple address.
                     * @member {Uint8Array} address
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @instance
                     */
                    AccessTuple.prototype.address = $util.newBuffer([]);

                    /**
                     * AccessTuple storageKeys.
                     * @member {Array.<Uint8Array>} storageKeys
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @instance
                     */
                    AccessTuple.prototype.storageKeys = $util.emptyArray;

                    /**
                     * Creates a new AccessTuple instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {sf.apechain.type.v1.IAccessTuple=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.AccessTuple} AccessTuple instance
                     */
                    AccessTuple.create = function create(properties) {
                        return new AccessTuple(properties);
                    };

                    /**
                     * Encodes the specified AccessTuple message. Does not implicitly {@link sf.apechain.type.v1.AccessTuple.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {sf.apechain.type.v1.IAccessTuple} message AccessTuple message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccessTuple.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                        if (message.storageKeys != null && message.storageKeys.length)
                            for (var i = 0; i < message.storageKeys.length; ++i)
                                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.storageKeys[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified AccessTuple message, length delimited. Does not implicitly {@link sf.apechain.type.v1.AccessTuple.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {sf.apechain.type.v1.IAccessTuple} message AccessTuple message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AccessTuple.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an AccessTuple message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.AccessTuple} AccessTuple
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccessTuple.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.AccessTuple();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.address = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    if (!(message.storageKeys && message.storageKeys.length))
                                        message.storageKeys = [];
                                    message.storageKeys.push(reader.bytes());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an AccessTuple message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.AccessTuple} AccessTuple
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AccessTuple.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AccessTuple message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AccessTuple.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.address != null && message.hasOwnProperty("address"))
                            if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                                return "address: buffer expected";
                        if (message.storageKeys != null && message.hasOwnProperty("storageKeys")) {
                            if (!Array.isArray(message.storageKeys))
                                return "storageKeys: array expected";
                            for (var i = 0; i < message.storageKeys.length; ++i)
                                if (!(message.storageKeys[i] && typeof message.storageKeys[i].length === "number" || $util.isString(message.storageKeys[i])))
                                    return "storageKeys: buffer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates an AccessTuple message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.AccessTuple} AccessTuple
                     */
                    AccessTuple.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.AccessTuple)
                            return object;
                        var message = new $root.sf.apechain.type.v1.AccessTuple();
                        if (object.address != null)
                            if (typeof object.address === "string")
                                $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                            else if (object.address.length >= 0)
                                message.address = object.address;
                        if (object.storageKeys) {
                            if (!Array.isArray(object.storageKeys))
                                throw TypeError(".sf.apechain.type.v1.AccessTuple.storageKeys: array expected");
                            message.storageKeys = [];
                            for (var i = 0; i < object.storageKeys.length; ++i)
                                if (typeof object.storageKeys[i] === "string")
                                    $util.base64.decode(object.storageKeys[i], message.storageKeys[i] = $util.newBuffer($util.base64.length(object.storageKeys[i])), 0);
                                else if (object.storageKeys[i].length >= 0)
                                    message.storageKeys[i] = object.storageKeys[i];
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an AccessTuple message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {sf.apechain.type.v1.AccessTuple} message AccessTuple
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AccessTuple.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.storageKeys = [];
                        if (options.defaults)
                            if (options.bytes === String)
                                object.address = "";
                            else {
                                object.address = [];
                                if (options.bytes !== Array)
                                    object.address = $util.newBuffer(object.address);
                            }
                        if (message.address != null && message.hasOwnProperty("address"))
                            object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                        if (message.storageKeys && message.storageKeys.length) {
                            object.storageKeys = [];
                            for (var j = 0; j < message.storageKeys.length; ++j)
                                object.storageKeys[j] = options.bytes === String ? $util.base64.encode(message.storageKeys[j], 0, message.storageKeys[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.storageKeys[j]) : message.storageKeys[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this AccessTuple to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AccessTuple.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for AccessTuple
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.AccessTuple
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    AccessTuple.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.AccessTuple";
                    };

                    return AccessTuple;
                })();

                /**
                 * TransactionTraceStatus enum.
                 * @name sf.apechain.type.v1.TransactionTraceStatus
                 * @enum {number}
                 * @property {number} UNKNOWN=0 UNKNOWN value
                 * @property {number} SUCCEEDED=1 SUCCEEDED value
                 * @property {number} FAILED=2 FAILED value
                 * @property {number} REVERTED=3 REVERTED value
                 */
                v1.TransactionTraceStatus = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "UNKNOWN"] = 0;
                    values[valuesById[1] = "SUCCEEDED"] = 1;
                    values[valuesById[2] = "FAILED"] = 2;
                    values[valuesById[3] = "REVERTED"] = 3;
                    return values;
                })();

                v1.TransactionReceipt = (function() {

                    /**
                     * Properties of a TransactionReceipt.
                     * @memberof sf.apechain.type.v1
                     * @interface ITransactionReceipt
                     * @property {Uint8Array|null} [stateRoot] TransactionReceipt stateRoot
                     * @property {number|Long|null} [cumulativeGasUsed] TransactionReceipt cumulativeGasUsed
                     * @property {Uint8Array|null} [logsBloom] TransactionReceipt logsBloom
                     * @property {Array.<sf.apechain.type.v1.ILog>|null} [logs] TransactionReceipt logs
                     * @property {number|Long|null} [blobGasUsed] TransactionReceipt blobGasUsed
                     * @property {sf.apechain.type.v1.IBigInt|null} [blobGasPrice] TransactionReceipt blobGasPrice
                     * @property {Uint8Array|null} [contractAddress] TransactionReceipt contractAddress
                     */

                    /**
                     * Constructs a new TransactionReceipt.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a TransactionReceipt.
                     * @implements ITransactionReceipt
                     * @constructor
                     * @param {sf.apechain.type.v1.ITransactionReceipt=} [properties] Properties to set
                     */
                    function TransactionReceipt(properties) {
                        this.logs = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TransactionReceipt stateRoot.
                     * @member {Uint8Array} stateRoot
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.stateRoot = $util.newBuffer([]);

                    /**
                     * TransactionReceipt cumulativeGasUsed.
                     * @member {number|Long} cumulativeGasUsed
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.cumulativeGasUsed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TransactionReceipt logsBloom.
                     * @member {Uint8Array} logsBloom
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.logsBloom = $util.newBuffer([]);

                    /**
                     * TransactionReceipt logs.
                     * @member {Array.<sf.apechain.type.v1.ILog>} logs
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.logs = $util.emptyArray;

                    /**
                     * TransactionReceipt blobGasUsed.
                     * @member {number|Long|null|undefined} blobGasUsed
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.blobGasUsed = null;

                    /**
                     * TransactionReceipt blobGasPrice.
                     * @member {sf.apechain.type.v1.IBigInt|null|undefined} blobGasPrice
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.blobGasPrice = null;

                    /**
                     * TransactionReceipt contractAddress.
                     * @member {Uint8Array} contractAddress
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    TransactionReceipt.prototype.contractAddress = $util.newBuffer([]);

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * TransactionReceipt _blobGasUsed.
                     * @member {"blobGasUsed"|undefined} _blobGasUsed
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    Object.defineProperty(TransactionReceipt.prototype, "_blobGasUsed", {
                        get: $util.oneOfGetter($oneOfFields = ["blobGasUsed"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * TransactionReceipt _blobGasPrice.
                     * @member {"blobGasPrice"|undefined} _blobGasPrice
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     */
                    Object.defineProperty(TransactionReceipt.prototype, "_blobGasPrice", {
                        get: $util.oneOfGetter($oneOfFields = ["blobGasPrice"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new TransactionReceipt instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionReceipt=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.TransactionReceipt} TransactionReceipt instance
                     */
                    TransactionReceipt.create = function create(properties) {
                        return new TransactionReceipt(properties);
                    };

                    /**
                     * Encodes the specified TransactionReceipt message. Does not implicitly {@link sf.apechain.type.v1.TransactionReceipt.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionReceipt} message TransactionReceipt message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TransactionReceipt.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.stateRoot != null && Object.hasOwnProperty.call(message, "stateRoot"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.stateRoot);
                        if (message.cumulativeGasUsed != null && Object.hasOwnProperty.call(message, "cumulativeGasUsed"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.cumulativeGasUsed);
                        if (message.logsBloom != null && Object.hasOwnProperty.call(message, "logsBloom"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.logsBloom);
                        if (message.logs != null && message.logs.length)
                            for (var i = 0; i < message.logs.length; ++i)
                                $root.sf.apechain.type.v1.Log.encode(message.logs[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.blobGasUsed != null && Object.hasOwnProperty.call(message, "blobGasUsed"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.blobGasUsed);
                        if (message.blobGasPrice != null && Object.hasOwnProperty.call(message, "blobGasPrice"))
                            $root.sf.apechain.type.v1.BigInt.encode(message.blobGasPrice, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.contractAddress != null && Object.hasOwnProperty.call(message, "contractAddress"))
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.contractAddress);
                        return writer;
                    };

                    /**
                     * Encodes the specified TransactionReceipt message, length delimited. Does not implicitly {@link sf.apechain.type.v1.TransactionReceipt.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {sf.apechain.type.v1.ITransactionReceipt} message TransactionReceipt message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TransactionReceipt.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TransactionReceipt message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.TransactionReceipt} TransactionReceipt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TransactionReceipt.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.TransactionReceipt();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.stateRoot = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    message.cumulativeGasUsed = reader.uint64();
                                    break;
                                }
                            case 3: {
                                    message.logsBloom = reader.bytes();
                                    break;
                                }
                            case 4: {
                                    if (!(message.logs && message.logs.length))
                                        message.logs = [];
                                    message.logs.push($root.sf.apechain.type.v1.Log.decode(reader, reader.uint32()));
                                    break;
                                }
                            case 5: {
                                    message.blobGasUsed = reader.uint64();
                                    break;
                                }
                            case 6: {
                                    message.blobGasPrice = $root.sf.apechain.type.v1.BigInt.decode(reader, reader.uint32());
                                    break;
                                }
                            case 7: {
                                    message.contractAddress = reader.bytes();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TransactionReceipt message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.TransactionReceipt} TransactionReceipt
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TransactionReceipt.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TransactionReceipt message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TransactionReceipt.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.stateRoot != null && message.hasOwnProperty("stateRoot"))
                            if (!(message.stateRoot && typeof message.stateRoot.length === "number" || $util.isString(message.stateRoot)))
                                return "stateRoot: buffer expected";
                        if (message.cumulativeGasUsed != null && message.hasOwnProperty("cumulativeGasUsed"))
                            if (!$util.isInteger(message.cumulativeGasUsed) && !(message.cumulativeGasUsed && $util.isInteger(message.cumulativeGasUsed.low) && $util.isInteger(message.cumulativeGasUsed.high)))
                                return "cumulativeGasUsed: integer|Long expected";
                        if (message.logsBloom != null && message.hasOwnProperty("logsBloom"))
                            if (!(message.logsBloom && typeof message.logsBloom.length === "number" || $util.isString(message.logsBloom)))
                                return "logsBloom: buffer expected";
                        if (message.logs != null && message.hasOwnProperty("logs")) {
                            if (!Array.isArray(message.logs))
                                return "logs: array expected";
                            for (var i = 0; i < message.logs.length; ++i) {
                                var error = $root.sf.apechain.type.v1.Log.verify(message.logs[i]);
                                if (error)
                                    return "logs." + error;
                            }
                        }
                        if (message.blobGasUsed != null && message.hasOwnProperty("blobGasUsed")) {
                            properties._blobGasUsed = 1;
                            if (!$util.isInteger(message.blobGasUsed) && !(message.blobGasUsed && $util.isInteger(message.blobGasUsed.low) && $util.isInteger(message.blobGasUsed.high)))
                                return "blobGasUsed: integer|Long expected";
                        }
                        if (message.blobGasPrice != null && message.hasOwnProperty("blobGasPrice")) {
                            properties._blobGasPrice = 1;
                            {
                                var error = $root.sf.apechain.type.v1.BigInt.verify(message.blobGasPrice);
                                if (error)
                                    return "blobGasPrice." + error;
                            }
                        }
                        if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                            if (!(message.contractAddress && typeof message.contractAddress.length === "number" || $util.isString(message.contractAddress)))
                                return "contractAddress: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a TransactionReceipt message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.TransactionReceipt} TransactionReceipt
                     */
                    TransactionReceipt.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.TransactionReceipt)
                            return object;
                        var message = new $root.sf.apechain.type.v1.TransactionReceipt();
                        if (object.stateRoot != null)
                            if (typeof object.stateRoot === "string")
                                $util.base64.decode(object.stateRoot, message.stateRoot = $util.newBuffer($util.base64.length(object.stateRoot)), 0);
                            else if (object.stateRoot.length >= 0)
                                message.stateRoot = object.stateRoot;
                        if (object.cumulativeGasUsed != null)
                            if ($util.Long)
                                (message.cumulativeGasUsed = $util.Long.fromValue(object.cumulativeGasUsed)).unsigned = true;
                            else if (typeof object.cumulativeGasUsed === "string")
                                message.cumulativeGasUsed = parseInt(object.cumulativeGasUsed, 10);
                            else if (typeof object.cumulativeGasUsed === "number")
                                message.cumulativeGasUsed = object.cumulativeGasUsed;
                            else if (typeof object.cumulativeGasUsed === "object")
                                message.cumulativeGasUsed = new $util.LongBits(object.cumulativeGasUsed.low >>> 0, object.cumulativeGasUsed.high >>> 0).toNumber(true);
                        if (object.logsBloom != null)
                            if (typeof object.logsBloom === "string")
                                $util.base64.decode(object.logsBloom, message.logsBloom = $util.newBuffer($util.base64.length(object.logsBloom)), 0);
                            else if (object.logsBloom.length >= 0)
                                message.logsBloom = object.logsBloom;
                        if (object.logs) {
                            if (!Array.isArray(object.logs))
                                throw TypeError(".sf.apechain.type.v1.TransactionReceipt.logs: array expected");
                            message.logs = [];
                            for (var i = 0; i < object.logs.length; ++i) {
                                if (typeof object.logs[i] !== "object")
                                    throw TypeError(".sf.apechain.type.v1.TransactionReceipt.logs: object expected");
                                message.logs[i] = $root.sf.apechain.type.v1.Log.fromObject(object.logs[i]);
                            }
                        }
                        if (object.blobGasUsed != null)
                            if ($util.Long)
                                (message.blobGasUsed = $util.Long.fromValue(object.blobGasUsed)).unsigned = true;
                            else if (typeof object.blobGasUsed === "string")
                                message.blobGasUsed = parseInt(object.blobGasUsed, 10);
                            else if (typeof object.blobGasUsed === "number")
                                message.blobGasUsed = object.blobGasUsed;
                            else if (typeof object.blobGasUsed === "object")
                                message.blobGasUsed = new $util.LongBits(object.blobGasUsed.low >>> 0, object.blobGasUsed.high >>> 0).toNumber(true);
                        if (object.blobGasPrice != null) {
                            if (typeof object.blobGasPrice !== "object")
                                throw TypeError(".sf.apechain.type.v1.TransactionReceipt.blobGasPrice: object expected");
                            message.blobGasPrice = $root.sf.apechain.type.v1.BigInt.fromObject(object.blobGasPrice);
                        }
                        if (object.contractAddress != null)
                            if (typeof object.contractAddress === "string")
                                $util.base64.decode(object.contractAddress, message.contractAddress = $util.newBuffer($util.base64.length(object.contractAddress)), 0);
                            else if (object.contractAddress.length >= 0)
                                message.contractAddress = object.contractAddress;
                        return message;
                    };

                    /**
                     * Creates a plain object from a TransactionReceipt message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {sf.apechain.type.v1.TransactionReceipt} message TransactionReceipt
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TransactionReceipt.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.logs = [];
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.stateRoot = "";
                            else {
                                object.stateRoot = [];
                                if (options.bytes !== Array)
                                    object.stateRoot = $util.newBuffer(object.stateRoot);
                            }
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.cumulativeGasUsed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.cumulativeGasUsed = options.longs === String ? "0" : 0;
                            if (options.bytes === String)
                                object.logsBloom = "";
                            else {
                                object.logsBloom = [];
                                if (options.bytes !== Array)
                                    object.logsBloom = $util.newBuffer(object.logsBloom);
                            }
                            if (options.bytes === String)
                                object.contractAddress = "";
                            else {
                                object.contractAddress = [];
                                if (options.bytes !== Array)
                                    object.contractAddress = $util.newBuffer(object.contractAddress);
                            }
                        }
                        if (message.stateRoot != null && message.hasOwnProperty("stateRoot"))
                            object.stateRoot = options.bytes === String ? $util.base64.encode(message.stateRoot, 0, message.stateRoot.length) : options.bytes === Array ? Array.prototype.slice.call(message.stateRoot) : message.stateRoot;
                        if (message.cumulativeGasUsed != null && message.hasOwnProperty("cumulativeGasUsed"))
                            if (typeof message.cumulativeGasUsed === "number")
                                object.cumulativeGasUsed = options.longs === String ? String(message.cumulativeGasUsed) : message.cumulativeGasUsed;
                            else
                                object.cumulativeGasUsed = options.longs === String ? $util.Long.prototype.toString.call(message.cumulativeGasUsed) : options.longs === Number ? new $util.LongBits(message.cumulativeGasUsed.low >>> 0, message.cumulativeGasUsed.high >>> 0).toNumber(true) : message.cumulativeGasUsed;
                        if (message.logsBloom != null && message.hasOwnProperty("logsBloom"))
                            object.logsBloom = options.bytes === String ? $util.base64.encode(message.logsBloom, 0, message.logsBloom.length) : options.bytes === Array ? Array.prototype.slice.call(message.logsBloom) : message.logsBloom;
                        if (message.logs && message.logs.length) {
                            object.logs = [];
                            for (var j = 0; j < message.logs.length; ++j)
                                object.logs[j] = $root.sf.apechain.type.v1.Log.toObject(message.logs[j], options);
                        }
                        if (message.blobGasUsed != null && message.hasOwnProperty("blobGasUsed")) {
                            if (typeof message.blobGasUsed === "number")
                                object.blobGasUsed = options.longs === String ? String(message.blobGasUsed) : message.blobGasUsed;
                            else
                                object.blobGasUsed = options.longs === String ? $util.Long.prototype.toString.call(message.blobGasUsed) : options.longs === Number ? new $util.LongBits(message.blobGasUsed.low >>> 0, message.blobGasUsed.high >>> 0).toNumber(true) : message.blobGasUsed;
                            if (options.oneofs)
                                object._blobGasUsed = "blobGasUsed";
                        }
                        if (message.blobGasPrice != null && message.hasOwnProperty("blobGasPrice")) {
                            object.blobGasPrice = $root.sf.apechain.type.v1.BigInt.toObject(message.blobGasPrice, options);
                            if (options.oneofs)
                                object._blobGasPrice = "blobGasPrice";
                        }
                        if (message.contractAddress != null && message.hasOwnProperty("contractAddress"))
                            object.contractAddress = options.bytes === String ? $util.base64.encode(message.contractAddress, 0, message.contractAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.contractAddress) : message.contractAddress;
                        return object;
                    };

                    /**
                     * Converts this TransactionReceipt to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TransactionReceipt.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for TransactionReceipt
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.TransactionReceipt
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    TransactionReceipt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.TransactionReceipt";
                    };

                    return TransactionReceipt;
                })();

                v1.Log = (function() {

                    /**
                     * Properties of a Log.
                     * @memberof sf.apechain.type.v1
                     * @interface ILog
                     * @property {Uint8Array|null} [address] Log address
                     * @property {Array.<Uint8Array>|null} [topics] Log topics
                     * @property {Uint8Array|null} [data] Log data
                     * @property {number|null} [index] Log index
                     * @property {number|null} [blockIndex] Log blockIndex
                     * @property {number|Long|null} [ordinal] Log ordinal
                     */

                    /**
                     * Constructs a new Log.
                     * @memberof sf.apechain.type.v1
                     * @classdesc Represents a Log.
                     * @implements ILog
                     * @constructor
                     * @param {sf.apechain.type.v1.ILog=} [properties] Properties to set
                     */
                    function Log(properties) {
                        this.topics = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Log address.
                     * @member {Uint8Array} address
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.address = $util.newBuffer([]);

                    /**
                     * Log topics.
                     * @member {Array.<Uint8Array>} topics
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.topics = $util.emptyArray;

                    /**
                     * Log data.
                     * @member {Uint8Array} data
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.data = $util.newBuffer([]);

                    /**
                     * Log index.
                     * @member {number} index
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.index = 0;

                    /**
                     * Log blockIndex.
                     * @member {number} blockIndex
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.blockIndex = 0;

                    /**
                     * Log ordinal.
                     * @member {number|Long} ordinal
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     */
                    Log.prototype.ordinal = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Creates a new Log instance using the specified properties.
                     * @function create
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {sf.apechain.type.v1.ILog=} [properties] Properties to set
                     * @returns {sf.apechain.type.v1.Log} Log instance
                     */
                    Log.create = function create(properties) {
                        return new Log(properties);
                    };

                    /**
                     * Encodes the specified Log message. Does not implicitly {@link sf.apechain.type.v1.Log.verify|verify} messages.
                     * @function encode
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {sf.apechain.type.v1.ILog} message Log message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Log.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.address);
                        if (message.topics != null && message.topics.length)
                            for (var i = 0; i < message.topics.length; ++i)
                                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.topics[i]);
                        if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
                        if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.index);
                        if (message.blockIndex != null && Object.hasOwnProperty.call(message, "blockIndex"))
                            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.blockIndex);
                        if (message.ordinal != null && Object.hasOwnProperty.call(message, "ordinal"))
                            writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.ordinal);
                        return writer;
                    };

                    /**
                     * Encodes the specified Log message, length delimited. Does not implicitly {@link sf.apechain.type.v1.Log.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {sf.apechain.type.v1.ILog} message Log message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Log.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Log message from the specified reader or buffer.
                     * @function decode
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {sf.apechain.type.v1.Log} Log
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Log.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sf.apechain.type.v1.Log();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.address = reader.bytes();
                                    break;
                                }
                            case 2: {
                                    if (!(message.topics && message.topics.length))
                                        message.topics = [];
                                    message.topics.push(reader.bytes());
                                    break;
                                }
                            case 3: {
                                    message.data = reader.bytes();
                                    break;
                                }
                            case 4: {
                                    message.index = reader.uint32();
                                    break;
                                }
                            case 6: {
                                    message.blockIndex = reader.uint32();
                                    break;
                                }
                            case 7: {
                                    message.ordinal = reader.uint64();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Log message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {sf.apechain.type.v1.Log} Log
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Log.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Log message.
                     * @function verify
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Log.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.address != null && message.hasOwnProperty("address"))
                            if (!(message.address && typeof message.address.length === "number" || $util.isString(message.address)))
                                return "address: buffer expected";
                        if (message.topics != null && message.hasOwnProperty("topics")) {
                            if (!Array.isArray(message.topics))
                                return "topics: array expected";
                            for (var i = 0; i < message.topics.length; ++i)
                                if (!(message.topics[i] && typeof message.topics[i].length === "number" || $util.isString(message.topics[i])))
                                    return "topics: buffer[] expected";
                        }
                        if (message.data != null && message.hasOwnProperty("data"))
                            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                                return "data: buffer expected";
                        if (message.index != null && message.hasOwnProperty("index"))
                            if (!$util.isInteger(message.index))
                                return "index: integer expected";
                        if (message.blockIndex != null && message.hasOwnProperty("blockIndex"))
                            if (!$util.isInteger(message.blockIndex))
                                return "blockIndex: integer expected";
                        if (message.ordinal != null && message.hasOwnProperty("ordinal"))
                            if (!$util.isInteger(message.ordinal) && !(message.ordinal && $util.isInteger(message.ordinal.low) && $util.isInteger(message.ordinal.high)))
                                return "ordinal: integer|Long expected";
                        return null;
                    };

                    /**
                     * Creates a Log message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {sf.apechain.type.v1.Log} Log
                     */
                    Log.fromObject = function fromObject(object) {
                        if (object instanceof $root.sf.apechain.type.v1.Log)
                            return object;
                        var message = new $root.sf.apechain.type.v1.Log();
                        if (object.address != null)
                            if (typeof object.address === "string")
                                $util.base64.decode(object.address, message.address = $util.newBuffer($util.base64.length(object.address)), 0);
                            else if (object.address.length >= 0)
                                message.address = object.address;
                        if (object.topics) {
                            if (!Array.isArray(object.topics))
                                throw TypeError(".sf.apechain.type.v1.Log.topics: array expected");
                            message.topics = [];
                            for (var i = 0; i < object.topics.length; ++i)
                                if (typeof object.topics[i] === "string")
                                    $util.base64.decode(object.topics[i], message.topics[i] = $util.newBuffer($util.base64.length(object.topics[i])), 0);
                                else if (object.topics[i].length >= 0)
                                    message.topics[i] = object.topics[i];
                        }
                        if (object.data != null)
                            if (typeof object.data === "string")
                                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                            else if (object.data.length >= 0)
                                message.data = object.data;
                        if (object.index != null)
                            message.index = object.index >>> 0;
                        if (object.blockIndex != null)
                            message.blockIndex = object.blockIndex >>> 0;
                        if (object.ordinal != null)
                            if ($util.Long)
                                (message.ordinal = $util.Long.fromValue(object.ordinal)).unsigned = true;
                            else if (typeof object.ordinal === "string")
                                message.ordinal = parseInt(object.ordinal, 10);
                            else if (typeof object.ordinal === "number")
                                message.ordinal = object.ordinal;
                            else if (typeof object.ordinal === "object")
                                message.ordinal = new $util.LongBits(object.ordinal.low >>> 0, object.ordinal.high >>> 0).toNumber(true);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Log message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {sf.apechain.type.v1.Log} message Log
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Log.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.topics = [];
                        if (options.defaults) {
                            if (options.bytes === String)
                                object.address = "";
                            else {
                                object.address = [];
                                if (options.bytes !== Array)
                                    object.address = $util.newBuffer(object.address);
                            }
                            if (options.bytes === String)
                                object.data = "";
                            else {
                                object.data = [];
                                if (options.bytes !== Array)
                                    object.data = $util.newBuffer(object.data);
                            }
                            object.index = 0;
                            object.blockIndex = 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.ordinal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.ordinal = options.longs === String ? "0" : 0;
                        }
                        if (message.address != null && message.hasOwnProperty("address"))
                            object.address = options.bytes === String ? $util.base64.encode(message.address, 0, message.address.length) : options.bytes === Array ? Array.prototype.slice.call(message.address) : message.address;
                        if (message.topics && message.topics.length) {
                            object.topics = [];
                            for (var j = 0; j < message.topics.length; ++j)
                                object.topics[j] = options.bytes === String ? $util.base64.encode(message.topics[j], 0, message.topics[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.topics[j]) : message.topics[j];
                        }
                        if (message.data != null && message.hasOwnProperty("data"))
                            object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                        if (message.index != null && message.hasOwnProperty("index"))
                            object.index = message.index;
                        if (message.blockIndex != null && message.hasOwnProperty("blockIndex"))
                            object.blockIndex = message.blockIndex;
                        if (message.ordinal != null && message.hasOwnProperty("ordinal"))
                            if (typeof message.ordinal === "number")
                                object.ordinal = options.longs === String ? String(message.ordinal) : message.ordinal;
                            else
                                object.ordinal = options.longs === String ? $util.Long.prototype.toString.call(message.ordinal) : options.longs === Number ? new $util.LongBits(message.ordinal.low >>> 0, message.ordinal.high >>> 0).toNumber(true) : message.ordinal;
                        return object;
                    };

                    /**
                     * Converts this Log to JSON.
                     * @function toJSON
                     * @memberof sf.apechain.type.v1.Log
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Log.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Log
                     * @function getTypeUrl
                     * @memberof sf.apechain.type.v1.Log
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Log.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/sf.apechain.type.v1.Log";
                    };

                    return Log;
                })();

                return v1;
            })();

            return type;
        })();

        return apechain;
    })();

    return sf;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
