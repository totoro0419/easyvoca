# EasyVoca 完成教材｜担当62 作業報告

- 作業日：2026-11-22
- 担当番号：62
- 担当範囲：global_order **4881〜4960**（両端を含む）
- 元データの index 範囲：**11204〜11440**
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**
- 対象：main の `decision == "accepted"` の候補のみ。index 昇順、同一 index 内は candidate_id 昇順。
- 採用済み候補の全体件数：**5111件**（main の24候補ファイルを個別に数えて確認）

## 作成物

1. `content/cards/batch_062.md` — 学習カード80件。既知の意味を小さく表示し、別義を強調。品詞・発音・独自例文・和訳・コアイメージ説明・Mermaid模式図・重要語法（必要な場合）を収録。
2. `content/data/batch_062.jsonl` — 1行1カードの構造化データ80件。必要キーを含み、発音フィールドも追加。

## 検証結果

- Markdown のカード見出し：80件
- Markdown の Mermaid 図：80件
- JSONL の有効な各行：80件
- 例文→和訳→コアイメージ説明→図の順序：80件で確認
- JSONL の order_in_batch：1〜80、global_order：4881〜4960 の連番を確認
- 各カードの candidate_id、index、word、pos、hidden_meaning_ja が main の採用済み元データと一致：**80/80件**
- 各カードの例文・和訳・既知の意味・コアイメージ説明・発音欄に空値なし
- Mermaid の各図に中心→既知義、中心→別義の２つの矢印があることを確認
- 他バッチおよび既存候補ファイルは変更なし
- **未実施：** Mermaid の実際のGitHubレンダリング目視、発音の辞書による個別再検証、全80例文の外部ネイティブ査読（今回の作業対象外）

## 問題のあった候補・注意点

- 教材化を妨げるデータ不整合：**なし**
- `aged`（global_order 4928）は、年齢を示す場合と「年老いた」で発音が異なる点を明示。
- `sic`（4895）、`alma mater`（4944）、`bona fide`（4953）は、単純な単語の語義と混同せず定型表現／引用注記として説明。
- いずれも採用済み語義の再選定や新規語義追加は行っていない。

## GitHub 保存

- ブランチ：`content/batch-062`
- 教材本体コミット：[`ce5f9e42553278aef0c38cd355103249f556b6b3`](https://github.com/totoro0419/easyvoca/commit/ce5f9e42553278aef0c38cd355103249f556b6b3)
- PR URL：https://github.com/totoro0419/easyvoca/pull/75
- PR 対象：`main`
- main への直接変更：なし
