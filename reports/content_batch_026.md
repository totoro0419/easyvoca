# EasyVoca 内容制作レポート：Batch 026

- 担当番号：26
- 担当範囲：global_order 2001〜2080（index 3186〜3390）
- 対象件数：80件（mainのacceptedのみ）
- 完了件数：80件
- 保留件数：0件
- 問題のあった候補：なし（既存の採用判断は変更していない）
- Markdown：`content/cards/batch_026.md`（80カード、Mermaid 80図）
- JSONL：`content/data/batch_026.jsonl`（80レコード）
- コミット：
  - Markdown：a55f2adcf8431954ed3b0f4bb48d49ef57f34f52
  - JSONL：4c5aec5f9d0220860d694065e3c2e6769a5fcd5d
- PR URL：https://github.com/totoro0419/easyvoca/pull/44

## 確認

- 対象を `index` 昇順・同じindexでは `candidate_id` 昇順として抽出。
- `global_order` 2001〜2080の連番と80件の候補IDを確認。
- 各カードに例文→和訳→コアイメージ説明→図の順番を採用。
- Markdown内のカード見出し80件、Mermaid図80件、JSONLレコード80件を生成時に確認。
- `data/candidates`、他のバッチ、アプリコードには変更を加えていない。
