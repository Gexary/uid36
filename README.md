<img src="https://raw.githubusercontent.com/gexary/uid36/main/assets/banner.png" width="100%" />

# UID36

A compact, URL-safe, and type-safe identifier format designed for performance, ordering, and reversibility.

```bash
npm install @uid36/uid36
```

## Overview

**UID36** is a 128-bit (only 26 chars) identifier encoded in base36, optimized for:

- **Compactness** compared to UUID
- **URL-safe encoding**
- **Type-safe usage in TypeScript**
- **High performance generation and parsing**
- **Monotonic and time-sortable variants**

It combines the strengths of UUIDs, ULIDs, and NanoIDs into a single cohesive format.

---

## Specification

### Binary Layout (128 bits)

| Type           | Layout                                    |
| -------------- | ----------------------------------------- |
| `RANDOM_UID36` | `[128 bits randomness]`                   |
| `TIME_UID36`   | `[48 bits timestamp][80 bits randomness]` |

---

## Variants

### Random UID36

- Fully random
- Suitable for general-purpose unique identifiers
- Extremely low collision probability

### Timestamp UID36

- 48-bit timestamp (millisecond precision)
- 80-bit randomness
- Naturally **sortable by creation time**
- Ideal for databases and distributed systems

---

## Comparison

| Feature        | UID36           | UUID v4   | NanoID  |
| -------------- | --------------- | --------- | ------- |
| Length         | Shorter         | Long      | Short   |
| Sortable       | Yes (timestamp) | No        | No      |
| Reversible     | Yes             | No        | No      |
| Type-safe      | Yes             | Limited   | Limited |
| URL-safe       | Yes             | Yes (hex) | Yes     |
| Collision-safe | Yes             | Yes       | Yes     |

---

## Usage

### Generate a Random UID

```ts
import { randomUID36 } from "@uid36/uid36";

const id1 = randomUID36();
// "5X9VEBQFXU54ZANJ2GCUS58YR" -> 26 chars, uppercase by default

const id2 = randomUID36({ lower: true });
// "5x9vebqfxu54zanj2gcus58yr" -> 26 chars, lowercase

const id3 = randomUID36({ length: 8, secure: false });
// "2SK2GV9TFVTI5" -> Smaller UID36 (Less entropy)
```

---

### Generate a Timestamp UID

```ts
import { timeUID36 } from "@uid36/uid36";

const t1 = timeUID36();
// "0H85MN4SY43AMQ5FCW1V0WYNL" (sortable)
```

---

### Custom Options

```ts
const id = randomUID36({
  secure: true, // use crypto-safe randomness
  lower: true, // output in lowercase
  padding: false, // disable padding
});
```

---

## TypeScript Types

```ts
type UID36 = string & { readonly __brand: unique symbol };
type RandomUID36 = UID36;
type TimeUID36 = UID36;
```

This ensures:

- Strong typing
- Prevention of mixing with regular strings
- Safer APIs

---

## Validation

```ts
import { isUID36, normalizeUID36 } from "@uid36/uid36";

isUID36("abc123"); // boolean

const normalized = normalizeUID36("   abc123  ");
// "ABC123" (uppercase and trimmed)
```

Validation guarantees:

- Correct base36 encoding
- Valid length (26 chars by default)
- Proper structure

---

## Converters

```ts
import { bufferToBase36, base36ToBuffer } from "@uid36/uid36";

const bytes = new Uint8Array([1, 2, 3, 4]);

const base36 = bufferToBase36(bytes);
// "a2f44" (exemple)

const back = base36ToBuffer(base36);
// Uint8Array([1, 2, 3, 4])
```

Converters are useful for interoperability with other libraries.

---

## Performance Considerations

- Uses optimized base36 encoding
- Avoids heavy BigInt operations where possible
- Memory-efficient byte handling
- Designed for high-throughput environments

---

## Security

- Supports `crypto`-secure randomness
- Falls back to fast RNG if needed (configurable)
- No predictable patterns in random mode

---

## Design Philosophy

UID36 is designed around:

- **Simplicity**: minimal API surface
- **Performance**: optimized for hot paths
- **Interoperability**: works in Node.js and browsers
- **Flexibility**: multiple generation strategies
- **Reliability**: strict validation and typing

---

## Use Cases

- Database primary keys
- Distributed systems identifiers
- Event IDs
- API request tracking
- Logs and tracing
- URL-safe identifiers

---

## Roadmap

- Streaming UID generation
- Collision testing utilities
- Custom alphabet support
- Deterministic UID mode
- Hardware entropy integration

---

## License

MIT

---

## Summary

UID36 provides:

- A **compact** alternative to UUID
- A **sortable** ULID-like structure
- A **type-safe** API for TypeScript
- A **high-performance** implementation
- A **reversible and structured** encoding

It is designed for modern applications requiring efficiency, safety, and scalability.
