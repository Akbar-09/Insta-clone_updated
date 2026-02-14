# Jaadoe Social Network - API Documentation

This document provides a comprehensive reference for all microservice APIs available in the Jaadoe project. All requests are routed through the central **API Gateway**.

## 📊 Backend Overview
- **Total API Endpoints**: **333**
- **Microservices**: 15 (Auth, User, Post, Story, Reel, Comment, Feed, Notification, Search, Message, Socket, Media, Ad, Live, Admin)
- **Centralized Documentation**: [http://192.168.1.15:5000/api-docs](http://192.168.1.15:5000/api-docs)

## 🌐 Gateway Configuration
- **Base URL**: `http://192.168.1.15:5000/api/v1`
- **Socket.io**: `ws://192.168.1.15:5000` (Proxied to Port 5011)

---

## 🏗️ Service Breakdown

### 📸 Content & Social
- **Posts (`/posts`)**: 37 endpoints (Feed, Explore, Likes, Bookmarks, Reports, Activity)
- **Stories (`/stories`)**: 21 endpoints (Live Stories, Archive, Highlights, Replies, Reactions)
- **Reels (`/reels`)**: 17 endpoints (Feed, Likes, Upload, Activity)
- **Comments (`/comments`)**: 15 endpoints (Threading, Likes, Moderation, Batch Checks)
- **Feed (`/feed`)**: 1 endpoint (Personalized Algorithmic Feed)

### 👥 User & Identity
- **Auth (`/auth`)**: 10 endpoints (Signup, Login, Logout, Session Verification)
- **Users (`/users`)**: 92 endpoints (Profile Management, Follow System, Close Friends, Privacy Settings, Block/Mute, Help Center)

### 💬 Communication & Alerts
- **Messages (`/messages`)**: 10 endpoints (Conversations, Direct Messaging, Seen Status, Story Replies)
- **Notifications (`/notifications`)**: 9 endpoints (Global Alerts, Settings, Unread Counts, Mark as Read)
- **Socket (`/socket.io`)**: Real-time event orchestration (No REST endpoints)

### 🛠️ Platform & Maintenance
- **Search (`/search`)**: 2 endpoints (Global search, User search)
- **Media (`/media`)**: 1 endpoint (Centralized Multipart Upload)
- **Ads (`/ads`)**: 5 endpoints (Campaign management, Impressions, Click Tracking)
- **Live (`/live`)**: 6 endpoints (Session creation, Live feeds, Real-time comments, Webhooks)
- **Admin (`/admin`)**: 107 endpoints (Full system governance, Role management, Analytics, CMS, Audit Logs, Moderation)

---

## ✅ API Test Status (Latest: 2026-02-05)
Core endpoints for all 15 services are functional.
- **Verified Ends**: 28 Core endpoints verified via manual `curl` suite.
- **Pass Rate**: 100%
- **Documentation Status**: Swagger UI updated with missing Comment, Feed, Live, Story, and Notification endpoints.
