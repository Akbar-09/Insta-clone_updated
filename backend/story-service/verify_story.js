const http = require('http');

const storyData = {
    userId: 1,
    username: 'storyuser',
    mediaUrl: 'http://example.com/story.jpg'
};

function createStory() {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(storyData);

        const options = {
            hostname: 'localhost',
            port: 5004,
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

function getStories() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5004,
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
        // 1. Create Story
        console.log('Creating story...');
        const createdStory = await createStory();

        // 2. Get Stories
        console.log('Retrieving stories...');
        const response = await getStories();

        // 3. Verify
        if (response.status === 'success' && Array.isArray(response.data)) {
            const found = response.data.find(s => s.id === createdStory.data.id);
            if (found) {
                console.log('SUCCESS: Created story found in retrieval.');
                process.exit(0);
            } else {
                console.log('FAILURE: Created story NOT found.');
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
