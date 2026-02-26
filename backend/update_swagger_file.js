const fs = require('fs');
const path = require('path');

const endpoints = JSON.parse(fs.readFileSync('all_endpoints.json', 'utf8'));

let swaggerMd = `/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Users
 *   - name: Posts
 *   - name: Stories
 *   - name: Reels
 *   - name: Feed
 *   - name: Comments
 *   - name: Messages
 *   - name: Notifications
 *   - name: Search
 *   - name: Media
 *   - name: Ads
 *   - name: Live
 *   - name: Insights
 *   - name: Admin
 *   - name: Help
 */

`;

const servicesToTags = {
    'auth-service': 'Auth',
    'user-service': 'Users',
    'post-service': 'Posts',
    'story-service': 'Stories',
    'comment-service': 'Comments',
    'feed-service': 'Feed',
    'notification-service': 'Notifications',
    'search-service': 'Search',
    'message-service': 'Messages',
    'reel-service': 'Reels',
    'media-service': 'Media',
    'ad-service': 'Ads',
    'insight-service': 'Insights',
    'live-service': 'Live',
    'admin-service': 'Admin',
    'help-service': 'Help'
};

endpoints.forEach(ep => {
    let tag = servicesToTags[ep.service] || 'Uncategorized';

    // Admin override if path contains /admin/
    if (ep.path.includes('/admin/')) tag = 'Admin';

    // Convert :param to {param}
    const swaggerPath = ep.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
    const params = [];
    const paramMatches = ep.path.match(/:([a-zA-Z0-9_]+)/g);
    if (paramMatches) {
        paramMatches.forEach(m => {
            params.push(m.substring(1));
        });
    }

    swaggerMd += `/**
 * @swagger
 * ${swaggerPath}:
 *   ${ep.method.toLowerCase()}:
 *     tags: [${tag}]
 *     summary: ${ep.method} ${ep.path} (${ep.file})
`;

    if (params.length > 0) {
        swaggerMd += ` *     parameters:\n`;
        params.forEach(p => {
            swaggerMd += ` *       - in: path\n`;
            swaggerMd += ` *         name: ${p}\n`;
            swaggerMd += ` *         required: true\n`;
            swaggerMd += ` *         schema:\n`;
            swaggerMd += ` *           type: string\n`;
        });
    }

    swaggerMd += ` *     responses:
 *       200:
 *         description: OK
 */

`;
});

fs.writeFileSync('gateway/src/swagger/auto_generated.js', swaggerMd);
console.log('Successfully updated gateway/src/swagger/auto_generated.js');
