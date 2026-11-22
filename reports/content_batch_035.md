# EasyVoca 完成教材バッチ035 作業報告

- 担当番号：**35**
- 対象範囲：**global_order 2721〜2800**（全80件）
- 採用語義総数：**5111件**（main上の24個の候補バッチから `decision == "accepted"` を集計）
- 並び順：`index` 昇順、同一 `index` では `candidate_id` 昇順
- 対象元データ：`data/candidates/batch_04501_05000.jsonl` 末尾27件＋`data/candidates/batch_05001_05500.jsonl` 先頭53件
- 完了件数：**80件**
- 保留件数：**0件**

## 作成した教材

- `content/cards/batch_035.md`：80件、80個のMermaidフローチャート
- `content/data/batch_035.jsonl`：80行、全必須キー（発音・重要語法を含む）

カードでは既知の意味を補足的に配置し、見落としやすい意味を主役として、オリジナル例文→和訳→コアイメージ→模式図→必要な重要語法の順に配置した。

## 整合性検証

- 対象80件の `index`、`candidate_id`、`word`、`pos`、`meaning_ja` をmainの採用済み候補と1対1で照合：不一致 **0**
- `global_order` 2721〜2800と`order_in_batch` 1〜80の連続性：**PASS**
- JSONL 80行／Markdownカード80件／Mermaid図80個：**PASS**
- 各カードの例文・和訳・コアイメージ・模式図の欠落：**0**
- コアイメージ解説は各カード2文以上、Mermaidはシンプルな`flowchart LR`
- 他バッチ・元候補・マスターデータは変更しない

## 留意した候補・保留事項

- `tender`（2721・2722）：形容詞の「柔らかい」と名詞・動詞の正式な申し出は語源系統が異なるため、同一の意味変化を無理に仮定しない図に修正。
- `beg the question`（2737）：単なる「疑問を生じさせる」ではなく「論点先取・循環論法」を示す例文に修正。
- `gorge`（2741）：名詞・動詞を通じた「のど」のイメージに説明を修正。
- `soup`（2751）の`in the soup`は古めの口語、`alphabet`（2779）の比喩はやや文語的であることを注記。
- 発音欄：80件中78件に表記。確信の薄い`notwithstanding`の2件は誤った発音情報を避けるため省略（教材の語義・例文・図は完成）。
- 出典の新規調査や既採用の再選定は行わず、各カードの例文はオリジナルで作成した。

## GitHub

- ブランチ：`content/batch-035`
- 教材内容の最終同期コミット：[`e1c821ba16eb971e4684b6fc70d6e0de359dcc8e`](https://github.com/totoro0419/easyvoca/commit/e1c821ba16eb971e4684b6fc70d6e0de359dcc8e)
- PR：作成後に追記
