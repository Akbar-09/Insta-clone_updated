const { r2Client } = require('./config/r2');
const { HeadBucketCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

async function run() {
    try {
        const command = new HeadBucketCommand({
            Bucket: BUCKET_NAME
        });
        const res = await r2Client.send(command);
        console.log(`Bucket ${BUCKET_NAME} access OK`);
    } catch (e) {
        console.error(`Bucket ${BUCKET_NAME} error:`, e.name, e.message);
    }
    process.exit();
}
run();
