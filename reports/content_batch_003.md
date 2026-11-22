# EasyVoca 完成教材｜担当003 作業報告

- 担当番号：**3**
- 担当範囲：**global_order 161〜240**（元データの `index` は197〜326）
- 対象条件：`decision == "accepted"`、`index` 昇順、同一`index`では`candidate_id` 昇順
- 採用済み候補の全体数：**5,111件**（`main` の候補24ファイルを集計）
- 対象件数：**80件**
- 完了件数：**80件**
- 保留件数：**0件**

## 保存成果物

1. [Markdown教材](../content/cards/batch_003.md) — 80カード（既知義は小さく、隠れた語義を強調。例文、和訳、コアイメージ説明、Mermaid図、必要な語法を収録）
2. [JSONL教材データ](../content/data/batch_003.jsonl) — 80行。指定必須キーと `pronunciation` を収録

## 検証

- JSONL80行、Markdownのカード見出し80件、Mermaid図80件、図コードブロック終端80件で一致。
- global_orderが161〜240の連番、order_in_batchが1〜80の連番、candidate_id重複なし。
- ソース`main/data/candidates/batch_00001_00500.jsonl`にある、採用済み候補と各カードの`candidate_id`/`index`/`word`/`hidden_meaning_ja`が全80件一致。
- 例文→和訳→コアイメージ説明→図の順序と、各図のノード・矢印を静的検査。
- コアイメージ説明は各カード2文で構成。
- 変更対象はバッチ003の教材2ファイルと本報告のみに限定。既存候補、他バッチ、アプリ実装への変更なし。

**検証範囲の明示**：全80図のGitHub上での実レンダリング・実機表示は未検証。Markdown・JSONL・Mermaid構造は検証済み。

## 問題のあった候補・注意点

- **保留を要する候補：なし。**
- `page`（global_order 203）は「ページ」と「呼び出す」の共通語源を無理に説明せず、用法の違いとして図示した。
- `live`（214・215）は形容詞としての発音 `/laɪv/` を採用し、動詞 `/lɪv/` との差を補足した。
- `second`（219）は動詞の発音・会議での支持の用法を補足した。
- `bring`（199）は例文が不規則過去形 `brought` のため、語幹文字列による簡易検索では偽陽性になる。英文は適切な用法であり、修正不要。

## コミット・PR

- Markdown完成コミット：[f51cb351081390cc8f6fcc3eafcf735bf7a9a8fa](https://github.com/totoro0419/easyvoca/commit/f51cb351081390cc8f6fcc3eafcf735bf7a9a8fa)
- JSONL完成コミット：[ce665de5cd771bcce447218a77614883ad276e04](https://github.com/totoro0419/easyvoca/commit/ce665de5cd771bcce447218a77614883ad276e04)
- PR：[ #42 — 完成教材 Batch 003 ](https://github.com/totoro0419/easyvoca/pull/42)
- ブランチ：`content/batch-003`（`main`向け、未マージ）

作成日：2026-11-22
