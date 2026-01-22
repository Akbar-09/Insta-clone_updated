const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');

const router = express.Router();

router.post('/', createComment);
router.get('/', getComments);
router.delete('/:id', require('../controllers/commentController').deleteComment);
router.post('/:id/like', require('../controllers/commentController').likeComment);
router.delete('/:id/like', require('../controllers/commentController').unlikeComment);
router.post('/check-comments', require('../controllers/commentController').checkComments);
router.get('/activity/comments', require('../controllers/commentController').getActivityComments);
router.get('/activity/reviews', require('../controllers/commentController').getReviews);

module.exports = router;
