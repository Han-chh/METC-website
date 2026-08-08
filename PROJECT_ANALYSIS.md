# METC Resource System — Project Analysis

## Current application structure

- **Framework:** Next.js 16 with React 19 and TypeScript. The site is statically exported (`output: "export"`) and served below `/METC-website`.
- **Routes:** `app/page.tsx` is the homepage; the relevant secondary routes are `app/teaching/page.tsx` and `app/activities/page.tsx`. `app/voices/page.tsx` is unrelated.
- **Page composition:** secondary pages share `components/homepage/site-header.tsx` and `site-footer.tsx`. The teaching experience is composed from `components/teaching/*`; the activity exhibition from `components/activities/activities-page.tsx`.
- **Styling:** plain global CSS imported from `app/globals.css`. Page-specific styles live in `app/teaching.css` and `app/activities.css`; no Tailwind, CSS-in-JS, or component library is in use.
- **Existing interaction foundation:** `/teaching` already has a CSS 3D book-opening layer, and `/activities` already has an expandable album and accessible lightbox. These will be retained and fed with real resource data instead of the previous mock content.

## Resource audit

`resources/METC` contains two DOCX syllabi, PPTX/PDF courseware, and 75 browser-ready classroom photos (plus a few HEIC files and one video). The existing folders are organised by file type rather than by the website's page hierarchy. The resource migration will move files only; original DOCX, PPTX, PDF, photo, HEIC, and video bytes are never edited.

## Target files to change

- `components/teaching/{teaching-page,bookshelf,course-book,open-book,course-syllabus,ppt-archive,ppt-preview}.tsx`
- `components/activities/activities-page.tsx`
- `app/teaching.css` and `app/activities.css` (only to support resource-backed detail views and responsive preview controls)
- New generated-data layer under `src/data/resources/`
- New conversion utilities under `tools/resource_pipeline/`
- `resources/METC/` directory layout and generated resource metadata/demonstrations

## Files explicitly not modified

- `app/page.tsx`, `components/metc-home-page.tsx`, `app/homepage.css`, and all homepage sections
- `components/homepage/site-header.tsx`, navigation content, logo assets, and site footer
- `app/voices/page.tsx`, `components/voices/*`, and `app/voices.css`
- Existing original resource file contents

## Component and data design

1. `tools/resource_pipeline` discovers course `source/` files and exhibition photographs, generates `demonstration/` previews plus each `course.json` / `album.json`, then writes compact indexes under `src/data/resources/generated/`.
2. `src/data/resources` exposes typed `resourceCourses` and `resourceAlbums`; pages import these generated indexes rather than hard-coded course or album fixtures.
3. The existing book shell remains the course entry interaction. Its left page renders course information and sanitized generated syllabus HTML; its right page lists converted slide decks.
4. The PPT modal uses generated slide-image URLs, thumbnails, keyboard navigation, and native fullscreen. It never embeds an original PPTX.
5. The activity page keeps its existing album-opening and lightbox interaction while using the generated school albums and lazy-loaded real photographs.

## Visual thesis

A warm METC library: tactile colored book spines open into lightly ruled paper, while real lesson material and classroom photographs provide the visual proof rather than decorative mock content.

## Content and interaction plan

- **Course entry:** library hero and three distinct course books.
- **Course detail:** an animated spread for context/syllabus and the lesson archive.
- **Lesson detail:** image-based slide viewer with thumbnail rail and fullscreen.
- **Activity result:** school-named albums expand into a lazy masonry photo wall and lightbox.
