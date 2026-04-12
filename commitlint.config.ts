import type { UserConfig } from "@commitlint/types";

import packageConfig from "./src/index.js";

/** Load the source config locally so commitlint works before dist exists. */
const config: UserConfig = packageConfig;

export default config;
