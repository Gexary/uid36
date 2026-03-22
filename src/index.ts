import type { RandomUID36, TimestampUID36, UID36 } from "./index.d";
import { bufferToBase36, randomBytes } from "./utils";

interface UID36Options {
  lower?: boolean;
  secure?: boolean;
}

const LOG2_36 = Math.log2(36);

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
  if (value.length < maxLength) {
    value = value.padStart(maxLength, "0");
  }

  return (lower ? value : value.toUpperCase()) as UID36;
}

/**
 * Generates a random UID36.
 *
 * This function:
 * - Generates random bytes (secure or fast)
 * - Converts them into a Base36 string
 * - Normalizes the length to ensure consistency
 *
 * The result is a compact, URL-safe identifier.
 *
 * @param options - Configuration options
 * @param options.lower - If true, returns lowercase characters
 * @param options.secure - If true, uses cryptographically secure randomness
 * @param options.length - Number of random bytes (default: 16)
 * @returns A RandomUID36 string
 */
export function randomUID36({ lower = false, length = 16, secure = true }: UID36Options & { length?: number } = {}): RandomUID36 {
  const bytes = randomBytes(length, secure);
  const maxLength = length === 16 ? 25 : Math.ceil((length * 8) / LOG2_36);

  let result = bufferToBase36(bytes);
  return stylizeUID36(result, maxLength, lower);
}

/**
 * Generates a timestamp-based UID36.
 *
 * Structure of the ID:
 * - First 6 bytes: timestamp (milliseconds since epoch, big-endian)
 * - Last 10 bytes: random values
 *
 * This ensures:
 * - Temporal ordering (based on creation time)
 * - Uniqueness (due to random suffix)
 *
 * @param options - Configuration options
 * @param options.lower - If true, returns lowercase characters
 * @param options.secure - Whether to use cryptographically secure randomness
 * @returns A TimestampUID36 string
 */
export function timestampUID36({ lower = false, secure = true }: UID36Options = {}): TimestampUID36 {
  const bytes = new Uint8Array(16);

  const now = Date.now();
  for (let i = 0; i < 6; i++) bytes[i] = (now >>> (40 - i * 8)) & 0xff;

  const rand = randomBytes(10, secure);
  for (let i = 0; i < 10; i++) bytes[6 + i] = rand[i] as number;

  let result = bufferToBase36(bytes);
  return stylizeUID36(result, 25, lower);
}
