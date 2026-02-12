const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('ad_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Ad = sequelize.define('Ad', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: DataTypes.INTEGER
}, { tableName: 'ads', timestamps: true });

const AdMedia = sequelize.define('AdMedia', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: { type: DataTypes.UUID },
    url: DataTypes.STRING,
    r2Key: DataTypes.STRING
}, { tableName: 'ad_media', timestamps: true });

const brokenUuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';

async function purge() {
    try {
        await sequelize.authenticate();
        console.log('Connected to Ad DB');

        console.log(`Searching for media with UUID part "${brokenUuid}"...`);

        const brokenMedia = await AdMedia.findAll({
            where: {
                [Op.or]: [
                    { url: { [Op.like]: `%${brokenUuid}%` } },
                    { r2Key: { [Op.like]: `%${brokenUuid}%` } }
                ]
            }
        });

        if (brokenMedia.length === 0) {
            console.log('No AdMedia records found for this UUID.');
        } else {
            console.log(`Found ${brokenMedia.length} broken media records.`);

            const adIds = [...new Set(brokenMedia.map(m => m.adId))];

            console.log(`Associated Ad IDs: ${adIds.join(', ')}`);

            for (const adId of adIds) {
                console.log(`Deleting Ad ID ${adId}...`);
                const count = await Ad.destroy({ where: { id: adId } });
                console.log(`Deleted ${count} Ad record(s).`);

                // Also manually delete media just in case
                const mediaCount = await AdMedia.destroy({ where: { adId } });
                console.log(`Deleted ${mediaCount} AdMedia record(s).`);
            }
            console.log('Purge complete.');
        }

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

purge();
