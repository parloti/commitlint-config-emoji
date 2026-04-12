export type RejectedCommitMessageCase = {
  readonly exactErrorNames?: boolean;
  readonly expectedErrorNames: readonly string[];
  readonly expectedHeaderLength?: number;
  readonly message: string;
  readonly name: string;
};

export type WarningCommitMessageCase = {
  readonly exactWarningNames?: boolean;
  readonly expectedWarningNames: readonly string[];
  readonly message: string;
  readonly name: string;
};

const createHeaderWithLength = (
  prefix: string,
  expectedHeaderLength: number,
): string => `${prefix}${"a".repeat(expectedHeaderLength - prefix.length)}`;

export const rejectedCommitMessages: readonly RejectedCommitMessageCase[] = [
  {
    exactErrorNames: true,
    expectedErrorNames: ["scope-empty", "subject-empty", "type-empty"],
    message: "feat(parser): add emoji parsing",
    name: "rejects conventional commits without the required emoji prefix",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["scope-empty", "subject-empty", "type-empty"],
    message: "🔥 feat(parser): add emoji parsing",
    name: "rejects unsupported emoji prefixes",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["scope-empty"],
    message: "✨ feat: add emoji parsing",
    name: "rejects headers without the required scope",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["emoji-type-match"],
    message: "✨ fix(parser): reject missing emoji",
    name: "rejects headers whose emoji does not match the type",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["scope-empty", "subject-empty", "type-empty"],
    message: "✨ feat(parser):",
    name: "rejects an empty subject after emoji parsing",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["type-empty"],
    message: "✨ (parser): add emoji parsing",
    name: "rejects an empty type after emoji parsing",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["scope-empty", "subject-empty", "type-empty"],
    message: "✨ feat(parser) add emoji parsing",
    name: "rejects headers without the conventional colon separator",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["subject-case"],
    message: "✨ feat(parser): Add emoji parsing",
    name: "rejects sentence case subjects",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["subject-case"],
    message: "✨ feat(parser): Add Emoji Parsing",
    name: "rejects start case subjects",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["subject-case"],
    message: "✨ feat(parser): AddEmojiParsing",
    name: "rejects pascal case subjects",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["subject-case"],
    message: "✨ feat(parser): ADD EMOJI PARSING",
    name: "rejects upper case subjects",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["subject-full-stop"],
    message: "✨ feat(parser): add emoji parsing.",
    name: "rejects subjects with a trailing full stop",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["header-max-length"],
    expectedHeaderLength: 101,
    message: createHeaderWithLength("✨ feat(parser): ", 101),
    name: "rejects headers above the max length",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["body-max-line-length"],
    message: `✨ feat(parser): add emoji parsing\n\n${"a".repeat(101)}`,
    name: "rejects body lines above the max length",
  },
  {
    exactErrorNames: true,
    expectedErrorNames: ["footer-max-line-length"],
    message: `✨ feat(parser): add emoji parsing\n\nkeep commitlint aligned\n\nBREAKING CHANGE: ${"a".repeat(85)}`,
    name: "rejects footer lines above the max length",
  },
];

export const warningCommitMessages: readonly WarningCommitMessageCase[] = [
  {
    exactWarningNames: true,
    expectedWarningNames: ["body-leading-blank"],
    message: "✨ feat(parser): add emoji parsing\nkeep commitlint aligned",
    name: "warns when the body is not preceded by a blank line",
  },
];
