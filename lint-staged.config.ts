import type { Configuration } from "lint-staged";

const prettierWriteCommand = "npx --yes prettier --ignore-unknown --write";

export default { "*": prettierWriteCommand } satisfies Configuration;
