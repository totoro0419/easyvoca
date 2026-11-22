# EasyVoca 完成教材 作業報告｜Batch 055

## 担当範囲

- 担当番号：**55**
- global_order：**4321〜4400**
- 元データ：`main:data/candidates/batch_09501_10000.jsonl`
- 元データの index：**9672〜9888**
- 取得基準：全24候補ファイルから `decision == "accepted"` のみを抽出し、`index` 昇順、同一 `index` 内では `candidate_id` 昇順
- 採用候補全体：**5111件**（2026-11-22確認）
- 本バッチ対象：**80件**

## 完了状況

- **完了：80件**
- **保留：0件**
- Markdown：`content/cards/batch_055.md` — 80カード、Mermaid図80個
- JSONL：`content/data/batch_055.jsonl` — 80行
- 各カードに単語・品詞・発音・既知の意味・見落としやすい意味・オリジナル例文・和訳・2文のコアイメージ説明・Mermaid図を収録。重要語法は候補データで学習上有用な場合に記載。
- 新語義の追加・元語義の再選定は実施せず。

## 検査

- JSONL件数とMarkdownカード見出し数：**80件で一致**
- Mermaidコードブロック数：**80**
- JSONLの `candidate_id` 重複：**なし**
- `global_order`：4321〜4400、欠番なし
- 元データの `index`・`candidate_id`・`word`・`pos`・採用済み `meaning_ja` との比較：**80件全件一致**
- Markdown本文の例文・和訳・図とJSONLの対応：**80件全件一致**（保存後に再取得して検証）
- `main` との差分：本バッチのMarkdown・JSONLの2ファイルのみ（報告追加前）。他バッチと元候補データの変更なし。

## 問題のあった候補と対応

- `ev-9742-verb-01`（flicker）：作成直後の例文が名詞用法だったため、動詞 `flickered` を用いる英文・和訳へMarkdownとJSONLの両方で修正済み。
- **未解決の候補：なし**。

## ブランチ・コミット・PR

- ベースmain（作成時）：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- ブランチ：`content/batch-055`
- Markdown初回追加：[2f14c8c](https://github.com/totoro0419/easyvoca/commit/2f14c8c75f03c824e85c919b30c1ea2108db8957)
- JSONL初回追加：[edf7c10](https://github.com/totoro0419/easyvoca/commit/edf7c10951ecc75b31a5e76e22f781ed2f48a036)
- Markdown修正：[9d0816f](https://github.com/totoro0419/easyvoca/commit/9d0816f5e74ab82d2d1e81949e38c6663cdd7a38)
- JSONL修正：[2ced5f6](https://github.com/totoro0419/easyvoca/commit/2ced5f6e6ad6774fe86588f6ec05261e1247709d)
- PR：[#80](https://github.com/totoro0419/easyvoca/pull/80) → `main`

※ この報告書自体のコミットはGitHub上の当ファイル履歴を参照。
