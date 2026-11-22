# EasyVoca 完成教材 作業報告｜バッチ036

## 担当範囲

- 担当番号：36
- global_order：**2801〜2880**
- 元データの index：**5127〜5327**
- 全採用候補数（main で確認）：**5,111件**
- 対象：`decision == "accepted"`、`index` → `candidate_id` 昇順の80件
- 参照元：`main:data/candidates/batch_05001_05500.jsonl`
- 最初の候補：`ev-05127-adj-01`（synthetic）
- 最後の候補：`ev-05327-noun-01`（momentum）

## 完了状況

| 指標 | 件数 |
|---|---:|
| 対象件数 | 80 |
| 教材カード完成 | 80 |
| Markdown内のMermaid図 | 80 |
| JSONLデータ行 | 80 |
| 保留 | **0** |

- Markdown：`content/cards/batch_036.md`
- JSONL：`content/data/batch_036.jsonl`
- 本報告：`reports/content_batch_036.md`
- 専用ブランチ：`content/batch-036`（mainに直接書き込みなし）

## 教材の内容

各カードは元データの語義を主役とし、単語・品詞・発音・小さな既知義・注目義・オリジナル例文・和訳・コアイメージ説明・Mermaid図・重要語法を含む。説明と図は元データの語義に合わせて作成した。採用候補の追加・削除・再選定は行っていない。

## 保存後の整合性確認

GitHub上に保存したMarkdown・JSONLとmainの候補ファイルを読み直して比較した。

- Markdown見出し：**80件**
- Mermaidブロック：**80件**
- JSONL：**80行**
- 必須キーの欠落：**0件**
- 元データの`candidate_id`、`index`、`word`、`pos`の不一致：**0件**
- `hidden_meaning_ja` と元データ`meaning_ja`の不一致：**0件**
- global_orderおよびバッチ内順序の不一致：**0件**
- 英文例文、和訳、コアイメージ説明の空欄：**0件**
- Mermaidに既知義と注目義が反映されていないカード：**0件**

## 問題・注意事項

- **問題のあった候補：なし。保留：0件。**
- `embarrassment` の多さは原則として慣用句 `an embarrassment of riches` で表れるため、用例に明記した。
- `battery` の暴行の意味は法律用語であるため、用例に法律上の文脈を明記した。
- `infection` の感情伝染は比喩的な用法であるため、用例で明示した。
- 今回は既存の採用済み語義を教材化する工程であり、全語義の外部辞書による再検証は実施していない。英文・和訳の自然さの全数第三者校閲は未実施。

## コミット

- Markdown追加：[`61986801ad6a69e7d43085577c08b97dc35c9b33`](https://github.com/totoro0419/easyvoca/commit/61986801ad6a69e7d43085577c08b97dc35c9b33)
- JSONL追加：[`b005b6f03ee8902324cfd313a4c7b6b9c87ea0c7`](https://github.com/totoro0419/easyvoca/commit/b005b6f03ee8902324cfd313a4c7b6b9c87ea0c7)

## PR

- https://github.com/totoro0419/easyvoca/pull/66
- base：`main` / head：`content/batch-036`
- 状態：作成済み、レビュー・統合前
