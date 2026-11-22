# EasyVoca 完成教材｜担当13 作業報告

- **担当番号**：13
- **global_order 範囲**：961〜1040
- **対象件数**：80
- **教材カード完了**：80
- **保留**：0
- **元の index 範囲**：1450〜1605
- **対象データ**：main の `decision == "accepted"` の候補を `index`、`candidate_id` で並べて抽出（24バッチ合計5,111件）

## 成果物

1. `content/cards/batch_013.md` — 80枚の完成カードと80個のMermaid図。
2. `content/data/batch_013.jsonl` — 80行のカード構造化データ。
3. 本ファイル — 担当範囲・件数・結果・GitHubリンク。

## 問題のあった候補と対応

- **採用候補の破損・不一致**：なし。
- **語義上の注意**：`fair`（公平／見本市）、`root for`（応援）、`horse around`（ふざけ回る）は単語の字義から無理に説明せず、別系統の意味または慣用表現として説明。
- **使用域の注意**：`alien`（外国人）は法律・行政の文脈を明記。`hall`（廊下）は主に米国英語と明記。
- **保留候補**：なし。

## 検証結果

- 全80件に単語、品詞、発音、既知義、学習対象の別義、オリジナル例文、和訳、コアイメージ、Mermaid模式図を収録。
- JSONL 80行、Markdownのカード見出し80個、Mermaidブロック80個の件数一致を確認。
- `candidate_id`、`index`、`word`、`pos`、学習対象の`meaning_ja`、global_order をmainの採用候補に対して全件照合し一致。
- 他バッチ、既存候補データ、マスター、アプリ実装は変更していない。
- **未実施**：ブラウザーを用いたMermaid図の実レンダリング確認、全英文のネイティブ校閲（プログラムでの構造確認と生成時の英語表現確認まで）。

## コミット・PR

- JSONL最終更新：[`04b477c`](https://github.com/totoro0419/easyvoca/commit/04b477cc9c0cba9fa0eadc3a46d1f8103a44bd12)
- Markdown生成：[`e31290f`](https://github.com/totoro0419/easyvoca/commit/e31290f630e72e6e2ae0921a6706875b48c31a31)
- PR：[**#35**](https://github.com/totoro0419/easyvoca/pull/35)（`content/batch-013` → `main`）

保存日：2026-11-22
