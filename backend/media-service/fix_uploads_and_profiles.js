// Fix posts whose /uploads/ files are truly missing — hide them instead of showing broken images
// Also check profile pictures across databases
const { Sequelize } = require('sequelize');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

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
    host: 'localhost', port: 5433, dialect: 'postgres', logging: false
});

async function r2Exists(key) {
    try {
        await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        return true;
    } catch (e) { return false; }
}

async function main() {
    let output = '';
    try {
        // Get all /uploads/ posts
        const [uploadPosts] = await seq.query(`
            SELECT id, "mediaUrl", "mediaType" FROM "Posts"
            WHERE "mediaUrl" LIKE '/uploads/%'
        `);

        output += `\nProcessing ${uploadPosts.length} /uploads/ posts...\n`;

        let fixedByR2 = 0, hidden = 0;

        for (const post of uploadPosts) {
            const basename = path.basename(post.mediaUrl); // e.g. 1771052299797-234362486_opt.webp
            const nameNoExt = path.basename(basename, path.extname(basename)).replace(/_opt$/, '');
            const ext = path.extname(basename);
            const isVideo = post.mediaType === 'VIDEO';

            const candidates = isVideo ? [
                `${FOLDER_NAME}/posts/videos/${basename}`,
                `${FOLDER_NAME}/posts/videos/${nameNoExt}_opt.mp4`,
                `${FOLDER_NAME}/posts/videos/${nameNoExt}.mp4`,
            ] : [
                `${FOLDER_NAME}/posts/images/${basename}`,
                `${FOLDER_NAME}/posts/images/${nameNoExt}_opt.webp`,
                `${FOLDER_NAME}/posts/images/${nameNoExt}${ext}`,
                `${FOLDER_NAME}/profiles/${nameNoExt}_opt.webp`,
            ];

            let found = null;
            for (const key of candidates) {
                if (await r2Exists(key)) { found = key; break; }
            }

            if (found) {
                const newUrl = `${PUBLIC_DOMAIN}/${found}`;
                await seq.query(`UPDATE "Posts" SET "mediaUrl" = :url WHERE id = :id`, {
                    replacements: { url: newUrl, id: post.id }
                });
                output += `  ✓ Fixed Post ${post.id}: ${post.mediaUrl} => ${newUrl}\n`;
                fixedByR2++;
            } else {
                // Hide the post — the media is truly gone
                await seq.query(`UPDATE "Posts" SET "isHidden" = true WHERE id = :id`, {
                    replacements: { id: post.id }
                });
                output += `  ⚠ Hid Post ${post.id}: ${post.mediaUrl} (file not found in R2)\n`;
                hidden++;
            }
        }

        output += `\n===== SUMMARY =====\n`;
        output += `Fixed by R2 match: ${fixedByR2}\n`;
        output += `Hidden (media gone): ${hidden}\n`;

        // Also check user profile picture bare filenames
        output += `\n===== Checking UserProfiles for bad URLs =====\n`;
        const [profiles] = await seq.query(`
            SELECT "userId", username, "profilePicture" FROM "UserProfiles"
            WHERE "profilePicture" IS NOT NULL AND "profilePicture" != ''
            AND "profilePicture" NOT LIKE 'http%'
            AND "profilePicture" NOT LIKE '/api/%'
            AND "profilePicture" NOT LIKE '/uploads/%'
            LIMIT 20
        `);
        if (profiles.length === 0) {
            output += `All profile picture URLs look OK.\n`;
        } else {
            profiles.forEach(p => output += `User ${p.userId} (${p.username}): "${p.profilePicture}"\n`);
        }

        // Check /uploads/ profile pictures
        const [uploadProfiles] = await seq.query(`
            SELECT "userId", username, "profilePicture" FROM "UserProfiles"
            WHERE "profilePicture" LIKE '/uploads/%'
            LIMIT 20
        `);
        if (uploadProfiles.length > 0) {
            output += `\nProfile pictures with /uploads/ URL (${uploadProfiles.length} found):\n`;
            uploadProfiles.forEach(p => output += `  User ${p.userId} (${p.username}): "${p.profilePicture}"\n`);
        }

    } catch (e) {
        output += `\nError: ${e.message}\n${e.stack}\n`;
    } finally {
        await seq.close();
        fs.writeFileSync('cleanup_report.txt', output);
        console.log(output);
    }
}

main();
