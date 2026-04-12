import type { UserConfig } from "@commitlint/types";

import {
  conventionalPromptQuestions,
  conventionalRules,
} from "./conventional-config.js";

import { emojiTypeMatchPlugin } from "./emoji-type-match-plugin.js";

import { createEmojiParserPreset, getPromptTypeEnum } from "./parser-preset.js";

type PromptTypeConfig = {
  description?: string;
  emoji?: string;
  title?: string;
};

type PromptEnum = Record<string, PromptTypeConfig>;
type PromptTypeQuestionConfig = NonNullable<
  NonNullable<NonNullable<UserConfig["prompt"]>["questions"]>["type"]
>;

const promptTypeQuestion =
  conventionalPromptQuestions.type as PromptTypeQuestionConfig;
const basePromptEnum = promptTypeQuestion.enum as Record<
  string,
  PromptTypeConfig
>;

const createPromptEnum = (): PromptEnum =>
  Object.fromEntries(
    Object.entries(getPromptTypeEnum()).map(([type, definition]) => [
      type,
      {
        ...(basePromptEnum[type] as PromptTypeConfig),
        emoji: `${definition.emoji.trim()} `,
      },
    ]),
  );

const promptTypeConfig: PromptTypeQuestionConfig = {
  ...promptTypeQuestion,
  emojiInHeader: true,
  enum: createPromptEnum(),
};

const config: UserConfig = {
  parserPreset: createEmojiParserPreset(),
  plugins: [emojiTypeMatchPlugin],
  prompt: {
    questions: { ...conventionalPromptQuestions, type: promptTypeConfig },
  },
  rules: conventionalRules,
};

export default config;
