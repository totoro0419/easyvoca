# EasyVoca 完成教材｜Batch 043 作業報告

## 担当
- 担当番号: **43**
- 対象 global_order: **3361〜3440**
- 元データ: `data/candidates/batch_06501_07000.jsonl` の採用済み候補
- 採用判定条件: `decision == "accepted"`、全24候補ファイルで `index` → `candidate_id` 昇順
- 全採用候補: **5,111件**
- 本担当の先頭: `ev-06589-verb-01`（index 6589, vault）
- 本担当の末尾: `ev-06804-verb-01`（index 6804, lash）
- 参照元 main SHA: `a0729f62003a1d15366a9c8c4b0650258c8489b4`

## 成果
- 対象件数: **80件**
- 完了件数: **80件**
- 保留件数: **0件**
- 問題のあった候補: **なし**
- Markdown教材: `content/cards/batch_043.md`
- JSONL教材: `content/data/batch_043.jsonl`
- コアイメージ図: **Mermaid 80件**（画像ファイルは生成せず）
- 各カードに単語、品詞、発音、既知の意味、採用済みの見落としやすい意味、独自例文と和訳、コアイメージ説明、Mermaid図、必要な重要語法を記載

## 検証結果
- 保存後GitHubからMarkdown・JSONL・元候補データを再取得
- JSONL 80行、Markdownカード見出し80件、Mermaidブロック80件: **PASS**
- 全件の `candidate_id` / `index` / `word` / `pos` / `hidden_meaning_ja` が採用済み元データと一致: **PASS**
- `batch` / `order_in_batch` / `global_order` と必須JSONLキー: **PASS**
- MarkdownとJSONLの例文・コアイメージ説明、Mermaidの既知／意外な意味: **PASS**
- 他バッチおよび採用判定データ: **変更なし**（本作業では担当用ファイルのみ追加）

## 内容上の注意
- 同綴異義語（例: `dove` の名詞・動詞、`rose`）は無理に同一の語源やコアイメージで結び付けない。
- `herb` は意味の派生ではなく、米英の発音差として説明した。
- 発音は主に米国英語の目安。地域差の大きいものは必要に応じて併記。

## GitHub
- ブランチ: `content/batch-043`
- JSONL追加コミット: https://github.com/totoro0419/easyvoca/commit/d4d0d30dafd4f399705c687b7baf41775302b135
- Markdown追加コミット: https://github.com/totoro0419/easyvoca/commit/d7afcb5c549e39039d0c710b566fe6f82293317a
- PR: https://github.com/totoro0419/easyvoca/pull/64
- マージ先: `main`（本作業ではマージしない）
