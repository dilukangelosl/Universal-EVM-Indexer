import { runCli } from './cli.js';

runCli().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
