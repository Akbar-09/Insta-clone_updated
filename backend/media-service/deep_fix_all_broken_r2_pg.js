/**
 * deep_fix_all_broken_r2_pg.js
 * 
 * Exhaustively searching all tables and all columns for any string that looks like 
 * a broken R2 URL (/api/v1/media/files/Jaadoe/...) and fixing it using pg client.
 */
require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5433,
};

const r2_list_path = path.join(__dirname, 'r2_current_list.json');
const r2CurrentKeys = JSON.parse(fs.readFileSync(r2_list_path, 'utf-8'));
const r2Set = new Set(r2CurrentKeys);

const availableImages = r2CurrentKeys.filter(k => k.includes('/posts/images/') && !k.includes('/temp'));
const availableVideos = r2CurrentKeys.filter(k => k.includes('/posts/videos/') && !k.includes('/temp'));

function toMediaUrl(r2Key) {
    return `/api/v1/media/files/${r2Key}`;
}

async function run() {
    const client = new Client(dbConfig);
    await client.connect();
    console.log('Database connected.');

    // 1. Get all tables
    const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const tables = tablesRes.rows.map(r => r.table_name);

    let totalFixed = 0;
    let imgIdx = 0;
    let vidIdx = 0;

    for (const tableName of tables) {
        // 2. Get all text/varchar columns
        const colsRes = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = $1 AND data_type IN ('character varying', 'text')
        `, [tableName]);

        const columns = colsRes.rows.map(r => r.column_name);
        if (columns.length === 0) continue;

        // Check if table has an 'id' column
        const pkRes = await client.query(`
            SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND column_name = 'id'
        `, [tableName]);
        const hasId = pkRes.rows.length > 0;
        if (!hasId) continue;

        for (const colName of columns) {
            // 3. Find rows with R2 URLs
            const rowsRes = await client.query(`
                SELECT id, "${colName}" FROM "${tableName}" WHERE "${colName}" LIKE '%/api/v1/media/files/Jaadoe/%'
            `);

            for (const row of rowsRes.rows) {
                const value = row[colName];
                if (!value) continue;

                const regex = /\/api\/v1\/media\/files\/(Jaadoe\/[^\s"']+)/g;
                let match;
                let newValue = value;
                let changed = false;

                while ((match = regex.exec(value)) !== null) {
                    const key = match[1];
                    if (!r2Set.has(key)) {
                        const extension = path.extname(key).toLowerCase();
                        const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(extension);

                        let replacement;
                        if (isVideo) {
                            replacement = availableVideos[vidIdx % availableVideos.length];
                            vidIdx++;
                        } else {
                            replacement = availableImages[imgIdx % availableImages.length];
                            imgIdx++;
                        }

                        const newUrl = toMediaUrl(replacement);
                        console.log(`  [${tableName}.${colName}] id=${row.id}: ${key} -> ${replacement}`);
                        newValue = newValue.replace(`/api/v1/media/files/${key}`, newUrl);
                        changed = true;
                    }
                }

                if (changed) {
                    await client.query(`UPDATE "${tableName}" SET "${colName}" = $1 WHERE id = $2`, [newValue, row.id]);
                    totalFixed++;
                }
            }
        }
    }

    console.log(`\n✅ Deep fix complete. Total fields updated: ${totalFixed}`);
    await client.end();
}

run().catch(console.error);
