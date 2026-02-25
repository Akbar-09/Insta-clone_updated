/**
 * fix_all_broken_media.js
 * 
 * Reassigns mediaUrls in all tables (Posts, Reels, Stories, UserProfiles)
 * that reference files no longer in R2.
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

// Available R2 keys
const r2_list_path = path.join(__dirname, 'r2_current_list.json');
if (!fs.existsSync(r2_list_path)) {
    console.error('Missing r2_current_list.json. Run list_r2_now.js first.');
    process.exit(1);
}
const r2CurrentKeys = JSON.parse(fs.readFileSync(r2_list_path, 'utf-8'));
const r2Set = new Set(r2CurrentKeys);

const availableImages = r2CurrentKeys.filter(k => k.includes('/posts/images/') && !k.includes('/temp'));
const availableVideos = r2CurrentKeys.filter(k => k.includes('/posts/videos/') && !k.includes('/temp'));

console.log(`Resources: ${availableImages.length} images, ${availableVideos.length} videos.`);

function toMediaUrl(r2Key) {
    return `/api/v1/media/files/${r2Key}`;
}

function extractR2Key(url) {
    if (!url) return null;
    if (url.includes('/api/v1/media/files/')) return url.split('/api/v1/media/files/')[1];
    return null;
}

const TARGET_TABLES = [
    { name: 'Posts', urlCol: 'mediaUrl', typeCol: 'mediaType' },
    { name: 'Reels', urlCol: 'videoUrl', fixedType: 'VIDEO' },
    { name: 'Stories', urlCol: 'mediaUrl', typeCol: 'mediaType' },
    { name: 'UserProfiles', urlCol: 'profilePicture', fixedType: 'IMAGE' }
];

async function run() {
    await sequelize.authenticate();
    console.log('Database connected.');

    let totalFixed = 0;

    for (const target of TARGET_TABLES) {
        console.log(`\nChecking ${target.name}...`);
        const query = `SELECT id, "${target.urlCol}" ${target.typeCol ? `, "${target.typeCol}"` : ''} FROM "${target.name}" WHERE "${target.urlCol}" IS NOT NULL AND "${target.urlCol}" != ''`;
        const items = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        let fixedInTable = 0;
        let imgIdx = 0;
        let vidIdx = 0;

        for (const item of items) {
            const url = item[target.urlCol];
            const key = extractR2Key(url);

            // If it's an R2 key and it's missing
            if (key && !r2Set.has(key)) {
                const type = target.fixedType || (item[target.typeCol] ? item[target.typeCol].toUpperCase() : 'IMAGE');

                let replacement;
                if (type === 'VIDEO') {
                    replacement = availableVideos[vidIdx % availableVideos.length];
                    vidIdx++;
                } else {
                    replacement = availableImages[imgIdx % availableImages.length];
                    imgIdx++;
                }

                const newUrl = toMediaUrl(replacement);
                console.log(`  [${target.name}] id=${item.id}: ${key} -> ${replacement}`);

                await sequelize.query(
                    `UPDATE "${target.name}" SET "${target.urlCol}" = :newUrl WHERE id = :id`,
                    { replacements: { newUrl, id: item.id } }
                );
                fixedInTable++;
            }
        }
        console.log(`  Done. Fixed ${fixedInTable} records in ${target.name}.`);
        totalFixed += fixedInTable;
    }

    console.log(`\n✅ Total records fixed: ${totalFixed}`);
    await sequelize.close();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
