import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      enabled: true,
      exclude: ["**/index.ts"],
      include: ["src/**/*.ts", "tests/support/**/*.ts"],
      thresholds: { branches: 95, functions: 95, lines: 95, statements: 95 },
    },
    include: ["src/**/*.spec.ts", "tests/support/**/*.spec.ts"],
    mockReset: true,
    name: "commitlint-config-emoji-unit",
    restoreMocks: true,
    setupFiles: ["vitest.setup.ts"],
    testTimeout: 30_000,
    unstubEnvs: true,
    unstubGlobals: true,
  },
});
