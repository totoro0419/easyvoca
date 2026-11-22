# EasyVoca｜AI優先 24バッチ再開・保存プロトコル v4

## 役割
既存24件の作業ブランチとDraft PRを引き継ぎ、各担当の500語の意外な語義・別品詞・語法の**AI判断を主軸にした一次選定と候補採否**を完了する。全語義の網羅的な辞書精読は要求しない。意味を理解する確信がない候補だけ辞書で確認する。

末尾の整数B（1〜24）で担当を決定：`start=(B-1)*500+1`、`end=B*500`。固定マスター `data/master/words.jsonl` の該当500行を使う。マスターと他バッチのファイルを変更しない。

## 既存成果の再利用
既存PR/branch：`selection/<start5>-<end5>`（例：`selection/00001-00500`）。作成済みの `data/review/batch_<start5>_<end5>.jsonl`、`data/candidates/batch_<start5>_<end5>.jsonl`、`reports/batch_<start5>_<end5>.md` を読んで続きから実施する。別のPRを作成しない。

## 保存スキーマ（従来のキー維持）
### review: 1語1行、500行
必須キーは `index`、`word`、`status`、`candidate_count`、`accepted_count`。
- `verified_selected`：AIによるスクリーニングを実施し、採用候補が1件以上
- `verified_none`：AIによるスクリーニングを実施し、採用候補なし
- `needs_review`：未処理か、具体的な判断が未解決
- 処理した行には `screening_method: "ai_judgment"` を追加してよい。これは「外部の辞書で完全検証済み」の意味ではない。
- 明らかな誤綴り・略号・固有名詞などがマスターにある場合は、無理に候補を作らず `master_issue` とその理由を保存する。判断が難しい場合のみ `needs_review` に残す。

### candidates: 1候補1行
必須キーは従来どおり `candidate_id`、`index`、`word`、`pos`、`meaning_ja`、`reason`、`utility`、`decision`、`decision_reason`（採否確定の場合）。採否は `accepted` / `rejected` / `needs_review`。
- **AIで十分に確信できる採用**：`verification_method: "ai_judgment"`、`confidence: "high"`、`sources: []`。
- **実際に外部辞書を確認した採用**：`verification_method: "dictionary_checked"`、`sources: [{"name":"...","url":"https://...","checked_at":"YYYY-MM-DD"}]`。古い候補には verification_method がなくても有効なsourceがあればよい。
- AI判断が曖昧なら辞書で確認し、なお判断不能なら `needs_review`。
- 存在しない出典を作らず、既存の確認済み出典を消さない。

### reports
処理済み語数、処理保留語数、採用/除外/保留候補数、AI判断と辞書確認の区別、マスターにある異常語、構造検証結果、PRを簡潔に記録。

## 作業手順
1. master、担当PRの進捗JSONL、必要な選定基準だけを確認。
2. `needs_review` を優先し、50〜100語ずつAIの語彙知識でスクリーニング。実際に単語を確認するまで処理済み扱いにしない。
3. 意外な意味・品詞・語法について学習価値がある候補だけ作る。0件でよい。
4. 確信できる候補はAI判断として採用。疑わしい候補のみ辞書確認。既存データは再利用する。
5. 担当専用の3ファイルを更新。既存のPRにコミットする。共有スキーマやマスターを編集しない。必要ならorigin/mainを安全に取り込み、最新の検証スクリプトを使う。
6. `python3 scripts/validate_batch.py B` を実行可能なら実行。途中成果は `--allow-incomplete`。検査手段がなければ同等の番号・単語・件数・候補ID・採否・出典の整合性を確認し、実際に何を実行したかを明記する。

## 完了判定
500語すべてをAIスクリーニングし、候補の採否が記録され、未処理を偽装せず、番号と集計が一致したら**AI一次選定の完了**。これは全語義の網羅・辞書による全数検証・人手校閲の完了ではない。残件があれば既存PRに途中成果を保存し、原因を報告する。完了前にPRを勝手にmainに統合しない。
