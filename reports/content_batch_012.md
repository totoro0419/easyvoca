# EasyVoca 教材作成報告｜Batch 012

- 担当番号：**12**
- 対象：`global_order` **881〜960**（両端を含む）
- 採用済み全候補：**5,111件**（mainの24候補バッチの`decision == "accepted"`を集計）
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**
- 対象先頭：`ev-01318-preposition-01`（index 1318、prior）
- 対象末尾：`ev-01449-construction-01`（index 1449、warn）

## 作成ファイル

- `content/cards/batch_012.md`：80カード、オリジナル例文・和訳・2文のコアイメージ説明・Mermaid図・重要語法を掲載。
- `content/data/batch_012.jsonl`：80行、カードごとの構造化データを保存。

## 検証

- `decision == accepted`を抽出し、`index`昇順・同一`index`内`candidate_id`昇順で担当範囲を確定。
- 対象データの`candidate_id`と`index`を原本に照合済み。
- Markdownに80個のカード見出しがあり、JSONLは80行。ID重複なし。
- 全カードに単語、品詞、発音、既知の意味、主役の意味、例文、和訳、コアイメージ説明、Mermaid図を収録。
- 全カードに2文の説明文を収録。既存の語義選定データは変更なし。
- Mermaid図のGitHub画面上での個別レンダリング、および実際の学習効果については未確認。

## 問題のあった候補

- **作成を保留した候補：なし。**
- `found`（同綴りの別動詞）、`wind`（意味による発音差）、`familiar`（with/toの使い分け）などは説明で区別。
- 80件全件の独立した辞書再確認は今回の作業対象外。

## GitHub

- ブランチ：`content/batch-012`
- Markdown教材コミット：[0ddb601460cd512652bfe4b3c1dee2708b5c3265](https://github.com/totoro0419/easyvoca/commit/0ddb601460cd512652bfe4b3c1dee2708b5c3265)
- JSONLコミット：[c982303e0fa5626c0ee760b80b549919b340dd8b](https://github.com/totoro0419/easyvoca/commit/c982303e0fa5626c0ee760b80b549919b340dd8b)
- PR：[https://github.com/totoro0419/easyvoca/pull/43](https://github.com/totoro0419/easyvoca/pull/43)
