import _default from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [_default()],
  test: {
    coverage: {
      enabled: true,
      exclude: ["src/**/index.ts", "src/**/*.types.ts"],
      include: ["src/**/*.ts"],
      thresholds: { "100": true },
    },
    include: ["src/**/*.spec.ts"],
    name: "unit",
    testTimeout: 30_000,
  },
});
