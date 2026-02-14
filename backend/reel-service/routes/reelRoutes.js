const express = require('express');
const { createReel, getReels, getUserReels, likeReel, unlikeReel, getLikedReels, getActivityReels, getReelById } = require('../controllers/reelController');

const router = express.Router();

router.post('/', createReel);
router.get('/', getReels);
router.get('/activity/reels', getActivityReels);
router.get('/activity/likes', getLikedReels);
router.post('/:id/like', likeReel);
router.delete('/:id/like', unlikeReel);
router.get('/user', getUserReels);
router.get('/:id', getReelById);

module.exports = router;
