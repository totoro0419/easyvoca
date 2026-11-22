# EasyVoca 教材作成バッチ 008 作業報告

## 担当範囲

- 担当番号: **8**
- 採用済み候補全 5,111 件のうち **global_order 561〜640**
- 元データの index: **765〜885**
- 元データ: `main:data/candidates/batch_00501_01000.jsonl`
- 並べ方: `decision == "accepted"` のみを `index` 昇順、同一 `index` は `candidate_id` 昇順

## 進捗

- 対象: **80件**
- 完了: **80件**
- 保留: **0件**
- 問題のあった採用候補: **なし**（語義の再選定・採否変更なし）
- 例文を推敲したカード: 577（check）、598（flight）、612（entity）、630（police）。自然さと対象語義への適合性を改善。

## 成果物

- `content/cards/batch_008.md`：80件のMarkdown学習カード。順序は単語、品詞、発音、よく知られている意味（小さく）、見落としやすい意味（強調）、例文、和訳、コアイメージの説明文、Mermaid図、重要語法。
- `content/data/batch_008.jsonl`：80行の構造化教材。元データの `index`、`candidate_id`、`word`、`pos`、`meaning_ja` を保持。

## 検証

- Markdownのカード見出し: **80**
- JSONLのレコード: **80**
- Mermaid図: **80**
- 既知の意味を小さく表示した箇所: **80**
- 元データの候補ID・index・語義・品詞の一致: **全80件一致**
- 例文、和訳、コアイメージ、図、重要語法のMarkdownとJSONLの一致: **全80件一致**
- `main` との差分確認: この報告を加える前の変更は担当8の教材ファイル2点のみ。
- Mermaid図の基本構造を検査。**GitHub画面での実レンダリングは未確認**。
- 新規語義追加、他バッチの更新、アプリ実装: **なし**。

## GitHub

- Branch: `content/batch-008`
- 教材最終修正コミット: [`40d200ab3c5f46ca7eb3c0c0bd8c7220e945b3ff`](https://github.com/totoro0419/easyvoca/commit/40d200ab3c5f46ca7eb3c0c0bd8c7220e945b3ff)
- PR: https://github.com/totoro0419/easyvoca/pull/52
- PR base: `main`

※ この報告はPR作成後に同一ブランチへ追加した。
