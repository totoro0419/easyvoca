#!/usr/bin/env python3
"""Build a reproducible, openly redistributable 12,000-headword research master.

Sources:
- Lingevo/OANC written lemma frequency list: unrestricted with attribution.
- LexiCore-5000 v1.0.0: CC BY 4.0, corroborated headword membership only.
The 12 bands are EasyVoca ordering bands, NOT SVL levels or verified CEFR.
"""
from __future__ import annotations

import csv
import hashlib
import io
import json
import math
import re
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "master"
OANC_URL = "https://lingevo.com/resources/oanc/oanc_wordfreq_written.csv"
LEXICORE_URL = "https://raw.githubusercontent.com/X-Trivle/LexiCore/main/data/LexiCore_5000.csv"
WORD_RE = re.compile(r"^[a-z]+$")
ESSENTIALS = (
    "snake minute weather frog dog duck table bottle fish shoulder voice mirror "
    "pocket nail tail skin milk chair book land coin screen picture ground spring"
).split()


def download(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "EasyVoca-DataBuild/1.0"})
    with urllib.request.urlopen(req, timeout=80) as res:
        return res.read()


def rows_from(raw: bytes) -> csv.DictReader:
    return csv.DictReader(io.StringIO(raw.decode("utf-8-sig")))


def good_word(value: str) -> bool:
    return bool(WORD_RE.fullmatch(value)) and (len(value) > 1 or value in {"a", "i"})


def main() -> None:
    oanc_raw = download(OANC_URL)
    core_raw = download(LEXICORE_URL)
    counts = Counter()
    genre_counts = {}

    for record in rows_from(oanc_raw):
        word = (record.get("lemma") or "").strip().lower()
        if not good_word(word):
            continue
        try:
            n = int(record.get("count") or 0)
        except ValueError:
            continue
        if n > 0:
            counts[word] += n
            try:
                genre_counts[word] = max(genre_counts.get(word, 0), int(record.get("genres_present") or 0))
            except ValueError:
                pass
    if len(counts) < 12000:
        raise RuntimeError(f"OANC only has {len(counts)} valid lemmas; cannot form 12,000 distinct entries")

    core = {}
    for record in rows_from(core_raw):
        word = (record.get("word") or "").strip().lower()
        if good_word(word) and word not in core:
            core[word] = int(record.get("rank_global") or (len(core) + 1))
    if len(core) < 4800:
        raise RuntimeError(f"Unexpected LexiCore size {len(core)}, inspect source and format")

    # Trust OANC lemmatized entries as the primary anchor. LexiCore provides
    # a learning relevance boost only when the word is attested as a lemma.
    # Its 5,000 list includes some inflected surface forms (e.g. 'are').
    selected = (set(core) & set(counts)) | set(ESSENTIALS)
    oanc_order = sorted(counts, key=lambda word: (-counts[word], word))
    for word in oanc_order:
        if len(selected) == 12000:
            break
        selected.add(word)
    if len(selected) != 12000:
        raise AssertionError(f"Expected 12000, found {len(selected)}")

    # Corpus rank primarily determines order; core vocabulary membership boosts inclusion,
    # not fabricated CEFR levels. All words are lower-case distinct headwords.
    ordered = sorted(
        selected,
        key=lambda word: (
            -math.log1p(counts.get(word, 0))
            - (0.22 if word in core else 0.0),
            core.get(word, 999999),
            word
        ),
    )
    result = []
    for number, word in enumerate(ordered, 1):
        source_tags = []
        if word in counts:
            source_tags.append("lingevo_oanc")
        if word in core:
            source_tags.append("lexicore5000")
        if word in ESSENTIALS:
            source_tags.append("everyday_probe")
        result.append({
            "index": number,
            "word": word,
            "level": (number - 1) // 1000 + 1,
            "source": "+".join(source_tags),
            "oanc_count": counts.get(word, 0),
            "lexicore_rank": core.get(word),
            "requires_lexeme_check": word not in counts,
        })

    if len(result) != 12000 or len({e["word"] for e in result}) != 12000:
        raise AssertionError("Master size or uniqueness validation failed")
    if [e["index"] for e in result] != list(range(1, 12001)):
        raise AssertionError("Master index continuity failed")
    missing_probes = sorted(set(ESSENTIALS) - {e["word"] for e in result})
    if missing_probes:
        raise AssertionError(f"Missing everyday probes: {missing_probes}")

    OUT.mkdir(parents=True, exist_ok=True)
    master_path = OUT / "words.jsonl"
    text = "".join(json.dumps(rec, ensure_ascii=False, separators=(",", ":")) + "\n" for rec in result)
    master_path.write_text(text, encoding="utf-8")
    batch_records = [
        {"batch": b, "start": (b - 1) * 500 + 1, "end": b * 500, "count": 500}
        for b in range(1, 25)
    ]
    (OUT / "batches.json").write_text(json.dumps(batch_records, indent=2) + "\n", encoding="utf-8")

    summary = {
        "schema_version": 1,
        "description": "EasyVoca research seed (not SVL12000 or an exam-approved list)",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "count": len(result),
        "word_sha256": hashlib.sha256(master_path.read_bytes()).hexdigest(),
        "oanc_lemma_total": len(counts),
        "core_lemma_total": len(core),
        "included_in_core": sum(e["lexicore_rank"] is not None for e in result),
        "without_oanc_corpus_support": sum(e["oanc_count"] == 0 for e in result),
        "everyday_probe_count": len(ESSENTIALS),
        "sources": [
            {
                "name": "Lingevo written lemma-frequency list from Open American National Corpus",
                "url": OANC_URL,
                "sha256": hashlib.sha256(oanc_raw).hexdigest(),
                "terms": "Unrestricted redistribution; credit Lingevo and OANC",
            },
            {
                "name": "LexiCore-5000 v1.0.0",
                "url": LEXICORE_URL,
                "sha256": hashlib.sha256(core_raw).hexdigest(),
                "terms": "CC BY 4.0 attribution; headwords only",
            },
        ],
        "limitations": [
            "Approximate corpus-based ordering, NOT official SVL ranks or verified CEFR.",
            "OANC count comes from a small American corpus with journalistic genre bias.",
            "Only LexiCore entries backed by OANC lemma data are included by default; exceptional everyday probes are flagged.",
            "Each word's unusual senses must be researched and verified separately.",
        ],
    }
    (OUT / "manifest.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({k: summary[k] for k in (
        "count", "oanc_lemma_total", "core_lemma_total", "included_in_core",
        "without_oanc_corpus_support", "word_sha256",
    )}, indent=2))
    print("sample_first_12", [r["word"] for r in result[:12]])
    print("sample_6000", [r["word"] for r in result[5994:6005]])
    print("sample_last_12", [r["word"] for r in result[-12:]])


if __name__ == "__main__":
    main()
