const express = require('express');
const {
    createStory,
    getStories,
    getArchivedStories,
    deleteStory,
    reportStory,
    viewStory
} = require('../controllers/storyController');

const router = express.Router();

router.post('/', createStory);
router.get('/', getStories);
router.get('/archive', getArchivedStories);
router.delete('/:id', deleteStory);
router.post('/:id/report', reportStory);
router.post('/:id/view', viewStory);

module.exports = router;
