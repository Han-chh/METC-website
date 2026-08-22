# Git History Audit

## Repository State

| Item | Result |
|---|---|
| Local branch | `main` at `3f2b7e7` |
| Audited remote default branch | `origin/main` at `f23bfd9` |
| Local divergence | eight commits behind; no local code modifications before audit |
| Reachable commits | 123 |
| Remote heads observed | `main`, `dev/vercel-ready` |
| Tag | `0.1.0` |
| Sparse checkout | enabled; selected source/docs paths only |
| Partial clone | initially `blob:none`; all reachable blobs fetched for audit |
| Missing reachable Git objects after fetch | 0 |
| LFS | 13 PPTX objects; all fetched; `git lfs fsck --objects` OK |

The audit used Git objects directly because the sparse worktree omitted most `public/resources/**` files.

## History Findings

### Credentials

No credential, token, password, private key, credentialed connection string, or historical secret file was identified. No credential rotation is required by the evidence available.

### Personal information

- Student leadership addresses were introduced at `5f72675` and persist in current bilingual content. Deleted Playwright snapshots duplicate them.
- Commit metadata has four author identity combinations. Three are non-noreply identities: 110 commits use a consumer `163.com` mailbox, eight expose a local workstation hostname, and two use a consumer `qq.com` mailbox. Values are intentionally not reproduced.
- Photo/GPS and Office/PDF identity metadata are reachable from common history and, where content was migrated to LFS, from both prior Git blobs and later LFS objects.
- Historical generated screenshots and Playwright state under `output/`, `.playwright-cli/`, and `tsconfig.tsbuildinfo` were later deleted but remain reachable.

### Resource-history sequence

1. Resource content was added under the resource system at `0c8e9c7`.
2. `0a0265c` replaced the public resource symlink with a real `public/resources` tree.
3. `b34e79e` moved 13 PPTX objects to LFS without removing the earlier non-LFS content from history.
4. `522861a` deleted `public/resources` on the Vercel/R2 branch.
5. The merge at `3f2b7e7` retained/reintroduced the public resource tree from the other parent.
6. Current `origin/main` at `f23bfd9` still has the full public resource tree, while newer docs incorrectly state that resources are R2-only and absent from Git.

## Required History Treatment

| Question | Answer |
|---|---|
| History rewrite required | **YES**, for privacy/data cleanup |
| Credential rotation required | **NO** based on this audit |
| Affected branches | `main`; `dev/vercel-ready` through shared ancestry |
| Affected tags | `0.1.0` through shared resource/privacy history |
| LFS implications | Rewrite/remove both LFS pointers/objects and earlier ordinary Office blobs; verify LFS storage after cleanup |
| Collaborator impact | Coordinated freeze; rewritten refs; invalidated SHAs/PR bases; all collaborators must reclone or carefully reset |
| Force push eventually required | **YES**, after approval and backup |

Credential revocation/rotation and history cleanup are independent operations. No rotation is indicated, but if later scanning finds a credential it must be revoked before or regardless of rewriting.

No rewrite, deletion, tag edit, branch edit, or force push was performed.
