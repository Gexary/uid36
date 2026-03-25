// core/secureBytes.ts
export type SecureBytesProvider = () => Uint8Array;

let provider: SecureBytesProvider | null = null;

export function setSecureBytesProvider(p: SecureBytesProvider) {
  provider = p;
}

export function getSecureBytes(size: number): Uint8Array {
  if (!provider) {
    throw new Error("SecureBytesProvider not initialized");
  }
  return provider(size);
}
