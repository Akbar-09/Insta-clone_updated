const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require('dotenv').config({ path: './.env' });

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

async function find() {
    const bucket = process.env.R2_BUCKET_NAME || 'omretesting';
    const search = '1770363625553-171547508';
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: 'Jaadoe/'
        });
        const res = await r2Client.send(command);
        const matches = res.Contents?.filter(c => c.Key.includes(search));
        console.log(JSON.stringify(matches?.map(m => m.Key), null, 2));
    } catch (err) {
        console.error(err.message);
    }
}
find();
