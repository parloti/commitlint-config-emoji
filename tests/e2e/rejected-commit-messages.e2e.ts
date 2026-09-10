import { describe, expect, it } from "vitest";

import type { RejectedCommitMessageCase } from "../fixtures";

import { rejectedCommitMessages } from "../fixtures";
import { lintRuleNameSets } from "./lint-rule-name-sets";

const hasExpectedHeaderLength = (
  fixture: RejectedCommitMessageCase,
): fixture is RejectedCommitMessageCase & { expectedHeaderLength: number } =>
  fixture.expectedHeaderLength !== undefined;

const sortNames = (left: string, right: string) => left.localeCompare(right);

describe("rejected commit messages", () => {
  it.each(rejectedCommitMessages.filter(hasExpectedHeaderLength))(
    "$name (header length)",
    async ({ expectedErrorNames, expectedHeaderLength, message }) => {
      // Arrange
      const commitMessage = message;

      // Act
      const { errorNames, result } = await lintRuleNameSets(commitMessage);

      // Assert
      expect(commitMessage).toHaveLength(expectedHeaderLength);
      expect(result.valid).toBe(false);
      expect(errorNames).toStrictEqual(
        [...expectedErrorNames].toSorted(sortNames),
      );
    },
  );

  it.each(
    rejectedCommitMessages.filter(
      ({ expectedHeaderLength }) => expectedHeaderLength === undefined,
    ),
  )("$name (exact errors)", async ({ expectedErrorNames, message }) => {
    // Arrange
    const commitMessage = message;

    // Act
    const { errorNames, result } = await lintRuleNameSets(commitMessage);

    // Assert
    expect(result.valid).toBe(false);
    expect(errorNames).toStrictEqual(
      [...expectedErrorNames].toSorted(sortNames),
    );
  });
});
