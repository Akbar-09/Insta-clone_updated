const http = require('http');
// const amqp = require('amqplib');
// const WebSocket = require('ws'); // Need to use a package or simple client? Let's use simple http for now, WS testing might be complex here.
// Actually, strict WS testing via node script needs 'ws' package. 
// Assuming installed or we will skip WS connection check in this script and rely on logs?
// The prompt asks for "Show sample WebSocket event payload". 
// Let's rely on log inspection for the detailed event flows as per prompt instructions, 
// but this script will TRIGGER all the actions.

const SERVICES = {
    AUTH: 5001,
    USER: 5002,
    POST: 5003,
    STORY: 5004, // Not used in this test
    REEL: 5005,  // Not used
    COMMENT: 5006,
    FEED: 5007,
    NOTIFICATION: 5008,
    SEARCH: 5009,
    MESSAGE: 5010,
    SOCKET: 5011
};

const IDS = {
    userId: null,
    token: null,
    postId: null,
};

// Helper for HTTP Requests
const request = (port, path, method, data = null, token = null) => {
    return new Promise((resolve, reject) => {
        const body = data ? JSON.stringify(data) : null;
        const options = {
            hostname: 'localhost',
            port,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...(body && { 'Content-Length': Buffer.byteLength(body) })
            }
        };
        const req = http.request(options, (res) => {
            let respData = '';
            res.on('data', c => respData += c);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(respData);
                    resolve({ statusCode: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, data: respData });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
};

async function runTests() {
    console.log('==============================');
    console.log('INTER-SERVICE VERIFICATION');
    console.log('==============================');

    try {
        // TEST #1 — USER CREATED EVENT
        console.log('\nTEST #1: USER CREATED EVENT');
        const uniqueUser = `user_${Date.now()}`;
        const signupRes = await request(SERVICES.AUTH, '/signup', 'POST', {
            username: uniqueUser,
            email: `${uniqueUser}@test.com`,
            password: 'password123'
        });
        console.log('Signup Status:', signupRes.statusCode);
        if (signupRes.statusCode === 201) {
            IDS.userId = signupRes.data.data.user.id;
            IDS.token = signupRes.data.data.token;
            console.log('User Created with ID:', IDS.userId);

            // Wait for event propagation
            await new Promise(r => setTimeout(r, 2000));

            // Validate User Service creation
            const userRes = await request(SERVICES.USER, `/users/${IDS.userId}`, 'GET');
            console.log('User Service Profile Check:', userRes.statusCode === 200 ? 'SUCCESS' : 'FAILURE');
        } else {
            console.error('Signup Failed', signupRes.data);
            return;
        }

        // TEST #2 — FOLLOW USER EVENT
        console.log('\nTEST #2: FOLLOW USER EVENT');
        // Follow self or another mocked ID? Let's follow ID 1 (mock).
        const followRes = await request(SERVICES.USER, `/users/1/follow`, 'POST', { currentUserId: IDS.userId });
        console.log('Follow Status:', followRes.statusCode); // Should be 200
        // Expected: Notification Service logs "User 1 followed by <IDS.userId>"

        // TEST #3 — POST CREATED EVENT
        console.log('\nTEST #3: POST CREATED EVENT');
        const postRes = await request(SERVICES.POST, '/buttons', 'POST', { // /buttons?? Wait, route is /
            userId: IDS.userId,
            username: uniqueUser,
            caption: 'Inter-service test post',
            mediaUrl: 'http://img.com/1.jpg',
            mediaType: 'IMAGE'
        });
        // Route is actually POST / (index) for post-service based on previous view_file of route definitions
        // wait, postRoutes.js mounted at / in index.js.
        // Let's retry with correct path '/'

        const postResCorrect = await request(SERVICES.POST, '/', 'POST', {
            userId: IDS.userId,
            username: uniqueUser,
            caption: 'Inter-service test post',
            mediaUrl: 'http://img.com/1.jpg',
            mediaType: 'IMAGE'
        });

        console.log('Create Post Status:', postResCorrect.statusCode);
        if (postResCorrect.statusCode === 201) {
            IDS.postId = postResCorrect.data.data.id;
            console.log('Post Created ID:', IDS.postId);

            // Wait for propagation
            await new Promise(r => setTimeout(r, 2000));

            // Feed service check
            const feedRes = await request(SERVICES.FEED, `/?userId=${IDS.userId}`, 'GET');
            console.log('Feed Check Status:', feedRes.statusCode);
            // We just check if it responds 200, logic verification via logs.
        }

        // TEST #4 — COMMENT ADDED EVENT
        console.log('\nTEST #4: COMMENT ADDED EVENT');
        const commentRes = await request(SERVICES.COMMENT, '/', 'POST', {
            postId: IDS.postId,
            userId: IDS.userId,
            username: uniqueUser,
            text: 'Test comment'
        });
        console.log('Comment Status:', commentRes.statusCode);

        // TEST #5 — LIKE POST EVENT
        console.log('\nTEST #5: LIKE POST EVENT');
        const likeRes = await request(SERVICES.POST, `/${IDS.postId}/like`, 'POST', {
            userId: IDS.userId
        });
        console.log('Like Status:', likeRes.statusCode);

        // TEST #6 — MESSAGE SENT EVENT
        console.log('\nTEST #6: MESSAGE SENT EVENT');
        const msgRes = await request(SERVICES.MESSAGE, '/', 'POST', {
            senderId: IDS.userId,
            recipientId: 1, // Mock recipient
            text: 'Hello World'
        });
        console.log('Message Send Status:', msgRes.statusCode);

        console.log('\nVerification Triggered. Please inspect logs for event confirmations.');

    } catch (e) {
        console.error('Test Error:', e);
    }
}

runTests();
