const SearchIndex = require('../models/SearchIndex');
const { Op } = require('sequelize');

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

                // Call User Service to check follow status
                // Using global fetch (Node 18+)
                const response = await fetch('http://localhost:5002/profile/batch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userIds, currentUserId })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success') {
                        const profileMap = {};
                        data.data.forEach(p => { profileMap[p.userId] = p.isFollowing; });

                        plainResults.forEach(r => {
                            if (r.type === 'USER' && profileMap[r.referenceId] !== undefined) {
                                r.isFollowing = profileMap[r.referenceId];
                            }
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch follow status enrichments:", err.message);
            }
        }

        res.json({ status: 'success', data: plainResults });
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
