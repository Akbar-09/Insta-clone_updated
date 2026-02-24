const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function searchR2() {
    try {
        const search = '1771052299797';
        console.log('Searching R2 for key containing:', search);

        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            MaxKeys: 1000
        });
        const response = await r2Client.send(command);

        if (response.Contents) {
            const matches = response.Contents.filter(obj => obj.Key.includes(search));
            if (matches.length > 0) {
                console.log('Matches:');
                matches.forEach(m => console.log(` - ${m.Key}`));
            } else {
                console.log('No matches found in first 1000 objects.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

searchR2();
