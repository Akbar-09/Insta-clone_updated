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

function getMountPoints(serviceDir) {
    const mountPoints = {}; // fileName -> prefix

    // Check index.js or src/index.js or app.js
    const entryFiles = ['index.js', 'src/index.js', 'app.js', 'src/app.js'];
    let content = '';

    for (const f of entryFiles) {
        if (fs.existsSync(path.join(serviceDir, f))) {
            content = fs.readFileSync(path.join(serviceDir, f), 'utf8');
            break;
        }
    }

    if (!content) return {};

    // 1. Find requires: const xyz = require('./routes/abc')
    const requireMap = {}; // xyz -> abc.js
    const requireRegex = /(?:const|var|let)\s+(\w+)\s*=\s*require\s*\(['"]\.\/(?:src\/)?routes\/([^'"]+)['"]\)/g;
    let match;
    while ((match = requireRegex.exec(content)) !== null) {
        const varName = match[1];
        let fileName = match[2];
        if (!fileName.endsWith('.js')) fileName += '.js';
        requireMap[varName] = fileName;
    }

    // 2. Find mounts: app.use('/path', xyz)
    const useRegex = /app\.use\s*\(\s*['"]([^'"]+)['"]\s*,\s*(\w+)\)/g;
    while ((match = useRegex.exec(content)) !== null) {
        const urlPath = match[1];
        const varName = match[2];
        if (requireMap[varName]) {
            mountPoints[requireMap[varName]] = urlPath;
        }
    }

    // Fallback: if app.use('/', xyz), path is empty string
    return mountPoints;
}

function scanRoutes() {
    let allEndpoints = [];

    for (const [serviceName, apiPrefix] of Object.entries(SERVICES_MAP)) {
        const serviceDir = path.join(BACKEND_DIR, serviceName);
        if (!fs.existsSync(serviceDir)) {
            continue;
        }

        let routesDir = path.join(serviceDir, 'routes');
        if (!fs.existsSync(routesDir)) {
            const srcRoutes = path.join(serviceDir, 'src', 'routes');
            if (fs.existsSync(srcRoutes)) {
                routesDir = srcRoutes;
            } else {
                continue;
            }
        }

        // Get Mount Points
        const mountPoints = getMountPoints(serviceDir);

        try {
            const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
            for (const file of routeFiles) {
                const content = fs.readFileSync(path.join(routesDir, file), 'utf8');

                // Determine intra-service prefix (e.g., /users)
                let serviceMountPath = mountPoints[file] || '/';
                if (serviceMountPath === '/') serviceMountPath = '';

                let regex = /router\.(get|post|put|delete|patch)\s*\(\s*['"]([^'"]*)['"]/gi;
                let match;
                while ((match = regex.exec(content)) !== null) {
                    const method = match[1].toUpperCase();
                    let routePath = match[2];

                    // Combine: GatewayPrefix + ServicePrefix + RoutePath
                    let fullPath = `${apiPrefix}${serviceMountPath}${routePath}`;
                    fullPath = fullPath.replace(/(?<!:)\/+/g, '/'); // Remove double slashes

                    // Use rudimentary body guessing
                    const hints = [];
                    if (content.substring(match.index, match.index + 300).includes('req.body.email')) hints.push('email');

                    allEndpoints.push({
                        service: serviceName,
                        file: file,
                        method,
                        path: fullPath,
                        originalPath: routePath,
                        body: hints
                    });
                }
            }
        } catch (e) {
            console.error(`Error processing ${serviceName}: ${e.message}`);
        }
    }

    allEndpoints.sort((a, b) => (a.service > b.service) ? 1 : -1);

    return allEndpoints;
}

const endpoints = scanRoutes();
fs.writeFileSync('all_endpoints.json', JSON.stringify(endpoints, null, 2));
console.log(`Successfully scanned ${endpoints.length} endpoints (v2). Written to all_endpoints.json`);
