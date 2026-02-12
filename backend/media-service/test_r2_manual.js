const axios = require('axios');
const fs = require('fs');
const path = require('path');

const SERVICE_URL = 'http://localhost:5013';

async function testR2Flow() {
    try {
        // 1. Get Presigned URL
        console.log('1. Fetching presigned URL...');
        const presignRes = await axios.post(`${SERVICE_URL}/media/presigned-url`, {
            filename: 'test_manual.jpg',
            fileType: 'image/jpeg',
            context: 'feed'
        });
        const { uploadUrl, key, publicUrl } = presignRes.data.data;
        console.log('Got URL, Key:', key);

        // 2. Upload to R2 (Simulate browser PUT)
        console.log('2. Uploading to R2...');
        const fileContent = fs.readFileSync(path.join(__dirname, 'test_img.png')); // Use existing test img
        await axios.put(uploadUrl, fileContent, {
            headers: { 'Content-Type': 'image/jpeg' }
        });
        console.log('Upload OK');

        // 3. Finalize
        console.log('3. Finalizing...');
        const finalizeRes = await axios.post(`${SERVICE_URL}/finalize`, {
            key,
            filename: 'test_manual.jpg',
            fileType: 'image/jpeg',
            size: fileContent.length,
            context: 'feed'
        });
        console.log('Finalize Response:', JSON.stringify(finalizeRes.data, null, 2));

        const mediaId = finalizeRes.data.data.id;
        console.log('Media ID:', mediaId);

        // 4. Check Status
        console.log('4. Waiting for processing...');
        for (let i = 0; i < 10; i++) {
            const statusRes = await axios.get(`${SERVICE_URL}/status/${mediaId}`);
            console.log(`Status: ${statusRes.data.data.uploadStatus}`);
            if (statusRes.data.data.uploadStatus === 'completed') {
                console.log('Success! Optimized URL:', statusRes.data.data.url);
                break;
            }
            await new Promise(r => setTimeout(r, 2000));
        }

    } catch (e) {
        console.error('Test Failed:', e.message);
        if (e.response) console.log(JSON.stringify(e.response.data, null, 2));
    }
}

testR2Flow();
