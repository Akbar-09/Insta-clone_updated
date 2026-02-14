# 📉 API Documentation Gap Analysis

**Date:** February 13, 2026
**Service:** user-service
**Discrepancy:** 92 implemented endpoints vs 4 documents endpoints.

## ❓ Why the Discrepancy?

The reason for this difference is that **Swagger documentation in this project is manually maintained** in the API Gateway (`backend/gateway/src/swagger/definitions.js`), while the actual endpoints are implemented in the `user-service` code across multiple files. The documentation has simply fallen behind the development.

## 📂 Code Implementation vs Documentation

| Source | File Path | Endpoint Count | Status |
|--------|-----------|----------------|--------|
| **Manual Docs** | `gateway/src/swagger/definitions.js` | **4** | ⚠️ Severely Outdated |
| **Actual Code** | `user-service/routes/profileRoutes.js` | ~65 | ✅ Implemented |
| **Actual Code** | `user-service/routes/internalRoutes.js` | ~20 | ✅ Implemented |
| **Actual Code** | `user-service/routes/followRoutes.js` | ~8 | ✅ Implemented |

## 🚫 Missing Endpoints in Swagger

The following categories of APIs are fully implemented in the code but **missing from Swagger**:

### 1. Settings & Preferences (Missing ~15 endpoints)
- `GET /users/profile/settings/general`
- `GET /users/profile/settings/privacy`
- `GET /users/profile/settings/notifications`
- `GET /users/profile/settings/blocked-users`
- `GET /users/profile/settings/close-friends`
- ...and more

### 2. Profile Management (Missing ~10 endpoints)
- `PUT /users/profile/me` (Update profile)
- `POST /users/profile/profile-photo`
- `DELETE /users/profile/profile-photo`
- `GET /users/profile/saved`
- `GET /users/profile/activity`

### 3. Interaction Features (Missing ~10 endpoints)
- `POST /users/profile/close-friends/:id`
- `DELETE /users/profile/close-friends/:id`
- `POST /users/profile/block/:id`
- `DELETE /users/profile/unblock/:id`
- `POST /users/profile/report-problem`

### 4. Internal & Admin APIs (Missing ~20 endpoints)
- `GET /users/internal/stats`
- `GET /users/internal/growth`
- `GET /users/internal/reports`
- `PATCH /users/internal/:id/ban`

## 🛠️ How to Fix

To make the Swagger documentation match the code, we need to update `backend/gateway/src/swagger/definitions.js` to include definitions for all the missing endpoints found in `user-service/routes/profileRoutes.js`.

Would you like me to start adding these missing definitions to the Swagger file?
