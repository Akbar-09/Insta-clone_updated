const AdMedia = require('./models/AdMedia');
const sequelize = require('./config/database');

const BAD_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const GOOD_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const [updatedCount] = await AdMedia.update(
            { url: GOOD_URL },
            { where: { url: BAD_URL } }
        );

        console.log(`Updated ${updatedCount} ad media.`);

    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

fix();
