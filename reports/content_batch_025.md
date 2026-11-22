# EasyVoca｜完成教材バッチ025 作業報告

- **担当番号**：25
- **担当範囲**：global_order **1921〜2000**
- **対象件数**：80
- **完了件数**：80
- **保留件数**：0
- **対象先頭**：`ev-03010-verb-01`（index 3010, hijack）
- **対象末尾**：`ev-03185-adjective-01`（index 3185, isolated）
- **元データ**：`main` の `data/candidates/batch_03001_03500.jsonl`、accepted 候補のみ
- **全24ファイルの採用総数**：5,111件（作業時点の main）

## 成果物

1. `content/cards/batch_025.md`：80カードの完成教材。例文・和訳・説明文・Mermaid図を含む。
2. `content/data/batch_025.jsonl`：80行の構造化データ。各カードは元候補の `candidate_id`、`index` と対応。
3. 本報告：`reports/content_batch_025.md`

## 保存とコミット

- 作業ブランチ：`content/batch-025`
- Markdownコミット：https://github.com/totoro0419/easyvoca/commit/5c78e9c2cc5b389129844ed4d9433294f629997c
- JSONLコミット：https://github.com/totoro0419/easyvoca/commit/81f153fe40e8db349ba2aafb36ebf720077e23ff
- **PR**：https://github.com/totoro0419/easyvoca/pull/48（main 向け）

## 検証結果

- GitHub上に保存したファイルを読み戻し、Markdown 80件・JSONL 80行・Mermaid図 80件を確認。
- 例文、和訳、コアイメージ説明はいずれも80件。
- `global_order` 1921〜2000、`order_in_batch` 1〜80、候補順の整合性を確認。
- 元データの `candidate_id` / `index` / `word` / `pos` / `meaning_ja` と、全80行で一致。
- 必須JSONLキーが全件存在。
- 他バッチと採用済み候補ファイルは変更せず。

## 注意点・問題のあった候補

- **保留は0件**。採用済み候補の再選定は実施していない。
- `ev-03014-verb-01`（wire）は元候補の理由欄に辞書で裏付けられなかった旨の記載があるが、採用判定は変更せず、銀行送金を表す教材として作成した。
- `ev-03152-verb-01`（wound）は wind の過去形 /waʊnd/ と、傷を表す同綴語 /wuːnd/ を明確に区別した。
- `ev-03130-verb-01`（repair）は「出向く」が文語的な用法であることを明記した。
- `ev-03137-noun-01`（offense）は当該競技義の発音表記に確信が持てないため、発音記載を省略した。
- 英文・説明の個別の辞書再検証や実機画面表示確認は今回の範囲外。自動整合性確認は完了した。
