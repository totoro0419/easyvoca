# EasyVoca 教材作成報告 — Batch 016

- 担当番号：**16**
- 担当範囲：**global_order 1201〜1280**
- index の範囲：1935〜2063
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- GitHub ブランチ：`content/batch-016`
- PR：**https://github.com/totoro0419/easyvoca/pull/41**
- 構造化データの内容完成コミット：[`356e57da8587acd30222ef524013a3b9d76623ae`](https://github.com/totoro0419/easyvoca/commit/356e57da8587acd30222ef524013a3b9d76623ae)
- Markdown 教材作成コミット：[`b533b80cb8ab13e7dd592286876370afd267f11a`](https://github.com/totoro0419/easyvoca/commit/b533b80cb8ab13e7dd592286876370afd267f11a)

## 対象の特定

`decision == "accepted"` のみを `index`、同一 `index` 内は `candidate_id` 昇順で選択した。
既存候補の先頭3バッチの採用件数を元 JSONL で再確認：386、343、264（累計993）。
第4バッチの採用244件のうち global_order 1201〜1237 の37件と、第5バッチの採用348件のうち1238〜1280の43件を対象とした。
先頭候補：`ev-01935-verb-01`（flag）、末尾候補：`ev-02063-noun-01`（impression）。

## 作成ファイル

- `content/cards/batch_016.md`：80カード。既知の意味は補足表示、見落としやすい意味を中心に、オリジナル例文→和訳→コアイメージ説明→Mermaid図→必要な語法の順に配置。
- `content/data/batch_016.jsonl`：80行。必須14キーに加え発音 `pronunciation` と原採用語義 `source_meaning_ja` を収録。
- `reports/content_batch_016.md`：本報告。

## 検証結果

- JSONL：**80件**、global_order 1201〜1280、order_in_batch 1〜80を連番確認。
- candidate_id の重複：**0**。index/word/candidate_id/pos/採用語義を元データから継承。
- 必須フィールドの欠落：**0**。コアイメージ説明は各2文以上。
- Markdown：**80カード**、Mermaid図 **80件**。各カードで例文→和訳→コアイメージ→図の順を確認。
- 採用・不採用の再判定は行わず、元の候補・既存ファイルは変更していない。
- 発音・訳文・図の全件について外部辞書等で独立照合したわけではない。表示・図の実レンダリングは未検証。

## 注意を要する候補

- `ev-02003-noun-01`：元データの見出し語は `asian`。英文では一般的な正書法 `Asian` を採用し、英米差は傾向であり個人や文脈で変わることを語法欄に明記。
- `ev-01981-verb-01`：`desert` の動詞と名詞の発音差を説明。
- `ev-02062-noun-01` / `ev-02062-verb-02`：`row` の発音と品詞の違いを明記。
- `ev-02052-modal_verb-01` / `ev-02052-modal_verb-02`：`ought to` の推量と過去の判断を別カードで扱った。

以上はいずれも教材化完了、保留対象なし。
