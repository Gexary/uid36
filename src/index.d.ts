interface UID36Options {
  lower?: boolean;
  secure?: boolean;
}

export interface RandomUID36Options extends UID36Options {
  length?: number;
  pad?: boolean;
}

export interface TimeUID36Options extends UID36Options {}

export type RandomUID36Function = () => RandomUID36;

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
export type TimeUID36 = UID36;

declare const uid36: {
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
  random: (options?: UID36Options & { length?: number }) => RandomUID36;

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
   * @returns A TimeUID36 string
   */
  time: (options?: UID36Options) => TimeUID36;

  /**
   * Check if a string is a valid UID36, using a regular expression
   * If the string contains only numbers and letters, it will be considered a valid UID36
   * The original UID36 of 128 bits is composed of 26 characters, so the length parameter is optional
   * @param value - The string to check
   * @returns Whether the string is a valid UID36
   */
  is: (value: string, length?: number) => value is UID36;

  /**
   * Generates a custom UID36 using a custom function.
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
  custom: (options?: UID36Options & { length?: number }) => RandomUID36Function;

  /**
   * Convert a UUID to a UID36
   */
  fromUUID: (uuid: string) => UID36;

  /**
   * Convert a UID36 to a UUID
   */
  toUUID: (uid36: UID36, format?: "standard" | "no-dash") => string;
};

export default uid36;
