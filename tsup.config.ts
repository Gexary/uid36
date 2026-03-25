// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    platform: "node",
    format: ["esm", "cjs"],
    outDir: "dist/node",
    dts: true,
    tsconfig: "tsconfig.node.json",
    minify: true,
    clean: true,
  },
  {
    entry: { index: "src/index.ts" },
    platform: "browser",
    format: ["esm", "cjs"],
    outDir: "dist/browser",
    dts: true,
    tsconfig: "tsconfig.app.json",
    minify: true,
    clean: true,
  },
]);
