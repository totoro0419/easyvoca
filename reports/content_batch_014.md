# EasyVoca 完成教材｜Batch 014 作業報告

- 担当番号：**14**
- 担当範囲：**global_order 1041〜1120**
- 元データの index 範囲：**1607〜1771**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 問題のあった候補：**なし**（形式と元データとの対応について）
- 採用済み候補の全体件数：**5,111**（2026-11-22 main の24ファイルで確認）

## 保存したファイル

1. `content/cards/batch_014.md`（80枚の完成教材。例文、和訳、コアイメージ説明、Mermaid図を含む）
2. `content/data/batch_014.jsonl`（80行。1行につき1カード）
3. `reports/content_batch_014.md`（本報告）

## 検証

- 全カードについて `candidate_id`, `index`, `word`, `pos`, `hidden_meaning_ja` が元の accepted 候補に一致（80/80）。
- `global_order` は1041から1120まで連続し、`order_in_batch` は1から80まで連続（80/80）。
- JSONL必須キー、例文、和訳、コアイメージ説明、Mermaidの基本構文（`flowchart LR`、3節点と2矢印）を確認。
- Markdown教材にカード見出し80件、既知義80件、例文80件、コアイメージ80件、Mermaidブロック80件が存在。
- 元の候補データと他の担当バッチを変更していない。
- Mermaid図のGitHub上での実際の視覚表示までは未検証（構文と保存内容を確認）。

## GitHub記録

- 作業ブランチ：`content/batch-014`
- JSONL初回コミット：[c42f80d](https://github.com/totoro0419/easyvoca/commit/c42f80d51f83571564e2f8903bd13c7054d7e07b)
- JSONL全80件コミット：[a382f39](https://github.com/totoro0419/easyvoca/commit/a382f39aa43fd15c04fb78c23d955368ef56c642)
- Markdown教材コミット：[bd2f05e](https://github.com/totoro0419/easyvoca/commit/bd2f05e13013e6033f52fc63398d118f4261aa8d)
- PR：https://github.com/totoro0419/easyvoca/pull/37

元データは採用済みの語義のみを使用。新しい語義の追加、既存の採否変更、アプリ実装、画像生成は行っていない。
