# EasyVoca コンテンツ作成報告｜Batch 059

- 担当番号：59
- 対象範囲：global_order **4641〜4720**（両端を含む）
- 対象件数：**80件**
- 教材カード枠作成：**80件**
- 完了件数：**79件**
- 保留件数：**1件**
- 参照候補：`data/candidates/batch_10501_11000.jsonl`（main）
- 採用済み候補全体：**5,111件**（`decision == "accepted"`）
- 抽出規則：`index` 昇順、同一 `index` 内は `candidate_id` 昇順

## 作成したファイル

1. `content/cards/batch_059.md` — 全80候補のカード（1件は保留表示）
2. `content/data/batch_059.jsonl` — 全80候補の構造化データ（保留1件は `status: "hold"`）

各完成カードには、品詞・発音・既知義・隠れた語義・独自例文・和訳・コアイメージの短文説明・Mermaid図・必要な語法を収録した。

## 問題のあった候補

- **global_order 4691 / index 10662 / `ev-10662-adjective-01` / overrule**
  - 元候補は単語 `overrule`、品詞 `adjective` だが、登録された `meaning_ja` は「行われるべきことが以前から実現していない」という `overdue` の意味であり、`usage_note` も `long overdue`。
  - 語義の再選定や元データの変更は今回の作業範囲外のため、候補の識別子・登録語義を保持し、例文と和訳を空欄にして教材利用を保留。
  - 対処：元候補の語形・品詞・意味の整合性を確認・是正した後、この1件のカードを完成させる。PRはそれまでDraft。

## 検証

- 元の `accepted` 候補を全24ファイルから集計：**5,111件**。
- Markdown見出し：**80件**、Mermaid図：**80件**、既知義の小文字表示：**80件**。
- JSONL：**80行**、各行はJSONとして読み込み成功。
- global_order：**4641〜4720** が連続、バッチ内番号：**1〜80**。
- `candidate_id` / `index` / `word` / `pos` / `hidden_meaning_ja` は元候補80件と全件一致。
- Mermaid図は全80件が `flowchart LR`、3ノードと2本の接続線からなる構文形式。
- 保留1件を除き、例文・和訳は非空欄。
- Git比較では、既存の辞書・他バッチへの変更なし。変更対象は担当専用の2教材ファイルとこの報告ファイル。

## コミット・PR

- Markdownの全80件追記コミット： https://github.com/totoro0419/easyvoca/commit/6c9b2288b9b5451e2bf6d1409a22600bd9a2bc3d
- JSONLの全80件追記コミット： https://github.com/totoro0419/easyvoca/commit/8f0d69094cfa399e390a274ff0c8c0a41c6dac5c
- 専用ブランチ：`content/batch-059`
- PR（main向け、Draft）： https://github.com/totoro0419/easyvoca/pull/83

※教材ファイルは保存済み。1件の原候補不整合があるため、全80件の教材完成とは宣言しない。
