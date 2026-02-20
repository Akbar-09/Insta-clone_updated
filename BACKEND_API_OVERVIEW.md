# Instagram Clone - Microservices API Overview

This document provides a detailed overview of all backend API endpoints across the microservices architecture.

## **Base URL (Gateway)**
- **Development**: `http://192.168.1.4:5000/api/v1`
- **Auth required**: Most endpoints require a JWT token in the `Authorization: Bearer <token>` header.

---

## **1. Authentication Service**
Handles user registration, login, and session state.
- **Port**: 5001
- **Gateway Prefix**: `/auth`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Create a new user account |
| `POST` | `/login` | Authenticate and receive JWT |
| `GET` | `/check-username` | Check if username is available |
| `GET` | `/check-email` | Check if email is available |
| `GET` | `/me` | Get current authenticated user details |
| `POST` | `/logout`| Log out user |
| `POST` | `/reset-password/request` | Initial password reset flow |
| `POST` | `/reset-password/verify` | Complete password reset |

---

## **2. User Service**
Handles profiles, follows, blocks, and settings.
- **Port**: 5002
- **Gateway Prefix**: `/users`

### **Profiles & Reports**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile/me` | Get currently logged in user's profile |
| `PUT` | `/profile/me` | Update current user's profile |
| `POST` | `/profile/profile-photo` | Update profile picture |
| `DELETE` | `/profile/profile-photo` | Remove profile picture |
| `GET` | `/profile/suggestions` | Get suggested users to follow |
| `POST` | `/profile/report-problem` | Submit a problem report (with file support) |
| `GET` | `/profile/reports/me` | Get user's own submitted reports |
| `GET` | `/profile/:username` | Find a user profile by username |
| `GET` | `/profile/:userId/posts` | Get posts by a specific user |

### **Social Relationships (Follows)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/:userId/follow` | Follow a user |
| `DELETE` | `/:userId/follow` | Unfollow a user |
| `GET` | `/:userId/follow/status` | Check if following a user |
| `GET` | `/:userId/followers` | Get followers list |
| `GET` | `/:userId/following` | Get following list |
| `GET` | `/requests` | Get pending follow requests (Private profiles) |
| `POST` | `/requests/accept` | Accept a follow request |
| `POST` | `/requests/reject` | Reject a follow request |

### **Settings & Privacy**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `PATCH` | `/profile/settings/messages` | Update message privacy settings |
| `PATCH` | `/profile/settings/tags-mentions`| Update tag/mention visibility |
| `GET` | `/profile/tags/pending` | Get tags waiting for manual approval |
| `PUT` | `/profile/settings/comments` | Update comment permissions |
| `POST` | `/profile/block/:userId` | Block a user |
| `DELETE` | `/profile/unblock/:userId`| Unblock a user |

---

## **3. Post Service**
Handles content creation, likes, and bookmarks.
- **Port**: 5003
- **Gateway Prefix**: `/posts`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create a new post |
| `GET` | `/` | Get feed posts (or user posts if filtered) |
| `GET` | `/explore` | Get trending explore posts |
| `GET` | `/:id` | Get single post details |
| `DELETE` | `/:id` | Delete a post |
| `POST` | `/:id/like` | Like a post |
| `DELETE` | `/:id/like` | Unlike a post |
| `POST` | `/:id/bookmark` | Save post to bookmarks |
| `DELETE` | `/:id/bookmark`| Remove from bookmarks |
| `GET` | `/saved` | Get user's bookmarked posts |

---

## **4. Comment Service**
Handles post comments and replies.
- **Port**: 5006
- **Gateway Prefix**: `/comments`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Add a comment to a post |
| `GET` | `/?postId=...` | Get comments for a specific post |
| `DELETE` | `/:id` | Delete a comment |
| `POST` | `/:id/like` | Like a comment |
| `DELETE` | `/:id/like` | Unlike a comment |

---

## **5. Media Service**
Dedicated storage and upload handler.
- **Port**: 5013
- **Gateway Prefix**: `/media`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/upload` | Upload a file (returns URL) |
| `GET` | `/uploads/:filename` | Serve static file (available at root `/uploads`) |

---

## **6. Message Service (Direct Messaging)**
Real-time chat and conversation history.
- **Port**: 5010
- **Gateway Prefix**: `/messages`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/conversations` | List all active chats |
| `GET` | `/conversations/:id` | Get message history for a chat |
| `POST` | `/send` | Send a new message |
| `POST` | `/seen` | Mark messages in a chat as read |

---

## **7. Notification Service**
Activity alerts and system notifications.
- **Port**: 5008
- **Gateway Prefix**: `/notifications`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get user notifications |
| `GET` | `/unread-count` | Get count of new notifications |
| `PATCH` | `/:id/read` | Mark single notification as read |
| `PATCH` | `/read-all` | Mark all notifications as read |
| `GET` | `/settings` | Get notification preferences |

---

## **8. Story & Highlight Service**
Handles ephemeral stories and permanent profile highlights.
- **Port**: 5004
- **Gateway Prefix**: `/stories`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create a new story |
| `GET` | `/` | Get active stories from followed users |
| `GET` | `/archive` | Get user's own expired stories |
| `POST` | `/highlights` | Create a new highlight from stories |
| `GET` | `/highlights/:userId` | Get a user's highlights |

---

## **9. Live Service**
Real-time streaming orchestration.
- **Port**: 5015
- **Gateway Prefix**: `/live`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/create` | Initialize a new live stream (returns RTMP key) |
| `GET` | `/feed/active` | Get list of currently live users |
| `GET` | `/:id` | Get stream metadata and HLS URL |
| `POST` | `/:id/comment`| Add comment to live stream |

---

## **10. Reel Service**
Short-form video content.
- **Port**: 5005
- **Gateway Prefix**: `/reels`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create a new Reel |
| `GET` | `/` | Get trending Reels |
| `GET` | `/activity/reels` | Get activity related Reels |
| `GET` | `/activity/likes` | Get recently liked Reels |
| `POST` | `/:id/like` | Like a Reel |
| `DELETE` | `/:id/like` | Unlike a Reel |

---

## **11. Search Service**
- **Port**: 5009
- **Gateway Prefix**: `/search`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/?q=...` | Search for users, tags, or posts |

---

## **12. Feed Service**
- **Port**: 5007
- **Gateway Prefix**: `/feed`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get calculated feed for the user |

---

## **13. Ad Service (Public/Admin)**
- **Port**: 5014
- **Gateway Prefix**: `/ads`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/active` | Get active advertisements (Public) |
| `POST` | `/impression` | Track ad impression |
| `POST` | `/click` | Track ad click |
| `POST` | `/` | Create new Advertisement (Admin Only) |
| `PATCH` | `/:id/approve` | Approve/Reject Ad (Admin Only) |

---

## **Real-time (Socket.IO)**
- **Port**: 5011
- **Gateway Path**: `/socket.io`

The Socket Service handles real-time events for:
- **Chat**: New messages, typing indicators, seen status.
- **Notifications**: Real-time activity alerts (likes, follows, etc).
- **Live Streaming**: Real-time viewer count and live chat.
- **Video Calling**: Signaling (if implemented).

---

## **Static Content**
- **Media Uploads**: Available at `/uploads/` via Gateway.
- **HLS Streams**: Available at `/live/` (proxied directly to Node-Media-Server in some configurations).
