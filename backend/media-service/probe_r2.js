const { r2Client } = require('./config/r2');
const { HeadObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function check() {
    const keys = [
        'Jaadoe/posts/images/1771052299797-234362486_opt.webp',
        'Omre/Image/Originals/1771052299797-234362486_opt.webp',
        'Omre/Image/Originals/1771052299797-234362486.jpg',
        'Jaadoe/temp/1771052299797-234362486_opt.webp',
        'Jaadoe/temp/1771052299797-234362486.jpg',
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
