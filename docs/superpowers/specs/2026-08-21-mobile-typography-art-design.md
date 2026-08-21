# Mobile Typography and Illustration Restoration

## Goal

Improve the already-compact phone layout by keeping short English section titles on one line where they fit and restoring existing educational illustrations that were hidden during density tuning.

## Scope

- CSS-only changes on the new `dev/mobile-typography-art` branch.
- Reuse the existing inline SVGs; add no image or resource files.
- Keep Chinese wrapping natural and keep desktop layout unchanged.
- Restore the homepage course-manual `rocket-sketch` at a compact size.
- Restore the Teaching page hero's ruler, bridge, and compass sketches with low-opacity, bounded placement.

## Acceptance criteria

- English homepage/Teaching/Activities/Voices titles stay on one line when their text width permits; otherwise they wrap without overflow.
- Chinese titles remain readable and do not overflow at 360px and 390px.
- The rocket sketch is visible in the compact course-manual preview.
- Teaching hero sketches are visible on phone/tablet without covering the heading or body copy.
- No horizontal page overflow; desktop remains unchanged; typecheck/build pass.
