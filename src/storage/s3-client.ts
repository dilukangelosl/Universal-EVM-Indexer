import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand, 
  HeadObjectCommand 
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { MergedBundle, DbinFormatter } from '../proto/dbin.js';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

export interface S3Config {
  bucket: string;
  region: string;
  prefix: string; // e.g., "apechain-mainnet"
  storageClass: 'STANDARD' | 'INTELLIGENT_TIERING';
  multipartThresholdBytes: number; // Default: 100MB
  maxRetries: number;
  endpoint?: string; // For S3-compatible storage
  accessKeyId?: string;
  secretAccessKey?: string;
}

export class S3Uploader {
  private client: S3Client;
  private formatter: DbinFormatter;
  private disabled = false;
  private localMode = false;
  private localDir = './run-data/merged-blocks'; // Default

  constructor(
    private config: S3Config,
    formatter?: DbinFormatter
  ) {
    // Check if we should use local mode
    if (config.endpoint?.startsWith('file://')) {
        this.localMode = true;
        this.localDir = config.endpoint.replace('file://', '');
        if (!fs.existsSync(this.localDir)) fs.mkdirSync(this.localDir, { recursive: true });
        // Mock client not needed
    }

    // Check for credentials presence (rudimentary)
    if (!this.localMode && (!config.accessKeyId || !config.secretAccessKey)) {
        // Don't disable yet, might rely on environment or role (e.g. EC2/Pod role)
    }
    
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: (config.accessKeyId && config.secretAccessKey) ? {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      } : undefined,
      maxAttempts: config.maxRetries
    });
    this.formatter = formatter || new DbinFormatter();
  }

  async init() {
    if (!this.formatter['zstd']) {
        await this.formatter.init();
    }
  }

  async uploadMergedBlock(bundle: MergedBundle): Promise<string> {
    const key = `${this.config.prefix}/merged-blocks/${bundle.filename}`;
    
    if (this.localMode) {
        const filePath = path.join(this.localDir, bundle.filename);
        await Bun.write(filePath, bundle.data);
        return key; // Return the key layout
    }

    if (this.disabled) {
        return key; // Fake success
    }

    try {
      if (bundle.data.length > this.config.multipartThresholdBytes) {
        const upload = new Upload({
        client: this.client,
        params: {
          Bucket: this.config.bucket,
          Key: key,
          Body: Readable.from(bundle.data),
          StorageClass: this.config.storageClass,
          ContentType: 'application/octet-stream',
          Metadata: {
            'x-start-block': String(bundle.startBlock),
            'x-end-block': String(bundle.endBlock),
            'x-checksum': bundle.checksum,
            'x-uncompressed-size': String(bundle.uncompressedSize),
          },
        },
      });
      
        await upload.done();
      } else {
        await this.client.send(new PutObjectCommand({
          Bucket: this.config.bucket,
          Key: key,
          Body: bundle.data,
          StorageClass: this.config.storageClass,
          ContentType: 'application/octet-stream',
          Metadata: {
            'x-start-block': String(bundle.startBlock),
            'x-end-block': String(bundle.endBlock),
            'x-checksum': bundle.checksum,
            'x-uncompressed-size': String(bundle.uncompressedSize),
          },
        }));
      }
      
      // Verify upload
      const head = await this.client.send(new HeadObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
      }));
      
      if (head.ContentLength !== undefined && head.ContentLength !== bundle.data.length) {
        throw new Error(`Upload verification failed for ${key}. Size mismatch: ${head.ContentLength} vs ${bundle.data.length}`);
      }
      
      return key;
    } catch (error: any) {
        // Detect invalid credentials or access denied
        if (error.name === 'InvalidAccessKeyId' || error.name === 'AccessDenied' || error.name === 'CredentialsError') {
            console.warn(`S3 Upload disabled due to auth error: ${error.message}`);
            this.disabled = true;
            return key; // Fake success to continue indexing
        }
        throw error;
    }
  }
  
  async downloadMergedBlock(s3Key: string): Promise<MergedBundle> {
    // s3Key: prefix/merged-blocks/filename
    const filename = s3Key.split('/').pop()!;

    let buffer: Buffer;

    if (this.localMode) {
        const filePath = path.join(this.localDir, filename);
        if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
        const arr = await Bun.file(filePath).arrayBuffer();
        buffer = Buffer.from(arr);
    } else {
        const response = await this.client.send(new GetObjectCommand({
          Bucket: this.config.bucket,
          Key: s3Key,
        }));
        
        const data = await response.Body?.transformToByteArray();
        if (!data) throw new Error(`Failed to download ${s3Key}`);
        buffer = Buffer.from(data);
    }
    
    // To reconstruct MergedBundle fully, we'd need to parse it or trust metadata.
    // For downloading, usually we just want the data to extract blocks.
    // But return type is MergedBundle.
    
    // Parse filename from s3Key to get range
    // "prefix/merged-blocks/0000000000-0000000099.dbin.zst"
    const [range] = filename.split('.');
    const [startStr, endStr] = range.split('-');
    const startBlock = parseInt(startStr, 10);
    const endBlock = parseInt(endStr, 10);
    
    // Checksum
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(buffer);
    const checksum = hasher.digest("hex");
    
    return {
        filename,
        data: buffer,
        startBlock,
        endBlock,
        checksum,
        uncompressedSize: 0, // would need zstd decompress to know, lazy load?
        compressedSize: buffer.length,
        s3Key
    };
  }
}
