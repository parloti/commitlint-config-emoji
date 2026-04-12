import type { Commit } from "conventional-commits-parser";

import { describe, expect, it } from "vitest";

import {
  emojiTypeMatchPlugin,
  emojiTypeMatchRule,
} from "./emoji-type-match-plugin";

const createParsedCommit = (
  fields: Partial<Record<string, string | null>>,
): Commit =>
  ({
    body: null,
    footer: null,
    header: null,
    mentions: [],
    merge: null,
    notes: [],
    references: [],
    revert: null,
    ...fields,
  }) as unknown as Commit;

describe("emojiTypeMatchRule", () => {
  it("returns success when the emoji is missing", () => {
    expect(emojiTypeMatchRule(createParsedCommit({ type: "feat" }))).toEqual([
      true,
    ]);
  });

  it("returns success when the type is missing", () => {
    expect(emojiTypeMatchRule(createParsedCommit({ emoji: "✨" }))).toEqual([
      true,
    ]);
  });

  it("returns success when the type is outside the conventional enum", () => {
    expect(
      emojiTypeMatchRule(createParsedCommit({ emoji: "✨", type: "custom" })),
    ).toEqual([true]);
  });

  it("returns success when the emoji matches the type", () => {
    expect(
      emojiTypeMatchRule(createParsedCommit({ emoji: "✨", type: "feat" })),
    ).toEqual([true]);
  });

  it("returns a deterministic failure when the emoji does not match the type", () => {
    expect(
      emojiTypeMatchRule(createParsedCommit({ emoji: "✨", type: "fix" })),
    ).toEqual([false, 'emoji "✨" must match type "fix" using "🐛"']);
  });

  it("supports the inverted never condition", () => {
    expect(
      emojiTypeMatchRule(
        createParsedCommit({ emoji: "✨", type: "fix" }),
        "never",
      ),
    ).toEqual([true]);

    expect(
      emojiTypeMatchRule(
        createParsedCommit({ emoji: "✨", type: "feat" }),
        "never",
      ),
    ).toEqual([false, 'emoji "✨" must match type "feat" using "✨"']);
  });
});

describe("emojiTypeMatchPlugin", () => {
  it("exposes the emoji-type-match rule", () => {
    expect(emojiTypeMatchPlugin.rules["emoji-type-match"]).toBe(
      emojiTypeMatchRule,
    );
  });
});
