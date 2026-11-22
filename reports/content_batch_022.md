# EasyVoca 完成教材｜バッチ022 作業報告

- 担当番号：22
- 担当範囲（global_order）：1681〜1760
- 対象語のindex範囲：2632〜2760
- 対象件数：80件
- 完了件数：80件
- 保留件数：0件
- データ源：`main` の `data/candidates/batch_02501_03000.jsonl` を含む採用済み候補5,111件
- 基準mainコミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`

## 成果物

- `content/cards/batch_022.md` — 80件の教材。語義・例文・和訳・コアイメージ説明・Mermaid図・必要な重要語法。
- `content/data/batch_022.jsonl` — 80件の構造化データ。

## 整合性確認

- Markdownカード数：80
- Mermaid図数：80
- JSONL件数：80
- JSONLの`candidate_id`・`index`・`word`・`pos`・採用語義が対応する元候補と一致：80/80
- `global_order`：1681〜1760の連続80件
- 明示した必須フィールド、例文、訳、説明、図の欠落：0
- 元の採用候補・他バッチは未変更

## 注意を付記した語義

- `adventure`（動詞）、`marketing`（買い物）、`brick`（親切な人）などは地域差・古風な表現を語法欄で明記。
- `plausible` は語そのものが「偽り」を意味するわけではないため、文脈上で人を惑わす用例として提示。
- `et al.` は学術文献でのラテン語略記として説明。

上記は教材上の注記であり、保留はありません。採用語義の再選定は実施していません。

## コミットとPR

- Markdown教材コミット：https://github.com/totoro0419/easyvoca/commit/f200d0c664293698bef55d0dfaac5d0c77b6eaa0
- JSONLコミット：https://github.com/totoro0419/easyvoca/commit/c780b608063ac129c437f1d7d023f11cfde10af0
- PR：https://github.com/totoro0419/easyvoca/pull/45
