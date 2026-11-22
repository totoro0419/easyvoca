#!/usr/bin/env python3
"""Validate EasyVoca research master and all 24 disjoint ranges."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/master"
master = DATA / "words.jsonl"
if not master.exists():
    raise SystemExit("Master missing: run scripts/build_master.py")

records = [json.loads(line) for line in master.read_text(encoding="utf-8").splitlines() if line.strip()]
assert len(records) == 12000, f"Unexpected record count {len(records)}"
assert [x["index"] for x in records] == list(range(1, 12001)), "Missing or duplicated index"
words = [x["word"] for x in records]
assert len(set(words)) == 12000, "Duplicate headwords"
assert all(re.fullmatch(r"[a-z]+", w) for w in words), "Non-single-token entry"
assert all(x["level"] == ((x["index"] - 1) // 1000 + 1) for x in records), "Band inconsistent"
assert all(x["source"] for x in records), "Missing source tag"
probes = "snake minute weather frog dog duck table bottle fish shoulder voice mirror pocket nail tail skin milk chair book land coin screen picture ground spring".split()
assert set(probes) <= set(words), "Everyday-word coverage regression"

batches = json.loads((DATA / "batches.json").read_text(encoding="utf-8"))
assert len(batches) == 24, "24 batches required"
seen = []
for b, row in enumerate(batches, 1):
    assert row == {"batch": b, "start": (b - 1) * 500 + 1, "end": b * 500, "count": 500}, f"Incorrect batch {b}"
    seen.extend(range(row["start"], row["end"] + 1))
assert seen == list(range(1, 12001)), "Batches overlap or miss entries"
manifest = json.loads((DATA / "manifest.json").read_text(encoding="utf-8"))
assert manifest["count"] == 12000
assert manifest["word_sha256"] == hashlib.sha256(master.read_bytes()).hexdigest()
assert len(manifest["sources"]) == 2 and all(x["sha256"] for x in manifest["sources"]), "Invalid source provenance"
print("PASS: 12,000 unique words, 24 complete 500-word batches, source manifest SHA-256, everyday probes")
