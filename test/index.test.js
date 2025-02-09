const getUnreadArticles = require('../getUnreadArticles');
const sendLineNotification = require('../sendLineNotification');

jest.mock('axios');

describe('Pocket Notifier', () => {
    it('should retrieve unread articles', async () => {
        const articles = await getUnreadArticles();
        expect(articles).toBeDefined();
    });

    it('should send a notification', async () => {
        const message = 'Test message';
        await sendLineNotification(message);
        // Add assertions to verify the notification was sent
    });
}); 
