# Pocket Notifier

## Overview

「後で見るサービス」のPocketでいまどれだけ未読の記事が残っているかをLINEで通知するアプリケーション

## Hosting

Heroku Schedulerで実行管理をしており、毎日17:00に通知が飛ぶようになっている

## Language

- Node.js

## Env

### アクセストークンの取得

Pocketのアクセストークンを取得するには、以下の手順を実行してください。

1. `.envrc`ファイルに`POCKET_CONSUMER_KEY`を設定します。
2. 以下のコマンドを実行して、認可コードを取得します。
   1. `npm run get-pocket-access-token`
3. スクリプトが表示するURLをブラウザで開き、Pocketの認可を行います。
4. 認可が完了したら、スクリプトに戻りEnterキーを押します。
5. アクセストークンが表示されるので、これを`.envrc`に設定します。

### アプリケーションの実行

Pocketの未読記事をLINEで通知するには、以下のコマンドを実行してください。
