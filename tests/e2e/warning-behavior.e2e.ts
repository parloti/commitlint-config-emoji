import { describe, expect, it } from "vitest";

import { warningCommitMessages } from "../fixtures";
import { lintRuleNameSets } from "./lint-rule-name-sets";

const sortNames = (left: string, right: string) => left.localeCompare(right);

describe("warning-only commit messages", () => {
  it.each(warningCommitMessages)(
    "$name",
    async ({ expectedWarningNames, message }) => {
      // Arrange
      const commitMessage = message;

      // Act
      const { result, warningNames } = await lintRuleNameSets(commitMessage);

      // Assert
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(warningNames).toStrictEqual(
        [...expectedWarningNames].toSorted(sortNames),
      );
    },
  );
});
