# EasyVoca 教材作成報告｜Batch 063

## 担当範囲
- 担当番号：63
- 対象：global_order **4961〜5040**（`(63-1)*80+1` から `63*80`）
- 元データ：main（基準コミット `a0729f62003a1d15366a9c8c4b0650258c8489b4`）
- 対象抽出：`decision == "accepted"` のみ。全24候補ファイルを集計し、`index` 昇順、同じ `index` では `candidate_id` 昇順
- mainでの採用済み候補：5,111件
- 本バッチ先頭：`ev-11448-noun-01`（colon, index 11448）
- 本バッチ末尾：`ev-11779-01`（seminal, index 11779）

## 作業件数
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 問題のあった候補：**なし**（元データを変更せず教材化）

## 成果物
- `content/cards/batch_063.md`：80カード、各カードに短い既知義、採用済み語義、品詞、発音、独自例文、和訳、コアイメージ解説、Mermaid図、重要語法
- `content/data/batch_063.jsonl`：80行、元候補の採用語義・ID・index・品詞を保持
- `reports/content_batch_063.md`：本ファイル

## 検証
- Markdown見出し：80件
- JSONLレコード：80行
- Mermaid図：80件
- 必須JSONキー：各行に存在
- global_order：4961〜5040 の連番
- order_in_batch：1〜80 の連番
- `candidate_id`、`index`、`word`、`hidden_meaning_ja`：mainの候補と80件すべて一致
- 例文がコアイメージより先に配置されていること：80件すべて確認
- 変更範囲：本バッチの教材・データ・報告書のみ
- 注意：発音IPAは学習の目安であり、語や方言によって差があり得る

## GitHub
- ブランチ：`content/batch-063`
- 教材コミット：https://github.com/totoro0419/easyvoca/commit/9277e5fdf9882c1036be3fcdbc2384c215a3ccc9
- PR：https://github.com/totoro0419/easyvoca/pull/84
