import type { RandomUID36, TimeUID36, UID36, UID36Options } from "./index.d";
import { bufferToBase36, randomBytes } from "./utils";
export { bufferToBase36, base36ToBuffer } from "./utils";

const LOG2_36 = Math.log2(36);

export function stylizeUID36(value: string, maxLength: number, lower: boolean): UID36 {
  if (value.length < maxLength) {
    value = value.padStart(maxLength, "0");
  }

  return (lower ? value : value.toUpperCase()) as UID36;
}

export function randomUID36({ lower = false, length = 16, secure = true }: UID36Options & { length?: number } = {}): RandomUID36 {
  const bytes = randomBytes(length, secure);
  const maxLength = length === 16 ? 25 : Math.ceil((length * 8) / LOG2_36);

  let result = bufferToBase36(bytes);
  return stylizeUID36(result, maxLength, lower);
}

export function timeUID36({ lower = false, secure = true }: UID36Options = {}): TimeUID36 {
  const bytes = new Uint8Array(16);

  const now = Date.now();
  for (let i = 0; i < 6; i++) bytes[i] = (now >>> (40 - i * 8)) & 0xff;

  const rand = randomBytes(10, secure);
  for (let i = 0; i < 10; i++) bytes[6 + i] = rand[i] as number;

  let result = bufferToBase36(bytes);
  return stylizeUID36(result, 25, lower);
}

export const UID36_REGEX = /^[0-9A-Za-z]+$/;

export function isUID36(value: string, length = 25): value is UID36 {
  return value.length === length && UID36_REGEX.test(value);
}

export function normalizeUID36<T extends UID36>(value: string): T {
  return value.trim().toUpperCase() as T;
}
