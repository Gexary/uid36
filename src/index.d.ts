interface UID36Options {
  lower?: boolean;
  secure?: boolean;
}

/**
 * Base type for a UID36 identifier.
 *
 * This is a "branded" type: it behaves like a string at runtime,
 * but is treated as a distinct type by TypeScript to prevent
 * accidental mixing with regular strings.
 */
export type UID36 = string & {
  readonly __brand: unique symbol;
};

/**
 * UID36 generated using a random source.
 *
 * This is a semantic alias of UID36 to indicate that the value
 * was generated using a random generator (e.g. crypto-based).
 */
export type RandomUID36 = UID36;

/**
 * UID36 that encodes a timestamp.
 *
 * This type represents an identifier that includes time information,
 * allowing ordering based on creation time.
 */
export type TimestampUID36 = UID36;

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
export declare function randomUID36(options?: UID36Options & { length?: number }): RandomUID36;

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
export declare function timestampUID36(options?: UID36Options): TimestampUID36;

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
export declare function stylizeUID36(value: string, maxLength: number, lower: boolean): UID36;
