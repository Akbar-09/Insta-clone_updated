const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function findUsers() {
    try {
        const [results] = await sequelize.query("SELECT \"userId\", username FROM \"UserProfiles\" WHERE username IN ('mustafa89', 'akbar')");
        console.log(results);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

findUsers();
