const { Sequelize } = require('sequelize');

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function debug() {
    try {
        await seq.query('INSERT INTO "Media" (url, filename, type, "createdAt", "updatedAt") VALUES (\'test\', \'test\', \'test\', NOW(), NOW())');
    } catch (e) {
        console.error("Column check error:", e.message);
        console.error("Detail:", e.original ? e.original.detail : 'No detail');
    } finally {
        await seq.close();
    }
}
debug();
