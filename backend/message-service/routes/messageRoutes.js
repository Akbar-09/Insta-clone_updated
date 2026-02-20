const express = require('express');
const { sendMessage, getMessages, getConversations, getUnreadCount, markAsSeen, getActivityStoryReplies, getConversationDetails, toggleMute, deleteConversation, blockUser, unblockUser, reportConversation } = require('../controllers/messageController');

const router = express.Router();

// Middleware to check auth would be here or applied globally. 
// For now, assuming request logic handles it or we add a simple middleware mock/import if needed.
// Given previous patterns, we might rely on Gateway passing headers, but let's assume we need to extract user.

// Mock middleware if not existing in service yet, or standard extraction
const extractUser = (req, res, next) => {
    // In a microservice, user info typically comes from headers set by API Gateway
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    req.user = { id: parseInt(userId) };
    next();
};

router.use(extractUser);

router.get('/activity/story-replies', getActivityStoryReplies);
router.get('/unread-count', getUnreadCount);
router.get('/conversations', getConversations);
router.get('/conversations/:conversationId', getMessages); // Supports legacy /conversations/:id
router.get('/conversations/:conversationId/messages', getMessages); // Matches Flutter app
router.post('/conversations/:conversationId/messages', sendMessage); // Send to specific conv
router.get('/conversations/:conversationId/details', getConversationDetails);
router.patch('/conversations/:conversationId/mute', toggleMute);
router.post('/conversations/:conversationId/block', blockUser);
router.post('/conversations/:conversationId/unblock', unblockUser);
router.post('/conversations/:conversationId/report', reportConversation);
router.delete('/conversations/:conversationId', deleteConversation);
router.post('/send', sendMessage);
router.post('/seen', markAsSeen);

module.exports = router;
