# EasyVoca｜単語マスターの出典・利用条件

## 現在の状態
2026-11-22、EasyVoca独自の12,000語マスターを生成し、構造検証を完了。生成スクリプトは `scripts/build_master.py`。成果のSHA-256や厳密な入力ファイルは `data/master/manifest.json` に記録。

**この12,000語はSVL12000の転載ではなく、Oxford 5000の転載でもありません。** 英単語の出現頻度を手がかりにした独自の調査対象リストです。番号とレベル1〜12はEasyVocaの作業用の固定範囲・近似頻度帯であって、公式の難易度や試験出題範囲を意味しません。

## 入力ソース1：Lingevo / Open American National Corpus
- 名称：Lingevo OANC written lemma frequency list
- 公開ページ：https://lingevo.com/resources/
- 取得URL：https://lingevo.com/resources/oanc/oanc_wordfreq_written.csv
- 元コーパス：https://anc.org/data/oanc/
- 利用条件：Lingevoは教材・アプリ・研究・再配布・商用利用を含めて無料と明記。LingevoとOANCをクレジット表示すること。
- 必須クレジット：
  - Word lists by Lingevo (lingevo.com).
  - Contains data derived from the Open American National Corpus (OANC), https://anc.org/data/oanc/
- 加工：各行のlemmaを小文字化し、英字のみの見出し語を採用、品詞ごとのcountを見出し語単位に合算する。

## 入力ソース2：LexiCore-5000
- 正式名：LexiCore-5000 v1.0.0
- URL：https://github.com/X-Trivle/LexiCore
- 利用したファイル：https://raw.githubusercontent.com/X-Trivle/LexiCore/main/data/LexiCore_5000.csv
- 出典・第三者への注意：https://github.com/X-Trivle/LexiCore/blob/main/NOTICE.md
- 公開データライセンス：CC BY 4.0。必要な表示：
  - LexiCore-5000 (v1.0.0), https://github.com/X-Trivle/LexiCore — CC BY 4.0.
  - Frequency evidence derived from FineWeb, FineWeb-Edu, Wikipedia (20231101.en), OPUS-OpenSubtitles 2024 and Common Crawl CC-MAIN-2026-34.
  - EasyVocaは出典の見出し語情報を選抜・重複統合し、別の並び順に変更しています。
- 利用した部分：見出し語の照合・候補採否と順位に対する軽微な補正。LexiCoreの品詞・CEFR推定ラベル・語義本文はコピーしない。
- OANCで見出し語の存在を確認できないLexiCore項目は、原則として独立見出し語として追加しない（活用形の混入防止）。

## その他
- everyday_probe：snake、minute、weather等、基本語の取りこぼしを点検するための25語。選定品質の自動検査対象。単語に意外な意味が存在することや収録決定を保証しない。
- この合成マスターに独自の語義・訳文・辞書本文は含まれていません。
- 辞書による第1・第2段階では、出版社の辞書本文や例文を大量転載しない。出典の確認日とURLを記録し、短い独自の日本語説明で保存する。
- 出典のURLや内容は将来変更され得る。実際の入力ファイルのSHA-256をmanifestに残すことで追跡可能にする。

## 制約
1. OANCは小規模な米国英語コーパスであり、ジャーナリズムなどのジャンルに偏るため、精密な入試重要度ランキングではない。
2. 単語リストの構造検証（12,000語・重複なし）は、各見出し語が適切か、各語義が正しいかを保証しない。
3. アプリ公開時は、元資料のクレジットと条件を引き続き表示する。
