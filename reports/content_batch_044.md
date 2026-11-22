# EasyVoca 完成教材制作報告 — Batch 044

- 担当番号：**44**
- 担当範囲：**global_order 3441〜3520**
- 採用済み候補の並び：`decision == "accepted"` のみ、`index` 昇順、同じ `index` 内は `candidate_id` 昇順
- main の全採用済み候補数（確認時）：**5,111**
- 元候補の所在：`data/candidates/batch_06501_07000.jsonl`（58件）、`data/candidates/batch_07001_07500.jsonl`（22件）
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 問題のあった候補：**なし**（構造的な不一致・欠落は検出されなかった）

## 成果物

1. `content/cards/batch_044.md` — 80件の完成教材。単語・品詞・発音・既知の意味・見落としやすい意味・オリジナル例文・和訳・コアイメージの説明・Mermaid図・重要語法
2. `content/data/batch_044.jsonl` — 1行1カードの構造化データ（80行）

## 実施した整合性検査

- JSONL：**80レコード**、必須フィールドと発音フィールドを確認
- 元の採用候補との `index`、`word`、`candidate_id`、`pos` の照合：**80/80一致**
- `global_order` と `order_in_batch` の連番：**80/80一致**
- `candidate_id` 重複：**0**
- Markdown見出し数：**80**
- Mermaidコードブロック数：**80**
- 各図の基本形：`flowchart LR`、3ノード・中心からの2本の矢印
- 各カードで例文・和訳をコアイメージより前に配置
- その他のバッチおよび既存の候補データは変更していない

図は意味関係を示す模式図であり、語源が同一でない語義は無理に結びつけていない。GitHubでのMermaid実描画やアプリ画面での表示は、この制作工程では未確認。

## コミット

- 初回データ作成：[`b927457`](https://github.com/totoro0419/easyvoca/commit/b927457cd345da3dddd65029234cd7c47b7c50a1)
- JSONL全80件完成：[`2a9fe41`](https://github.com/totoro0419/easyvoca/commit/2a9fe417de0540a55615f7f83c7c5d448aac4d42)
- Markdown全80件作成：[`4e30762`](https://github.com/totoro0419/easyvoca/commit/4e307628d073039aeeacca1cd7c31034f2cdc291)

## Pull Request

- PR URL：作成前（PR発行後に更新）
- ベース：`main`
- 作業ブランチ：`content/batch-044`
