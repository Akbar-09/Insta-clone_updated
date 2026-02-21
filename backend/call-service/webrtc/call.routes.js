const express = require('express');
const router = express.Router();
const callController = require('./call.controller');

router.post('/start', callController.startCall);
router.put('/:id/status', callController.updateStatus);
router.get('/history/:userId', callController.getHistory);

module.exports = router;
