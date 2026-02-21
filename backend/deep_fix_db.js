const { Client } = require('pg');

const OLD_IPS = ['192.168.1.5', '192.168.1.6'];
const NEW_IP = '192.168.1.4';

const DB_CONFIGS = [
    { label: 'Media DB', database: 'media_db' },
    { label: 'Instagram DB', database: 'instagram' }
];

const COMMON_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    password: 'aspire123',
    port: 5432,
};

async function deepUpdate() {
    for (const config of DB_CONFIGS) {
        const client = new Client({ ...COMMON_CONFIG, database: config.database });
        try {
            await client.connect();
            console.log(`\n--- Searching ${config.label} (${config.database}) ---`);

            // Get all tables and their text columns
            const res = await client.query(`
                SELECT table_name, column_name 
                FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND data_type IN ('text', 'character varying', 'jsonb')
            `);

            for (const row of res.rows) {
                const { table_name, column_name } = row;

                for (const oldIp of OLD_IPS) {
                    try {
                        // For regular text columns
                        const updateQuery = `
                            UPDATE "${table_name}" 
                            SET "${column_name}" = REPLACE("${column_name}"::text, '${oldIp}', '${NEW_IP}')::${row.data_type === 'jsonb' ? 'jsonb' : 'text'}
                            WHERE "${column_name}"::text LIKE '%${oldIp}%'
                        `;
                        const updateRes = await client.query(updateQuery);
                        if (updateRes.rowCount > 0) {
                            console.log(`[${table_name}.${column_name}] Updated ${updateRes.rowCount} rows (replaced ${oldIp})`);
                        }
                    } catch (err) {
                        // console.error(`Failed to update ${table_name}.${column_name}:`, err.message);
                    }
                }
            }
        } catch (err) {
            console.error(`Error connecting to ${config.label}:`, err.message);
        } finally {
            await client.end();
        }
    }
}

deepUpdate();
