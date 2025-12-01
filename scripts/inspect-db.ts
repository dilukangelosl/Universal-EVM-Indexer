import { Level } from 'level';
import { loadConfig } from '../src/config/index.js';

async function inspect() {
    const config = loadConfig('config/run.json');
    const db = new Level(config.storage.leveldbPath, { valueEncoding: 'json' });

    console.log("--- Listing ALL Keys in DB ---");
    for await (const [key, value] of db.iterator()) {
        console.log(`Key: ${key}, Value: ${value ? JSON.stringify(value).substring(0, 100) + "..." : "null"}`);
    }
    
    await db.close();
}

inspect().catch(console.error);
