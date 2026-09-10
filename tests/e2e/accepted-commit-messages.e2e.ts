import { describe, expect, it } from "vitest";

import type { ValidCommitMessageCase } from "../fixtures";

import { validCommitMessages } from "../fixtures";
import { lintCommitMessage } from "../support";

const hasExpectedHeaderLength = (
  fixture: ValidCommitMessageCase,
): fixture is ValidCommitMessageCase & { expectedHeaderLength: number } =>
  fixture.expectedHeaderLength !== undefined;

describe("accepted commit messages", () => {
  it.each(validCommitMessages.filter(hasExpectedHeaderLength))(
    "$name (header length)",
    async ({ expectedHeaderLength, message }) => {
      // Arrange
      const commitMessage = message;

      // Act
      const result = await lintCommitMessage(commitMessage);

      // Assert
      expect(commitMessage).toHaveLength(expectedHeaderLength);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    },
  );

  it.each(
    validCommitMessages.filter(
      ({ expectedHeaderLength }) => expectedHeaderLength === undefined,
    ),
  )("$name", async ({ message }) => {
    // Arrange
    const commitMessage = message;

    // Act
    const result = await lintCommitMessage(commitMessage);

    // Assert
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });
});
