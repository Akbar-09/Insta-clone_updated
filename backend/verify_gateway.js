const http = require('http');

// Config
const GATEWAY_PORT = 8000;
const GATEWAY_HOST = 'localhost';
const BASE_URL = '/api/v1';

// Helpers
const request = (method, path, data = null, token = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: GATEWAY_HOST,
            port: GATEWAY_PORT,
            path: BASE_URL + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        if (data) {
            const body = JSON.stringify(data);
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: responseBody ? JSON.parse(responseBody) : {},
                    raw: responseBody
                });
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTests = async () => {
    console.log('====================================');
    console.log('API GATEWAY VERIFICATION SUITE');
    console.log('====================================\n');

    let authToken = '';
    const testUsername = `gate_user_${Date.now()}`;

    // TEST 1: AUTHENTICATION
    console.log('TEST #1: Login & Token Extraction');
    try {
        // Register first (since it's a new user)
        await request('POST', '/auth/signup', {
            username: testUsername,
            email: `${testUsername}@test.com`,
            password: 'password123'
        });

        const loginRes = await request('POST', '/auth/login', {
            email: `${testUsername}@test.com`,
            password: 'password123'
        });

        if (loginRes.statusCode === 200 && loginRes.body.data && loginRes.body.data.token) {
            authToken = loginRes.body.data.token;
            console.log('✅ Login Successful. Token obtained.');
        } else {
            console.error('❌ Login Failed:', loginRes.statusCode, loginRes.body);
            process.exit(1);
        }
    } catch (e) {
        console.error('❌ Auth Request Failed:', e.message);
        process.exit(1);
    }

    // TEST 2: PROTECTED ROUTE (User Profile)
    console.log('\nTEST #2: Authenticated Route (/users/me)');
    try {
        const meRes = await request('GET', '/auth/me', null, authToken);
        if (meRes.statusCode === 200 && meRes.body.data && meRes.body.data.username === testUsername) {
            console.log('✅ Gateway verified token & forwarded to Auth Service.');
        } else {
            console.error('❌ Failed to route /auth/me:', meRes.statusCode, meRes.body);
        }
    } catch (e) {
        console.error('❌ Request Failed:', e.message);
    }

    // TEST 3: UNAUTHORIZED ACCESS
    console.log('\nTEST #3: Unauthorized Access Block');
    try {
        const failRes = await request('GET', '/auth/me'); // No token
        if (failRes.statusCode === 401) {
            console.log('✅ Gateway blocked request without token (401).');
        } else {
            console.error('❌ Gateway DID NOT block request:', failRes.statusCode);
        }
    } catch (e) {
        console.error('❌ Request Failed:', e.message);
    }

    // TEST 4: INVALID TOKEN
    console.log('\nTEST #4: Invalid Token Handling');
    try {
        const invalidRes = await request('GET', '/auth/me', null, 'invalid.token.here');
        if (invalidRes.statusCode === 403) {
            console.log('✅ Gateway rejected invalid token (403).');
        } else {
            console.error('❌ Gateway DID NOT reject invalid token:', invalidRes.statusCode);
        }
    } catch (e) {
        console.error('❌ Request Failed:', e.message);
    }

    // TEST 5: SERVICE FORWARDING (Feed)
    console.log('\nTEST #5: Feed Service Forwarding');
    try {
        const feedRes = await request('GET', '/feed', null, authToken);
        if (feedRes.statusCode === 200) {
            console.log('✅ Gateway forwarded to Feed Service.');
        } else {
            // Feed might be empty but should return 200
            console.error('❌ Feed Service Forwarding Failed:', feedRes.statusCode, feedRes.body);
        }
    } catch (e) {
        console.error('❌ Request Failed:', e.message);
    }

    console.log('\n====================================');
    console.log('VERIFICATION COMPLETE');
    console.log('====================================');
};

runTests();
