export type ValidCommitMessageCase = {
  readonly expectedHeaderLength?: number;
  readonly message: string;
  readonly name: string;
};

const createHeaderWithLength = (
  prefix: string,
  expectedHeaderLength: number,
): string => `${prefix}${"a".repeat(expectedHeaderLength - prefix.length)}`;

export const validCommitMessages: readonly ValidCommitMessageCase[] = [
  {
    message: "🛠 build(deps): update bundler wiring",
    name: "accepts build commits with a scope",
  },
  {
    message: "♻️ chore(repo): refresh repo metadata",
    name: "accepts chore commits with a required scope",
  },
  {
    message: "⚙️ ci(actions/workflows): tighten pipeline rules",
    name: "accepts ci commits with a slash scope",
  },
  {
    message: "📚 docs(readme-guide): clarify usage notes",
    name: "accepts docs commits with a hyphenated scope",
  },
  {
    message: "✨ feat(parser): add emoji parsing",
    name: "accepts feat commits with a simple scope",
  },
  {
    message: "🐛 fix(parser-core): reject missing emoji",
    name: "accepts fix commits with a hyphenated scope",
  },
  {
    message: "🚀 perf(parser/core): trim regex work",
    name: "accepts perf commits with a nested scope",
  },
  {
    message: "📦 refactor(ParserCore): split harness setup",
    name: "accepts refactor commits with an uppercase scope",
  },
  {
    message: "🗑 revert(parser): restore parser defaults",
    name: "accepts revert commits with a scope",
  },
  {
    message: "💎 style(prettier): align formatting",
    name: "accepts style commits with a scope",
  },
  {
    message: "🚨 test(fixtures): add commit coverage",
    name: "accepts test commits with a scope",
  },
  {
    message: "✨ feat(api)!: add emoji parsing API",
    name: "accepts breaking changes with a scope",
  },
  {
    message: "🐛 fix(api)!: tighten parser contract",
    name: "accepts breaking changes with a scope",
  },
  {
    message:
      "✨ feat(parser): add emoji parsing\n\nkeep commitlint aligned\n\nRefs: #123",
    name: "accepts commits with a body and footer",
  },
  {
    expectedHeaderLength: 100,
    message: createHeaderWithLength("✨ feat(parser): ", 100),
    name: "accepts headers at the exact max length with a scope",
  },
];
