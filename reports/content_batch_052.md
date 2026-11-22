# EasyVoca 教材作成報告｜Batch 052

## 担当範囲
- 担当番号：**52**
- `global_order`：**4081〜4160**（両端含む）
- 元データの `index`：**8833〜9172**
- 並び順：`decision == "accepted"` のみを `index` 昇順、同 `index` 内 `candidate_id` 昇順
- 採用済み候補の全体件数：5,111件（main の review 24バッチの `accepted_count` 合計）
- 対象元ファイル：
  - `data/candidates/batch_08501_09000.jsonl`（今回の45件）
  - `data/candidates/batch_09001_09500.jsonl`（今回の35件）

## 結果
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 新規語義の追加・再選定：なし
- 既存の語義データ・他バッチへの変更：なし

## 成果物
1. `content/cards/batch_052.md` — 80カード、オリジナル英文、和訳、コアイメージ説明、Mermaid模式図80個
2. `content/data/batch_052.jsonl` — 80行の構造化カードデータ
3. `reports/content_batch_052.md` — 本報告

## 品質・整合性検査
- GitHubに保存された両教材ファイルを再取得して検証
- JSONL 80行、Markdown 80カード、Mermaid図 80個で件数一致
- 全80件の `index`・`candidate_id`・`word`・`pos`・`hidden_meaning_ja` をmainの accepted 候補と照合し一致
- `global_order` 4081〜4160、`order_in_batch` 1〜80 が連続
- すべてのカードで例文・和訳がコアイメージ説明および図より前に配置
- Mermaid は `flowchart LR` と中心→既知・中心→見落としやすい意味の2分岐
- `main...content/batch-052` の比較では、報告追加前の変更は対象教材2ファイルのみ（他バッチ変更なし）

## 問題のあった候補・補足
- **保留または未完成となった候補なし**。
- `pulse`、`cape`、`maroon` など同綴りでも別用法となる語は、無理な語源的接続を避けて説明。
- `buffet`、`learned` など品詞・語義で発音が異なる語は、今回学ぶ語義の発音を優先。
- `pat` の元データの語法欄にある「要調査」の文言は教材には残さず、実例 `pat answer` として簡潔化。

## コミット
- JSONL完成コミット：https://github.com/totoro0419/easyvoca/commit/28eef4fe9c6532dfd2badc07dd773ee137d6cc90
- Markdown完成コミット：https://github.com/totoro0419/easyvoca/commit/0b7b759728531f348242d8beff100c4cf2740280

## Pull Request
- **https://github.com/totoro0419/easyvoca/pull/87**
- 対象ブランチ：`content/batch-052` → `main`
