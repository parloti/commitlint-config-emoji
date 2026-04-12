# Copilot instructions

## Project overview

- This package exports a shareable commitlint config that enforces emoji-prefixed conventional commit headers with required scopes.
- The published package contract is a single extension entry: `export default {extends: ['@codeperfect/commitlint-config-emoji']};`.
- The package carries its own conventional rules and prompt metadata, then customizes the parser preset and plugin rules so headers must follow `{emoji} type(scope): subject` and the emoji must match the selected type without weakening standard subject or header-length validation.

## Key patterns to follow

- Keep the public package surface minimal: the shareable config in [src/index.ts](src/index.ts) and its parser support in [src/parser-preset.ts](src/parser-preset.ts).
- Preserve compatibility with conventional commit validation; emoji enforcement should narrow accepted headers through required scope and emoji/type matching, not weaken the existing validation contract.
- Prefer commit-message fixture tests over ad hoc parser experiments when adjusting the package behavior.

## Workflows and commands

- Build: `npm run build` (runs `clean` then `compile`), or `npm run compile` for tsc-only.
- Tests: `npm test` (Vitest). Coverage thresholds are 100% in [vitest.config.ts](vitest.config.ts).
- Typecheck: `npm run typecheck`.
- Validate: `npm run validate`.

## Repo-specific notes

- The local [commitlint.config.ts](commitlint.config.ts) imports the source config directly so repository commitlint checks work before `dist/` exists; the published consumer contract remains `export default {extends: ['@codeperfect/commitlint-config-emoji']};`.
- Unit coverage lives in [src/index.spec.ts](src/index.spec.ts), while fixture-backed commit-message e2e coverage lives under [tests/e2e](tests/e2e).
- Shared commitlint test setup lives in [tests/support/commitlint-harness.ts](tests/support/commitlint-harness.ts) so unit and e2e coverage exercise the same load and lint path.
