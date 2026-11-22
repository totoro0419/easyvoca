# EasyVoca 教材作成報告｜Batch 061

- 担当番号：61
- 担当範囲：global_order 4801〜4880（index 10938〜11200）
- 対象件数：80件
- 完了件数：80件
- 保留件数：0件
- 問題のあった候補：なし（元データの再選定なし）
- コミット（教材Markdown）：https://github.com/totoro0419/easyvoca/commit/eda26f3eb69cd2bb2747ec4ba3a3480eb73569d3
- PR URL：https://github.com/totoro0419/easyvoca/pull/78

## 検証

- `decision == accepted`のみを選び、`index`→`candidate_id`の昇順を使用。
- 24個の候補バッチのaccepted合計は5,111件。担当範囲の80件は2バッチ（10501〜11000の末尾24件、11001〜11500の先頭56件）。
- JSONL／Markdownとも80件。図は80件すべてにMermaidの`flowchart LR`を収録。
- 全カードについて元データとの`index`・`word`・`candidate_id`・`pos`・採用語義の一致を確認。
- Markdownでは例文・和訳をコアイメージより前に配置。
- 他バッチや既存候補データは変更していない。
