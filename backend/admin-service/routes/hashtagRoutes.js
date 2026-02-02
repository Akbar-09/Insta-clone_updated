const express = require('express');
const router = express.Router();
const hashtagController = require('../controllers/hashtagController');
const { authenticateAdmin, authorizePermissions } = require('../middleware/authMiddleware');

router.use(authenticateAdmin);

router.get('/', authorizePermissions(['hashtags:read']), hashtagController.getHashtags);
router.get('/trending', authorizePermissions(['hashtags:read']), hashtagController.getTrendingHashtags);
router.patch('/:id/block', authorizePermissions(['hashtags:write']), hashtagController.blockHashtag);
router.post('/feature', authorizePermissions(['feed:write']), hashtagController.featureContent);

module.exports = router;
