# Pocket Notifier

## Overview

「後で見るサービス」のPocketでいまどれだけ未読の記事が残っているかをLINEで通知するアプリケーション

## Hosting

GitHub Actionsで定期的に実行している。 `.github/workflows/notifier.yaml` を参照

## Language

- Node.js

### Usage

```bash
cp .envrc.sample .envrc

# POCKET_ACCESS_TOKEN 以外を埋める
vi .envrc

# Pocket の AccessToken を取得
npm run generatePocketAccessToken

# POCKET_ACCESS_TOKEN を入力
vi .envrc

direnv allow

# Pocketの未読記事をLINEで通知
npm run main
```

