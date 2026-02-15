const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const GATEWAY_URL = 'http://localhost:5000';
const ENDPOINTS = require('./all_endpoints.json');

// --- Configuration ---
const TEST_USER = {
    username: `test_user_${Date.now()}`,
    email: `test_user_${Date.now()}@example.com`,
    password: 'Password123!',
    fullName: 'Test API User'
};

const ADMIN_CREDENTIALS = {
    email: 'admin@jaadoe.com',
    password: 'adminpassword123'
};

// --- State ---
const STATE = {
    tokens: {
        user: null,
        admin: null
    },
    ids: {
        userId: 'temp_user_id',
        adminId: 'temp_admin_id',
        postId: 'temp_post_id',
        commentId: 'temp_comment_id',
        storyId: 'temp_story_id',
        reelId: 'temp_reel_id',
        adId: 'temp_ad_id',
        conversationId: 'temp_conv_id',
        messageId: 'temp_msg_id',
        notificationId: 'temp_notif_id',
        tagId: 'temp_tag_id'
    }
};

function generateBody(endpoint) {
    // Heuristic based on parameter guesses from scan or common names
    const body = {};
    const hints = endpoint.body || []; // From our scanner

    // Check if hints is iterable
    if (Array.isArray(hints) && hints.length > 0) {
        hints.forEach(field => {
            if (field.toLowerCase().includes('email')) body[field] = `test_${Date.now()}@example.com`;
            else if (field.toLowerCase().includes('password')) body[field] = 'Password123!';
            else if (field.toLowerCase().includes('id')) body[field] = 'temp_id';
            else if (field.toLowerCase().includes('url')) body[field] = 'https://example.com/image.jpg';
            else body[field] = 'test_value';
        });
    } else {
        // Fallbacks based on path keywords
        const p = endpoint.path.toLowerCase();
        if (p.includes('login') || p.includes('signup')) {
            body.email = 'test@example.com';
            body.password = 'pass';
            body.username = 'user';
            body.fullName = 'Test User';
        } else if (p.includes('comment')) {
            body.content = 'This is a test comment';
        } else if (p.includes('post')) {
            body.caption = 'Test Post';
            body.mediaUrl = 'https://example.com/img.jpg';
            body.mediaType = 'IMAGE';
        } else if (p.includes('report')) {
            body.reason = 'SPAM';
            body.description = 'Test report';
        } else if (p.includes('message')) {
            body.content = 'Hello message';
            body.receiverId = STATE.ids.userId;
        } else if (p.includes('ad')) {
            body.title = 'Test Ad';
            body.budget = 100;
            body.duration = 5;
        }
    }

    // Ensure not empty if no hints
    if (Object.keys(body).length === 0) {
        body.dummy_field = 'test';
    }

    return body;
}

// --- Helper Functions ---
function runCurl(method, urlPath, body = null, token = null) {
    let fullUrl = `${GATEWAY_URL}${urlPath}`;

    // Replace variables in URL
    for (const [key, value] of Object.entries(STATE.ids)) {
        // Replace :key (e.g., :userId) with value
        fullUrl = fullUrl.replace(new RegExp(`:${key}`, 'g'), value);
        // Also simple {key} just in case
        fullUrl = fullUrl.replace(new RegExp(`{${key}}`, 'g'), value);

        // Specific Generic IDs replacement
        // :id is ambiguous, we try to guess based on service/path
        if (fullUrl.includes(':id')) {
            if (fullUrl.includes('/posts/')) fullUrl = fullUrl.replace(':id', STATE.ids.postId);
            else if (fullUrl.includes('/users/')) fullUrl = fullUrl.replace(':id', STATE.ids.userId);
            else if (fullUrl.includes('/comments/')) fullUrl = fullUrl.replace(':id', STATE.ids.commentId);
            else if (fullUrl.includes('/stories/')) fullUrl = fullUrl.replace(':id', STATE.ids.storyId);
            else if (fullUrl.includes('/reels/')) fullUrl = fullUrl.replace(':id', STATE.ids.reelId);
            else if (fullUrl.includes('/ads/')) fullUrl = fullUrl.replace(':id', STATE.ids.adId);
            else if (fullUrl.includes('/admin/')) fullUrl = fullUrl.replace(':id', STATE.ids.userId);
            else fullUrl = fullUrl.replace(':id', 'dummy_id');
        }
    }

    // Default headers
    let cmd = `curl -s -X ${method} "${fullUrl}" -H "Content-Type: application/json"`;
    if (token) {
        cmd += ` -H "Authorization: Bearer ${token}"`;
    }

    // Body
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        // Escape quotes
        const json = JSON.stringify(body).replace(/"/g, '\\"');
        cmd += ` -d "${json}"`;
    }

    try {
        // Using a generous timeout
        const output = execSync(cmd, { stdio: 'pipe', timeout: 5000 }).toString();
        // Try parse JSON
        let json = null;
        try {
            json = JSON.parse(output);
        } catch (e) { }

        return { success: true, command: cmd, output, json, status: 200 };
    } catch (e) {
        return { success: false, command: cmd, output: e.message, status: 500 };
    }
}

async function start() {
    console.log('--- Starting API Tests & Postman Generation ---');
    console.log(`Target: ${GATEWAY_URL}`);

    // 1. Authenticate (Bootstrap)
    console.log('\n[Bootstrap] Authenticating...');

    // Signup
    try {
        let res = runCurl('POST', '/api/v1/auth/signup', TEST_USER);
        if (res.json && res.json.data && res.json.data.token) {
            STATE.tokens.user = res.json.data.token;
            STATE.ids.userId = res.json.data.user.id;
            console.log('User Signup: SUCCESS');
        } else {
            // Try Login
            res = runCurl('POST', '/api/v1/auth/login', { email: TEST_USER.email, password: TEST_USER.password });
            if (res.json && res.json.data && res.json.data.token) {
                STATE.tokens.user = res.json.data.token;
                STATE.ids.userId = res.json.data.user.id;
                console.log('User Login: SUCCESS');
            } else {
                console.error('User Auth FAILED', res.output);
            }
        }
    } catch (e) { console.error("Auth Error", e); }

    // Admin Login
    try {
        res = runCurl('POST', '/api/v1/admin/auth/login', ADMIN_CREDENTIALS);
        if (res.json && res.json.data && res.json.data.token) {
            STATE.tokens.admin = res.json.data.token;
            STATE.ids.adminId = res.json.data.user.id;
            console.log('Admin Login: SUCCESS');
        } else {
            console.error('Admin Login FAILED', res.output);
        }
    } catch (e) { console.error("Admin Auth Error", e); }

    // 2. Create Basic Resources (Bootstrap)
    if (STATE.tokens.user) {
        console.log('\n[Bootstrap] Creating Resources...');

        try {
            // Post
            res = runCurl('POST', '/api/v1/posts', {
                caption: 'Bootstrap Post',
                mediaUrl: 'https://via.placeholder.com/150',
                mediaType: 'IMAGE',
                location: 'Test City',
                allowComments: true
            }, STATE.tokens.user);
            if (res.json && res.json.data) {
                STATE.ids.postId = res.json.data.id;
                console.log(`Created Post: ${STATE.ids.postId}`);
            }

            // Comment
            if (STATE.ids.postId !== 'temp_post_id') {
                res = runCurl('POST', `/api/v1/posts/${STATE.ids.postId}/comments`, {
                    content: 'Nice post!'
                }, STATE.tokens.user);
                if (res.json && res.json.data) {
                    STATE.ids.commentId = res.json.data.id;
                    console.log(`Created Comment: ${STATE.ids.commentId}`);
                }
            }

            // Story
            res = runCurl('POST', '/api/v1/stories', {
                mediaUrl: 'https://via.placeholder.com/150',
                type: 'IMAGE'
            }, STATE.tokens.user);
            if (res.json && res.json.data) {
                STATE.ids.storyId = res.json.data.id;
                console.log(`Created Story: ${STATE.ids.storyId}`);
            }

            // Reel
            res = runCurl('POST', '/api/v1/reels', {
                caption: 'Bootstrap Reel',
                videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
                thumbnailUrl: 'https://via.placeholder.com/150',
                duration: 15
            }, STATE.tokens.user);
            if (res.json && res.json.data) {
                STATE.ids.reelId = res.json.data.id;
                console.log(`Created Reel: ${STATE.ids.reelId}`);
            }
        } catch (e) { console.error('Bootstrap Resource Creation Error', e); }
    }

    // 3. Run All Tests
    console.log('\n[Test Execution] Running through all endpoints...');
    const results = [];

    // Postman Collection Structure
    const postmanCollection = {
        info: {
            name: "Instagram Clone API",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: []
    };

    // Group items by service
    const serviceGroups = {};

    for (const endpoint of ENDPOINTS) {
        try {
            // Determine Token
            let token = STATE.tokens.user;
            if (endpoint.service === 'admin-service' || endpoint.path.includes('/admin/')) {
                token = STATE.tokens.admin;
            }
            if (endpoint.path.includes('/auth/login') || endpoint.path.includes('/auth/signup') || endpoint.path === '/api/v1/health') {
                token = null;
            }

            // Determine Body
            let body = null;
            if (endpoint.method === 'POST' || endpoint.method === 'PUT' || endpoint.method === 'PATCH') {
                body = generateBody(endpoint);
            }

            // Execute
            console.log(`Testing ${endpoint.method} ${endpoint.path}`);
            const result = runCurl(endpoint.method, endpoint.path, body, token);

            // Check success logic (rudimentary)
            // If result.json exists and doesn't have status: 'error' or 'fail'
            let isPass = false;
            if (result.json) {
                if (result.json.status !== 'error' && result.json.status !== 'fail' && !result.json.message?.includes('Internal Server Error')) {
                    isPass = true;
                }
            } else if (result.output && result.output.length === 0 && (endpoint.method === 'DELETE' || result.status === 204)) {
                // Empty output is often success for 204
                isPass = true;
            }

            results.push({
                endpoint: `${endpoint.method} ${endpoint.path}`,
                service: endpoint.service,
                status: isPass ? 'PASS' : 'FAIL',
                details: result.output ? result.output.substring(0, 200) : 'No output'
            });

            // Add to Postman
            if (!serviceGroups[endpoint.service]) {
                serviceGroups[endpoint.service] = {
                    name: endpoint.service,
                    item: []
                };
            }

            // Construct Postman Request
            serviceGroups[endpoint.service].item.push({
                name: `${endpoint.method} ${endpoint.originalPath}`,
                request: {
                    method: endpoint.method,
                    header: [
                        { key: "Content-Type", value: "application/json" },
                        { key: "Authorization", value: "Bearer {{token}}" }
                    ],
                    url: {
                        raw: `{{baseUrl}}${endpoint.path}`,
                        host: ["{{baseUrl}}"],
                        path: endpoint.path.split('/').filter(p => p)
                    },
                    body: body ? {
                        mode: "raw",
                        raw: JSON.stringify(body, null, 2)
                    } : undefined
                }
            });
        } catch (e) {
            console.error(`Error testing ${endpoint.method} ${endpoint.path}:`, e.message);
            results.push({
                endpoint: `${endpoint.method} ${endpoint.path}`,
                service: endpoint.service,
                status: 'FAIL',
                details: `Script Error: ${e.message}`
            });
        }
    }

    // Assemble Postman Collection
    for (const group of Object.values(serviceGroups)) {
        postmanCollection.item.push(group);
    }

    // Save Postman Collection
    fs.writeFileSync('Instagram_API_Collection.json', JSON.stringify(postmanCollection, null, 2));

    // Summary
    const passed = results.filter(r => r.status === 'PASS').length;
    const total = results.length;

    console.log(`\nTests Completed: ${passed}/${total} Passed`);

    // Save Report
    let reportMd = `# API Test Report\nGenerated: ${new Date().toISOString()}\n\n`;
    reportMd += `**Total Endpoints:** ${total}\n**Working:** ${passed}\n**Failing:** ${total - passed}\n\n`;
    reportMd += `| Service | Method | Endpoint | Status | Output Snippet |\n|---|---|---|---|---|\n`;

    results.forEach(r => {
        reportMd += `| ${r.service} | ${r.endpoint.split(' ')[0]} | ${r.endpoint.split(' ')[1]} | ${r.status} | \`${r.details.replace(/\n/g, ' ').replace(/\|/g, '\\|')}\` |\n`;
    });

    fs.writeFileSync('final_api_report.md', reportMd);
    console.log('Report saved to final_api_report.md');
    console.log('Postman Collection saved to Instagram_API_Collection.json');
}

start();
