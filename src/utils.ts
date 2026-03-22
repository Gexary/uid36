export function bufferToBase36(bytes: Uint8Array): string {
  let value = 0n;

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8n) + BigInt(bytes[i] ?? 0);
  }

  return value.toString(36).toUpperCase();
}

export function fastRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) bytes[i] = (Math.random() * 256) | 0;
  return bytes;
}
