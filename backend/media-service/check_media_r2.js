require('dotenv').config();
const { Sequelize } = require('sequelize');

const mediaDb = new Sequelize('media_db', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

(async () => {
    try {
        await mediaDb.authenticate();
        console.log('Connected to Media DB\n');

        const [results] = await mediaDb.query('SELECT id, filename, url, "thumbnailUrl", "r2Key", "uploadStatus", "processingError" FROM "Media" ORDER BY "createdAt" DESC LIMIT 5');

        console.log('Latest Media Records:');
        results.forEach((m, i) => {
            console.log(`${i + 1}. ID: ${m.id}`);
            console.log(`   Status: ${m.uploadStatus}`);
            console.log(`   URL: ${m.url}`);
            console.log(`   R2 Key: ${m.r2Key}`);
            if (m.processingError) console.log(`   Error: ${m.processingError}`);
            console.log('');
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mediaDb.close();
    }
})();
