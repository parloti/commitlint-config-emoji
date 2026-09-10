import type { UserConfig } from "@commitlint/types";

import {
  conventionalPromptQuestions,
  conventionalRules,
} from "./conventional-config";
import { emojiTypeMatchPlugin } from "./emoji-type-match-plugin";
import { createEmojiParserPreset } from "./parser-preset";
import { promptTypeConfig } from "./prompt-type-config";

const config: UserConfig = {
  parserPreset: createEmojiParserPreset(),
  plugins: [emojiTypeMatchPlugin],
  prompt: {
    questions: { ...conventionalPromptQuestions, type: promptTypeConfig },
  },
  rules: conventionalRules,
};

export default config;
