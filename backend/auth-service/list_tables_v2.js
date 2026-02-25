const { Sequelize } = require('sequelize');
const s = new Sequelize({
    database: 'instagram',
    username: 'postgres',
    password: 'aspire123',
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function run() {
    try {
        const [results] = await s.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables:', results.map(t => t.table_name));
    } catch (e) {
        console.error(e.message);
    } finally {
        await s.close();
    }
}

run();
