# EasyVoca 完成教材｜担当 007 作業報告

- 担当番号：7
- 対象範囲（global_order）：481〜560
- 対象 index：644〜763
- 対象件数：80
- 完了件数：80
- 保留件数：0
- 問題のあった候補：なし（例文・和訳の自然さ確認時に、nearly の和訳を1件修正）
- 元データ：`main:data/candidates/batch_00001_00500.jsonl` および `main:data/candidates/batch_00501_01000.jsonl` の `decision == "accepted"` 候補。index・candidate_id 昇順。
- 作業ブランチ：`content/batch-007`
- PR URL：https://github.com/totoro0419/easyvoca/pull/33

## 成果物

- Markdown：`content/cards/batch_007.md`
- JSONL：`content/data/batch_007.jsonl`
- 報告：`reports/content_batch_007.md`

## 検査結果

- Markdownカード数：80
- JSONLレコード数：80
- Mermaid図数：80
- 候補ID重複：0
- 全80件の `index` / `candidate_id` / 採用語義文言：元データと一致
- 順序とglobal_order・order_in_batch：全件一致
- JSONL必須キー：全件あり
- コアイメージ説明：全件2文以上
- Mermaid：全件中心→既知／中心→今回の2分岐を保持
- 既存候補データと他バッチ：未変更

## コミット

- Markdown最終更新：https://github.com/totoro0419/easyvoca/commit/4a7493858d23b40b409d3970c71fb9d8e6c59103
- JSONL最終更新：https://github.com/totoro0419/easyvoca/commit/d7e253351d965ece8314236bae34532022dd8972
- 報告ファイルのコミット：PRの Commits タブ参照

新規語義の選定・辞書の全面再調査・アプリ開発は実施していない。
