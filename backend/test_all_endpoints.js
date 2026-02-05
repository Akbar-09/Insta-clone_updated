const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GATEWAY_URL = 'http://localhost:5000/api/v1';
const TEST_USER = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'Password123!',
    fullName: 'Test User'
};

const ADMIN_CREDENTIALS = {
    email: 'admin@jaadoe.com',
    password: 'adminpassword123'
};

let userToken = '';
let adminToken = '';
let userId = '';
let postId = '';
let storyId = '';
let conversationId = '';
let mediaUrl = '';

const results = [];

function runCurl(method, path, body = null, token = null, isFormData = false) {
    let command = `curl.exe -s -X ${method} "${GATEWAY_URL}${path}"`;

    if (token) {
        command += ` -H "Authorization: Bearer ${token}"`;
    }

    if (body) {
        if (isFormData) {
            command += ` -H "Content-Type: multipart/form-data"`;
            // Simple handling for form data in this script - usually -F
            for (const key in body) {
                command += ` -F "${key}=${body[key]}"`;
            }
        } else {
            command += ` -H "Content-Type: application/json"`;
            const jsonBody = JSON.stringify(body).replace(/"/g, '\\"');
            command += ` -d "${jsonBody}"`;
        }
    } else {
        command += ` -H "Content-Type: application/json"`;
    }

    try {
        const output = execSync(command).toString();
        let json = {};
        try {
            json = JSON.parse(output);
        } catch (e) {
            // Not JSON
        }
        return { success: true, output, json };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function startTests() {
    console.log('Starting API Testing with curl...');

    // 1. Signup
    console.log('Testing Signup...');
    const signup = runCurl('POST', '/auth/signup', TEST_USER);
    results.push({ name: 'POST /auth/signup', status: signup.success ? 'PASS' : 'FAIL', details: signup.output });

    // 2. Login
    console.log('Testing Login...');
    const login = runCurl('POST', '/auth/login', { email: TEST_USER.email, password: TEST_USER.password });
    if (login.json && login.json.data && login.json.data.token) {
        userToken = login.json.data.token;
        userId = login.json.data.user.id;
        results.push({ name: 'POST /auth/login', status: 'PASS' });
    } else {
        results.push({ name: 'POST /auth/login', status: 'FAIL', details: login.output });
    }

    // 3. Admin Login
    console.log('Testing Admin Login...');
    const adminLogin = runCurl('POST', '/admin/auth/login', ADMIN_CREDENTIALS);
    if (adminLogin.json && adminLogin.json.data && adminLogin.json.data.token) {
        adminToken = adminLogin.json.data.token;
        results.push({ name: 'POST /admin/auth/login', status: 'PASS' });
    } else {
        results.push({ name: 'POST /admin/auth/login', status: 'FAIL', details: adminLogin.output });
    }

    if (!userToken) {
        console.error('User token not obtained. Stopping non-admin tests.');
    } else {
        // Create a dummy image for testing
        fs.writeFileSync('test_image.jpg', 'dummy image content');

        // Test Media Upload
        console.log('Testing Media Upload...');
        const mediaUpload = runCurl('POST', '/media/upload', { file: '@test_image.jpg' }, userToken, true);
        if (mediaUpload.json && mediaUpload.json.data && mediaUpload.json.data.url) {
            mediaUrl = mediaUpload.json.data.url;
            results.push({ name: 'POST /media/upload', status: 'PASS' });
        } else {
            results.push({ name: 'POST /media/upload', status: 'FAIL', details: mediaUpload.output });
        }

        // User Tests
        const userTests = [
            { method: 'GET', path: '/users/profile/me', name: 'GET /users/profile/me' },
            { method: 'GET', path: `/users/${TEST_USER.username}`, name: 'GET /users/{username}' },
            { method: 'POST', path: `/users/${userId}/follow`, name: 'POST /users/{id}/follow' },
            { method: 'GET', path: '/posts', name: 'GET /posts' },
            { method: 'POST', path: '/posts', body: { caption: 'Test Post', mediaUrl: mediaUrl || '/uploads/test.jpg', mediaType: 'IMAGE', username: TEST_USER.username }, name: 'POST /posts' },
            { method: 'GET', path: '/posts/explore', name: 'GET /posts/explore' },
            { method: 'GET', path: '/reels', name: 'GET /reels' },
            { method: 'GET', path: '/stories', name: 'GET /stories' },
            { method: 'GET', path: '/notifications', name: 'GET /notifications' },
            { method: 'GET', path: '/search?q=test', name: 'GET /search' },
            { method: 'GET', path: '/messages/conversations', name: 'GET /messages/conversations' },
        ];

        for (const test of userTests) {
            console.log(`Testing ${test.name}...`);
            const res = runCurl(test.method, test.path, test.body, userToken);

            // Capture some IDs for later tests
            if (test.name === 'GET /posts' && res.json && res.json.data && res.json.data.length > 0) {
                postId = res.json.data[0].id;
            }
            results.push({ name: test.name, status: res.success ? 'PASS' : 'FAIL', details: res.output });
        }

        // Dependent tests
        if (postId) {
            runCurl('POST', `/posts/${postId}/like`, null, userToken);
            results.push({ name: `POST /posts/${postId}/like`, status: 'PASS' });
        }
    }

    if (!adminToken) {
        console.error('Admin token not obtained. Skipping admin tests.');
    } else {
        const adminTests = [
            { method: 'GET', path: '/admin/auth/roles', name: 'GET /admin/auth/roles' },
            { method: 'GET', path: '/admin/dashboard/kpis', name: 'GET /admin/dashboard/kpis' },
            { method: 'GET', path: '/admin/users', name: 'GET /admin/users' },
            { method: 'GET', path: '/admin/reports', name: 'GET /admin/reports' },
            { method: 'GET', path: '/admin/audit', name: 'GET /admin/audit' },
        ];

        for (const test of adminTests) {
            console.log(`Testing ${test.name}...`);
            const res = runCurl(test.method, test.path, null, adminToken);
            results.push({ name: test.name, status: res.success ? 'PASS' : 'FAIL', details: res.output });
        }
    }

    // Cleanup
    if (fs.existsSync('test_image.jpg')) fs.unlinkSync('test_image.jpg');

    // Generate Report
    console.log('\n--- API TEST REPORT ---');
    let report = '# API Test Report\n\n';
    report += `Generated at: ${new Date().toISOString()}\n\n`;
    report += '| Endpoint | Status | Details |\n| :--- | :--- | :--- |\n';

    results.forEach(r => {
        let details = r.details ? r.details.substring(0, 100).replace(/\n/g, ' ') + '...' : 'N/A';
        console.log(`${r.status === 'PASS' ? '✅' : '❌'} ${r.name}`);
        report += `| ${r.name} | ${r.status} | ${details} |\n`;
    });

    fs.writeFileSync('api_test_report.md', report);
    console.log('\nReport saved to api_test_report.md');
}

startTests();
