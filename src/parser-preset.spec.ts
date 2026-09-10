import { describe, expect, it } from "vitest";

import { createEmojiParserPreset, getPromptTypeEnum } from "./parser-preset";

interface ParserOptionsUnderTest {
  breakingHeaderPattern: RegExp;
  headerPattern: RegExp;
}

describe("emoji parser preset", () => {
  it("parses regular and breaking emoji headers", () => {
    // Arrange
    const { parserOpts } = createEmojiParserPreset() as unknown as {
      parserOpts: ParserOptionsUnderTest;
    };

    // Act
    const actual = {
      breakingMatch: parserOpts.breakingHeaderPattern.test(
        "✨ feat(parser)!: change API",
      ),
      headerMatch: parserOpts.headerPattern
        .exec("✨ feat(parser): add support")
        ?.slice(0, 5),
    };

    // Assert
    expect(actual.headerMatch).toStrictEqual([
      "✨ feat(parser): add support",
      "✨",
      "feat",
      "parser",
      "add support",
    ]);
    expect(actual.breakingMatch).toBe(true);
  });

  it("exposes the conventional prompt type definitions", () => {
    // Arrange
    const typeEnum = getPromptTypeEnum();

    // Act
    const actual = {
      featureType: typeEnum["feat"],
      typeNames: Object.keys(typeEnum),
    };

    // Assert
    expect(actual.featureType).toStrictEqual({
      description: "A new feature",
      emoji: "✨",
      title: "Features",
    });
    expect(actual.typeNames).toHaveLength(11);
  });
});
