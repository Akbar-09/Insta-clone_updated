const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
// const auth = require('../middleware/auth'); // If auth middleware exists

// Admin (Protected) - Verify Token Middleware should be added here
// router.use(auth); 

router.post('/category', helpController.createCategory);
router.put('/category/:id', helpController.updateCategory);
router.delete('/category/:id', helpController.deleteCategory);

router.post('/article', helpController.createArticle);
router.get('/articles', helpController.getAdminArticles);
router.put('/article/:id', helpController.updateArticle);
router.delete('/article/:id', helpController.deleteArticle);

module.exports = router;
