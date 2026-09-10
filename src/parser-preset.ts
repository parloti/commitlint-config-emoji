import type { ParserPreset } from "@commitlint/types";

import {
  conventionalTypeEnum,
  type PromptTypeEnum,
} from "./conventional-config";

interface CreateParserOptions {
  issuePrefixes?: string[];
}

interface ParserOptions {
  breakingHeaderPattern: RegExp;
  headerCorrespondence: string[];
  headerPattern: RegExp;
  issuePrefixes: string[];
  noteKeywords: string[];
  revertCorrespondence: string[];
  revertPattern: RegExp;
}

const escapeForRegex = (value: string): string =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);

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

const createParserOptions = (config?: CreateParserOptions): ParserOptions => ({
  breakingHeaderPattern: createBreakingHeaderPattern(),
  headerCorrespondence: ["emoji", "type", "scope", "subject"],
  headerPattern: createHeaderPattern(),
  issuePrefixes: config?.issuePrefixes ?? ["#"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE"],
  revertCorrespondence: ["header", "hash"],
  revertPattern:
    /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
});

export const createEmojiParserPreset = (): ParserPreset => ({
  parserOpts: createParserOptions(),
});

export const getPromptTypeEnum = (): PromptTypeEnum => conventionalTypeEnum;
