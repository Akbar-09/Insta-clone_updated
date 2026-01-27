const express = require('express');
const { createPost, getPosts, getExplorePosts, getPostById, likePost, unlikePost, bookmarkPost, unbookmarkPost, getSavedPosts, checkLikes, deletePost, updatePost, toggleHideLikes, toggleComments, reportPost, getEmbedCode, getActivityLikes, getActivityPosts } = require('../controllers/postController');

const router = express.Router();

router.post('/', createPost);
router.get('/explore', getExplorePosts);
router.get('/', getPosts);
router.post('/:id/like', likePost);
router.delete('/:id/like', unlikePost);
// Define specific routes before generic :id routes if necessary, but here structure is fine
router.get('/saved', getSavedPosts);
router.post('/check-likes', checkLikes);
router.get('/activity/likes', getActivityLikes);
router.get('/activity/posts', getActivityPosts);

// Post Management
router.get('/:id/embed', getEmbedCode);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
router.put('/:id/hide-likes', toggleHideLikes);
router.put('/:id/toggle-comments', toggleComments);
router.post('/:id/report', reportPost);

router.post('/:id/bookmark', bookmarkPost);
router.delete('/:id/bookmark', unbookmarkPost);

module.exports = router;
