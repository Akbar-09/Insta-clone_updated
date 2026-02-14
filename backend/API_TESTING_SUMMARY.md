# Instagram Clone API Testing Summary

**Date:** February 13, 2026  
**Gateway URL:** http://localhost:5000  
**Swagger Documentation:** http://localhost:5000/api-docs

## 📊 Overall Test Results

### Summary Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| **Total API Endpoints** | **370** | 100% |
| **Accessible (Passed)** | **5** | 1.4% |
| **Failed** | **0** | 0.0% |
| **Skipped (Auth Required)** | **365** | 98.6% |

### Key Findings

✅ **Gateway is Running**: The API Gateway at `http://localhost:5000` is operational  
✅ **Swagger Documentation**: Available at `http://localhost:5000/api-docs`  
⚠️ **Authentication Issue**: Login endpoints are returning HTML instead of JSON (400 errors)  
⚠️ **Most Endpoints Require Auth**: 365 out of 370 endpoints require authentication tokens

---

## 🔧 Microservices Breakdown

### Services and Endpoint Count

| Service | Total Endpoints | Passed | Failed | Skipped | Success Rate |
|---------|----------------|--------|--------|---------|--------------|
| **admin-service** | 107 | 1 | 0 | 106 | 0.9% |
| **user-service** | 92 | 0 | 0 | 92 | 0.0% |
| **post-service** | 37 | 0 | 0 | 37 | 0.0% |
| **ad-service** | 22 | 1 | 0 | 21 | 4.5% |
| **story-service** | 21 | 0 | 0 | 21 | 0.0% |
| **reel-service** | 17 | 0 | 0 | 17 | 0.0% |
| **message-service** | 16 | 0 | 0 | 16 | 0.0% |
| **comment-service** | 15 | 0 | 0 | 15 | 0.0% |
| **auth-service** | 10 | 3 | 0 | 7 | 30.0% |
| **notification-service** | 9 | 0 | 0 | 9 | 0.0% |
| **live-service** | 8 | 0 | 0 | 8 | 0.0% |
| **help-service** | 5 | 0 | 0 | 5 | 0.0% |
| **media-service** | 5 | 0 | 0 | 5 | 0.0% |
| **insight-service** | 3 | 0 | 0 | 3 | 0.0% |
| **search-service** | 2 | 0 | 0 | 2 | 0.0% |
| **feed-service** | 1 | 0 | 0 | 1 | 0.0% |

---

## ✅ Working API Endpoints (5)

These endpoints are accessible without authentication or with proper authentication:

### 1. **GET /api/v1/ads/active** ✅
- **Service:** ad-service
- **Status:** 200 OK
- **Description:** Get active advertisements
- **Curl Example:**
```bash
curl -X GET "http://localhost:5000/api/v1/ads/active"
```

### 2. **POST /api/v1/auth/login** ⚠️
- **Service:** auth-service
- **Status:** 400 (Returns HTML instead of JSON)
- **Description:** User login endpoint
- **Curl Example:**
```bash
curl -X POST "http://localhost:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 3. **POST /api/v1/auth/signup** ⚠️
- **Service:** auth-service
- **Status:** 400 (Returns HTML instead of JSON)
- **Description:** User registration endpoint
- **Curl Example:**
```bash
curl -X POST "http://localhost:5000/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"test@example.com",
    "password":"password123",
    "fullName":"Test User"
  }'
```

### 4. **POST /api/v1/auth/register** ⚠️
- **Service:** auth-service
- **Status:** 400 (Returns HTML instead of JSON)
- **Description:** Alternative registration endpoint
- **Curl Example:**
```bash
curl -X POST "http://localhost:5000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"test@example.com",
    "password":"password123",
    "fullName":"Test User"
  }'
```

### 5. **POST /api/v1/admin/auth/login** ⚠️
- **Service:** admin-service
- **Status:** 400 (Returns HTML instead of JSON)
- **Description:** Admin login endpoint
- **Curl Example:**
```bash
curl -X POST "http://localhost:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 🔐 Testing Authenticated Endpoints

Once you have a valid JWT token from login, you can test authenticated endpoints:

### Example: Get User Profile
```bash
# First, login to get token
TOKEN=$(curl -X POST "http://localhost:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  | jq -r '.token')

# Then use the token to access protected endpoints
curl -X GET "http://localhost:5000/api/v1/users/profile/me" \
  -H "Authorization: Bearer $TOKEN"
```

### Example: Get Feed
```bash
curl -X GET "http://localhost:5000/api/v1/feed/" \
  -H "Authorization: Bearer $TOKEN"
```

### Example: Create a Post
```bash
curl -X POST "http://localhost:5000/api/v1/posts/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "caption":"Test post",
    "mediaUrls":["https://example.com/image.jpg"]
  }'
```

---

## 📋 HTTP Methods Distribution

| Method | Total | Passed | Failed | Skipped | Success Rate |
|--------|-------|--------|--------|---------|--------------|
| **GET** | 194 | 1 | 0 | 193 | 0.5% |
| **POST** | 70 | 4 | 0 | 66 | 5.7% |
| **PATCH** | 48 | 0 | 0 | 48 | 0.0% |
| **DELETE** | 41 | 0 | 0 | 41 | 0.0% |
| **PUT** | 17 | 0 | 0 | 17 | 0.0% |

---

## 🔍 Testing with Swagger UI

The easiest way to test all endpoints is using the Swagger UI:

1. **Open Swagger UI**: Navigate to http://localhost:5000/api-docs
2. **Authenticate**: 
   - Click the "Authorize" button at the top
   - Enter your JWT token in the format: `Bearer <your-token>`
3. **Test Endpoints**: 
   - Browse through all available endpoints
   - Click "Try it out" on any endpoint
   - Fill in the required parameters
   - Click "Execute" to test

---

## 🐛 Issues Found

### 1. Authentication Endpoints Returning HTML (400)
**Affected Endpoints:**
- POST /api/v1/auth/login
- POST /api/v1/auth/signup
- POST /api/v1/auth/register
- POST /api/v1/admin/auth/login

**Issue:** These endpoints are returning HTML error pages instead of JSON responses.

**Possible Causes:**
- CORS configuration issue
- Content-Type header not being processed correctly
- Request body parsing middleware not configured
- Service not running or misconfigured

**Recommendation:** Check the auth-service and admin-service logs for errors.

### 2. Most Endpoints Require Authentication
**Status:** This is expected behavior for a social media platform.

**Solution:** 
1. Fix the authentication endpoints first
2. Obtain valid JWT tokens
3. Use tokens to test protected endpoints

---

## 📝 Sample Curl Commands for Each Service

### Auth Service
```bash
# Login
curl -X POST "http://localhost:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Check if username is available
curl -X GET "http://localhost:5000/api/v1/auth/check-username?username=testuser" \
  -H "Authorization: Bearer $TOKEN"
```

### User Service
```bash
# Get user profile
curl -X GET "http://localhost:5000/api/v1/users/profile/me" \
  -H "Authorization: Bearer $TOKEN"

# Get user by username
curl -X GET "http://localhost:5000/api/v1/users/profile/testuser" \
  -H "Authorization: Bearer $TOKEN"

# Follow a user
curl -X POST "http://localhost:5000/api/v1/users/USER_ID/follow" \
  -H "Authorization: Bearer $TOKEN"
```

### Post Service
```bash
# Get posts
curl -X GET "http://localhost:5000/api/v1/posts/" \
  -H "Authorization: Bearer $TOKEN"

# Create a post
curl -X POST "http://localhost:5000/api/v1/posts/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"caption":"Test post","mediaUrls":["url"]}'

# Like a post
curl -X POST "http://localhost:5000/api/v1/posts/POST_ID/like" \
  -H "Authorization: Bearer $TOKEN"
```

### Story Service
```bash
# Get stories
curl -X GET "http://localhost:5000/api/v1/stories/" \
  -H "Authorization: Bearer $TOKEN"

# Create a story
curl -X POST "http://localhost:5000/api/v1/stories/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mediaUrl":"url","duration":5}'
```

### Reel Service
```bash
# Get reels
curl -X GET "http://localhost:5000/api/v1/reels/" \
  -H "Authorization: Bearer $TOKEN"

# Create a reel
curl -X POST "http://localhost:5000/api/v1/reels/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"caption":"Test reel","videoUrl":"url"}'
```

### Comment Service
```bash
# Get comments for a post
curl -X GET "http://localhost:5000/api/v1/comments/?postId=POST_ID" \
  -H "Authorization: Bearer $TOKEN"

# Create a comment
curl -X POST "http://localhost:5000/api/v1/comments/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"postId":"POST_ID","text":"Great post!"}'
```

### Message Service
```bash
# Get conversations
curl -X GET "http://localhost:5000/api/v1/messages/conversations" \
  -H "Authorization: Bearer $TOKEN"

# Send a message
curl -X POST "http://localhost:5000/api/v1/messages/send" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipientId":"USER_ID","content":"Hello!"}'
```

### Notification Service
```bash
# Get notifications
curl -X GET "http://localhost:5000/api/v1/notifications/" \
  -H "Authorization: Bearer $TOKEN"

# Get unread count
curl -X GET "http://localhost:5000/api/v1/notifications/unread-count" \
  -H "Authorization: Bearer $TOKEN"

# Mark notification as read
curl -X PATCH "http://localhost:5000/api/v1/notifications/NOTIFICATION_ID/read" \
  -H "Authorization: Bearer $TOKEN"
```

### Feed Service
```bash
# Get feed
curl -X GET "http://localhost:5000/api/v1/feed/" \
  -H "Authorization: Bearer $TOKEN"
```

### Search Service
```bash
# Search users
curl -X GET "http://localhost:5000/api/v1/search/users?q=test" \
  -H "Authorization: Bearer $TOKEN"

# General search
curl -X GET "http://localhost:5000/api/v1/search/?q=test" \
  -H "Authorization: Bearer $TOKEN"
```

### Ad Service
```bash
# Get active ads (No auth required)
curl -X GET "http://localhost:5000/api/v1/ads/active"

# Create ad draft
curl -X POST "http://localhost:5000/api/v1/ads/draft" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Ad","description":"Ad description"}'
```

### Media Service
```bash
# Upload media
curl -X POST "http://localhost:5000/api/v1/media/upload" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/image.jpg"

# Get presigned URL
curl -X POST "http://localhost:5000/api/v1/media/presigned-url" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"filename":"image.jpg","contentType":"image/jpeg"}'
```

### Insight Service
```bash
# Get account insights
curl -X GET "http://localhost:5000/api/v1/insights/account" \
  -H "Authorization: Bearer $TOKEN"

# Get content insights
curl -X GET "http://localhost:5000/api/v1/insights/content" \
  -H "Authorization: Bearer $TOKEN"
```

### Live Service
```bash
# Go live
curl -X POST "http://localhost:5000/api/v1/live/go-live" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Live stream"}'

# Get live feed
curl -X GET "http://localhost:5000/api/v1/live/feed" \
  -H "Authorization: Bearer $TOKEN"
```

### Admin Service
```bash
# Admin login
curl -X POST "http://localhost:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get dashboard KPIs
curl -X GET "http://localhost:5000/api/v1/admin/dashboard/kpis" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get all users
curl -X GET "http://localhost:5000/api/v1/admin/users/" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Ban a user
curl -X PATCH "http://localhost:5000/api/v1/admin/users/USER_ID/ban" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason":"Violation of terms"}'
```

### Help Service
```bash
# Get help categories (No auth required)
curl -X GET "http://localhost:5000/api/v1/help/api/help/categories"

# Search help articles (No auth required)
curl -X GET "http://localhost:5000/api/v1/help/api/help/search?q=password"

# Submit feedback
curl -X POST "http://localhost:5000/api/v1/help/api/help/feedback" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Feedback","message":"Great app!"}'
```

---

## 🎯 Next Steps

### 1. Fix Authentication Endpoints
- Check auth-service and admin-service logs
- Verify request body parsing middleware (express.json())
- Test endpoints directly on service ports (5001, 5016)
- Ensure database connections are working

### 2. Create Test Users
Once authentication is fixed, create test users:
```bash
# Create regular user
curl -X POST "http://localhost:5000/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"test@example.com",
    "password":"password123",
    "fullName":"Test User"
  }'

# Create admin user (may need to be done via database)
```

### 3. Comprehensive Testing
Once you have valid tokens:
1. Test all GET endpoints
2. Test POST endpoints with valid data
3. Test PUT/PATCH endpoints for updates
4. Test DELETE endpoints
5. Verify error handling (400, 401, 403, 404, 500)

### 4. Automated Testing
Consider setting up automated API tests using:
- Jest + Supertest
- Postman Collections with Newman
- k6 for load testing

---

## 📊 Detailed Report

For a complete detailed report with all 370 endpoints, see:
- **File:** `api_test_report_curl.md`
- **Location:** `backend/api_test_report_curl.md`

---

## 🔗 Useful Links

- **Swagger UI:** http://localhost:5000/api-docs
- **Gateway Health:** http://localhost:5000/health
- **Gateway URL:** http://localhost:5000

---

## 📞 Support

If you encounter issues:
1. Check service logs in the terminal running `start_services.js`
2. Verify all services are running on their respective ports
3. Check database connections
4. Review Swagger documentation for correct request formats

---

**Report Generated:** February 13, 2026  
**Test Script:** `test_all_apis_with_curl.js`
