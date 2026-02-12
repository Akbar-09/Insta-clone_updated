const Reel = require('./models/Reel');
const sequelize = require('./config/database');

const BAD_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const GOOD_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'; // Use a known working one

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const [updatedCount] = await Reel.update(
            { videoUrl: GOOD_URL },
            { where: { videoUrl: BAD_URL } }
        );

        console.log(`Updated ${updatedCount} reels.`);

    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

fix();
