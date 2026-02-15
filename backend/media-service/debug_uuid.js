const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('media_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const Media = sequelize.define('Media', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    filename: { type: DataTypes.STRING },
    r2Key: { type: DataTypes.STRING },
    tempKey: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    type: { type: DataTypes.ENUM('image', 'video') },
    uploadStatus: { type: DataTypes.STRING }
}, {
    tableName: 'Media', // Explicitly set table name if needed
    timestamps: true
});

const uuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';

async function check() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');

        console.log(`Searching for "${uuid}" in Media...`);

        const records = await Media.findAll({
            where: {
                [Op.or]: [
                    { id: uuid },
                    { filename: { [Op.like]: `%${uuid}%` } },
                    { r2Key: { [Op.like]: `%${uuid}%` } },
                    { url: { [Op.like]: `%${uuid}%` } }
                ]
            }
        });

        if (records.length === 0) {
            console.log('No records found for that UUID.');
        } else {
            records.forEach(r => {
                console.log('--- FOUND RECORD ---');
                console.log(JSON.stringify(r.toJSON(), null, 2));
            });
        }

    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

check();
