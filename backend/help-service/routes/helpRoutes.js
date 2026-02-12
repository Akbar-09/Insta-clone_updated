const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

// Public
router.get('/categories', helpController.getCategories);
router.get('/category/:slug', helpController.getCategoryBySlug);
router.get('/articles/featured', helpController.getFeaturedArticles);
router.get('/articles', helpController.getArticles);
router.get('/article/:slug', helpController.getArticleBySlug);
router.get('/search', helpController.searchArticles);
router.post('/feedback', helpController.submitFeedback);

module.exports = router;
