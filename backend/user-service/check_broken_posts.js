require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// Load R2 current list
const r2CurrentKeys = new Set(JSON.parse(fs.readFileSync('../media-service/r2_current_list.json', 'utf-8')));

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'postgres', logging: false }
);

async function extractR2Key(mediaUrl) {
    if (!mediaUrl) return null;
    // Handle /api/v1/media/files/Jaadoe/... → Jaadoe/...
    if (mediaUrl.includes('/api/v1/media/files/')) {
        return mediaUrl.split('/api/v1/media/files/')[1];
    }
    // Handle /uploads/filename → try Jaadoe/posts/images/filename etc.
    if (mediaUrl.startsWith('/uploads/')) {
        return null; // can't easily determine subfolder
    }
    return null;
}

async function run() {
    await sequelize.authenticate();
    const [posts] = await sequelize.query(
        `SELECT id, username, "mediaUrl", "mediaType" FROM "Posts" WHERE "mediaUrl" IS NOT NULL ORDER BY id`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    console.log(`\nChecking ${posts.length} posts...\n`);

    const broken = [];
    const working = [];

    for (const post of posts) {
        const key = await extractR2Key(post.mediaUrl);
        if (!key) {
            console.log(`⚠️  [${post.id}] ${post.username}: Unresolvable URL: ${post.mediaUrl}`);
            broken.push({ id: post.id, username: post.username, mediaUrl: post.mediaUrl, reason: 'unresolvable' });
            continue;
        }

        if (r2CurrentKeys.has(key)) {
            working.push({ id: post.id, username: post.username, mediaUrl: post.mediaUrl });
        } else {
            console.log(`❌ [${post.id}] ${post.username}: MISSING from R2: ${key}`);
            broken.push({ id: post.id, username: post.username, mediaUrl: post.mediaUrl, r2Key: key, reason: 'not_in_r2' });
        }
    }

    console.log(`\n✅ Working: ${working.length} posts`);
    console.log(`❌ Broken:  ${broken.length} posts`);

    fs.writeFileSync('broken_posts.json', JSON.stringify(broken, null, 2));
    fs.writeFileSync('working_posts.json', JSON.stringify(working, null, 2));
    console.log('\nSaved broken_posts.json and working_posts.json');

    await sequelize.close();
}

run().catch(console.error);
