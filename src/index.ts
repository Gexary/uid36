import { customUID36, isUID36, timeUID36 } from "./core";
import { uid36ToUUID, uuidToUID36 } from "./uuid";

const uid36 = {
  // == UID36 Generation ==
  random: customUID36(),
  time: timeUID36,
  custom: customUID36,
  isValid: isUID36,

  // == UUID Conversion ==
  fromUUID: uuidToUID36,
  toUUID: uid36ToUUID,
};

export default uid36;
