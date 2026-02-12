const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('ad_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const AdMedia = sequelize.define('AdMedia', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: DataTypes.UUID,
    url: DataTypes.STRING,
    r2Key: DataTypes.STRING
}, { tableName: 'ad_media', timestamps: true });

async function dump() {
    try {
        await sequelize.authenticate();
        const media = await AdMedia.findAll();
        const lines = media.map(m => `ID: ${m.id} | AdID: ${m.adId} | URL: ${m.url} | Key: ${m.r2Key}`);
        fs.writeFileSync('media_dump.txt', lines.join('\n'));
        console.log(`Dumped ${lines.length} records to media_dump.txt`);
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

dump();
