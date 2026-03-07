const HashtagFollow = require('../models/HashtagFollow');

exports.getFollowedHashtags = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const follows = await HashtagFollow.findAll({
            where: { userId },
            attributes: ['hashtag']
        });

        res.json({ status: 'success', data: follows.map(f => f.hashtag) });
    } catch (err) {
        console.error('Get Followed Hashtags Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.followHashtag = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { hashtag } = req.body;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        if (!hashtag) return res.status(400).json({ status: 'error', message: 'Hashtag is required' });

        // Clean hashtag (ensure it doesn't start with # if stored without it, or consistently with it)
        const cleanHashtag = hashtag.startsWith('#') ? hashtag.substring(1) : hashtag;

        await HashtagFollow.findOrCreate({
            where: { userId, hashtag: cleanHashtag }
        });

        res.json({ status: 'success', message: `Following #${cleanHashtag}` });
    } catch (err) {
        console.error('Follow Hashtag Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.unfollowHashtag = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { hashtag } = req.params;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const cleanHashtag = hashtag.startsWith('#') ? hashtag.substring(1) : hashtag;

        await HashtagFollow.destroy({
            where: { userId, hashtag: cleanHashtag }
        });

        res.json({ status: 'success', message: `Unfollowed #${cleanHashtag}` });
    } catch (err) {
        console.error('Unfollow Hashtag Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};
