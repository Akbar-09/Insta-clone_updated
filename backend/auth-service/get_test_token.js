const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

async function generateTestToken() {
    try {
        const [results] = await sequelize.query('SELECT id, username, email FROM "Users" LIMIT 1');
        if (results.length === 0) {
            console.log('No users found in database');
            return;
        }
        const user = results[0];
        const token = jwt.sign({ id: user.id, username: user.username }, 'supersecretkey', { expiresIn: '1h' });
        console.log(`USER_ID=${user.id}`);
        console.log(`USERNAME=${user.username}`);
        console.log(`TOKEN=${token}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

generateTestToken();
