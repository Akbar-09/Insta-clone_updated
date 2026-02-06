const express = require('express');
const { uploadMedia, getMediaStatus } = require('../controllers/mediaController');
const { getPresignedUrl, finalizeUpload } = require('../controllers/mediaR2Controller');

const router = express.Router();

// Legacy Local Upload
router.post('/upload', uploadMedia);
router.get('/status/:id', getMediaStatus);

// R2 Cloud Upload
router.post('/presigned-url', getPresignedUrl);
router.post('/finalize', finalizeUpload);

module.exports = router;
