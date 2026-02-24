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
            const terms = ['1771052', '1771051', '1770029'];
            response.Contents.forEach(obj => {
                const key = obj.Key.replace('Jaadoe/posts/images/', '');
                terms.forEach(term => {
                    if (key.includes(term)) {
                        console.log(`MATCH [${term}]: ${key}`);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

list();
