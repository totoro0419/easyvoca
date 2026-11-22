# EasyVoca 完成教材｜担当9 作業報告

## 対象
- 担当番号：9
- global_order：**641〜720**
- 対象：main の `decision == "accepted"` を `index`、`candidate_id` の順に並べた採用済み候補80件
- 元の index 範囲：**886〜992**
- 最初の候補：`ev-00886-verb-01`（audit）
- 最後の候補：`ev-00992-noun-01`（title）
- 読み取った採用済み候補ファイル：`data/candidates/batch_00001_00500.jsonl`、`data/candidates/batch_00501_01000.jsonl`。この2ファイルで採用済み候補が729件あり、global_order 720番までの対象を特定可能。

## 成果
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- Markdown：`content/cards/batch_009.md`
- JSONL：`content/data/batch_009.jsonl`
- 各カードに既知の意味、見落としやすい意味、発音目安、オリジナル例文、和訳、コアイメージ、Mermaid模式図を収録。重要語法は関連するものに限って記載。
- 新しい語義の選定・追加、既存候補の変更、他バッチの変更は行っていない。

## 確認
- 保存済みMarkdown・JSONLをGitHubから再取得して確認。
- Markdownカード見出し：80件、JSONL：80行、Mermaid図：80件。
- JSONLの必須14キーを全行で確認。
- `global_order` 641〜720 と `order_in_batch` 1〜80 の連続性を確認。
- 候補元の `index`・`candidate_id`・`word` を維持し、Markdownとの対応も確認。
- **構造検証：PASS**。アプリ上のレンダリングや発音音声の実測は対象外・未実施。

## 問題のあった候補・対応
- `ev-00916-noun-01`（trip）：例文をより自然な表現に修正してMarkdown・JSONLを揃えた。
- 残る保留・未解決の候補：なし。
- 発音はカタカナ表記の参考値であり、厳密なIPA転記や音声収録ではない。

## コミット
- Markdown初回追加：[`326c0287`](https://github.com/totoro0419/easyvoca/commit/326c0287031153f4089b8a67f25508ee082412cb)
- JSONL初回追加：[`bd7a2db7`](https://github.com/totoro0419/easyvoca/commit/bd7a2db71f6553176572a6c1d038b8886752a8c4)
- trip例文修正：[`a8024700`](https://github.com/totoro0419/easyvoca/commit/a8024700fd5c9935660196bd1123b9542cae81d0)、[`dcb9da12`](https://github.com/totoro0419/easyvoca/commit/dcb9da12be1f5a7e7d0a8bca468d3013418a05ff)

## PR
- [PR #40 — EasyVoca 完成教材 batch 009](https://github.com/totoro0419/easyvoca/pull/40)
- ブランチ：`content/batch-009` → `main`
