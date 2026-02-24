const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function check() {
    try {
        const [users] = await seq.query('SELECT "userId", username, "profilePicture" FROM "UserProfiles" WHERE username = \'tanmay\'');
        console.log(JSON.stringify(users, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await seq.close();
    }
}
check();
