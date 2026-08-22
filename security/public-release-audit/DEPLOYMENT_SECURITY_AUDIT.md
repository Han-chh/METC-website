# Deployment Security Audit

## Deployment Model

The repository declares a static Next.js export and contains a GitHub Pages workflow. External GitHub deployment metadata also proves multiple Vercel project integrations. Documentation inconsistently describes deployment as undecided, Vercel-based, GitHub Pages-based, and R2-only.

## GitHub Pages / Actions

Workflow triggers: push to `main` and `workflow_dispatch` only. There is no `pull_request`, `pull_request_target`, or `workflow_run`. Repository/environment Actions secrets both count zero.

Positive controls:

- default GitHub workflow token permission is read;
- workflow checkout is read-only;
- external PRs cannot directly trigger the repository workflow;
- deployment uses the GitHub Pages environment.

Weaknesses:

- workflow-level `pages: write` and `id-token: write` are inherited by the build job;
- npm installs semver ranges and ignores the pnpm lockfile;
- action references are mutable major tags;
- all Actions are permitted; SHA pinning is not required;
- the Pages environment allows admin bypass;
- GitHub Pages is disabled, so the latest three deployment jobs fail at deployment with HTTP 404 after successful builds/artifact uploads.

If Pages is enabled while `public/resources` remains, Next static export will copy the regular raw public-resource tree into `out`. LFS checkout is not enabled by the workflow, so LFS PPTX paths may be pointer files, but regular PDFs, DOCX, images, HEIC, and video remain exposed.

## Vercel

No `vercel.json`, `.vercelignore`, linked-project file, or repo-visible environment definition exists. GitHub shows:

- five named Preview project variants plus multiple Production variants;
- 28 Vercel-style bot deployment records;
- no protection rules on those Preview/Production environments;
- deployments from non-main commit refs, confirming automatic preview activity.

Required manual checks before publication:

1. Enumerate the corresponding Vercel projects and owners; delete/disconnect stale duplicates.
2. Confirm external-fork PRs do not build until a trusted maintainer approves.
3. Confirm Preview receives no production database, R2 write, API, deploy, or organization credential.
4. Separate Preview/Production variables and ensure malicious build scripts cannot print privileged values.
5. Protect Production; restrict it to the intended default branch; review bypass roles.
6. Review build/deployment logs and artifacts for environment leakage.
7. Run a benign fork PR with canary, non-secret values before enabling public contributions.

Gate 10 remains `MANUAL VERIFICATION REQUIRED`.

## R2 / Cloudflare

Repository code uses a public `r2.dev` read hostname and no credential. The upload process is manual through the Cloudflare console. Verify public access is limited to intended object reads, anonymous/object writes are denied, CORS permits only necessary origins/methods/headers, versioning/recovery is configured, and overwrite roles are least privilege. Because R2 syllabus HTML is injected into the site DOM, write security is a browser-code security boundary.

## GitHub Repository Configuration

Live read-only checks found:

- visibility `PRIVATE`, viewer permission `ADMIN`, default branch `main`;
- no current branch protection/ruleset available on the private-plan state;
- secret scanning disabled;
- code scanning/Advanced Security unavailable/disabled;
- no `SECURITY.md` or `CODEOWNERS`;
- all Actions allowed and SHA pinning not required;
- private vulnerability reporting endpoint unavailable;
- no GitHub Pages site currently configured.

Before accepting public contributions, configure an enforceable main ruleset, required PR review/status checks, force-push/deletion denial, CODEOWNERS, security policy, dependency graph/Dependabot, secret scanning/push protection, CodeQL/default setup, private vulnerability reporting, and restricted SHA-pinned Actions.

## Security Headers

No repository-managed CSP, frame protection, nosniff, Referrer-Policy, Permissions-Policy, or HSTS configuration exists. HSTS is normally host-controlled. Select the authoritative host, then verify live headers. For the static export, configure headers at Vercel/edge/CDN where supported; GitHub Pages does not provide arbitrary header configuration. A meta CSP can supply some directives but not `frame-ancestors` or all header-only protections.
