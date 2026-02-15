const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('ad_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const BoostedContentReference = sequelize.define('BoostedContentReference', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: DataTypes.UUID,
    originalData: DataTypes.JSONB
}, { tableName: 'boosted_content_references', timestamps: true });

async function dump() {
    try {
        await sequelize.authenticate();
        const boosted = await BoostedContentReference.findAll();
        const lines = boosted.map(b => `ID: ${b.id} | AdID: ${b.adId} | Data: ${JSON.stringify(b.originalData)}`);
        fs.writeFileSync('boost_dump.txt', lines.join('\n'));
        console.log(`Dumped ${lines.length} boosted records to boost_dump.txt`);
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

dump();
