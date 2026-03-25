import type { RandomUID36, TimestampUID36, UID36, UID36Options } from "./index.d";
import { bufferToBase36, randomBytes } from "./utils";

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

export function timestampUID36({ lower = false, secure = true }: UID36Options = {}): TimestampUID36 {
  const bytes = new Uint8Array(16);

  const now = Date.now();
  for (let i = 0; i < 6; i++) bytes[i] = (now >>> (40 - i * 8)) & 0xff;

  const rand = randomBytes(10, secure);
  for (let i = 0; i < 10; i++) bytes[6 + i] = rand[i] as number;

  let result = bufferToBase36(bytes);
  return stylizeUID36(result, 25, lower);
}
