#!/usr/bin/env python3
"""Read-only secret and privacy-pattern scan across every reachable Git blob.

The output deliberately records locations and categories, never matched values.
"""

from __future__ import annotations

import json
import re
import subprocess
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).with_name("SCAN_RESULTS.json")
SCOPE_ARGS = ("--branches", "--remotes", "--tags")


SECRET_PATTERNS: list[tuple[str, re.Pattern[bytes]]] = [
    ("private-key", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----")),
    ("github-token", re.compile(rb"\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{40,})\b")),
    ("aws-access-key", re.compile(rb"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b")),
    ("google-api-key", re.compile(rb"\bAIza[0-9A-Za-z_-]{35}\b")),
    ("slack-token", re.compile(rb"\bxox[baprs]-[A-Za-z0-9-]{10,}\b")),
    ("stripe-secret", re.compile(rb"\bsk_(?:live|test)_[0-9A-Za-z]{16,}\b")),
    ("openai-style-key", re.compile(rb"\bsk-[A-Za-z0-9_-]{20,}\b")),
    ("jwt", re.compile(rb"\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b")),
    ("credentialed-url", re.compile(rb"\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis|amqps?|https?)://[^\s/:@]{1,80}:[^\s/@]{3,160}@", re.I)),
]

GENERIC_ASSIGNMENT = re.compile(
    rb"(?im)^\s*(?:(?:export|const|let|var)\s+)?['\"]?"
    rb"([A-Z0-9_-]*(?:API_?KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PRIVATE_KEY|CLIENT_SECRET)|"
    rb"ACCESS_KEY|SECRET_KEY|DATABASE_URL|MONGODB_URI|POSTGRES_URL|"
    rb"AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY|CLOUDFLARE(?:_API)?_TOKEN|"
    rb"R2_(?:ACCESS_KEY_ID|SECRET_ACCESS_KEY)|VERCEL_TOKEN|GITHUB_TOKEN|GH_TOKEN|"
    rb"JWT_SECRET|NEXTAUTH_SECRET|AUTH_SECRET|SESSION_SECRET|SMTP_PASSWORD|"
    rb"RESEND_API_KEY|STRIPE_SECRET(?:_KEY)?|OPENAI_API_KEY)['\"]?"
    rb"\s*[:=]\s*['\"]?([^\s'\"#,;]{6,})"
)

EMAIL = re.compile(rb"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
CN_PHONE = re.compile(rb"(?<!\d)(?:\+?86[- ]?)?1[3-9]\d{9}(?!\d)")
STUDENT_ID = re.compile(rb"\bs\d{5,10}(?:\.[A-Za-z][A-Za-z.-]*)?\b", re.I)


def git(*args: str, input_data: bytes | None = None) -> bytes:
    return subprocess.run(
        ["git", *args], cwd=ROOT, input=input_data, check=True, capture_output=True
    ).stdout


def reachable_objects() -> list[tuple[str, str]]:
    entries: list[tuple[str, str]] = []
    for raw in git("rev-list", "--objects", *SCOPE_ARGS).splitlines():
        oid, _, path = raw.decode("utf-8", "replace").partition(" ")
        if path:
            entries.append((oid, path))
    return entries


def tree_blobs(ref: str) -> set[str]:
    result: set[str] = set()
    for raw in git("ls-tree", "-r", ref).splitlines():
        left = raw.split(b"\t", 1)[0].split()
        if len(left) >= 3 and left[1] == b"blob":
            result.add(left[2].decode())
    return result


def likely_text(data: bytes) -> bool:
    if not data:
        return True
    sample = data[:8192]
    if b"\x00" in sample:
        return False
    controls = sum(byte < 9 or 13 < byte < 32 for byte in sample)
    return controls / len(sample) < 0.02


def placeholder(value: bytes) -> bool:
    lowered = value.lower()
    markers = (
        b"example", b"placeholder", b"changeme", b"your_", b"your-", b"<", b"${",
        b"process.env", b"redacted", b"xxxx", b"dummy", b"test", b"secret_name",
    )
    return any(marker in lowered for marker in markers)


def introduction(oid: str) -> dict[str, str]:
    rows = git("log", *SCOPE_ARGS, "--reverse", f"--find-object={oid}", "--format=%H%x09%aI").decode().splitlines()
    if not rows:
        return {"commit": "unknown", "date": "unknown"}
    commit, _, date = rows[0].partition("\t")
    return {"commit": commit, "date": date}


def main() -> None:
    current_origin = tree_blobs("origin/main")
    current_head = tree_blobs("HEAD")
    paths_by_oid: dict[str, set[str]] = defaultdict(set)
    for oid, path in reachable_objects():
        paths_by_oid[oid].add(path)

    secret_hits: list[dict[str, object]] = []
    privacy_hits: list[dict[str, object]] = []
    scanned_text_blobs = 0
    skipped_binary_blobs = 0
    skipped_oversize_blobs = 0
    skipped_non_blob_objects = 0

    for oid, paths in paths_by_oid.items():
        if git("cat-file", "-t", oid).strip() != b"blob":
            skipped_non_blob_objects += 1
            continue
        size = int(git("cat-file", "-s", oid))
        if size > 20_000_000:
            skipped_oversize_blobs += 1
            continue
        data = git("cat-file", "blob", oid)
        if not likely_text(data):
            skipped_binary_blobs += 1
            continue
        scanned_text_blobs += 1
        lines = data.splitlines()
        per_blob_secret: set[tuple[str, int]] = set()
        per_blob_privacy: set[tuple[str, int]] = set()
        for line_no, line in enumerate(lines, start=1):
            for category, pattern in SECRET_PATTERNS:
                if pattern.search(line):
                    per_blob_secret.add((category, line_no))
            for match in GENERIC_ASSIGNMENT.finditer(line):
                if not placeholder(match.group(2)):
                    name = match.group(1).decode("ascii", "replace").upper()
                    per_blob_secret.add((f"generic-assignment:{name}", line_no))
            if EMAIL.search(line):
                per_blob_privacy.add(("email", line_no))
            if CN_PHONE.search(line):
                per_blob_privacy.add(("cn-phone", line_no))
            if STUDENT_ID.search(line):
                per_blob_privacy.add(("student-id-pattern", line_no))

        if per_blob_secret:
            intro = introduction(oid)
            for category, line_no in sorted(per_blob_secret):
                secret_hits.append({
                    "category": category,
                    "object": oid,
                    "paths": sorted(paths),
                    "line": line_no,
                    "in_origin_main": oid in current_origin,
                    "in_head": oid in current_head,
                    **intro,
                })
        if per_blob_privacy:
            intro = introduction(oid)
            for category, line_no in sorted(per_blob_privacy):
                privacy_hits.append({
                    "category": category,
                    "object": oid,
                    "paths": sorted(paths),
                    "line": line_no,
                    "in_origin_main": oid in current_origin,
                    "in_head": oid in current_head,
                    **intro,
                })

    payload = {
        "scope": {
            "reachable_named_blobs": len(paths_by_oid),
            "text_blobs_scanned": scanned_text_blobs,
            "binary_blobs_skipped": skipped_binary_blobs,
            "oversize_blobs_skipped": skipped_oversize_blobs,
            "non_blob_objects_skipped": skipped_non_blob_objects,
            "refs": git(
                "for-each-ref", "--format=%(refname)",
                "refs/heads", "refs/remotes", "refs/tags",
            ).decode().splitlines(),
        },
        "secret_hits_redacted": secret_hits,
        "privacy_hits_redacted": privacy_hits,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({
        "scope": payload["scope"],
        "secret_hit_locations": len(secret_hits),
        "privacy_hit_locations": len(privacy_hits),
        "output": str(OUT.relative_to(ROOT)),
    }, indent=2))


if __name__ == "__main__":
    main()
