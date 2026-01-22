const express = require('express');
const { sendMessage, getMessages, getConversations, markAsSeen } = require('../controllers/messageController');


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

router.get('/conversations', getConversations);
router.get('/conversations/:conversationId', getMessages); // Match requirement: Get messages for a conversation
router.post('/send', sendMessage); // Match requirement: Send a message
router.post('/seen', markAsSeen); // Match requirement: Mark messages as seen

module.exports = router;
