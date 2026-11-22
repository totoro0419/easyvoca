# EasyVoca 完成教材 バッチ050 作業報告

- 担当番号：50
- 担当範囲：global_order **3921〜4000**（両端含む）
- 元候補の index 範囲：**8252〜8481**
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 作業ブランチ：`content/batch-050`
- PR： https://github.com/totoro0419/easyvoca/pull/61

## 成果物

1. `content/cards/batch_050.md` — 80カード（発音、既知義、採用済みの見落としやすい語義、オリジナル例文・和訳、コアイメージ説明、Mermaid図、必要な語法）
2. `content/data/batch_050.jsonl` — 上記と同じ80件の構造化データ
3. `reports/content_batch_050.md` — 本報告

## 検証結果

- `main` の24候補ファイルから `decision == "accepted"` を集計：**5111件**。
- `index` 昇順、同一 index 内は `candidate_id` 昇順で、対象80件を確定。
- Markdown 見出し80件、Mermaid図80件、JSONLレコード80件を**保存後に再取得して確認**。
- JSONLの `global_order`、`order_in_batch`、必須フィールドを検査。
- `candidate_id`、`index`、`word`、`pos`、`hidden_meaning_ja` は、すべて元の `accepted` 候補と一致。
- 既存の `data/candidates`、`data/review`、他バッチは変更していない。

## 保留・問題候補

- 保留：**0件**。
- 元の採用候補データには外部辞書での独立照合が未実施のものがある。今回の工程では採用義の再選定や新規調査は実施していない。
- 形容詞と動詞で語義・発音が異なる `consummate`（global_order 3981、3982）は2枚のカードとして扱った。
- 検証の範囲：データ整合性と構成を確認。全英文の外部辞書との個別照合、GitHub上のMermaidレンダリング実機確認は実施していない。

## コミット

- Markdown教材： https://github.com/totoro0419/easyvoca/commit/5cbfe89c669dcd15856b431f669ccc48f7f9ee63
- JSONLデータ： https://github.com/totoro0419/easyvoca/commit/c0d0572c79129e94df30e85735c2398b28035bcf
- 本報告のコミットはPRのコミット一覧参照： https://github.com/totoro0419/easyvoca/pull/61/commits
