import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Config } from './s3-client.js';
import { Logger } from 'pino';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export class StateBackupService {
  private client: S3Client;
  private bucket: string;
  private key: string;
  private region: string;

  constructor(config: S3Config, private logger: Logger) {
    this.bucket = config.bucket;
    this.region = config.region;
    this.key = `${config.prefix}/state/snapshot.tar.gz`;
    
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: (config.accessKeyId && config.secretAccessKey) ? {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      } : undefined,
      maxAttempts: config.maxRetries
    });
  }

  async hasBackup(): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: this.key
      }));
      return true;
    } catch (e: any) {
      if (e.name === 'NotFound') return false;
      // Determine if we have access issues (assume false or log)
      return false; 
    }
  }

  async restore(dbPath: string): Promise<boolean> {
    if (!await this.hasBackup()) {
        this.logger.info('No remote state backup found. Starting fresh.');
        return false;
    }

    this.logger.info(`Restoring state from s3://${this.bucket}/${this.key}...`);
    
    try {
        // Download to temp file
        const response = await this.client.send(new GetObjectCommand({
            Bucket: this.bucket,
            Key: this.key
        }));
        
        if (!response.Body) throw new Error("Empty response body");
        
        const tempTar = `${dbPath}.restore.tar.gz`;
        const buffer = await response.Body.transformToByteArray();
        await Bun.write(tempTar, buffer);
        
        // Ensure dbPath exists (mkdir) or parent exists
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
        
        // If dbPath exists, remove it (clean restore)
        if (fs.existsSync(dbPath)) {
            this.logger.warn(`Removing existing local state at ${dbPath} to replace with backup`);
            fs.rmSync(dbPath, { recursive: true, force: true });
        }
        
        // Extract
        // tar -xzf tempTar -C dbDir
        // The tar probably contains the "leveldb" folder name or contents? 
        // When we pack, we should pack the contents OF dbPath? 
        // Let's assume we pack the directory itself relative to its parent.
        
        const dbName = path.basename(dbPath);
        // We unpack into dbDir
        await execAsync(`tar -xzf "${tempTar}" -C "${dbDir}"`);
        
        // Cleanup
        fs.unlinkSync(tempTar);
        
        this.logger.info('State restore complete.');
        return true;
    } catch (e: any) {
        this.logger.error(`Failed to restore state: ${e.message}`);
        return false;
    }
  }

  async backup(dbPath: string): Promise<void> {
      this.logger.info(`Backing up state from ${dbPath} to s3://${this.bucket}/${this.key}...`);
      
      const tempTar = `${dbPath}.backup.tar.gz`;
      const dbDir = path.dirname(dbPath);
      const dbName = path.basename(dbPath);
      
      try {
          // Check if DB path exists
          if (!fs.existsSync(dbPath)) {
              this.logger.warn("No local state to backup.");
              return;
          }

          // Tar it
          // cd dbDir && tar -czf tempTar dbName
          await execAsync(`tar -czf "${tempTar}" -C "${dbDir}" "${dbName}"`);
          
          // Upload
          const fileStream = fs.createReadStream(tempTar);
          const upload = new Upload({
              client: this.client,
              params: {
                  Bucket: this.bucket,
                  Key: this.key,
                  Body: fileStream,
                  ContentEncoding: 'gzip' // optional
              }
          });
          
          await upload.done();
          
          // Cleanup
          fs.unlinkSync(tempTar);
          this.logger.info('State backup uploaded successfully.');
          
      } catch (e: any) {
          this.logger.error(`Backup failed: ${e.message}`);
      }
  }
}
