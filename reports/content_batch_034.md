# EasyVoca 完成教材｜Content Batch 034 作業報告

- 担当番号：34
- 全体順（global_order）：2641〜2720
- 採用済み語義総数：5,111件（main上の24候補バッチを集計）
- 元データ：`data/candidates/batch_04501_05000.jsonl` の採用済み候補のうち該当80件
- 元のmain参照コミット：`a0729f62003a1d15366a9c8c4b0650258c8489b4`
- 対象件数：80件
- 完了件数：80件
- 保留件数：0件

## 成果物

1. `content/cards/batch_034.md`：80カードを所定の順序で収録。発音（カタカナ近似）、既知の意味（小さく表示）、隠れた語義、オリジナル例文、和訳、説明、Mermaid図、重要語法を含む。
2. `content/data/batch_034.jsonl`：80行。元データの `index`、`word`、`candidate_id`、`pos`、採用語義を維持。
3. 本報告ファイル。

## 検証

- GitHubへ保存後、両ファイルを再取得して検証。
- JSONL：80行、必要な14キーを全行に確認。
- Markdown：カード見出し80件、Mermaid図80件。
- 全体順2641〜2720、バッチ内順1〜80を確認。
- `main` の元データと `candidate_id` / `index` / `word` / `pos` / `meaning_ja` を全80件照合。不一致0。
- 対象を受理済み候補に限定し、採否の変更・元の選定データの変更は行っていない。

## 注意が必要な候補と対処

- `bark`（2720の直前）：犬の鳴き声と樹皮を無理な共通語源で結ばず、同綴りの別義として説明。
- `skip`：大型廃材コンテナの意味が主に英国・豪州英語で使われることを意識した例文。
- `prostitute`：採用済みの比喩的意味（才能・信念の安売り）を示し、否定的な語感を明記。
- `scratch`：即席チームの形容詞的用法と `from scratch` の熟語用法を別カードとして保持。

教材化を保留した候補：なし。

## コミット

- JSONL完成版：[d0cba8c20645139cc1f060e7dc0e57862e5816ed](https://github.com/totoro0419/easyvoca/commit/d0cba8c20645139cc1f060e7dc0e57862e5816ed)
- Markdown完成版：[cb2bf6320d39c5d213e32ab6814c0282f7146a09](https://github.com/totoro0419/easyvoca/commit/cb2bf6320d39c5d213e32ab6814c0282f7146a09)

## Pull Request

https://github.com/totoro0419/easyvoca/pull/57

マージ先：`main`。作業ブランチ：`content/batch-034`。未マージ。
