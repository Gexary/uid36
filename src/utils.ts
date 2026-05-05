import type { UID36 } from "./index.d";
import { secureRandomBytes } from "random";

/**
 * Converts a byte array (Uint8Array) into a Base36 encoded string.
 */
export function bufferToBase36(bytes: Uint8Array): string {
  let value = 0n;
  for (let i = 0; i < bytes.length; i++) value = (value << 8n) + BigInt(bytes[i]!);
  return value.toString(36);
}

/**
 * Converts a Base36 string into a byte array (Uint8Array).
 */
export function base36ToBuffer(value: string, expectedLength?: number): Uint8Array {
  let big = 0n;

  for (let i = 0; i < value.length; i++) {
    const char = value[i]!;
    const digit = BigInt(parseInt(char, 36));
    big = big * 36n + digit;
  }

  const bytes: number[] = [];

  while (big > 0n) {
    bytes.unshift(Number(big & 0xffn));
    big >>= 8n;
  }

  if (expectedLength) {
    while (bytes.length < expectedLength) {
      bytes.unshift(0);
    }
  }

  return new Uint8Array(bytes);
}

/**
 * Generates a Uint8Array filled with pseudo-random bytes.
 *
 * Uses Math.random() which is fast but NOT cryptographically secure.
 * Suitable for performance-critical or non-security use cases.
 *
 * @param length - Number of random bytes to generate
 * @returns A Uint8Array containing random values between 0 and 255
 */
function fastRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) bytes[i] = (Math.random() * 256) | 0;
  return bytes;
}

export function randomBytes(length: number, secure: boolean): Uint8Array {
  return secure ? secureRandomBytes(length) : fastRandomBytes(length);
}

const LOG2_36 = Math.log2(36);

export function calcMaxLength(length: number): number {
  return length === 16 ? 26 : Math.ceil((length * 8) / LOG2_36);
}

/**
 * Formats a Base36 string into a valid UID36.
 *
 * - Pads the value with leading zeros to reach the expected length.
 * - Applies casing based on the `lower` option.
 * - Uses a type assertion to enforce the UID36 branded type.
 *
 * @param value - The Base36 string to format
 * @param maxLength - The target length of the UID
 * @param lower - If true, returns lowercase; otherwise uppercase
 * @returns A properly formatted UID36 string
 */
export function stylizeUID36(value: string, maxLength: number, lower: boolean): UID36 {
  if (value.length < maxLength) value = value.padStart(maxLength, "0");
  else if (value.length > maxLength) value = value.slice(value.length - maxLength, value.length);
  return (lower ? value : value.toUpperCase()) as UID36;
}
