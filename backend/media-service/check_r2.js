const { r2Client } = require('./config/r2');
const { HeadObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

async function check(key) {
    try {
        const command = new HeadObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });
        const res = await r2Client.send(command);
        console.log(`Key ${key} exists:`, res.ContentLength, 'bytes');
    } catch (e) {
        console.log(`Key ${key} NOT found:`, e.name);
    }
}

const uuid = '8863bbab-d6a2-4d56-8efe-0c17859da87d';
async function run() {
    await check(`Jaadoe/temp/${uuid}.jpg`);
    await check(`Jaadoe/posts/images/temp_${uuid}_opt.webp`);
    process.exit();
}
run();
