<!-- ![UID36 Logo](./assets/logo1x.png) -->
<img src="https://raw.githubusercontent.com/gexary/uid36/main/assets/banner.png" width="100%" />

# UID36

A compact, URL-safe, and type-safe identifier format designed for performance, ordering, and reversibility.

---

## Overview

**UID36** is a 128-bit identifier encoded in base36, optimized for:

- **Compactness** compared to UUID
- **URL-safe encoding**
- **Type-safe usage in TypeScript**
- **High performance generation and parsing**
- **Monotonic and time-sortable variants**

It combines the strengths of UUIDs, ULIDs, and NanoIDs into a single cohesive format.

---

## Specification

### Binary Layout (128 bits)

| Type              | Layout                                    |
| ----------------- | ----------------------------------------- |
| `RANDOM_UID36`    | `[128 bits randomness]`                   |
| `TIMESTAMP_UID36` | `[48 bits timestamp][80 bits randomness]` |

---

## Variants

### Random UID

- Fully random
- Suitable for general-purpose unique identifiers
- Extremely low collision probability

### Timestamp UID (ULID-like)

- 48-bit timestamp (millisecond precision)
- 80-bit randomness
- Naturally **sortable by creation time**
- Ideal for databases and distributed systems

---

## Features

- URL-safe base36 encoding
- Monotonic generation support
- Deterministic parsing and validation
- High-performance generation (optimized for JS/TS)
- Strong typing for safer usage
- Compact representation (shorter than UUID)
- Reversible (encode ↔ decode)

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

## Installation

```bash
npm install uid36
```

---

## Usage

### Generate a Random UID

```ts
import { randomUID36 } from "uid36";

const id = randomUID36();

console.log(id);
```

---

### Generate a Timestamp UID

```ts
import { timestampUID36 } from "uid36";

const id = timestampUID36();

console.log(id);
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
export type UID36 = string & { readonly __brand: unique symbol };
```

This ensures:

- Strong typing
- Prevention of mixing with regular strings
- Safer APIs

---

## Validation

```ts
import { isUID36 } from "uid36";

isUID36("abc123"); // boolean
```

Validation guarantees:

- Correct base36 encoding
- Valid length
- Proper structure

---

## Parsing

```ts
import { parseUID36 } from "uid36";

const parsed = parseUID36("abc123...");
```

Output:

```ts
{
  timestamp?: number;
  randomness: Uint8Array;
}
```

---

## Encoding

```ts
import { encodeUID36 } from "uid36";

const id = encodeUID36(bytes);
```

---

## Decoding

```ts
import { decodeUID36 } from "uid36";

const bytes = decodeUID36(id);
```

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
