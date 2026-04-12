# 🧾 User Story: Adopt the emoji-required config with a package-matched repo baseline

**🆔 ID:** US-001
**🏛️ Epic:** [EPIC-001](../epics/epic-001-emoji-compatible-commitlint-config.md) - Emoji-Compatible Conventional Commitlint Config
**🚀 Feature:** [FEAT-001](../features/feature-001-emoji-aware-config-baseline.md) - Emoji-aware Config Baseline
**🕒 Created At:** 2026-03-30T00:00:00Z
**📌 Status:** Ready for planning

## 🎯 The Story

- **🔢 Story Points:** 3
- **👤 As a** maintainer of a repository that uses commitlint,
- **✨ I want to** adopt an emoji-required conventional config without maintaining a custom local parser patch,
- **💎 So that** commits without the required emoji fail, emoji-prefixed commits lint correctly, and the package repository presents accurate contributor guidance.

## 📝 Description

This story captures the smallest initial release slice: consumers need the package to require emoji-prefixed conventional commits with minimal setup, and contributors need the repository templates to describe this package accurately.

## 🚧 Scope

- In scope:
  - Emoji-prefixed conventional commit enforcement
  - Minimal consumer setup expectation through a single `extends` entry
  - Updating copied .github templates and workflow descriptions to match this package
- Out of scope:
  - Supporting plain conventional commits without emoji when this package is enabled
  - New commit taxonomies beyond conventional commits with emoji headers
  - Detailed implementation design for parsing
  - Contributor-experience improvements unrelated to this package baseline

## ✅ Acceptance Criteria

_Use Given/When/Then_

- 🟢 Scenario: Emoji-prefixed conventional commit is accepted
  - Given a repository uses this package as its commitlint config
  - When a commit header starts with a supported emoji followed by a valid conventional type and subject
  - Then the commit is parsed with a non-empty type and subject and is evaluated against normal conventional rules

- 🟢 Scenario: Minimal consumer setup is sufficient
  - Given a repository uses this package as its commitlint config
  - When the consumer config is `export default {extends: ['@codeperfect/commitlint-config-emoji']};`
  - Then no additional local parser patch is required to enforce emoji-prefixed conventional commits

- 🟡 Scenario: Conventional commit without emoji is rejected
  - Given a repository uses this package as its commitlint config
  - When a commit header uses a valid conventional format without an emoji prefix
  - Then linting fails because the required emoji prefix is missing

- 🟡 Scenario: Repository templates match the package
  - Given a contributor opens the repository issue templates, PR templates, or workflow descriptions
  - When they review the repository guidance
  - Then the content refers to this commitlint package and not to an unrelated ESLint-config package

- 🟡 Scenario: Invalid headers still fail
  - Given a repository uses this package as its commitlint config
  - When a commit header is missing a valid type or subject
  - Then linting still fails instead of treating the emoji support as a bypass

## 🏁 Definition of Done

- [ ] Functional behavior matches AC
- [ ] Tests pass
- [ ] Code integrated
- [ ] Documentation updated (if needed)

## ⚠️ Edge Cases

- Emojis that are not part of the supported conventional type set should not silently broaden scope.
- Emoji enforcement must not change header-length enforcement beyond normal parsing expectations.
- Missing emoji must fail clearly even when the remaining conventional header is otherwise valid.
- Copied template content may include references that are accurate structurally but wrong for this package domain.

## 🧠 Notes

- Constraints: Initial scope should stay small enough for a first usable release.
- Assumptions: A package-specific repo baseline is part of the initial product value because the current templates are misleading.
- Assumptions: The package name exposed to consumers is `@codeperfect/commitlint-config-emoji`.
- Open questions: None for product framing.

## 🔁 Handoff

- Next: Scrum Master Agent
- Status: ready-for-handoff
