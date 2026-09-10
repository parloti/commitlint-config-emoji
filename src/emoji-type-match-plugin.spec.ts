import type { Commit } from "conventional-commits-parser";

import { describe, expect, it } from "vitest";

import { emojiTypeMatchPlugin } from "./emoji-type-match-plugin";

const emojiTypeMatchRule = emojiTypeMatchPlugin.rules["emoji-type-match"];

const createParsedCommit = (
  fields: Partial<Record<string, string | undefined>>,
): Commit =>
  ({
    body: undefined,
    footer: undefined,
    header: undefined,
    mentions: [],
    merge: undefined,
    notes: [],
    references: [],
    revert: undefined,
    ...fields,
  }) as unknown as Commit;

describe("emojiTypeMatchRule", () => {
  it("returns success when the emoji is missing", () => {
    // Arrange
    const commit = createParsedCommit({ type: "feat" });

    // Act
    const actualResult = emojiTypeMatchRule(commit);

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });

  it("returns success when the type is missing", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨" });

    // Act
    const actualResult = emojiTypeMatchRule(commit);

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });

  it("returns success when the type is outside the conventional enum", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨", type: "custom" });

    // Act
    const actualResult = emojiTypeMatchRule(commit);

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });

  it("returns success when the emoji matches the type", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨", type: "feat" });

    // Act
    const actualResult = emojiTypeMatchRule(commit);

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });

  it("returns a deterministic failure when the emoji does not match the type", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨", type: "fix" });

    // Act
    const actualResult = emojiTypeMatchRule(commit);

    // Assert
    expect(actualResult).toStrictEqual([
      false,
      'emoji "✨" must match type "fix" using "🐛"',
    ]);
  });

  it("supports the inverted never condition when the emoji matches the type", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨", type: "fix" });

    // Act
    const actualResult = emojiTypeMatchRule(commit, "never");

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });

  it("supports the inverted never condition when the emoji does not match", () => {
    // Arrange
    const commit = createParsedCommit({ emoji: "✨", type: "feat" });

    // Act
    const actualResult = emojiTypeMatchRule(commit, "never");

    // Assert
    expect(actualResult).toStrictEqual([
      false,
      'emoji "✨" must match type "feat" using "✨"',
    ]);
  });
});

describe("emojiTypeMatchPlugin", () => {
  it("exposes the emoji-type-match rule", () => {
    // Arrange
    const commit = createParsedCommit({});

    // Act
    const actualResult = emojiTypeMatchPlugin.rules["emoji-type-match"](commit);

    // Assert
    expect(actualResult).toStrictEqual([true]);
  });
});
