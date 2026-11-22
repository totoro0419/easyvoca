# EasyVoca｜完成教材バッチ045 作業報告

- 担当番号：45
- 担当範囲：`global_order` **3521〜3600**（両端を含む）
- 元データの範囲：`index` **7058〜7274**
- 元データ：`data/candidates/batch_07001_07500.jsonl`、`main` に統合済みの `decision == "accepted"` 候補
- 採用済み候補の全体件数：**5,111件**（24ファイルの件数を集計）
- 担当対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**

## 成果物

- `content/cards/batch_045.md`：80カード（既知義、見落としやすい語義、例文、和訳、コアイメージ、Mermaid図、語法）
- `content/data/batch_045.jsonl`：同じ80カードの構造化データ
- `reports/content_batch_045.md`：本報告

## 検証

- Markdownのカード見出し：**80件**
- MarkdownのMermaidブロック：**80件**
- JSONLの有効なJSON行：**80件**
- 必須14キーの存在：**80件すべて確認**
- `global_order`：3521〜3600の連番、`order_in_batch`：1〜80の連番
- `candidate_id`、`index`、`word`、`pos`、`hidden_meaning_ja`：`main` の採用済み候補80件と全件一致
- 図：各行の `flowchart LR` と中心イメージ→既知義／対象義の矢印を確認
- 問題のあった候補：**構造・参照整合性上はなし**。発音・意味の新規辞書再調査は依頼に従い実施していない。

## GitHub

- ブランチ：`content/batch-045`
- 教材・JSONL保存時点のコミット：[`9b5f8ed6fd0352028468a9810b30b54e4ae84c1b`](https://github.com/totoro0419/easyvoca/commit/9b5f8ed6fd0352028468a9810b30b54e4ae84c1b)
- PR URL：[PR #69](https://github.com/totoro0419/easyvoca/pull/69)

**注意**：採用済み語義データの変更、他バッチの更新、アプリ機能実装は行っていない。
