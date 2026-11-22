# EasyVoca 完成教材｜担当42 作業報告

- 担当番号: **42**
- 担当範囲: **global_order 3281〜3360**
- 採用済み語義の総数（mainの対象24ファイルを集計）: **5111件**
- 対象件数: **80件**
- 完了件数: **80件**
- 保留件数: **0件**
- 参照元: `data/candidates/batch_06001_06500.jsonl` および `data/candidates/batch_06501_07000.jsonl`
- 確認時のmain基点: `a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 出力: `content/cards/batch_042.md`, `content/data/batch_042.jsonl`

## 品質確認

- acceptedのみ使用し、`index` 昇順・同一indexでは `candidate_id` 昇順を適用。
- JSONL 80行、Markdown 80カード、Mermaid 80図。
- `global_order`・`order_in_batch`の連続性、必須フィールド、元データの`index`・`candidate_id`・品詞・採用語義を照合。
- Markdownでは既知の意味を小さく示し、見落としやすい意味を強調。例文・和訳をコアイメージ説明・図より前に配置。
- 例文・和訳・短いコアイメージ説明・Mermaid図を各カードに作成。
- GitHub上のMermaidの実描画・発音の外部音声照合は今回未確認。

## 注意・修正した候補

- `quarry` (3298), `stitch` (3322), `stunt` (3323), `saw` (3327), `litter` (3332), `batter` (3336): 既知義と今回の語義を不自然な同一起源として結び付けないよう、模式図を「語義の分岐」に変更。
- 語義の採否変更・語義の新規追加なし。**問題による保留はなし。**

## コミット

- Markdown最終調整: https://github.com/totoro0419/easyvoca/commit/d8a600e654ae3534d7ada8d82f24fe8ce79d5ea8
- JSONL最終調整: https://github.com/totoro0419/easyvoca/commit/0a8cee7cee5e5a8e8edfc6ef2a2bd052adf12fbc

## PR URL

https://github.com/totoro0419/easyvoca/pull/74
