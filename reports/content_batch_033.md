# EasyVoca 完成教材 Batch 033｜作業報告

- 担当番号: **33**
- 作業ブランチ: `content/batch-033`
- PR対象: `main`
- global_order: **2561〜2640**
- 元データ index: **4622〜4770**
- 元データ: `data/candidates/batch_04501_05000.jsonl`（main、blob SHA `4834b166c494b8064614fff63ef6d8d400a43795`）
- 採用済み候補の合計: **5111件**（24ファイルの `decision == accepted` 件数の合計）
- 担当対象: **80件**
- 完了: **80件**
- 保留: **0件**
- 問題のあった候補: **なし（構造・元データ照合上）**

## 作成ファイル

- `content/cards/batch_033.md` — 80枚のMarkdownカード（例文、和訳、コアイメージ、Mermaid図を含む）
- `content/data/batch_033.jsonl` — 同じ80枚の構造化データ
- `reports/content_batch_033.md` — この報告書

## 実施した検証

GitHubブランチから教材ファイルを再取得し、以下を検証した。

1. Markdownのカード見出し・Mermaidブロック・例文・コアイメージの各件数が80。
2. JSONLが80行で、各行がJSONとして読み取れる。
3. `batch`、`order_in_batch`、`global_order` が33・1〜80・2561〜2640と一致。
4. `candidate_id`、`index`、`word`、`pos`、`hidden_meaning_ja` がmainの該当80候補と全件一致。
5. 必須の14キーがすべて存在し、例文・和訳・説明・既知意味・図が空でない。
6. 図は80件すべて `flowchart LR` で中心イメージから既知意味・今回の意味へ分岐。
7. 他バッチ、候補データ、既存の語義データには変更を加えていない。

結果: **上記の機械的整合性検証はすべて合格**。英文の自然さや意味説明の品質を外部の第三者が個別監修したことまでは意味しない。語義の再選定は実施せず、採用済み候補を教材化した。

## 注意事項

発音は分かる範囲で音声表記を加え、確実性を確保できない `jihad` の表記は無理に断定しなかった。 `bust` の「胸像」や `rue` の「後悔する」など、異なる語義を無理な共通イメージで結び付けないよう説明内で明示した。

## 教材のコミット

1. https://github.com/totoro0419/easyvoca/commit/c9eb944453a9d2c287db7ca14a80e9785b48c64c
2. https://github.com/totoro0419/easyvoca/commit/3341a141e788e800653be7c4f4e6d2d20defcf92
3. https://github.com/totoro0419/easyvoca/commit/e070213149da654b1ee6dd482055768da683848c
4. https://github.com/totoro0419/easyvoca/commit/0c8a20719cdbdbf68220294f66638abb6c031669

## Pull Request

PR URL: https://github.com/totoro0419/easyvoca/pull/58

報告書作成コミット: https://github.com/totoro0419/easyvoca/commit/fc392a86b0d0c9cf35e25f8133f2f4960d893836
