const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.post('/', adController.createAd);
router.get('/active', adController.getAds);
router.patch('/:id/approve', adController.approveAd);
router.post('/impression', adController.trackImpression);
router.post('/click', adController.trackClick);

module.exports = router;
