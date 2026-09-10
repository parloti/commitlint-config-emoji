import { describe, expect, it } from "vitest";

import { promptTypeConfig } from "./prompt-type-config";

describe("prompt type config", () => {
  it("includes the conventional prompt metadata and header emojis", () => {
    // Arrange
    const actualFeatureType = promptTypeConfig.enum?.["feat"];

    // Act
    const actualPromptConfig = promptTypeConfig;

    // Assert
    expect(actualPromptConfig).toMatchObject({
      description: "Select the type of change that you're committing",
      emojiInHeader: true,
    });
    expect(actualFeatureType).toStrictEqual({
      description: "A new feature",
      emoji: "✨ ",
      title: "Features",
    });
  });
});
