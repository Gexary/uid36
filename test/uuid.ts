import uid36 from "../src";
import { uuidv7 } from "uuidv7";

const uuid = crypto.randomUUID();
console.log(uuid); // 954e5234-bd7d-4a4c-a3d0-a9faa9b04390

const id = uid36.fromUUID(uuid);
console.log(id); // 8U7P4JPXIIW7FM2PAP4D4NRM8

const back1 = uid36.toUUID(id);
console.log(back1); // 954e5234-bd7d-4a4c-a3d0-a9faa9b04390

const back2 = uid36.toUUID(id, "no-dash");
console.log(back2); // 954e5234bd7d4a4ca3d0a9faa9b04390

const id1 = uuidv7();
const uuidt = uid36.time();
console.log(uid36.toUUID(uuidt));
console.log(id1);

const id2 = uid36.fromUUID(id1);
console.log(uuidt);
console.log(id2);
