const sequelize = require('../config/database');
const Highlight = require('../models/Highlight');
const HighlightStory = require('../models/HighlightStory');
require('dotenv').config({ path: '../.env' }); // Adjust path if needed

const clearHighlights = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // Delete all
        await HighlightStory.destroy({ where: {}, truncate: true });
        await Highlight.destroy({ where: {}, truncate: true });

        console.log('Highlights cleared successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing highlights:', error);
        process.exit(1);
    }
};

clearHighlights();
