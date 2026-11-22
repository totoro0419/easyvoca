# EasyVoca 教材化作業報告：batch 006

## 対象
- 担当番号：**6**
- global_order：**401〜480**（両端含む）
- 元データ：`main` の `data/candidates/batch_00001_00500.jsonl` と `data/candidates/batch_00501_01000.jsonl`
- 抽出方法：`decision == "accepted"` に限定し、`index` → `candidate_id` の昇順
- 元データ確認時のmainコミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 最初の候補：`ev-00509-noun-01`（collection、index 509）
- 最後の候補：`ev-00642-adverb-01`（quite、index 642）

## 件数・進捗
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- Markdown教材：`content/cards/batch_006.md`
- JSONL教材データ：`content/data/batch_006.jsonl`

## 実施内容
採用済み80語義それぞれに、単語・品詞・発音、短い既知の意味、主役となる隠れた意味、オリジナル英文と和訳、2文程度のコアイメージ説明、中心・既知・別義の関係を示すMermaid図、必要な語法を作成。採用済みの意味・品詞・ID・indexはそのまま保持。

## 検証
- JSONL：**80行**、各行JSONとして解析可能
- Markdown：**80カード見出し、80個のMermaidコードブロック**
- 80件すべてについて、JSONLの `candidate_id`、`index`、`word`、`pos`、`hidden_meaning_ja` がmain元データと一致
- JSONLに指定キーがあり、global_order と order_in_batch が連続
- 全件で図の基本義・別義のラベルが記録と一致
- 全件でMarkdownとJSONLの英文・和訳が一致
- 既存の候補・他バッチファイルは変更していない
- GitHub上で両教材ファイルを再取得して検証済み
- 外部辞書との網羅的な再照合・実際の学習効果測定は今回の範囲外

## 問題のあった候補
- **保留・欠落：なし。**
- 注記：`quite` は修飾語や英語の地域差によって強さが変わるため、例文・コアイメージ・語法欄で注意を補った。語義の採否は変更していない。

## コミット・PR
- 教材Markdownコミット：https://github.com/totoro0419/easyvoca/commit/50c380df995f18bf6a47b86beb4cbeb579626a8b
- JSONLコミット：https://github.com/totoro0419/easyvoca/commit/6064c68c748835f1f05cf78a0698a173f07a2d05
- PR：https://github.com/totoro0419/easyvoca/pull/27
- ブランチ：`content/batch-006` → `main`
