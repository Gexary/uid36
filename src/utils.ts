import { secureRandomBytes } from "random";

/**
 * Converts a byte array (Uint8Array) into a Base36 encoded string.
 *
 * The function interprets the byte array as a single large integer
 * (big-endian), then converts that integer into a Base36 string.
 *
 * This approach is efficient and avoids intermediate string conversions.
 */
export function bufferToBase36(bytes: Uint8Array): string {
  let value = 0n;

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8n) + BigInt(bytes[i]!);
  }

  return value.toString(36);
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
