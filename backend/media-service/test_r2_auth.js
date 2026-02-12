const { r2Client } = require('./config/r2');
const { ListBucketsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

async function run() {
    try {
        const command = new ListBucketsCommand({});
        const res = await r2Client.send(command);
        console.log('Buckets:', res.Buckets.map(b => b.Name));
    } catch (e) {
        console.error('R2 Auth Error:', e.message);
    }
    process.exit();
}
run();
