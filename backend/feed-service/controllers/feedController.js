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

                // 3. Hydrate User Profiles (Avatars)
                const userServiceUrl = process.env.USER_SERVICE_URL || 'http://127.0.0.1:5002';
                try {
                    const uniqueUserIds = [...new Set(feed.map(p => p.userId).filter(id => id))];
                    if (uniqueUserIds.length > 0) {
                        const userResponse = await fetch(`${userServiceUrl}/profile/batch`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userIds: uniqueUserIds })
                        });

                        if (userResponse.ok) {
                            const userData = await userResponse.json();
                            if (userData.status === 'success') {
                                const profileMap = {};
                                userData.data.forEach(profile => {
                                    profileMap[profile.userId] = profile;
                                });

                                feed = feed.map(post => {
                                    const profile = profileMap[post.userId];
                                    if (profile) {
                                        return {
                                            ...post,
                                            userAvatar: profile.profilePicture || profile.avatarUrl,
                                            username: profile.username || post.username
                                        };
                                    }
                                    return post;
                                });
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error hydrating user profiles:', err);
                }
            } catch (err) {
                console.error('Error hydrating feed:', err);
            }
        }

        res.json({ status: 'success', data: feed });
    } catch (error) {
        console.error('Get Feed Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = { getFeed };
