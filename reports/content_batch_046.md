# EasyVoca 完成教材・Batch 046 作業報告

- 担当番号：46
- 担当範囲：global_order 3601〜3680
- 採用済み候補全体：5,111件（main、2026-11-22確認）
- 対象件数：80
- 完了件数：80
- 保留件数：0
- 元データ：`data/candidates/batch_07001_07500.jsonl` / `data/candidates/batch_07501_08000.jsonl` の `decision == "accepted"` のみ
- 対象の先頭：`ev-07275-verb-01`（index 7275）
- 対象の末尾：`ev-07508-verb-01`（index 7508）
- 対象で問題のあった候補：なし。慣用句は単語の字義と区別し、`bluff`・`fell` は無理な単一語義への統合を避けた。
- 検証：元候補とのindex / candidate_id / word対応、80件の重複なし、例文→コアイメージ→図の順序、JSONL全行の必須キー、Mermaid構文の基本構造を生成時に検査。
- 品質上の留意点：発音は米語系の代表的IPAを目安とする。元の採否は変更しておらず、教材の全例文・説明の外部校閲は未実施。
- 変更したファイル：`content/cards/batch_046.md`、`content/data/batch_046.jsonl`、`reports/content_batch_046.md`
- ブランチ：`content/batch-046`（mainには直接書き込まない）
- コミット：PR作成後に追記
- PR URL：PR作成後に追記
