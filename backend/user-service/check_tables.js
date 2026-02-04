const sequelize = require('./config/database');

async function check() {
    try {
        const [results] = await sequelize.query(`
            SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
        `);
        console.log('Tables in User Service DB:');
        console.log(results.map(r => r.table_name));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await sequelize.close();
    }
}
check();
