const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'omretesting';

async function search() {
    try {
        const queries = ['1770988032210', '1770294236761'];
        console.log(`Searching for ${queries.join(', ')} in R2...`);

        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME
        });

        const response = await r2Client.send(command);
        if (response.Contents) {
            queries.forEach(query => {
                const matches = response.Contents.filter(obj => obj.Key.includes(query));
                if (matches.length > 0) {
                    console.log(`Found ${matches.length} matches for ${query}:`);
                    matches.forEach(m => console.log(` - ${m.Key}`));
                } else {
                    console.log(`No matches for ${query}.`);
                }
            });
        } else {
            console.log('Bucket is empty.');
        }
    } catch (error) {
        console.error('Search Error:', error);
    } finally {
        process.exit();
    }
}

search();
