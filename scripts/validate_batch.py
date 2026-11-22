#!/usr/bin/env python3
"""Validate exactly one EasyVoca selection batch: python scripts/validate_batch.py 1.

During partial work, pass --allow-incomplete to check saved records without
claiming 500-word completion.
"""
import argparse
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read_jsonl(path):
    if not path.exists():
        raise ValueError(f"missing file: {path}")
    out = []
    for line_no, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not raw.strip():
            continue
        try:
            val = json.loads(raw)
        except json.JSONDecodeError as e:
            raise ValueError(f"{path}:{line_no}: invalid JSON: {e}") from e
        if not isinstance(val, dict):
            raise ValueError(f"{path}:{line_no}: expected JSON object")
        out.append(val)
    return out


def require(test, message):
    if not test:
        raise ValueError(message)


def validate(batch, allow_incomplete):
    require(1 <= batch <= 24, "batch number must be 1..24")
    start, end = (batch - 1) * 500 + 1, batch * 500
    suffix = f"{start:05d}_{end:05d}"

    master = read_jsonl(ROOT / "data/master/words.jsonl")
    require(len(master) == 12000, "unexpected master size")
    correct = {item["index"]: item["word"] for item in master[start - 1:end]}
    require(len(correct) == 500 and set(correct) == set(range(start, end + 1)), "master range invalid")

    reviews = read_jsonl(ROOT / f"data/review/batch_{suffix}.jsonl")
    candidates = read_jsonl(ROOT / f"data/candidates/batch_{suffix}.jsonl")
    seen_review = set()
    for row in reviews:
        index = row.get("index")
        require(isinstance(index, int) and index in correct, f"review out of range: {index}")
        require(index not in seen_review, f"duplicate review index: {index}")
        seen_review.add(index)
        require(row.get("word") == correct[index], f"review word mismatch at {index}")
        require(row.get("status") in {"verified_selected", "verified_none", "needs_review"}, f"bad review status at {index}")
        require(isinstance(row.get("candidate_count"), int) and row["candidate_count"] >= 0, f"bad candidate_count at {index}")
        require(isinstance(row.get("accepted_count"), int) and row["accepted_count"] >= 0, f"bad accepted_count at {index}")

    ids = set()
    by_index = Counter()
    accepted_by_index = Counter()
    undecided_by_index = Counter()
    decisions = Counter()
    for row in candidates:
        index = row.get("index")
        require(isinstance(index, int) and index in correct, f"candidate out of range: {index}")
        require(index in seen_review, f"candidate without review row at {index}")
        require(row.get("word") == correct[index], f"candidate word mismatch at {index}")
        cid = row.get("candidate_id")
        require(isinstance(cid, str) and cid.strip() and cid not in ids, f"missing or duplicate candidate_id: {cid}")
        ids.add(cid)
        for k in ("pos", "meaning_ja", "reason", "utility"):
            require(isinstance(row.get(k), str) and row[k].strip(), f"{cid}: missing {k}")
        decision = row.get("decision")
        require(decision in {"accepted", "rejected", "needs_review"}, f"{cid}: bad decision")
        if decision != "needs_review":
            require(isinstance(row.get("decision_reason"), str) and row["decision_reason"].strip(), f"{cid}: missing decision reason")
        # AI-first review is allowed. Its outcome must be explicitly marked
        # as AI judgment rather than masquerading as external source verification.
        method = row.get("verification_method")
        require(method in (None, "ai_judgment", "dictionary_checked"),
                f"{cid}: invalid verification_method")
        sources = row.get("sources", [])
        require(isinstance(sources, list), f"{cid}: sources must be list")
        if decision == "accepted":
            if method == "ai_judgment":
                require(row.get("confidence") == "high",
                        f"{cid}: AI-only acceptance requires high confidence")
            else:
                require(bool(sources), f"{cid}: accepted without verified source or AI judgment marker")
        for src in sources:
            require(isinstance(src, dict) and isinstance(src.get("name"), str) and src["name"].strip(), f"{cid}: invalid source")
            require(isinstance(src.get("url"), str) and src["url"].startswith("https://"), f"{cid}: invalid source url")
            require(isinstance(src.get("checked_at"), str) and len(src["checked_at"]) == 10, f"{cid}: missing source checked_at")
        by_index[index] += 1
        accepted_by_index[index] += int(decision == "accepted")
        undecided_by_index[index] += int(decision == "needs_review")
        decisions[decision] += 1

    for row in reviews:
        index = row["index"]
        require(row["candidate_count"] == by_index[index], f"candidate_count mismatch: {index}")
        require(row["accepted_count"] == accepted_by_index[index], f"accepted_count mismatch: {index}")
        if row["status"] == "verified_selected":
            require(accepted_by_index[index] > 0 and undecided_by_index[index] == 0, f"wrong verified_selected at {index}")
        if row["status"] == "verified_none":
            require(accepted_by_index[index] == 0 and undecided_by_index[index] == 0, f"wrong verified_none at {index}")
        if row["status"] != "needs_review":
            require(undecided_by_index[index] == 0, f"unverified candidate in verified row: {index}")

    completed = len(seen_review) == 500 and not any(row["status"] == "needs_review" for row in reviews)
    if not allow_incomplete:
        require(completed, "batch incomplete: missing entries or needs_review rows")
    print(json.dumps({
        "batch": batch, "range": [start, end],
        "review_rows": len(reviews),
        "missing_rows": 500 - len(reviews),
        "accepted": decisions["accepted"],
        "rejected": decisions["rejected"],
        "needs_review_candidates": decisions["needs_review"],
        "completed": completed
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("batch", type=int, choices=range(1, 25), metavar="1..24")
    parser.add_argument("--allow-incomplete", action="store_true")
    args = parser.parse_args()
    try:
        validate(args.batch, args.allow_incomplete)
    except ValueError as error:
        parser.exit(1, f"FAIL: {error}\n")
