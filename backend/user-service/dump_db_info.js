const { Sequelize } = require('sequelize');
const fs = require('fs');
const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});
async function check() {
    try {
        const [r] = await seq.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        let output = "Tables:\n" + r.map(t => t.table_name).join('\n');

        try {
            const [samples] = await seq.query('SELECT * FROM "SearchIndices" WHERE type = \'USER\' LIMIT 1');
            output += "\n\nSearchIndices Sample:\n" + JSON.stringify(samples, null, 2);
        } catch (e) {
            output += "\n\nSearchIndices table NOT FOUND.";
        }

        fs.writeFileSync('db_info.txt', output);
        console.log('Saved to db_info.txt');
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
