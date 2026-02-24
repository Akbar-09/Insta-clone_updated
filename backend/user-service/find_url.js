// Search ALL tables across all ports for the specific URL
const { Sequelize } = require('sequelize');

const TARGET = '1770360174825-454549326_opt.webp';

async function searchAllTablesOnPort(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        // Get all tables
        const tables = await seq.query(
            `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        console.log(`\n=== Port ${port}: Searching ${tables.length} tables for "${TARGET}" ===`);

        for (const { tablename } of tables) {
            try {
                // Get column names that likely contain URLs
                const cols = await seq.query(
                    `SELECT column_name FROM information_schema.columns 
                     WHERE table_schema='public' AND table_name=$1 
                     AND (column_name ILIKE '%url%' OR column_name ILIKE '%image%' OR column_name ILIKE '%photo%' OR column_name ILIKE '%picture%' OR column_name ILIKE '%video%' OR column_name ILIKE '%media%' OR column_name ILIKE '%avatar%' OR column_name ILIKE '%thumbnail%')`,
                    { bind: [tablename], type: Sequelize.QueryTypes.SELECT }
                );

                for (const { column_name } of cols) {
                    const rows = await seq.query(
                        `SELECT * FROM "${tablename}" WHERE "${column_name}" ILIKE $1 LIMIT 5`,
                        { bind: [`%${TARGET}%`], type: Sequelize.QueryTypes.SELECT }
                    );
                    if (rows.length > 0) {
                        console.log(`  FOUND in ${tablename}.${column_name}:`);
                        rows.forEach(r => {
                            const id = r.id || r.userId || r.postId || r.reelId || '?';
                            console.log(`    Row id=${id}: ${r[column_name]}`);
                        });
                    }
                }
            } catch (e) {
                // Skip table errors silently
            }
        }
        await seq.close();
    } catch (e) {
        console.log(`Port ${port}: ${e.message.substring(0, 80)}`);
        await seq.close().catch(() => { });
    }
}

searchAllTablesOnPort(5432)
    .then(() => searchAllTablesOnPort(5433))
    .then(() => searchAllTablesOnPort(5434))
    .then(() => console.log('\nSearch complete'));
