# Remediation Plan

No remediation in this plan has been executed.

## P0 — Must complete before changing repository visibility

### P0-1 — PUB-001: approve or remove identifiable people

- Affected: `public/resources/METC/活动成果展览/**`
- Change: create a per-file authorization ledger outside public Git; remove or anonymize every image lacking explicit child/guardian/school/adult publication permission; review quotes and school association.
- Change risk: content loss, broken album IDs/links, consent-record handling risk.
- Credential rotation: No.
- History rewrite: Yes for removed/anonymized originals.
- Force push: Yes.
- Manual verification: Yes, content owner/legal/safeguarding review.

### P0-2 — PUB-002: strip GPS and other sensitive media metadata

- Affected: 17 confirmed GPS images plus the complete approved media corpus.
- Change: generate fresh display derivatives with metadata removed; verify absence of GPS/device/host/date fields; never commit originals to public Git.
- Change risk: orientation/color-profile loss if conversion is careless; broken generated hashes.
- Credential rotation: No.
- History rewrite: Yes.
- Force push: Yes.
- Manual verification: Yes, byte-level EXIF rescan and visual QA.

### P0-3 — PUB-003: replace personal student contacts

- Affected: `content/en.ts`, `content/zh.ts`, historical snapshots.
- Change: use role aliases/group mailbox or document explicit student consent; minimize name/role detail; rebuild and scan bundles.
- Change risk: contact continuity.
- Credential rotation: No (addresses are identifiers, not credentials).
- History rewrite: Yes if existing data is not approved for permanent public disclosure.
- Force push: Yes if rewritten.
- Manual verification: Yes.

### P0-4 — PUB-004/META-001: establish the public resource allowlist

- Affected: `public/resources/**`, `resources/**` history, pipeline, generated indexes, R2 objects.
- Change: keep only reviewed, sanitized display derivatives in public distribution; move raw Office/PDF/HEIC/video/original photos to controlled storage; scrub Office/PDF author/custom metadata; regenerate previews; fix docs and paths.
- Change risk: large content migration, broken URLs, R2 synchronization, LFS cleanup complexity.
- Credential rotation: No.
- History rewrite: Yes, including Git and LFS.
- Force push: Yes.
- Manual verification: Yes, link crawl, R2 inventory, metadata/render review, copyright approval.

### P0-5 — GIT-PII-001: resolve Git author privacy

- Affected: 120 commits with non-noreply identities.
- Change: obtain documented approval or rewrite to approved noreply/organization identities; configure contributor noreply/signoff policy.
- Change risk: every rewritten SHA changes; signatures/PR links/releases become stale.
- Credential rotation: No.
- History rewrite: Yes if identities are not approved.
- Force push: Yes.
- Manual verification: Yes, all affected authors.

### P0-6 — DEPLOY-001: audit Vercel and deployment integrations

- Affected: multiple Vercel Preview/Production environments/projects.
- Change: inventory/disconnect duplicates; require approval for fork previews; remove privileged Preview variables; protect Production; restrict production branch; use a benign fork canary test.
- Change risk: preview/production interruption.
- Credential rotation: Only if manual review finds exposure; otherwise No.
- History rewrite: No.
- Force push: No.
- Manual verification: Yes; release blocker.

### P0-7 — HYG-001/GH-001: prepare repository controls

- Affected: `.gitignore`, GitHub repository/org settings.
- Change: ignore `.env*` with `.env.example` exception, `.vercel/`, key/cert/credential files, dumps/backups; add CI/pre-commit secret scanning; add `SECURITY.md` and `CODEOWNERS`; enable secret scanning/push protection, dependency graph/Dependabot, CodeQL, private vulnerability reporting, and main ruleset immediately when public eligibility is available.
- Change risk: accidental ignore of intentional examples; temporary protection gap during visibility transition.
- Credential rotation: No.
- History rewrite: No for new rules; Yes separately for P0 privacy cleanup.
- Force push: No for settings/rules.
- Manual verification: Yes, including a post-visibility settings checklist before accepting PRs.

### P0-8 — Coordinated history rewrite and verification

- Affected branches: `main`, `dev/vercel-ready`; tag `0.1.0`; Git/LFS objects.
- Change: after preserving an access-controlled backup and freezing pushes, use an explicitly approved history-rewrite procedure to remove/rewrite privacy blobs and author metadata; expire/clean LFS objects as appropriate; force-push all affected refs; have collaborators reclone; rerun this audit.
- Change risk: highest—rewritten SHAs, broken forks/PRs, collaborator disruption, missed refs, LFS retention.
- Credential rotation: No based on current evidence.
- History rewrite: Yes.
- Force push: Yes.
- Manual verification: Yes; separate explicit authorization is required before execution.

## P1 — Should complete before or immediately after publication

### P1-1 — CI-001: least-privilege reproducible CI

- Affected: `.github/workflows/deploy.yml`, repository Actions policy.
- Change: build job `contents: read`; deploy job `pages: write`/`id-token: write`; pnpm frozen lockfile; reviewed SHA-pinned/allowlisted actions.
- Risk: workflow syntax/cache breakage.
- Rotation/history/force push: No/No/No.
- Manual verification: Yes, fork/push/manual-dispatch tests.

### P1-2 — DEP-001: dependency remediation

- Affected: `package.json`, `pnpm-lock.yaml`.
- Change: update Next.js and transitive sharp/postcss/nanoid to patched versions; rerun audit/typecheck/build.
- Risk: framework behavior/build regression.
- Rotation/history/force push: No/No/No.
- Manual verification: Yes.

### P1-3 — APP-001/HDR-001: browser content trust and headers

- Affected: `components/teaching/course-syllabus.tsx`, R2 publishing, hosting config.
- Change: runtime sanitize or structured rendering; protect R2 writes; deploy CSP, frame protection, nosniff, Referrer-Policy, Permissions-Policy, and HSTS as host-appropriate.
- Risk: blocked images/fonts/content; sanitizer formatting changes.
- Rotation/history/force push: No/No/No.
- Manual verification: Yes, live header and syllabus tests.

### P1-4 — CONTRIB-001: sandbox resource conversion

- Affected: `tools/resource_pipeline/**`, contribution documentation.
- Change: isolated patched container/VM, no secrets/home mounts, resource limits, MIME/archive validation, malware scan, approval gate.
- Risk: pipeline complexity and converter output differences.
- Rotation/history/force push: No/No/No.
- Manual verification: Yes, safe fixture and failure-mode tests.

## P2 — Security hardening / maintenance

### P2-1 — DOC-001/OPS-001: reconcile deployment documentation

- Affected: README and deployment/resource/image docs; stale GitHub Pages/Vercel integrations.
- Change: document one authoritative architecture, neutralize personal paths, retire unused environments/workflows, add release/incident runbooks.
- Risk: low; operational misunderstanding during transition.
- Rotation/history/force push: No/No/No, except P0 privacy rewrite may also remove old docs.
- Manual verification: Yes.

### P2-2 — Continuous public-content controls

- Add CI checks for secrets, EXIF GPS, Office/PDF personal metadata, unexpected binaries, LFS growth, unsafe HTML, dependency advisories, and public-resource allowlist violations.
- Require periodic Vercel/R2/GitHub access review and a benign external-contributor simulation.
- Risk: false positives and maintenance overhead.
- Rotation/history/force push: No/No/No.
- Manual verification: Initial tuning and quarterly review.

## History Rewrite Guidance

History rewrite required: **YES**  
Credential rotation required: **NO**  
Affected branches: `main`, `dev/vercel-ready`  
Affected tags: `0.1.0`  
Potential Git LFS implications: both older ordinary presentation blobs and 13 later LFS objects/pointers must be handled; verify remote LFS retention/cleanup.  
Collaborator impact: coordinated freeze and reclone/reset required.  
Force push eventually required: **YES**

Credential revocation, if a later scan discovers a credential, must occur independently of and before relying on history cleanup.
