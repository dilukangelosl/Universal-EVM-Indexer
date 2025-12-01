import { bytesToHex } from '../src/utils/bytes.js';

// Standard ERC-721 Transfer Topic
// Transfer(address,address,uint256)
const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

async function main() {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    // Example ApeChain NFT Contract (Change to a real one you know)
    // If no contract is known from the index, this will return empty.
    // We can use the sample contract from demo-query if available.
    const contractAddress = process.env.CONTRACT_ADDRESS || '0x48b62137edfa95a428d35c09e44256a739f6b557'; 

    console.log(`Fetching NFT Owners for ${contractAddress} using Indexer API at ${apiUrl}...`);

    try {
        // Fetch all Transfer events for this contract
        const res = await fetch(`${apiUrl}/contract/${contractAddress}/events?topics=${TRANSFER_TOPIC}`);
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
        
        const events = (await res.json()) as any[];
        console.log(`Found ${events.length} Transfer events.`);
        
        // Aggregation Logic: Replay history to find current owners
        const owners = new Map<string, string>(); // TokenID -> OwnerAddress
        
        // Sort by blockNumber and logIndex to ensure correct order
        events.sort((a: any, b: any) => {
            if (a.blockNumber !== b.blockNumber) return a.blockNumber - b.blockNumber;
            return a.logIndex - b.logIndex;
        });
        
        for (const event of events) {
            // Parse topics
            // Topic 0 is signature
            // Topic 1 is From
            // Topic 2 is To
            // Topic 3 is TokenID (if indexed) or it's in data
            
            if (event.topics.length < 4) continue; // Standard ERC721 usually has 4 indexed topics? No, TokenID is usually indexed (topic 3)
            
            const from = '0x' + event.topics[1].slice(26); // 32 bytes -> 20 bytes address
            const to = '0x' + event.topics[2].slice(26);
            const tokenId = event.topics[3]; // Hex string
            
            if (from === NULL_ADDRESS) {
                // Mint
                owners.set(tokenId, to);
            } else if (to === NULL_ADDRESS) {
                // Burn
                owners.delete(tokenId);
            } else {
                // Transfer
                owners.set(tokenId, to);
            }
        }
        
        // Output results
        console.log(`\n--- Current Owners (${owners.size} tokens) ---`);
        let count = 0;
        for (const [id, owner] of owners) {
            console.log(`Token ${id} => ${owner}`);
            count++;
            if (count >= 10) {
                console.log(`... and ${owners.size - 10} more`);
                break;
            }
        }
        
    } catch (e: any) {
        console.error('Error:', e.message);
        console.log('Make sure the Indexer API is running: docker-compose up -d (or bun run start --serve)');
    }
}

main();
