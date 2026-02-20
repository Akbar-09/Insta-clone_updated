const { Client } = require('pg');

const OLD_IPS = ['192.168.1.5', '192.168.1.6'];
const NEW_IP = '192.168.1.4';

const COMMON_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    password: 'aspire123',
    port: 5432,
};

async function fixAllDatabases() {
    const mainClient = new Client({ ...COMMON_CONFIG, database: 'postgres' });
    try {
        await mainClient.connect();

        // Get all database names
        const dbRes = await mainClient.query("SELECT datname FROM pg_database WHERE datistemplate = false AND datname != 'postgres'");
        const dbs = dbRes.rows.map(r => r.datname);

        console.log(`Found ${dbs.length} databases: ${dbs.join(', ')}`);

        for (const dbName of dbs) {
            console.log(`\n--- Working on DB: ${dbName} ---`);
            const client = new Client({ ...COMMON_CONFIG, database: dbName });
            try {
                await client.connect();

                // Get all text/json columns in all tables
                const colRes = await client.query(`
                    SELECT table_name, column_name, data_type
                    FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND data_type IN ('text', 'character varying', 'jsonb')
                `);

                for (const row of colRes.rows) {
                    const { table_name, column_name, data_type } = row;

                    for (const oldIp of OLD_IPS) {
                        try {
                            const updateQuery = `
                                UPDATE "${table_name}" 
                                SET "${column_name}" = REPLACE("${column_name}"::text, '${oldIp}', '${NEW_IP}')::${data_type === 'jsonb' ? 'jsonb' : 'text'}
                                WHERE "${column_name}"::text LIKE '%${oldIp}%'
                            `;
                            const updateRes = await client.query(updateQuery);
                            if (updateRes.rowCount > 0) {
                                console.log(`[${table_name}.${column_name}] Updated ${updateRes.rowCount} rows (${oldIp} -> ${NEW_IP})`);
                            }
                        } catch (e) { }
                    }
                }
            } catch (err) {
                console.error(`Could not connect to ${dbName}:`, err.message);
            } finally {
                await client.end();
            }
        }

    } catch (err) {
        console.error("Main error:", err.message);
    } finally {
        await mainClient.end();
    }
}

fixAllDatabases();
