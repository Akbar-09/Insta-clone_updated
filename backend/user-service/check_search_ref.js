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
        const [r] = await seq.query('SELECT type, "referenceId", content FROM "SearchIndices" WHERE type = \'USER\' LIMIT 10');
        console.log("SearchIndex User Samples:");
        console.log(JSON.stringify(r, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await seq.close();
    }
}
check();
