#!/usr/bin/env python3
"""Builds skills/<name>.zip with SKILL.md at the zip root, without tests or caches. Usage: build_zip.py [brief-render|board-widget|triage-board]"""
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
NAME = sys.argv[1] if len(sys.argv) > 1 else "brief-render"
SRC = ROOT / NAME
OUT = ROOT / f"{NAME}.zip"

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    for p in sorted(SRC.rglob("*")):
        rel = p.relative_to(SRC)
        if not p.is_file() or rel.parts[0] == "tests" or "__pycache__" in rel.parts or p.suffix == ".pyc":
            continue
        z.write(p, rel.as_posix())
print(f"wrote {OUT}")
