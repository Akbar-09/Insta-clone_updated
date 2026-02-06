const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const SERVICE_URL = 'http://localhost:5013';

const createTestVideo = (outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input('color=c=red:s=640x480:d=3')
            .inputFormat('lavfi')
            .outputOptions('-c:v libx264')
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
};

const pollStatus = async (mediaId) => {
    let attempts = 0;
    while (attempts < 20) { // 20 seconds max
        try {
            const res = await axios.get(`${SERVICE_URL}/status/${mediaId}`);
            const data = res.data.data;
            process.stdout.write(`.`);

            if (data.uploadStatus === 'completed') {
                console.log('\nSUCCESS! Completed.');
                console.log(`URL: ${data.url}`);
                console.log(`Type: ${data.mimeType}`);
                console.log(`Size: ${data.size}`);
                if (data.thumbnailUrl) console.log(`Thumbnail: ${data.thumbnailUrl}`);
                return;
            } else if (data.uploadStatus === 'failed') {
                console.log('\nFAILED! ' + data.processingError);
                return;
            }
        } catch (e) {
            console.log('Error checking status');
        }
        await new Promise(r => setTimeout(r, 1000));
        attempts++;
    }
    console.log('\nTimeout.');
};

const runTest = async () => {
    try {
        console.log('--- IMAGE TEST ---');
        const testImagePath = path.join(__dirname, 'test_img.png');
        await sharp({
            create: { width: 100, height: 100, channels: 3, background: { r: 255, g: 0, b: 0 } }
        }).png().toFile(testImagePath);

        const formImg = new FormData();
        formImg.append('file', fs.createReadStream(testImagePath));
        formImg.append('context', 'story');

        const resImg = await axios.post(`${SERVICE_URL}/upload`, formImg, { headers: formImg.getHeaders() });
        console.log(`Uploaded Image ID: ${resImg.data.data.id}`);
        await pollStatus(resImg.data.data.id);

        console.log('\n--- VIDEO TEST ---');
        const testVideoPath = path.join(__dirname, 'test_vid.mp4');
        await createTestVideo(testVideoPath);
        console.log('Test video generated.');

        const formVid = new FormData();
        formVid.append('file', fs.createReadStream(testVideoPath));
        formVid.append('context', 'reel');

        const resVid = await axios.post(`${SERVICE_URL}/upload`, formVid, { headers: formVid.getHeaders() });
        console.log(`Uploaded Video ID: ${resVid.data.data.id}`);
        await pollStatus(resVid.data.data.id);

    } catch (err) {
        console.error('Test Failed:', err.message);
        if (err.response) console.log(err.response.data);
    }
};

runTest();
