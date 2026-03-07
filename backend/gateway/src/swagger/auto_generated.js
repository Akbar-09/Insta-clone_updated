/**
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
 *   - name: Calls
 */

/**
 * @swagger
 * /api/v1/ads/:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/ (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/comments/{commentId}:
 *   delete:
 *     tags: [Ads]
 *     summary: DELETE /api/v1/ads/:id/comments/:commentId (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/comments:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/comments (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/comments:
 *   get:
 *     tags: [Ads]
 *     summary: GET /api/v1/ads/:id/comments (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/bookmark:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/bookmark (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/like:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/like (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/embed:
 *   get:
 *     tags: [Ads]
 *     summary: GET /api/v1/ads/:id/embed (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/toggle-comments:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id/toggle-comments (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/hide-likes:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id/hide-likes (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}:
 *   delete:
 *     tags: [Ads]
 *     summary: DELETE /api/v1/ads/:id (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/click:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/click (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/impression:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/impression (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/active:
 *   get:
 *     tags: [Ads]
 *     summary: GET /api/v1/ads/active (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/eligible-content:
 *   get:
 *     tags: [Ads]
 *     summary: GET /api/v1/ads/eligible-content (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/publish:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/publish (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/budget:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id/budget (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/targeting:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id/targeting (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/details:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /api/v1/ads/:id/details (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/boost-content:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/boost-content (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/{id}/media:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/:id/media (adRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/ads/draft:
 *   post:
 *     tags: [Ads]
 *     summary: POST /api/v1/ads/draft (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/:userId/reels (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/:userId/posts (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/following:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/:userId/following (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/followers:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/:userId/followers (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/details:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/:userId/details (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/users/:userId (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/unban:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/users/:userId/unban (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}/ban:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/users/:userId/ban (userManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/users/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/users/ (userManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/settings/:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /api/v1/admin/settings/ (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/settings/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/settings/ (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/settings/profile:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /api/v1/admin/settings/profile (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/settings/profile:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/settings/profile (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reports/{id}/ban-user:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/reports/:id/ban-user (reportRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reports/{id}/ignore:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/reports/:id/ignore (reportRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reports/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/reports/:id (reportRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reports/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/reports/ (reportRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reports/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/reports/stats (reportRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/monitoring/logs/{serviceName}/{type}:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/monitoring/logs/:serviceName/:type (monitoringRoutes.js)
 *     parameters:
 *       - in: path
 *         name: serviceName
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/monitoring/statuses:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/monitoring/statuses (monitoringRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/reels (moderationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/posts (moderationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/{commentId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/comments/:commentId (moderationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/stories/{storyId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/stories/:storyId (moderationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/reels/{reelId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/reels/:reelId (moderationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/posts/{postId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/posts/:postId/hide (moderationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/posts/{postId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/posts/:postId (moderationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/default-avatars/:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/default-avatars/ (mediaDefaultRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/default-avatars/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/default-avatars/ (mediaDefaultRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/languages/{id}/set-default:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/languages/:id/set-default (languageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/languages/{id}/disable:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/languages/:id/disable (languageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/languages/{id}/enable:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/languages/:id/enable (languageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/languages/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/languages/ (languageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/feature:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/feature (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/{id}/block:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/:id/block (hashtagRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/trending:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/trending (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/ (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/hashtags/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/hashtags/:id (hashtagAdminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/hashtags/{id}/toggle-visibility:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/hashtags/:id/toggle-visibility (hashtagAdminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/hashtags/trending:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/hashtags/trending (hashtagAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/hashtags/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/hashtags/ (hashtagAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/geo-users:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/geo-users (geoAnalyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/performance-metrics:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/explore/performance-metrics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/category-distribution:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/explore/category-distribution (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/trending-topics/{topicId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/explore/trending-topics/:topicId (exploreAdminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/trending-topics:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/explore/trending-topics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/trending-topics:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/explore/trending-topics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/algorithm:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/explore/algorithm (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/explore/algorithm:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/explore/algorithm (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/messages/{conversationId}/flag:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/messages/:conversationId/flag (dmSafetyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/messages/reported:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/messages/reported (dmSafetyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dm-oversight/conversations/{conversationId}/ban-users:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users (dmOversightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dm-oversight/conversations/{conversationId}/mark-safe:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe (dmOversightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dm-oversight/conversations/{conversationId}/transcript:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dm-oversight/conversations/:conversationId/transcript (dmOversightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dm-oversight/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dm-oversight/stats (dmOversightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dm-oversight/conversations:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dm-oversight/conversations (dmOversightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/recent-posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/recent-posts (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/recent-users:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/recent-users (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/login-methods:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/login-methods (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/media-distribution:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/media-distribution (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/user-growth:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/user-growth (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/activity-feed:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/activity-feed (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/dashboard/kpis:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/dashboard/kpis (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/stories/{storyId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/moderation/stories/:storyId (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/stories/{storyId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/stories/:storyId/interactions (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/stories:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/stories (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/reels/{reelId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/moderation/reels/:reelId (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/reels/{reelId}/unhide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/moderation/reels/:reelId/unhide (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/reels/{reelId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/moderation/reels/:reelId/hide (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/reels/{reelId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/reels/:reelId/interactions (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/reels (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/posts/{postId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/moderation/posts/:postId (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/posts/{postId}/unhide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/moderation/posts/:postId/unhide (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/posts/{postId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/moderation/posts/:postId/hide (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/posts/{postId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/posts/:postId/interactions (contentManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/moderation/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/moderation/posts (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/{commentId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/comments/:commentId (commentModerationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/{commentId}/remove:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/comments/:commentId/remove (commentModerationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/{commentId}/approve:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/comments/:commentId/approve (commentModerationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/comments/stats (commentModerationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/comments/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/comments/ (commentModerationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/cms/pages/{id}:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/cms/pages/:id (cmsRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/cms/pages:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/cms/pages (cmsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/avatars/{avatarId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/avatars/:avatarId (avatarManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/avatars/{avatarId}/reject:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/avatars/:avatarId/reject (avatarManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/avatars/{avatarId}/approve:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/avatars/:avatarId/approve (avatarManagementRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/avatars/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/avatars/stats (avatarManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/avatars/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/avatars/ (avatarManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/roles/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/auth/roles/:id (authRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/roles/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /api/v1/admin/auth/roles/:id (authRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/roles:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/auth/roles (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/roles:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/auth/roles (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/admins/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/admin/auth/admins/:id (authRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/admins/{id}/role:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /api/v1/admin/auth/admins/:id/role (authRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/admins:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/auth/admins (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/me:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/auth/me (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/auth/login:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/auth/login (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/audit/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/audit/ (auditRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/active-hours:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/active-hours (analyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/countries:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/countries (analyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/active-hours:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/active-hours (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/countries:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/countries (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/top-content:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/top-content (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/engagement-trends:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/engagement-trends (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/user-acquisition:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/user-acquisition (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/analytics/summary:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/analytics/summary (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/notifications/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/notifications/stats (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/notifications/history:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/admin/notifications/history (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/admin/notifications/global:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/admin/notifications/global (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/history:
 *   get:
 *     tags: [Auth]
 *     summary: GET /api/v1/auth/history (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: GET /api/v1/auth/me (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/logout (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/reset-password/verify:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/reset-password/verify (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/reset-password/request:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/reset-password/request (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/check-email:
 *   get:
 *     tags: [Auth]
 *     summary: GET /api/v1/auth/check-email (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/check-username:
 *   get:
 *     tags: [Auth]
 *     summary: GET /api/v1/auth/check-username (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/login (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/signup (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: POST /api/v1/auth/register (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/calls/end:
 *   post:
 *     tags: [Calls]
 *     summary: POST /api/v1/calls/end (call.routes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/calls/reject:
 *   post:
 *     tags: [Calls]
 *     summary: POST /api/v1/calls/reject (call.routes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/calls/accept:
 *   post:
 *     tags: [Calls]
 *     summary: POST /api/v1/calls/accept (call.routes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/calls/start:
 *   post:
 *     tags: [Calls]
 *     summary: POST /api/v1/calls/start (call.routes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/post/{postId}:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/internal/post/:postId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /api/v1/comments/internal/:commentId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/{commentId}/remove:
 *   patch:
 *     tags: [Comments]
 *     summary: PATCH /api/v1/comments/internal/:commentId/remove (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/{commentId}/approve:
 *   patch:
 *     tags: [Comments]
 *     summary: PATCH /api/v1/comments/internal/:commentId/approve (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/{commentId}:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/internal/:commentId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/stats:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/internal/list:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/activity/reviews:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/activity/reviews (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/activity/comments:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/activity/comments (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/check-comments:
 *   post:
 *     tags: [Comments]
 *     summary: POST /api/v1/comments/check-comments (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/{id}/like:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /api/v1/comments/:id/like (commentRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/{id}/like:
 *   post:
 *     tags: [Comments]
 *     summary: POST /api/v1/comments/:id/like (commentRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /api/v1/comments/:id (commentRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/:
 *   get:
 *     tags: [Comments]
 *     summary: GET /api/v1/comments/ (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/comments/:
 *   post:
 *     tags: [Comments]
 *     summary: POST /api/v1/comments/ (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/feed/:
 *   get:
 *     tags: [Feed]
 *     summary: GET /api/v1/feed/ (feedRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/feedback:
 *   post:
 *     tags: [Help]
 *     summary: POST /api/v1/help/feedback (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/search:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/search (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/article/{slug}:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/article/:slug (helpRoutes.js)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/articles:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/articles (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/articles/featured:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/articles/featured (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/category/{slug}:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/category/:slug (helpRoutes.js)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/categories:
 *   get:
 *     tags: [Help]
 *     summary: GET /api/v1/help/categories (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/article/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/help/admin/article/:id (adminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/article/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /api/v1/help/admin/article/:id (adminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/articles:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/help/admin/articles (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/article:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/help/admin/article (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/category/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /api/v1/help/admin/category/:id (adminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/category/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /api/v1/help/admin/category/:id (adminRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/help/admin/category:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/help/admin/category (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/insights/heatmap:
 *   get:
 *     tags: [Insights]
 *     summary: GET /api/v1/insights/heatmap (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/insights/content:
 *   get:
 *     tags: [Insights]
 *     summary: GET /api/v1/insights/content (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/insights/account:
 *   get:
 *     tags: [Insights]
 *     summary: GET /api/v1/insights/account (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/block/{userId}:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/:id/block/:userId (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/mute/{userId}:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/:id/mute/:userId (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/moderator/{userId}:
 *   delete:
 *     tags: [Live]
 *     summary: DELETE /api/v1/live/:id/moderator/:userId (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/moderator:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/:id/moderator (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/keyword/{keywordId}:
 *   delete:
 *     tags: [Live]
 *     summary: DELETE /api/v1/live/:id/keyword/:keywordId (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: keywordId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/keyword:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/:id/keyword (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/settings:
 *   patch:
 *     tags: [Live]
 *     summary: PATCH /api/v1/live/:id/settings (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/settings:
 *   get:
 *     tags: [Live]
 *     summary: GET /api/v1/live/:id/settings (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}/chat:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/:id/chat (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/{id}:
 *   get:
 *     tags: [Live]
 *     summary: GET /api/v1/live/:id (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/feed:
 *   get:
 *     tags: [Live]
 *     summary: GET /api/v1/live/feed (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/end/{id}:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/end/:id (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/join/{id}:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/join/:id (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/start/{id}:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/start/:id (liveRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/live/create:
 *   post:
 *     tags: [Live]
 *     summary: POST /api/v1/live/create (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/media/files/*:
 *   get:
 *     tags: [Media]
 *     summary: GET /api/v1/media/files/* (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/media/finalize:
 *   post:
 *     tags: [Media]
 *     summary: POST /api/v1/media/finalize (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/media/presigned-url:
 *   post:
 *     tags: [Media]
 *     summary: POST /api/v1/media/presigned-url (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/media/status/{id}:
 *   get:
 *     tags: [Media]
 *     summary: GET /api/v1/media/status/:id (mediaRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/media/upload:
 *   post:
 *     tags: [Media]
 *     summary: POST /api/v1/media/upload (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/seen:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/seen (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/send:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/send (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}:
 *   delete:
 *     tags: [Messages]
 *     summary: DELETE /api/v1/messages/conversations/:conversationId (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/report:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/conversations/:conversationId/report (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/unblock:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/conversations/:conversationId/unblock (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/block:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/conversations/:conversationId/block (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/mute:
 *   patch:
 *     tags: [Messages]
 *     summary: PATCH /api/v1/messages/conversations/:conversationId/mute (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/details:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/conversations/:conversationId/details (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/messages:
 *   post:
 *     tags: [Messages]
 *     summary: POST /api/v1/messages/conversations/:conversationId/messages (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}/messages:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/conversations/:conversationId/messages (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations/{conversationId}:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/conversations/:conversationId (messageRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/conversations:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/conversations (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/unread-count:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/unread-count (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/activity/story-replies:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/activity/story-replies (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/internal/conversations/{conversationId}:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/internal/conversations/:conversationId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/internal/conversations/{conversationId}/mark-safe:
 *   patch:
 *     tags: [Messages]
 *     summary: PATCH /api/v1/messages/internal/conversations/:conversationId/mark-safe (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/internal/conversations/{conversationId}/transcript:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/internal/conversations/:conversationId/transcript (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/internal/stats:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/messages/internal/conversations:
 *   get:
 *     tags: [Messages]
 *     summary: GET /api/v1/messages/internal/conversations (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/notifications/admin/stats (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/admin/history:
 *   get:
 *     tags: [Admin]
 *     summary: GET /api/v1/notifications/admin/history (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/admin/broadcast:
 *   post:
 *     tags: [Admin]
 *     summary: POST /api/v1/notifications/admin/broadcast (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /api/v1/notifications/read-all (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /api/v1/notifications/:id/read (notificationRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/unread-count:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /api/v1/notifications/unread-count (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /api/v1/notifications/ (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/settings:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /api/v1/notifications/settings (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/notifications/settings:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /api/v1/notifications/settings (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/reports/{id}/status:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /api/v1/posts/internal/reports/:id/status (reportInternalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/reports/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/reports/:id (reportInternalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/reports:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/reports (reportInternalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/reports/stats:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/reports/stats (reportInternalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/bookmark:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /api/v1/posts/:id/bookmark (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/bookmark:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/:id/bookmark (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/report:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/:id/report (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/toggle-comments:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /api/v1/posts/:id/toggle-comments (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/hide-likes:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /api/v1/posts/:id/hide-likes (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /api/v1/posts/:id (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /api/v1/posts/:id (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/:id (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/embed:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/:id/embed (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/activity/posts:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/activity/posts (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/activity/likes:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/activity/likes (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/check-likes:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/check-likes (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/saved:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/saved (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/like:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /api/v1/posts/:id/like (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/{id}/like:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/:id/like (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/ (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/hashtag/{hashtag}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/hashtag/:hashtag (postRoutes.js)
 *     parameters:
 *       - in: path
 *         name: hashtag
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/explore:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/explore (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/feed:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/feed (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/:
 *   post:
 *     tags: [Posts]
 *     summary: POST /api/v1/posts/ (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}/bookmarks:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/:postId/bookmarks (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}/likes:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/:postId/likes (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/:postId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /api/v1/posts/internal/:postId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}/unhide:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /api/v1/posts/internal/:postId/unhide (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/{postId}/hide:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /api/v1/posts/internal/:postId/hide (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/user/{userId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/user/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/stats/user/{userId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/stats/user/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/list:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/recent:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/top:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/top (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/engagement/trends:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/engagement/trends (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/stats/engagement:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/stats/engagement (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/stats/overall:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/stats/overall (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/posts/internal/stats:
 *   get:
 *     tags: [Posts]
 *     summary: GET /api/v1/posts/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/:id (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/user:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/user (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}/report:
 *   post:
 *     tags: [Reels]
 *     summary: POST /api/v1/reels/:id/report (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}/bookmark:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /api/v1/reels/:id/bookmark (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}/bookmark:
 *   post:
 *     tags: [Reels]
 *     summary: POST /api/v1/reels/:id/bookmark (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}/like:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /api/v1/reels/:id/like (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/{id}/like:
 *   post:
 *     tags: [Reels]
 *     summary: POST /api/v1/reels/:id/like (reelRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/activity/likes:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/activity/likes (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/activity/reels:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/activity/reels (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/saved:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/saved (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/ (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/:
 *   post:
 *     tags: [Reels]
 *     summary: POST /api/v1/reels/ (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/{reelId}/likes:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/:reelId/likes (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/{reelId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/:reelId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/recent:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/{reelId}:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /api/v1/reels/internal/:reelId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/{reelId}/unhide:
 *   patch:
 *     tags: [Reels]
 *     summary: PATCH /api/v1/reels/internal/:reelId/unhide (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/{reelId}/hide:
 *   patch:
 *     tags: [Reels]
 *     summary: PATCH /api/v1/reels/internal/:reelId/hide (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: reelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/list:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/user/{userId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/user/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/stats/user/{userId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/stats/user/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/stats/overall:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/stats/overall (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/reels/internal/stats:
 *   get:
 *     tags: [Reels]
 *     summary: GET /api/v1/reels/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/search/hashtags:
 *   get:
 *     tags: [Search]
 *     summary: GET /api/v1/search/hashtags (searchRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/search/users:
 *   get:
 *     tags: [Search]
 *     summary: GET /api/v1/search/users (searchRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/search/:
 *   get:
 *     tags: [Search]
 *     summary: GET /api/v1/search/ (searchRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/{id}/react:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /api/v1/stories/:id/react (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/{id}/react:
 *   post:
 *     tags: [Stories]
 *     summary: POST /api/v1/stories/:id/react (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/{id}/view:
 *   post:
 *     tags: [Stories]
 *     summary: POST /api/v1/stories/:id/view (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/{id}/report:
 *   post:
 *     tags: [Stories]
 *     summary: POST /api/v1/stories/:id/report (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/{id}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /api/v1/stories/:id (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/activity/story-replies:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/activity/story-replies (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/user/{targetUserId}:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/user/:targetUserId (storyRoutes.js)
 *     parameters:
 *       - in: path
 *         name: targetUserId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/archive:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/archive (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/ (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/:
 *   post:
 *     tags: [Stories]
 *     summary: POST /api/v1/stories/ (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/internal/{storyId}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /api/v1/stories/internal/:storyId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/internal/{storyId}/likes:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/internal/:storyId/likes (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/internal/{storyId}/views:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/internal/:storyId/views (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/internal/list:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/internal/stats:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/highlights/{highlightId}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /api/v1/stories/highlights/:highlightId (highlightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/highlights/{highlightId}:
 *   put:
 *     tags: [Stories]
 *     summary: PUT /api/v1/stories/highlights/:highlightId (highlightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/highlights/{highlightId}/stories:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/highlights/:highlightId/stories (highlightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/highlights/{userId}:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/highlights/:userId (highlightRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/highlights:
 *   post:
 *     tags: [Stories]
 *     summary: POST /api/v1/stories/highlights (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/activity/highlights:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/activity/highlights (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/stories/stories/me:
 *   get:
 *     tags: [Stories]
 *     summary: GET /api/v1/stories/stories/me (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/followers/{followerId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/followers/:followerId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/{userId}/following:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/:userId/following (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/{userId}/followers:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/:userId/followers (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/{userId}/reels:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/:userId/reels (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/{userId}/posts:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/:userId/posts (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/{username}:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/:username (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/onboarding/event:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/onboarding/event (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/onboarding/suggestions:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/onboarding/suggestions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/onboarding/interests:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/onboarding/interests (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/onboarding/interests:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/onboarding/interests (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/onboarding/profile:
 *   put:
 *     tags: [Users]
 *     summary: PUT /api/v1/users/profile/onboarding/profile (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/activity/account-history:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/activity/account-history (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/batch:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/batch (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/suggestions:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/suggestions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/me/saved:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/me/saved (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/profile-photo:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/profile-photo (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/profile-photo:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/profile-photo (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/me:
 *   put:
 *     tags: [Users]
 *     summary: PUT /api/v1/users/profile/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/me:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/help/feedback:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/help/feedback (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/help/support-requests:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/help/support-requests (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/help/feature-limits:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/help/feature-limits (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/help/violations:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/help/violations (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/help/account-status:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/help/account-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/apps/{id}/revoke:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/apps/:id/revoke (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/apps:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/apps (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/general:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/general (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/general:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/general (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/subscriptions:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/subscriptions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/like-share:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/like-share (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/like-share:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/like-share (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/content-preferences:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/content-preferences (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/content-preferences:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/content-preferences (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/muted/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/settings/muted/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/muted/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/settings/muted/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/muted:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/muted (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/hidden-words/words/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/settings/hidden-words/words/:id (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/hidden-words/words:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/settings/hidden-words/words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/hidden-words:
 *   put:
 *     tags: [Users]
 *     summary: PUT /api/v1/users/profile/settings/hidden-words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/hidden-words:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/hidden-words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/restricted/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/settings/restricted/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/restricted/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/settings/restricted/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/restricted:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/restricted (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/sharing:
 *   put:
 *     tags: [Users]
 *     summary: PUT /api/v1/users/profile/settings/sharing (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/sharing:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/sharing (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/comments:
 *   put:
 *     tags: [Users]
 *     summary: PUT /api/v1/users/profile/settings/comments (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/comments:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/comments (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/tags/{id}/remove:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/tags/:id/remove (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/tags/{id}/approve:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/tags/:id/approve (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/tags/pending:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/tags/pending (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/tags-mentions:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/tags-mentions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/tags-mentions:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/tags-mentions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/activity-status:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/activity-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/activity-status:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/activity-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/story-replies:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/story-replies (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/story-replies:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/story-replies (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/messages:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/profile/settings/messages (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/settings/messages:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/settings/messages (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/story-privacy/unhide/{hiddenUserId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/story-privacy/unhide/:hiddenUserId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: hiddenUserId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/story-privacy/hide:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/story-privacy/hide (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/story-privacy/hidden-users:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/story-privacy/hidden-users (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/unblock/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/unblock/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/block/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/block/:userId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/blocked-users:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/blocked-users (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/close-friends/{friendId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/profile/close-friends/:friendId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/close-friends/{friendId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/close-friends/:friendId (profileRoutes.js)
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/close-friends:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/close-friends (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/reports/me:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/profile/reports/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/profile/report-problem:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/profile/report-problem (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/{userId}/follow-counts:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/:userId/follow-counts (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/bulk:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/internal/bulk (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/recent:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/internal/:userId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/{userId}/unban:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/internal/:userId/unban (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/{userId}/ban:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/internal/:userId/ban (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/list:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/countries:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/countries (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/login-methods:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/login-methods (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/growth:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/growth (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/avatars/{avatarId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/internal/avatars/:avatarId (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/avatars/{avatarId}/reject:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/internal/avatars/:avatarId/reject (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/avatars/{avatarId}/approve:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/internal/avatars/:avatarId/approve (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/avatars/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/avatars/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/avatars:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/avatars (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/reports/{id}/status:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /api/v1/users/internal/reports/:id/status (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/reports/{id}:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/reports/:id (internalRoutes.js)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/reports:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/reports (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/internal/reports/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/internal/reports/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/requests/reject:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/requests/reject (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/requests/accept:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/requests/accept (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/requests:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/requests (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/followers/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/followers/:userId (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/follow/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/follow/:userId (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/follow/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/follow/:userId (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/{userId}/following:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/:userId/following (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/{userId}/followers:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/:userId/followers (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/{userId}/follow/status:
 *   get:
 *     tags: [Users]
 *     summary: GET /api/v1/users/:userId/follow/status (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/{userId}/follow:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /api/v1/users/:userId/follow (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/v1/users/{userId}/follow:
 *   post:
 *     tags: [Users]
 *     summary: POST /api/v1/users/:userId/follow (followRoutes.js)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

