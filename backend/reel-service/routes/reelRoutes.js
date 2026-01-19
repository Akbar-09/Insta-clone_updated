const express = require('express');
const { createReel, getReels } = require('../controllers/reelController');

const router = express.Router();

router.post('/', createReel);
router.get('/', getReels);

module.exports = router;
