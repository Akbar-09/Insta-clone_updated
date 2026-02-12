const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

async function run() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            MaxKeys: 1000
        });
        const res = await r2Client.send(command);
        if (res.Contents) {
            const matches = res.Contents.filter(item => item.Key.includes('8863bbab-d6a2-4d56-8efe-0c17859da87d'));
            if (matches.length > 0) {
                console.log('Found matches:');
                matches.forEach(m => console.log(` - ${m.Key}`));
            } else {
                console.log('No objects matching the UUID found in the first 1000 items.');
            }
        } else {
            console.log('Bucket is empty.');
        }
    } catch (e) {
        console.error('List Objects Error:', e.message);
    }
    process.exit();
}
run();
