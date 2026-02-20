const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.search);
router.get('/users', searchController.search);
router.get('/hashtags', searchController.suggestHashtags);

module.exports = router;
