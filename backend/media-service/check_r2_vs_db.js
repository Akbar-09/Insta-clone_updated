// Script to check what files exist in R2 under Jaadoe/temp/ and compare against DB posts
require('dotenv').config();
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { Sequelize } = require('sequelize');
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

const seq = new Sequelize('instagram', 'postgres', 'aspire123', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
});

async function listR2Folder(prefix) {
    const keys = [];
    let token = undefined;
    do {
        const cmd = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: prefix,
            ContinuationToken: token,
        });
        const res = await r2Client.send(cmd);
        (res.Contents || []).forEach(obj => keys.push(obj.Key));
        token = res.NextContinuationToken;
    } while (token);
    return keys;
}

async function main() {
    let output = '';
    try {
        // List all R2 keys
        const allKeys = await listR2Folder('Jaadoe/');
        output += `\n===== R2 FILES (Jaadoe/) =====\nTotal: ${allKeys.length}\n`;
        allKeys.forEach(k => output += `  ${k}\n`);

        // Get posts with /uploads/ URLs
        const [uploadPosts] = await seq.query(`
            SELECT id, "mediaUrl" FROM "Posts"
            WHERE "mediaUrl" LIKE '/uploads/%'
            ORDER BY id DESC
        `);
        output += `\n===== POSTS WITH /uploads/ URLs (${uploadPosts.length} total) =====\n`;
        uploadPosts.forEach(p => output += `  Post ${p.id}: ${p.mediaUrl}\n`);

        // Get posts with /api/v1/media/files/Jaadoe/temp/ URLs
        const [tempPosts] = await seq.query(`
            SELECT id, "mediaUrl" FROM "Posts"
            WHERE "mediaUrl" LIKE '%/temp/%'
            ORDER BY id DESC
        `);
        output += `\n===== POSTS WITH /temp/ URLs (${tempPosts.length} total) =====\n`;

        // Cross-check which temp posts exist in R2
        const r2Set = new Set(allKeys);
        tempPosts.forEach(p => {
            // Extract key from URL: /api/v1/media/files/Jaadoe/temp/xxx -> Jaadoe/temp/xxx
            const r2Key = p.mediaUrl.replace('/api/v1/media/files/', '').replace(/^\//, '');
            const exists = r2Set.has(r2Key);
            output += `  Post ${p.id}: ${r2Key} => R2:${exists ? 'YES' : 'NO'}\n`;
        });

    } catch (e) {
        output += '\nError: ' + e.message + '\n' + e.stack;
    } finally {
        await seq.close();
        fs.writeFileSync('r2_check_report.txt', output);
        console.log('Written to r2_check_report.txt');
        console.log(output);
    }
}

main();
