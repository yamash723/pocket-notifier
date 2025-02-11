const axios = require('axios');
const sendLineNotification = require('../../src/lib/sendLineNotification');

jest.mock('axios');

describe('sendLineNotification', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send a notification successfully', async () => {
        const message = 'テストメッセージ';
        axios.post.mockResolvedValue({ status: 200 });

        await sendLineNotification(message);

        expect(axios.post).toHaveBeenCalledWith('https://api.line.me/v2/bot/message/push', {
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
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the notification fails', async () => {
        const message = 'テストメッセージ';
        axios.post.mockRejectedValue(new Error('通知送信に失敗しました'));

        await expect(sendLineNotification(message)).rejects.toThrow('通知送信に失敗しました');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
