const Post = require('./models/Post');
const sequelize = require('./config/database');

const BAD_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const GOOD_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'; // Use a known working one from same bucket but reliable

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        // Use LIKE to catch variants or exact match
        // Actually exact match is safer if we know it.
        // Let's try to update all occurrences.

        const [updatedCount] = await Post.update(
            { mediaUrl: GOOD_URL },
            { where: { mediaUrl: BAD_URL } }
        );

        console.log(`Updated ${updatedCount} posts.`);

    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

fix();
