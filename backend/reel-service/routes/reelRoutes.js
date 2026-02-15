const express = require('express');
const { createReel, getReels, getUserReels, likeReel, unlikeReel, getLikedReels, getActivityReels, getReelById, bookmarkReel, unbookmarkReel, getSavedReels } = require('../controllers/reelController');

const router = express.Router();

router.post('/', createReel);
router.get('/', getReels);
router.get('/saved', getSavedReels);
router.get('/activity/reels', getActivityReels);
router.get('/activity/likes', getLikedReels);
router.post('/:id/like', likeReel);
router.delete('/:id/like', unlikeReel);
router.post('/:id/bookmark', bookmarkReel);
router.delete('/:id/bookmark', unbookmarkReel);
router.get('/user', getUserReels);
router.get('/:id', getReelById);

module.exports = router;
