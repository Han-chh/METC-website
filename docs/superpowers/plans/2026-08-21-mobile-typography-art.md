# Mobile Typography and Illustration Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fine-tune mobile title typography and restore existing educational illustrations without changing content or assets.

**Architecture:** Add final mobile-only CSS overrides to `app/homepage.css` and `app/teaching.css`. The overrides restore visibility and size of existing inline SVGs while using language-aware title selectors and `min-width: 0` safeguards.

**Tech Stack:** Next.js, React, CSS, pnpm, browser viewport testing.

---

### Task 1: Typography and illustration overrides

**Files:**
- Modify: `app/homepage.css`
- Modify: `app/teaching.css`

- [ ] Keep short English headings on one line with a responsive font size and safe overflow behavior.
- [ ] Restore `.rocket-sketch` on the phone course-manual preview at a reduced height.
- [ ] Restore and position Teaching hero sketches at low opacity on phone/tablet.

### Task 2: Responsive verification

- [ ] Test English and Chinese at 360x800 and 390x844.
- [ ] Confirm sketches do not cover text and no horizontal overflow exists.
- [ ] Confirm desktop 1440px geometry is unchanged.

### Task 3: Project verification

- [ ] Run `pnpm typecheck`, `pnpm build`, and `git diff --check`.
- [ ] Commit the focused CSS change.
