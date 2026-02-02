const internalApi = require('../services/internalApi');
const { AuditLog } = require('../models');

exports.getPosts = async (req, res) => {
    try {
        const response = await internalApi.getPosts();
        res.json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await internalApi.deletePost(postId);

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'DELETE_POST',
            targetType: 'post',
            targetId: postId
        });

        res.json({ success: true, message: 'Post deleted and action logged' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.hidePost = async (req, res) => {
    // ... existing hidePost
    try {
        const { postId } = req.params;
        await internalApi.hidePost(postId);

        await AuditLog.create({
            adminId: req.admin.id,
            actionType: 'HIDE_POST',
            targetType: 'post',
            targetId: postId
        });

        res.json({ success: true, message: 'Post visibility hidden and logged' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getReels = async (req, res) => {
    try {
        const response = await internalApi.getReels();
        res.json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        await internalApi.deleteReel(reelId);
        await AuditLog.create({ adminId: req.admin.id, actionType: 'DELETE_REEL', targetType: 'reel', targetId: reelId });
        res.json({ success: true, message: 'Reel deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        // Mock internal API call for story
        await AuditLog.create({ adminId: req.admin.id, actionType: 'DELETE_STORY', targetType: 'post', targetId: storyId });
        res.json({ success: true, message: 'Story deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        // Mock internal API call for comment
        await AuditLog.create({ adminId: req.admin.id, actionType: 'DELETE_COMMENT', targetType: 'comment', targetId: commentId });
        res.json({ success: true, message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
