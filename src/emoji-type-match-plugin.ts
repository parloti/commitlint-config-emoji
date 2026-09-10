import type { Plugin, RuleConfigCondition, SyncRule } from "@commitlint/types";

import { conventionalTypeEnum } from "./conventional-config";

const expectedEmojiByType = Object.fromEntries(
  Object.entries(conventionalTypeEnum).map(([type, definition]) => [
    type,
    definition.emoji.trim(),
  ]),
) as Readonly<Record<string, string>>;

const createRuleMessage = (
  actualEmoji: string,
  expectedEmoji: string,
  type: string,
): string =>
  `emoji "${actualEmoji}" must match type "${type}" using "${expectedEmoji}"`;

const emojiTypeMatchRule: SyncRule = (
  parsed,
  when: RuleConfigCondition = "always",
) => {
  const emoji = (parsed as { emoji?: null | string }).emoji;
  const type = (parsed as { type?: null | string }).type;

  if (!emoji || !type) {
    return [true];
  }

  const expectedEmoji = expectedEmojiByType[type];

  if (!expectedEmoji) {
    return [true];
  }

  const matches = emoji === expectedEmoji;
  const isValid = when === "always" ? matches : !matches;

  return isValid
    ? [true]
    : [false, createRuleMessage(emoji, expectedEmoji, type)];
};

export const emojiTypeMatchPlugin = {
  rules: { "emoji-type-match": emojiTypeMatchRule },
} satisfies Plugin;
