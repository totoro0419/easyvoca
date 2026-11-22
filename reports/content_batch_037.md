# EasyVoca 完成教材 Batch 037 作業報告

- 担当番号：37
- 対象 global_order：2881〜2960（80件）
- 元データ：main 上の `data/candidates/batch_05001_05500.jsonl`（71件）および `data/candidates/batch_05501_06000.jsonl`（9件）
- 選定方法：main 上の24候補ファイルから `decision == "accepted"` の5,111件を抽出し、`index` 昇順・同一index内 `candidate_id` 昇順
- 対象件数：80
- 完了件数：80
- 保留件数：0
- 問題のあった候補：教材化を保留した候補なし。発音表記の不統一（transparent）1件は修正済み
- 語義の採用判断：元の accepted 状態を変更せず、新規候補・採否の再選定なし

## 保存内容

- `content/cards/batch_037.md`：全80カード（既知の意味は small 表記、見落としやすい意味、品詞、発音、オリジナル例文、和訳、コアイメージ説明、Mermaid図、重要語法）
- `content/data/batch_037.jsonl`：全80件、各行に指定必須キーを収録

## 構造検証

- Markdownカード：80件
- JSONLレコード：80行
- Mermaid図：80個（基本的な図構造・カード間対応を確認。実画面での図描画検証は未実施）
- 元データの candidate_id、index、word、pos、hidden_meaning_ja との全件一致：確認
- `global_order`：2881〜2960の連番
- `order_in_batch`：1〜80の連番
- `candidate_id` の重複：0件
- 語義の再選定、他バッチの更新：なし

## GitHub

- ブランチ：`content/batch-037`
- 教材データ最終コミット（報告ファイル追加前）：https://github.com/totoro0419/easyvoca/commit/f1f602ffbb5607944008b8f371e9414246bf6be1
- PR：https://github.com/totoro0419/easyvoca/pull/73
- PRターゲット：`main`
