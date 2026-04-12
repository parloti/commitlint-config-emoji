# 🧩 Sprint Plan: Emoji-required Config Baseline

**🧾 User Story:** [US-001](../../product/user-stories/us-001-adopt-emoji-aware-config.md) - Adopt the emoji-required config with a package-matched repo baseline
**🚀 Feature:** [FEAT-001](../../product/features/feature-001-emoji-aware-config-baseline.md) - Emoji-aware Config Baseline
**🏛️ Epic:** [EPIC-001](../../product/epics/epic-001-emoji-compatible-commitlint-config.md) - Emoji-Compatible Conventional Commitlint Config
**🕒 Created At:** 2026-03-30T00:00:00Z
**📌 Status:** Ready for implementation

---

## 🎯 Goal

Deliver the smallest usable release slice for US-001 so the package enforces emoji-prefixed conventional commits, allows consumer adoption through a single `extends` entry, and aligns the copied `.github` templates with this package.

Observed behavior:

- The current attempt is verbose and does not reliably parse emoji-prefixed headers.

Expected behavior:

- Emoji-prefixed conventional commits pass when otherwise valid.
- Conventional commits without the required emoji fail.
- Consumer setup is only `export default {extends: ['@codeperfect/commitlint-config-emoji']};`.

Root-cause status:

- Known enough to proceed: current baseline does not satisfy the parsing and enforcement contract, but implementation discovery is still needed around the exact package behavior.

---

## 🧱 Tasks

1. [ ] Confirm enforcement examples and failure boundaries
   - Description: Capture the minimum pass/fail commit-message examples needed to prove the story acceptance criteria, including valid emoji headers, missing-emoji failures, and invalid-header failures.
   - Related: US-001

2. [ ] Deliver the package baseline for emoji-required linting
   - Description: Replace the current verbose approach with the smallest package behavior that enforces emoji-prefixed conventional commits and preserves the conventional validation contract.
   - Related: US-001

3. [ ] Validate minimal consumer adoption
   - Description: Confirm that a consumer can use the package with a single `extends` entry and no local parser patch, and verify that this setup enforces the required emoji prefix.
   - Related: US-001

4. [ ] Update copied `.github` templates to match the package
   - Description: Rewrite the copied issue templates, PR templates, workflows, and repository guidance so they refer to this commitlint package and its emoji-required behavior rather than an unrelated ESLint-config package.
   - Related: US-001

5. [ ] Add regression coverage and release-readiness checks
   - Description: Add or update the validation coverage needed to guard the emoji-required behavior, non-emoji rejection, and minimal consumer setup before initial release.
   - Related: US-001

---

## 🔀 Suggested Order

1. Confirm enforcement examples and failure boundaries
2. Deliver the package baseline for emoji-required linting
3. Validate minimal consumer adoption
4. Update copied `.github` templates to match the package
5. Add regression coverage and release-readiness checks

Parallelizable work:

- Task 4 can start once the package behavior and consumer setup contract are stable.

---

## ⚠️ Risks / Blockers

- The current repo is still in bootstrap state, so packaging and validation scaffolding may need to be established before release-readiness can be proven.
- Parser enforcement may accidentally weaken normal conventional validation if the acceptance examples are not locked down first.
- The copied `.github` templates may contain more product-specific drift than is visible from filenames alone.
- Regression risk: non-emoji commits may still pass unless the enforcement rule is explicitly validated.

---

## 🔗 Dependencies

- Package name remains `@codeperfect/commitlint-config-emoji`
- Consumer contract remains a single `extends` entry
- Validation path must exist in the repo before release-readiness can be closed

---

## ✅ Definition of Ready

- [x] Scope is clear
- [x] Tasks are small
- [x] Dependencies identified
- [x] Ready for implementation

## 🔁 Handoff

- Next: implementation agent or human
- Status: ready-for-handoff
