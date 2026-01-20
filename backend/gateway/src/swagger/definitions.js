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
 * /users/me:
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
 * /conversations:
 *   get:
 *     summary: Get user conversations
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of conversations
 */

/**
 * @swagger
 * /conversations/{id}/messages:
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
