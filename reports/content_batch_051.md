# EasyVoca 教材作成報告｜Batch 051

## 担当情報
- 担当番号：**51**
- 対象範囲（global_order）：**4001〜4080**
- 元データ index 範囲：**8490〜8823**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 元データ：main の `data/candidates/batch_08001_08500.jsonl` および `data/candidates/batch_08501_09000.jsonl` の `decision == "accepted"` から抽出
- 並び順：全5111件を `index` 昇順、同一 `index` 内は `candidate_id` 昇順。担当51は4001〜4080件目。

## 成果物
1. `content/cards/batch_051.md` — 80教材カード。各カードに単語・品詞・発音（簡略IPA）・既知義・見落としやすい語義・オリジナル英文・和訳・コアイメージ説明・Mermaid図・必要な語法を記載。
2. `content/data/batch_051.jsonl` — 同一80カードの構造化データ。発音は `pronunciation_ipa_approx` に保存。

## 問題のあった候補
- **該当なし（保留0件）**。
- `referee`（global_order 4014・4015）、`dispose`（4046・4047）は、いずれも**別の採用済み語義**のため、それぞれ別カードとして保持。
- 例文はすべて新規作成。IPAは学習上の目安として強勢・音節区切りを省略（辞書再照合は今回の範囲外）。

## 検証結果
GitHubの保存済みブランチからファイルを再取得し、以下を確認：
- JSONL：80行、Markdown：80カード、Mermaid：80図
- `global_order` 4001〜4080が連続し、`order_in_batch` 1〜80が連続
- `candidate_id` 重複なし、必須JSONLキー全件存在
- 例文がコアイメージ説明より前にある
- 各図は中心イメージから既知義・見落としやすい語義の両方へ接続
- 対象の最初：`ev-08490-noun-01`（infancy）、最後：`ev-08823-noun-01`（doing）
- 選定候補の原本、他の教材バッチおよび既存のアプリコードには変更なし

## コミットとPR
- Markdown追加：[`437df4f470482b2b3d6bede27cf7f2272a76ccf9`](https://github.com/totoro0419/easyvoca/commit/437df4f470482b2b3d6bede27cf7f2272a76ccf9)
- JSONL追加：[`a2e05dea3c711ff3159ae997d0c3c6489f7409b2`](https://github.com/totoro0419/easyvoca/commit/a2e05dea3c711ff3159ae997d0c3c6489f7409b2)
- 報告書追加：このファイルのGit履歴を参照
- PR：<https://github.com/totoro0419/easyvoca/pull/65>（main向け）
