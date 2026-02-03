# app-template

ログイン不要・スマホ対応・公開前提の量産テンプレです。端末内保存 + JSONバックアップにより、公開しても荒れにくい設計です。

## 前提
- Node.js 20.x 推奨

## セットアップ
```bash
npm install
```

## 起動
```bash
npm run dev
```

## 動作確認
- `http://localhost:3000/`
- `http://localhost:3000/api/health`

## Vercelで公開する手順
1. GitHubにリポジトリをPush
2. Vercelのダッシュボードで「Add New」→「Project」
3. GitHub連携を行い、対象リポジトリを選択
4. 「Import」→「Deploy」

## データ保存に関する注意点
- データは端末内（localStorage）にのみ保存されます。
- ログインなしで公開しても、サーバー側に書き込み先がないため荒れにくい構成です。
