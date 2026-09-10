import type { UserConfig } from "@commitlint/types";

import { conventionalPromptQuestions } from "./conventional-config";
import { getPromptTypeEnum } from "./parser-preset";

type PromptEnum = Record<string, PromptTypeConfig>;

interface PromptTypeConfig {
  description?: string;
  emoji?: string;
  title?: string;
}
type PromptTypeQuestionConfig = NonNullable<
  NonNullable<NonNullable<UserConfig["prompt"]>["questions"]>["type"]
>;

const promptTypeQuestion =
  conventionalPromptQuestions.type as PromptTypeQuestionConfig;

const createPromptEnum = (): PromptEnum =>
  Object.fromEntries(
    Object.entries(getPromptTypeEnum()).map(
      ([type, definition]): [string, PromptTypeConfig] => [
        type,
        { ...definition, emoji: `${definition.emoji.trim()} ` },
      ],
    ),
  );

export const promptTypeConfig: PromptTypeQuestionConfig = {
  ...promptTypeQuestion,
  emojiInHeader: true,
  enum: createPromptEnum(),
};
