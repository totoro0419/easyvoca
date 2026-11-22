# EasyVoca 完成教材 作業報告｜batch 058

## 担当範囲
- 担当番号：**58**
- global_order：**4561〜4640**
- 対象インデックス：10336〜10520（index の欠番・重複語義を含む）
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**

## 元データと作業方針
- 元ブランチ：`main`
- 確認時のmain：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 参照元：`data/candidates/batch_10001_10500.jsonl` と `data/candidates/batch_10501_11000.jsonl`
- 採用条件：`decision == "accepted"` のみ。全5,111件を `index`、`candidate_id` の順に並べた中から、担当58の80件（4561〜4640）を教材化。
- 既存採用語義の変更・追加・再選定、アプリコード変更、辞書本文の転載は行っていない。

## 作成ファイル
1. `content/cards/batch_058.md` — 80カード。単語、品詞、発音、既知の意味、見落としやすい意味、オリジナル例文・和訳、コアイメージ説明、Mermaid模式図、重要語法。
2. `content/data/batch_058.jsonl` — 各行に元候補ID、index、global_order、教材全項目を収録した80レコード。
3. `reports/content_batch_058.md` — 本報告。

## 確認結果
- JSONL 80行、Markdown 80カード、Mermaid図 80件：一致。
- `candidate_id` 重複：0。
- 80件すべてで元データの `index` / `candidate_id` / `word` / `pos` / `meaning_ja` と一致。
- JSONL必須キーの欠落：0。
- Markdown中の各例文、和訳、説明文、図とJSONLの内容一致：80/80。
- `global_order` 4561〜4640、`order_in_batch` 1〜80：連続。
- Mermaidの `flowchart LR`、中心→既知、中心→意外な意味の2本のリンク：80/80。
- 発音は学習用の概略表記であり、全項目を辞書音声と独立照合したものではない。図のコアイメージも語源の断定ではない。
- 他バッチ・元候補ファイルは変更していない。

## 要注意候補・問題点
- `ev-10496-verb-01`（disarray）：動詞用法は現代英語で比較的まれ。採用済み語義を尊重し、教材の重要語法欄で注意を明記。
- `ev-10338-ai-01`（tortilla）：メキシコとスペインで指す料理が異なるため、地域差を明確化。
- 致命的な不整合および保留対象：なし。

## コミット
- 初回40件：[`c8dd347`](https://github.com/totoro0419/easyvoca/commit/c8dd3472041b14be7605e9aa12f9aa72042c9a7c)
- JSONL全80件：[`5977ba9`](https://github.com/totoro0419/easyvoca/commit/5977ba9dab8618a4b5ad634bed5d32d598134d4e)
- Markdown全80件：[`32d8098`](https://github.com/totoro0419/easyvoca/commit/32d8098ac9e945319df2d996a00f1885be0eb7e7)

## PR
- [PR #85 — content: 完成教材カード batch 058（80語義・Mermaid図付き）](https://github.com/totoro0419/easyvoca/pull/85)
- head：`content/batch-058`
- base：`main`
- PRの統合は実施していない。
