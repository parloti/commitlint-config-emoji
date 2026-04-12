# 🚀 Feature: Emoji-aware Config Baseline

**🆔 ID:** FEAT-001  
**🏛️ Epic:** [EPIC-001](../epics/epic-001-emoji-compatible-commitlint-config.md) - Emoji-Compatible Conventional Commitlint Config
**🕒 Created At:** 2026-03-30T00:00:00Z
**📌 Status:** Ready for planning

## 📝 Description

Provide the initial package baseline for an emoji-required conventional commitlint config so consumers can adopt it with minimal setup and contributors interact with package-specific templates and workflows.

---

## 🚩 Problem

The current package intent is clear, but the implementation approach is verbose, emoji use is not yet framed as a strict requirement, and the copied repository templates still describe a different product. That makes both package adoption and contributor collaboration harder than necessary.

---

## 💡 Solution (High-Level)

Ship a package baseline that requires emoji-prefixed conventional commits, allows consumers to adopt it with a simple `extends` entry, and aligns the copied .github templates with this package's purpose.

---

## 🎯 Success Criteria

- A consumer can understand the package purpose and expected usage without reading unrelated template content.
- Emoji-prefixed conventional commits are treated as valid when the rest of the header is valid.
- Non-emoji conventional commits fail when this package is enabled.
- A consumer can adopt the package with `export default {extends: ['@codeperfect/commitlint-config-emoji']};`.

---

## 🛠️ Functional Requirements

- The package must require emoji-prefixed conventional commit headers.
- The consumer setup must remain minimal and easy to explain.
- The minimal consumer setup must be a single config extension of `@codeperfect/commitlint-config-emoji`.
- The initial .github issue templates, PR templates, workflow descriptions, and repository guidance must match this package rather than an unrelated ESLint-config package.
- The feature must preserve the existing conventional commit semantics for type, scope, subject, and header validation, while making the emoji prefix mandatory.

---

## 🧩 User Stories

- [ ] [US-001](../user-stories/us-001-adopt-emoji-aware-config.md) - Adopt the emoji-aware config with a package-matched repo baseline

---

## ✅ Acceptance Criteria

- [ ] The package value proposition is clearly bounded to emoji-required conventional commitlint behavior.
- [ ] Initial repository templates and workflow descriptions no longer refer to unrelated ESLint configuration concerns.
- [ ] Consumer adoption remains minimal enough that a single `extends` entry is sufficient.
- [ ] Conventional commit validation expectations remain intact aside from the requirement that a supported emoji prefix be present.

---

## 🧠 Notes

- Constraints: Keep the initial release scope narrow and publishable.
- Assumptions: The copied .github files are bootstrap material and should be corrected, not treated as product requirements from the source repository.
- Assumptions: Enforcing emoji is a deliberate product decision, not an optional compatibility mode in the initial scope.

## 🔁 Handoff

- Next: Scrum Master Agent
- Status: ready-for-handoff
