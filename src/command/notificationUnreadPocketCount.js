const getUnreadArticles = require('../lib/getUnreadArticles');
const sendLineNotification = require('../lib/sendLineNotification');

async function notificationUnreadPocketCount() {
  try {
      const articles = await getUnreadArticles();
      const unreadCount = Object.keys(articles).length;
      const message = `現在、未読の記事が${unreadCount}件あります。`;
      console.log(message)
      await sendLineNotification(message);
      console.log('通知を送信しました。');
  } catch (error) {
      console.error('エラーが発生しました:', error);
      throw new Error(error);
  }
}

if (require.main === module) {
  notificationUnreadPocketCount();
}

module.exports = notificationUnreadPocketCount;
