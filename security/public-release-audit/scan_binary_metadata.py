#!/usr/bin/env python3
"""Inspect reachable media/Office/PDF blobs without recording metadata values."""

from __future__ import annotations

import hashlib
import io
import json
import re
import subprocess
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import ExifTags, Image

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None


ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).with_name("BINARY_METADATA_RESULTS.json")
SCOPE_ARGS = ("--branches", "--remotes", "--tags")
MEDIA_EXTENSIONS = {
    ".doc", ".docx", ".ppt", ".pptx", ".pdf", ".jpg", ".jpeg", ".png",
    ".webp", ".gif", ".avif", ".heic", ".mp4", ".mov",
}
OOXML_EXTENSIONS = {".docx", ".pptx"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic"}

EMAIL = re.compile(rb"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
CN_PHONE = re.compile(rb"(?<!\d)(?:\+?86[- ]?)?1[3-9]\d{9}(?!\d)")
STUDENT_ID = re.compile(rb"\bs\d{5,10}(?:\.[A-Za-z][A-Za-z.-]*)?\b", re.I)
LFS_OID = re.compile(rb"^oid sha256:([0-9a-f]{64})$", re.M)

CORE_FIELDS = {
    "creator", "lastModifiedBy", "title", "subject", "description", "keywords",
    "category", "revision", "created", "modified", "lastPrinted",
}
SENSITIVE_EXIF = {
    "GPSInfo", "Artist", "Copyright", "ImageDescription", "UserComment", "XPAuthor",
    "XPComment", "XPKeywords", "XPSubject", "Make", "Model", "BodySerialNumber",
    "CameraOwnerName", "LensSerialNumber", "DateTime", "DateTimeOriginal", "DateTimeDigitized",
    "Software", "HostComputer",
}


def git(*args: str) -> bytes:
    return subprocess.run(
        ["git", "-c", "core.quotePath=false", *args], cwd=ROOT,
        check=True, capture_output=True,
    ).stdout


def fingerprint(value: object) -> dict[str, object]:
    text = str(value).strip()
    lowered = text.lower()
    generic = any(marker in lowered for marker in (
        "microsoft office user", "libreoffice", "python", "administrator", "unknown", "default",
    ))
    return {
        "sha256_prefix": hashlib.sha256(text.encode("utf-8", "replace")).hexdigest()[:12],
        "length": len(text),
        "contains_email": bool(re.search(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", text, re.I)),
        "classification": "generic-tool" if generic else "needs-review",
    }


def privacy_counts(data: bytes) -> dict[str, int]:
    return {
        "email": len(EMAIL.findall(data)),
        "cn_phone": len(CN_PHONE.findall(data)),
        "student_id_pattern": len(STUDENT_ID.findall(data)),
    }


def current_tree() -> tuple[set[str], dict[str, str]]:
    objects: set[str] = set()
    paths: dict[str, str] = {}
    for raw in git("ls-tree", "-r", "origin/main").splitlines():
        left, _, path_raw = raw.partition(b"\t")
        fields = left.split()
        if len(fields) >= 3 and fields[1] == b"blob":
            oid = fields[2].decode()
            path = path_raw.decode("utf-8", "replace")
            objects.add(oid)
            paths[path] = oid
    return objects, paths


def reachable_media() -> dict[str, set[str]]:
    result: dict[str, set[str]] = defaultdict(set)
    for raw in git("rev-list", "--objects", *SCOPE_ARGS).splitlines():
        oid_raw, sep, path_raw = raw.partition(b" ")
        if not sep:
            continue
        path = path_raw.decode("utf-8", "replace")
        if Path(path).suffix.lower() not in MEDIA_EXTENSIONS:
            continue
        oid = oid_raw.decode()
        if git("cat-file", "-t", oid).strip() == b"blob":
            result[oid].add(path)
    return result


def resolve_blob(oid: str) -> tuple[bytes | None, dict[str, object]]:
    data = git("cat-file", "blob", oid)
    if not data.startswith(b"version https://git-lfs.github.com/spec/v1"):
        return data, {"lfs": False}
    match = LFS_OID.search(data)
    if not match:
        return None, {"lfs": True, "available": False, "reason": "malformed-pointer"}
    lfs_oid = match.group(1).decode()
    path = ROOT / ".git" / "lfs" / "objects" / lfs_oid[:2] / lfs_oid[2:4] / lfs_oid
    if not path.exists():
        return None, {"lfs": True, "available": False, "oid_prefix": lfs_oid[:12]}
    return path.read_bytes(), {"lfs": True, "available": True, "oid_prefix": lfs_oid[:12]}


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def inspect_ooxml(data: bytes) -> dict[str, object]:
    result: dict[str, object] = {
        "core_properties": {},
        "custom_properties": [],
        "comment_parts": [],
        "tracked_changes": {"insertions": 0, "deletions": 0},
        "external_relationship_schemes": [],
        "embedded_object_parts": [],
        "macro_parts": [],
        "privacy_pattern_counts": {"email": 0, "cn_phone": 0, "student_id_pattern": 0},
    }
    schemes: set[str] = set()
    totals = result["privacy_pattern_counts"]
    assert isinstance(totals, dict)
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        names = archive.namelist()
        result["comment_parts"] = sorted(name for name in names if "comment" in name.lower())
        result["embedded_object_parts"] = sorted(name for name in names if "/embeddings/" in name.lower())
        result["macro_parts"] = sorted(name for name in names if "vbaproject" in name.lower() or name.lower().endswith(".bin"))
        for name in names:
            if not (name.lower().endswith((".xml", ".rels"))):
                continue
            try:
                payload = archive.read(name)
            except Exception:
                continue
            counts = privacy_counts(payload)
            for key, value in counts.items():
                totals[key] = int(totals[key]) + value
            result["tracked_changes"]["insertions"] += len(re.findall(rb"<w:ins\b", payload))
            result["tracked_changes"]["deletions"] += len(re.findall(rb"<w:del\b", payload))
            if name == "docProps/core.xml":
                try:
                    root = ET.fromstring(payload)
                    for element in root:
                        field = local_name(element.tag)
                        if field in CORE_FIELDS and element.text and element.text.strip():
                            result["core_properties"][field] = fingerprint(element.text)
                except ET.ParseError:
                    result["core_properties_parse_error"] = True
            elif name == "docProps/custom.xml":
                try:
                    root = ET.fromstring(payload)
                    result["custom_properties"] = sorted(
                        prop.attrib.get("name", "unnamed") for prop in root if list(prop)
                    )
                except ET.ParseError:
                    result["custom_properties_parse_error"] = True
            if name.lower().endswith(".rels"):
                try:
                    root = ET.fromstring(payload)
                    for rel in root:
                        if rel.attrib.get("TargetMode") == "External":
                            target = rel.attrib.get("Target", "")
                            scheme = target.split(":", 1)[0].lower() if ":" in target else "relative"
                            schemes.add(scheme)
                except ET.ParseError:
                    pass
    result["external_relationship_schemes"] = sorted(schemes)
    return result


def inspect_pdf(data: bytes) -> dict[str, object]:
    result: dict[str, object] = {
        "metadata": {}, "pages": None, "encrypted": None, "form_fields": None,
        "javascript_markers": len(re.findall(rb"/(?:JS|JavaScript)\b", data)),
        "launch_markers": len(re.findall(rb"/Launch\b", data)),
        "uri_markers": len(re.findall(rb"/URI\b", data)),
        "privacy_pattern_counts_raw": privacy_counts(data),
    }
    if PdfReader is None:
        result["reader_error"] = "pypdf-unavailable"
        return result
    try:
        reader = PdfReader(io.BytesIO(data), strict=False)
        result["pages"] = len(reader.pages)
        result["encrypted"] = reader.is_encrypted
        if not reader.is_encrypted:
            result["metadata"] = {
                str(key): fingerprint(value)
                for key, value in (reader.metadata or {}).items()
                if value is not None and str(value).strip()
            }
            result["form_fields"] = len(reader.get_fields() or {})
    except Exception as exc:
        result["reader_error"] = type(exc).__name__
    return result


def inspect_image(data: bytes) -> dict[str, object]:
    result: dict[str, object] = {"sensitive_exif": {}, "format": None, "size": None}
    try:
        with Image.open(io.BytesIO(data)) as image:
            result["format"] = image.format
            result["size"] = list(image.size)
            exif = image.getexif()
            for key, value in exif.items():
                name = ExifTags.TAGS.get(key, str(key))
                if name in SENSITIVE_EXIF and value not in (None, "", b""):
                    result["sensitive_exif"][name] = fingerprint(value)
            if "GPSInfo" in result["sensitive_exif"]:
                try:
                    gps_ifd = exif.get_ifd(ExifTags.IFD.GPSInfo)
                    gps_fields = sorted(ExifTags.GPSTAGS.get(key, str(key)) for key in gps_ifd)
                    result["gps_fields"] = gps_fields
                    result["has_gps_coordinates"] = (
                        "GPSLatitude" in gps_fields and "GPSLongitude" in gps_fields
                    )
                except Exception as exc:
                    result["gps_parse_error"] = type(exc).__name__
            if image.info.get("xml"):
                result["has_xml_metadata"] = True
            if image.info.get("icc_profile"):
                result["has_icc_profile"] = True
    except Exception as exc:
        result["reader_error"] = type(exc).__name__
    return result


def main() -> None:
    current_objects, _current_paths = current_tree()
    objects = reachable_media()
    records: list[dict[str, object]] = []
    totals = defaultdict(int)
    for oid, paths in objects.items():
        suffixes = sorted({Path(path).suffix.lower() for path in paths})
        data, lfs = resolve_blob(oid)
        record: dict[str, object] = {
            "object": oid,
            "paths": sorted(paths),
            "suffixes": suffixes,
            "in_origin_main": oid in current_objects,
            "lfs": lfs,
        }
        if data is None:
            record["inspection_error"] = "content-unavailable"
            totals["content_unavailable"] += 1
        else:
            suffix = suffixes[0]
            record["size"] = len(data)
            if suffix in OOXML_EXTENSIONS and zipfile.is_zipfile(io.BytesIO(data)):
                record["inspection"] = inspect_ooxml(data)
                totals["ooxml"] += 1
            elif suffix == ".pdf":
                record["inspection"] = inspect_pdf(data)
                totals["pdf"] += 1
            elif suffix in IMAGE_EXTENSIONS:
                record["inspection"] = inspect_image(data)
                totals["image"] += 1
            else:
                record["inspection"] = {
                    "privacy_pattern_counts_raw": privacy_counts(data),
                    "metadata_review": "manual-required",
                }
                totals["other"] += 1
        records.append(record)
    payload = {
        "scope": {
            "unique_media_blobs": len(records),
            "current_origin_main_media_blobs": sum(1 for record in records if record["in_origin_main"]),
            "by_parser": dict(sorted(totals.items())),
            "pypdf_available": PdfReader is not None,
        },
        "records": records,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"scope": payload["scope"], "output": str(OUT.relative_to(ROOT))}, indent=2))


if __name__ == "__main__":
    main()
