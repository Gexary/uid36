import { randomUID36, timeUID36, bufferToBase36, base36ToBuffer, isUID36, normalizeUID36 } from "../src";

const id1 = randomUID36();
console.log(id1);

const id2 = randomUID36({ lower: true });
console.log(id2);

const id3 = randomUID36({ length: 8, secure: false });
console.log(id3);

const t1 = timeUID36();
console.log(t1);

const bytes = new Uint8Array([1, 2, 3, 4]);

const base36 = bufferToBase36(bytes);

const back = base36ToBuffer(base36);

isUID36("ABC123");

const normalized = normalizeUID36("   abc123  ");
