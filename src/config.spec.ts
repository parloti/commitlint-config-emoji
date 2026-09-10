import { describe, expect, it } from "vitest";

import config from "./config";

describe("commitlint config", () => {
  it("exposes the emoji parser, plugin, prompt, and conventional rules", () => {
    // Arrange
    const sourceConfig = config as unknown as {
      parserPreset?: { parserOpts?: unknown };
      rules?: Record<string, unknown>;
    };

    // Act
    const actual = {
      parserOptions: sourceConfig.parserPreset?.parserOpts,
      typeEnumRule: sourceConfig.rules?.["type-enum"],
    };

    // Assert
    expect(actual.parserOptions).toMatchObject({
      headerCorrespondence: ["emoji", "type", "scope", "subject"],
      issuePrefixes: ["#"],
      noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE"],
    });
    expect(config.plugins).toHaveLength(1);
    expect(config.rules?.["emoji-type-match"]).toStrictEqual([2, "always"]);
    expect(actual.typeEnumRule).toStrictEqual([2, "always", expect.any(Array)]);
    expect(config.prompt?.questions?.type).toMatchObject({
      emojiInHeader: true,
    });
  });
});
