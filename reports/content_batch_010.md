# EasyVoca コンテンツ制作報告｜Batch 010

- 担当番号：10
- 担当範囲（global_order）：721〜800
- 対象：`data/candidates` の `decision == "accepted"` を `index` 昇順、同一 `index` 内 `candidate_id` 昇順に並べたもの
- 基準mainコミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 対象件数：80件
- 教材化完了：80件
- 保留：0件
- 問題のあった候補：なし（既存の採用語義は変更していない）

## 成果物

1. `content/cards/batch_010.md` — 80件のMarkdownカード
2. `content/data/batch_010.jsonl` — 80行の構造化カード
3. `reports/content_batch_010.md` — この作業報告

各カードに単語、品詞、発音の目安、既知義、採用済み語義、独自例文、和訳、コアイメージ説明、Mermaid模式図を収録。重要語法は学習効果がある場合に付記した。画像生成は使用していない。

## 整合性確認

- 元の accepted 候補との `index`・`candidate_id`・`word`・`pos`・採用語義の一致：80/80
- `order_in_batch` 1〜80 と `global_order` 721〜800 の連続性：80/80
- JSONL件数：80
- Markdownカード見出し数：80
- Mermaidコードブロック数：80
- 既知義の小さな表示：80
- 採用語義の強調表示：80
- 例文 → 和訳 → コアイメージ → 図の表示順：80
- 必須JSONLキーの存在、文字列データの非空確認：80/80
- 原候補データは編集していない
- Mermaidは簡潔な `flowchart LR` として構文パターンを確認。GitHub画面でのレンダリングを独立したブラウザ検証で確認したものではない

## コミット・PR

- 教材ファイルの最終書き込みコミット：[`6b6b3ff432af63dc9c5e1611855a8b1404dccaa7`](https://github.com/totoro0419/easyvoca/commit/6b6b3ff432af63dc9c5e1611855a8b1404dccaa7)
- 対象ブランチ：`content/batch-010`
- Pull Request：[PR #39](https://github.com/totoro0419/easyvoca/pull/39)（`main` 向け）
