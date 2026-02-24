const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function searchR2() {
    try {
        const pre = '1771052';
        console.log('Searching R2 for keys containing:', pre);

        let token = null;
        let count = 0;

        do {
            const command = new ListObjectsV2Command({
                Bucket: BUCKET_NAME,
                MaxKeys: 1000,
                ContinuationToken: token
            });
            const response = await r2Client.send(command);

            if (response.Contents) {
                response.Contents.forEach(obj => {
                    if (obj.Key.includes(pre)) {
                        console.log(`FOUND: ${obj.Key}`);
                    }
                    count++;
                });
            }
            token = response.NextContinuationToken;
        } while (token);

        console.log(`Scan complete. Checked ${count} objects.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

searchR2();
