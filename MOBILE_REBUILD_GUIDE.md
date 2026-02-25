# Jaadoe Social Network: Mobile Rebuild Documentation

This document provides a comprehensive blueprint for rebuilding the Jaadoe (Instagram Clone) web application as a native mobile application (Flutter, React Native, or Swift/Kotlin).

---

## 1. Project Overview
- **App Name:** Jaadoe (Instagram Clone)
- **Core Purpose:** A high-performance social networking platform for sharing photos, videos, stories, and reels, with real-time messaging and live streaming capabilities.
- **Main Features:** Multimedia posting, short-form video (Reels), expiring content (Stories), real-time chat, live broadcasting, following system, and professional dashboards.
- **Target Users:** Social media enthusiasts, content creators, and professional influencers.
- **Technical Architecture Summary:**
    - **Backend:** 19+ Node.js Microservices.
    - **API Gateway:** Centralized entry point (Express Proxy) for routing, authentication, and rate limiting.
    - **Database:** PostgreSQL (Sequelize ORM) for relational data.
    - **Storage:** Cloudflare R2 (S3-compatible) for media assets.
    - **Real-time:** Socket.io for messaging and notifications.
    - **Events:** RabbitMQ for inter-service communication and background tasks.

---

## 2. Complete Feature Breakdown

### 2.1 Authentication & User Management
- **Description:** secure registration, login, and profile management.
- **User Flow:** Splash -> Login/Signup -> Feed.
- **Backend Logic:** Bcrypt hashing, JWT generation, session tracking.
- **API Endpoints:** `POST /api/v1/auth/login`, `POST /api/v1/auth/signup`, `GET /api/v1/auth/me`.
- **Database Schema:** `Users` (Auth service), `UserProfiles` (User service).

### 2.2 Post System
- **Description:** Create, view, like, and comment on feed posts.
- **User Flow:** Create Post -> Select Media -> Add Caption -> Share.
- **Backend Logic:** Media upload to R2, metadata storage in PostgreSQL, event emission for feed updates.
- **Validation:** Image/Video size limits, required media.

### 2.3 Stories & Highlights
- **Description:** 24-hour expiring photos/videos.
- **User Flow:** Click Story Icon -> Capture/Upload -> Publish.
- **Backend Logic:** Cron/TTL logic for expiration, storage of view counts.

### 2.4 Reels
- **Description:** Vertical short-form videos with dedicated viewing experience.
- **User Flow:** Reels Tab -> Swipe down for next -> Like/Comment/Share.
- **Backend Logic:** Video processing (Media Service), algorithmic fetch (Feed Service).

### 2.5 Real-time Messaging
- **Description:** One-on-one private messaging with typing indicators.
- **User Flow:** Messages Tab -> Select Friend -> Send Text/Media.
- **Real-time Logic:** Socket.io `join` user rooms, `message:send` events.

### 2.6 Live Streaming
- **Description:** Real-time broadcasting using RTMP/HLS.
- **Adaptation:** Mobile requires RTMP ingest library (e.g., `flutter_webrtc` or native SDKs).

---

## 3. Full API Documentation (Gateway: Port 5000)

### 3.1 Auth Service (`/api/v1/auth`)
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | `/login` | Authenticate user & return token | No |
| POST | `/signup` | Register new account | No |
| GET | `/me` | Get current authenticated user | Yes |
| POST | `/logout` | Invalidate session | Yes |

### 3.2 Post Service (`/api/v1/posts`)
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/` | Get all posts (filtered by user/query) | Yes |
| POST | `/` | Create new post | Yes |
| GET | `/:id` | Get single post details | Yes |
| POST | `/:id/like` | Like a post | Yes |
| DELETE | `/:id` | Delete a post | Yes |

### 3.3 User Service (`/api/v1/users`)
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/:username` | Get profile details | Yes |
| POST | `/follow` | Follow a user | Yes |
| GET | `/search` | Search for users | Yes |

### 3.4 Message Service (`/api/v1/messages`)
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/conversations` | List user chat threads | Yes |
| GET | `/:convId` | Get message history | Yes |
| POST | `/` | Send a message | Yes |

---

## 4. Database Architecture (ER Diagram Summary)

### 4.1 Users (Auth Service)
- `id` (PK, Int)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (Hashed String)

### 4.2 UserProfiles (User Service)
- `userId` (FK, Int)
- `fullName` (String)
- `bio` (Text)
- `profilePicture` (Url)
- `followersCount` (Int)

### 4.3 Posts (Post Service)
- `id` (PK, Int)
- `userId` (FK)
- `mediaUrl` (String)
- `mediaType` (Enum: IMAGE, VIDEO)
- `caption` (Text)
- `likesCount` (Int)

---

## 5. Authentication System
- **Strategy:** JWT (JSON Web Token) with long-lived sessions.
- **Flow:**
    1. Client sends credentials to `/auth/login`.
    2. Server validates and returns JWT.
    3. Client stores JWT in **Secure Storage** (Keychain for iOS, EncryptedSharedPreferences for Android).
    4. Client sends `Authorization: Bearer <token>` in headers for all subsequent requests.
- **Middleware:** The API Gateway validates tokens before proxying requests to internal services.

---

## 6. Real-time Systems (Socket.io)
- **Presence:** `join` event with `userId` puts socket into a private room `user:<id>`.
- **Events:**
    - `message:receive`: New DM notification.
    - `user:typing`: Transmitting typing status.
    - `notification:new`: Real-time push for likes/follows.
- **Connection Lifecycle:** Connect on app foreground, disconnect on background (with background task for push if needed).

---

## 7. State Management Logic
- **Global Store:** Manage user data, message queues, and theme.
- **Mobile Patterns:** 
    - **Flutter:** BLoC or Provider/Riverpod.
    - **React Native:** Redux Toolkit or Zustand.
- **Caching Strategy:** Local DB (SQLite/Room/Hive) for offline viewing and faster load times.
- **Optimistic Updates:** Immediately show like/message as "sent" before API confirmation.

---

## 8. UI Component Breakdown (Screen-by-Screen)

### 8.1 Feed Screen
- **Components:** `StoryTray`, `PostScroll`, `PostCard` (Media, Like/Comment actions).
- **Dependencies:** `feed-service` for data, `post-service` for actions.

### 8.2 Explore Screen
- **Components:** `SearchHeader`, `StaggeredGrid` (Mix of Photos/Videos).
- **Dependencies:** `search-service`.

### 8.3 Message List
- **Components:** `ConversationTile` (Avatar, Snippet, Time).
- **Dependencies:** `message-service`, `socket-service`.

---

## 9. Mobile App Adaptation Guide
- **Gesture Handling:** Swipe left for DM, Double-tap to like, Pull-to-refresh feeds.
- **Media Optimization:** Use cached images (NetworkImage with Disk Cache), Progressive video loading.
- **Native APIs:**
    - **Camera:** Take photos/videos directly.
    - **Contacts:** Sync contacts to find friends.
    - **Biometrics:** FaceID/Fingerprint for login.
- **Responsive Behavior:** Adaptation for Tablet vs Phone layouts.

---

## 10. Environment & Deployment
- **Backend:** 
    - Use `start_services.js` for local orchestration.
    - Docker Compose for production deployment.
- **API Base URL:** Point to the Gateway IP (e.g., `http://192.168.1.x:5000`).
- **Required Variables:** `JWT_SECRET`, `R2_ACCESS_KEY`, `POSTGRES_URL`, `RABBITMQ_URL`.

---

## 11. Security Considerations
- **SSL Pinning:** Prevent Man-in-the-Middle attacks.
- **Device ID Tracking:** Log session device info in `UserSession` table.
- **Input Sanitization:** Sanitize captions/messages at both frontend and backend.
- **Rate Limiting:** Gateway enforces 1000 requests per 15 mins (configurable).

---

## 12. Folder Structure

### Backend (Current)
```
/gateway          # Central entry
/auth-service     # Authentication
/post-service     # Feed content
/user-service     # Profile/Follows
/media-service    # R2 Integration
...
```

### Suggested Mobile Structure (Flutter Example)
```
/lib
  /core
    /api          # Axios equivalent (Dio)
    /theme        # Colors/Gradients
  /features
    /auth         # Login/Signup logic
    /feed         # Posts/Stories widgets
    /chat         # Sockets/Messages
  /data
    /models       # API Response objects
    /repositories # Data fetching
```

---

## 13. Third-Party Services
- **Cloudflare R2:** Static asset hosting.
- **RabbitMQ:** Asynchronous event scaling.
- **Firebase/OneSignal:** Mobile Push Notifications (via `notification-service`).
- **Google/Meta OAuth:** Future login options.

---

## 14. Complete Data Flow
1. **Action:** User likes a post.
2. **Frontend:** Calls `POST /api/v1/posts/:id/like` with Token.
3. **Gateway:** Validates JWT, adds `x-user-id` header, proxies to Post Service.
4. **Post Service:** Updates DB, Increments `likesCount`.
5. **RabbitMQ:** Post Service publishes `POST_LIKED` event.
6. **Notification Service:** Consumes event, calculates targets, sends Push/Socket notification.
7. **Response:** App receives success, updates UI optimistically.

---

## 15. Testing Strategy
- **Unit Tests:** `vitest` for business logic (backend).
- **API Tests:** `Postman` collection or `Supertest`.
- **Integration:** Testing event flow between services via RabbitMQ.
- **UI Tests:** Flutter Driver / Detox for Mobile UI validation.

---
**Document Status:** Final v1.0
**Author:** Senior System Architect
