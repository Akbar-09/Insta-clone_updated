const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, 'Jaadoe_Social_Network.postman_collection.json');

const SERVICE_ORDER = [
    'auth-service',       // 1. Get Token
    'user-service',       // 2. Setup Profile / Get User ID
    'media-service',      // 3. Upload Media (needed for posts)
    'post-service',       // 4. Create Post (needed for comments/feeds)
    'feed-service',       // 5. View Feed
    'story-service',      // 6. Create Story
    'reel-service',       // 7. Create Reel
    'comment-service',    // 8. Comment on Post
    'message-service',    // 9. Send Messages
    'notification-service', // 10. Check Notifications
    'search-service',     // 11. Search
    'ad-service',         // 12. Ads
    'insight-service',    // 13. Insights
    'help-service',       // 14. Help
    'live-service',       // 15. Live
    'admin-service'       // 16. Admin (Separate flow usually)
];

const INTERNAL_PRIORITY = {
    'auth-service': ['POST /signup', 'POST /login'],
    'post-service': ['POST /', 'POST /api/v1/posts'], // Try to catch create endpoint
    'comment-service': ['POST /', 'POST /api/v1/comments'],
    'media-service': ['POST /upload', 'POST /api/v1/media/upload']
};

try {
    const content = fs.readFileSync(collectionPath, 'utf8');
    const collection = JSON.parse(content);

    // 1. Sort Services (Folders)
    collection.item.sort((a, b) => {
        const indexA = SERVICE_ORDER.indexOf(a.name);
        const indexB = SERVICE_ORDER.indexOf(b.name);

        // If both present, sort by index
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;

        // If A is present but B is not, A comes first
        if (indexA !== -1) return -1;

        // If B is present but A is not, B comes first
        if (indexB !== -1) return 1;

        // Otherwise prompt alphabetical or keep existing
        return a.name.localeCompare(b.name);
    });

    // 2. Sort Endpoints within key services (Put Create/Login first)
    collection.item.forEach(folder => {
        const priorities = INTERNAL_PRIORITY[folder.name];
        if (priorities) {
            folder.item.sort((a, b) => {
                const pA = priorities.findIndex(p => a.name.includes(p) || a.name === p);
                const pB = priorities.findIndex(p => b.name.includes(p) || b.name === p);

                if (pA !== -1 && pB !== -1) return pA - pB;
                if (pA !== -1) return -1;
                if (pB !== -1) return 1;
                return 0;
            });
        }
    });

    fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
    console.log('Postman collection reordered successfully.');

} catch (e) {
    console.error('Error reordering collection:', e);
}
