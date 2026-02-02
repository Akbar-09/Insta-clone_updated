const express = require('express');
const router = express.Router();
const controller = require('../controllers/hashtagController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);
router.use(authorizePermissions(['hashtag_moderation']));

router.get('/', controller.listHashtags);
router.get('/trending', controller.getTrendingHashtags);
router.patch('/:id/toggle-visibility', controller.toggleHashtagVisibility);
router.delete('/:id', controller.deleteHashtag);

module.exports = router;
