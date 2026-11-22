# EasyVoca 教材作成報告 — Batch 056

- 作業日：2026-11-22
- 担当番号：56
- 対象範囲：`global_order` **4401–4480**（80件）
- 対象の `index` 範囲：**9889–10114**
- 語義の抽出ルール：`decision == "accepted"`、`index` 昇順、同一 `index` は `candidate_id` 昇順
- 原本として使用した main commit：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 元データの採用済み総数：**5,111件**
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**

## 成果物

1. `content/cards/batch_056.md`：教材カード80件（例文・和訳・コアイメージ説明・Mermaid図・発音・必要な語法）
2. `content/data/batch_056.jsonl`：構造化カード80行（1行1件）

## 検証結果

- Markdownカード数：80
- JSONL行数：80
- Mermaid図数：80
- 発音表記の件数：80（米音の学習用目安）
- `candidate_id` 重複：0
- 元データとの `index` / `candidate_id` / `word` / `pos` / `hidden_meaning_ja` の不一致：0
- 例文 → コアイメージ説明 → 図の順序違反：0
- 必須フィールドの欠落：0
- 他バッチ・既存の採用候補データは変更していない。

## 問題のあった候補・注意事項

- 作成保留に至る問題候補：**なし**。
- `ev-10092-ai-01`（colonel）は新しい別義ではなく、採用候補どおり綴りと発音の差を学ぶカードとした。
- `precipitate` は形容詞・名詞・動詞を別カードにして、例文と発音を区別した。
- 発音欄は学習補助の目安。今回、辞書本文の転載や採用語義の再選定、全面的な辞書再検証は実施していない。

## GitHub

- ブランチ：`content/batch-056`
- 教材・JSONLに関する最新コミット：[`0a4a28e48b456b8922c5d3ede8ec9de878313453`](https://github.com/totoro0419/easyvoca/commit/0a4a28e48b456b8922c5d3ede8ec9de878313453)
- PR：[#88](https://github.com/totoro0419/easyvoca/pull/88)（base: `main`）
