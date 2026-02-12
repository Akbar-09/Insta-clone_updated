const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('ad_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Ad = sequelize.define('Ad', { id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true } }, { tableName: 'ads', timestamps: true });

const BoostedContentReference = sequelize.define('BoostedContentReference', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adId: { type: DataTypes.UUID },
    originalData: DataTypes.JSONB
}, { tableName: 'boosted_content_references', timestamps: true });

const brokenUuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';

async function purge() {
    try {
        await sequelize.authenticate();
        console.log('Connected to Ad DB');

        console.log(`Searching Boosted Content for "${brokenUuid}"...`);

        // Check BoostedContentReference JSONB
        // JSONB search with Op.contains or raw query is tricky in Sequelize without model structure
        // Let's just fetch all and filter in JS if the table is small (likely is for dev)

        const boosted = await BoostedContentReference.findAll();
        console.log(`Scanning ${boosted.length} boosted refs...`);

        const matches = boosted.filter(b => {
            const jsonStr = JSON.stringify(b.originalData);
            return jsonStr.includes(brokenUuid);
        });

        if (matches.length > 0) {
            console.log(`Found ${matches.length} matches in BoostedContentReference.`);
            for (const m of matches) {
                console.log(`Deleting Ad ${m.adId} associated with boosted content...`);
                await Ad.destroy({ where: { id: m.adId } });
                await BoostedContentReference.destroy({ where: { id: m.id } });
            }
        } else {
            console.log('No matches in BoostedContentReference.');
        }

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

purge();
