require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getRequestToken() {
    const response = await axios.post('https://getpocket.com/v3/oauth/request', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        redirect_uri: 'https://localhost:3000'
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Accept': 'application/json'
        }
    });

    return response.data.code;
}

async function getAccessToken(requestToken) {
    const response = await axios.post('https://getpocket.com/v3/oauth/authorize', {
        consumer_key: process.env.POCKET_CONSUMER_KEY,
        code: requestToken
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Accept': 'application/json'
        }
    });

    return response.data.access_token;
}

async function generatePocketAccessToken() {
    try {
        const requestToken = await getRequestToken();
        console.log(`認可コードを取得しました: ${requestToken}`);
        console.log('以下のURLをブラウザで開き、認可を行ってください:');
        console.log(`https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=https://example.com`);

        rl.question('認可が完了したらEnterキーを押してください...', async () => {
            const accessToken = await getAccessToken(requestToken);
            console.log(`アクセストークンを取得しました: ${accessToken}`);
            rl.close();
        });
    } catch (error) {
        console.error('エラーが発生しました:', error);
        rl.close();
    }
}

if (require.main === module) {
    generatePocketAccessToken();
}

module.exports = generatePocketAccessToken;
