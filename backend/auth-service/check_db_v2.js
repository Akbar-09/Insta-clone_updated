const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const tables = ['Users', 'UserProfiles', 'Posts', 'Reels', 'follows'];
        console.log('Database: instagram');
        for (const table of tables) {
            try {
                const [rows] = await sequelize.query(`SELECT count(*) FROM "${table}"`);
                console.log(`${table} count:`, rows[0].count);
            } catch (e) {
                console.log(`${table} error:`, e.message);
            }
        }

        const [users] = await sequelize.query('SELECT id, username FROM "Users" LIMIT 10');
        console.log('Sample Users:', users);

    } catch (e) {
        console.error('Connection Error:', e.message);
    } finally {
        await sequelize.close();
    }
}

check();
