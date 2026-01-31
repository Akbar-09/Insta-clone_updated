const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');

// Client API
router.post('/create', liveController.createSession);
router.get('/feed/active', liveController.getLiveFeed);
router.get('/:id', liveController.getSession);
router.post('/:id/comment', liveController.addComment);

// Node-Media-Server Webhooks (These should probably be protected or internal only)
// NMS sends post requests
router.post('/webhook/publish', liveController.onPublish);
router.post('/webhook/done', liveController.onDone);

module.exports = router;
