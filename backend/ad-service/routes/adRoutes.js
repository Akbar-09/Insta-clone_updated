const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

// Creation Flow
router.post('/draft', adController.createDraft);
router.post('/:id/media', adController.attachMedia);
router.post('/:id/boost-content', adController.attachBoostContent);
router.put('/:id/details', adController.updateDetails);
router.put('/:id/targeting', adController.updateTargeting);
router.put('/:id/budget', adController.updateBudget);
router.post('/:id/publish', adController.publish);

// Helpers
router.get('/eligible-content', adController.getEligibleContent);

// Delivery & Analytics
router.get('/active', adController.getAds);
router.post('/impression', adController.trackImpression);
router.post('/click', adController.trackClick);
router.delete('/:id', adController.deleteAd);
router.put('/:id', adController.updateAd);
router.put('/:id/hide-likes', adController.toggleHideLikes);
router.put('/:id/toggle-comments', adController.toggleComments);
router.get('/:id/embed', adController.getEmbedCode);

// Social
router.post('/:id/like', adController.toggleLike);
router.post('/:id/bookmark', adController.toggleBookmark);
router.get('/:id/comments', adController.getComments);
router.post('/:id/comments', adController.addComment);
router.delete('/:id/comments/:commentId', adController.deleteComment);

// Legacy
router.post('/', adController.createDraft); // Redirect to draft if needed

module.exports = router;
