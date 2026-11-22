# EasyVoca 完成教材 作業報告：バッチ038

## 担当情報
- **担当番号**：38
- **担当範囲（global_order）**：2961〜3040（両端を含む）
- **元データ上のindex範囲**：5531〜5745
- **対象件数**：80件
- **完成件数**：80件
- **保留件数**：0件
- **問題のあった候補**：なし（対象80件の整合性検証において）
- **元データ**：`data/candidates/batch_05501_06000.jsonl`（main、採用候補のみ）
- **並び順**：全24候補ファイルの `decision == "accepted"` の候補を `index` 昇順、同じindexでは `candidate_id` 昇順
- **全体の採用候補数**：5,111件（main の24ファイルを集計して確認）

## 作成ファイル
1. `content/cards/batch_038.md` — 80件の完成教材（品詞、発音、既知・見落としやすい意味、独自例文、和訳、2文のコアイメージ、Mermaid図、重要語法）
2. `content/data/batch_038.jsonl` — 80件のJSONL構造化カード
3. `reports/content_batch_038.md` — 本報告

## 検証結果
- Markdownカード数：**80** ／ JSONLレコード数：**80** ／ Mermaid図数：**80**
- 元データの `index`、`word`、`candidate_id`、`pos`、採用済みの `meaning_ja` と全件一致：**80/80**
- `batch == 38`、`order_in_batch == 1〜80`、`global_order == 2961〜3040` の連番確認：**80/80**
- 全必須JSONキーと例文・和訳・コアイメージ説明文の存在：**80/80**
- すべてのコアイメージ説明文が2文以上、図が `flowchart LR` 形式：**80/80**
- 元の採用済み候補、他バッチ、アプリ機能への変更：**なし**
- なお検証は形式・対応関係の確認であり、教材の英語表現に対する外部辞書での独立した全面監修を意味しない

## GitHub
- **作業ブランチ**：`content/batch-038`
- **mainへの直接書き込み**：なし
- **教材Markdownのコミット**：[b1c8e019](https://github.com/totoro0419/easyvoca/commit/b1c8e0199636b5292e2d7cb8c3ef01c19a140744)
- **構造化データのコミット**：[a9c8a32c](https://github.com/totoro0419/easyvoca/commit/a9c8a32c21463bbdf070d4c7510794ed34a74274)
- **PR URL**：https://github.com/totoro0419/easyvoca/pull/62

## 未完了・保留
- 対象カードの作成・登録に未完了なし。
- PRは作成済み。mainへのマージは依頼範囲外につき未実施。
