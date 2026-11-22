# EasyVoca 完成教材・Batch 023 作業報告

- 担当番号：23
- 対象範囲（global_order）：**1761〜1840**
- index 範囲：2760〜2888（同一 index に複数の採用語義がある場合は個別カード）
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 採用済み候補全体：5,111件（main の `decision == "accepted"`）
- 元データ：`data/candidates/batch_02501_03000.jsonl`
- 元データ blob SHA：`ca85b2dd439be13577c4cfe8b765f23807021b97`
- ブランチ：`content/batch-023`
- PR：https://github.com/totoro0419/easyvoca/pull/51

## 作成ファイル
1. `content/cards/batch_023.md` — 全80件のMarkdown教材。発音・既知義・注目語義・オリジナル例文・和訳・コアイメージ文・Mermaid図・有用な語法。
2. `content/data/batch_023.jsonl` — 各カードのデータを1行ずつ格納。
3. `reports/content_batch_023.md` — 本報告。

## 検証結果
- Markdownの見出し80件とMermaidブロック80件、JSONL80行が一致。
- 全80件について `candidate_id`、`index`、`word`、`pos`、`hidden_meaning_ja` が元の採用済みデータと一致。
- `global_order` が1761〜1840で連続し、`order_in_batch` が1〜80で連続。
- すべてのカードで例文がコアイメージ説明より先に登場。
- JSONL必須キー、Mermaidの中心→既知義／見落とし義の二方向の関係、発音欄、語法メモの型を確認。
- 本バッチ以外のカードや採用候補のデータは編集していない。

## 注記・問題のあった候補
- **保留・作成不能：なし。**
- `bore`、`founder` などの同綴りで異なる語義は、無理な意味上の関連付けを避け、カード内で区別した。
- `yellow` の「臆病な」、`mercury` の気温用法、`superior to temptation` などはレジスターや用法の注意を記載した。
- 発音は簡略IPAを参考表記として付した。音声・外部辞書による個別発音照合やアプリ実機表示確認は今回の範囲外。

## 教材コミット
- Markdown教材：https://github.com/totoro0419/easyvoca/commit/1c16c6fde5aafc136cb5248ecbd7d566f6bcc5d3
- JSONLデータ：https://github.com/totoro0419/easyvoca/commit/c0bc93eeccc3018a79425035e5039188512757c9

PRで main への統合を依頼。mainへの直接書き込み・既存採用データの変更・アプリ機能の実装は行っていない。
