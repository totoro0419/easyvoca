# EasyVoca 完成教材 バッチ029 作業報告

## 担当
- 担当番号：29
- 対象リポジトリ：`totoro0419/easyvoca`
- 対象：`main`採用済み候補（`decision == "accepted"`）の`index`昇順、同一`index`内`candidate_id`昇順
- 全体採用候補：5,111件（24個の候補JSONLで件数集計）
- 担当global_order：**2241〜2320**（80件）
- 担当対象のindex：3771〜3969
- 元データ：`data/candidates/batch_03501_04000.jsonl`
- 参照した元データのblob SHA：`ef2d409c756d8b5df566012e9948b071da370d39`

## 作業結果
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 問題のあった候補：**なし**（今回の対象・構造照合上）
- 新規採用語義：なし
- 既存の選定データの変更：なし

## 保存したファイル
1. `content/cards/batch_029.md`：全80件の完成教材カード（品詞・発音・既知義・見落としやすい語義・例文・和訳・コアイメージ・Mermaid模式図・重要語法）
2. `content/data/batch_029.jsonl`：元候補の識別子と学習コンテンツを含む全80件の構造化データ
3. `reports/content_batch_029.md`：本報告書

## 実施した検証
保存済みの元候補JSONL・教材Markdown・完成JSONLを再取得して照合。
- Markdown見出し：80カード、2241〜2320が連続
- JSONL：80件、global_orderとorder_in_batchが連続
- Mermaid：80図、各図が`flowchart LR`で中心→既知／注目の2方向の構造を持つ
- 80件の`index`・`candidate_id`・`word`・`pos`・採用語義が元データと全件一致
- 必須JSONLキーに欠落なし、コアイメージは各2文以上
- 機械的な照合エラー：**0件**

検証範囲の注意：実際のGitHub画面でのMermaid描画・人手による全例文のネイティブ校閲・学習アプリでの表示は未実施。これらを実施済みと記載しない。

## GitHub
- ブランチ：`content/batch-029`
- 教材・構造化データの最終更新コミット：[`879afc395787ac718cbd4471348688c828b0be50`](https://github.com/totoro0419/easyvoca/commit/879afc395787ac718cbd4471348688c828b0be50)
- PR：[#53 — 完成教材バッチ029](https://github.com/totoro0419/easyvoca/pull/53)
- PR向けベース：`main`
- PR作成日時：2026-11-22（日本時間）

