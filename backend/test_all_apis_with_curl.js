const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const GATEWAY_URL = 'http://localhost:5000';
const SWAGGER_URL = `${GATEWAY_URL}/api-docs`;
const ENDPOINTS_FILE = path.join(__dirname, 'all_endpoints.json');
const REPORT_FILE = path.join(__dirname, 'api_test_report_curl.md');

// Test credentials - you may need to update these
let AUTH_TOKEN = null;
let ADMIN_TOKEN = null;
let TEST_USER_ID = null;

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Statistics
const stats = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    byService: {},
    byMethod: {}
};

// Results storage
const results = [];

// Helper function to execute curl command
function executeCurl(method, url, headers = {}, body = null, timeout = 5000) {
    try {
        let curlCmd = `curl -X ${method} "${url}" -s -w "\\n%{http_code}" --max-time ${timeout / 1000}`;

        // Add headers
        Object.keys(headers).forEach(key => {
            curlCmd += ` -H "${key}: ${headers[key]}"`;
        });

        // Add body for POST, PUT, PATCH
        if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
            const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
            curlCmd += ` -d '${bodyStr.replace(/'/g, "\\'")}'`;
        }

        const output = execSync(curlCmd, { encoding: 'utf8', timeout });
        const lines = output.trim().split('\n');
        const statusCode = parseInt(lines[lines.length - 1]);
        const responseBody = lines.slice(0, -1).join('\n');

        return {
            statusCode,
            body: responseBody,
            success: statusCode >= 200 && statusCode < 500 // Consider 4xx as "working" (just auth/validation issues)
        };
    } catch (error) {
        return {
            statusCode: 0,
            body: error.message,
            success: false,
            error: error.message
        };
    }
}

// Login to get auth tokens
function setupAuthentication() {
    console.log(`${colors.cyan}Setting up authentication...${colors.reset}`);

    // Try to login as regular user, create if doesn't exist
    try {
        let loginResponse = executeCurl(
            'POST',
            `${GATEWAY_URL}/api/v1/auth/login`,
            { 'Content-Type': 'application/json' },
            { email: 'test@example.com', password: 'password123' }
        );

        // If login fails, try to create the user
        if (loginResponse.statusCode !== 200) {
            console.log(`${colors.yellow}  User doesn't exist, creating test user...${colors.reset}`);
            const signupResponse = executeCurl(
                'POST',
                `${GATEWAY_URL}/api/v1/auth/signup`,
                { 'Content-Type': 'application/json' },
                {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                    fullName: 'Test User'
                }
            );

            if (signupResponse.statusCode === 200 || signupResponse.statusCode === 201) {
                console.log(`${colors.green}  ✓ Test user created${colors.reset}`);
                // Try login again
                loginResponse = executeCurl(
                    'POST',
                    `${GATEWAY_URL}/api/v1/auth/login`,
                    { 'Content-Type': 'application/json' },
                    { email: 'test@example.com', password: 'password123' }
                );
            }
        }

        if (loginResponse.statusCode === 200) {
            try {
                const data = JSON.parse(loginResponse.body);
                AUTH_TOKEN = data.token || data.data?.token;
                TEST_USER_ID = data.user?.id || data.data?.user?.id;
                console.log(`${colors.green}✓ User authentication successful${colors.reset}`);
            } catch (e) {
                console.log(`${colors.yellow}⚠ Could not parse login response${colors.reset}`);
            }
        } else {
            console.log(`${colors.yellow}⚠ User login failed (${loginResponse.statusCode}), some tests may fail${colors.reset}`);
        }
    } catch (error) {
        console.log(`${colors.yellow}⚠ User login error: ${error.message}${colors.reset}`);
    }

    // Try to login as admin
    try {
        let adminLoginResponse = executeCurl(
            'POST',
            `${GATEWAY_URL}/api/v1/admin/auth/login`,
            { 'Content-Type': 'application/json' },
            { email: 'admin@example.com', password: 'admin123' }
        );

        if (adminLoginResponse.statusCode === 200) {
            try {
                const data = JSON.parse(adminLoginResponse.body);
                ADMIN_TOKEN = data.token || data.data?.token;
                console.log(`${colors.green}✓ Admin authentication successful${colors.reset}`);
            } catch (e) {
                console.log(`${colors.yellow}⚠ Could not parse admin login response${colors.reset}`);
            }
        } else {
            console.log(`${colors.yellow}⚠ Admin login failed (${adminLoginResponse.statusCode}), admin tests may fail${colors.reset}`);
        }
    } catch (error) {
        console.log(`${colors.yellow}⚠ Admin login error: ${error.message}${colors.reset}`);
    }
}

// Replace path parameters with test values
function replacePath(path, service) {
    const replacements = {
        ':id': 'test-id-123',
        ':userId': TEST_USER_ID || 'test-user-123',
        ':postId': 'test-post-123',
        ':storyId': 'test-story-123',
        ':reelId': 'test-reel-123',
        ':commentId': 'test-comment-123',
        ':conversationId': 'test-conversation-123',
        ':messageId': 'test-message-123',
        ':notificationId': 'test-notification-123',
        ':adId': 'test-ad-123',
        ':topicId': 'test-topic-123',
        ':hashtag': 'test',
        ':username': 'testuser',
        ':streamId': 'test-stream-123'
    };

    let newPath = path;
    Object.keys(replacements).forEach(param => {
        newPath = newPath.replace(param, replacements[param]);
    });

    return newPath;
}

// Determine if endpoint needs authentication
function needsAuth(path, service) {
    const publicPaths = [
        '/api/v1/auth/login',
        '/api/v1/auth/signup',
        '/api/v1/auth/register',
        '/api/v1/admin/auth/login',
        '/health',
        '/api/v1/ads/active',
        '/api/v1/help/categories',
        '/api/v1/help/articles',
        '/api/v1/help/search'
    ];

    return !publicPaths.some(p => path.startsWith(p));
}

// Test a single endpoint
function testEndpoint(endpoint) {
    const { service, method, path, file } = endpoint;

    stats.total++;

    // Initialize service stats
    if (!stats.byService[service]) {
        stats.byService[service] = { total: 0, passed: 0, failed: 0, skipped: 0 };
    }
    stats.byService[service].total++;

    // Initialize method stats
    if (!stats.byMethod[method]) {
        stats.byMethod[method] = { total: 0, passed: 0, failed: 0, skipped: 0 };
    }
    stats.byMethod[method].total++;

    // Replace path parameters
    const testPath = replacePath(path, service);
    const fullUrl = `${GATEWAY_URL}${testPath}`;

    // Determine headers
    const headers = { 'Content-Type': 'application/json' };

    // Add authentication if needed
    const isAdminEndpoint = path.includes('/admin/');
    if (needsAuth(path, service)) {
        const token = isAdminEndpoint ? ADMIN_TOKEN : AUTH_TOKEN;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            // Skip if we don't have required token
            stats.skipped++;
            stats.byService[service].skipped++;
            stats.byMethod[method].skipped++;

            results.push({
                service,
                method,
                path,
                file,
                status: 'SKIPPED',
                statusCode: 0,
                message: `No ${isAdminEndpoint ? 'admin' : 'user'} token available`,
                url: fullUrl
            });

            console.log(`${colors.yellow}⊘ SKIP${colors.reset} ${method.padEnd(6)} ${path} (No auth token)`);
            return;
        }
    }

    // Prepare body for POST/PUT/PATCH
    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        body = { test: true, data: 'test-data' };
    }

    // Execute request
    const response = executeCurl(method, fullUrl, headers, body);

    // Determine result
    const isPassed = response.success;
    const status = isPassed ? 'PASS' : 'FAIL';

    if (isPassed) {
        stats.passed++;
        stats.byService[service].passed++;
        stats.byMethod[method].passed++;
        console.log(`${colors.green}✓ PASS${colors.reset} ${method.padEnd(6)} ${path} (${response.statusCode})`);
    } else {
        stats.failed++;
        stats.byService[service].failed++;
        stats.byMethod[method].failed++;
        console.log(`${colors.red}✗ FAIL${colors.reset} ${method.padEnd(6)} ${path} (${response.statusCode || 'ERROR'})`);
    }

    results.push({
        service,
        method,
        path,
        file,
        status,
        statusCode: response.statusCode,
        message: response.error || (response.body ? response.body.substring(0, 100) : ''),
        url: fullUrl
    });
}

// Generate markdown report
function generateReport() {
    let report = `# API Endpoint Test Report\n\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    report += `**Gateway URL:** ${GATEWAY_URL}\n`;
    report += `**Swagger Documentation:** ${SWAGGER_URL}\n\n`;

    // Overall Statistics
    report += `## Overall Statistics\n\n`;
    report += `| Metric | Count | Percentage |\n`;
    report += `|--------|-------|------------|\n`;
    report += `| **Total Endpoints** | ${stats.total} | 100% |\n`;
    report += `| **Passed** | ${stats.passed} | ${((stats.passed / stats.total) * 100).toFixed(1)}% |\n`;
    report += `| **Failed** | ${stats.failed} | ${((stats.failed / stats.total) * 100).toFixed(1)}% |\n`;
    report += `| **Skipped** | ${stats.skipped} | ${((stats.skipped / stats.total) * 100).toFixed(1)}% |\n\n`;

    // Statistics by Service
    report += `## Statistics by Service\n\n`;
    report += `| Service | Total | Passed | Failed | Skipped | Success Rate |\n`;
    report += `|---------|-------|--------|--------|---------|-------------|\n`;

    Object.keys(stats.byService).sort().forEach(service => {
        const s = stats.byService[service];
        const successRate = s.total > 0 ? ((s.passed / s.total) * 100).toFixed(1) : '0.0';
        report += `| ${service} | ${s.total} | ${s.passed} | ${s.failed} | ${s.skipped} | ${successRate}% |\n`;
    });
    report += `\n`;

    // Statistics by HTTP Method
    report += `## Statistics by HTTP Method\n\n`;
    report += `| Method | Total | Passed | Failed | Skipped | Success Rate |\n`;
    report += `|--------|-------|--------|--------|---------|-------------|\n`;

    Object.keys(stats.byMethod).sort().forEach(method => {
        const m = stats.byMethod[method];
        const successRate = m.total > 0 ? ((m.passed / m.total) * 100).toFixed(1) : '0.0';
        report += `| ${method} | ${m.total} | ${m.passed} | ${m.failed} | ${m.skipped} | ${successRate}% |\n`;
    });
    report += `\n`;

    // Detailed Results by Service
    report += `## Detailed Results by Service\n\n`;

    const serviceGroups = {};
    results.forEach(result => {
        if (!serviceGroups[result.service]) {
            serviceGroups[result.service] = [];
        }
        serviceGroups[result.service].push(result);
    });

    Object.keys(serviceGroups).sort().forEach(service => {
        report += `### ${service}\n\n`;
        report += `| Status | Method | Path | Status Code | Message |\n`;
        report += `|--------|--------|------|-------------|----------|\n`;

        serviceGroups[service].forEach(result => {
            const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⊘';
            const message = result.message.replace(/\|/g, '\\|').substring(0, 50);
            report += `| ${statusIcon} ${result.status} | ${result.method} | ${result.path} | ${result.statusCode} | ${message} |\n`;
        });

        report += `\n`;
    });

    // Failed Endpoints
    const failedEndpoints = results.filter(r => r.status === 'FAIL');
    if (failedEndpoints.length > 0) {
        report += `## Failed Endpoints (${failedEndpoints.length})\n\n`;
        report += `| Service | Method | Path | Status Code | Error |\n`;
        report += `|---------|--------|------|-------------|-------|\n`;

        failedEndpoints.forEach(result => {
            const error = result.message.replace(/\|/g, '\\|').substring(0, 100);
            report += `| ${result.service} | ${result.method} | ${result.path} | ${result.statusCode} | ${error} |\n`;
        });

        report += `\n`;
    }

    // Skipped Endpoints
    const skippedEndpoints = results.filter(r => r.status === 'SKIPPED');
    if (skippedEndpoints.length > 0) {
        report += `## Skipped Endpoints (${skippedEndpoints.length})\n\n`;
        report += `| Service | Method | Path | Reason |\n`;
        report += `|---------|--------|------|--------|\n`;

        skippedEndpoints.forEach(result => {
            report += `| ${result.service} | ${result.method} | ${result.path} | ${result.message} |\n`;
        });

        report += `\n`;
    }

    // Recommendations
    report += `## Recommendations\n\n`;

    if (stats.failed > 0) {
        report += `- **${stats.failed} endpoints failed**: Review the failed endpoints above and check service logs for errors.\n`;
    }

    if (stats.skipped > 0) {
        report += `- **${stats.skipped} endpoints skipped**: Ensure proper authentication tokens are available for testing.\n`;
    }

    if (stats.passed === stats.total) {
        report += `- **All endpoints passed!** 🎉 Your API is working correctly.\n`;
    }

    report += `\n## Swagger Documentation\n\n`;
    report += `For detailed API documentation, visit: [${SWAGGER_URL}](${SWAGGER_URL})\n\n`;
    report += `You can test individual endpoints interactively using the Swagger UI.\n`;

    return report;
}

// Main execution
async function main() {
    console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.cyan}  Instagram Clone API - Comprehensive Endpoint Testing${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

    // Check if gateway is running
    console.log(`${colors.blue}Checking gateway availability...${colors.reset}`);
    const healthCheck = executeCurl('GET', `${GATEWAY_URL}/health`);

    if (!healthCheck.success) {
        console.log(`${colors.red}✗ Gateway is not running at ${GATEWAY_URL}${colors.reset}`);
        console.log(`${colors.yellow}Please start the gateway and try again.${colors.reset}`);
        process.exit(1);
    }

    console.log(`${colors.green}✓ Gateway is running${colors.reset}\n`);

    // Setup authentication
    setupAuthentication();
    console.log('');

    // Load endpoints
    console.log(`${colors.blue}Loading endpoints from ${ENDPOINTS_FILE}...${colors.reset}`);
    const endpoints = JSON.parse(fs.readFileSync(ENDPOINTS_FILE, 'utf8'));
    console.log(`${colors.green}✓ Loaded ${endpoints.length} endpoints${colors.reset}\n`);

    // Test all endpoints
    console.log(`${colors.cyan}Testing endpoints...${colors.reset}\n`);

    endpoints.forEach((endpoint, index) => {
        testEndpoint(endpoint);

        // Add a small delay to avoid overwhelming the server
        if (index % 10 === 0 && index > 0) {
            // Sleep for 100ms
            const start = Date.now();
            while (Date.now() - start < 100) { }
        }
    });

    console.log(`\n${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.cyan}  Test Summary${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);

    console.log(`Total Endpoints:  ${stats.total}`);
    console.log(`${colors.green}Passed:           ${stats.passed} (${((stats.passed / stats.total) * 100).toFixed(1)}%)${colors.reset}`);
    console.log(`${colors.red}Failed:           ${stats.failed} (${((stats.failed / stats.total) * 100).toFixed(1)}%)${colors.reset}`);
    console.log(`${colors.yellow}Skipped:          ${stats.skipped} (${((stats.skipped / stats.total) * 100).toFixed(1)}%)${colors.reset}\n`);

    // Generate report
    console.log(`${colors.blue}Generating report...${colors.reset}`);
    const report = generateReport();
    fs.writeFileSync(REPORT_FILE, report, 'utf8');
    console.log(`${colors.green}✓ Report saved to: ${REPORT_FILE}${colors.reset}\n`);

    console.log(`${colors.cyan}Swagger Documentation: ${SWAGGER_URL}${colors.reset}\n`);

    // Exit with appropriate code
    process.exit(stats.failed > 0 ? 1 : 0);
}

main().catch(error => {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
});
