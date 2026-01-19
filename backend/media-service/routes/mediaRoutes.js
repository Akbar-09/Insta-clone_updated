const express = require('express');
const { uploadMedia } = require('../controllers/mediaController');

const router = express.Router();

router.post('/upload', uploadMedia);

module.exports = router;
