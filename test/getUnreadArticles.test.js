const axios = require('axios');
const getUnreadArticles = require('../src/lib/getUnreadArticles');

jest.mock('axios');

describe('getUnreadArticles', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve all articles successfully with less than 30 items', async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                list: { '1': { item_id: '1' }, '2': { item_id: '2' } }
            }
        });

        const articles = await getUnreadArticles();
        expect(Object.keys(articles).length).toBe(2);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should retrieve all articles successfully with exactly 30 items', async () => {
        axios.post
            .mockResolvedValueOnce({
                data: {
                    list: Array.from({ length: 30 }, (_, i) => ({ item_id: `${i + 1}` }))
                        .reduce((acc, item, index) => {
                            acc[index + 1] = item;
                            return acc;
                        }, {})
                }
            })
            .mockResolvedValueOnce({
                data: {
                    list: {}
                }
            });

        const articles = await getUnreadArticles();
        expect(Object.keys(articles).length).toBe(30);
        expect(axios.post).toHaveBeenCalledTimes(2);
    });

    it('should throw an error after maximum retries', async () => {
      axios.post.mockResolvedValue({
        data: {
            list: Array.from({ length: 30 }, (_, i) => ({ item_id: `${i + 1}` }))
                .reduce((acc, item, index) => {
                    acc[index + 1] = item;
                    return acc;
                }, {})
          }
      });

        await expect(getUnreadArticles()).rejects.toThrow('未読記事が最大ページング数を超えて存在しているため、取得を停止しました。');
        expect(axios.post).toHaveBeenCalledTimes(10);
    });

    it('should handle zero articles gracefully', async () => {
        axios.post.mockResolvedValue({
            data: {
                list: {}
            }
        });

        const articles = await getUnreadArticles();
        expect(Object.keys(articles).length).toBe(0);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
