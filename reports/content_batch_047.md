# EasyVoca 完成教材 作業報告 — Batch 047

## 担当範囲
- 担当番号：**47**
- global_order：**3681〜3760**
- 元の accepted 採用語義：**80件**
- 元データ：`data/candidates/batch_07501_08000.jsonl`（main）
- 対象 index：**7510〜7767**（その区間の採用語義のうち、global_order 3681〜3760）
- 対象 candidate_id：`ev-07510-noun-01` 〜 `ev-07767-noun-01`

## 結果
- 完了件数：**80件**
- 保留件数：**0件**
- 問題のあった採用候補：**なし**（候補の採否・語義は変更していない）
- 注記：global_order 3694 の `recreate` は語義によって発音の扱いが紛らわしいため、IPAを無理に断定せず省略。教材本文・例文・図の作成は完了。

## 成果物
- `content/cards/batch_047.md` — 80件の教材カード、各カードにMermaid図
- `content/data/batch_047.jsonl` — 80件の構造化教材データ
- `reports/content_batch_047.md` — 本報告

## 検証結果（ブランチ上のファイルを再取得して確認）
- Markdownのカード数：**80件**
- JSONLの行数：**80件**（すべてJSONとして構文解析できた）
- Mermaidコードブロック：**80件**
- JSONLの必須14キー：**全件存在**
- global_order：**3681〜3760** に連続一致
- order_in_batch：**1〜80** に連続一致
- 元データに対する index、word、candidate_id、pos、hidden_meaning_ja：**全件一致**
- 例文、和訳、コアイメージ説明、Mermaid図：**全件存在**
- コアイメージ説明：**全件2文以上**
- 元の候補データ・他のバッチのファイル：**変更なし**

## GitHub
- 作業ブランチ：`content/batch-047`
- 作業対象の main 参照コミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 教材80件の最終コミット：[`9c1a544578df7e602c75f469ec0eed619ab03d3b`](https://github.com/totoro0419/easyvoca/commit/9c1a544578df7e602c75f469ec0eed619ab03d3b)
- PR：[#63](https://github.com/totoro0419/easyvoca/pull/63)（`content/batch-047` → `main`）
