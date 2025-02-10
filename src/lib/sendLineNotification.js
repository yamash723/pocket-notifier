require('dotenv').config();
const axios = require('axios');

async function sendLineNotification(message) {
    await axios.post('https://api.line.me/v2/bot/message/push', {
        to: process.env.LINE_USER_ID,
        messages: [
            {
                type: 'text',
                text: message
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
        }
    });
}

module.exports = sendLineNotification;

