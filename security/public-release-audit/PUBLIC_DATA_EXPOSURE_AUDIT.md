# Public Data Exposure Audit

## Classification Summary

| Data class | Count/scope | Classification |
|---|---:|---|
| Activity image files | 89 (79 originals + 10 HEIC-derived JPEGs) | **Should not be public until consent review** |
| Images with GPS coordinates | 17 | **Should not be public** |
| Named student contacts | 3 people / 3 school addresses | **Should not be public without explicit consent; prefer aliases** |
| OOXML sources | 17 | **Needs manual review and metadata scrub** |
| PDF files | 19 paths / 16 unique payloads | **Needs manual review and metadata scrub** |
| LFS PPTX payloads | 13 | **Needs manual review; public LFS is public distribution** |
| Demo feedback SVGs | 6 reused prototypes | Safe for public; synthetic/demo content |
| Public R2 hostname | 1 | Safe for public; identifier, not credential |

## Visual Privacy Review

Contact sheets were created in a temporary audit directory and visually inspected. They were not added to the repository.

- All six albums contain identifiable people.
- Five in-person school albums visibly contain elementary-age students.
- Images include classroom scenes, front-facing group photos/selfies, recognizable faces, uniforms, school names, dates, and student work.
- Several images show faces at high resolution sufficient for recognition.
- The repository contains policy text advising consent review, but it does not contain a consent/authorization ledger, release form mapping, or per-photo approval record.

This audit does not infer consent from the fact that an image was selected for the website.

## GPS / Image Metadata

Seventeen current images have both GPS latitude and longitude fields:

- ten generated JPEGs under `public/resources/METC/活动成果展览/上步小学/demonstration/`;
- five images under `.../梅丽小学/L1/`;
- two images under `.../梅丽小学/L2+3+4/`.

The affected files also commonly include capture dates, device make/model, software, and host-computer fields. Additional images contain dates/device metadata without coordinates. Exact values are deliberately omitted.

Required treatment: never publish the originals; generate approved display derivatives with all unnecessary metadata removed; verify the final bytes, not only filenames; replace and rewrite history.

## Office and PDF Metadata

The 17 OOXML sources were structurally inspected. Thirteen contain non-generic creator/last-modified identities. Current files contain no OOXML comments, tracked changes, macros, embedded OLE objects, or email/student-ID pattern hits. Two PPTX packages have HTTPS external relationships requiring ordinary copyright/link review.

All 16 unique PDF payloads contain creator/producer/date-style metadata and eight include Author. No form fields, embedded files, launch actions, or executable JavaScript were confirmed. One raw `/JS` marker was manually checked with Poppler and was not executable PDF JavaScript.

## Client Text / Contacts

`content/en.ts` and `content/zh.ts` expose three named student officers and three unique school email addresses. Address local parts encode student-number-like identifiers. A verified build embeds them in 12 output files. Values are not reproduced here.

The student quotes use abbreviated surnames and grade/activity context. They are less directly identifying but still require confirmation that they are synthetic, pseudonymized, or authorized.

## Git Metadata and Documentation

Git author metadata exposes three non-noreply identities across 120 commits, including consumer addresses and a workstation hostname. `docs/IMAGE_OPTIMIZATION.md` contains a personal absolute home-directory username and internal local tool path. Replace these with neutral placeholders and decide whether history metadata is authorized.

## Public Resource Boundary Failure

Current `origin/main` contains the full `public/resources` tree despite documentation stating that resources are R2-only and absent from Git. Making the repository public exposes every tracked byte and every reachable historical version. Enabling Pages would additionally publish regular files copied from `public/`.

Safe release requires an explicit allowlist, for example generated sanitized HTML/PNG/WebP content only. Raw Office, PDF source, HEIC, video, full-resolution originals, consent records, and private operations material should be stored in access-controlled storage outside public Git and outside the site's `public/` directory.

## Historical Privacy

Deleting current files is insufficient. The activity photos, GPS-bearing blobs, contact addresses, commit identities, Office metadata, prior non-LFS presentations, later LFS objects, and deleted snapshots remain reachable. Privacy remediation therefore requires coordinated Git/LFS history cleanup after the current tree is corrected.
