import type { ParserPreset } from "@commitlint/types";

import {
  conventionalTypeEnum,
  type PromptTypeEnum,
} from "./conventional-config.js";

type ParserOptions = NonNullable<ParserPreset["parserOpts"]>;

const escapeForRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");

const buildEmojiAlternation = (): string =>
  Object.values(conventionalTypeEnum)
    .map(({ emoji }) => escapeForRegex(emoji.trim()))
    .join("|");

const createHeaderPattern = (): RegExp =>
  new RegExp(
    String.raw`^(${buildEmojiAlternation()})\s+(\w*)(?:\((.*)\))?!?:\s+(.*)$`,
    "u",
  );

const createBreakingHeaderPattern = (): RegExp =>
  new RegExp(
    String.raw`^(${buildEmojiAlternation()})\s+(\w*)(?:\((.*)\))?!:\s+(.*)$`,
    "u",
  );

const createParserOptions = (config?: {
  issuePrefixes?: string[];
}): ParserOptions => ({
  breakingHeaderPattern: createBreakingHeaderPattern(),
  headerCorrespondence: ["emoji", "type", "scope", "subject"],
  headerPattern: createHeaderPattern(),
  noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE"],
  revertPattern:
    /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
  revertCorrespondence: ["header", "hash"],
  issuePrefixes: config?.issuePrefixes ?? ["#"],
});

export const createEmojiParserPreset = (): ParserPreset => ({
  parserOpts: createParserOptions(),
});

export const getPromptTypeEnum = (): PromptTypeEnum => conventionalTypeEnum;
