import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const PROTO_DIR = path.join(process.cwd(), 'proto');
const OUTPUT_DIR = path.join(process.cwd(), 'src/proto');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PROTO_FILE = path.join(PROTO_DIR, 'sf/apechain/type/v1/type.proto');
const JS_OUTPUT = path.join(OUTPUT_DIR, 'compiled.js');
const TS_OUTPUT = path.join(OUTPUT_DIR, 'compiled.d.ts');

console.log('Generating protobuf code...');

try {
  // Generate static module
  console.log('Generating JS...');
  execSync(`bun x pbjs -t static-module -w commonjs -o "${JS_OUTPUT}" "${PROTO_FILE}"`, {
    stdio: 'inherit',
  });

  // Generate TypeScript definitions
  console.log('Generating TS definitions...');
  execSync(`bun x pbts -o "${TS_OUTPUT}" "${JS_OUTPUT}"`, {
    stdio: 'inherit',
  });

  console.log('Proto generation complete!');
} catch (error) {
  console.error('Error generating proto code:', error);
  process.exit(1);
}
