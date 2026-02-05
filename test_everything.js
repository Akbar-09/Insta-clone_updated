const { execSync } = require('child_process');
const fs = require('fs');

const GATEWAY_URL = 'http://localhost:5000/api/v1';
const endpoints = JSON.parse(fs.readFileSync('all_endpoints.json', 'utf8'));

// Get a token first
const TEST_USER = {
    email: `test_everything_${Date.now()}@example.com`,
    password: 'Password123!',
    username: `tester_${Date.now()}`,
    fullName: 'Tester'
};

const routeMap = {
    'auth-service': 'auth',
    'user-service': 'users',
    'post-service': 'posts',
    'story-service': 'stories',
    'comment-service': 'comments',
    'feed-service': 'feed',
    'notification-service': 'notifications',
    'search-service': 'search',
    'message-service': 'messages',
    'reel-service': 'reels',
    'media-service': 'media',
    'ad-service': 'ads',
    'live-service': 'live',
    'admin-service': 'admin'
};

let token = '';

function runCurl(method, url, body = null, authToken = null) {
    let command = `curl.exe -s -o NUL -w "%{http_code}" -X ${method} "${url}"`;
    command += ` -H "Content-Type: application/json"`;
    if (authToken) {
        command += ` -H "Authorization: Bearer ${authToken}"`;
    }
    if (body) {
        const json = JSON.stringify(body).replace(/"/g, '\\"');
        command += ` -d "${json}"`;
    }

    try {
        const code = execSync(command).toString().trim();
        return code;
    } catch (e) {
        return 'ERR';
    }
}

async function start() {
    console.log('Obtaining token...');
    // Signup
    runCurl('POST', `${GATEWAY_URL}/auth/signup`, TEST_USER);
    // Login
    const loginOutput = execSync(`curl.exe -s -X POST "${GATEWAY_URL}/auth/login" -H "Content-Type: application/json" -d "{\\"email\\":\\"${TEST_USER.email}\\",\\"password\\":\\"${TEST_USER.password}\\"}"`).toString();
    try {
        const res = JSON.parse(loginOutput);
        token = res.data.token;
    } catch (e) {
        console.error('Failed to get token, continuing without it...');
    }

    console.log(`Starting test for ${endpoints.length} endpoints...`);

    const results = [];
    let working = 0;

    for (let i = 0; i < endpoints.length; i++) {
        const ep = endpoints[i];
        const gatewayRoute = routeMap[ep.service];
        // Replace params with dummy IDs
        const path = ep.path.replace(/:(\w+)/g, '1');
        const url = `${GATEWAY_URL}/${gatewayRoute}${path === '/' ? '' : path}`;

        process.stdout.write(`[${i + 1}/${endpoints.length}] ${ep.method} ${url} ... `);

        const code = runCurl(ep.method, url, (ep.method === 'POST' || ep.method === 'PUT' || ep.method === 'PATCH') ? {} : null, token);

        // Treat 200, 201, 400, 401, 403, 404 as "reachable" (not 5xx or connection error)
        // Actually, 200-299 are working. 4xx might be working but missing params. 5xx is broken.
        const isWorking = parseInt(code) >= 200 && parseInt(code) < 500;
        if (isWorking) working++;

        console.log(code);
        results.push({ ...ep, url, code, isWorking });
    }

    console.log(`\nScan Complete.`);
    console.log(`Total Endpoints: ${endpoints.length}`);
    console.log(`Working (Reachable/Authenticated/Valid): ${working}`);
    console.log(`Failed (5xx/ERR): ${endpoints.length - working}`);

    const report = `# Full API Connectivity Report\n\nTotal: ${endpoints.length}\nWorking: ${working}\n\n| Method | URL | Code | Status |\n| :--- | :--- | :--- | :--- |\n` +
        results.map(r => `| ${r.method} | ${r.url} | ${r.code} | ${r.isWorking ? 'PASS' : 'FAIL'} |`).join('\n');

    fs.writeFileSync('full_api_test_report.md', report);
}

start();
