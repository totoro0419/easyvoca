# EasyVoca 完成教材 作業報告｜Batch 021

- 担当番号：**21**
- 作業日：2026-11-22
- リポジトリ：`totoro0419/easyvoca`
- 対象ブランチ：`content/batch-021`（`main` を起点）
- 担当範囲：`global_order` **1601〜1680** ／元データ `index` **2518〜2631**
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**
- 採用済み候補の全体件数：**5,111件**（`data/candidates/batch_*.jsonl` 24ファイルを `decision == "accepted"` で再集計）

## 保存成果物

1. `content/cards/batch_021.md`：完成教材80カード（例文・和訳・コアイメージの説明文・Mermaid図80個を含む）
2. `content/data/batch_021.jsonl`：80件の構造化カード。指定された全キーに加え、`pronunciation_ja` を収録
3. `reports/content_batch_021.md`：本報告書

## 整合性・確認

- `index` 昇順、同一 `index` 内は `candidate_id` 昇順を使用。
- 第1〜5候補ファイルの採用数1,585件を確認し、次のファイルの採用候補16〜95番を対象とした。
- 元データの `candidate_id`、`index`、`word`、`pos`、`meaning_ja` を保持した。
- JSONL80件の必須キー、順番、IDの重複なし、80件のMermaid定義とMarkdownの図の数を確認。
- 既存の `data/candidates`、`data/review` および他バッチのファイルには変更を加えていない。
- 全図の外部Mermaidレンダラによる表示確認および音声発音の検証は未実施。発音はカタカナ表記の目安。

## 問題のあった候補・補足

- **保留を要する候補はなし**。既存の採否判断の変更や新規語義の追加はしていない。
- `ev-02580-adjective-01`（substitute）は採用済み語義の「質が劣る」を維持しつつ、代用品が必ずしも劣悪とは限らない点を説明で補足。
- `ev-02575-adverb-01`（prompt）は時刻直後の用法が主にイギリス英語である点を語法欄に補足。
- `ev-02544-noun-01`（dignity）は格式ある文脈の用法である点を語法欄に補足。

## コミット・PR

- JSONL作成：[`077ebd47b100fc7d281b4a8dfbc4dc795713c57a`](https://github.com/totoro0419/easyvoca/commit/077ebd47b100fc7d281b4a8dfbc4dc795713c57a)
- Markdown教材作成：[`0fd86626da5fec0a51df30e715da3edc8437285e`](https://github.com/totoro0419/easyvoca/commit/0fd86626da5fec0a51df30e715da3edc8437285e)
- PR：<https://github.com/totoro0419/easyvoca/pull/49>
