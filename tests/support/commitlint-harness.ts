import path from "node:path";
import { fileURLToPath } from "node:url";

import lint from "@commitlint/lint";
import load from "@commitlint/load";
import type { ParserPreset } from "@commitlint/types";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const workspaceRoot = path.resolve(currentDirectory, "..", "..");

export const loadPackageConfig = async () =>
  load(
    { extends: ["@codeperfect/commitlint-config-emoji"] },
    { cwd: workspaceRoot },
  );

export const lintCommitMessage = async (message: string) => {
  const loadedConfig = await loadPackageConfig();
  const parserPreset = loadedConfig.parserPreset as ParserPreset | undefined;

  return lint(message, loadedConfig.rules, {
    defaultIgnores: false,
    parserOpts: parserPreset?.parserOpts as never,
    plugins: loadedConfig.plugins,
  });
};

export type LintCommitMessageResult = Awaited<
  ReturnType<typeof lintCommitMessage>
>;
