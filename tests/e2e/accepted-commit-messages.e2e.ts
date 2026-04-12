import { describe, expect, it } from "vitest";

import { validCommitMessages } from "../fixtures/valid-commit-messages";
import { lintCommitMessage } from "../support/commitlint-harness";

describe("accepted commit messages", () => {
  it.each(validCommitMessages)(
    "$name",
    async ({ expectedHeaderLength, message }) => {
      // Arrange
      if (expectedHeaderLength !== undefined) {
        expect(message.length).toBe(expectedHeaderLength);
      }

      // Act
      const result = await lintCommitMessage(message);

      // Assert
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    },
  );
});
