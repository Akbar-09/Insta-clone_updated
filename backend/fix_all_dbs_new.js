const { Client } = require('pg');

const OLD_IPS = ['192.168.1.4', '192.168.1.5', '192.168.1.6'];
const PREFIXES_TO_REMOVE = OLD_IPS.map(ip => `http://${ip}:5175`);

const DB_CONFIGS = [
    { name: 'Instagram DB', database: 'instagram' },
    { name: 'Media DB', database: 'media_db' }
];

const COMMON_CONFIG = {
    user: 'postgres',
    host: 'localhost',
    password: 'aspire123',
    port: 5432,
};

async function fixDB(dbConfig) {
    const client = new Client({ ...COMMON_CONFIG, database: dbConfig.database });
    try {
        await client.connect();
        console.log(`Connected to ${dbConfig.name}`);

        // Get all tables
        const tablesRes = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        for (const tableRow of tablesRes.rows) {
            const tableName = tableRow.table_name;

            // Get all character columns
            const columnsRes = await client.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = $1 
                AND data_type IN ('character varying', 'text')
            `, [tableName]);

            for (const colRow of columnsRes.rows) {
                const colName = colRow.column_name;

                for (const prefix of PREFIXES_TO_REMOVE) {
                    const query = `
                        UPDATE "${tableName}" 
                        SET "${colName}" = REPLACE("${colName}", '${prefix}', '') 
                        WHERE "${colName}" LIKE '${prefix}%'
                    `;
                    const res = await client.query(query);
                    if (res.rowCount > 0) {
                        console.log(`Updated ${res.rowCount} rows in ${tableName}.${colName} (removed prefix ${prefix})`);
                    }
                }

                // Also handle cases where it's just the IP without the port/protocol if they exist
                for (const ip of OLD_IPS) {
                    const query = `
                        UPDATE "${tableName}" 
                        SET "${colName}" = REPLACE("${colName}", '${ip}', '192.168.1.41') 
                        WHERE "${colName}" LIKE '%${ip}%'
                    `;
                    const res = await client.query(query);
                    if (res.rowCount > 0) {
                        console.log(`Updated ${res.rowCount} rows in ${tableName}.${colName} (replaced IP ${ip} -> 192.168.1.41)`);
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Error fixing ${dbConfig.name}:`, err.message);
    } finally {
        await client.end();
    }
}

async function run() {
    for (const config of DB_CONFIGS) {
        await fixDB(config);
    }
}

run();
