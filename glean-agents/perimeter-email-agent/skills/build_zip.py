#!/usr/bin/env python3
"""Builds skills/brief-render.zip with SKILL.md at the zip root, without tests or caches."""
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "brief-render"
OUT = ROOT / "brief-render.zip"

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for p in sorted(SRC.rglob("*")):
        rel = p.relative_to(SRC)
        if not p.is_file() or rel.parts[0] == "tests" or "__pycache__" in rel.parts or p.suffix == ".pyc":
            continue
        z.write(p, rel.as_posix())
print(f"wrote {OUT}")
