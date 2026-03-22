import { randomBytes } from "node:crypto";

export function secureRandomBytes(length: number): Uint8Array {
  return randomBytes(length);
}
