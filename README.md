# EasyVoca — 見落としがちな別義・別品詞・語法を学ぶ

## 目的
基礎から大学入試レベルまでの英単語を広く調査し、一般に知られる意味からは気づきにくい意味・品詞・語法を厳選して学習データ化する。**辞書の全語義を収録すること自体は目的ではない。**

## 単語マスター（作成・検証済み）
- 独自に構成した調査対象12,000語。**公式SVL12000ではない**。
- `data/master/words.jsonl`：12,000個のユニークな見出し語と固定番号。
- `data/master/batches.json`：500語×24の重複しない担当範囲。
- `data/master/manifest.json`：利用資料・生成日時・データのSHA-256。
- `scripts/build_master.py` と `scripts/validate_master.py` により再現・検証可能。
- 構造の検証合格は**全語の学習上の適切さの確認ではない**。見出し語と語義の品質は各調査段階で検証する。

## 24チャットで実施する作業
**第1段階：意外な意味・品詞・語法の候補抽出 → 第2段階：出典に基づく検証と採否確定。** 各担当500語、1〜24の担当番号を共通プロンプト末尾に付けて実行する方式とする。コアイメージ・完成例文を含む5,111件の教材を採用し、学習Webアプリを追加済み。

## 参照資料
- [準備・作業範囲](docs/PREPARATION.md)
- [選定・検証基準](docs/SELECTION_POLICY.md)
- [バッチ運用・保存仕様](docs/BATCH_PROTOCOL.md)
- [データ出典・利用条件](docs/SOURCE_CREDITS.md)
- `docs/WORKER_PROMPT.md` は**以前の草案**。これから作る最終プロンプトとは区別する。

このリポジトリはPublic。商用辞書本文や例文の大量転載を禁止し、出典と利用条件を保持する。

## EasyVoca 学習アプリ

GitHub Pages 公開先：<https://totoro0419.github.io/easyvoca/>

- **ホーム・学習・検索・復習**。スマートフォンは下部ナビ、PCはサイドナビ。
- 学習は20件ずつ、左右スワイプ（PCでは左右キー）で移動。閲覧を暗記済みとは扱わない。
- `candidate_id` 単位で閲覧・お気に入り・復習日程を保存。IndexedDBを主保存先とし、localStorageに予備コピーを保持する。
- 4択復習：連続正解で1・3・7・14・30・60日後、不正解は10分後。
- Mermaid図はそのカードを開いたときだけ読み込み・描画。失敗しても文章を読める。
- **元の教材を変更しない**。ビルド時に64バッチを検証し、5,111件の検索索引と200件ずつの詳細データを生成する。
- 元データで `hold` となっている未確定の語義は要確認表示し、4択復習から除外する。
- オフライン利用：PWAとしてインストール後、「設定」から全教材を端末保存できる。保存状況をファイル単位で確認できる。

### 開発・検証

Node.js 22以降を推奨します。

```sh
npm install
npm run dev
npm test
npm run build
npx playwright install chromium
npx playwright test
```

`npm run build` は `public/generated/` と `public/icons/` を生成します（Gitには含めません）。Playwrightはビルド後の公開用プレビューを検証します。GitHub Actionsは単体・型・ビルド・実ブラウザテストを実行し、mainへのpush時にPagesへデプロイします.
