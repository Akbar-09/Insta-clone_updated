const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const [results] = await sequelize.query('SELECT "userId", count(*) FROM "Posts" GROUP BY "userId"');
        console.log('Post counts per user:');
        console.log(results);

        const [users] = await sequelize.query('SELECT "id", "username" FROM "Posts" LIMIT 10');
        console.log('Sample posts data:');
        console.log(users);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

check();
