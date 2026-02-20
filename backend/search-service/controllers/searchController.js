const SearchIndex = require('../models/SearchIndex');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.search = async (req, res) => {
    try {
        const { q } = req.query;
        const currentUserId = req.headers['x-user-id'];

        if (!q || q.trim() === '') {
            return res.json({ status: 'success', data: [] });
        }

        // Search for Users or Hashtags
        const results = await SearchIndex.findAll({
            where: {
                content: {
                    [Op.iLike]: `%${q}%`
                }
            },
            limit: 20
        });

        const plainResults = results.map(r => r.toJSON());
        const userResults = plainResults.filter(r => r.type === 'USER');

        if (currentUserId && userResults.length > 0) {
            try {
                const userIds = userResults.map(r => r.referenceId);
                console.log(`[SearchService] Fetching batch profiles for: ${userIds}, CurrentUser: ${currentUserId}`);

                // Call User Service to check follow status
                // Using global fetch (Node 18+)
                const response = await fetch('http://localhost:5002/profile/batch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userIds, currentUserId })
                });

                if (!response.ok) {
                    console.error(`[SearchService] Batch profile fetch failed: ${response.status} ${response.statusText}`);
                    const text = await response.text();
                    console.error(`[SearchService] Response body: ${text}`);
                }

                if (response.ok) {
                    const data = await response.json();
                    console.log(`[SearchService] Batch profile response status: ${data.status}`);
                    if (data.status === 'success') {
                        const profileMap = {};
                        data.data.forEach(p => {
                            profileMap[p.userId] = {
                                isFollowing: p.isFollowing,
                                username: p.username,
                                fullName: p.fullName,
                                profilePicture: p.profilePicture
                            };
                        });
                        console.log(`[SearchService] Profile Map Keys: ${Object.keys(profileMap)}`);

                        plainResults.forEach(r => {
                            if (r.type === 'USER') {
                                const profile = profileMap[r.referenceId] || profileMap[String(r.referenceId)];
                                // Ensure userId is always available for frontend use
                                r.userId = r.referenceId;

                                if (profile) {
                                    console.log(`[SearchService] Enriching ${r.content} (ID: ${r.referenceId}) - isFollowing: ${profile.isFollowing}`);
                                    r.isFollowing = profile.isFollowing;
                                    // Add these fields so frontend components (like Share modal) can find them easily
                                    r.username = profile.username;
                                    r.fullName = profile.fullName;
                                    r.profilePicture = profile.profilePicture;
                                }
                            }
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch follow status enrichments:", err.message);
                console.error(err.stack);
            }
        }

        res.json({ status: 'success', data: plainResults });
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.suggestHashtags = async (req, res) => {
    try {
        let { q } = req.query;
        if (!q) return res.json({ status: 'success', data: [] });

        // Remove leading # if present
        if (q.startsWith('#')) q = q.substring(1);

        const results = await SearchIndex.findAll({
            where: {
                type: 'HASHTAG',
                content: {
                    [Op.iLike]: `#${q}%`
                }
            },
            order: [
                [sequelize.literal("CAST(COALESCE(metadata->>'postCount', '0') AS INTEGER)"), 'DESC']
            ],
            limit: 10
        });

        res.json({ status: 'success', data: results });
    } catch (error) {
        console.error('Suggest Hashtags Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
