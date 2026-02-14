const { client } = require('../config/redis');

const getFeed = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        let feed = [];

        // 1. If User is Logged In, Fetch Personalized Feed
        if (userId) {
            try {
                // A. Get Following List
                const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5002';
                console.log(`[FeedService] Fetching following for user ${userId} from ${userServiceUrl}`);

                const followingRes = await fetch(`${userServiceUrl}/${userId}/following`);
                let followingIds = [];

                if (followingRes.ok) {
                    const followingData = await followingRes.json();
                    // Handle inconsistent response format (success: true vs status: 'success')
                    if (followingData.status === 'success' || followingData.success === true) {
                        // Assuming data is array of objects with id or userId (the user being followed)
                        // If it's a list of Users, it has id. If it's Follow records, it might be followingId.
                        // Let's assume it returns Users based on typical pattern.
                        if (Array.isArray(followingData.data)) {
                            followingIds = followingData.data.map(u => u.id || u.userId).filter(id => id);
                        }
                    }
                } else {
                    console.warn(`[FeedService] Failed to fetch following: ${followingRes.status}`);
                }

                // Add current user to list
                const userIds = [parseInt(userId), ...followingIds.map(id => parseInt(id))];
                console.log(`[FeedService] Fetching posts for users: ${userIds.length} users`);

                // B. Fetch Posts from Post Service
                const postServiceUrl = process.env.POST_SERVICE_URL || 'http://localhost:5003';
                const postsRes = await fetch(`${postServiceUrl}/feed`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
                    body: JSON.stringify({ userIds, limit: 50 })
                });

                if (postsRes.ok) {
                    const postsData = await postsRes.json();
                    if (postsData.status === 'success') {
                        feed = postsData.data;
                        console.log(`[FeedService] Fetched ${feed.length} personalized posts`);
                    }
                } else {
                    console.error(`[FeedService] Failed to fetch posts from Post Service: ${postsRes.status}`);
                }
            } catch (e) {
                console.error('[FeedService] Personalized feed fetch error:', e);
            }
        }

        // 2. Fallback to Global Feed if empty
        if (feed.length === 0) {
            console.log('[FeedService] Personalized feed empty/failed, falling back to global_feed cache');
            const feedRaw = await client.lRange('global_feed', 0, 49);
            feed = feedRaw.map(item => JSON.parse(item));
        }

        // Hydration Logic (existing)
        if (userId && feed.length > 0) {
            try {
                const postIds = feed.map(p => p.id);
                // ... rest of hydration logic
                const postServiceUrl = process.env.POST_SERVICE_URL || 'http://localhost:5003';

                const response = await fetch(`${postServiceUrl}/check-likes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': userId // Pass it along for good measure
                    },
                    body: JSON.stringify({ postIds, userId })
                });
                // ... continued below in original file ...


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
