# 🏛️ Epic: Emoji-Compatible Conventional Commitlint Config

**🆔 ID:** EPIC-001  
**🔢 Priority:** High
**🕒 Created At:** 2026-03-30T00:00:00Z
**📌 Status:** Ready for refinement

## 📋 Summary

- Owner: TBD
- Status: Draft

---

## 🎯 Objective

- Problem: Teams that want emoji-prefixed conventional commits cannot enforce that convention with the existing conventional commitlint config because emoji headers are not parsed correctly and non-emoji headers are not rejected.
- Outcome: Provide a package that enforces emoji-prefixed conventional commit headers while keeping consumer setup minimal.

---

## 🎯 Success Criteria

- Consumers can adopt the package with a minimal config extension and without maintaining a custom local parser patch.
- Emoji-prefixed conventional commits lint successfully when the rest of the header is valid.
- Conventional commits without the required emoji prefix fail linting.
- Repository templates and automation describe this package accurately enough to support the initial release.

---

## 🚧 Scope

- In Scope:
  - A shareable commitlint config package that requires emoji-prefixed conventional commits
  - Minimal consumer adoption flow aligned with the package purpose, including a simple `extends`-only setup
  - Updating copied .github templates and workflows so they match this package rather than an unrelated ESLint-config repository
- Out of Scope:
  - Broad repository process improvements unrelated to publishing and maintaining this package
  - Supporting plain conventional commits without emoji when this package is enabled
  - New commit conventions beyond emoji-prefixed conventional commits
  - UX or documentation-site design work beyond what is needed for an accurate package baseline

---

## ⚠️ Risks / Assumptions

- Assumption: The package goal is a strict emoji-required variant of @commitlint/config-conventional, not a broader commit authoring tool.
- Risk: Copied repository templates may mislead contributors unless they are corrected in the first scope.
- Risk: Enforcing emoji changes contributor expectations and must be stated clearly in package guidance.

---

## 🧩 Features

- [ ] [FEAT-001](../features/feature-001-emoji-aware-config-baseline.md) - Emoji-aware config baseline

---

## ✅ High-Level Acceptance

- [ ] Core emoji-required linting behavior is defined and bounded
- [ ] Minimal `extends`-only consumer adoption is part of the package contract
- [ ] Initial repository baseline reflects the package purpose

## 🔁 Handoff

- Next: Scrum Master Agent
- Status: ready-for-handoff
