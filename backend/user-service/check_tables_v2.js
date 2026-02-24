const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log("Tables:", r.map(t => t.table_name).join(', '));

        const [samples] = await seq.query('SELECT * FROM "SearchIndices" WHERE type = \'USER\' LIMIT 1');
        console.log("\nSearchIndex Sample:");
        console.log(JSON.stringify(samples, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
