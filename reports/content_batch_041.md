# EasyVoca 内容教材 Batch 041 作業報告

- 担当番号：41
- 対象：global_order 3201〜3280（元データ index 6119〜6322）
- 対象件数：80件
- 完了件数：80件
- 保留件数：0件
- 対象条件：main に採用済みの候補（decision == accepted）を index・candidate_id 昇順で整列
- 元データ：`data/candidates/batch_06001_06500.jsonl`
- Markdown：`content/cards/batch_041.md`
- JSONL：`content/data/batch_041.jsonl`
- 検証：80件ずつの件数・1〜80のバッチ順・3201〜3280の全体順・candidate_idの一意性・元データのindex/word/pos/accepted照合を実施
- 内容：全80件に例文・和訳・2文以上のコアイメージ説明・Mermaid図を収録。語法は必要な語にのみ付与
- 注意点：`ev-06241-adj-01`（disposable）は元候補の「生活必需支出を差し引いた所得」という説明が可処分所得として不正確なため、教材では税金などを差し引いた後の所得に修正。元データは未変更
- その他の保留・問題候補：なし
- 教材コミット：https://github.com/totoro0419/easyvoca/commit/5a67e657bc068274571ddaa9d117073f891bd534
- PR：https://github.com/totoro0419/easyvoca/pull/56
