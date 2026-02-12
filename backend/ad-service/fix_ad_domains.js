const AdMedia = require('./models/AdMedia');
const sequelize = require('./config/database');
const { Op } = require('sequelize');

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const oldDomain = 'commondatastorage.googleapis.com';
        const newDomain = 'storage.googleapis.com';

        const [updatedCount] = await AdMedia.update(
            {
                url: sequelize.fn('REPLACE', sequelize.col('url'), oldDomain, newDomain)
            },
            {
                where: {
                    url: { [Op.like]: `%${oldDomain}%` }
                }
            }
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
