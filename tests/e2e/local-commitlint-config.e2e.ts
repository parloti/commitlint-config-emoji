import path from "node:path";

import { describe, expect, it } from "vitest";

import packageConfig from "../../src/index";
import { workspaceRoot } from "../support/commitlint-harness";

describe("repository commitlint config", () => {
  it("loads the source config before dist exists", async () => {
    // Arrange
    const localConfigPath = path.join(workspaceRoot, "commitlint.config.ts");

    // Act
    const localConfigModule = await import(localConfigPath);

    // Assert
    expect(localConfigModule.default.extends).toBeUndefined();
    expect(localConfigModule.default.plugins).toHaveLength(1);
    expect(localConfigModule.default.rules).toEqual(packageConfig.rules);
    expect(localConfigModule.default.prompt).toEqual(packageConfig.prompt);
  });
});
