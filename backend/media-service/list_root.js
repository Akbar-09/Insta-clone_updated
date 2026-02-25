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

async function listRoot() {
    const bucket = process.env.R2_BUCKET_NAME || 'omretesting';
    try {
        const command = new ListObjectsV2Command({
            Bucket: bucket,
            MaxKeys: 10
        });
        const res = await r2Client.send(command);
        console.log("Root Objects:");
        res.Contents?.forEach(c => console.log(c.Key));
    } catch (err) {
        console.error(err.message);
    }
}
listRoot();
