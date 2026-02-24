// Fix profile pictures stored with /uploads/ paths that no longer exist
// We'll try to find matches in R2; if not, clear the URL
// The frontend already handles empty profilePicture by using ui-avatars.com
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Try to load R2 creds from media-service .env
require('dotenv').config({ path: path.join(__dirname, '../media-service/.env') });

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
    try {
        await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        return true;
    } catch { return false; }
}

// Try both ports for user DB
async function getSeqOnPort(port) {
    const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
        host: 'localhost', port, dialect: 'postgres', logging: false
    });
    try {
        await seq.authenticate();
        return seq;
    } catch {
        await seq.close();
        return null;
    }
}

async function tryFindInR2(basename) {
    const nameNoExt = path.basename(basename, path.extname(basename));
    const ext = path.extname(basename);
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

async function main() {
    let output = '';
    let seq = null;

    // Try port 5433 first (what our install uses), then 5432
    for (const port of [5433, 5432]) {
        seq = await getSeqOnPort(port);
        if (seq) { output += `Connected to DB on port ${port}\n`; break; }
        output += `Could not connect on port ${port}\n`;
    }
    if (!seq) { console.error('Could not connect to user DB'); return; }

    try {
        // Find all profiles with /uploads/ picture URLs
        const [profiles] = await seq.query(`
            SELECT "userId", username, "profilePicture"
            FROM "UserProfiles"
            WHERE "profilePicture" LIKE '/uploads/%'
        `);

        output += `\nFound ${profiles.length} profile pictures with /uploads/ paths:\n`;

        for (const profile of profiles) {
            const basename = path.basename(profile.profilePicture);
            const r2Key = await tryFindInR2(basename);

            if (r2Key) {
                // Found in R2 — update URL
                const newUrl = `${PUBLIC_DOMAIN}/${r2Key}`;
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = :url WHERE "userId" = :uid`,
                    { replacements: { url: newUrl, uid: profile.userId } }
                );
                output += `  ✓ User ${profile.userId} (${profile.username}): Found in R2\n`;
                output += `    ${profile.profilePicture} => ${newUrl}\n`;
            } else {
                // Not in R2 — clear the URL (frontend will use ui-avatars fallback)
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = '' WHERE "userId" = :uid`,
                    { replacements: { uid: profile.userId } }
                );
                output += `  ⚠ User ${profile.userId} (${profile.username}): NOT in R2 — cleared to default avatar\n`;
                output += `    Was: ${profile.profilePicture}\n`;
            }
        }

        // Also check for bare filenames (no path prefix) in profilePicture
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
            output += `\nFound ${bareProfiles.length} profile pictures with other non-standard URLs:\n`;
            for (const profile of bareProfiles) {
                output += `  User ${profile.userId} (${profile.username}): "${profile.profilePicture}"\n`;
                // Clear these too
                await seq.query(
                    `UPDATE "UserProfiles" SET "profilePicture" = '' WHERE "userId" = :uid`,
                    { replacements: { uid: profile.userId } }
                );
                output += `    => Cleared to default avatar\n`;
            }
        } else {
            output += `\nNo other non-standard profile picture URLs found.\n`;
        }

        output += `\n✅ Done! All broken profile picture URLs fixed.\n`;

    } catch (e) {
        output += `\nError: ${e.message}\n${e.stack}\n`;
    } finally {
        await seq.close();
        fs.writeFileSync('fix_profile_report.txt', output);
        console.log(output);
    }
}

main();
