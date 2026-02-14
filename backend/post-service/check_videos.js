const { Sequelize } = require('sequelize');
const path = require('path');

// Use the same config as post-service
const sequelize = new Sequelize('instagram', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

(async () => {
    try {
        const [posts] = await sequelize.query(
            'SELECT id, userId, mediaType, mediaUrl, imageUrl, videoUrl FROM Posts WHERE mediaType = "VIDEO" LIMIT 10'
        );
        console.log(JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sequelize.close();
    }
})();
