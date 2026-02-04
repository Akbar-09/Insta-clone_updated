const sequelize = require('./config/database');

async function check() {
    try {
        await sequelize.authenticate();
        const [results, metadata] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
        console.log('Tables:', results);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

check();
