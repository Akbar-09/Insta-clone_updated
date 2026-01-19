const { createClient } = require('redis');
const http = require('http');

// Mock data
const mockPost = {
    postId: 'test-post-1',
    userId: 'user-1',
    content: 'Hello World',
    imageUrl: 'http://example.com/image.jpg',
    createdAt: new Date().toISOString()
};

async function verify() {
    console.log('Starting verification...');

    // 1. Connect to Redis
    const client = createClient({
        url: 'redis://localhost:6379'
    });
    client.on('error', (err) => console.log('Redis Client Error', err));

    try {
        await client.connect();
        console.log('Connected to Redis');

        // 2. Seed data
        await client.lPush('global_feed', JSON.stringify(mockPost));
        console.log('Seeded mock post to global_feed');

        // 3. Call API
        const options = {
            hostname: 'localhost',
            port: 5007,
            path: '/?userId=1',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', async () => {
                console.log('API Status Code:', res.statusCode);
                try {
                    const json = JSON.parse(data);
                    console.log('API Response:', JSON.stringify(json, null, 2));

                    // 4. Verification
                    if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
                        const firstPost = json.data[0];
                        if (firstPost.postId === mockPost.postId) {
                            console.log('SUCCESS: API returned the seeded post.');
                        } else {
                            console.log('FAILURE: API returned data but not the seeded post at index 0.');
                            console.log('First item:', firstPost);
                        }
                    } else {
                        console.log('FAILURE: API response format incorrect or empty.');
                    }
                } catch (e) {
                    console.log('FAILURE: Parsing response failed', e);
                    console.log('Raw data:', data);
                }

                await client.disconnect();
                process.exit(0);
            });
        });

        req.on('error', async (error) => {
            console.error('API Request failed:', error);
            await client.disconnect();
            process.exit(1);
        });

        req.end();

    } catch (error) {
        console.error('Verification failed:', error);
        await client.disconnect();
        process.exit(1);
    }
}

verify();
