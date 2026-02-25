/**
 * deep_fix_all_broken_r2.js
 * 
 * Exhaustively searching all tables and all columns for any string that looks like 
 * a broken R2 URL (/api/v1/media/files/Jaadoe/...) and fixing it.
 */
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'postgres', logging: false }
);

const r2_list_path = path.join(__dirname, 'r2_current_list.json');
const r2CurrentKeys = JSON.parse(fs.readFileSync(r2_list_path, 'utf-8'));
const r2Set = new Set(r2CurrentKeys);

const availableImages = r2CurrentKeys.filter(k => k.includes('/posts/images/') && !k.includes('/temp'));
const availableVideos = r2CurrentKeys.filter(k => k.includes('/posts/videos/') && !k.includes('/temp'));

function toMediaUrl(r2Key) {
    return `/api/v1/media/files/${r2Key}`;
}

async function run() {
    await sequelize.authenticate();

    // Get all tables
    const [tables] = await sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");

    let totalFixed = 0;
    let imgIdx = 0;
    let vidIdx = 0;

    for (const { table_name: tableName } of tables) {
        // Get all string columns
        const [columns] = await sequelize.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = :tableName AND data_type IN ('character varying', 'text')
        `, { replacements: { tableName } });

        for (const { column_name: colName } of columns) {
            // Find rows where this column contains an R2 URL
            const [rows] = await sequelize.query(`
                SELECT id, "${colName}" FROM "${tableName}" WHERE "${colName}" LIKE '%/api/v1/media/files/Jaadoe/%'
            `);

            for (const row of rows) {
                const value = row[colName];
                // Extract keys. Note: there might be multiple or it might be a JSON-like string if we are unlucky (though we filtered for text/varchar)
                const regex = /\/api\/v1\/media\/files\/(Jaadoe\/[^\s"']+)/g;
                let match;
                let newValue = value;
                let changed = false;

                while ((match = regex.exec(value)) !== null) {
                    const key = match[1];
                    if (!r2Set.has(key)) {
                        // Guess type based on extension
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
                    await sequelize.query(`UPDATE "${tableName}" SET "${colName}" = :newValue WHERE id = :id`, {
                        replacements: { newValue, id: row.id }
                    });
                    totalFixed++;
                }
            }
        }
    }

    console.log(`\n✅ Deep fix complete. Total fields updated: ${totalFixed}`);
    await sequelize.close();
}

run().catch(console.error);
