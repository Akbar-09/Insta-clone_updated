/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         username:
 *           type: string
 *           description: The user's username.
 *         email:
 *           type: string
 *           description: The user's email.
 *         fullName:
 *           type: string
 *           description: The user's full name.
 *         profilePicture:
 *           type: string
 *           description: URL to the user's profile picture.
 *         bio:
 *           type: string
 *           description: The user's bio.
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The post ID.
 *         userId:
 *           type: integer
 *           description: ID of the user who created the post.
 *         caption:
 *           type: string
 *           description: Caption of the post.
 *         mediaUrl:
 *           type: string
 *           description: URL of the media (image/video).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: An error occurred processing your request.
 */

// --- AUTH ---

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

// --- USERS ---

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and profile retrieval
 */

/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get user profile by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User followed successfully
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 */

// --- POSTS ---

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post creation and retrieval
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post liked
 *   delete:
 *     summary: Unlike a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post unliked
 */

/**
 * @swagger
 * /posts/{id}/bookmark:
 *   post:
 *     summary: Bookmark a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post bookmarked
 */

// --- COMMENTS ---

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 * /comments/{id}/like:
 *   post:
 *     summary: Like a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liked
 *   delete:
 *     summary: Unlike a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Unliked
 * /comments/check-comments:
 *   post:
 *     summary: Batch check like status for comments
 *     tags: [Comments]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentIds:
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 */

// --- STORIES ---

/**
 * @swagger
 * tags:
 *   name: Stories
 *   description: Story features
 */

/**
 * @swagger
 * /stories:
 *   get:
 *     summary: Get active stories provided by people you follow
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: List of active stories
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Story created
 */

/**
 * @swagger
 * /stories/{id}/view:
 *   post:
 *     summary: Mark a story as viewed
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Story marked as viewed
 * /stories/archive:
 *   get:
 *     summary: Get user's archived stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: List of stories
 * /stories/activity/story-replies:
 *   get:
 *     summary: Get story replies activity
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: OK
 * /stories/highlights:
 *   post:
 *     summary: Create a story highlight
 *     tags: [Stories]
 *     responses:
 *       201:
 *         description: Highlight created
 * /stories/highlights/{userId}:
 *   get:
 *     summary: Get user's highlights
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 */


// --- REELS ---

/**
 * @swagger
 * tags:
 *   name: Reels
 *   description: Reel management
 */

/**
 * @swagger
 * /reels:
 *   get:
 *     summary: Get reels feed
 *     tags: [Reels]
 *     responses:
 *       200:
 *         description: List of reels
 */

/**
 * @swagger
 * /reels/{id}/like:
 *   post:
 *     summary: Like a reel
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reel liked
 *   delete:
 *     summary: Unlike a reel
 *     tags: [Reels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reel unliked
 * /reels/activity/reels:
 *   get:
 *     summary: Get user reel activity
 *     tags: [Reels]
 *     responses:
 *       200:
 *         description: OK
 * /reels/activity/likes:
 *   get:
 *     summary: Get user liked reels
 *     tags: [Reels]
 *     responses:
 *       200:
 *         description: OK
 */

// --- MESSAGES ---

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Direct messaging
 */

/**
 * @swagger
 * /messages/conversations:
 *   get:
 *     summary: Get user conversations
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of conversations
 */

/**
 * @swagger
 * /messages/conversations/{id}/messages:
 *   get:
 *     summary: Get messages in a conversation
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Conversation ID or User ID (depending on implementation)
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of messages
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Recipient ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 */

// --- NOTIFICATIONS ---

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: User notifications
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of notifications
 * /notifications/settings:
 *   get:
 *     summary: Get notification preferences
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: OK
 *   patch:
 *     summary: Update notification preferences
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Updated
 * /notifications/unread-count:
 *   get:
 *     summary: Get count of unread notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: OK
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 */

// --- SEARCH ---

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search functionality
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search users or posts
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */

// --- REPORTS ---

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Quality and safety reporting
 */

/**
 * @swagger
 * /users/profile/report-problem:
 *   post:
 *     summary: Submit a general problem report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               browserInfo:
 *                 type: object
 *     responses:
 *       200:
 *         description: Report submitted successfully
 */

// --- FEED ---

/**
 * @swagger
 * tags:
 *   name: Feed
 *   description: Algorithm-based personalized feeds
 */

/**
 * @swagger
 * /feed:
 *   get:
 *     summary: Get personalized post feed
 *     tags: [Feed]
 *     responses:
 *       200:
 *         description: List of posts
 */

// --- LIVE ---

/**
 * @swagger
 * tags:
 *   name: Live
 *   description: Live streaming features
 */

/**
 * @swagger
 * /live/create:
 *   post:
 *     summary: Create a new live stream session
 *     tags: [Live]
 *     responses:
 *       201:
 *         description: Session created
 * /live/feed/active:
 *   get:
 *     summary: Get active live streams
 *     tags: [Live]
 *     responses:
 *       200:
 *         description: List of active streams
 * /live/{id}:
 *   get:
 *     summary: Get live session details
 *     tags: [Live]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 * /live/{id}/comment:
 *   post:
 *     summary: Add comment to a live stream
 *     tags: [Live]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Comment added
 */

// --- ADMIN ---

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative governance and control (Admin Token Required)
 */

/**
 * @swagger
 * /admin/auth/login:
 *   post:
 *     summary: Admin panel login
 *     tags: [Admin]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /admin/auth/roles:
 *   get:
 *     summary: Get all admin roles
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of roles
 */

/**
 * @swagger
 * /admin/dashboard/kpis:
 *   get:
 *     summary: Get platform performance indicators
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of statistics
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users for management
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /admin/users/{userId}:
 *   get:
 *     summary: Get full user details for admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details found
 */

/**
 * @swagger
 * /admin/users/{userId}/ban:
 *   patch:
 *     summary: Ban a user permanently
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User banned
 */

/**
 * @swagger
 * /admin/reports:
 *   get:
 *     summary: List all user reports
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /admin/moderation/posts:
 *   get:
 *     summary: List all posts for moderation
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /admin/moderation/posts/{postId}:
 *   delete:
 *     summary: Delete a post by admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */

/**
 * @swagger
 * /admin/hashtags:
 *   get:
 *     summary: List and manage hashtags
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /admin/analytics/countries:
 *   get:
 *     summary: Get regional user distribution
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Analytics data returned
 */

/**
 * @swagger
 * /admin/cms/pages:
 *   get:
 *     summary: List CMS pages
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Page list returned
 */

/**
 * @swagger
 * /admin/notifications/global:
 *   post:
 *     summary: Send a global system notification
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification broadcast successfully
 */

/**
 * @swagger
 * /admin/messages/reported:
 *   get:
 *     summary: Review reported direct messages
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /admin/audit:
 *   get:
 *     summary: View administrative audit logs
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Log history returned
 */
