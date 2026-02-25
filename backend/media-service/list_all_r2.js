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

async function listAll() {
    const bucket = process.env.R2_BUCKET_NAME || 'omretesting';
    try {
        let isTruncated = true;
        let nextContinuationToken;
        let count = 0;
        console.log("Listing ALL objects in bucket (first 100):");

        while (isTruncated && count < 100) {
            const command = new ListObjectsV2Command({
                Bucket: bucket,
                ContinuationToken: nextContinuationToken
            });
            const res = await r2Client.send(command);
            res.Contents?.forEach(c => {
                console.log(c.Key);
                count++;
            });
            isTruncated = res.IsTruncated;
            nextContinuationToken = res.NextContinuationToken;
        }
    } catch (err) {
        console.error(err.message);
    }
}
listAll();
