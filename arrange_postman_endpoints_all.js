const fs = require('fs');

const collectionPath = './Jaadoe_Social_Network.postman_collection.json';
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

// Helper to sort items based on a priority list
function sortItems(items, priorityList) {
    return items.sort((a, b) => {
        let indexA = priorityList.findIndex(p => a.name.includes(p));
        let indexB = priorityList.findIndex(p => b.name.includes(p));

        // If not found in priority list, move to end
        if (indexA === -1) indexA = 9999;
        if (indexB === -1) indexB = 9999;

        if (indexA !== indexB) {
            return indexA - indexB;
        }

        // Secondary sort alphabetically if priorities are equal (or both not found)
        return a.name.localeCompare(b.name);
    });
}

// 1. Auth Service
const authOrder = [
    "POST /signup",
    "POST /register",
    "POST /login",
    "GET /me",
    "GET /check-username",
    "GET /check-email",
    "POST /logout",
    "POST /reset-password/request",
    "POST /reset-password/verify",
    "GET /history"
];

// 2. User Service
const userOrder = [
    // Core Profile (Self)
    "GET /me",
    "PUT /me",
    "POST /profile-photo",
    "DELETE /profile-photo",

    // Core Profile (Others)
    "GET /:username",
    "GET /:userId/posts",

    // Social Graph (Actions)
    "POST /:userId/follow",
    "DELETE /:userId/follow", // Unfollow

    // Social Graph (Lists)
    "GET /:userId/followers",
    "GET /:userId/following",
    "DELETE /followers/:userId", // Remove follower
    "GET /suggestions",

    // Interactive
    "POST /block",
    "POST /report-problem",
    "POST /feedback",

    // Settings (Grouped together generally, but ordering specific ones if needed)
    "GET /settings/privacy",
    "GET /settings",
    "PATCH /settings",

    // Internal/Batch
    "POST /batch"
];

// 3. Media Service
const mediaOrder = [
    // R2 Flow
    "POST /presigned-url",
    "POST /finalize",
    // View
    "GET /files",
    "GET /status",
    // Legacy
    "POST /upload"
];

// 4. Post Service
const postOrder = [
    // Creation
    "POST /",  // Create Post (Main)

    // Feeds
    "GET /explore",
    "GET /",   // Get Posts (Feed)

    // Single Post Interaction
    "GET /:id",
    "PUT /:id",
    "DELETE /:id",

    // Likes/Bookmarks
    "POST /:id/like",
    "DELETE /:id/like",
    "POST /:id/bookmark",
    "DELETE /:id/bookmark",
    "GET /saved",
    "POST /check-likes",

    // Reports/Moderation
    "POST /:id/report",

    // Internal/Stats
    "GET /stats",
    "internal"
];

// 5. Comment Service
const commentOrder = [
    "POST /", // Create
    "GET /post/:postId", // List by post
    "GET /:id",
    "PUT /:id",
    "DELETE /:id",
    "POST /:id/like",
    "DELETE /:id/like"
];

// 6. Story Service
const storyOrder = [
    "POST /", // Create
    "GET /feed",
    "GET /user/:userId",
    "GET /:id",
    "POST /:id/view",
    "POST /:id/react",
    "DELETE /:id/react",
    "DELETE /:id"
];

// 7. Reel Service
const reelOrder = [
    "POST /",
    "GET /feed",
    "GET /user/:userId",
    "GET /:id",
    "POST /:id/like",
    "POST /:id/comment"
];

// 8. Message Service
const messageOrder = [
    "POST /", // Send
    "GET /conversations",
    "GET /conversations/:conversationId",
    "POST /conversations/:conversationId/read"
];

// 9. Notification Service
const notificationOrder = [
    "GET /",
    "GET /unread-count",
    "PATCH /:id/read",
    "PATCH /read-all"
];

// 10. Search Service
const searchOrder = [
    "GET /", // Search query
    "GET /suggestions",
    "GET /history",
    "POST /history",
    "DELETE /history"
];

// 11. Ad Service
const adOrder = [
    "POST /", // Create Campaign/Ad
    "GET /",
    "GET /:id",
    "PUT /:id",
    "DELETE /:id"
];

// 12. Insight Service
const insightOrder = [
    "GET /summary",
    "GET /engagement-trends",
    "GET /user-acquisition",
    "GET /active-hours",
    "GET /heatmap",
    "GET /top-content",
    "GET /countries"
];

// 13. Help Service
const helpOrder = [
    "GET /help/categories",
    "GET /help/articles",
    "GET /help/article/:id",
    "POST /help/support-requests", // Create Ticket
    "GET /help/support-requests"
];

// 14. Admin Service
const adminOrder = [
    "POST /login", // Admin Login
    "GET /me",
    "GET /dashboard/summary",
    "GET /users",
    "PATCH /users/:id",
    "GET /posts",
    "GET /reports",
    "PATCH /reports/:id"
];

// Apply Sorting
collection.item.forEach(folder => {
    if (folder.name === 'auth-service') {
        folder.item = sortItems(folder.item, authOrder);
    } else if (folder.name === 'user-service') {
        folder.item = sortItems(folder.item, userOrder);
    } else if (folder.name === 'media-service') {
        folder.item = sortItems(folder.item, mediaOrder);
    } else if (folder.name === 'post-service') {
        folder.item = sortItems(folder.item, postOrder);
    } else if (folder.name === 'comment-service') {
        folder.item = sortItems(folder.item, commentOrder);
    } else if (folder.name === 'story-service') {
        folder.item = sortItems(folder.item, storyOrder);
    } else if (folder.name === 'reel-service') {
        folder.item = sortItems(folder.item, reelOrder);
    } else if (folder.name === 'message-service') {
        folder.item = sortItems(folder.item, messageOrder);
    } else if (folder.name === 'notification-service') {
        folder.item = sortItems(folder.item, notificationOrder);
    } else if (folder.name === 'search-service') {
        folder.item = sortItems(folder.item, searchOrder);
    } else if (folder.name === 'ad-service') {
        folder.item = sortItems(folder.item, adOrder);
    } else if (folder.name === 'insight-service') {
        folder.item = sortItems(folder.item, insightOrder);
    } else if (folder.name === 'help-service') {
        folder.item = sortItems(folder.item, helpOrder);
    } else if (folder.name === 'admin-service') {
        folder.item = sortItems(folder.item, adminOrder);
    }
});

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
console.log('Postman collection endpoints reordered logically for ALL services.');
