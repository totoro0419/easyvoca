# EasyVoca 教材化報告｜Batch 005

- 担当番号: 5
- 対象範囲: global_order 321–400（各80件）
- 対象件数: 80
- 完了件数: 80
- 保留件数: 0
- 元データ: main の `decision == "accepted"` 5,111件を `index` 昇順・`candidate_id` 昇順で整列
- 担当部分の元ファイル: `data/candidates/batch_00001_00500.jsonl`、`data/candidates/batch_00501_01000.jsonl`
- 対象 index 範囲: 427–508
- 最初のID: `ev-00427-verb-01`
- 最後のID: `ev-00508-verb-01`

## 成果物

- `content/cards/batch_005.md` — 80語義の完成教材。品詞、発音、既知の意味、学習対象の意味、オリジナル例文、和訳、コアイメージの説明、Mermaid図、重要語法
- `content/data/batch_005.jsonl` — 80件の構造化カードデータ

## 検査結果

- Markdown見出し数とJSONL行数: 80件で一致
- JSONLの必須キー: 全件存在
- main由来の `candidate_id`、`index`、`word`、学習対象の意味: 全80件一致
- global_order と order_in_batch: 全80件一致
- 例文と図: 全件存在、MarkdownとJSONLで一致
- Mermaidの中心・既知の意味・対象の意味: 全件含まれる
- 他バッチおよび既存語義データ: 編集なし

## 候補の注意点

- `ground` の形容詞用法は名詞「地面」ではなく `grind` の過去分詞として説明。
- `the one ... the other ...`、`save for ...`、`capital importance` など、やや硬い語法には補足を付した。
- 保留が必要な候補は確認されなかった。

## コミット

- 教材Markdown追加: https://github.com/totoro0419/easyvoca/commit/a4eb8e1a74eeeb97898dff22150755fb8b22c14d
- JSONL追加: https://github.com/totoro0419/easyvoca/commit/27c1841ce991d50efcfd6e242e5f9b535294cedb

## PR

- PR URL: https://github.com/totoro0419/easyvoca/pull/31
