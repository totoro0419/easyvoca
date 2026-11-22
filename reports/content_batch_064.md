# EasyVoca 教材作成報告 — Batch 064

## 担当
- 担当番号: **64**
- 対象 global_order: **5041〜5111**
- 対象: 採用済み候補 5111 件のうち最終 71 件
- 選定順: `decision == "accepted"` → `index` 昇順 → `candidate_id` 昇順
- 対象元データ: `data/candidates/batch_11501_12000.jsonl`
- 起点の main: `a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 最初の候補: `ev-11781-01`（senseless, index 11781）
- 最後の候補: `ev-12000-01`（paternalistic, index 12000）

## 実施結果
- 対象件数: **71**
- 教材カード完了: **71**
- 保留: **0**
- Markdown: `content/cards/batch_064.md`（カード71件、Mermaid図71件）
- JSONL: `content/data/batch_064.jsonl`（71行）
- 例文・和訳・コアイメージの説明文・重要語法を各カードに収録。
- 発音は学習用の目安としてIPAで記載。なお、地域・品詞による変異は必要に応じて学習時に確認する。

## 候補に関する特記事項
- **保留となった候補・処理不能な候補はなし。**
- `sow`（index 11799）は同綴りで動詞 /soʊ/ と雌ブタを表す名詞 /saʊ/ を分けて教材化した。
- `digest`（index 11825）は動詞と名詞の強勢の違いを明示した。
- `siren song`、`curry favor` など、字義と慣用句の意味が直結しない語は、その違いを説明した。
- `engaged`（index 11933）の異なる採用語義は、それぞれ独立カードにした。

## 検証
- GitHub上のブランチからMarkdown・JSONL・元候補データを再取得し、比較した。
- JSONL件数 = Markdownカード件数 = Mermaid図数 = **71**。
- 71件すべてで元データの `candidate_id`・`index` と順序が一致。
- 各カードの例文・和訳・コアイメージ説明がMarkdownとJSONLで一致。
- 図の既知語義・注目語義ラベルがカード内容と一致。
- すべてのMermaidコードフェンスが閉じられていることを確認。
- 既存の `data/candidates/`・`data/review/` および他バッチには変更を加えていない。
- 構造検証結果: **PASS**。英語としての自然さ・教材内容は作成時に確認したが、外部専門家による校閲は未実施。

## GitHub
- 作業ブランチ: `content/batch-064`
- JSONL作成コミット: https://github.com/totoro0419/easyvoca/commit/00f5c0c5f668b3181026bad5bc2897aa5a625fb5
- Markdown作成コミット: https://github.com/totoro0419/easyvoca/commit/f64fd01a1d6460d868633ddbd03682017589107d
- PR: https://github.com/totoro0419/easyvoca/pull/86
