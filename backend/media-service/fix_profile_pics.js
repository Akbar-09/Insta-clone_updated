// Fix profile pictures stored with /uploads/ paths that no longer exist
// Run from media-service directory (has @aws-sdk installed)
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config();

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

async function r2Exists(key) {
    try { await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key })); return true; }
    catch { return false; }
}

async function tryFindInR2(basename) {
    const nameNoExt = path.basename(basename, path.extname(basename));
    const candidates = [
        `${FOLDER_NAME}/profiles/${basename}`,
        `${FOLDER_NAME}/profiles/${nameNoExt}_opt.webp`,
        `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.webp`,
        `${FOLDER_NAME}/temp/${basename}`,
    ];
    for (const key of candidates) {
        if (await r2Exists(key)) return key;
    }
    return null;
}

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

async function main() {
    try {
        await seq.authenticate();
        console.log('Connected to DB on port 5433');

        // Fix /uploads/ profile picture URLs
        const [profiles] = await seq.query(`
            SELECT "userId", username, "profilePicture"
            FROM "UserProfiles"
            WHERE "profilePicture" LIKE '/uploads/%'
        `);

        console.log(`\nFound ${profiles.length} profiles with /uploads/ picture URLs:`);

        for (const p of profiles) {
            const basename = path.basename(p.profilePicture);
            const r2Key = await tryFindInR2(basename);

            if (r2Key) {
                const newUrl = `${PUBLIC_DOMAIN}/${r2Key}`;
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = :url WHERE "userId" = :uid`,
                    { replacements: { url: newUrl, uid: p.userId } }
                );
                console.log(`  ✓ User ${p.userId} (${p.username}): ${p.profilePicture} => ${newUrl}`);
            } else {
                // Not in R2 - clear it so the frontend uses ui-avatars fallback
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = '' WHERE "userId" = :uid`,
                    { replacements: { uid: p.userId } }
                );
                console.log(`  ⚠ User ${p.userId} (${p.username}): NOT in R2 - cleared (was: ${p.profilePicture})`);
            }
        }

        // Also fix any bare filenames (no path prefix)
        const [bareProfiles] = await seq.query(`
            SELECT "userId", username, "profilePicture"
            FROM "UserProfiles"
            WHERE "profilePicture" IS NOT NULL
              AND "profilePicture" != ''
              AND "profilePicture" NOT LIKE 'http%'
              AND "profilePicture" NOT LIKE '/api/%'
              AND "profilePicture" NOT LIKE '/uploads/%'
        `);

        if (bareProfiles.length > 0) {
            console.log(`\nFound ${bareProfiles.length} profiles with non-standard URLs:`);
            for (const p of bareProfiles) {
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = '' WHERE "userId" = :uid`,
                    { replacements: { uid: p.userId } }
                );
                console.log(`  ⚠ User ${p.userId} (${p.username}): cleared "${p.profilePicture}"`);
            }
        } else {
            console.log('\nNo other non-standard profile picture URLs found.');
        }

        console.log('\n✅ Done fixing profile pictures.');
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await seq.close();
    }
}

main();
