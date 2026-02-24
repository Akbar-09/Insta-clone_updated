const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(
    'instagram',
    'postgres',
    'aspire123',
    {
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        logging: false
    }
);

const Media = sequelize.define('Media', {
    id: { type: DataTypes.UUID, primaryKey: true },
    filename: DataTypes.STRING,
    url: DataTypes.STRING,
    r2Key: DataTypes.STRING,
    tempKey: DataTypes.STRING,
    uploadStatus: DataTypes.STRING
}, { tableName: 'Media', timestamps: true });

async function check() {
    try {
        const filenames = ['1770988032210-76741009_opt.webp', '1770294236761-75129711_opt.webp'];
        for (const fname of filenames) {
            console.log(`\nChecking for ${fname}:`);
            const media = await Media.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { filename: fname },
                        { url: { [Sequelize.Op.like]: `%${fname}%` } },
                        { r2Key: { [Sequelize.Op.like]: `%${fname}%` } }
                    ]
                }
            });
            if (media) {
                console.log(JSON.stringify(media.toJSON(), null, 2));
            } else {
                console.log('Not found in Media table.');
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}

check();
