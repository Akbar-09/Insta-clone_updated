/**
 * @swagger
 * tags:
 *   - name: Users
 *   - name: Posts
 *   - name: Auth
 *   - name: Stories
 *   - name: Comments
 *   - name: Feed
 *   - name: Notifications
 *   - name: Search
 *   - name: Messages
 *   - name: Reels
 *   - name: Media
 *   - name: Ads
 *   - name: Insights
 *   - name: Live
 *   - name: Admin
 *   - name: Help
 */

/**
 * @swagger
 * /ads/:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/ (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /ads/{id}/comments/{commentId}:
 *   delete:
 *     tags: [Ads]
 *     summary: DELETE /ads/:id/comments/:commentId (adRoutes.js)
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
 * /ads/{id}/comments:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/comments (adRoutes.js)
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
 * /ads/{id}/comments:
 *   get:
 *     tags: [Ads]
 *     summary: GET /ads/:id/comments (adRoutes.js)
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
 * /ads/{id}/bookmark:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/bookmark (adRoutes.js)
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
 * /ads/{id}/like:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/like (adRoutes.js)
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
 * /ads/{id}/embed:
 *   get:
 *     tags: [Ads]
 *     summary: GET /ads/:id/embed (adRoutes.js)
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
 * /ads/{id}/toggle-comments:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id/toggle-comments (adRoutes.js)
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
 * /ads/{id}/hide-likes:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id/hide-likes (adRoutes.js)
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
 * /ads/{id}:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id (adRoutes.js)
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
 * /ads/{id}:
 *   delete:
 *     tags: [Ads]
 *     summary: DELETE /ads/:id (adRoutes.js)
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
 * /ads/click:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/click (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /ads/impression:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/impression (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /ads/active:
 *   get:
 *     tags: [Ads]
 *     summary: GET /ads/active (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /ads/eligible-content:
 *   get:
 *     tags: [Ads]
 *     summary: GET /ads/eligible-content (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /ads/{id}/publish:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/publish (adRoutes.js)
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
 * /ads/{id}/budget:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id/budget (adRoutes.js)
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
 * /ads/{id}/targeting:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id/targeting (adRoutes.js)
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
 * /ads/{id}/details:
 *   put:
 *     tags: [Ads]
 *     summary: PUT /ads/:id/details (adRoutes.js)
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
 * /ads/{id}/boost-content:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/boost-content (adRoutes.js)
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
 * /ads/{id}/media:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/:id/media (adRoutes.js)
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
 * /ads/draft:
 *   post:
 *     tags: [Ads]
 *     summary: POST /ads/draft (adRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/users/{userId}/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/:userId/reels (userManagementRoutes.js)
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
 * /admin/users/{userId}/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/:userId/posts (userManagementRoutes.js)
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
 * /admin/users/{userId}/following:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/:userId/following (userManagementRoutes.js)
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
 * /admin/users/{userId}/followers:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/:userId/followers (userManagementRoutes.js)
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
 * /admin/users/{userId}/details:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/:userId/details (userManagementRoutes.js)
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
 * /admin/users/{userId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/users/:userId (userManagementRoutes.js)
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
 * /admin/users/{userId}/unban:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/users/:userId/unban (userManagementRoutes.js)
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
 * /admin/users/{userId}/ban:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/users/:userId/ban (userManagementRoutes.js)
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
 * /admin/users/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/users/ (userManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/settings/:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /admin/settings/ (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/settings/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/settings/ (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/settings/profile:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /admin/settings/profile (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/settings/profile:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/settings/profile (settingRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/reports/{id}/ban-user:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/reports/:id/ban-user (reportRoutes.js)
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
 * /admin/reports/{id}/ignore:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/reports/:id/ignore (reportRoutes.js)
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
 * /admin/reports/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/reports/:id (reportRoutes.js)
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
 * /admin/reports/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/reports/ (reportRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/reports/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/reports/stats (reportRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/monitoring/logs/{serviceName}/{type}:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/monitoring/logs/:serviceName/:type (monitoringRoutes.js)
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
 * /admin/monitoring/statuses:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/monitoring/statuses (monitoringRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/reels (moderationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/posts (moderationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/comments/{commentId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/comments/:commentId (moderationRoutes.js)
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
 * /admin/stories/{storyId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/stories/:storyId (moderationRoutes.js)
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
 * /admin/reels/{reelId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/reels/:reelId (moderationRoutes.js)
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
 * /admin/posts/{postId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/posts/:postId/hide (moderationRoutes.js)
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
 * /admin/posts/{postId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/posts/:postId (moderationRoutes.js)
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
 * /admin/default-avatars/:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/default-avatars/ (mediaDefaultRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/default-avatars/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/default-avatars/ (mediaDefaultRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/languages/{id}/set-default:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/languages/:id/set-default (languageRoutes.js)
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
 * /admin/languages/{id}/disable:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/languages/:id/disable (languageRoutes.js)
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
 * /admin/languages/{id}/enable:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/languages/:id/enable (languageRoutes.js)
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
 * /admin/languages/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/languages/ (languageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/feature:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/feature (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/{id}/block:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/:id/block (hashtagRoutes.js)
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
 * /admin/trending:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/trending (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/ (hashtagRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/hashtags/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/hashtags/:id (hashtagAdminRoutes.js)
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
 * /admin/hashtags/{id}/toggle-visibility:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/hashtags/:id/toggle-visibility (hashtagAdminRoutes.js)
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
 * /admin/hashtags/trending:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/hashtags/trending (hashtagAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/hashtags/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/hashtags/ (hashtagAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/geo-users:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/geo-users (geoAnalyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/performance-metrics:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/explore/performance-metrics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/category-distribution:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/explore/category-distribution (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/trending-topics/{topicId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/explore/trending-topics/:topicId (exploreAdminRoutes.js)
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
 * /admin/explore/trending-topics:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/explore/trending-topics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/trending-topics:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/explore/trending-topics (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/algorithm:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/explore/algorithm (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/explore/algorithm:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/explore/algorithm (exploreAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/messages/{conversationId}/flag:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/messages/:conversationId/flag (dmSafetyRoutes.js)
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
 * /admin/messages/reported:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/messages/reported (dmSafetyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dm-oversight/conversations/{conversationId}/ban-users:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/dm-oversight/conversations/:conversationId/ban-users (dmOversightRoutes.js)
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
 * /admin/dm-oversight/conversations/{conversationId}/mark-safe:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/dm-oversight/conversations/:conversationId/mark-safe (dmOversightRoutes.js)
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
 * /admin/dm-oversight/conversations/{conversationId}/transcript:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dm-oversight/conversations/:conversationId/transcript (dmOversightRoutes.js)
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
 * /admin/dm-oversight/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dm-oversight/stats (dmOversightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dm-oversight/conversations:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dm-oversight/conversations (dmOversightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/recent-posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/recent-posts (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/recent-users:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/recent-users (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/login-methods:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/login-methods (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/media-distribution:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/media-distribution (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/user-growth:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/user-growth (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/activity-feed:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/activity-feed (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/dashboard/kpis:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/dashboard/kpis (dashboardRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/moderation/stories/{storyId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/moderation/stories/:storyId (contentManagementRoutes.js)
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
 * /admin/moderation/stories/{storyId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/stories/:storyId/interactions (contentManagementRoutes.js)
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
 * /admin/moderation/stories:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/stories (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/moderation/reels/{reelId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/moderation/reels/:reelId (contentManagementRoutes.js)
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
 * /admin/moderation/reels/{reelId}/unhide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/moderation/reels/:reelId/unhide (contentManagementRoutes.js)
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
 * /admin/moderation/reels/{reelId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/moderation/reels/:reelId/hide (contentManagementRoutes.js)
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
 * /admin/moderation/reels/{reelId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/reels/:reelId/interactions (contentManagementRoutes.js)
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
 * /admin/moderation/reels:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/reels (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/moderation/posts/{postId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/moderation/posts/:postId (contentManagementRoutes.js)
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
 * /admin/moderation/posts/{postId}/unhide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/moderation/posts/:postId/unhide (contentManagementRoutes.js)
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
 * /admin/moderation/posts/{postId}/hide:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/moderation/posts/:postId/hide (contentManagementRoutes.js)
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
 * /admin/moderation/posts/{postId}/interactions:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/posts/:postId/interactions (contentManagementRoutes.js)
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
 * /admin/moderation/posts:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/moderation/posts (contentManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/comments/{commentId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/comments/:commentId (commentModerationRoutes.js)
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
 * /admin/comments/{commentId}/remove:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/comments/:commentId/remove (commentModerationRoutes.js)
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
 * /admin/comments/{commentId}/approve:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/comments/:commentId/approve (commentModerationRoutes.js)
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
 * /admin/comments/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/comments/stats (commentModerationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/comments/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/comments/ (commentModerationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/cms/pages/{id}:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/cms/pages/:id (cmsRoutes.js)
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
 * /admin/cms/pages:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/cms/pages (cmsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/avatars/{avatarId}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/avatars/:avatarId (avatarManagementRoutes.js)
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
 * /admin/avatars/{avatarId}/reject:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/avatars/:avatarId/reject (avatarManagementRoutes.js)
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
 * /admin/avatars/{avatarId}/approve:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/avatars/:avatarId/approve (avatarManagementRoutes.js)
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
 * /admin/avatars/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/avatars/stats (avatarManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/avatars/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/avatars/ (avatarManagementRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/auth/roles/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/auth/roles/:id (authRoutes.js)
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
 * /admin/auth/roles/{id}:
 *   put:
 *     tags: [Admin]
 *     summary: PUT /admin/auth/roles/:id (authRoutes.js)
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
 * /admin/auth/roles:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/auth/roles (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/auth/roles:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/auth/roles (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/auth/admins/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: DELETE /admin/auth/admins/:id (authRoutes.js)
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
 * /admin/auth/admins/{id}/role:
 *   patch:
 *     tags: [Admin]
 *     summary: PATCH /admin/auth/admins/:id/role (authRoutes.js)
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
 * /admin/auth/admins:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/auth/admins (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/auth/me:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/auth/me (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/auth/login:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/auth/login (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/audit/:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/audit/ (auditRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/active-hours:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/active-hours (analyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/countries:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/countries (analyticsRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/active-hours:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/active-hours (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/countries:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/countries (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/top-content:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/top-content (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/engagement-trends:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/engagement-trends (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/user-acquisition:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/user-acquisition (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/analytics/summary:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/analytics/summary (analyticsAdminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/notifications/stats:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/notifications/stats (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/notifications/history:
 *   get:
 *     tags: [Admin]
 *     summary: GET /admin/notifications/history (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /admin/notifications/global:
 *   post:
 *     tags: [Admin]
 *     summary: POST /admin/notifications/global (adminNotificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/history:
 *   get:
 *     tags: [Auth]
 *     summary: GET /auth/history (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: GET /auth/me (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/logout (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/reset-password/verify:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/reset-password/verify (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/reset-password/request:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/reset-password/request (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/check-email:
 *   get:
 *     tags: [Auth]
 *     summary: GET /auth/check-email (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/check-username:
 *   get:
 *     tags: [Auth]
 *     summary: GET /auth/check-username (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/login (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/signup (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: POST /auth/register (authRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/internal/post/{postId}:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/internal/post/:postId (internalRoutes.js)
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
 * /comments/internal/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /comments/internal/:commentId (internalRoutes.js)
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
 * /comments/internal/{commentId}/remove:
 *   patch:
 *     tags: [Comments]
 *     summary: PATCH /comments/internal/:commentId/remove (internalRoutes.js)
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
 * /comments/internal/{commentId}/approve:
 *   patch:
 *     tags: [Comments]
 *     summary: PATCH /comments/internal/:commentId/approve (internalRoutes.js)
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
 * /comments/internal/{commentId}:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/internal/:commentId (internalRoutes.js)
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
 * /comments/internal/stats:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/internal/list:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/activity/reviews:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/activity/reviews (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/activity/comments:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/activity/comments (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/check-comments:
 *   post:
 *     tags: [Comments]
 *     summary: POST /comments/check-comments (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/{id}/like:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /comments/:id/like (commentRoutes.js)
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
 * /comments/{id}/like:
 *   post:
 *     tags: [Comments]
 *     summary: POST /comments/:id/like (commentRoutes.js)
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
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: DELETE /comments/:id (commentRoutes.js)
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
 * /comments/:
 *   get:
 *     tags: [Comments]
 *     summary: GET /comments/ (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /comments/:
 *   post:
 *     tags: [Comments]
 *     summary: POST /comments/ (commentRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /feed/:
 *   get:
 *     tags: [Feed]
 *     summary: GET /feed/ (feedRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/feedback:
 *   post:
 *     tags: [Help]
 *     summary: POST /help/feedback (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/search:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/search (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/article/{slug}:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/article/:slug (helpRoutes.js)
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
 * /help/articles:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/articles (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/articles/featured:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/articles/featured (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/category/{slug}:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/category/:slug (helpRoutes.js)
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
 * /help/categories:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/categories (helpRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/admin/article/{id}:
 *   delete:
 *     tags: [Help]
 *     summary: DELETE /help/admin/article/:id (adminRoutes.js)
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
 * /help/admin/article/{id}:
 *   put:
 *     tags: [Help]
 *     summary: PUT /help/admin/article/:id (adminRoutes.js)
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
 * /help/admin/articles:
 *   get:
 *     tags: [Help]
 *     summary: GET /help/admin/articles (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/admin/article:
 *   post:
 *     tags: [Help]
 *     summary: POST /help/admin/article (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /help/admin/category/{id}:
 *   delete:
 *     tags: [Help]
 *     summary: DELETE /help/admin/category/:id (adminRoutes.js)
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
 * /help/admin/category/{id}:
 *   put:
 *     tags: [Help]
 *     summary: PUT /help/admin/category/:id (adminRoutes.js)
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
 * /help/admin/category:
 *   post:
 *     tags: [Help]
 *     summary: POST /help/admin/category (adminRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /insights/heatmap:
 *   get:
 *     tags: [Insights]
 *     summary: GET /insights/heatmap (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /insights/content:
 *   get:
 *     tags: [Insights]
 *     summary: GET /insights/content (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /insights/account:
 *   get:
 *     tags: [Insights]
 *     summary: GET /insights/account (insightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /live/webhook/done:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/webhook/done (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /live/webhook/publish:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/webhook/publish (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /live/{id}/chat:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/:id/chat (liveRoutes.js)
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
 * /live/{id}/end:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/:id/end (liveRoutes.js)
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
 * /live/{id}:
 *   get:
 *     tags: [Live]
 *     summary: GET /live/:id (liveRoutes.js)
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
 * /live/feed:
 *   get:
 *     tags: [Live]
 *     summary: GET /live/feed (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /live/schedule:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/schedule (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /live/go-live:
 *   post:
 *     tags: [Live]
 *     summary: POST /live/go-live (liveRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /media/files/*:
 *   get:
 *     tags: [Media]
 *     summary: GET /media/files/* (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /media/finalize:
 *   post:
 *     tags: [Media]
 *     summary: POST /media/finalize (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /media/presigned-url:
 *   post:
 *     tags: [Media]
 *     summary: POST /media/presigned-url (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /media/status/{id}:
 *   get:
 *     tags: [Media]
 *     summary: GET /media/status/:id (mediaRoutes.js)
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
 * /media/upload:
 *   post:
 *     tags: [Media]
 *     summary: POST /media/upload (mediaRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/seen:
 *   post:
 *     tags: [Messages]
 *     summary: POST /messages/seen (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/send:
 *   post:
 *     tags: [Messages]
 *     summary: POST /messages/send (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/conversations/{conversationId}:
 *   delete:
 *     tags: [Messages]
 *     summary: DELETE /messages/conversations/:conversationId (messageRoutes.js)
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
 * /messages/conversations/{conversationId}/report:
 *   post:
 *     tags: [Messages]
 *     summary: POST /messages/conversations/:conversationId/report (messageRoutes.js)
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
 * /messages/conversations/{conversationId}/unblock:
 *   post:
 *     tags: [Messages]
 *     summary: POST /messages/conversations/:conversationId/unblock (messageRoutes.js)
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
 * /messages/conversations/{conversationId}/block:
 *   post:
 *     tags: [Messages]
 *     summary: POST /messages/conversations/:conversationId/block (messageRoutes.js)
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
 * /messages/conversations/{conversationId}/mute:
 *   patch:
 *     tags: [Messages]
 *     summary: PATCH /messages/conversations/:conversationId/mute (messageRoutes.js)
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
 * /messages/conversations/{conversationId}/details:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/conversations/:conversationId/details (messageRoutes.js)
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
 * /messages/conversations/{conversationId}:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/conversations/:conversationId (messageRoutes.js)
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
 * /messages/conversations:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/conversations (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/activity/story-replies:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/activity/story-replies (messageRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/internal/conversations/{conversationId}:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/internal/conversations/:conversationId (internalRoutes.js)
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
 * /messages/internal/conversations/{conversationId}/mark-safe:
 *   patch:
 *     tags: [Messages]
 *     summary: PATCH /messages/internal/conversations/:conversationId/mark-safe (internalRoutes.js)
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
 * /messages/internal/conversations/{conversationId}/transcript:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/internal/conversations/:conversationId/transcript (internalRoutes.js)
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
 * /messages/internal/stats:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /messages/internal/conversations:
 *   get:
 *     tags: [Messages]
 *     summary: GET /messages/internal/conversations (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/admin/stats:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /notifications/admin/stats (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/admin/history:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /notifications/admin/history (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/admin/broadcast:
 *   post:
 *     tags: [Notifications]
 *     summary: POST /notifications/admin/broadcast (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /notifications/read-all (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /notifications/:id/read (notificationRoutes.js)
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
 * /notifications/unread-count:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /notifications/unread-count (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /notifications/ (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/settings:
 *   patch:
 *     tags: [Notifications]
 *     summary: PATCH /notifications/settings (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /notifications/settings:
 *   get:
 *     tags: [Notifications]
 *     summary: GET /notifications/settings (notificationRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/reports/{id}/status:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /posts/internal/reports/:id/status (reportInternalRoutes.js)
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
 * /posts/internal/reports/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/reports/:id (reportInternalRoutes.js)
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
 * /posts/internal/reports:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/reports (reportInternalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/reports/stats:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/reports/stats (reportInternalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/{id}/bookmark:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /posts/:id/bookmark (postRoutes.js)
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
 * /posts/{id}/bookmark:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/:id/bookmark (postRoutes.js)
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
 * /posts/{id}/report:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/:id/report (postRoutes.js)
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
 * /posts/{id}/toggle-comments:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /posts/:id/toggle-comments (postRoutes.js)
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
 * /posts/{id}/hide-likes:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /posts/:id/hide-likes (postRoutes.js)
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
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: PUT /posts/:id (postRoutes.js)
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
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /posts/:id (postRoutes.js)
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
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/:id (postRoutes.js)
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
 * /posts/{id}/embed:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/:id/embed (postRoutes.js)
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
 * /posts/activity/posts:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/activity/posts (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/activity/likes:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/activity/likes (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/check-likes:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/check-likes (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/saved:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/saved (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/{id}/like:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /posts/:id/like (postRoutes.js)
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
 * /posts/{id}/like:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/:id/like (postRoutes.js)
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
 * /posts/:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/ (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/explore:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/explore (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/feed:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/feed (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/:
 *   post:
 *     tags: [Posts]
 *     summary: POST /posts/ (postRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/{postId}/bookmarks:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/:postId/bookmarks (internalRoutes.js)
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
 * /posts/internal/{postId}/likes:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/:postId/likes (internalRoutes.js)
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
 * /posts/internal/{postId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/:postId (internalRoutes.js)
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
 * /posts/internal/{postId}:
 *   delete:
 *     tags: [Posts]
 *     summary: DELETE /posts/internal/:postId (internalRoutes.js)
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
 * /posts/internal/{postId}/unhide:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /posts/internal/:postId/unhide (internalRoutes.js)
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
 * /posts/internal/{postId}/hide:
 *   patch:
 *     tags: [Posts]
 *     summary: PATCH /posts/internal/:postId/hide (internalRoutes.js)
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
 * /posts/internal/user/{userId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/user/:userId (internalRoutes.js)
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
 * /posts/internal/stats/user/{userId}:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/stats/user/:userId (internalRoutes.js)
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
 * /posts/internal/list:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/recent:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/top:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/top (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/engagement/trends:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/engagement/trends (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/stats/engagement:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/stats/engagement (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/stats/overall:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/stats/overall (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /posts/internal/stats:
 *   get:
 *     tags: [Posts]
 *     summary: GET /posts/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/{id}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/:id (reelRoutes.js)
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
 * /reels/user:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/user (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/{id}/bookmark:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /reels/:id/bookmark (reelRoutes.js)
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
 * /reels/{id}/bookmark:
 *   post:
 *     tags: [Reels]
 *     summary: POST /reels/:id/bookmark (reelRoutes.js)
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
 * /reels/{id}/like:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /reels/:id/like (reelRoutes.js)
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
 * /reels/{id}/like:
 *   post:
 *     tags: [Reels]
 *     summary: POST /reels/:id/like (reelRoutes.js)
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
 * /reels/activity/likes:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/activity/likes (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/activity/reels:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/activity/reels (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/saved:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/saved (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/ (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/:
 *   post:
 *     tags: [Reels]
 *     summary: POST /reels/ (reelRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/internal/{reelId}/likes:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/:reelId/likes (internalRoutes.js)
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
 * /reels/internal/{reelId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/:reelId (internalRoutes.js)
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
 * /reels/internal/recent:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/internal/{reelId}:
 *   delete:
 *     tags: [Reels]
 *     summary: DELETE /reels/internal/:reelId (internalRoutes.js)
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
 * /reels/internal/{reelId}/unhide:
 *   patch:
 *     tags: [Reels]
 *     summary: PATCH /reels/internal/:reelId/unhide (internalRoutes.js)
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
 * /reels/internal/{reelId}/hide:
 *   patch:
 *     tags: [Reels]
 *     summary: PATCH /reels/internal/:reelId/hide (internalRoutes.js)
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
 * /reels/internal/list:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/internal/user/{userId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/user/:userId (internalRoutes.js)
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
 * /reels/internal/stats/user/{userId}:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/stats/user/:userId (internalRoutes.js)
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
 * /reels/internal/stats/overall:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/stats/overall (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /reels/internal/stats:
 *   get:
 *     tags: [Reels]
 *     summary: GET /reels/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /search/users:
 *   get:
 *     tags: [Search]
 *     summary: GET /search/users (searchRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /search/:
 *   get:
 *     tags: [Search]
 *     summary: GET /search/ (searchRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/{id}/react:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /stories/:id/react (storyRoutes.js)
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
 * /stories/{id}/react:
 *   post:
 *     tags: [Stories]
 *     summary: POST /stories/:id/react (storyRoutes.js)
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
 * /stories/{id}/view:
 *   post:
 *     tags: [Stories]
 *     summary: POST /stories/:id/view (storyRoutes.js)
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
 * /stories/{id}/report:
 *   post:
 *     tags: [Stories]
 *     summary: POST /stories/:id/report (storyRoutes.js)
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
 * /stories/{id}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /stories/:id (storyRoutes.js)
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
 * /stories/activity/story-replies:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/activity/story-replies (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/archive:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/archive (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/ (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/:
 *   post:
 *     tags: [Stories]
 *     summary: POST /stories/ (storyRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/internal/{storyId}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /stories/internal/:storyId (internalRoutes.js)
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
 * /stories/internal/{storyId}/likes:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/internal/:storyId/likes (internalRoutes.js)
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
 * /stories/internal/{storyId}/views:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/internal/:storyId/views (internalRoutes.js)
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
 * /stories/internal/list:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/internal/stats:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/highlights/{highlightId}:
 *   delete:
 *     tags: [Stories]
 *     summary: DELETE /stories/highlights/:highlightId (highlightRoutes.js)
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
 * /stories/highlights/{highlightId}:
 *   put:
 *     tags: [Stories]
 *     summary: PUT /stories/highlights/:highlightId (highlightRoutes.js)
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
 * /stories/highlights/{highlightId}/stories:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/highlights/:highlightId/stories (highlightRoutes.js)
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
 * /stories/highlights/{userId}:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/highlights/:userId (highlightRoutes.js)
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
 * /stories/highlights:
 *   post:
 *     tags: [Stories]
 *     summary: POST /stories/highlights (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/activity/highlights:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/activity/highlights (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /stories/stories/me:
 *   get:
 *     tags: [Stories]
 *     summary: GET /stories/stories/me (highlightRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/followers/{followerId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/followers/:followerId (profileRoutes.js)
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
 * /users/profile/{userId}/following:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/:userId/following (profileRoutes.js)
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
 * /users/profile/{userId}/followers:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/:userId/followers (profileRoutes.js)
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
 * /users/profile/{userId}/reels:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/:userId/reels (profileRoutes.js)
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
 * /users/profile/{userId}/posts:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/:userId/posts (profileRoutes.js)
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
 * /users/profile/{username}:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/:username (profileRoutes.js)
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
 * /users/profile/activity/account-history:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/activity/account-history (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/batch:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/batch (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/suggestions:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/suggestions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/me/saved:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/me/saved (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/profile-photo:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/profile-photo (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/profile-photo:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/profile-photo (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/me:
 *   put:
 *     tags: [Users]
 *     summary: PUT /users/profile/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/help/feedback:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/help/feedback (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/help/support-requests:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/help/support-requests (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/help/feature-limits:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/help/feature-limits (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/help/violations:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/help/violations (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/help/account-status:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/help/account-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/apps/{id}/revoke:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/apps/:id/revoke (profileRoutes.js)
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
 * /users/profile/settings/apps:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/apps (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/general:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/general (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/general:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/general (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/subscriptions:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/subscriptions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/like-share:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/like-share (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/like-share:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/like-share (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/content-preferences:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/content-preferences (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/content-preferences:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/content-preferences (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/muted/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/settings/muted/:userId (profileRoutes.js)
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
 * /users/profile/settings/muted/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/settings/muted/:userId (profileRoutes.js)
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
 * /users/profile/settings/muted:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/muted (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/hidden-words/words/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/settings/hidden-words/words/:id (profileRoutes.js)
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
 * /users/profile/settings/hidden-words/words:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/settings/hidden-words/words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/hidden-words:
 *   put:
 *     tags: [Users]
 *     summary: PUT /users/profile/settings/hidden-words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/hidden-words:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/hidden-words (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/restricted/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/settings/restricted/:userId (profileRoutes.js)
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
 * /users/profile/settings/restricted/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/settings/restricted/:userId (profileRoutes.js)
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
 * /users/profile/settings/restricted:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/restricted (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/sharing:
 *   put:
 *     tags: [Users]
 *     summary: PUT /users/profile/settings/sharing (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/sharing:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/sharing (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/comments:
 *   put:
 *     tags: [Users]
 *     summary: PUT /users/profile/settings/comments (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/comments:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/comments (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/tags/{id}/remove:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/tags/:id/remove (profileRoutes.js)
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
 * /users/profile/tags/{id}/approve:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/tags/:id/approve (profileRoutes.js)
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
 * /users/profile/tags/pending:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/tags/pending (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/tags-mentions:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/tags-mentions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/tags-mentions:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/tags-mentions (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/activity-status:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/activity-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/activity-status:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/activity-status (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/story-replies:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/story-replies (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/story-replies:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/story-replies (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/messages:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/profile/settings/messages (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/settings/messages:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/settings/messages (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/story-privacy/unhide/{hiddenUserId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/story-privacy/unhide/:hiddenUserId (profileRoutes.js)
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
 * /users/profile/story-privacy/hide:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/story-privacy/hide (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/story-privacy/hidden-users:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/story-privacy/hidden-users (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/unblock/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/unblock/:userId (profileRoutes.js)
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
 * /users/profile/block/{userId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/block/:userId (profileRoutes.js)
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
 * /users/profile/blocked-users:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/blocked-users (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/close-friends/{friendId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/profile/close-friends/:friendId (profileRoutes.js)
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
 * /users/profile/close-friends/{friendId}:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/close-friends/:friendId (profileRoutes.js)
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
 * /users/profile/close-friends:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/close-friends (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/reports/me:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/profile/reports/me (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/profile/report-problem:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/profile/report-problem (profileRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/{userId}/follow-counts:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/:userId/follow-counts (internalRoutes.js)
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
 * /users/internal/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/:userId (internalRoutes.js)
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
 * /users/internal/bulk:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/internal/bulk (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/recent:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/recent (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/internal/:userId (internalRoutes.js)
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
 * /users/internal/{userId}/unban:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/internal/:userId/unban (internalRoutes.js)
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
 * /users/internal/{userId}/ban:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/internal/:userId/ban (internalRoutes.js)
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
 * /users/internal/list:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/list (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/countries:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/countries (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/login-methods:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/login-methods (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/growth:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/growth (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/avatars/{avatarId}:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/internal/avatars/:avatarId (internalRoutes.js)
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
 * /users/internal/avatars/{avatarId}/reject:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/internal/avatars/:avatarId/reject (internalRoutes.js)
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
 * /users/internal/avatars/{avatarId}/approve:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/internal/avatars/:avatarId/approve (internalRoutes.js)
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
 * /users/internal/avatars/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/avatars/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/avatars:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/avatars (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/reports/{id}/status:
 *   patch:
 *     tags: [Users]
 *     summary: PATCH /users/internal/reports/:id/status (internalRoutes.js)
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
 * /users/internal/reports/{id}:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/reports/:id (internalRoutes.js)
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
 * /users/internal/reports:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/reports (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/internal/reports/stats:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/internal/reports/stats (internalRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/requests/reject:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/requests/reject (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/requests/accept:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/requests/accept (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/requests:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/requests (followRoutes.js)
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /users/{userId}/following:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/:userId/following (followRoutes.js)
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
 * /users/{userId}/followers:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/:userId/followers (followRoutes.js)
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
 * /users/{userId}/follow/status:
 *   get:
 *     tags: [Users]
 *     summary: GET /users/:userId/follow/status (followRoutes.js)
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
 * /users/{userId}/follow:
 *   delete:
 *     tags: [Users]
 *     summary: DELETE /users/:userId/follow (followRoutes.js)
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
 * /users/{userId}/follow:
 *   post:
 *     tags: [Users]
 *     summary: POST /users/:userId/follow (followRoutes.js)
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

