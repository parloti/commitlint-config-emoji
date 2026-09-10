import { lintCommitMessage } from "../support";

const sortNames = (left: string, right: string) => left.localeCompare(right);

export const lintRuleNameSets = async (message: string) => {
  const result = await lintCommitMessage(message);

  return {
    errorNames: result.errors.map(({ name }) => name).toSorted(sortNames),
    result,
    warningNames: result.warnings.map(({ name }) => name).toSorted(sortNames),
  };
};
