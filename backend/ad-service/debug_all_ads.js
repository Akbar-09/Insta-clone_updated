const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ad_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Ad = sequelize.define('Ad', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    adType: DataTypes.STRING
}, { tableName: 'ads', timestamps: true });

const AdMedia = sequelize.define('AdMedia', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: DataTypes.UUID,
    url: DataTypes.STRING,
    r2Key: DataTypes.STRING
}, { tableName: 'ad_media', timestamps: true });

const BoostedContentReference = sequelize.define('BoostedContentReference', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: DataTypes.UUID,
    originalData: DataTypes.JSONB
}, { tableName: 'boosted_content_references', timestamps: true });

Ad.hasMany(AdMedia, { foreignKey: 'adId', as: 'media' });
AdMedia.belongsTo(Ad, { foreignKey: 'adId' });
Ad.hasOne(BoostedContentReference, { foreignKey: 'adId', as: 'boostedContent' });

async function listAll() {
    try {
        await sequelize.authenticate();
        console.log('Connected to Ad DB');

        const ads = await Ad.findAll({
            include: [
                { model: AdMedia, as: 'media' },
                { model: BoostedContentReference, as: 'boostedContent' }
            ]
        });

        console.log(`Found ${ads.length} ads.`);

        ads.forEach(ad => {
            console.log(`--- Ad ${ad.id} (${ad.status}) ---`);
            if (ad.media && ad.media.length > 0) {
                ad.media.forEach(m => {
                    console.log(`Media URL: ${m.url}`);
                    console.log(`Media Key: ${m.r2Key}`);
                });
            }
            if (ad.boostedContent) {
                console.log(`Boosted Content Data: ${JSON.stringify(ad.boostedContent.originalData).substring(0, 100)}...`);
            }
        });

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

listAll();
