# EasyVoca 完成教材作業報告｜batch 017

- **担当番号**：17
- **担当範囲（global_order）**：1281〜1360
- **対象件数**：80件
- **完成件数**：80件
- **保留件数**：0件
- **対象の開始候補**：`ev-02064-noun-01`（index 2064, injury）
- **対象の終了候補**：`ev-02185-verb-01`（index 2185, cry）
- **参照データ**：main の `data/candidates/batch_02001_02500.jsonl`
- **選定方法**：main の全24候補バッチから `decision == "accepted"` の5,111件を確認し、`index` → `candidate_id` 昇順に並べたときの1281〜1360件目
- **作業ブランチ**：`content/batch-017`
- **対象PR**：https://github.com/totoro0419/easyvoca/pull/36
- **教材作成コミット（JSONL）**：https://github.com/totoro0419/easyvoca/commit/1c4b7b0ebf69dec5bf54b8b9c59895706aef9a7a
- **教材作成コミット（Markdown）**：https://github.com/totoro0419/easyvoca/commit/6c78c77c10eeedc0ce103fdd23d03a5b470d10db

## 作成物

1. `content/cards/batch_017.md`：80枚。単語・品詞・発音・既知の意味（小さく）・見落としやすい意味・オリジナル例文・和訳・コアイメージ説明文・Mermaid図・必要な語法を収録。
2. `content/data/batch_017.jsonl`：1行1カード、80行。要求された必須キーと `pronunciation` を収録。
3. この作業報告。

## 品質・整合性チェック

- GitHub上から保存済みの2教材ファイルを読み戻して検証。
- Markdown：**80件**、Mermaid図：**80件**。
- JSONL：**80件**、全件の必須キーが揃っている。
- `batch`、`order_in_batch`、`global_order` の順序整合性：80件一致。
- 元候補との `candidate_id`、`index`、`word`、`pos`、`meaning_ja` の照合：**80件一致**。
- Mermaid図に既知の意味と見落としやすい意味が両方含まれる：80件一致。
- 例文・和訳・説明文・図を全カードに収録。
- 元の候補データ、他バッチ、アプリコードは変更していない。

## 保留・問題のあった候補

- **保留：0件**
- **構造上の不一致：0件**
- 対象語義の新規追加や再選定は行っていない。
- 発音表記は学習用の目安。音声・方言差の全面的な外部照合は今回の範囲外。
- 全例文の外部辞書との照合やアプリ上の描画検証は実施していない（今回の完成条件外）。

## 統合状況

main に直接書き込まず専用ブランチ上で作業。PRを作成済みで、main へのマージは未実施。
