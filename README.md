# TODOアプリ

このリポジトリには、Next.jsで作成されたTODOアプリが含まれています。

## 🚀 GitHub Pagesでの公開

このプロジェクトは自動的にGitHub Pagesにデプロイされます。

### セットアップ手順

1. このリポジトリをGitHubにプッシュ
2. GitHub リポジトリの Settings > Pages に移動
3. Source を "GitHub Actions" に設定
4. mainブランチにプッシュすると自動的にデプロイされます

### アクセスURL

デプロイ後、以下のURLでアクセスできます：
`https://[ユーザー名].github.io/[リポジトリ名]/`

## 🛠 ローカル開発

```bash
cd task-manager
npm install
npm run dev
```

## 📁 プロジェクト構成

- `task-manager/` - Next.jsアプリケーション
- `.github/workflows/deploy.yml` - GitHub Actions デプロイ設定

## ✨ 機能

- タスクの追加・編集・削除
- ステータス管理（未着手・進行中・完了）
- 優先度設定
- ピン留め機能
- 検索・フィルタリング
- ダークモード対応
- レスポンシブデザイン