# Jaadoe Social Network - API Documentation

This document provides a comprehensive reference for all microservice APIs available in the Jaadoe project. All requests are routed through the central **API Gateway**.

## 🌐 Gateway Configuration
- **Base URL**: `http://localhost:5000/api/v1`
- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **Status Check**: `GET /health`

---

## 🔑 Authentication Service (`/auth`)
Port: 5001

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Register a new user | No |
| `POST` | `/login` | Authenticate and receive JWT | No |
| `POST` | `/logout` | Invalidate current session | Yes |
| `GET` | `/check-username` | Check username availability | No |

---

## 👤 User Service (`/users`)
Port: 5002

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile/me` | Get current user profile |
| `PUT` | `/profile/me` | Update profile details |
| `GET` | `/profile/:username` | View another user's profile |
| `POST` | `/:userId/follow` | Follow a user |
| `DELETE` | `/:userId/follow` | Unfollow a user |
| `POST` | `/profile/report-problem` | Submit a quality/bug report |

---

## 📸 Content Services
### Posts (`/posts`) - Port 5003
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create a new post (image/video) |
| `GET` | `/` | Get main feed |
| `GET` | `/explore` | Get trending content |
| `POST` | `/:id/like` | Like a post |
| `POST` | `/:id/bookmark` | Save post |

### Reels (`/reels`) - Port 5005
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get reels feed |
| `POST` | `/:id/like` | Like a reel |

### Stories (`/stories`) - Port 5004
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create a story |
| `GET` | `/` | Get active stories of followed users |

---

## 💬 Communication & Social
### Messages (`/messages`) - Port 5010
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/conversations` | List user chats |
| `POST` | `/send` | Send a direct message |

### Comments (`/comments`) - Port 5006
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Add comment to a post |
| `GET` | `?postId=...` | List comments for a post |

---

## 🛡️ Admin Service (`/admin`) - [NEW]
Port: 5016 | **Requires Admin Role Token**

### 🔐 Auth & Roles
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Admin specific login |
| `GET` | `/auth/roles` | View available RBAC roles |
| `PATCH`| `/auth/admins/:id/role` | Update admin permissions |

### 👥 User Governance
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | List all system users |
| `GET` | `/users/:userId` | View full user drill-down |
| `PATCH`| `/users/:userId/ban` | Permanent account ban |
| `PATCH`| `/users/:userId/verify` | Assign blue checkmark |

### ⚖️ Moderation
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/moderation/posts` | List global posts for review |
| `DELETE`| `/moderation/posts/:id` | Administrative post deletion |
| `PATCH` | `/moderation/posts/:id/hide`| Shadow-remove content |
| `GET` | `/reports` | List user-submitted reports |

### 📊 Analytics & System
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/dashboard/kpis` | Platform metrics summary |
| `GET` | `/analytics/countries` | Regional distribution |
| `POST` | `/notifications/global` | Send broadcast notification |
| `GET` | `/audit` | View full administrative log |

---

## 📡 Specialized Services
- **Search (`/search`)**: Port 5009 | `GET /?q=...`
- **Media (`/media`)**: Port 5013 | `POST /upload`
- **Notification (`/notifications`)**: Port 5008 | User alerts
- **Live (`/live`)**: Port 5015 | Streaming orchestration
- **Ads (`/ads`)**: Port 5014 | Ad impressions & conversion tracking
