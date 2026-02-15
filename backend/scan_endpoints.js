const fs = require('fs');
const path = require('path');

const SERVICES_MAP = {
    'auth-service': '/api/v1/auth',
    'user-service': '/api/v1/users',
    'post-service': '/api/v1/posts',
    'story-service': '/api/v1/stories',
    'comment-service': '/api/v1/comments',
    'feed-service': '/api/v1/feed',
    'notification-service': '/api/v1/notifications',
    'search-service': '/api/v1/search',
    'message-service': '/api/v1/messages',
    'reel-service': '/api/v1/reels',
    'media-service': '/api/v1/media',
    'ad-service': '/api/v1/ads',
    'insight-service': '/api/v1/insights',
    'live-service': '/api/v1/live',
    'admin-service': '/api/v1/admin',
    'help-service': '/api/v1/help'
};

const BACKEND_DIR = process.cwd();

function scanRoutes() {
    let allEndpoints = [];

    for (const [serviceName, apiPrefix] of Object.entries(SERVICES_MAP)) {
        const serviceDir = path.join(BACKEND_DIR, serviceName);
        if (!fs.existsSync(serviceDir)) {
            console.log(`Skipping ${serviceName} (not found)`);
            continue;
        }

        let routesDir = path.join(serviceDir, 'routes');
        if (!fs.existsSync(routesDir)) {
            // Try src/routes
            const srcRoutes = path.join(serviceDir, 'src', 'routes');
            if (fs.existsSync(srcRoutes)) {
                routesDir = srcRoutes;
            } else {
                console.log(`Skipping ${serviceName} (no routes dir found)`);
                continue;
            }
        }

        try {
            const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
            for (const file of routeFiles) {
                const content = fs.readFileSync(path.join(routesDir, file), 'utf8');

                // 1. Standard Router: router.get(...)
                let regex = /router\.(get|post|put|delete|patch)\s*\(\s*['"]([^'"]*)['"]/gi;

                let match;
                while ((match = regex.exec(content)) !== null) {
                    const method = match[1].toUpperCase();
                    let routePath = match[2];

                    // Combine
                    let fullPath = `${apiPrefix}${routePath}`;
                    // Eliminate duplicate slashes (e.g., // -> /)
                    fullPath = fullPath.replace(/(?<!:)\/+/g, '/');

                    allEndpoints.push({
                        service: serviceName,
                        file: file,
                        method,
                        path: fullPath,
                        originalPath: routePath,
                        body: guessBody(content, match.index) // A primitive guess function
                    });
                }
            }
        } catch (e) {
            console.error(`Error processing ${serviceName}: ${e.message}`);
        }
    }

    // Sort
    allEndpoints.sort((a, b) => (a.service > b.service) ? 1 : -1);

    return allEndpoints;
}

function guessBody(content, index) {
    // Look ahead from index to find req.body usage
    // This is very rudimentary.
    const lookahead = content.substring(index, index + 500);
    const bodyMatch = lookahead.match(/req\.body\.([a-zA-Z0-9_]+)/g);
    if (bodyMatch) {
        return bodyMatch.map(m => m.replace('req.body.', ''));
    }
    return [];
}

const endpoints = scanRoutes();
fs.writeFileSync('all_endpoints.json', JSON.stringify(endpoints, null, 2));
console.log(`Successfully scanned ${endpoints.length} endpoints. Written to all_endpoints.json`);
