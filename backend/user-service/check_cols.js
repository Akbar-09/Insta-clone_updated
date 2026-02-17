const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [res] = await sequelize.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'UserProfiles'");
        console.log(JSON.stringify(res, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}
check();
