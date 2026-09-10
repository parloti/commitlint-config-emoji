import type { UserConfig } from "@commitlint/types";

import path from "node:path";
import { describe, expect, it } from "vitest";

import config from "../../src";
import { workspaceRoot } from "../support";

interface LocalConfigModule {
  default: UserConfig;
}

describe("repository commitlint config", () => {
  it("loads the source config before dist exists", async () => {
    // Arrange
    const localConfigPath = path.join(workspaceRoot, "commitlint.config.ts");

    // Act
    const localConfigModule = (await import(
      localConfigPath
    )) as LocalConfigModule;

    // Assert
    expect(localConfigModule.default.extends).toBeUndefined();
    expect(localConfigModule.default.plugins).toHaveLength(1);
    expect(localConfigModule.default.rules).toStrictEqual(config.rules);
    expect(localConfigModule.default.prompt).toStrictEqual(config.prompt);
  });
});
