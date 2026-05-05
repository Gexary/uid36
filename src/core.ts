import type { RandomUID36, RandomUID36Function, RandomUID36Options, TimeUID36, TimeUID36Options, UID36 } from "./index.d";
import { bufferToBase36, calcMaxLength, randomBytes, stylizeUID36 } from "./utils";
export { bufferToBase36, base36ToBuffer } from "./utils";

export const UID36_REGEX = /^[0-9A-Za-z]+$/;

export function customUID36({ lower = false, length = 16, secure = true, pad = true }: RandomUID36Options = {}): RandomUID36Function {
  const maxLength = calcMaxLength(length);

  return () => {
    const bytes = randomBytes(length + 1, secure);
    let base36 = bufferToBase36(bytes);
    return stylizeUID36(base36, pad ? maxLength : base36.length, lower) as RandomUID36;
  };
}

export function timeUID36({ lower = false, secure = true }: TimeUID36Options = {}): TimeUID36 {
  const rand = bufferToBase36(randomBytes(11, secure)); // 10 bytes = 80 bits = 16 base36 chars
  const now = Date.now().toString(36); // 6 bytes = 48 bits = 10 base36 chars

  const timePart = stylizeUID36(now, 10, lower);
  const randPart = stylizeUID36(rand, 16, lower);

  return (timePart + randPart) as TimeUID36;
}

export function isUID36(value: string, length = 26): value is UID36 {
  return value.length === length && UID36_REGEX.test(value);
}
