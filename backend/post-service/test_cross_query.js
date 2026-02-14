const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');

async function testQuery() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const [results, metadata] = await sequelize.query('SELECT * FROM "Reels" LIMIT 1');
        console.log('Reels table query success. Count:', results.length);
        if (results.length > 0) {
            console.log('Sample Reel:', JSON.stringify(results[0], null, 2));
        }
    } catch (error) {
        console.error('Error querying Reels table:', error);
    } finally {
        await sequelize.close();
    }
}

testQuery();
