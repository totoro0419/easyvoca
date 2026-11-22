# EasyVoca 完成教材｜Content Batch 040

## 担当
- 担当番号: 40
- global_order: **3121–3200**（80件）
- index: 5926–6115（重複 index は candidate_id 昇順）
- 元データ: `data/candidates/batch_05501_06000.jsonl` 最終35件、`data/candidates/batch_06001_06500.jsonl` 先頭45件
- 元データの抽出条件: `decision == "accepted"`、`index` → `candidate_id` 昇順
- 全採用候補: 5,111件（24ファイル集計）

## 進捗
- 対象件数: **80**
- 完了件数: **80**
- 保留件数: **0**
- 対応済みの問題: 意味同士の結び付けを無理に主張しないよう `pupil` と `sack` の説明・図を調整し、`raising` と `marked` の例文を改善した。
- 未解決の問題候補: なし（語義再選定や辞書の全面的な再照合は本工程の対象外）。

## 成果物
- `content/cards/batch_040.md`：80枚分の完成教材。例文・和訳・コアイメージ説明・Mermaid図を含む。
- `content/data/batch_040.jsonl`：80行の構造化データ。元の `index` / `candidate_id` / 採用済み語義を保持。
- 本ファイル: `reports/content_batch_040.md`。

## 検証
- Markdownカード見出しとJSONL件数: **80 / 80**
- `order_in_batch`: 1–80、`global_order`: 3121–3200、欠番なし
- `candidate_id` 重複: なし
- JSONL必須キー: 全行あり
- 例文 → 和訳 → コアイメージ → Mermaid図 の順序: 確認済み
- Mermaid: 各カードに1つの `flowchart LR`、既知・注目語義への2本の矢印
- 採用候補ファイルおよび他バッチ: 変更なし
- 備考: MermaidのGitHub画面上での全80図の個別描画確認や、例文の第三者校閲は未実施。

## GitHub
- 作業ブランチ: [`content/batch-040`](https://github.com/totoro0419/easyvoca/tree/content/batch-040)
- コンテンツ初回コミット: [`528b9f67`](https://github.com/totoro0419/easyvoca/commit/528b9f67d39a07cde609c3d12f13a894e6f6d08d)
- コンテンツ改善コミット: [`36c0af23`](https://github.com/totoro0419/easyvoca/commit/36c0af23b804fcae8433c388d86091cbe328a67e)
- PR: https://github.com/totoro0419/easyvoca/pull/68
- マージ: 未実施（レビュー待ち）
