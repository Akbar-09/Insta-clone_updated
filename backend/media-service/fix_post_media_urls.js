// Fix Posts with stale /api/v1/media/files/Jaadoe/temp/ URLs
// These files were processed and moved to posts/images or posts/videos in R2
// but the Posts table still holds the old temp path.
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'omretesting';
const FOLDER_NAME = 'Jaadoe';
const PUBLIC_DOMAIN = '/api/v1/media/files';

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function r2Exists(key) {
    try {
        await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        return true;
    } catch (e) {
        return false;
    }
}

async function findCorrectR2Key(basename, mediaType) {
    const nameNoExt = path.basename(basename, path.extname(basename));
    const ext = path.extname(basename);

    // Candidates based on processed file naming convention
    const candidates = [];

    if (mediaType === 'VIDEO') {
        candidates.push(
            `${FOLDER_NAME}/posts/videos/${nameNoExt}_opt.mp4`,
            `${FOLDER_NAME}/posts/videos/${basename}`,
        );
    } else {
        // Image (jpg, png, avif, webp)
        candidates.push(
            `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.webp`,
            `${FOLDER_NAME}/posts/images/${basename}`,
            `${FOLDER_NAME}/profiles/${nameNoExt}_opt.webp`,
        );
    }

    for (const key of candidates) {
        if (await r2Exists(key)) {
            return key;
        }
    }
    return null;
}

async function main() {
    let fixed = 0, notFound = 0, skipped = 0;

    try {
        // Fix /api/v1/media/files/Jaadoe/temp/ URLs
        const [tempPosts] = await seq.query(`
            SELECT id, "mediaUrl", "mediaType" FROM "Posts"
            WHERE "mediaUrl" LIKE '%/temp/%'
        `);

        console.log(`\nFixing ${tempPosts.length} posts with /temp/ URLs...`);

        for (const post of tempPosts) {
            const basename = path.basename(post.mediaUrl); // e.g. 1771562239481-211424583.jpg
            const mediaType = post.mediaType || 'IMAGE';
            const correctKey = await findCorrectR2Key(basename, mediaType);

            if (correctKey) {
                const newUrl = `${PUBLIC_DOMAIN}/${correctKey}`;
                await seq.query(`UPDATE "Posts" SET "mediaUrl" = :url WHERE id = :id`, {
                    replacements: { url: newUrl, id: post.id }
                });
                console.log(`  ✓ Post ${post.id}: ${post.mediaUrl} => ${newUrl}`);
                fixed++;
            } else {
                console.log(`  ✗ Post ${post.id}: No R2 match found for ${basename} [${mediaType}]`);
                notFound++;
            }
        }

        // Fix /uploads/ URLs — these files are gone. Point to processed R2 if available
        const [uploadPosts] = await seq.query(`
            SELECT id, "mediaUrl", "mediaType" FROM "Posts"
            WHERE "mediaUrl" LIKE '/uploads/%'
        `);

        console.log(`\nFixing ${uploadPosts.length} posts with /uploads/ URLs...`);

        for (const post of uploadPosts) {
            const basename = path.basename(post.mediaUrl); // e.g. 1771052299797-234362486_opt.webp
            const mediaType = post.mediaType || 'IMAGE';

            // Strip _opt suffix to get original name
            const nameNoExt = path.basename(basename, path.extname(basename)).replace(/_opt$/, '');
            const ext = path.extname(basename);

            // Try with basename as-is first, then without _opt
            const candidates = [];
            if (mediaType === 'VIDEO') {
                candidates.push(
                    `${FOLDER_NAME}/posts/videos/${basename}`,
                    `${FOLDER_NAME}/posts/videos/${nameNoExt}${ext}`,
                    `${FOLDER_NAME}/posts/videos/${nameNoExt}_opt.mp4`,
                );
            } else {
                candidates.push(
                    `${FOLDER_NAME}/posts/images/${basename}`,
                    `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.webp`,
                    `${FOLDER_NAME}/posts/images/${nameNoExt}${ext}`,
                    `${FOLDER_NAME}/profiles/${nameNoExt}_opt.webp`,
                );
            }

            let correctKey = null;
            for (const key of candidates) {
                if (await r2Exists(key)) {
                    correctKey = key;
                    break;
                }
            }

            if (correctKey) {
                const newUrl = `${PUBLIC_DOMAIN}/${correctKey}`;
                await seq.query(`UPDATE "Posts" SET "mediaUrl" = :url WHERE id = :id`, {
                    replacements: { url: newUrl, id: post.id }
                });
                console.log(`  ✓ Post ${post.id}: ${post.mediaUrl} => ${newUrl}`);
                fixed++;
            } else {
                console.log(`  ✗ Post ${post.id}: No R2 match for ${basename} [${mediaType}] - skipping`);
                skipped++;
            }
        }

    } catch (e) {
        console.error('Error:', e.message, e.stack);
    } finally {
        await seq.close();
        console.log(`\n===== DONE =====`);
        console.log(`Fixed: ${fixed}, Not Found in R2: ${notFound}, Skipped/No Match: ${skipped}`);
    }
}

main();
