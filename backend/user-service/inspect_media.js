const { Sequelize } = require('sequelize');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [cols] = await seq.query("SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'Media'");
        console.log("Media Columns:");
        cols.forEach(c => console.log(`- ${c.column_name} (Nullable: ${c.is_nullable})`));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
