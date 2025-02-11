const getUnreadArticles = require('../../src/lib/getUnreadArticles');
const sendLineNotification = require('../../src/lib/sendLineNotification');
const notificationUnreadPocketCount = require('../../src/command/notificationUnreadPocketCount');

jest.mock('../../src/lib/getUnreadArticles');
jest.mock('../../src/lib/sendLineNotification');

describe('Main Functionality', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send a notification with the correct unread count', async () => {
        // モックの設定
        getUnreadArticles.mockResolvedValue({
            '1': { item_id: '1' },
            '2': { item_id: '2' }
        });
        sendLineNotification.mockResolvedValue();

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // メイン関数の実行
        await notificationUnreadPocketCount();

        // アサーション
        expect(getUnreadArticles).toHaveBeenCalledTimes(1);
        expect(sendLineNotification).toHaveBeenCalledWith('現在、未読の記事が2件あります。');
        expect(consoleLogSpy).toHaveBeenCalledWith('現在、未読の記事が2件あります。');
        expect(consoleLogSpy).toHaveBeenCalledWith('通知を送信しました。');

        consoleLogSpy.mockRestore();
    });

    it('should handle errors gracefully', async () => {
        // モックの設定
        getUnreadArticles.mockRejectedValue(new Error('API Error'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // メイン関数の実行
        await notificationUnreadPocketCount();

        // アサーション
        expect(getUnreadArticles).toHaveBeenCalledTimes(1);
        expect(sendLineNotification).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('エラーが発生しました:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });
});
