# EasyVoca 完成教材｜バッチ028 作業報告

## 担当範囲・作業結果

- 担当番号：28（ブランチ `content/batch-028`）
- 対象：採用済み語義 `global_order` 2161〜2240（両端を含む）
- `index` 範囲：3560〜3769
- 事前に全24ファイルの `decision == "accepted"` を集計した総数：5,111件
- 対象件数：80件
- 完了件数：80件
- 保留件数：0件
- 問題のあった候補：なし（未解決のデータ不一致なし）
- 語義の再選定・追加：なし

## 成果物

- [Markdown教材](../content/cards/batch_028.md)：80件。各カードに単語、品詞、発音、補足的な既知の意味、主役の見落としやすい意味、例文、和訳、コアイメージ説明、Mermaid図、必要に応じて語法を収録。
- [構造化JSONL](../content/data/batch_028.jsonl)：80行。元データの `index`・`candidate_id`・`pos`・採用語義を保存。

## 照合・検証

- JSONL：80行、`candidate_id` の重複0、`global_order` の連続性OK
- Markdown：80見出し、Mermaid図80個、既知の意味の小字表示80箇所
- 元の `main` 採用済み候補80件との `index`・`word`・`candidate_id`・`pos`・`meaning_ja` 完全一致
- Mermaidソースは基本構文（`flowchart LR`、中心→既知／中心→見落としやすい意味）と件数を確認。GitHub上の実レンダリングは未実施。
- 他バッチ・元の候補データは変更していない。

## コミット・PR

- Markdown教材最終更新コミット：https://github.com/totoro0419/easyvoca/commit/f1ef32d0a39aa09f61594fac71888f586597bfc4
- JSONL最終更新コミット：https://github.com/totoro0419/easyvoca/commit/dcacf913a34e8617e88d0cfbf556d292458e9753
- PR URL：作成後に記録
