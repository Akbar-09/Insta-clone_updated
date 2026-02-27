const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// 1. Create Stream - Creates DB record, generates room_name, Status = scheduled or live
router.post('/create', upload.single('thumbnail'), liveController.createStream);

// 2. Start Stream - Validate host, Update status = live, Generate LiveKit token (broadcaster)
router.post('/start/:id', liveController.startStream);

// 3. Join Stream - Validate visibility, Generate LiveKit token (subscriber)
router.post('/join/:id', liveController.joinStream);

// 4. End Stream - Update status = ended, Save ended_at, Calculate peak viewers
router.post('/end/:id', liveController.endStream);

// Feed & Discovery
router.get('/feed', liveController.getLiveFeed);
router.get('/:id', liveController.getStreamDetails);

// Interactions (Optional but good to keep for HTTP fallback, even though socket.io handles real-time)
router.post('/:id/chat', liveController.addChatMessage);

module.exports = router;
