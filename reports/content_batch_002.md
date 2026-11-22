# EasyVoca 完成教材 バッチ002｜作業報告

- 担当番号：2
- 担当範囲：global_order **81〜160**（index 98〜196）
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**
- ブランチ：`content/batch-002`
- PR：https://github.com/totoro0419/easyvoca/pull/25

## 作成したファイル

- `content/cards/batch_002.md`：80学習カード。各カードに発音・既知義・注目義・オリジナル例文・和訳・コアイメージ説明・Mermaid図・語法（必要時）を掲載。
- `content/data/batch_002.jsonl`：80行、1行1カード。元データ識別子・教材要素・Mermaid図を収録。
- `reports/content_batch_002.md`：本報告。

## 対象特定と検証

main の `data/candidates/batch_00001_00500.jsonl` を確認し、`decision == "accepted"` の386件を `index` → `candidate_id` 昇順に並べた結果、このファイルだけで global_order 81〜160 の80件を特定できた。index 501以降のファイルの候補が、この範囲より先に並ぶことはない。全体5111件は依頼時の計画値であり、今回は全24ファイルの再集計を省略した。

- Markdownカード見出し：**80件**
- Mermaid図：**80件**
- JSONLレコード：**80件**
- 元データとの `index`・`candidate_id`・`meaning_ja`（注目義）照合：**80/80件一致**
- 連続する `global_order` と `order_in_batch`：**81〜160 / 1〜80**
- 候補ID重複：**0件**
- 必須教材フィールドの欠落：**0件**
- 発音欄の欠落：**0件**
- 他バッチ・元語義データの変更：**なし**（追加ファイルは本バッチの3件のみ）

## 問題のあった候補と対処

- `well`（global_order 93・94）、`lead`（98）、`might`（103）、`mean`（143・144）：同じ綴りというだけで既知義と注目義に誤った共通コアイメージを作らないよう、図を「同綴りの別用法・別系統」という分類図へ修正した。解決済み。
- 未解決・保留の候補：**なし**。
- 英語例文・語義表現は教材として独自に作成した。網羅的な辞書再検証・実際の画面上の描画検査は今回の工程には含めていない。

## コミット履歴

- JSONL初回追加：[`ccb1873`](https://github.com/totoro0419/easyvoca/commit/ccb18734970938de428fd5414befad6ce71b8fa7)
- Markdown初回追加：[`f6ff15a`](https://github.com/totoro0419/easyvoca/commit/f6ff15aad5ecdc139ca530091ad748fea9700fb2)
- 図の同綴語調整：[`44b3ce5`](https://github.com/totoro0419/easyvoca/commit/44b3ce52a3b7daad8fda40a7173641cebdb04916)
- 品詞表示・図の同期：[`c02733a`](https://github.com/totoro0419/easyvoca/commit/c02733a358f6fc42b9dbdf4a83aff24149696c8a)

## PR

https://github.com/totoro0419/easyvoca/pull/25
