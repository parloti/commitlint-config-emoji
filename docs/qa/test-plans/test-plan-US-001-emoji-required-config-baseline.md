# 🧪 Test Plan: Emoji-required Config Baseline

**🐞 Bug:** BUG-000 - Not applicable; new package baseline with strict emoji enforcement
**🏛️ Epic:** [EPIC-001](../../product/epics/epic-001-emoji-compatible-commitlint-config.md) - Emoji-Compatible Conventional Commitlint Config  
**🚀 Feature:** [FEAT-001](../../product/features/feature-001-emoji-aware-config-baseline.md) - Emoji-aware Config Baseline  
**🧾 User Story:** [US-001](../../product/user-stories/us-001-adopt-emoji-aware-config.md) - Adopt the emoji-required config with a package-matched repo baseline
**🕒 Created At:** 2026-03-30T00:00:00Z
**📌 Status:** Ready for implementation

---

## 🎯 Test Objective

Validate that this package behaves as a strict emoji-required variant of conventional commitlint behavior.

This plan verifies:

- Emoji-prefixed conventional commits pass when otherwise valid and scoped.
- Conventional commits without the required emoji fail.
- Conventional commits without the required scope fail.
- Emoji-prefixed commits with mismatched emoji/type pairs fail.
- Invalid headers still fail for the original conventional reasons.
- Consumer setup works with only `export default {extends: ['@codeperfect/commitlint-config-emoji']};`.
- Copied `.github` templates and workflow descriptions are updated to match this package.

For the current repository state:

- Reproduction path: the current local approach is verbose and still produces failures where commitlint treats `type` and `subject` as empty when the real issue is the emoji-prefixed header parse.
- Expected behavior after the fix: emoji-required parsing is enforced correctly and missing-emoji commits fail for the right reason.

---

## 📋 Test Scenarios

### 🟢 Happy Path

- Scenario 1: Valid emoji-prefixed conventional commit passes
  - Input example: `✨ feat(parser): support emoji-prefixed commits`
  - Expected result: lint passes; parsed type is `feat`; parsed subject is non-empty.

- Scenario 2: Valid emoji-prefixed commit with required scope passes
  - Input example: `🐛 fix(parser): reject commits without emoji`
  - Expected result: lint passes; parsed type is `fix`; parsed subject is non-empty.

- Scenario 3: Minimal consumer setup is sufficient
  - Consumer config:
    `export default {extends: ['@codeperfect/commitlint-config-emoji']};`
  - Expected result: no local parser preset or custom rules are required for emoji enforcement.

- Scenario 4: Repository templates match package purpose
  - Review target: `.github` issue templates, PR templates, workflows, and repo guidance.
  - Expected result: content refers to commitlint package behavior and emoji-required conventional commits, not ESLint flat-config concerns.

### 🐞 Reproduction / Regression

- Reproduction before fix: emoji-prefixed commit is reported as failing because `type` and `subject` are empty even when the only unsupported element is the leading emoji.
  - Input example: `✨ feat(parser): add emoji support`
  - Expected current failure signature: parser does not recognize the header correctly.

- Regression check after fix: the same correctly scoped emoji-prefixed commit is parsed successfully.
  - Input example: `✨ feat(parser): add emoji support`
  - Expected result: lint passes.

- Regression check after fix: non-emoji conventional commit fails because emoji is required.
  - Input example: `feat(parser): add emoji support`
  - Expected result: lint fails with a missing-emoji style failure, not a silent pass.

- Regression check after fix: invalid header still fails for the underlying conventional rule.
  - Input example: `✨ feat(parser):`
  - Expected result: lint fails because subject is empty.

### 🟡 Edge Cases

- Supported emoji with breaking-change marker remains valid when otherwise correct.
  - Input example: `✨ feat(api)!: change public API`
  - Expected result: lint passes.

- Supported emoji with nested or hyphenated scope remains valid when otherwise correct.
  - Input example: `✨ feat(parser-core): support scoped parser`
  - Expected result: lint passes if scope format matches conventional expectations.

- Unsupported emoji does not widen the accepted set.
  - Input example: `🔥 feat: unsupported emoji prefix`
  - Expected result: lint fails because the emoji is not part of the supported commit type set.

- Missing emoji fails even when the rest of the header is valid conventional format.
  - Input example: `chore(release): prepare 1.0.0`
  - Expected result: lint fails.

- Missing scope fails even when the emoji and type match.
  - Input example: `✨ feat: add emoji support`
  - Expected result: lint fails on the required-scope rule.

- Mismatched emoji and type do not pass.
  - Input example: `✨ fix(parser): add emoji support`
  - Expected result: lint fails because the emoji does not match the selected type.

- Header-length checks still apply after emoji parsing.
  - Input example: a valid emoji-prefixed header longer than 100 characters.
  - Expected result: lint fails on header length rather than parser extraction.

### 🔴 Failure Cases

- Empty subject after valid emoji and type fails.
  - Input example: `✨ feat(parser):`
  - Expected result: lint fails.

- Empty type after valid emoji fails.
  - Input example: `✨ (parser): missing type`
  - Expected result: lint fails.

- Malformed separator fails.
  - Input example: `✨ feat(parser) missing colon`
  - Expected result: lint fails.

- Consumer config that does not extend this package does not satisfy the story.
  - Input example: consumer uses only `@commitlint/config-conventional`.
  - Expected result: story acceptance is not met because emoji enforcement is absent.

- Copied `.github` documentation still references ESLint flat config.
  - Expected result: documentation review fails.

---

## 🗂️ Task Coverage Matrix

- Task 1: Confirm enforcement examples and failure boundaries
  - Covered by all happy-path, regression, edge, and failure scenarios in this plan.

- Task 2: Deliver the package baseline for emoji-required linting
  - Covered by Scenarios 1, 2, Regression 1-4, Edge 1-5, Failure 1-3.

- Task 3: Validate minimal consumer adoption
  - Covered by Happy Path Scenario 3 and Failure Case 4.

- Task 4: Update copied `.github` templates to match the package
  - Covered by Happy Path Scenario 4 and Failure Case 5.

- Task 5: Add regression coverage and release-readiness checks
  - Covered by all reproduction/regression scenarios plus header-length and unsupported-emoji edge cases.

---

## 🗂️ Test Inventory

```text
docs/qa/test-plans/test-plan-US-001-emoji-required-config-baseline.md
  US-001 Emoji-required Config Baseline
    Happy Path
      valid emoji-prefixed commit passes
      valid emoji-prefixed commit with required scope passes
      minimal consumer setup is sufficient
      .github templates match package purpose
    Reproduction and Regression
      original parser failure reproduced from emoji-prefixed commit
      emoji-prefixed commit passes after fix
      non-emoji conventional commit fails after fix
      invalid header still fails after fix
    Edge Cases
      breaking-change marker with emoji passes
      scoped commit with emoji passes
      unsupported emoji fails
      missing emoji fails
      missing scope fails
      mismatched emoji/type fails
      header length still enforced
    Failure Cases
      empty subject fails
      empty type fails
      malformed separator fails
      consumer not extending package fails story contract
      stale .github package references fail review

implemented executable tests
  src/index.spec.ts
    commitlint package behavior
      accepts supported emoji-prefixed headers
      accepts supported breaking-change headers
      rejects non-emoji headers
      rejects unsupported emoji prefixes
      preserves invalid-header failures
      preserves header length validation
      supports extends-only consumer config
      verifies .github guidance matches the package
      verifies exported config extends conventional commitlint behavior
  tests/e2e/accepted-commit-messages.e2e.ts
    accepted commit messages
      accepts one passing smoke case for each supported emoji/type pair
      accepts scoped, hyphenated, nested, and uppercase scope variations
      accepts breaking headers with scope
      accepts body and footer variations
      accepts the exact 100-character header boundary
  tests/e2e/rejected-commit-messages.e2e.ts
    rejected commit messages
      rejects missing emoji, missing scope, and unsupported emoji prefixes
      rejects mismatched emoji/type pairs
      rejects missing subject and missing type headers
      rejects malformed separators
      rejects sentence-case, start-case, pascal-case, and upper-case subjects
      rejects trailing periods
      rejects overlong header, body, and footer lines
  tests/e2e/warning-behavior.e2e.ts
    warning-only commit messages
      warns when the body is not preceded by a blank line
  tests/fixtures/*.ts
    reusable commit message fixtures
      centralizes accepted, rejected, and warning-only message matrices
  tests/support/commitlint-harness.ts
    shared commitlint harness
      reuses the real load and lint pipeline across unit and e2e coverage
```

## 🧭 Selector Contract

- Primary selectors: not applicable; this is a package/configuration workflow rather than a UI flow.
- Fallback selectors: not applicable.
- Testability notes:
  - Use commit-message fixtures as the primary test inputs.
  - Assert on lint pass/fail behavior and, where available, parsed `type` and `subject` fields.
  - For `.github` review, use file-content assertions against package-specific keywords and removal of stale ESLint-config references.

## 🎭 Executable Tests

- Executable tests are implemented in `src/index.spec.ts` and `tests/e2e/*.e2e.ts` using Vitest.
- The default `npm test` path now discovers both unit and e2e coverage through `vitest.config.ts`.
- The tests exercise the shareable config through a shared commitlint load and lint harness in `tests/support/commitlint-harness.ts` rather than only asserting local helper behavior.
- Commit-message variations are maintained as reusable fixtures in `tests/fixtures/` so new parser and rule scenarios can be added without duplicating harness code.

## 🧪 Coverage Notes

- Missing cases:
  - Exact failure-message wording is not pinned because implementation details may vary.
  - Published-package smoke validation is not covered because packaging metadata does not yet exist.
- Risk areas:
  - Emoji parsing may accidentally bypass normal conventional validation.
  - Missing-emoji failures may be reported unclearly if enforcement is implemented only through parser changes.
  - `.github` files may still contain stale references outside the obvious templates and workflows.
- Assumptions:
  - The supported emoji set maps to the package’s allowed conventional types.
  - The package name remains `@codeperfect/commitlint-config-emoji`.
  - Implementation will provide a deterministic validation path once the repo is scaffolded.

## 🔁 Handoff

- Next: Implementation Agent / human
- Status: ready-for-handoff
