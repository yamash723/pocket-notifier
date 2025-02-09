require('dotenv').config();
const axios = require('axios');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUnreadArticles() {
    let allArticles = {};
    let offset = 0;
    const count = 30; // Pocket APIの最大取得件数
    const maxTries = 10; // バグ発生時に無限リクエストをしないための処理
    let tries = 0;

    while (tries < maxTries) {
        console.log(`ページング処理中: ${tries + 1}回目のリクエストを送信しています...`);

        const response = await axios.post('https://getpocket.com/v3/get', {
            consumer_key: process.env.POCKET_CONSUMER_KEY,
            access_token: process.env.POCKET_ACCESS_TOKEN,
            state: 'unread',
            detailType: 'simple',
            count: count,
            offset: offset
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Accept': 'application/json'
            }
        });

        const articles = response.data.list;
        if (!articles || Object.keys(articles).length === 0) {
            console.log('未読記事の取得が完了しました。');
            return allArticles;
        }

        allArticles = { ...allArticles, ...articles };
        offset += count;

        console.log(`取得した記事数: ${Object.keys(articles).length}件`);

        // すべての結果を取得したか確認
        if (Object.keys(articles).length < count) {
            console.log('すべての未読記事を取得しました。');
            return allArticles;
        }

        // 連続アクセス防止用の200msのスリープ
        await sleep(200);
        tries++;
    }

    throw new Error('未読記事が最大ページング数を超えて存在しているため、取得を停止しました。');
}

module.exports = getUnreadArticles;
