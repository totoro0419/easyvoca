# EasyVoca 教材作成レポート｜batch 031

## 対象・進捗

- 担当番号：**31**
- 元データ：`main` の `data/candidates/batch_04001_04500.jsonl`（ほか全23ファイルの採用件数も照合）
- 採用済み語義総数：**5,111件**（全24ファイルの `decision == "accepted"` を集計）
- 並び順：`index` 昇順、同じ `index` 内は `candidate_id` 昇順
- 担当範囲（`global_order`）：**2401〜2480**
- 元データの `index`：**4183〜4418**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**

## 成果物

1. `content/cards/batch_031.md`：80枚のMarkdown教材カード（既知の意味・見落としやすい意味・品詞・発音・オリジナル例文・和訳・コアイメージ説明・Mermaid図・必要時の重要語法）
2. `content/data/batch_031.jsonl`：上記80カードの構造化データ（`batch`, `order_in_batch`, `global_order`, `index`, `word`, `candidate_id`, `pos`等を含む）

教材の対象語義は、既に採用済みの80候補の `meaning_ja` を使用。採否変更、語義追加、原資料の書き換えはしていません。

## 検証結果

- 全24バッチの採用候補件数合計：**5,111件**（PASS）
- 担当対象80件の `index`・`word`・`candidate_id`・`pos`・採用済み語義と元データの照合：**80/80一致**（PASS）
- JSONLの有効なJSON行と必須キー：**80/80**（PASS）
- Markdownカード見出し：**80件**、Mermaid図：**80件**（PASS）
- `candidate_id` 一意性：**80件すべて固有**（PASS）
- `global_order`・`order_in_batch` 連続性：**PASS**
- 例文・和訳・コアイメージ・図の順番：**80件一致**（PASS）
- 全80例文の基本的な文末記号と、コアイメージ説明の文数：**PASS**
- Mermaid構文の文面・個数を点検。ただしGitHubの実画面での80図個別レンダリング・人手による英文の全数ネイティブ校閲は未実施。

## 問題のあった候補・注意

- **保留・未完了候補：なし。**
- `sake`：日本酒という借用語と、`for the sake of` の `sake` は別の語源・発音。説明で混同しないようにした。
- `wool`：採用語義の「人をだます」は、主に `pull the wool over someone's eyes` 全体で表す。単語単体の自由な語義と誤解しないようにした。
- `qualified`：見出し語の動詞用法を、`qualify` の過去形として例文で明示。
- `moor`、`refrain`：意味のつながりを無理にこじつけないよう、品詞・用法の違いを明示。

## コミット・PR

- Markdown完成版コミット：[`2d2cd898f8aac561ba37be9e7301ff8bf77c58a2`](https://github.com/totoro0419/easyvoca/commit/2d2cd898f8aac561ba37be9e7301ff8bf77c58a2)
- JSONL完成版コミット：[`8d69bfa1f2826e55c21f5c687a265ab19ce48627`](https://github.com/totoro0419/easyvoca/commit/8d69bfa1f2826e55c21f5c687a265ab19ce48627)
- 専用ブランチ：`content/batch-031`
- PR：**https://github.com/totoro0419/easyvoca/pull/59**（`main` 向け）
