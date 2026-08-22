# Secret Scan Summary

## Scope and Result

Final audited ref: `origin/main` at `f23bfd9cafe01446467896658d0e7a414773f4b2`.

- Reachable commits: 123
- Reachable named Git objects enumerated: 1,416
- Historical text blobs scanned: 483
- Binary blobs separately classified/parsed: 466 unique media blobs
- Remote/local refs: `main`, `origin/main`, `origin/dev/vercel-ready`, tag `0.1.0`
- Git LFS payloads fetched and verified: 13 of 13
- Current-tree probable secrets: **0**
- Historical probable secrets: **0**
- Credential rotation required: **NO**
- Secret-driven history rewrite required: **NO**
- Privacy-driven history rewrite required: **YES**

## Current Tree

The only sensitive-style filename present outside the audit directory is `.env.example`. It contains the public R2 read hostname documented for browser use. No `.env`, `.env.local`, production environment file, private key, certificate, service-account JSON, credential JSON, database dump, backup archive, or ignored-but-tracked file was found.

The current `.gitignore` does not protect `.env*`, `.vercel/`, private keys, or credential JSON. This is a hygiene finding, not evidence of a current secret.

## Historical Scan

The scan covered exact/prefix patterns for common GitHub, AWS, Google, Slack, Stripe, OpenAI-style, JWT, private-key, credentialed URL, and context-sensitive secret assignments, including database, R2, Cloudflare, Vercel, auth/session, SMTP, and API-key names. Findings record only category/location and never matched values.

No historical `.env` other than `.env.example`, key/certificate file, credentials file, service-account file, or private-key header was found. Deleted Playwright snapshots and build metadata contained privacy data but no credential signature.

## Client Bundle Check

A frozen-lockfile production build succeeded. Tested private-key/token signatures appeared in zero `.next`/`out` files. The public R2 hostname appeared as expected. The three student email addresses appeared in 12 build-output files; they are privacy findings, not secrets.

No production browser source maps were generated.

## False Positives and Public Identifiers

The following are public by design and were not classified as secrets:

- `NEXT_PUBLIC_RESOURCE_BASE_URL` and its `r2.dev` hostname
- `NEXT_PUBLIC_BASE_PATH`
- GitHub Pages workflow expressions and the runtime-provided `GITHUB_TOKEN`
- package integrity hashes, Git object IDs, LFS OIDs, analytics-free static IDs

## Limitations

Detection is pattern/context based and cannot prove that an opaque unknown-format value is harmless. GitHub secret scanning is currently disabled and no standalone gitleaks/trufflehog binary was installed. Enable GitHub secret scanning and push protection and rerun a dedicated scanner after remediation/history rewrite.

No secret value is reproduced in this report or any scan result.
