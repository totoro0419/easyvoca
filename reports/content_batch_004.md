# EasyVoca 完成教材｜バッチ004 作業報告

- 担当番号：4
- 全体順序：global_order **241〜320**（両端を含む）
- 対象：`decision == "accepted"`、`index` 昇順 → `candidate_id` 昇順
- 対象件数：**80**
- 完了件数：**80**
- 保留件数：**0**
- 作成ブランチ：`content/batch-004`
- 対象の先頭：`ev-00328-ai-01`（index 328 / hand）
- 対象の末尾：`ev-00427-ai-01`（index 427 / risk）

## 作成ファイル

- `content/cards/batch_004.md`：80カード（よく知られている意味・学習する意味・例文・訳・コアイメージ・Mermaid図・重要語法）
- `content/data/batch_004.jsonl`：80レコード（元候補ID、index、元語義を保持）

## 検証結果

- mainの候補24ファイルを集計：accepted **5,111件**（実行時）
- 担当範囲の原データと`candidate_id`・`index`・語義・並び順が一致することを確認
- GitHub上でJSONL **80行**、Markdownカード見出し **80件**、Mermaid図 **80件**を再取得して確認
- 必須JSONキー全件あり、global_order **241〜320** 連続、候補ID **80件すべて一意**
- 対象外の候補ファイルとアプリ本体は変更していない
- 例文は新規作成。辞書例文の転載や大規模辞書再検証は行っていない

## 問題のあった候補・注意事項

- **未解決の候補：なし**
- `ev-00356-ai-02`（read）、`ev-00384-ai-01`（close）、`ev-00423-ai-01`（record）は、別義ではなく発音上の対比を扱う採用済み候補。削除・再選定せず、対比例文と発音表記を教材化した。
- 発音表記は学習用の目安であり、地域差まで含む網羅的な辞書照合は実施していない。

## コミット

- JSONL完了：https://github.com/totoro0419/easyvoca/commit/fbca86fe28cd27e98da2eb18bbb16b6bf750d509
- Markdown完了：https://github.com/totoro0419/easyvoca/commit/08e5ef19e64c57206a589f09d721863c7b3fe5ac

## PR

- https://github.com/totoro0419/easyvoca/pull/32
- 対象：`main`
- マージは行っていない（PRで提案のみ）。
