const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function checkReels() {
    try {
        await sequelize.authenticate();
        console.log('Reel DB Connected');

        // Check for users in Reels that might not be in UserProfile
        const [results] = await sequelize.query('SELECT DISTINCT username FROM "Reels" LIMIT 20');
        console.log('Usernames in Reels:', results.map(r => r.username));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkReels();
