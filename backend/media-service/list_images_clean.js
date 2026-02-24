const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function list() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            Prefix: 'Jaadoe/posts/images/',
            MaxKeys: 1000
        });
        const response = await r2Client.send(command);
        if (response.Contents) {
            response.Contents.forEach(obj => {
                const key = obj.Key.replace('Jaadoe/posts/images/', '');
                if (key) console.log(key);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

list();
