/**
 * fix_broken_posts.js
 * 
 * Reassigns posts whose mediaUrl references files no longer in R2,
 * cycling through the available working R2 image files.
 * 
 * Run from: backend/media-service/
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

// Available R2 image keys (confirmed to exist)
const r2CurrentKeys = JSON.parse(fs.readFileSync(path.join(__dirname, 'r2_current_list.json'), 'utf-8'));
const availableImages = r2CurrentKeys.filter(k => k.includes('/posts/images/') && !k.includes('/temp'));
const availableVideos = r2CurrentKeys.filter(k => k.includes('/posts/videos/') && !k.includes('/temp'));

console.log(`Available images in R2: ${availableImages.length}`);
console.log(`Available videos in R2: ${availableVideos.length}`);
console.log('Image keys:', availableImages);

// Load broken posts
const brokenPosts = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken_posts.json'), 'utf-8'));
console.log(`\nFixing ${brokenPosts.length} broken posts...\n`);

function toMediaUrl(r2Key) {
    return `/api/v1/media/files/${r2Key}`;
}

async function run() {
    await sequelize.authenticate();

    let imageIdx = 0;
    let fixed = 0;

    for (const post of brokenPosts) {
        // Pick the appropriate replacement based on mediaType
        let replacementKey;
        if (post.mediaType === 'VIDEO') {
            replacementKey = availableVideos[imageIdx % availableVideos.length];
        } else {
            replacementKey = availableImages[imageIdx % availableImages.length];
        }

        const newUrl = toMediaUrl(replacementKey);

        console.log(`Fixing post ${post.id} (${post.username}) → ${replacementKey}`);

        await sequelize.query(
            `UPDATE "Posts" SET "mediaUrl" = :url WHERE id = :id`,
            { replacements: { url: newUrl, id: post.id } }
        );

        imageIdx++;
        fixed++;
    }

    console.log(`\n✅ Fixed ${fixed} posts.`);

    // Also update Media records that reference missing keys
    console.log('\nChecking Media table for broken r2Keys...');
    const [mediaRecords] = await sequelize.query(
        `SELECT id, r2Key, url FROM "Media" WHERE "r2Key" IS NOT NULL`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    const r2Set = new Set(r2CurrentKeys);
    let mediaFixed = 0;
    for (const record of mediaRecords) {
        if (!r2Set.has(record.r2Key)) {
            const replacement = availableImages[mediaFixed % availableImages.length];
            console.log(`  Fixing Media ${record.id}: ${record.r2Key} → ${replacement}`);
            await sequelize.query(
                `UPDATE "Media" SET "r2Key" = :key, url = :url WHERE id = :id`,
                { replacements: { key: replacement, url: toMediaUrl(replacement), id: record.id } }
            );
            mediaFixed++;
        }
    }

    console.log(`\n✅ Fixed ${mediaFixed} Media records.`);
    await sequelize.close();
}

run().catch(console.error);
