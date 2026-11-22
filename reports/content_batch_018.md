# EasyVoca 完成教材｜担当18

- 担当番号：18
- 担当範囲：global_order **1361〜1440**
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**
- 元データ：`data/candidates/batch_02001_02500.jsonl`（main、blob SHA `67a5df6482451eaac42abd0331bc2684b0e696f2`）
- 対象先頭：`ev-02187-adjective-01`（index 2187）
- 対象末尾：`ev-02304-noun-01`（index 2304）

## 成果物
- `content/cards/batch_018.md`：80件の学習カード（例文、和訳、コアイメージ、Mermaid図を含む）
- `content/data/batch_018.jsonl`：80行の構造化教材データ
- `reports/content_batch_018.md`：本報告

## 品質・注意点
- 対象80件の語、index、candidate_id、pos、採用済み語義はmainのデータから取得し、候補を追加・再選定していない。
- 各カードの自然なオリジナル例文・和訳・説明・簡潔なMermaid図を作成。
- 同一見出し語の別候補（counter、elaborate、bid など）は別カードとして保存。
- `barely` については元候補の理由に「裸で」という記載があるが、これは `bare` と混同しやすいため、既知意味欄を「bare（別語）」と明示した。採用済み語義そのものは変更していない。
- 問題のあった候補：採用候補自体の保留なし。発音表記は学習上の目安で、辞書音声による全数検証は未実施。
- JSONL 80行、Markdown 80見出し、global_order 1361〜1440、candidate_idの重複なしを生成時に確認。
- 共有マスター、既存の語義候補、他バッチのファイルは変更していない。

## GitHub
- 作業ブランチ：`content/batch-018`
- 教材Markdownコミット：https://github.com/totoro0419/easyvoca/commit/ada4af75a8b8e2719899287a805839b8d01681f6
- JSONLコミット：https://github.com/totoro0419/easyvoca/commit/726cafe27c9e31c166f87e31e18fc566736af5e2
- 初回作業報告コミット：https://github.com/totoro0419/easyvoca/commit/3f52c2628d06de52f598d7d7ba7c9ad588507bc5
- PR：https://github.com/totoro0419/easyvoca/pull/34
