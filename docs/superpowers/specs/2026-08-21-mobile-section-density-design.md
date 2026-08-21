# Mobile Homepage Section Density Design

## Goal

On phone-sized screens, make the homepage read as a sequence of compact modules: header, four homepage sections, and footer. Each section should be approximately one viewport tall instead of requiring several swipes before the next section begins.

## Scope

- Phone layout only (`max-width: 760px`); desktop and existing tablet layout remain unchanged.
- CSS-only changes in `app/homepage.css`.
- Preserve all existing content and interactions; reduce visual density through smaller type, tighter spacing, compact grids, and shorter media frames.
- Do not change R2 URLs, resources, JSX, route behavior, or page content.

## Layout decisions

1. Keep the hero at roughly one viewport, with its existing stacked mobile composition.
2. Compress Explore by using two-column compact mission/principle layouts, shorter jump rows, smaller headings, and reduced section padding.
3. Compress Teaching by keeping the course-manual preview compact and using a two-column mini-spread rather than two full-width stacked pages.
4. Compress Activities by shortening the mobile photo frame and tightening intro/action spacing.
5. Compress Voices by reducing quote scale and arranging side stories into two columns.
6. Keep touch targets at least 44px where they remain interactive; hide only decorative artwork, never actionable content.

## Acceptance criteria

- At 360x800, each homepage section after the header is approximately 800–950px tall, with no section exceeding two viewport heights.
- At 390x844, the same sections have no horizontal overflow and remain readable.
- Desktop (1440px) section geometry is unchanged by the new rules.
- Existing routes still build successfully and the homepage has no failed image loads.
