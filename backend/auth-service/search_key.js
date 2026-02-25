const { Client } = require('pg');

const NEW_IP = '192.168.1.100';

async function run() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'aspire123',
        port: 5433,
        database: 'instagram'
    });
    try {
        await client.connect();
        const tablesRes = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        for (const tableRow of tablesRes.rows) {
            const tableName = tableRow.table_name;
            const columnsRes = await client.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = $1 
                AND data_type IN ('character varying', 'text')
            `, [tableName]);

            for (const colRow of columnsRes.rows) {
                const colName = colRow.column_name;
                const searchRes = await client.query(`
                    SELECT count(*) FROM "${tableName}" WHERE "${colName}" LIKE '%1771053937764-231248378%'
                `);
                if (parseInt(searchRes.rows[0].count) > 0) {
                    console.log(`Found ${searchRes.rows[0].count} matches in ${tableName}.${colName}`);
                }
            }
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

run();
