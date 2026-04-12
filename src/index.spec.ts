import { readFile } from "node:fs/promises";
import path from "node:path";

import lint from "@commitlint/lint";
import type { ParserPreset } from "@commitlint/types";
import { describe, expect, it } from "vitest";

import { workspaceRoot } from "../tests/support/commitlint-harness";
import packageConfig from "./index";

const lintSourceCommitMessage = async (message: string) => {
  const parserPreset = packageConfig.parserPreset as ParserPreset | undefined;
  const rules = packageConfig.rules as Parameters<typeof lint>[1];
  const plugins = packageConfig.plugins as NonNullable<
    Parameters<typeof lint>[2]
  >["plugins"];
  const options: NonNullable<Parameters<typeof lint>[2]> = {
    defaultIgnores: false,
    ...(parserPreset?.parserOpts
      ? { parserOpts: parserPreset.parserOpts as never }
      : {}),
    ...(plugins ? { plugins } : {}),
  };

  return lint(message, rules, options);
};

describe("@codeperfect/commitlint-config-emoji", () => {
  it("accepts supported emoji-prefixed headers", async () => {
    const result = await lintSourceCommitMessage(
      "✨ feat(parser-core): support emoji-prefixed commits",
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts supported emoji-prefixed fix headers", async () => {
    const result = await lintSourceCommitMessage(
      "🐛 fix(parser-core): support emoji-prefixed commits",
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("accepts supported emoji-prefixed breaking change headers", async () => {
    const result = await lintSourceCommitMessage(
      "✨ feat(api)!: change public API",
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects headers without the required scope", async () => {
    const result = await lintSourceCommitMessage("✨ feat: add emoji support");

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name)).toEqual(["scope-empty"]);
  });

  it("rejects headers whose emoji does not match the commit type", async () => {
    const result = await lintSourceCommitMessage(
      "✨ fix(parser-core): reject missing emoji",
    );

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name)).toEqual(["emoji-type-match"]);
  });

  it("rejects conventional headers without the required emoji prefix", async () => {
    const result = await lintSourceCommitMessage(
      "feat(parser): add emoji support",
    );

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name).sort()).toEqual([
      "scope-empty",
      "subject-empty",
      "type-empty",
    ]);
  });

  it("rejects unsupported emoji prefixes", async () => {
    const result = await lintSourceCommitMessage(
      "🔥 feat(parser): unsupported emoji prefix",
    );

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name).sort()).toEqual([
      "scope-empty",
      "subject-empty",
      "type-empty",
    ]);
  });

  it("preserves standard validation for invalid headers after emoji parsing", async () => {
    const result = await lintSourceCommitMessage("✨ feat(parser):");

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name)).toContain("subject-empty");
  });

  it("preserves header length validation", async () => {
    const longSubject = "x".repeat(110);
    const result = await lintSourceCommitMessage(
      `✨ feat(parser): ${longSubject}`,
    );

    expect(result.valid).toBe(false);
    expect(result.errors.map(({ name }) => name)).toContain(
      "header-max-length",
    );
  });

  it("updates repository guidance to describe the commitlint package", async () => {
    const copilotInstructionsPath = path.join(
      workspaceRoot,
      ".github",
      "copilot-instructions.md",
    );
    const instructions = await readFile(copilotInstructionsPath, "utf8");

    expect(instructions).toContain("shareable commitlint config");
    expect(instructions).not.toContain("shareable flat ESLint config");
    expect(instructions).not.toContain("src/core/eslint.ts");
  });

  it("exports a self-contained config with conventional rules and emoji prompts", () => {
    expect(packageConfig.extends).toBeUndefined();
    expect(packageConfig.plugins).toHaveLength(1);
    expect(packageConfig.rules?.["emoji-type-match"]).toEqual([2, "always"]);
    expect(packageConfig.rules?.["scope-empty"]).toEqual([2, "never"]);
    expect(packageConfig.rules?.["type-enum"]).toEqual([
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ]);
    expect(packageConfig.prompt?.questions?.type?.emojiInHeader).toBe(true);
  });
});
