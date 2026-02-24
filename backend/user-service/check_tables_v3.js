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
        console.log("Tables:");
        r.forEach(t => console.log(`- ${t.table_name}`));

        const [samples] = await seq.query('SELECT * FROM "SearchIndices" WHERE type = \'USER\' LIMIT 1');
        console.log("\nSearchIndex Sample:");
        console.log(JSON.stringify(samples, null, 2));
    } catch (e) {
        // If SearchIndices fails, try SearchIndex
        console.log("SearchIndices failed, trying SearchIndex...");
        try {
            const [samples] = await seq.query('SELECT * FROM "SearchIndex" WHERE type = \'USER\' LIMIT 1');
            console.log("\nSearchIndex Sample:");
            console.log(JSON.stringify(samples, null, 2));
        } catch (e2) {
            console.error(e2);
        }
    } finally {
        await seq.close();
    }
}
check();
