const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});
async function check() {
    const [users] = await sequelize.query('SELECT username FROM "Users" WHERE username IN (\'must0\', \'akshaykummar\', \'tanmay\')');
    console.log('REMAINING USERS:', users);
    const [posts] = await sequelize.query('SELECT COUNT(*) FROM "Posts" WHERE "username" IN (\'must0\', \'akshaykummar\', \'tanmay\')');
    console.log('REMAINING POSTS:', posts[0].count);
    await sequelize.close();
}
check();
