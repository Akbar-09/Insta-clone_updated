const http = require('http');

const reelData = {
    userId: 1,
    username: 'reeluser',
    caption: 'My First Reel',
    videoUrl: 'http://example.com/video.mp4'
};

function createReel() {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(reelData);

        const options = {
            hostname: 'localhost',
            port: 5005,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    console.log('POST Success:', data);
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`POST Failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(body);
        req.end();
    });
}

function getReels() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5005,
            path: '/',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('GET Success:', data);
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`GET Failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function verify() {
    console.log('Starting verification...');
    try {
        // 1. Create Reel
        console.log('Creating reel...');
        const createdReel = await createReel();

        // 2. Get Reels
        console.log('Retrieving reels...');
        const response = await getReels();

        // 3. Verify
        if (response.status === 'success' && Array.isArray(response.data)) {
            const found = response.data.find(r => r.id === createdReel.data.id);
            if (found) {
                console.log('SUCCESS: Created reel found in retrieval.');
                process.exit(0);
            } else {
                console.log('FAILURE: Created reel NOT found.');
                process.exit(1);
            }
        } else {
            console.log('FAILURE: Invalid response format.');
            process.exit(1);
        }

    } catch (error) {
        console.error('Verification failed:', error.message);
        process.exit(1);
    }
}

verify();
