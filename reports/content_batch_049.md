# EasyVoca 完成教材｜担当49 作業報告

## 担当範囲
- 担当番号：49
- global_order：**3841〜3920**
- 採用済み候補総数：5,111件（`decision == "accepted"`、`index` 昇順・同一 `index` 内 `candidate_id` 昇順）
- 対象件数：**80件**
- 元データ：`data/candidates/batch_08001_08500.jsonl`（main）
- 最初：`ev-08032-adverb-01` / `generously` / index 8032
- 最後：`ev-08249-adjective-01` / `hefty` / index 8249

## 進捗
- 完了件数：**80件**
- 保留件数：**0件**
- 問題のあった候補：**保留や欠落を要する候補なし**
- 内容上の注意：`console`、`scarf`、`crib` の既知・対象語義は直接のつながりを無理に作らず、別用法として説明と図に反映。`concerted` の既知の意味の表示も調整した。
- 元の採用済み語義、他バッチ、アプリ機能には変更なし。

## 成果物
1. `content/cards/batch_049.md`：Markdown完成教材80カード（発音・既知の意味・採用語義・例文・和訳・コアイメージ・Mermaid図・必要な語法）
2. `content/data/batch_049.jsonl`：構造化データ80行（1行1カード）
3. `reports/content_batch_049.md`：本報告

## 検証結果
- `JSONL 80行 == Markdownカード見出し80件 == Mermaid図80個`：合格
- global_order 3841〜3920、order_in_batch 1〜80 の連続性：合格
- `candidate_id` 重複なし、採用候補80件との `index`・`word`・`candidate_id`・`pos`・`meaning_ja` 一致：合格
- 例文・和訳・コアイメージ説明・発音の存在、例文が説明より前：合格
- Mermaid 形式（`flowchart LR`、3ノード、2エッジ）：全80件合格
- コアイメージ説明が各2文以上：全80件合格
- 本検証は保存内容の構造と元データ対応関係のチェック。外部辞書での全数再検証・人手校閲を実施した意味ではない。

## GitHub
- ブランチ：`content/batch-049`
- ベース：`main`（作業開始時 SHA `a0729f62003a1d15366a9c8c4b0650258c8489b4`）
- コンテンツ最終コミット：[afa6211ef60da57bd3f775c70c07cfac60aa7e8c](https://github.com/totoro0419/easyvoca/commit/afa6211ef60da57bd3f775c70c07cfac60aa7e8c)
- PR：[ #82 — 完成教材バッチ049](https://github.com/totoro0419/easyvoca/pull/82)（main向け）
