const { r2Client } = require('./config/r2');
const { HeadObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function check() {
    const keys = [
        'Jaadoe/posts/images/1771052299797-234362486_opt.webp',
        'Jaadoe/posts/images/1771052025087-575112275_opt.webp',
        'Jaadoe/posts/images/1770029385415-866841386.jpg',
        'Jaadoe/posts/images/1771051184435-231777391_opt.webp',
    ];

    for (const key of keys) {
        try {
            await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
            console.log(`FOUND: ${key}`);
        } catch (e) {
            console.log(`NOT FOUND: ${key}`);
        }
    }
    process.exit();
}

check();
