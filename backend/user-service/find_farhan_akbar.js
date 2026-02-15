const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

async function findUsers() {
    try {
        const [results] = await sequelize.query("SELECT \"userId\", username FROM \"UserProfiles\" WHERE username IN ('farhan', 'akbar')");
        console.log(JSON.stringify(results, null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

findUsers();
