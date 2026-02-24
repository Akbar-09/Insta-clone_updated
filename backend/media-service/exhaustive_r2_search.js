const { r2Client } = require('./config/r2');
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';

async function searchR2() {
    try {
        const searchTerms = [
            '1771052299797',
            '1771052025087',
            '1770029385415',
            '1771051184435'
        ];
        console.log('Searching R2 for keys containing terms...');

        let token = null;
        let count = 0;
        let matchCount = 0;

        do {
            const command = new ListObjectsV2Command({
                Bucket: BUCKET_NAME,
                MaxKeys: 1000,
                ContinuationToken: token
            });
            const response = await r2Client.send(command);

            if (response.Contents) {
                response.Contents.forEach(obj => {
                    count++;
                    searchTerms.forEach(term => {
                        if (obj.Key.includes(term)) {
                            console.log(`MATCH [${term}]: ${obj.Key}`);
                            matchCount++;
                        }
                    });
                });
            }
            token = response.NextContinuationToken;
        } while (token);

        console.log(`\nSearch complete. Scanned ${count} objects. Found ${matchCount} matches.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

searchR2();
