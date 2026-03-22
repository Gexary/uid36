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
