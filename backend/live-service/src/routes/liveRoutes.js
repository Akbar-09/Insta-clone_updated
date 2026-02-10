const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Instagram-style Live Features
router.post('/go-live', upload.single('thumbnail'), liveController.goLiveNow);
router.post('/schedule', upload.single('thumbnail'), liveController.scheduleStream);

// Feed & Discovery
router.get('/feed', liveController.getLiveFeed);
router.get('/:id', liveController.getStreamDetails);

// Interactions
router.post('/:id/end', liveController.endStream);
router.post('/:id/chat', liveController.addChatMessage);

// Node-Media-Server Internal Webhooks
router.post('/webhook/publish', liveController.onPublish);
router.post('/webhook/done', liveController.onDone);

module.exports = router;
