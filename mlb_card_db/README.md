# MLB Card DB — 現状まとめ

> 作成日: 2026-04-04  
> 対象ブランチ: `app_mlb_db`

---

## 概要

**MLB Card Database (mlb_card_db)** は、Charanko プロジェクト内に実装された MLB トレーディングカード個人コレクション管理モジュール。Next.js App Router ベースで、CSV ファイルをデータソースとしてブラウザ上でカード一覧の閲覧・検索・ソートができる。

日本語 UI で構築されており、購入情報・カード情報を網羅的に管理する。

---

## ディレクトリ構成

```
/Volumes/Work/Repos/my-lib-reference/
├── mlb_card_db/                        # コアモジュール
│   ├── components/
│   │   └── mlb-card-table.tsx          # メインテーブル UI コンポーネント
│   ├── lib/
│   │   ├── csv-parser.ts               # 独自 CSV パーサー
│   │   └── mlb-card-loader.ts          # データロード & 変換ロジック
│   └── data/
│       └── mlb_cards.csv               # ソース CSV データ（432件）
│
├── src/
│   └── app/
│       ├── page.tsx                    # ホームページ（SSR / MlbCardTable 使用）
│       └── mlb-db/
│           └── page.tsx                # 別実装ページ（CSR / JSON 使用）
│
├── scripts/
│   └── convert-mlb-csv.ts             # ビルド時 CSV→JSON 変換スクリプト
│
└── public/
    └── data/
        └── mlb_cards.json             # ビルド生成 JSON（CSR 用静的ファイル）
```

---

## テックスタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 15.3.4 (App Router) |
| UI ライブラリ | React 19.0.0 |
| 言語 | TypeScript 5.x (strict) |
| スタイリング | Tailwind CSS 3.4.17 |
| UI コンポーネント | Radix UI, next-themes |
| CSV 処理 | csv-parse 5.6.0 (ビルド時), 独自パーサー (ランタイム) |
| ビルドスクリプト | ts-node 10.9.2 |
| テスト | Vitest 3.2.4 + @testing-library/react 16.3.0 |

---

## データモデル

`MlbCardRecord` 型（`mlb-card-loader.ts` 定義）:

| フィールド名 | CSV ヘッダー | 型 | 説明 |
|---|---|---|---|
| no | No. | number \| null | 連番ID |
| issuer | 発行元 | string | カード発行元（Topps, Upper Deck 等） |
| issuerPrefix | 発行元Prefix | string | 発行元略称（tp, ud 等） |
| managementId | 管理用ID | string | 一意の管理ID（例: tp_1999_S1_#222） |
| year | 年 | number \| null | 発行年 |
| series | BOX/シリーズ | string | シリーズ名（Topps Series 1, Chrome 等） |
| seriesPrefix | BOX/シリーズPrefix | string | シリーズ略称（S1, CH, UH 等） |
| distribution | Distribution | string | 流通チャネル（Hobby, Retail 等） |
| cardNumber | カード番号 | string | シリーズ内のカード番号 |
| playerName | 選手名 | string | 選手名（英語） |
| team | チーム名 | string | チーム名（英語） |
| category | 種別 | string | カード種別 |
| parallelOrAuto | パラレル/オート | string | パラレル品番またはオートグラフ情報 |
| baseOrInserts | Base / Inserts | string | ベースカードまたはインサート分類 |
| serialNumber | シリアルNo. | string | シリアル番号（例: 7/50） |
| quantity | 枚数 | number \| null | 所持枚数 |
| condition | 状態 | string | カードのコンディション/グレード |
| status | ステータス | string | 所持状態（所持中 等） |
| purchaseDate | 購入日 | string | 購入日（YYYY-MM-DD） |
| price | 購入価格 | string | 購入価格（フォーマット混在） |
| note | メモ | string | メモ（日本語自由記述） |

---

## データソース（mlb_cards.csv）

- **件数:** 432件（1ヘッダー行 + 432データ行）
- **対象年代:** 1997〜2025年
- **主な発行元:** Topps（多数）、Upper Deck、Fleer、SkyBox、Donruss、timeasia.com
- **購入経路:** メルカリ、Yahoo!オークション、浅草カードショー、topps.jp/topps.com 直販
- **価格帯:** ¥0（余り品）〜 ¥17,380/Hobby Box

**データ特記事項:**
- 価格フォーマットが混在（`888円 / Set`, `17,380円 / Hobby Box`, `$8.99`）
- シリアル入りカードは `7/50`, `35/99` 形式で記録
- メモ欄は日本語で詳細な入手経緯が記載されている

---

## 主要ファイル詳細

### `mlb_card_db/lib/mlb-card-loader.ts`

サーバーサイドでの CSV 読み込み・変換を担当。

- `loadMlbCardRecords()`: CSV を非同期に読み込み `MlbCardRecord[]` を返す
- `mapRow()`: CSV 行を `MlbCardRecord` にマッピング（日本語ヘッダー対応）
- `parseNumeric()`: 非数値文字を除去して number に変換
- CSV パス解決: 複数の候補パスを順に試行し、見つかったものを使用

### `mlb_card_db/lib/csv-parser.ts`

RFC 4180 準拠の独自 CSV パーサー（外部ライブラリ不使用）。

- クォートエスケープ処理（`""` → `"`）
- LF / CRLF 両対応
- 文字単位のステートマシン実装

### `mlb_card_db/components/mlb-card-table.tsx`

インタラクティブテーブル UI（Client Component）。

**機能:**
- **カラムフィルター:** 各列ヘッダーに入力欄、部分一致フィルタリング
- **ソート:** ヘッダークリックで昇順/降順切替
- **型対応ソート:** 数値・日付・テキスト（日本語 `localeCompare`）の型認識比較
- **件数表示:** フィルター後件数 / 全件数
- **リセット:** フィルターとソートを一括クリア

**表示カラム (20列):**
No. | 発行元 | 発行元Prefix | 管理用ID | 年 | BOX/シリーズ | BOX/シリーズPrefix | Distribution | カード番号 | 選手名 | チーム名 | 種別 | パラレル/オート | Base/Inserts | シリアルNo. | 枚数 | 状態 | ステータス | 購入日 | 購入価格 | メモ

### `scripts/convert-mlb-csv.ts`

ビルド時の CSV→JSON 変換スクリプト（`npm run prebuild` で実行）。

- CSV ソースを読み込み `csv-parse/sync` で解析
- `public/data/mlb_cards.json` として出力
- クライアントサイド描画用の静的アセットを生成

---

## ページルーティング

### `/`（ホームページ）— `src/app/page.tsx`

- **レンダリング:** Server Component (SSR)
- **データ取得:** `loadMlbCardRecords()` でファイルシステムから直接 CSV 読み込み
- **UI:** `MlbCardTable` — 全20列 + フィルター + ソート
- **特徴:** 動的なデータ件数表示

### `/mlb-db` — `src/app/mlb-db/page.tsx`

- **レンダリング:** Client Component (CSR)
- **データ取得:** ビルド時生成の `public/data/mlb_cards.json` を使用
- **UI:** 簡易テーブル — 6列のみ（No., 年, シリーズ, カード番号, 選手名, Distribution）
- **フィルター:** 年・選手名・BOX/シリーズの3項目のみ
- **特徴:** 静的アセット利用で高速なページロード

---

## ビルドパイプライン

```
npm run prebuild
  ↓
scripts/convert-mlb-csv.ts 実行
  ↓
mlb_card_db/data/mlb_cards.csv を解析
  ↓
public/data/mlb_cards.json を生成
  ↓
npm run build（Next.js ビルド）
  ↓
.next/ 出力
```

---

## 国際化（i18n）

- **UIテキスト:** 日本語（テーブルヘッダー、ボタン、ページタイトル等）
- **データ:** 英語（選手名、チーム名、シリーズ名）+ 日本語（メモ欄）
- **ソート:** `localeCompare("ja")` で日本語対応ソート

---

## package.json スクリプト

```bash
# charanko/ ディレクトリで実行
npm run dev    # next dev --turbopack（開発サーバー起動）
npm run build  # next build
npm run start  # next start
npm run lint   # next lint
npm run test   # vitest
```

---

## ブランチ情報

| 項目 | 内容 |
|---|---|
| 現在のブランチ | `app_mlb_db` |
| 主な初回コミット | `2e5227b5` - first commit app_mlb_db from codex |
| PR マージ済み | #1, #2 |
| 最新コミット | `077f52af` - fix: replace UI Input with native inputs on product register page |

---

## 設計上の特徴

1. **DB レス構成:** データベース・ORM・API レイヤー不使用。CSV ファイル直接読み込み
2. **デュアル実装:** SSR（`/`）と CSR（`/mlb-db`）の2パターン共存
3. **独自 CSV パーサー:** ランタイム用に外部ライブラリ不使用の軽量パーサーを実装
4. **ビルド時変換:** CSV→JSON をビルド時に処理して静的アセット化
5. **型対応ソート:** 数値・日付・テキストを型認識して適切な比較ロジックを適用
6. **日本語ファースト:** 全UI日本語化 + 日本語ロケール対応ソート
