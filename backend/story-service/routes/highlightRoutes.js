const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');

// Story routes for highlights
router.get('/stories/me', highlightController.getMyStories);

// Highlight routes
router.post('/highlights', highlightController.createHighlight);
router.get('/highlights/:userId', highlightController.getUserHighlights);
router.get('/highlights/:highlightId/stories', highlightController.getHighlightStories);
router.put('/highlights/:highlightId', highlightController.updateHighlight);
router.delete('/highlights/:highlightId', highlightController.deleteHighlight);

module.exports = router;
