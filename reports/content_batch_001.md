# EasyVoca｜完成教材 Batch 001 作業報告

- 担当番号：**1**
- 担当範囲：**global_order 1〜80**
- 参照基準：`main` の `decision == "accepted"` を `index` 昇順、同じ `index` では `candidate_id` 昇順
- 元候補のindex範囲：**1〜97**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 問題のあった候補：**なし（今回の整合性検査で不整合は未検出）**

## 保存した完成教材

- `content/cards/batch_001.md`：80件のカード。単語・品詞・発音・既知の意味・見落としやすい意味・例文・和訳・コアイメージの説明・Mermaid図・必要に応じた語法
- `content/data/batch_001.jsonl`：80件の構造化カードデータ
- 元の `data/candidates/` と `data/review/`、他バッチは変更していない。

## 集計と検証

- `main` の候補24ファイルを取得し、採用済み候補が合計 **5,111件** であることを確認。
- 担当範囲の元データ：`data/candidates/batch_00001_00500.jsonl`（Git blob SHA `e2d78111ea34f2a09f9d3b1fbfc99f742e3d83fd`）。
- 保存後、GitHub上のファイルを再取得し、**JSONL 80行・Markdown 80カード・Mermaid 80図・既知語義80件**を確認。
- 全JSONL行の必須キー、バッチ・担当内・全体順の連番、candidate_idの重複なし、語義と出典候補の対応、Mermaidの中心→既知・意外な意味の2接続を検証。エラー **0件**。
- コアイメージの説明は各カード2文以上、重要語法は必要な表現に限定し、辞書例文は転載せずオリジナル例文を作成。
- 本作業で実際に検証したのは構造と整合性であり、すべての例文に対する辞書外部検証・アプリ上の描画確認までは実施していない。

## コミット・PR

- JSONL追加： https://github.com/totoro0419/easyvoca/commit/4a40327e5b8a6b9c139d60902b470d6b1ade4442
- Markdown追加： https://github.com/totoro0419/easyvoca/commit/d175c015402de0804554f6d1f3e58fef9312aca0
- PR： https://github.com/totoro0419/easyvoca/pull/26
