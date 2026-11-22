# EasyVoca｜教材バッチ027 作業報告

- 担当番号：27
- 対象範囲：global_order **2081〜2160**（index **3390〜3559**）
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 元データ：main の `data/candidates/batch_03001_03500.jsonl` および `data/candidates/batch_03501_04000.jsonl` に含まれる `decision == "accepted"` の候補
- ブランチ：`content/batch-027`
- PR：https://github.com/totoro0419/easyvoca/pull/47

## 成果物

1. `content/cards/batch_027.md`：80件の教材カード。各カードに単語・品詞・発音・既知義・見落としやすい語義・オリジナル英文・和訳・コアイメージの説明・Mermaid図・必要な重要語法。
2. `content/data/batch_027.jsonl`：80件の構造化データ。元の候補ID、index、採用語義を維持。
3. 本報告書。

## 検証結果

- 対象範囲：2081〜2160 の連番、欠落なし（**80/80**）。
- candidate_id：元データと一致（**80/80**）、重複なし。
- index・word・pos・hidden_meaning_ja：元データと一致（**80/80**）。
- JSONLの必須キー：欠落なし（**80/80**）。
- Markdownの見出し／例文／コアイメージ／Mermaid図：それぞれ **80/80**。
- 表示順：例文 → 和訳 → コアイメージ → Mermaid図（**80/80**）。
- 同形・類似形でも意味が直接つながらない9カードは、関係を誤認させないよう図の分岐を明示。
- 既存の採用済み語義や他バッチのファイルは変更していない。

## 留意点・問題のあった候補

- `judicial`（index 3452）：既に採用された「分別のある」用法は一般的な「司法の」より使用域が狭いため、例文と語法に注意書きを入れた。採否の変更はしていない。
- `exquisite`（index 3418）：激しい痛みに用いる用法は文語的であるため、その点を明示した。
- `sole`・`pant`・`re`・`pc`・`hip`・`fleet`・`toll`・`cotton`（2語義）などは既知義との意味連結を無理に作らず、図で分岐を示した。
- 外部辞書による全80件の独立した再検証は今回の作業対象外。英語表現の完全なネイティブ校閲やブラウザでのMermaid描画実測は未実施。

## コミット

- 教材MarkdownとJSONLの80件完成時点：[`ff17749323ded28a04ba16761b025f4f49efb743`](https://github.com/totoro0419/easyvoca/commit/ff17749323ded28a04ba16761b025f4f49efb743)
- Mermaid表現を調整した最新版：[`c2a70e75f2a93975074262db94d55c6ec2356bf0`](https://github.com/totoro0419/easyvoca/commit/c2a70e75f2a93975074262db94d55c6ec2356bf0)

PR：https://github.com/totoro0419/easyvoca/pull/47
