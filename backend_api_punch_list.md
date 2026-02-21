# Backend API Fix List (Punch List)
Generated for Backend Developer Reference
Date: 2026-02-19

## Overview
This document details the current state of API integration with the Jaadoe Flutter application. While core flows (Auth, Feed, Search) are functional, several critical sub-routes and interaction points are returning 404 (Not Found) or 500 (Internal Server Error).

---

## 🟢 Section 1: Successfully Integrated (Working)
*The following endpoints are fully functional and do not require immediate attention.*

### Authentication & User
- `POST /auth/login` & `POST /auth/signup`
- `GET /auth/me`
- `GET /auth/check-email` & `GET /auth/check-username`
- `PUT /users/profile/me` (Profile Updates)
- `POST /users/profile/profile-photo` (Upload)

### Feeds & Search
- `GET /posts` & `GET /posts/feed`
- `GET /posts/explore`
- `GET /posts/saved`
- `GET /users/profile/suggestions`
- `GET /search/users` & `GET /search`

### Messaging (Core)
- `GET /messages/conversations` (Inbox)
- `POST /messages/send`
- `POST /messages/seen`

---

## 🔴 Section 2: Deficient Endpoints (Requires Backend Fix)
*The following endpoints are failing in production/test environments.*

### 1. Profile & Social Graph (Critical)
*These failures prevent users from viewing connections or specific user content.*

| Method | Endpoint | Error | Observed Backend Response / Issue |
| :--- | :--- | :--- | :--- |
| GET | `/users/profile/:userId/followers` | 500 | `{"status":"error","message":"Internal Server Error"}` |
| GET | `/users/profile/:userId/following` | 500 | `{"status":"error","message":"Internal Server Error"}` |
| GET | `/users/profile/:userId/posts` | 500 | Likely a database query or relation issue |
| GET | `/users/profile/:userId/reels` | 500 | Likely same root cause as profile posts |
| DELETE | `/users/profile/followers/:id` | 500 | `{"status":"error","message":"Internal Server Error"}` |
| GET | `/users/profile/:username` | 404 | Returns "Not Found" even for existing usernames |

### 2. Stories Interaction
*Story viewing and reactions are consistently failing.*

| Method | Endpoint | Error | Observed Backend Response / Issue |
| :--- | :--- | :--- | :--- |
| POST | `/stories/:id/view` | 500 | Failed to increment view count / log view |
| POST | `/stories/:id/react` | 500 | Reaction logic causing server crash |
| DELETE | `/stories/:id/react` | 500 | Error removing reaction |
| POST | `/stories/:id/report` | 500 | Story reporting logic failure |
| DELETE | `/stories/:id` | 500 | Permission error or file system sync issue |
| GET | `/stories/activity/highlights` | 500 | Failed to fetch highlights feed |

### 3. Messaging Extensions
*Advanced chat features (Blocking, Muting, Detail View) are mostly unavailable (404).*

| Method | Endpoint | Error | Observed Backend Response / Issue |
| :--- | :--- | :--- | :--- |
| GET | `/messages/conversations/:id/messages` | 404 | **CRITICAL**: Cannot fetch individual chat history |
| POST | `/messages/conversations/:id/messages` | 404 | Cannot send messages to specific conversation ID |
| GET | `/messages/conversations/:id/details` | 404 | Conversation participant info unavailable |
| POST | `/messages/conversations/:id/block` | 404 | Route missing or incorrectly named |
| POST | `/messages/conversations/:id/unblock` | 404 | Route missing |
| PATCH | `/messages/conversations/:id/mute` | 404 | Route missing |

### 4. Post Interactions
| Method | Endpoint | Error | Observed Backend Response / Issue |
| :--- | :--- | :--- | :--- |
| POST | `/posts/:id/like` | 500 | Intermittent failure on like toggle |
| POST | `/posts/:id/report` | 400 | `{"status":"error","message":"Invalid report data"}` |
| PUT | `/posts/:id/toggle-comments` | 500 | Server error when disabling/enabling comments |
| PUT | `/posts/:id/hide-likes` | 500 | Server error toggle |

### 5. Help & Support
| Method | Endpoint | Error | Observed Backend Response / Issue |
| :--- | :--- | :--- | :--- |
| POST | `/help/feedback` | 500 | `{"status":"error","message":"null"}` |
| GET | `/help/article/:slug` | 404 | Content missing from help database |
| GET | `/help/violations` | 404 | Policy compliance routes missing |

---

## 🛠 Actionable Recommendations
1. **Database Relations**: The high frequency of 500 errors on `followers`, `following`, `posts`, and `reels` suggests a missing model association or an unhandled null in the User retrieval logic.
2. **Route naming**: Standardize the messaging routes. The frontend expects `/messages/conversations/:id/messages` but it seems the backend might have named these differently or they are not yet implemented in the `routes.js` files.
3. **Reset Password**: `POST /auth/reset-password/request` is returning a 404. This is a critical security flow that needs implementation.
