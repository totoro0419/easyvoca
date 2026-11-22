# EasyVoca 学習教材作成報告｜バッチ032

- 担当番号：**32**
- 担当範囲：**global_order 2481〜2560**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 対象語義：`decision == "accepted"` のみ（`index` 昇順、同一 `index` 内は `candidate_id` 昇順）
- 元データ：main commit `a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 24ファイルの accepted 全件数：**5,111**
- 先頭：`ev-04420-verb-01`（sprawl、index 4420）
- 末尾：`ev-04620-verbsubjunctive-01`（were、index 4620）

## 保存成果物

1. `content/cards/batch_032.md` — 80件。品詞・発音、補助的な既知義、見落としやすい意味、例文、和訳、コアイメージ説明、Mermaid図、重要語法を収録。
2. `content/data/batch_032.jsonl` — 80行。指定された必須キーと任意の `pronunciation` を含む。

## 検証

- GitHub上から再取得して照合：Markdownカード **80**、Mermaid図 **80**、JSONL行 **80**。
- JSONLの全行で必須14キーが存在。
- 元の accepted 候補に対し、`candidate_id`・`index`・`word`・`hidden_meaning_ja` が **80/80一致**。
- `global_order` と `order_in_batch` の連番、`index` 昇順、候補IDの重複なしを確認。
- 他のバッチや採用済み候補ファイルは変更していない。
- 英文・訳・説明・図を生成。外部辞書による全件再検証は実施していない。

## 問題のあった候補・注意点

- **保留候補なし**。
- 元のJSONLは必ずしも `index` の昇順で記録されていない。ファイル行順をそのまま使うと範囲がずれるため、指定どおり明示的にソートした。先頭は wool ではなく sprawl と確認した。
- 同じ単語・indexの別候補（bent、hammer、ply、franchise、fare、diversion）は `candidate_id` ごとに別カードとして保存した。

## コミット・PR

- 完成JSONLまでのコミット：[`271bbc05823d1f956b562227d1414edab7057c6b`](https://github.com/totoro0419/easyvoca/commit/271bbc05823d1f956b562227d1414edab7057c6b)
- PR：[#70](https://github.com/totoro0419/easyvoca/pull/70)（`content/batch-032` → `main`）
- mainへのマージは実施していない。
