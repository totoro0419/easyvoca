# EasyVoca 教材バッチ 011 作業報告

- 担当番号：11
- 担当範囲：global_order 801〜880（元データ index 1160〜1317）
- 対象件数：80件（main 採用済み候補）
- 完了件数：80件
- 保留件数：0件
- 問題のあった候補：なし（同綴異義の refuse、entrance 等はコアイメージで区別）
- 既存採用済み語義の再選定：未実施
- 作業ブランチ：`content/batch-011`
- 教材コミット：https://github.com/totoro0419/easyvoca/commit/aec4329f2415ec61ea67fdb91a743f61920205fe
- PR URL：https://github.com/totoro0419/easyvoca/pull/28

## 作成ファイル

- `content/cards/batch_011.md`：全80カード、例文→和訳→コアイメージ→Mermaid図の順
- `content/data/batch_011.jsonl`：80行、1行につき1カード
- `reports/content_batch_011.md`：本報告

## チェック結果

- JSONL行数：80
- Markdownカード見出し数：80
- Mermaid図数：80
- `candidate_id` の重複：0
- `candidate_id`・`index`・`global_order`：元データと一致
- 元の候補ファイル：変更なし
- 文法・語義：AIによる教材制作時の確認（全面的な辞書再調査は行っていない）
