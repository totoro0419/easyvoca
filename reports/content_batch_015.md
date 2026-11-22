# EasyVoca 完成教材 — 担当バッチ015 作業報告

## 対象
- 担当番号：15
- 採用済み語義の通し順：global_order **1121〜1200**
- 元データの index：**1773〜1932**
- 元データ：`data/candidates/batch_01501_02000.jsonl`
- 抽出基準：`decision == "accepted"`、`index` 昇順、同一 index 内で `candidate_id` 昇順
- 参照した main コミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`

## 件数・進捗
- 対象：**80件**
- 完成：**80件**
- 保留：**0件**
- Mermaid図：**80件**
- 既存の語義データの変更：**なし**
- 他バッチへの変更：**なし**

## 成果物
- Markdown：`content/cards/batch_015.md`
- JSONL：`content/data/batch_015.jsonl`
- 作業報告：`reports/content_batch_015.md`

各カードには単語、品詞、発音目安、既知の意味、採用済みの見落としやすい意味、独自例文・和訳、コアイメージ説明、Mermaid模式図、必要に応じた重要語法を収録。

## 保存済み成果物の確認
- GitHub の担当ブランチから再取得して確認：JSONL **80行**、Markdownカード見出し **80件**、Mermaid図 **80件**。
- 各カードの `candidate_id`、`index`、`hidden_meaning_ja`、`global_order`、`order_in_batch` が抽出元と一致：**80/80件**。
- 例文・和訳・コアイメージ・図の必須項目が空でないこと、およびMermaid図に中心→既知義・中心→見落としやすい義の2経路があることを確認：**80/80件**。
- 元データにある `trail` の2候補は、異なる `candidate_id` の2カードとして保存。

## 候補上の留意点
- 品質上の保留候補：**なし**。
- `ball`、`bay`、`vice` のように既知義と対象義を無理につなげると誤解しやすいものは、語義・慣用句の区別を明記した。
- 発音は日本語の目安表記であり、音声辞書やIPAによる個別監修は行っていない。
- 辞書の網羅的な再調査は行っていない（採用済み候補の教材化のため）。

## GitHub
- 作業ブランチ：`content/batch-015`
- Markdown作成コミット：https://github.com/totoro0419/easyvoca/commit/f673efc949d9bce0cd924372de36632d29b59dfb
- JSONL作成コミット：https://github.com/totoro0419/easyvoca/commit/710478eaea7070ed18961a554f7fc1a4a236ef3d
- PR：https://github.com/totoro0419/easyvoca/pull/30
