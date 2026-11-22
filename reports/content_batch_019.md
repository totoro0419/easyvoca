# EasyVoca 教材作成報告 — Batch 019

## 担当範囲
- 担当番号：19
- global_order：**1441〜1520**（80件）
- index：2306〜2406
- 先頭：`ev-02306-noun-01` / relief
- 末尾：`ev-02406-verb-01` / dive
- 並び：`decision == "accepted"` に限定し、`index` → `candidate_id` の昇順
- 元データ：`main` の `data/candidates/batch_02001_02500.jsonl`
- 全バッチの採用済み候補数：5,111件（mainの24候補ファイルを集計して確認）

## 作成成果
- 対象：80件
- **完成：80件**
- **保留：0件**
- Markdown教材：`content/cards/batch_019.md`
- JSONL：`content/data/batch_019.jsonl`
- 1カードに、単語・品詞・発音・既知の意味・見落としやすい意味・例文・和訳・コアイメージ説明・Mermaid図・必要に応じて重要語法を収録
- 図は各カード1件、`flowchart LR` の3ノード・2矢印構成

## 注意して教材化した候補
- `relief`（1441〜1442）：彫刻と法的救済を別々に説明
- `sanction`（1451〜1453）：承認と制裁という反対方向の意味を文脈別に区別
- `besides`（1458）：否定文脈における「～以外に」の用法を例示
- `arch`（1479）・`steep`（1487）：無理に単一の語義へこじつけず、異なる用法だと明記
- `fat`（1510）：`fat chance` が皮肉表現であることを明記
- 作成を妨げる入力欠落や保留候補はなし。新しい語義の追加・採用判定の変更なし。

## 確認結果（保存後にGitHubから再取得）
- JSONL：**80行**
- Markdown：**80カード**
- Mermaidコードブロック：**80件**
- `candidate_id` の重複：**0件**
- `index`・`word`・`candidate_id`・`pos`・採用語義：**80件すべて元データと一致**
- `global_order`：**1441〜1520で連続**
- JSONLの例文・和訳・図がMarkdown内に存在すること：**80件確認**
- Mermaidのブラウザ実描画と英語例文の外部辞書校閲は未実施（構造・整合性は確認済み）
- 既存候補データや他バッチは変更していない。

## コミット・PR
- 最終JSONL教材調整コミット：[`c14ac9f48cc070fc5560a80d948aaaf083626302`](https://github.com/totoro0419/easyvoca/commit/c14ac9f48cc070fc5560a80d948aaaf083626302)
- Markdown教材作成コミット：[`051a9d5655d569dbdc504470b7a194b3c5a7e700`](https://github.com/totoro0419/easyvoca/commit/051a9d5655d569dbdc504470b7a194b3c5a7e700)
- 作業ブランチ：`content/batch-019`
- PR：https://github.com/totoro0419/easyvoca/pull/38
- PRのマージは未実施（main向けに提出）。
