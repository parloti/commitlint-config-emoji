import type { Options } from "semantic-release";

import config from "./src";

/** Semantic-release loads this file before build output exists. */
const releaseConfig = {
  branches: ["main"],
  plugins: [
    ["@semantic-release/commit-analyzer", config.parserPreset],
    ["@semantic-release/release-notes-generator", config.parserPreset],
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
} satisfies Options;

export default releaseConfig;
