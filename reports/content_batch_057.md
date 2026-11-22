# EasyVoca｜完成教材バッチ 057 作業報告

## 担当範囲
- 担当番号: **57**
- 対象 global_order: **4481〜4560**（80件）
- 対象の採用候補数: **80件**
- 元データ: `main:data/candidates/batch_10001_10500.jsonl`
- 選定方法: `decision == "accepted"` のみを `index` 昇順、同一 `index` 内は `candidate_id` 昇順に並べた5,111件中の4481〜4560番
- 元データの index: **10118〜10334**
- 対象期間: 2026-11-22

## 完了・保留
- 完成教材: **80 / 80件**
- 保留: **0件**
- 問題のあった候補: **なし**（このバッチで確認した範囲）
- 語義の追加・再選定: **なし**
- 他バッチ・既存候補データの変更: **なし**

## 作成した成果物
1. `content/cards/batch_057.md` — 80カード。単語・品詞・発音・既知の意味・採用済みの見落としやすい意味・オリジナル例文・和訳・コアイメージの2文説明・Mermaid図・必要な語法。
2. `content/data/batch_057.jsonl` — 1行1カード、80件。指定された構造化キーをすべて保持し、発音と元データの採用状態も記録。
3. `reports/content_batch_057.md` — 本作業報告。

## 検証
GitHubに保存済みの2ファイルを**再取得**し、元の `main` の候補データと照合。
- JSONLカード数: **80件**
- Markdown見出し数: **80件**
- 例文数: **80文（重複なし）**
- Mermaid図数: **80個**
- `candidate_id` の一意性: **80 / 80件**
- `index`、`candidate_id`、`word`、`hidden_meaning_ja`、global_order、batch内順序: **80 / 80件一致**
- 必須キー: **欠落なし**
- コアイメージ説明: **全件2文以上**
- Mermaidの主要構文（flowchart・2分岐）: **全件あり**

※ MermaidのGitHub上での個別表示・英文の外部辞書との全件再検証までは実施していません。既に採用済みの語義の教材化が目的であるため、外部辞書の再選定は行っていません。

## ブランチ・コミット・PR
- 作業ブランチ: `content/batch-057`
- ベース: `main`（作業開始時 `a0729f62003a1d15366a9c8c4b0650258c8489b4`）
- 初期40件のデータ作成: https://github.com/totoro0419/easyvoca/commit/1e51fe0f6fa7d0f863f82223702df68ddc32ce7c
- JSONL 80件確定: https://github.com/totoro0419/easyvoca/commit/1082db57a05c1620cb3edd790fa2b38487fb3473
- Markdown 80件・Mermaid 80個: https://github.com/totoro0419/easyvoca/commit/804bfc92fcc0c56c1f0615fff62ce9f3b41e09e9
- PR: https://github.com/totoro0419/easyvoca/pull/81
- 本報告ファイルのコミットは上記PRのコミット履歴に記録。
