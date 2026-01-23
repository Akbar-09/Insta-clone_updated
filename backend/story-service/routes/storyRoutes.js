const express = require('express');
const {
    createStory,
    getStories,
    getArchivedStories,
    deleteStory,
    reportStory,
    viewStory,
    getStoryReplies,
    reactToStory,
    unreactToStory
} = require('../controllers/storyController');

const router = express.Router();

router.post('/', createStory);
router.get('/', getStories);
router.get('/archive', getArchivedStories);
router.get('/activity/story-replies', getStoryReplies);
router.delete('/:id', deleteStory);
router.post('/:id/report', reportStory);
router.post('/:id/view', viewStory);
router.post('/:id/react', reactToStory);
router.delete('/:id/react', unreactToStory);

module.exports = router;
