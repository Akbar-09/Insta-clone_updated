const express = require('express');
const { createReel, getReels, getUserReels, likeReel, unlikeReel, getLikedReels, getActivityReels } = require('../controllers/reelController');

const router = express.Router();

router.post('/', createReel);
router.get('/', getReels);
router.get('/activity/reels', getActivityReels);
router.get('/activity/likes', getLikedReels);
router.post('/:id/like', likeReel);
router.delete('/:id/like', unlikeReel);

module.exports = router;
