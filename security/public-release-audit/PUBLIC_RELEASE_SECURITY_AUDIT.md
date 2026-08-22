# Public Repository Security Audit

Audit date: 2026-08-18 (Asia/Shanghai)  
Audited remote snapshot: `origin/main` at `f23bfd9cafe01446467896658d0e7a414773f4b2`  
Local checkout: `main` at `3f2b7e7`, eight commits behind the audited remote

## 1. Executive Summary

The repository must not be made public in its current state. No credential or private-key material was found in the current tree or 123 reachable commits, but privacy and release-engineering blockers are substantial:

- recognizable children are present throughout the activity albums and the repository contains no per-image consent record;
- 17 current activity images expose GPS latitude/longitude metadata;
- three named student leaders and student-number-based school email addresses are delivered to browsers;
- raw photos, HEIC originals, video, Office sources, and PDFs remain under `public/resources/**` despite an attempted R2 migration;
- personal author identities remain in Office/PDF and Git commit metadata;
- multiple Vercel Preview/Production integrations exist without verifiable fork-PR secret controls;
- public GitHub security controls are not ready.

Finding totals: 0 critical, 5 high, 8 medium, 3 low, 0 informational.

## 2. Final Release Decision

**DO NOT MAKE REPOSITORY PUBLIC**

The decision may be reconsidered only after every P0 item in `REMEDIATION_PLAN.md` is completed and the release gates are rerun on the rewritten, final remote state.

## 3. Repository Architecture

- Next.js `16.2.10`, React `19.2.7`, TypeScript `5.9.3`, App Router.
- `output: "export"`; all six routes are statically prerendered. No dynamic server is deployed.
- pnpm `10.33.0` is declared; GitHub Actions uses Node 22 but installs with npm and ignores `pnpm-lock.yaml`.
- Routes: `/`, `/activities`, `/teaching`, `/voices`, `/_not-found`, `/icon.svg`.
- No `app/api`, `pages/api`, route handlers, middleware, Server Actions, authentication, admin/root interface, database, runtime upload, delete, reorder, publish, or server-side mutation functionality.
- Public read-only R2 host is configured through `NEXT_PUBLIC_RESOURCE_BASE_URL`; no R2 SDK or write credential is present.
- Deployment surfaces: a GitHub Pages workflow plus multiple externally configured Vercel projects/environments. No `vercel.json` or `.vercelignore` exists.
- `origin/main` contains 503 tracked paths, including 359 media paths: 322 raster/HEIC images, 19 PDFs, 4 DOCX, 13 PPTX, and 1 MP4.
- Git LFS contains 13 PPTX payloads; all were fetched and `git lfs fsck --objects` passed.
- Sparse checkout is enabled locally. The audit therefore used Git trees/objects and LFS content rather than assuming the worktree was complete.

## 4. Attack Surface Summary

| Attacker | Assets / entry points | Principal attacks | Existing mitigations | Gaps |
|---|---|---|---|---|
| Anonymous visitor | Static pages, JS bundles, R2 objects, public assets | DOM XSS through compromised remote HTML; privacy harvesting | No forms, auth, APIs, or server state; generated syllabus sanitizer | Runtime trusts R2 HTML; no CSP; raw assets may be hosted |
| Anonymous GitHub user | Full tree, history, LFS, workflows, docs | PII/GPS extraction, architecture study, forks/PRs | No current secrets found | Privacy-rich history and weak release controls |
| Organization member | Push/merge, environments, Vercel/R2 consoles | Accidental publication, privileged deployment misuse | Private repo; default Actions token permission is read | No enforced main ruleset; duplicated deployment surface |
| Malicious contributor | PR source and binary resources | Parser exploit, dependency/build abuse, preview-secret exfiltration | GitHub workflow does not run on PR/pull_request_target | Vercel fork behavior unknown; local binary processors unsandboxed |

Trust boundaries are GitHub review/merge, the Actions build/deploy split, Vercel preview builders and environment variables, R2 write administration, and the browser boundary where fetched R2 HTML is injected.

## 5. Critical Findings

None.

## 6. High-Risk Findings

- **PUB-001:** recognizable elementary-age students and school association in activity images; consent not evidenced.
- **PUB-002:** 17 activity images contain GPS coordinates.
- **PUB-003:** three student leaders' names and student-number-based school emails are browser-visible.
- **PUB-004:** the raw resource corpus remains in both Git and `public/`; the R2 deletion was lost during integration.
- **DEPLOY-001:** 28 Vercel-style deployments and numerous unprotected Preview/Production environments exist; external-fork behavior and secret scoping are unverified.

## 7. Medium/Low Findings

Medium: Office/PDF author metadata, personal Git author addresses, remote-HTML injection trust, CI privilege/reproducibility, known dependency advisories, incomplete ignore rules, missing GitHub controls, and unsandboxed binary conversion. Low: security-header hardening, contradictory/personalized documentation, and a disabled/failing GitHub Pages target. Exact evidence and remediation are in `FINDINGS.csv`.

## 8. Current Working Tree Secret Audit

No current-tree secret was identified. The only local sensitive-style filename is `.env.example`; it contains a deliberately public R2 read hostname. No `.env`, key, certificate, service-account, credential JSON, or tracked ignored file was present. The built client contained zero tested key/private-key signatures.

The public R2 hostname, `NEXT_PUBLIC_BASE_PATH`, and normal GitHub workflow expressions are public identifiers/configuration, not secrets.

## 9. Git History Secret Audit

All reachable heads, remote-tracking branches, and tag history were scanned: 123 commits; `main`, `origin/main`, `origin/dev/vercel-ready`, and tag `0.1.0`. The scanner inspected 483 text blobs and separately parsed 466 unique media blobs. It found zero credential locations. All 13 LFS objects were available.

History does contain privacy material: student addresses duplicated in deleted Playwright snapshots, personal commit author addresses, Office identities, and the same photo/GPS corpus. Credential rotation is not required. Privacy-driven history rewriting is required.

## 10. Sensitive Data / Privacy Audit

The current activity corpus has 89 image files (79 originals plus 10 HEIC-derived JPEGs). Visual review confirmed identifiable people in all six albums and recognizable children in five in-person school albums. Seventeen images contain coordinate-bearing GPS EXIF. Classroom context, uniforms, school names, dates, student work, and faces allow association even where filenames are generic.

The source contains three named student officers and three school addresses with student-number identifiers. Thirteen OOXML sources and eight PDFs retain author identities. Git history exposes three non-noreply author identities across 120 commits. These items require consent or removal/anonymization before release.

## 11. Authentication Audit

Not applicable. There is no login, session, JWT, OAuth, NextAuth/Auth.js, password comparison, protected page, admin/root account, or server cookie. `viewed-feedback` is a client-readable preference cookie containing only short feedback IDs; it is not an authentication mechanism.

## 12. Authorization Audit

No sensitive application mutations exist.

| Operation | Endpoint | Authentication required | Authorization required | Server enforced | Result |
|---|---|---:|---:|---:|---|
| Read pages/assets | Static routes and R2 GET | No | No | N/A | Public by design |
| Upload/edit/delete/reorder/publish | None | N/A | N/A | N/A | Not implemented |
| Admin login/management | None | N/A | N/A | N/A | Not implemented |
| Content deployment | Git merge, Vercel/R2/GitHub consoles | External control plane | Yes | External | Manual verification required |

## 13. API Security Audit

No API routes, route handlers, middleware, Server Actions, CORS handlers, cron handlers, external URL fetchers on the server, SQL/NoSQL queries, filesystem APIs, shell execution, `eval`, or `new Function` exist in the application. CSRF, IDOR, injection, rate limiting, and method enforcement are therefore not applicable to the deployed static app.

The local Python pipeline invokes LibreOffice, Poppler, and `sips` with argument arrays rather than a shell, so source filenames do not create a demonstrated command-injection path.

## 14. File Upload Audit

No runtime upload endpoint exists. Content is added through Git/R2 administration. The public-repository risk is contributor-supplied binary parsing: maintainers are instructed to run powerful file converters locally without sandboxing, type validation beyond extension, file-size limits, or malware screening.

## 15. Object Storage / R2 Audit

No access key, secret access key, account token, presigned URL, browser-side credential, or write API is in the repository/history. The browser receives only a public read hostname. Code-level credential handling passes.

Manual verification remains mandatory for bucket public-read scope, anonymous-write denial, CORS origin/method limits, custom-domain/proxy controls, and the identities permitted to overwrite syllabus HTML. There are no presigned URLs to assess.

## 16. Database Audit

Not applicable. No database provider, client, ORM, connection string, Supabase/Firebase privileged key, or query code exists.

## 17. Next.js Security Audit

Static export invalidates all assumptions about server-side secrecy: any referenced `NEXT_PUBLIC_*` value and all bundled content are public. The build confirmed all routes are static, produced no browser source maps, and exposed the three student addresses in 12 generated files. Images are `unoptimized`, so sharp's runtime image-processing advisory is not reachable.

The material application issue is `dangerouslySetInnerHTML` on fetched R2 syllabus HTML. Current generated HTML contained no script, event-handler, iframe/object/embed/form, `javascript:` URL, or active-content signature, and the converter uses an allowlist. Nevertheless, runtime content is not sanitized.

## 18. Vercel Security Audit

No repository-visible Vercel configuration exists. GitHub metadata shows multiple `Preview – ...` and `Production – ...` environments and 28 bot deployments, with no protection rules. The repository contains no GitHub Actions or environment secrets, but Vercel-held variables are outside Git and were not read.

Before publication, verify every linked Vercel project: remove duplicates; ensure fork PRs require trusted approval; expose no production/R2 write secrets to Preview; separate Preview/Production variables; enable deployment protection where appropriate; restrict production to the intended branch; and test a fork without using real secrets.

## 19. GitHub Actions / CI Audit

The workflow triggers only on pushes to `main` and manual dispatch. It has no `pull_request`, `pull_request_target`, or `workflow_run`, so an untrusted fork cannot directly execute this workflow with tokens. GitHub repository/environment secret counts are zero.

Weaknesses remain: privileged permissions are declared globally and inherited by build; npm ignores the pnpm lockfile; action references are mutable major tags; repository Actions permit all actions and do not enforce SHA pins. The three most recent Pages deploy jobs failed because Pages is disabled, although build/artifact upload completed.

## 20. Dependency Audit

`pnpm audit --registry=https://registry.npmjs.org` reported 0 critical, 9 high, 7 moderate, and 0 low advisories across 59 dependencies. A frozen-lockfile install, typecheck, and production build succeeded. Sharp's install helper failed to build locally, but the static unoptimized-image build still succeeded.

The high Next.js advisories require middleware, Server Actions, rewrites with attacker-controlled hostnames, or dynamic server behavior absent here. PostCSS/nanoid findings require untrusted CSS or direct custom-generator inputs absent here. Sharp/libvips requires untrusted image processing, disabled by this build. Gate 11 therefore passes for practical exposure, but upgrades remain required maintenance.

## 21. Git LFS / Large File Audit

Thirteen PPTX objects (about 472 MiB) are stored in LFS and all pass LFS object verification. The regular `public/resources` Git blobs total about 483 MiB. Public-repository conversion makes LFS downloads and historical Office metadata public. A history cleanup must handle both prior non-LFS Office blobs and later LFS pointers/objects; ordinary file deletion at HEAD is insufficient.

## 22. Public Repository Configuration Recommendations

Before accepting contributions, enable dependency graph, Dependabot alerts/security updates, secret scanning and push protection, CodeQL/default setup, private vulnerability reporting, and a `SECURITY.md`. Add `CODEOWNERS`; require pull requests, at least one independent review, resolved conversations, signed/verified policy as appropriate, status checks, linear history or controlled merges, and blocked force-push/deletion on `main`. Restrict allowed Actions to GitHub-owned/verified allowlisted actions and require SHA pins where the plan permits.

The current private plan returned 403 for protection/rulesets; configure these immediately after the repository becomes eligible as public, with no contribution window before enforcement.

## 23. Release Gates

| Gate | Result | Basis |
|---|---|---|
| 1 — Current tree contains no exposed secrets | PASS | No credential signatures or sensitive files found |
| 2 — Git history contains no unresolved secrets | PASS | All reachable text/LFS history scanned; no secrets found |
| 3 — No sensitive student/member information would become public | FAIL | Photos, GPS, student addresses, author metadata |
| 4 — Admin authentication is server-side and robust | NOT APPLICABLE | No admin/auth system |
| 5 — Sensitive operations enforce server-side authorization | NOT APPLICABLE | No application mutations |
| 6 — File upload handling is acceptably secured | NOT APPLICABLE | No runtime upload |
| 7 — Object-storage credentials are server-side only | PASS | No credentials exist in application or history |
| 8 — Database privileged credentials are server-side only | NOT APPLICABLE | No database |
| 9 — GitHub Actions cannot expose secrets to untrusted PRs | PASS | No PR trigger; no repository/environment secrets |
| 10 — Vercel previews/deployments do not expose privileged credentials | MANUAL VERIFICATION REQUIRED | Multiple unprotected projects/environments; variables unavailable |
| 11 — No critical/high dependency vulnerability creates practical exposure | PASS | Advisories not reachable in current static architecture |
| 12 — Public GitHub security settings are ready | FAIL | Secret/code scanning off; no ruleset/SECURITY/CODEOWNERS |

## 24. Required Remediations Before Public Release

Complete every P0 item: approve/remove/anonymize people in photos; strip GPS; replace student contact data; define a public resource allowlist; scrub Office/PDF/Git identities; rewrite affected Git and LFS history; verify Vercel fork/secret controls and remove duplicate projects; add protective ignore/secret-scan controls; enable the public GitHub security baseline; and rerun the full audit on the final remote SHA.

Credential rotation is not required by this audit. History rewrite and an eventual coordinated force push are required for privacy cleanup.

## 25. Recommended Hardening After Public Release

Patch dependencies; repair CI permissions and lockfile use; pin/allowlist Actions; sandbox contributed binary processing; add runtime HTML sanitization and CSP; configure live security headers; retire stale Pages/Vercel paths; automate EXIF/Office-metadata and consent checks in content review.

## 26. Manual Verification Items

- Written consent/authorization for each identifiable child, adult, student officer, quote, and school association.
- R2 bucket ACL, CORS, write identities, object versioning, and overwrite process.
- Every Vercel project's fork approval, preview variables, production branch, deployment protection, logs, and stale-project removal.
- GitHub organization plan and the exact sequence for making the repository eligible and immediately applying rulesets/security features.
- Legal/copyright authorization for Office/PDF teaching materials and public redistribution through Git/LFS.
- Live response headers and asset inventory after the final deployment.

## 27. Commands and Methods Used

Read-only Git reconnaissance and full-object fetch; `git rev-list`, `git cat-file`, `git grep`, tree/ref/path inspection, commit/diff history, `git lfs fetch --all`, `git lfs fsck`; custom redacting scanners in this audit directory; OOXML ZIP/core/custom/comment/relation inspection; PDF metadata/active-content checks with pypdf/Poppler; Pillow EXIF inspection; visual contact-sheet review; `pnpm audit`, frozen install, typecheck and production build; generated bundle signature/source-map checks; GitHub connector and read-only `gh api`/workflow/deployment inspection.

No production exploit, login probing, upload, deletion, visibility change, secret read, credential rotation, environment edit, branch deletion, tag deletion, history rewrite, or force push was performed.

## 28. Limitations

- Only reachable refs on the remote/local repository can be audited; server-pruned unreachable objects and unknown external forks are unavailable.
- The remote advanced during the audit; it was refreshed and the final scans target `f23bfd9`. Any later push invalidates the snapshot.
- No consent records were supplied, so presence of authorization cannot be inferred from image selection.
- Vercel and Cloudflare control-plane settings/secret values were not accessed. Their gates remain manual.
- The GitHub private-plan configuration prevented inspection/creation of branch protection and rulesets; no settings were changed.
- Secret detection is pattern/context based. A dedicated scanner was not installed, and GitHub secret scanning is currently disabled; enabling push protection and rescanning is required defense in depth.
- Visual review confirms widespread identifiable people but is not a biometric inventory and does not determine legal consent.

**DO NOT MAKE REPOSITORY PUBLIC**
