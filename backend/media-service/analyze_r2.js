const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function list() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
            MaxKeys: 1000
        });
        const response = await r2Client.send(command);

        const folders = new Set();
        if (response.Contents) {
            response.Contents.forEach(obj => {
                const parts = obj.Key.split('/');
                if (parts.length > 1) {
                    folders.add(parts.slice(0, -1).join('/'));
                }
            });
            console.log('Folders found in R2:');
            Array.from(folders).sort().forEach(f => console.log(` - ${f}`));

            const search = '1771052299797-234362486';
            const matches = response.Contents.filter(obj => obj.Key.includes(search));
            if (matches.length > 0) {
                console.log('\nMatches for search:');
                matches.forEach(m => console.log(` - ${m.Key}`));
            } else {
                console.log('\nNo matches found for:', search);
            }
        }
    } catch (error) {
        console.error('List Error:', error);
    } finally {
        process.exit();
    }
}

list();
