const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const results = {};
        const tables = ['Users', 'UserProfiles', 'Posts', 'Reels', 'follows'];
        for (const table of tables) {
            try {
                const [rows] = await sequelize.query(`SELECT count(*) FROM "${table}"`);
                results[table] = rows[0].count;
            } catch (e) {
                results[table] = 'Error: ' + e.message;
            }
        }
        console.log('Database Counts:', JSON.stringify(results, null, 2));

        const [irfan] = await sequelize.query("SELECT * FROM \"Users\" WHERE username = 'Irfan'");
        console.log('User Irfan:', irfan);

    } catch (e) {
        console.error(e.message);
    } finally {
        await sequelize.close();
    }
}

check();
