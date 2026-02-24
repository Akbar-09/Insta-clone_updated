const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function findTable() {
    try {
        const [r] = await seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name ILIKE '%search%'");
        console.log("Search related tables:", r.map(t => t.table_name).join(', '));

        // Let's also check notifications table columns
        const [cols] = await seq.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'notifications'");
        console.log("\nNotification columns:", cols.map(c => c.column_name).join(', '));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
findTable();
