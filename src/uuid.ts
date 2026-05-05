import type { UID36 } from "./index.d";
import { base36ToBuffer, bufferToBase36, stylizeUID36 } from "./utils";

type UUIDFormat = "standard" | "no-dash";

function uuidToBuffer(uuid: string): Uint8Array {
  const clean = uuid.replace(/-/g, "");
  if (clean.length !== 32) throw new Error("Invalid UUID");

  const bytes = new Uint8Array(16);

  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

function bufferToUUID(bytes: Uint8Array, format: UUIDFormat = "standard"): string {
  if (bytes.length !== 16) throw new Error("Invalid buffer");

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (format === "no-dash") return hex;
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}

export function uuidToUID36(uuid: string): UID36 {
  const bytes = uuidToBuffer(uuid);
  const base36 = bufferToBase36(bytes);
  return stylizeUID36(base36, 26, false);
}

export function uid36ToUUID(uid36: string, format: UUIDFormat = "standard"): string {
  const bytes = base36ToBuffer(uid36, 16);

  if (bytes.length !== 16) {
    throw new Error("Invalid UID36 (decoded size mismatch)");
  }

  return bufferToUUID(bytes, format);
}
