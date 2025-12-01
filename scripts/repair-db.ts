import { Level } from 'level';
import { loadConfig } from '../src/config/index.js';
import { MergedRangeIndex } from '../src/storage/leveldb/types.js';

async function repair() {
    const config = loadConfig('config/run.json');
    console.log("Opening DB at " + config.storage.leveldbPath);
    const db = new Level(config.storage.leveldbPath, { valueEncoding: 'json' });

    let count = 0;
    const batch = db.batch();

    console.log("--- Scanning for broken mr: keys ---");
    
    for await (const [key, value] of db.iterator()) {
        if (!key.startsWith('mr:')) continue;
        
        let index: MergedRangeIndex;
        try {
            index = (typeof value === 'string') ? JSON.parse(value) : value;
        } catch (e) {
            console.error(`Failed to parse value for ${key}:`, value);
            continue;
        }

        if (!index.s3Key || index.s3Key === '') {
            const filename = `${String(index.startBlock).padStart(10, '0')}-${String(index.endBlock).padStart(10, '0')}.dbin.zst`;
            const newS3Key = `${config.s3.prefix}/merged-blocks/${filename}`;
            
            index.s3Key = newS3Key;
            batch.put(key, JSON.stringify(index));
            count++;
            console.log(`Repairing ${key} -> ${newS3Key}`);
        }
    }
    
    if (count > 0) {
        console.log(`Writing ${count} repairs...`);
        await batch.write();
        console.log("Done.");
    } else {
        console.log("No broken keys found.");
    }
    
    await db.close();
}

repair().catch(console.error);
