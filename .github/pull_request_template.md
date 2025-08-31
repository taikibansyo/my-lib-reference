<!--
PR タイトルは Conventional Commits に準拠してください（例: feat: add search box）
ref: https://www.conventionalcommits.org/
-->

## 概要

この PR で何を解決するか、要点を 1〜3 行で。

## 背景 / Context

関連 Issue/Discussion へのリンク（例: Closes #123）。動機・制約・設計判断の補足など。

## 変更内容

- [ ] UI / ページ
- [ ] ロジック / API
- [ ] 型定義 / 型の厳格化
- [ ] スタイル / Tailwind
- [ ] ビルド / 設定（`next.config.js`, `tsconfig.json`, `eslint` など）
- [ ] ドキュメント（`AGENTS.md` など）
- [ ] その他（詳細）:

### スクリーンショット / 動作確認

（UI 変更がある場合は Before/After の画像 or 動画/GIF）

## 動作確認手順

ローカルでの再現と確認手順を具体的に:

1. `pnpm i`（または `npm ci` / `yarn`）
2. `pnpm dev` でローカル起動
3. 〜の条件で 〜を確認
4. テスト: `pnpm test` / `pnpm test:watch`
5. Lint/型: `pnpm lint` / `pnpm typecheck`

## 影響範囲 / Breaking Changes

- [ ] 破壊的変更あり
      影響するページ/モジュール、移行手順（必要なら）

## セキュリティ / 環境変数

- [ ] 新しい環境変数（`.env.example` を更新済み）
- [ ] 機密情報の扱いに注意（ログ出力や公開設定の確認）
- [ ] 権限・認可・入力バリデーションの確認

## パフォーマンス / アクセシビリティ

- [ ] パフォーマンスに与える影響を確認（`React.memo`, `useMemo`, 画像最適化, dynamic import など）
- [ ] Lighthouse/axe の確認（UI 変更時）
- [ ] SSR/ISR/CSR の選択が妥当

## テスト

- [ ] ユニットテストを追加/更新（Vitest + Testing Library）
- [ ] スナップショット更新が必要な場合はレビュー済み
- [ ] 主要分岐（正常/異常/境界）のカバレッジを確認

## チェックリスト

- [ ] PR タイトルが Conventional Commits
- [ ] Lint/型チェック通過（`pnpm lint`, `pnpm typecheck`）
- [ ] テスト緑（`pnpm test`）
- [ ] ドキュメント更新（必要なら）
- [ ] @/ エイリアス・2 スペースインデント・strict TS 方針に準拠
- [ ] スクリーンショット（UI 変更時）

## 備考

レビュー観点やフォローアップ課題など
