export function hexToBytes(hex: string | null | undefined): Uint8Array {
  if (!hex) return new Uint8Array();
  // Remove 0x prefix
  let clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  // Ensure even length
  if (clean.length % 2 !== 0) clean = '0' + clean;
  
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array | null): string {
  if (!bytes || bytes.length === 0) return '0x';
  return '0x' + Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function bigIntToBytes(value: string | number | bigint): Uint8Array {
  let bn: bigint;
  try {
    bn = BigInt(value);
  } catch {
    bn = BigInt(0);
  }

  if (bn === 0n) return new Uint8Array();

  let hex = bn.toString(16);
  if (hex.length % 2 !== 0) hex = '0' + hex;
  
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

export function numberToHex(value: number | string): string {
    if (typeof value === 'string') return value;
    return '0x' + value.toString(16);
}
