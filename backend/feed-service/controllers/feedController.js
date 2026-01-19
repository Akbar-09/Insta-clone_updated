const { client } = require('../config/redis');

const getFeed = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        // For MVP, just return the global feed
        const feedRaw = await client.lRange('global_feed', 0, 49);
        let feed = feedRaw.map(item => JSON.parse(item));

        if (userId && feed.length > 0) {
            try {
                const postIds = feed.map(p => p.id);
                const postServiceUrl = process.env.POST_SERVICE_URL || 'http://127.0.0.1:5003';

                const response = await fetch(`${postServiceUrl}/check-likes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': userId // Pass it along for good measure
                    },
                    body: JSON.stringify({ postIds, userId })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success') {
                        const likesMap = data.data;
                        feed = feed.map(post => {
                            const hydrationData = likesMap[post.id];
                            if (hydrationData) {
                                return {
                                    ...post,
                                    isLiked: hydrationData.isLiked,
                                    likesCount: hydrationData.likesCount
                                };
                            }
                            return post;
                        });
                    }
                }
                // 2. Hydrate Comments
                const commentServiceUrl = process.env.COMMENT_SERVICE_URL || 'http://127.0.0.1:5006';
                try {
                    const commentResponse = await fetch(`${commentServiceUrl}/check-comments`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ postIds })
                    });

                    if (commentResponse.ok) {
                        const commentData = await commentResponse.json();
                        if (commentData.status === 'success') {
                            const commentsMap = commentData.data;
                            feed = feed.map(post => {
                                const cData = commentsMap[post.id];
                                if (cData) {
                                    return {
                                        ...post,
                                        commentsCount: cData.commentsCount,
                                        latestComments: cData.latestComments
                                    };
                                }
                                return post;
                            });
                        }
                    }
                } catch (err) {
                    console.error('Error hydrating comments:', err);
                }
            } catch (err) {
                console.error('Error hydrating feed:', err);
                // Continue with whatever data we have
            }
        }

        res.json({ status: 'success', data: feed });
    } catch (error) {
        console.error('Get Feed Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { getFeed };
