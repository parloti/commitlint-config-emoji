import { describe, expect, it } from "vitest";

import { warningCommitMessages } from "../fixtures/invalid-commit-messages";
import { lintCommitMessage } from "../support/commitlint-harness";

const getRuleNames = (problems: ReadonlyArray<{ name: string }>) =>
  problems.map(({ name }) => name).sort();

describe("warning-only commit messages", () => {
  it.each(warningCommitMessages)(
    "$name",
    async ({ exactWarningNames, expectedWarningNames, message }) => {
      // Arrange
      expect(expectedWarningNames.length).toBeGreaterThan(0);

      // Act
      const result = await lintCommitMessage(message);

      // Assert
      const warningNames = getRuleNames(result.warnings);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);

      if (exactWarningNames) {
        expect(warningNames).toEqual([...expectedWarningNames].sort());
        return;
      }

      expect(warningNames).toEqual(
        expect.arrayContaining([...expectedWarningNames]),
      );
    },
  );
});
