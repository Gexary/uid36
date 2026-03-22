import type { UID36 } from "./src";

export const UID36_REGEX = /^[0-9A-Za-z]+$/;

/**
 * Check if a string is a valid UID36, using a regular expression
 * If the string contains only numbers and letters, it will be considered a valid UID36
 * @param value - The string to check
 * @returns Whether the string is a valid UID36
 */
export function isUID36(value: string): value is UID36 {
  return UID36_REGEX.test(value);
}

/**
 * Create a UID36 from a string
 * @param value - The string to create a UID36 from
 * @returns The UID36 representation of the string
 */
export function createUID36(value: string): UID36 {
  if (!isUID36(value)) throw new Error("Invalid UID36 format");
  return value.toUpperCase() as UID36;
}

/**
 * Convert a UUID to a base36 string
 * @param uuid - The UUID to convert
 * @returns The base36 string representation of the UUID
 */
export function uuidToUID36(uuid: string): UID36 {
  return BigInt("0x" + uuid.replace(/-/g, ""))
    .toString(36)
    .toUpperCase() as UID36;
}

/**
 * Convert a base36 string to a UUID
 * @param base36 - The base36 string to convert
 * @returns The UUID representation of the base36 string
 */
export function uid36ToUUID(uid: UID36): string {
  const hex = base36ToBigInt(uid).toString(16).padStart(32, "0");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUID36(): UID36 {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return uuidToUID36(`${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`);
}

export function compareUID36(a: UID36, b: UID36): number {
  return a.localeCompare(b);
}

export function parseUID36(value: unknown): UID36 | null {
  if (typeof value !== "string") return null;
  return isUID36(value) ? (value as UID36) : null;
}
