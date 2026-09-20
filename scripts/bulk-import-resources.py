"""Bulk-import organics resources from CSV + photo folder into the microsite."""
from __future__ import annotations

import csv
import json
import re
import shutil
from pathlib import Path

CSV_PATH = Path(r"C:\Users\Ralph\Downloads\Resources_on_Organics_Microsite_3.csv")
PHOTOS_SRC = Path(r"C:\Users\Ralph\Downloads\Resources on Organics - Photos")
PROJECT = Path(r"C:\Users\Ralph\ZW.asia Organics Topic Microsite Sample")
PHOTOS_DST = PROJECT / "public" / "resources"
OUT_TS = PROJECT / "src" / "lib" / "resources-bulk.ts"

TOPIC_MAP = {
    "organics": "organics",
    "reuse": "reuse",
    "reduction": "reduction",
    "policy": "policy",
    "false solutions": "false-solutions",
    "false-solutions": "false-solutions",
    "climate": "climate",
    "waste management": "waste-management",
    "waste-management": "waste-management",
}


def slugify(title: str, num: str) -> str:
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:60]
    return f"{num.zfill(2)}-{s}" if s else f"resource-{num.zfill(2)}"


def parse_topics(raw: str) -> list[str]:
    if not raw:
        return ["organics"]
    parts = [p.strip().lower() for p in re.split(r"[,;]", raw) if p.strip()]
    out: list[str] = []
    for p in parts:
        key = TOPIC_MAP.get(p)
        if key and key not in out:
            out.append(key)
        elif not key:
            print("UNKNOWN TOPIC", repr(p))
    return out or ["organics"]


def find_photo(num: str, photo_col: str) -> str | None:
    candidates: list[str] = []
    if photo_col:
        candidates.append(photo_col.strip())
    n = num.strip()
    for ext in (".png", ".jpg", ".jpeg", ".webp"):
        candidates.append(f"{n.zfill(2)}{ext}")
        candidates.append(f"{n}{ext}")
    for c in candidates:
        if (PHOTOS_DST / c).exists():
            return c
    for p in PHOTOS_DST.iterdir():
        if p.is_file() and (
            p.stem.lstrip("0") == n.lstrip("0") or p.stem == n.zfill(2)
        ):
            return p.name
    return None


def parse_publish_date(raw: str) -> str:
    """Normalize Publishing Date to YYYY-MM-DD (day=01 when only month given)."""
    value = (raw or "").strip()
    if not value:
        return "2024-01-01"
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return value
    if re.fullmatch(r"\d{4}-\d{2}", value):
        return f"{value}-01"
    if re.fullmatch(r"\d{4}", value):
        return f"{value}-01-01"
    # fallback: try first 7/10 chars
    if re.fullmatch(r"\d{4}-\d{2}.*", value):
        return f"{value[:7]}-01"
    return "2024-01-01"

def main() -> None:
    PHOTOS_DST.mkdir(parents=True, exist_ok=True)
    for src in PHOTOS_SRC.iterdir():
        if src.is_file():
            shutil.copy2(src, PHOTOS_DST / src.name)

    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))

    resources = []
    for r in rows:
        num = str(r.get("#") or "").strip()
        title = (r.get("Title") or "").strip()
        link = (r.get("Link") or "").strip()
        desc = (r.get("Description") or "").strip()
        summary = (r.get("Short Summary") or "").strip()
        if not summary:
            summary = desc[:200] + ("…" if len(desc) > 200 else "")
        photo = find_photo(num, r.get("Photo") or "")
        topics = parse_topics(r.get("Topic") or "")
        publish_date = parse_publish_date(
            r.get("Publishing Date") or r.get("Publishing date") or ""
        )
        resources.append(
            {
                "id": f"bulk-{num.zfill(2)}",
                "slug": slugify(title, num),
                "title": title,
                "summary": summary,
                "topics": topics,
                "publishDate": publish_date,
                "photo": photo,
                "url": link or None,
                "content": desc or summary,
            }
        )

    lines: list[str] = [
        "// Auto-generated from Resources_on_Organics_Microsite CSV + Photos folder",
        "// Re-run scripts/bulk-import-resources.py to regenerate.",
        "import type { Resource } from './types';",
        "",
        "export const BULK_RESOURCES: Resource[] = [",
    ]

    for res in resources:
        lines.append("  {")
        lines.append(f"    id: {json.dumps(res['id'])},")
        lines.append(f"    slug: {json.dumps(res['slug'])},")
        lines.append(f"    title: {json.dumps(res['title'])},")
        lines.append(f"    summary: {json.dumps(res['summary'])},")
        topics_js = ", ".join(json.dumps(t) for t in res["topics"])
        lines.append(f"    topics: [{topics_js}],")
        lines.append(f"    publishDate: {json.dumps(res['publishDate'])},")
        if res["photo"]:
            # Vite base path for GitHub Pages
            lines.append(
                f"    cover: `${{import.meta.env.BASE_URL}}resources/{res['photo']}`,"
            )
        if res["url"]:
            lines.append(f"    url: {json.dumps(res['url'])},")
        lines.append(f"    content: {json.dumps(res['content'])},")
        lines.append("  },")

    lines.append("];")
    lines.append("")

    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    missing = [r["id"] for r in resources if not r["photo"]]
    print(f"wrote {OUT_TS} ({len(resources)} resources)")
    print(f"photos in {PHOTOS_DST}: {len(list(PHOTOS_DST.iterdir()))}")
    print(f"missing covers: {missing or 'none'}")


if __name__ == "__main__":
    main()
