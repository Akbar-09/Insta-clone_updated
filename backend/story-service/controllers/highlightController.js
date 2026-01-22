const Highlight = require('../models/Highlight');
const HighlightStory = require('../models/HighlightStory');
const Story = require('../models/Story');
const { Op } = require('sequelize');

/**
 * Get user's stories for highlight selection (including expired)
 * GET /api/v1/stories/me
 */
exports.getMyStories = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        // Get all user's stories, including expired ones (Instagram behavior)
        const stories = await Story.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            status: 'success',
            data: stories
        });
    } catch (error) {
        console.error('Get My Stories Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Create a new highlight
 * POST /api/v1/highlights
 */
exports.createHighlight = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.body.userId;
        const { title, storyIds } = req.body;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        if (!title || !title.trim()) {
            return res.status(400).json({ status: 'error', message: 'Title is required' });
        }

        if (!storyIds || !Array.isArray(storyIds) || storyIds.length === 0) {
            return res.status(400).json({ status: 'error', message: 'At least one story is required' });
        }

        // Verify all stories belong to the user
        const stories = await Story.findAll({
            where: {
                id: storyIds,
                userId: userId
            }
        });

        if (stories.length !== storyIds.length) {
            return res.status(400).json({ status: 'error', message: 'Invalid story IDs' });
        }

        // Create highlight with first story as cover
        const highlight = await Highlight.create({
            userId,
            title: title.trim(),
            coverStoryId: storyIds[0]
        });

        // Add stories to highlight
        const highlightStories = storyIds.map(storyId => ({
            highlightId: highlight.id,
            storyId
        }));

        await HighlightStory.bulkCreate(highlightStories);

        // Fetch complete highlight with cover story
        const coverStory = await Story.findByPk(storyIds[0]);

        res.status(201).json({
            status: 'success',
            data: {
                ...highlight.toJSON(),
                coverStory,
                storyCount: storyIds.length
            },
            message: 'Highlight created successfully'
        });
    } catch (error) {
        console.error('Create Highlight Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get user's highlights
 * GET /api/v1/highlights/:userId
 */
exports.getUserHighlights = async (req, res) => {
    try {
        const { userId } = req.params;

        const highlights = await Highlight.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']]
        });

        // Fetch cover stories and story counts for each highlight
        const highlightsWithDetails = await Promise.all(
            highlights.map(async (highlight) => {
                const coverStory = highlight.coverStoryId
                    ? await Story.findByPk(highlight.coverStoryId)
                    : null;

                const storyCount = await HighlightStory.count({
                    where: { highlightId: highlight.id }
                });

                return {
                    ...highlight.toJSON(),
                    coverStory,
                    storyCount
                };
            })
        );

        res.json({
            status: 'success',
            data: highlightsWithDetails
        });
    } catch (error) {
        console.error('Get User Highlights Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get highlight stories
 * GET /api/v1/highlights/:highlightId/stories
 */
exports.getHighlightStories = async (req, res) => {
    try {
        const { highlightId } = req.params;

        // Get highlight to verify it exists
        const highlight = await Highlight.findByPk(highlightId);

        if (!highlight) {
            return res.status(404).json({ status: 'error', message: 'Highlight not found' });
        }

        // Get all story IDs in this highlight
        const highlightStories = await HighlightStory.findAll({
            where: { highlightId },
            order: [['createdAt', 'ASC']]
        });

        const storyIds = highlightStories.map(hs => hs.storyId);

        // Fetch actual stories
        const stories = await Story.findAll({
            where: { id: storyIds }
        });

        // Sort stories in the order they were added to highlight
        const sortedStories = storyIds.map(id =>
            stories.find(story => story.id === id)
        ).filter(Boolean);

        res.json({
            status: 'success',
            data: {
                highlight,
                stories: sortedStories
            }
        });
    } catch (error) {
        console.error('Get Highlight Stories Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Delete a highlight
 * DELETE /api/v1/highlights/:highlightId
 */
exports.deleteHighlight = async (req, res) => {
    try {
        const { highlightId } = req.params;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const highlight = await Highlight.findByPk(highlightId);

        if (!highlight) {
            return res.status(404).json({ status: 'error', message: 'Highlight not found' });
        }

        // Verify ownership
        if (highlight.userId !== parseInt(userId)) {
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }

        // Delete highlight stories first
        await HighlightStory.destroy({
            where: { highlightId }
        });

        // Delete highlight
        await highlight.destroy();

        res.json({
            status: 'success',
            message: 'Highlight deleted successfully'
        });
    } catch (error) {
        console.error('Delete Highlight Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Update highlight title
 * PUT /api/v1/highlights/:highlightId
 */
exports.updateHighlight = async (req, res) => {
    try {
        const { highlightId } = req.params;
        const { title } = req.body;
        const userId = req.headers['x-user-id'] || req.body.userId;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        if (!title || !title.trim()) {
            return res.status(400).json({ status: 'error', message: 'Title is required' });
        }

        const highlight = await Highlight.findByPk(highlightId);

        if (!highlight) {
            return res.status(404).json({ status: 'error', message: 'Highlight not found' });
        }

        // Verify ownership
        if (highlight.userId !== parseInt(userId)) {
            return res.status(403).json({ status: 'error', message: 'Forbidden' });
        }

        highlight.title = title.trim();
        await highlight.save();

        res.json({
            status: 'success',
            data: highlight,
            message: 'Highlight updated successfully'
        });
    } catch (error) {
        console.error('Update Highlight Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Get activity highlights
 * GET /activity/highlights
 */
exports.getActivityHighlights = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'] || req.query.userId;
        const { sort = 'newest', startDate, endDate } = req.query;

        if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

        const whereClause = { userId };
        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const highlights = await Highlight.findAll({
            where: whereClause,
            order: [['createdAt', sort === 'oldest' ? 'ASC' : 'DESC']]
        });

        // Enrich with cover story
        const highlightsWithDetails = await Promise.all(
            highlights.map(async (highlight) => {
                const coverStory = highlight.coverStoryId
                    ? await Story.findByPk(highlight.coverStoryId)
                    : null;
                return {
                    ...highlight.toJSON(),
                    coverStory
                };
            })
        );


        res.json({ status: 'success', data: highlightsWithDetails });
    } catch (error) {
        console.error('Get Activity Highlights Error:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = exports;
