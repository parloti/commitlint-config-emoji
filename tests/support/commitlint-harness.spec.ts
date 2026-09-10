import { beforeEach, describe, expect, it, vi } from "vitest";

const loadMock = vi.fn();
const lintMock = vi.fn();

vi.mock(import("@commitlint/load"), () => ({ default: loadMock }));
vi.mock(import("@commitlint/lint"), () => ({ default: lintMock }));

const { lintCommitMessage, loadPackageConfig, workspaceRoot } =
  await import("./commitlint-harness");

describe("commitlint harness", () => {
  beforeEach(() => {
    loadMock.mockResolvedValue({
      parserPreset: { parserOpts: {} },
      plugins: [],
      rules: {},
    });
    lintMock.mockResolvedValue({ errors: [], valid: true, warnings: [] });
  });

  it("loads the package config from the workspace", async () => {
    // Arrange
    const expectedConfig = {
      parserPreset: { parserOpts: {} },
      plugins: [],
      rules: {},
    };

    // Act
    const actualConfig = await loadPackageConfig();

    // Assert
    expect(workspaceRoot).toContain("commitlint-config-emoji");
    expect(actualConfig).toStrictEqual(expectedConfig);
    expect(loadMock).toHaveBeenCalledWith(
      { extends: ["@codeperfect/commitlint-config-emoji"] },
      { cwd: workspaceRoot },
    );
  });

  it("lints a commit message with the loaded parser and rules", async () => {
    // Arrange
    const commitMessage = "✨ feat(parser): add support";

    // Act
    const result = await lintCommitMessage(commitMessage);

    // Assert
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(lintMock).toHaveBeenCalledWith(
      "✨ feat(parser): add support",
      {},
      { defaultIgnores: false, parserOpts: {}, plugins: [] },
    );
  });
});
