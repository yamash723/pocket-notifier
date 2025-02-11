# Pocket Notifier

## Overview

「後で見るサービス」のPocketでいまどれだけ未読の記事が残っているかをLINEで通知するアプリケーション

## Hosting

Heroku Schedulerで実行管理をしており、毎日17:00に通知が飛ぶようになっている

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

