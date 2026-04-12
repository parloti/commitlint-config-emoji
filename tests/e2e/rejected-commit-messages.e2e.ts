import { describe, expect, it } from "vitest";

import { rejectedCommitMessages } from "../fixtures/invalid-commit-messages";
import { lintCommitMessage } from "../support/commitlint-harness";

const getRuleNames = (problems: ReadonlyArray<{ name: string }>) =>
  problems.map(({ name }) => name).sort();

describe("rejected commit messages", () => {
  it.each(rejectedCommitMessages)(
    "$name",
    async ({
      exactErrorNames,
      expectedErrorNames,
      expectedHeaderLength,
      message,
    }) => {
      // Arrange
      if (expectedHeaderLength !== undefined) {
        expect(message.length).toBe(expectedHeaderLength);
      }

      // Act
      const result = await lintCommitMessage(message);

      // Assert
      const errorNames = getRuleNames(result.errors);

      expect(result.valid).toBe(false);

      if (exactErrorNames) {
        expect(errorNames).toEqual([...expectedErrorNames].sort());
        return;
      }

      expect(errorNames).toEqual(
        expect.arrayContaining([...expectedErrorNames]),
      );
    },
  );
});
