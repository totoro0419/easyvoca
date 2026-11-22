# EasyVoca 完成教材作業報告｜Batch 020

- 担当番号：20
- 担当範囲（global_order）：1521〜1600
- 対象件数：80（mainに統合された採用済み候補5,111件から、index→candidate_id順で抽出）
- 対応するindex範囲：2409〜2517
- 完了件数：80
- 保留件数：0
- 作成した教材：`content/cards/batch_020.md`
- 構造化データ：`content/data/batch_020.jsonl`
- 担当ブランチ：`content/batch-020`
- 教材コミット：https://github.com/totoro0419/easyvoca/commit/c699a9bfcb5bf1079e3fbdcc957bf08dbfe36ccd
- PR：https://github.com/totoro0419/easyvoca/pull/29

## 内容と検証

- 全80件に既知の意味、採用済みの見落としやすい意味、オリジナル例文、和訳、2文のコアイメージ説明、Mermaid模式図を作成。
- 発音を分かる範囲でIPA表記。重要語法を各カードに記載。
- Markdownのカード見出し80件とJSONLの80行の件数一致を生成時に確認。
- 元の採用候補にある`index`・`word`・`candidate_id`・`pos`・`meaning_ja`を保持。
- JSONLでの`candidate_id`重複なし。
- 語義の再選定や辞書原文の転載は行わず、既存候補データ・他バッチファイルに変更なし。

## 注意事項と問題のあった候補

保留にした候補はありません。ただし次の表現は学習時に注意が必要です。

- `ev-02502-verb-01`：見出し語`earning`は`earn`の現在分詞として例文に使用（語形は元候補を維持）。
- `ev-02491-verb-02`：`comprise`の部分→全体構文は用例があるものの、全体→部分の構文より使用頻度が低いため区別した。
- `ev-02517-adjective-01`：`genetic`の起源・生成過程を指す用法は、作品研究などの限定的な文脈で例示。
- `ev-02484-verb-01`：動詞`tear`（破る）は名詞`tear`（涙）とは発音が異なるため補足。

## 完了の範囲

GitHubの専用ブランチに教材・構造化データ・本報告書を保存し、main向けPR #29を作成した段階です。mainへの統合・実機表示の検証は本作業に含めません。
