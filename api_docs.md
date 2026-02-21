# Jaadoe Social Network - API Documentation

This document provides a comprehensive reference for all microservice APIs available in the Jaadoe project. All requests are routed through the central **API Gateway**.

## 📊 Backend Overview
- **Total API Endpoints**: **388**
- **Microservices**: 15 (Auth, User, Post, Story, Reel, Comment, Feed, Notification, Search, Message, Socket, Media, Ad, Live, Admin)
- **Centralized Documentation**: [http://192.168.1.4:5000/api-docs](http://192.168.1.4:5000/api-docs)

## 🌐 Gateway Configuration
- **Base URL**: `http://192.168.1.4:5000/api/v1`
- **Socket.io**: `ws://192.168.1.4:5000` (Proxied to Port 5011)

---

## 📦 Microservices Architecture

| Service Name | Port | Description |
|---|---|---|
| **Gateway** | 5000 | Central API Gateway and Proxy |
| **Auth Service** | 5001 | Authentication & User Registration |
| **User Service** | 5002 | User Profiles, Follows, Blocks |
| **Post Service** | 5003 | Posts, Likes, Saves |
| **Story Service** | 5004 | User Stories |
| **Reel Service** | 5005 | Short-form Video Reels |
| **Comment Service** | 5006 | Comments on Posts/Reels |
| **Feed Service** | 5007 | Personalized Feed Algorithms |
| **Notification** | 5008 | User Notifications |
| **Search Service** | 5009 | Search Functionality |
| **Message Service** | 5010 | Direct Messages |
| **Socket Service** | 5011 | Real-time WebSocket Events |
| **Media Service** | 5013 | File Uploads & processing |
| **Ad Service** | 5014 | Advertisement Management |
| **Live Service** | 5015 | Live Streaming |
| **Admin Service** | 5016 | Administration Panel Backend |
| **Insight Service**| 5017 | Analytics & Insights |
| **Help Service** | 5060 | Help Center Articles |

---

## 🏗️ Service Breakdown

### 📸 Content & Social
- **Posts (`/posts`)**: 38 endpoints (Feed, Explore, Likes, Bookmarks, Reports, Activity)
- **Stories (`/stories`)**: 21 endpoints (Live Stories, Archive, Highlights, Replies, Reactions)
- **Reels (`/reels`)**: 22 endpoints (Feed, Likes, Upload, Activity)
- **Comments (`/comments`)**: 15 endpoints (Threading, Likes, Moderation, Batch Checks)
- **Feed (`/feed`)**: 1 endpoint (Personalized Algorithmic Feed)

### 👥 User & Identity
- **Auth (`/auth`)**: 10 endpoints (Signup, Login, Logout, Session Verification)
- **Users (`/users`)**: 93 endpoints (Profile Management, Follow System, Close Friends, Privacy Settings, Block/Mute, Help Center)

### 💬 Communication & Alerts
- **Messages (`/messages`)**: 16 endpoints (Conversations, Direct Messaging, Seen Status, Story Replies)
- **Notifications (`/notifications`)**: 9 endpoints (Global Alerts, Settings, Unread Counts, Mark as Read)
- **Socket (`/socket.io`)**: Real-time event orchestration (No REST endpoints)

### 🛠️ Platform & Maintenance
- **Search (`/search`)**: 2 endpoints (Global search, User search)
- **Media (`/media`)**: 5 endpoints (Centralized Multipart Upload)
- **Ads (`/ads`)**: 22 endpoints (Campaign management, Impressions, Click Tracking)
- **Live (`/live`)**: 8 endpoints (Session creation, Live feeds, Real-time comments, Webhooks)
- **Admin (`/admin`)**: 109 endpoints (Full system governance, Role management, Analytics, CMS, Audit Logs, Moderation)

---

## ✅ API Test Status (Latest: 2026-02-16)
Automated testing conducted using custom `curl` suite.
- **Total Endpoints Tested**: 388
- **Reachable/Working**: 285 (73.5%)
- **Identified Issues**: 103 endpoints returned 500/404/400 errors, mostly due to missing test resources (e.g. non-existent comments/posts for deletion tests).
- **Corrective Actions**: Fixed critical 500 errors in Auth, Admin, and Report services (audit logging and input validation).
- **Documentation Status**: Swagger UI (`backend/gateway/src/swagger/auto_generated.js`) verified and synchronized with all 388 endpoints (plus 1 tag definition block).
