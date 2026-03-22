import type { RandomUID36, TimestampUID36, UID36 } from "./index.d";
import crypto from "node:crypto";
import { bufferToBase36, fastRandomBytes } from "./utils";

interface UID36Options {
  lower?: boolean;
  secure?: boolean;
  padding?: boolean;
}

const LOG2_36 = Math.log2(36);

export function randomUID36({ lower = false, length = 16, secure = true, padding = true }: UID36Options & { length?: number } = {}): RandomUID36 {
  const bytes = secure ? crypto.randomBytes(length) : fastRandomBytes(length);
  let result = bufferToBase36(bytes);

  if (padding) {
    const maxLength = length === 16 ? 25 : Math.ceil((length * 8) / LOG2_36);
    if (result.length < maxLength) result = result.padStart(maxLength, "0");
  }

  return (lower ? result.toLowerCase() : result) as UID36;
}

export function timestampUID36({ lower = false, secure = true, padding = true }: UID36Options = {}): TimestampUID36 {
  const bytes = new Uint8Array(16);
  const now = Date.now();
  const rand = secure ? crypto.randomBytes(10) : fastRandomBytes(10);

  bytes[0] = (now >>> 40) & 0xff;
  bytes[1] = (now >>> 32) & 0xff;
  bytes[2] = (now >>> 24) & 0xff;
  bytes[3] = (now >>> 16) & 0xff;
  bytes[4] = (now >>> 8) & 0xff;
  bytes[5] = now & 0xff;

  for (let i = 0; i < 10; i++) bytes[6 + i] = rand[i] as number;

  let result = bufferToBase36(bytes);

  if (padding) {
    const maxLength = 25;
    if (result.length < maxLength) {
      result = result.padStart(maxLength, "0");
    }
  }

  return (lower ? result.toLowerCase() : result) as UID36;
}
