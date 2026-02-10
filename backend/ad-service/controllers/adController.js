const Ad = require('../models/Ad');
const AdMedia = require('../models/AdMedia');
const AdTarget = require('../models/AdTarget');
const AdBudget = require('../models/AdBudget');
const AdMetric = require('../models/AdMetric');
const BoostedContentReference = require('../models/BoostedContentReference');
const AdImpression = require('../models/AdImpression');
const AdClick = require('../models/AdClick');
const AdLike = require('../models/AdLike');
const AdBookmark = require('../models/AdBookmark');
const AdComment = require('../models/AdComment');
const axios = require('axios');

const POST_SERVICE_URL = process.env.POST_SERVICE_URL || 'http://localhost:5003';
const STORY_SERVICE_URL = process.env.STORY_SERVICE_URL || 'http://localhost:5004';
const REEL_SERVICE_URL = process.env.REEL_SERVICE_URL || 'http://localhost:5005';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5002';

const adController = {
    // 1. Create Draft Ad
    createDraft: async (req, res) => {
        try {
            const userId = req.headers['x-user-id'];
            if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const { adType } = req.body;
            const ad = await Ad.create({
                userId: parseInt(userId),
                adType: adType || 'NEW_MEDIA',
                status: 'DRAFT'
            });

            res.status(201).json({ status: 'success', data: ad });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 2. Attach Media (New Media)
    attachMedia: async (req, res) => {
        try {
            const { id } = req.params;
            const { mediaItems } = req.body; // Array of { mediaType, r2Key, url, thumbnailUrl, aspectRatio }

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await AdMedia.destroy({ where: { adId: id } });

            const mediaRecords = mediaItems.map((item, index) => ({
                ...item,
                adId: id,
                order: index
            }));

            const createdMedia = await AdMedia.bulkCreate(mediaRecords);
            res.json({ status: 'success', data: createdMedia });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 3. Attach Boost Content
    attachBoostContent: async (req, res) => {
        try {
            const { id } = req.params;
            const { contentType, contentId, originalData } = req.body;

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await BoostedContentReference.destroy({ where: { adId: id } });

            const boostRef = await BoostedContentReference.create({
                adId: id,
                contentType,
                contentId,
                originalData
            });

            res.json({ status: 'success', data: boostRef });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 4. Update Details
    updateDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, caption, ctaText, destinationUrl } = req.body;

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await ad.update({ title, caption, ctaText, destinationUrl });
            res.json({ status: 'success', data: ad });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 5. Update Targeting
    updateTargeting: async (req, res) => {
        try {
            const { id } = req.params;
            const { targetType, locations, ageRange, interests, gender } = req.body;

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ success: false, message: 'Ad not found' });

            await AdTarget.destroy({ where: { adId: id } });
            const target = await AdTarget.create({
                adId: id,
                targetType: targetType || 'AUTOMATIC',
                locations,
                ageRange,
                interests,
                gender: gender || 'ALL'
            });

            res.json({ status: 'success', data: target });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 6. Update Budget
    updateBudget: async (req, res) => {
        try {
            const { id } = req.params;
            const { dailyBudget, totalBudget, startDate, endDate, durationDays } = req.body;

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ success: false, message: 'Ad not found' });

            await AdBudget.destroy({ where: { adId: id } });
            const budget = await AdBudget.create({
                adId: id,
                dailyBudget,
                totalBudget,
                startDate,
                endDate,
                durationDays
            });

            res.json({ status: 'success', data: budget });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 7. Publish
    publish: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await ad.update({ status: 'ACTIVE' });

            // Create initial daily metric record
            await AdMetric.findOrCreate({
                where: { adId: id, date: new Date().toISOString().split('T')[0] }
            });

            res.json({ status: 'success', data: ad });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    // 8. Get Eligible Content for Boosting
    getEligibleContent: async (req, res) => {
        try {
            const userId = req.headers['x-user-id'];
            if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const headers = { 'x-user-id': userId };

            // Fetch from Post Service
            let posts = [];
            try {
                const postRes = await axios.get(`${POST_SERVICE_URL}/?authorId=${userId}`, { headers });
                posts = postRes.data.data;
            } catch (e) { console.error('Post service error', e.message); }

            // Fetch from Reel Service
            let reels = [];
            try {
                // Assuming reel-service also supports userId filter in its main route or we need to add a route
                const reelRes = await axios.get(`${REEL_SERVICE_URL}/`, { headers, params: { userId } });
                reels = reelRes.data.data.filter(r => r.userId == userId);
            } catch (e) { console.error('Reel service error', e.message); }

            // Fetch from Story Service
            let stories = [];
            try {
                const storyRes = await axios.get(`${STORY_SERVICE_URL}/`, { headers });
                stories = storyRes.data.data.filter(s => s.userId == userId);
            } catch (e) { console.error('Story service error', e.message); }

            res.json({
                status: 'success',
                data: {
                    posts,
                    reels,
                    stories
                }
            });
        } catch (error) {
            console.error('Fetch eligible content error:', error.message);
            res.status(500).json({ status: 'error', message: 'Failed to fetch content' });
        }
    },

    // 9. Legacy / Search active ads
    getAds: async (req, res) => {
        try {
            const currentUserId = req.headers['x-user-id'];
            const ads = await Ad.findAll({
                where: { status: 'ACTIVE' },
                include: [
                    { model: AdMedia, as: 'media' },
                    { model: BoostedContentReference, as: 'boostedContent' },
                    { model: AdBudget, as: 'budget' }
                ]
            });

            const formattedAds = await Promise.all(ads.map(async ad => {
                const plainAd = ad.get({ plain: true });
                let mediaUrl = null;
                let mediaType = 'IMAGE';
                let username = 'Sponsored';
                let userAvatar = null;

                // Sync Social Stats
                const [likesCount, commentsCount, isLiked, isSaved] = await Promise.all([
                    AdLike.count({ where: { adId: plainAd.id } }),
                    AdComment.count({ where: { adId: plainAd.id } }),
                    currentUserId ? AdLike.findOne({ where: { adId: plainAd.id, userId: currentUserId } }) : null,
                    currentUserId ? AdBookmark.findOne({ where: { adId: plainAd.id, userId: currentUserId } }) : null
                ]);

                // Fetch User Details
                try {
                    const userRes = await axios.get(`${USER_SERVICE_URL}/users/${plainAd.userId}`);
                    if (userRes.data.status === 'success') {
                        username = userRes.data.data.username;
                        userAvatar = userRes.data.data.profileImage || userRes.data.data.avatarUrl;
                    }
                } catch (e) {
                    // Fallback to "Sponsored" if user service is down
                }

                if (plainAd.adType === 'BOOST_CONTENT' && plainAd.boostedContent?.originalData) {
                    const data = plainAd.boostedContent.originalData;
                    mediaUrl = data.mediaUrl || data.imageUrl || (data.media?.[0]?.url);
                    mediaType = data.mediaType || (data.media?.[0]?.mediaType) || 'IMAGE';
                } else if (plainAd.media && plainAd.media.length > 0) {
                    mediaUrl = plainAd.media[0].url;
                    mediaType = plainAd.media[0].mediaType;
                }

                return {
                    ...plainAd,
                    username,
                    userAvatar,
                    profileImage: userAvatar,
                    mediaUrl,
                    mediaType,
                    likesCount,
                    commentsCount,
                    isLiked: !!isLiked,
                    isSaved: !!isSaved,
                    // Ensure these are at top level for useFeed hook
                    imageUrl: mediaUrl,
                    hideLikes: plainAd.hideLikes,
                    commentsDisabled: plainAd.commentsDisabled
                };
            }));

            res.json({ status: 'success', data: formattedAds });
        } catch (error) {
            console.error('getAds Error:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    trackImpression: async (req, res) => {
        try {
            const { adId, viewerId } = req.body;
            const impression = await AdImpression.create({ adId, viewerId });

            // Update metrics
            const today = new Date().toISOString().split('T')[0];
            const [metric] = await AdMetric.findOrCreate({ where: { adId, date: today } });
            await metric.increment('impressions');

            res.status(201).json({ status: 'success', data: impression });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    trackClick: async (req, res) => {
        try {
            const { adId, viewerId } = req.body;
            const click = await AdClick.create({ adId, viewerId });

            // Update metrics
            const today = new Date().toISOString().split('T')[0];
            const [metric] = await AdMetric.findOrCreate({ where: { adId, date: today } });
            await metric.increment('clicks');

            res.status(201).json({ status: 'success', data: click });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    deleteAd: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await ad.destroy();
            res.json({ status: 'success', message: 'Ad deleted successfully' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    toggleHideLikes: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await ad.update({ hideLikes: !ad.hideLikes });
            res.json({ status: 'success', data: { hideLikes: ad.hideLikes } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    toggleComments: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            await ad.update({ commentsDisabled: !ad.commentsDisabled });
            res.json({ status: 'success', data: { commentsDisabled: ad.commentsDisabled } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    getEmbedCode: async (req, res) => {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            const embedHtml = `<iframe src="${process.env.FRONTEND_URL || 'http://localhost:5173'}/ad-embed/${id}" width="400" height="500" frameborder="0"></iframe>`;
            res.json({ status: 'success', data: { embedHtml } });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    updateAd: async (req, res) => {
        try {
            const { id } = req.params;
            const { caption } = req.body;
            const userId = req.headers['x-user-id'];

            const ad = await Ad.findByPk(id);
            if (!ad) return res.status(404).json({ status: 'error', message: 'Ad not found' });

            if (String(ad.userId) !== String(userId)) {
                return res.status(403).json({ status: 'error', message: 'Unauthorized' });
            }

            await ad.update({ caption });
            res.json({ status: 'success', data: ad });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    toggleLike: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.headers['x-user-id'];
            if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const existing = await AdLike.findOne({ where: { adId: id, userId } });
            if (existing) {
                await existing.destroy();
                res.json({ status: 'success', message: 'Unliked', data: { isLiked: false } });
            } else {
                await AdLike.create({ adId: id, userId });
                res.json({ status: 'success', message: 'Liked', data: { isLiked: true } });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    toggleBookmark: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.headers['x-user-id'];
            if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const existing = await AdBookmark.findOne({ where: { adId: id, userId } });
            if (existing) {
                await existing.destroy();
                res.json({ status: 'success', message: 'Removed from bookmarks', data: { isSaved: false } });
            } else {
                await AdBookmark.create({ adId: id, userId });
                res.json({ status: 'success', message: 'Bookmarked', data: { isSaved: true } });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    getComments: async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await AdComment.findAll({
                where: { adId: id },
                order: [['createdAt', 'DESC']]
            });

            // Hydrate with user details for each comment
            const hydrated = await Promise.all(comments.map(async comment => {
                const plain = comment.get({ plain: true });
                let username = 'User';
                let profileImage = null;
                try {
                    const userRes = await axios.get(`${USER_SERVICE_URL}/users/${plain.userId}`);
                    if (userRes.data.status === 'success') {
                        username = userRes.data.data.username;
                        profileImage = userRes.data.data.profileImage || userRes.data.data.avatarUrl;
                    }
                } catch (e) { }
                return { ...plain, username, profileImage };
            }));

            res.json({ status: 'success', data: hydrated });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    addComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = req.headers['x-user-id'];
            if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const comment = await AdComment.create({ adId: id, userId, content });
            res.status(201).json({ status: 'success', data: comment });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { id, commentId } = req.params;
            const userId = req.headers['x-user-id'];
            const comment = await AdComment.findOne({ where: { id: commentId, adId: id } });
            if (!comment) return res.status(404).json({ status: 'error', message: 'Comment not found' });

            if (comment.userId != userId) return res.status(403).json({ status: 'error', message: 'Unauthorized' });

            await comment.destroy();
            res.json({ status: 'success', message: 'Comment deleted' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
};

module.exports = adController;
