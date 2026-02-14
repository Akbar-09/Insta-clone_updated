# Instagram Clone API Documentation

**Base URL:** `http://192.168.1.15:5000`
**Auth:** Most endpoints require a JWT token in the `Authorization` header as `Bearer <token>`.

## Table of Contents
- [ad-service](#ad-service)
- [admin-service](#admin-service)
- [auth-service](#auth-service)
- [comment-service](#comment-service)
- [feed-service](#feed-service)
- [help-service](#help-service)
- [insight-service](#insight-service)
- [live-service](#live-service)
- [media-service](#media-service)
- [message-service](#message-service)
- [notification-service](#notification-service)
- [post-service](#post-service)
- [reel-service](#reel-service)
- [search-service](#search-service)
- [story-service](#story-service)
- [user-service](#user-service)

---

## ad-service

### POST /
**Endpoint:** `POST /api/v1/ads`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### DELETE /:id/comments/:commentId
**Endpoint:** `DELETE /api/v1/ads/:id/comments/:commentId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/ads/:id/comments/:commentId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_comment_id\""}
```

---

### POST /:id/comments
**Endpoint:** `POST /api/v1/ads/:id/comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### GET /:id/comments
**Endpoint:** `GET /api/v1/ads/:id/comments`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/ads/:id/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /:id/bookmark
**Endpoint:** `POST /api/v1/ads/:id/bookmark`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /:id/like
**Endpoint:** `POST /api/v1/ads/:id/like`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### GET /:id/embed
**Endpoint:** `GET /api/v1/ads/:id/embed`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/ads/:id/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id/toggle-comments
**Endpoint:** `PUT /api/v1/ads/:id/toggle-comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id/hide-likes
**Endpoint:** `PUT /api/v1/ads/:id/hide-likes`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id
**Endpoint:** `PUT /api/v1/ads/:id`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### DELETE /:id
**Endpoint:** `DELETE /api/v1/ads/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/ads/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /click
**Endpoint:** `POST /api/v1/ads/click`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/click" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"notNull Violation: AdClick.adId cannot be null"}
```

---

### POST /impression
**Endpoint:** `POST /api/v1/ads/impression`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/impression" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"notNull Violation: AdImpression.adId cannot be null"}
```

---

### GET /active
**Endpoint:** `GET /api/v1/ads/active`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/ads/active" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":"7abd623f-c3cf-4b03-9e22-3c4cdef367bc","userId":51,"title":"","caption":"","ctaText":"Learn More","destinationUrl":"","adType":"BOOST_CONTENT","status":"ACTIVE","hide
```

---

### GET /eligible-content
**Endpoint:** `GET /api/v1/ads/eligible-content`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/ads/eligible-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"posts":[],"reels":[],"stories":[]}}
```

---

### POST /:id/publish
**Endpoint:** `POST /api/v1/ads/:id/publish`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id/budget
**Endpoint:** `PUT /api/v1/ads/:id/budget`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id/budget" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id/targeting
**Endpoint:** `PUT /api/v1/ads/:id/targeting`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id/targeting" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### PUT /:id/details
**Endpoint:** `PUT /api/v1/ads/:id/details`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/ads/:id/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /:id/boost-content
**Endpoint:** `POST /api/v1/ads/:id/boost-content`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/boost-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /:id/media
**Endpoint:** `POST /api/v1/ads/:id/media`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/:id/media" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}
```

---

### POST /draft
**Endpoint:** `POST /api/v1/ads/draft`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/ads/draft" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"success","data":{"id":"fa4354ab-230a-48b5-abcc-3f4735b068e2","hideLikes":false,"commentsDisabled":false,"userId":76,"adType":"NEW_MEDIA","status":"DRAFT","updatedAt":"2026-02-11T05:02:31.89
```

---

## admin-service

### GET /:userId/reels
**Endpoint:** `GET /api/v1/admin/users/:userId/reels`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users/:userId/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/posts
**Endpoint:** `GET /api/v1/admin/users/:userId/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users/:userId/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/following
**Endpoint:** `GET /api/v1/admin/users/:userId/following`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users/:userId/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/followers
**Endpoint:** `GET /api/v1/admin/users/:userId/followers`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users/:userId/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/details
**Endpoint:** `GET /api/v1/admin/users/:userId/details`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users/:userId/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccountS
```

---

### DELETE /:userId
**Endpoint:** `DELETE /api/v1/admin/users/:userId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/users/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"message":"User soft deleted"}
```

---

### PATCH /:userId/unban
**Endpoint:** `PATCH /api/v1/admin/users/:userId/unban`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/users/:userId/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":true,"message":"User unbanned"}
```

---

### PATCH /:userId/ban
**Endpoint:** `PATCH /api/v1/admin/users/:userId/ban`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/users/:userId/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":true,"message":"User banned"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### PUT /
**Endpoint:** `PUT /api/v1/admin/settings`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/admin/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/settings`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### PUT /profile
**Endpoint:** `PUT /api/v1/admin/settings/profile`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":true,"message":"Profile updated","data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","password":"$2b$10$FL9tBjgpJn4pGPeN7wt91.zVnS3ZvOIaO4nfjdZ2HZrvEn8GiSWiO",
```

---

### GET /profile
**Endpoint:** `GET /api/v1/admin/settings/profile`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","roleId":1}}
```

---

### POST /:id/ban-user
**Endpoint:** `POST /api/v1/admin/reports/:id/ban-user`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/reports/:id/ban-user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### POST /:id/ignore
**Endpoint:** `POST /api/v1/admin/reports/:id/ignore`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/reports/:id/ignore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /:id
**Endpoint:** `GET /api/v1/admin/reports/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/reports/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/reports`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/admin/reports/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"pending":4,"underReview":0,"resolvedToday":0}}
```

---

### GET /reels
**Endpoint:** `GET /api/v1/admin/reels`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /reels</pre> </body> </html>
```

---

### GET /posts
**Endpoint:** `GET /api/v1/admin/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /posts</pre> </body> </html>
```

---

### DELETE /comments/:commentId
**Endpoint:** `DELETE /api/v1/admin/comments/:commentId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/comments/:commentId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### DELETE /stories/:storyId
**Endpoint:** `DELETE /api/v1/admin/stories/:storyId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/stories/:storyId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /stories/temp_story_id</pre> </body> </html>
```

---

### DELETE /reels/:reelId
**Endpoint:** `DELETE /api/v1/admin/reels/:reelId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/reels/:reelId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /reels/temp_reel_id</pre> </body> </html>
```

---

### PATCH /posts/:postId/hide
**Endpoint:** `PATCH /api/v1/admin/posts/:postId/hide`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/posts/:postId/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot PATCH /posts/temp_post_id/hide</pre> </body> </html>
```

---

### DELETE /posts/:postId
**Endpoint:** `DELETE /api/v1/admin/posts/:postId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/posts/:postId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /posts/temp_post_id</pre> </body> </html>
```

---

### POST /
**Endpoint:** `POST /api/v1/admin/default-avatars`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/default-avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/default-avatars`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/default-avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### PATCH /:id/set-default
**Endpoint:** `PATCH /api/v1/admin/languages/:id/set-default`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/languages/:id/set-default" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Language not found"}
```

---

### PATCH /:id/disable
**Endpoint:** `PATCH /api/v1/admin/languages/:id/disable`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/languages/:id/disable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Language not found"}
```

---

### PATCH /:id/enable
**Endpoint:** `PATCH /api/v1/admin/languages/:id/enable`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/languages/:id/enable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Language not found"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/languages`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/languages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### POST /feature
**Endpoint:** `POST /api/v1/admin/feature`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/feature" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot POST /feature</pre> </body> </html>
```

---

### PATCH /:id/block
**Endpoint:** `PATCH /api/v1/admin/:id/block`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/:id/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot PATCH /76/block</pre> </body> </html>
```

---

### GET /trending
**Endpoint:** `GET /api/v1/admin/trending`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /trending</pre> </body> </html>
```

---

### GET /
**Endpoint:** `GET /api/v1/admin`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### DELETE /:id
**Endpoint:** `DELETE /api/v1/admin/hashtags/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/hashtags/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Hashtag not found"}
```

---

### PATCH /:id/toggle-visibility
**Endpoint:** `PATCH /api/v1/admin/hashtags/:id/toggle-visibility`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/hashtags/:id/toggle-visibility" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Hashtag not found"}
```

---

### GET /trending
**Endpoint:** `GET /api/v1/admin/hashtags/trending`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/hashtags/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":9,"name":"#fashion","status":"active","isTrending":true,"deleted":false,"postsCount":8900,"reelsCount":2100,"created_at":"2026-02-04T10:20:48.143Z","updated_at":"2026-02-
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/hashtags`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/hashtags" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /geo-users
**Endpoint:** `GET /api/v1/admin/analytics/geo-users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/geo-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"countries":[{"code":"UN","name":"Unknown","users":276}],"summary":{"totalCountries":1,"totalUsers":276,"topCountry":{"code":"UN","name":"Unknown","users":276}}}}
```

---

### GET /performance-metrics
**Endpoint:** `GET /api/v1/admin/explore/performance-metrics`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/explore/performance-metrics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"impressions":17843069,"impressionsChange":5,"ctr":11.8,"ctrChange":0.5,"avgWatchTime":0,"watchTimeChange":0,"engagementRate":11.8,"engagementChange":1.2}}
```

---

### GET /category-distribution
**Endpoint:** `GET /api/v1/admin/explore/category-distribution`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/explore/category-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"category":"fashion","percentage":41},{"category":"art","percentage":25},{"category":"photography","percentage":16},{"category":"travel","percentage":10},{"category":"fitness"
```

---

### DELETE /trending-topics/:topicId
**Endpoint:** `DELETE /api/v1/admin/explore/trending-topics/:topicId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/explore/trending-topics/:topicId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type integer: \":topicId\""}
```

---

### POST /trending-topics
**Endpoint:** `POST /api/v1/admin/explore/trending-topics`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Topic is required"}
```

---

### GET /trending-topics
**Endpoint:** `GET /api/v1/admin/explore/trending-topics`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":6,"topic":"#fitness","created_at":"2026-02-04T11:18:24.988Z"}]}
```

---

### PATCH /algorithm
**Endpoint:** `PATCH /api/v1/admin/explore/algorithm`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":true,"message":"Algorithm updated successfully","data":{"id":1,"updated_at":"2026-02-11T05:02:39.596Z"}}
```

---

### GET /algorithm
**Endpoint:** `GET /api/v1/admin/explore/algorithm`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"id":1,"freshnessWeight":70,"engagementWeight":60,"relevanceWeight":80,"locationWeight":40,"updated_at":"2026-02-11T05:02:39.596Z"}}
```

---

### PATCH /:conversationId/flag
**Endpoint:** `PATCH /api/v1/admin/messages/:conversationId/flag`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/messages/:conversationId/flag" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violation: AuditLog.targetType cannot be null"}
```

---

### GET /reported
**Endpoint:** `GET /api/v1/admin/messages/reported`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/messages/reported" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1,"senderId":101,"text":"Harmful message","reportedBy":102}]}
```

---

### POST /conversations/:conversationId/ban-users
**Endpoint:** `POST /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/dm-oversight/conversations/:conversationId/ban-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /conversations/:conversationId/mark-safe
**Endpoint:** `PATCH /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /conversations/:conversationId/transcript
**Endpoint:** `GET /api/v1/admin/dm-oversight/conversations/:conversationId/transcript`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dm-oversight/conversations/:conversationId/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/admin/dm-oversight/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dm-oversight/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"highRisk":1,"underInvestigation":0,"safeCleared":7}}
```

---

### GET /conversations
**Endpoint:** `GET /api/v1/admin/dm-oversight/conversations`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dm-oversight/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":7,"user1Id":7,"user2Id":20,"lastMessageId":null,"lastMessageContent":"I will find where you live and make you regret this.","lastMessageSenderId":7,"lastMessageAt":"2026-
```

---

### GET /recent-posts
**Endpoint:** `GET /api/v1/admin/dashboard/recent-posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/recent-posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f
```

---

### GET /recent-users
**Endpoint:** `GET /api/v1/admin/dashboard/recent-users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/recent-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount
```

---

### GET /login-methods
**Endpoint:** `GET /api/v1/admin/dashboard/login-methods`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"method":"email","count":"153"},{"method":"google","count":"81"},{"method":"facebook","count":"42"}],"message":"Login methods fetched successfully"}
```

---

### GET /media-distribution
**Endpoint:** `GET /api/v1/admin/dashboard/media-distribution`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/media-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"posts":93,"reels":2,"stories":4},"message":"Media distribution data fetched successfully"}
```

---

### GET /user-growth
**Endpoint:** `GET /api/v1/admin/dashboard/user-growth`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/user-growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"month":"Jan","count":"171"},{"month":"Feb","count":"34"}],"message":"User growth data fetched successfully"}
```

---

### GET /activity-feed
**Endpoint:** `GET /api/v1/admin/dashboard/activity-feed`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/activity-feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":89,"adminId":1,"actionType":"UPDATE_ALGORITHM","targetType":"system","targetId":"1","metadata":{"title":"Test Ad","budget":100,"subType":"explore_config","duration":5},"c
```

---

### GET /kpis
**Endpoint:** `GET /api/v1/admin/dashboard/kpis`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/dashboard/kpis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"totalUsers":276,"totalPosts":1857,"activeReels":49,"pendingReports":4,"growthRates":{"users":57,"posts":46,"reels":100}},"message":"Dashboard data fetched successfully"}
```

---

### DELETE /stories/:storyId
**Endpoint:** `DELETE /api/v1/admin/moderation/stories/:storyId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/moderation/stories/:storyId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /stories/:storyId/interactions
**Endpoint:** `GET /api/v1/admin/moderation/stories/:storyId/interactions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/stories/:storyId/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /stories
**Endpoint:** `GET /api/v1/admin/moderation/stories`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":85,"userId":51,"username":"akbar","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/stories/temp_12921bca-d5a1-44aa-98d2-92994ebd7dbe_opt.webp","thumbnailUrl":n
```

---

### DELETE /reels/:reelId
**Endpoint:** `DELETE /api/v1/admin/moderation/reels/:reelId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/moderation/reels/:reelId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /reels/:reelId/unhide
**Endpoint:** `PATCH /api/v1/admin/moderation/reels/:reelId/unhide`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/moderation/reels/:reelId/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /reels/:reelId/hide
**Endpoint:** `PATCH /api/v1/admin/moderation/reels/:reelId/hide`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/moderation/reels/:reelId/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /reels/:reelId/interactions
**Endpoint:** `GET /api/v1/admin/moderation/reels/:reelId/interactions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/reels/:reelId/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /reels
**Endpoint:** `GET /api/v1/admin/moderation/reels`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou
```

---

### DELETE /posts/:postId
**Endpoint:** `DELETE /api/v1/admin/moderation/posts/:postId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/moderation/posts/:postId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /posts/:postId/unhide
**Endpoint:** `PATCH /api/v1/admin/moderation/posts/:postId/unhide`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/moderation/posts/:postId/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /posts/:postId/hide
**Endpoint:** `PATCH /api/v1/admin/moderation/posts/:postId/hide`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/moderation/posts/:postId/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /posts/:postId/interactions
**Endpoint:** `GET /api/v1/admin/moderation/posts/:postId/interactions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/posts/:postId/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /posts
**Endpoint:** `GET /api/v1/admin/moderation/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/moderation/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f
```

---

### DELETE /:commentId
**Endpoint:** `DELETE /api/v1/admin/comments/:commentId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/comments/:commentId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /:commentId/remove
**Endpoint:** `PATCH /api/v1/admin/comments/:commentId/remove`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/comments/:commentId/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /:commentId/approve
**Endpoint:** `PATCH /api/v1/admin/comments/:commentId/approve`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/comments/:commentId/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/admin/comments/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/comments/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":25,"pending":16,"flagged":2,"approvedToday":0,"removedToday":0}}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/comments`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### PATCH /pages/:id
**Endpoint:** `PATCH /api/v1/admin/cms/pages/:id`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/cms/pages/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violation: AuditLog.targetType cannot be null"}
```

---

### GET /pages
**Endpoint:** `GET /api/v1/admin/cms/pages`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/cms/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1,"title":"Terms of Service","slug":"terms","lastUpdated":"2025-01-01"},{"id":2,"title":"Privacy Policy","slug":"privacy","lastUpdated":"2025-01-01"}]}
```

---

### DELETE /:avatarId
**Endpoint:** `DELETE /api/v1/admin/avatars/:avatarId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/avatars/:avatarId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /:avatarId/reject
**Endpoint:** `PATCH /api/v1/admin/avatars/:avatarId/reject`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/avatars/:avatarId/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### PATCH /:avatarId/approve
**Endpoint:** `PATCH /api/v1/admin/avatars/:avatarId/approve`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/avatars/:avatarId/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/admin/avatars/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":0,"pending":0,"approved":0,"rejected":0}}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/avatars`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### DELETE /roles/:id
**Endpoint:** `DELETE /api/v1/admin/auth/roles/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/auth/roles/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Role not found"}
```

---

### PUT /roles/:id
**Endpoint:** `PUT /api/v1/admin/auth/roles/:id`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/admin/auth/roles/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Role not found"}
```

---

### POST /roles
**Endpoint:** `POST /api/v1/admin/auth/roles`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"notNull Violation: Role.name cannot be null"}
```

---

### GET /roles
**Endpoint:** `GET /api/v1/admin/auth/roles`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1,"name":"SuperAdmin","permissions":["all"],"description":null,"createdAt":"2026-01-31T11:31:48.956Z","updatedAt":"2026-01-31T11:31:48.956Z"},{"id":2,"name":"moderator","
```

---

### DELETE /admins/:id
**Endpoint:** `DELETE /api/v1/admin/auth/admins/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/admin/auth/admins/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"Admin not found"}
```

---

### PATCH /admins/:id/role
**Endpoint:** `PATCH /api/v1/admin/auth/admins/:id/role`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/admin/auth/admins/:id/role" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Admin not found"}
```

---

### GET /admins
**Endpoint:** `GET /api/v1/admin/auth/admins`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/auth/admins" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","roleId":1,"isActive":true,"lastLogin":"2026-02-11T05:02:28.629Z","created_at":"2026-01-31T13:19:07.0
```

---

### GET /me
**Endpoint:** `GET /api/v1/admin/auth/me`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","password":"$2b$10$FL9tBjgpJn4pGPeN7wt91.zVnS3ZvOIaO4nfjdZ2HZrvEn8GiSWiO","roleId":1,"isActive":true,"
```

---

### POST /login
**Endpoint:** `POST /api/v1/admin/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}'
```

**Sample Response:**
```json
{"success":false,"message":"Invalid credentials"}
```

---

### GET /
**Endpoint:** `GET /api/v1/admin/audit`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/audit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /active-hours
**Endpoint:** `GET /api/v1/admin/active-hours`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /active-hours</pre> </body> </html>
```

---

### GET /countries
**Endpoint:** `GET /api/v1/admin/countries`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /countries</pre> </body> </html>
```

---

### GET /active-hours
**Endpoint:** `GET /api/v1/admin/analytics/active-hours`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"peakHour":"20:00","dailyAverageActiveUsers":1500}}
```

---

### GET /countries
**Endpoint:** `GET /api/v1/admin/analytics/countries`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"name":"Unknown","count":"276"}],"message":"Country analytics fetched successfully"}
```

---

### GET /top-content
**Endpoint:** `GET /api/v1/admin/analytics/top-content`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/top-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"contentId":759,"creatorUsername":"user_demo_138_127","views":20316,"likes":1989,"engagementRate":"11.7"},{"contentId":907,"creatorUsername":"user_demo_53_25","views":20464,"l
```

---

### GET /engagement-trends
**Endpoint:** `GET /api/v1/admin/analytics/engagement-trends`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/engagement-trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"month":"Jan","engagementRate":"1256.9"},{"month":"Feb","engagementRate":"982.3"}]}
```

---

### GET /user-acquisition
**Endpoint:** `GET /api/v1/admin/analytics/user-acquisition`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/user-acquisition" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"month":"Jan","users":171},{"month":"Feb","users":34}]}
```

---

### GET /summary
**Endpoint:** `GET /api/v1/admin/analytics/summary`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/analytics/summary" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"newUsers":276,"newUsersChange":57,"avgEngagementRate":11.7,"engagementChange":0.5,"adRevenue":45200,"revenueChange":-2,"serverLoad":20,"serverStatus":"stable"}}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/admin/notifications/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/notifications/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"totalRecipients":0,"sentToday":0,"sentMonth":0}}
```

---

### GET /history
**Endpoint:** `GET /api/v1/admin/notifications/history`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/admin/notifications/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### POST /global
**Endpoint:** `POST /api/v1/admin/notifications/global`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/admin/notifications/global" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"success":false,"message":"Request failed with status code 500"}
```

---

## auth-service

### GET /history
**Endpoint:** `GET /api/v1/auth/history`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/auth/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":27,"userId":76,"action":"account_created","title":"Account Created","description":"You created your account.","oldValue":null,"newValue":null,"icon":"UserPlus","creat
```

---

### GET /me
**Endpoint:** `GET /api/v1/auth/me`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"id":76,"username":"test_user_1770786147742","email":"test_user_1770786147742@example.com","createdAt":"2026-02-11T05:02:28.048Z"}}
```

---

### POST /logout
**Endpoint:** `POST /api/v1/auth/logout`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","message":"Logged out successfully"}
```

---

### POST /reset-password/verify
**Endpoint:** `POST /api/v1/auth/reset-password/verify`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/reset-password/verify" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","message":"Password updated (mock)"}
```

---

### POST /reset-password/request
**Endpoint:** `POST /api/v1/auth/reset-password/request`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/reset-password/request" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","message":"Reset link sent (mock)"}
```

---

### GET /check-email
**Endpoint:** `GET /api/v1/auth/check-email`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/auth/check-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Server error"}
```

---

### GET /check-username
**Endpoint:** `GET /api/v1/auth/check-username`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/auth/check-username" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Server error"}
```

---

### POST /login
**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzUsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc3MDc4NjE2OSwiZXhwIjoxNzcxMzkwOTY5fQ.EXBV7SPCgzUSBGpffCQhJWrfsO-5X0_abqKv8YNoyAQ
```

---

### POST /signup
**Endpoint:** `POST /api/v1/auth/signup`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "email": "test@example.com",
  "password": "pass",
  "username": "user",
  "fullName": "Test User"
}'
```

**Sample Response:**
```json
{"status":"fail","message":"Email already exists"}
```

---

### POST /register
**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

## comment-service

### GET /post/:postId
**Endpoint:** `GET /api/v1/comments/internal/post/:postId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/internal/post/:postId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### DELETE /:commentId
**Endpoint:** `DELETE /api/v1/comments/internal/:commentId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/comments/internal/:commentId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}
```

---

### PATCH /:commentId/remove
**Endpoint:** `PATCH /api/v1/comments/internal/:commentId/remove`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/comments/internal/:commentId/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}
```

---

### PATCH /:commentId/approve
**Endpoint:** `PATCH /api/v1/comments/internal/:commentId/approve`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/comments/internal/:commentId/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}
```

---

### GET /:commentId
**Endpoint:** `GET /api/v1/comments/internal/:commentId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/internal/:commentId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/comments/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":25,"pending":16,"flagged":2,"approvedToday":0,"removedToday":0}}
```

---

### GET /list
**Endpoint:** `GET /api/v1/comments/internal/list`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":31,"postId":1864,"userId":51,"username":"akbar","text":"hello","createdAt":"2026-02-10T06:13:08.558Z","likesCount":1,"status":"pending","reportedCount":0,"parentId":null,
```

---

### GET /activity/reviews
**Endpoint:** `GET /api/v1/comments/activity/reviews`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/activity/reviews" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /activity/comments
**Endpoint:** `GET /api/v1/comments/activity/comments`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments/activity/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### POST /check-comments
**Endpoint:** `POST /api/v1/comments/check-comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/comments/check-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"message":"postIds array required"}
```

---

### DELETE /:id/like
**Endpoint:** `DELETE /api/v1/comments/:id/like`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/comments/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"userId required"}
```

---

### POST /:id/like
**Endpoint:** `POST /api/v1/comments/:id/like`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/comments/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status":"error","message":"userId required"}
```

---

### DELETE /:id
**Endpoint:** `DELETE /api/v1/comments/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/comments/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Server error"}
```

---

### GET /
**Endpoint:** `GET /api/v1/comments`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### POST /
**Endpoint:** `POST /api/v1/comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

## feed-service

### GET /
**Endpoint:** `GET /api/v1/feed`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

## help-service

### POST /feedback
**Endpoint:** `POST /api/v1/help/api/help/feedback`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/help/api/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"notNull Violation: Feedback.articleId cannot be null,\nnotNull Violation: Feedback.isHelpful cannot be null"}
```

---

### GET /search
**Endpoint:** `GET /api/v1/help/api/help/search`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/help/api/help/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /articles/:slug
**Endpoint:** `GET /api/v1/help/api/help/articles/:slug`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/help/api/help/articles/:slug" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"fail","message":"Article not found"}
```

---

### GET /articles/featured
**Endpoint:** `GET /api/v1/help/api/help/articles/featured`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/help/api/help/articles/featured" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":"97ea79eb-4614-4ad4-accc-4f49571e99ec","title":"How to Reset Your password","slug":"reset-password","content":"To reset your password, go to the login page and click
```

---

### GET /categories
**Endpoint:** `GET /api/v1/help/api/help/categories`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/help/api/help/categories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":"a10bbe73-07b8-4cad-ab53-2da40c1e8ad7","name":"Jaadoe Features","slug":"features","icon":"LayoutGrid","description":null,"parentId":null,"order":1,"createdAt":"2026-0
```

---

## insight-service

### GET /heatmap
**Endpoint:** `GET /api/v1/insights/heatmap`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/insights/heatmap" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /content
**Endpoint:** `GET /api/v1/insights/content`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/insights/content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /account
**Endpoint:** `GET /api/v1/insights/account`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/insights/account" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"totalViews":0,"accountsReached":0,"accountsEngaged":0,"profileVisits":0,"followerGrowth":{"gained":0,"lost":0,"net":0},"timeSeries":[]}}
```

---

## live-service

### POST /webhook/done
**Endpoint:** `POST /api/v1/live/webhook/done`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/webhook/done" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
Error
```

---

### POST /webhook/publish
**Endpoint:** `POST /api/v1/live/webhook/publish`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/webhook/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
Error
```

---

### POST /:id/chat
**Endpoint:** `POST /api/v1/live/:id/chat`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/:id/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"notNull Violation: LiveChatMessage.message cannot be null"}
```

---

### POST /:id/end
**Endpoint:** `POST /api/v1/live/:id/end`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/:id/end" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"dummy_id\""}
```

---

### GET /:id
**Endpoint:** `GET /api/v1/live/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/live/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"dummy_id\""}
```

---

### GET /feed
**Endpoint:** `GET /api/v1/live/feed`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/live/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":"9ddfdc57-d3d7-4c7c-8030-5af35172cb47","userId":"51","streamKey":"f744e24ebe4c42da85ecc9fcad50ca4emlgb7aow","ingestUrl":"rtmp://localhost:1935/live","title":"asdfasdf
```

---

### POST /schedule
**Endpoint:** `POST /api/v1/live/schedule`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/schedule" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Title and scheduled time are required"}
```

---

### POST /go-live
**Endpoint:** `POST /api/v1/live/go-live`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/live/go-live" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Title is required"}
```

---

## media-service

### GET /files/*
**Endpoint:** `GET /api/v1/media/files/*`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/media/files/*" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT
```

---

### POST /finalize
**Endpoint:** `POST /api/v1/media/finalize`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/media/finalize" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"error":"Key is required"}
```

---

### POST /presigned-url
**Endpoint:** `POST /api/v1/media/presigned-url`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/media/presigned-url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Missing filename or fileType"}
```

---

### GET /status/:id
**Endpoint:** `GET /api/v1/media/status/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/media/status/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"error":"invalid input syntax for type uuid: \"dummy_id\""}
```

---

### POST /upload
**Endpoint:** `POST /api/v1/media/upload`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/media/upload" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"error":"No file uploaded"}
```

---

## message-service

### POST /seen
**Endpoint:** `POST /api/v1/messages/seen`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/messages/seen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"error","message":"WHERE parameter \"conversation_id\" has invalid \"undefined\" value"}
```

---

### POST /send
**Endpoint:** `POST /api/v1/messages/send`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/messages/send" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"success","data":{"flagged":false,"id":72,"conversationId":18,"senderId":76,"content":"Hello message","type":"text","mediaUrl":null,"replyToStoryId":null,"isSeen":false,"updatedAt":"2026-02-
```

---

### DELETE /conversations/:conversationId
**Endpoint:** `DELETE /api/v1/messages/conversations/:conversationId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### POST /conversations/:conversationId/report
**Endpoint:** `POST /api/v1/messages/conversations/:conversationId/report`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"status":"success","message":"Report submitted"}
```

---

### POST /conversations/:conversationId/unblock
**Endpoint:** `POST /api/v1/messages/conversations/:conversationId/unblock`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId/unblock" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### POST /conversations/:conversationId/block
**Endpoint:** `POST /api/v1/messages/conversations/:conversationId/block`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### PATCH /conversations/:conversationId/mute
**Endpoint:** `PATCH /api/v1/messages/conversations/:conversationId/mute`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId/mute" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### GET /conversations/:conversationId/details
**Endpoint:** `GET /api/v1/messages/conversations/:conversationId/details`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### GET /conversations/:conversationId
**Endpoint:** `GET /api/v1/messages/conversations/:conversationId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/conversations/:conversationId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Failed to fetch messages"}
```

---

### GET /conversations
**Endpoint:** `GET /api/v1/messages/conversations`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":18,"user1Id":76,"user2Id":76,"lastMessageId":null,"lastMessageContent":"Hello message","lastMessageSenderId":76,"lastMessageAt":"2026-02-11T05:02:59.948Z","riskScore"
```

---

### GET /activity/story-replies
**Endpoint:** `GET /api/v1/messages/activity/story-replies`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /conversations/:conversationId
**Endpoint:** `GET /api/v1/messages/internal/conversations/:conversationId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/internal/conversations/:conversationId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### PATCH /conversations/:conversationId/mark-safe
**Endpoint:** `PATCH /api/v1/messages/internal/conversations/:conversationId/mark-safe`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/messages/internal/conversations/:conversationId/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### GET /conversations/:conversationId/transcript
**Endpoint:** `GET /api/v1/messages/internal/conversations/:conversationId/transcript`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/internal/conversations/:conversationId/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/messages/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"highRisk":1,"underInvestigation":0,"safeCleared":8}}
```

---

### GET /conversations
**Endpoint:** `GET /api/v1/messages/internal/conversations`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/messages/internal/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":7,"user1Id":7,"user2Id":20,"lastMessageId":null,"lastMessageContent":"I will find where you live and make you regret this.","lastMessageSenderId":7,"lastMessageAt":"2026-
```

---

## notification-service

### GET /admin/stats
**Endpoint:** `GET /api/v1/notifications/admin/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/notifications/admin/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Invalid token"}
```

---

### GET /admin/history
**Endpoint:** `GET /api/v1/notifications/admin/history`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/notifications/admin/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Invalid token"}
```

---

### POST /admin/broadcast
**Endpoint:** `POST /api/v1/notifications/admin/broadcast`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/notifications/admin/broadcast" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"Invalid token"}
```

---

### PATCH /read-all
**Endpoint:** `PATCH /api/v1/notifications/read-all`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/notifications/read-all" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"success","message":"All notifications marked as read"}
```

---

### PATCH /:id/read
**Endpoint:** `PATCH /api/v1/notifications/:id/read`

**Request Body:**
```json
{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/notifications/:id/read" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "title": "Test Ad",
  "budget": 100,
  "duration": 5
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /unread-count
**Endpoint:** `GET /api/v1/notifications/unread-count`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/notifications/unread-count" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"count":0}}
```

---

### GET /
**Endpoint:** `GET /api/v1/notifications`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### PATCH /settings
**Endpoint:** `PATCH /api/v1/notifications/settings`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"id":"229ad457-b46c-4db5-8259-1b99d9f08f4e","pauseAllPush":false,"likes":"EVERYONE","comments":"EVERYONE","mentions":"EVERYONE","follows":true,"messages":true,"storyReplies
```

---

### GET /settings
**Endpoint:** `GET /api/v1/notifications/settings`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"id":"229ad457-b46c-4db5-8259-1b99d9f08f4e","userId":76,"pauseAllPush":false,"likes":"EVERYONE","comments":"EVERYONE","mentions":"EVERYONE","follows":true,"messages":true,"
```

---

## post-service

### PATCH /reports/:id/status
**Endpoint:** `PATCH /api/v1/posts/internal/reports/:id/status`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/posts/internal/reports/:id/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### GET /reports/:id
**Endpoint:** `GET /api/v1/posts/internal/reports/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/reports/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### GET /reports
**Endpoint:** `GET /api/v1/posts/internal/reports`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":5,"postId":1863,"reportedBy":51,"reason":"spam","description":"Fake engagement","status":"pending","created_at":"2026-02-10T06:20:10.930Z","updated_at":"2026-02-10T06:20:
```

---

### GET /reports/stats
**Endpoint:** `GET /api/v1/posts/internal/reports/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"count":0}}
```

---

### DELETE /:id/bookmark
**Endpoint:** `DELETE /api/v1/posts/:id/bookmark`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/posts/:id/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"message":"User ID required"}
```

---

### POST /:id/bookmark
**Endpoint:** `POST /api/v1/posts/:id/bookmark`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/posts/:id/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"message":"User ID required"}
```

---

### POST /:id/report
**Endpoint:** `POST /api/v1/posts/:id/report`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/posts/:id/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Invalid Post ID"}
```

---

### PUT /:id/toggle-comments
**Endpoint:** `PUT /api/v1/posts/:id/toggle-comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/posts/:id/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### PUT /:id/hide-likes
**Endpoint:** `PUT /api/v1/posts/:id/hide-likes`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/posts/:id/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### PUT /:id
**Endpoint:** `PUT /api/v1/posts/:id`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/posts/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### DELETE /:id
**Endpoint:** `DELETE /api/v1/posts/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/posts/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /:id
**Endpoint:** `GET /api/v1/posts/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /:id/embed
**Endpoint:** `GET /api/v1/posts/:id/embed`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/:id/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /activity/posts
**Endpoint:** `GET /api/v1/posts/activity/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/activity/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /activity/likes
**Endpoint:** `GET /api/v1/posts/activity/likes`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### POST /check-likes
**Endpoint:** `POST /api/v1/posts/check-likes`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/posts/check-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"message":"User ID and postIds array required"}
```

---

### GET /saved
**Endpoint:** `GET /api/v1/posts/saved`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### DELETE /:id/like
**Endpoint:** `DELETE /api/v1/posts/:id/like`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/posts/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /:id/like
**Endpoint:** `POST /api/v1/posts/:id/like`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/posts/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /
**Endpoint:** `GET /api/v1/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /explore
**Endpoint:** `GET /api/v1/posts/explore`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/explore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"id":533,"userId":2038,"username":"user_demo_38_877","caption":"Analytics demo post #190. #metrics #2026","mediaUrl":"https://picsum.photos/seed/1190/600/600","thumbnailUr
```

---

### POST /
**Endpoint:** `POST /api/v1/posts`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /:postId/bookmarks
**Endpoint:** `GET /api/v1/posts/internal/:postId/bookmarks`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/:postId/bookmarks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### GET /:postId/likes
**Endpoint:** `GET /api/v1/posts/internal/:postId/likes`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/:postId/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### GET /:postId
**Endpoint:** `GET /api/v1/posts/internal/:postId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/:postId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### DELETE /:postId
**Endpoint:** `DELETE /api/v1/posts/internal/:postId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/posts/internal/:postId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### PATCH /:postId/unhide
**Endpoint:** `PATCH /api/v1/posts/internal/:postId/unhide`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/posts/internal/:postId/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### PATCH /:postId/hide
**Endpoint:** `PATCH /api/v1/posts/internal/:postId/hide`

**Request Body:**
```json
{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/posts/internal/:postId/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "caption": "Test Post",
  "mediaUrl": "https://example.com/img.jpg",
  "mediaType": "IMAGE"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}
```

---

### GET /user/:userId
**Endpoint:** `GET /api/v1/posts/internal/user/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/user/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /stats/user/:userId
**Endpoint:** `GET /api/v1/posts/internal/stats/user/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/stats/user/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"count":0}}
```

---

### GET /list
**Endpoint:** `GET /api/v1/posts/internal/list`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f
```

---

### GET /recent
**Endpoint:** `GET /api/v1/posts/internal/recent`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f
```

---

### GET /top
**Endpoint:** `GET /api/v1/posts/internal/top`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/top" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"contentId":759,"creatorUsername":"user_demo_138_127","views":20316,"likes":1989,"engagementRate":"11.7"},{"contentId":907,"creatorUsername":"user_demo_53_25","views":20464,"l
```

---

### GET /engagement/trends
**Endpoint:** `GET /api/v1/posts/internal/engagement/trends`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/engagement/trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"month":"Jan","engagementRate":"1256.9"},{"month":"Feb","engagementRate":"982.3"}]}
```

---

### GET /stats/engagement
**Endpoint:** `GET /api/v1/posts/internal/stats/engagement`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/stats/engagement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"rate":"11.7"}}
```

---

### GET /stats/overall
**Endpoint:** `GET /api/v1/posts/internal/stats/overall`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"likes":1679427,"comments":405561,"views":17843069}}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/posts/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/posts/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":1857,"growth":46}}
```

---

## reel-service

### DELETE /:id/like
**Endpoint:** `DELETE /api/v1/reels/:id/like`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/reels/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /:id/like
**Endpoint:** `POST /api/v1/reels/:id/like`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/reels/:id/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /activity/likes
**Endpoint:** `GET /api/v1/reels/activity/likes`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /activity/reels
**Endpoint:** `GET /api/v1/reels/activity/reels`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/activity/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /
**Endpoint:** `GET /api/v1/reels`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### POST /
**Endpoint:** `POST /api/v1/reels`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### GET /:reelId/likes
**Endpoint:** `GET /api/v1/reels/internal/:reelId/likes`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/:reelId/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}
```

---

### GET /:reelId
**Endpoint:** `GET /api/v1/reels/internal/:reelId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/:reelId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}
```

---

### GET /recent
**Endpoint:** `GET /api/v1/reels/internal/recent`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou
```

---

### DELETE /:reelId
**Endpoint:** `DELETE /api/v1/reels/internal/:reelId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/reels/internal/:reelId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}
```

---

### PATCH /:reelId/unhide
**Endpoint:** `PATCH /api/v1/reels/internal/:reelId/unhide`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/reels/internal/:reelId/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}
```

---

### PATCH /:reelId/hide
**Endpoint:** `PATCH /api/v1/reels/internal/:reelId/hide`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/reels/internal/:reelId/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}
```

---

### GET /list
**Endpoint:** `GET /api/v1/reels/internal/list`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou
```

---

### GET /user/:userId
**Endpoint:** `GET /api/v1/reels/internal/user/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/user/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /stats/user/:userId
**Endpoint:** `GET /api/v1/reels/internal/stats/user/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/stats/user/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"count":0}}
```

---

### GET /stats/overall
**Endpoint:** `GET /api/v1/reels/internal/stats/overall`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"likes":11917,"comments":3,"views":0}}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/reels/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/reels/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":49,"growth":100}}
```

---

## search-service

### GET /users
**Endpoint:** `GET /api/v1/search/users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/search/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /
**Endpoint:** `GET /api/v1/search`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

## story-service

### DELETE /:id/react
**Endpoint:** `DELETE /api/v1/stories/:id/react`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/stories/:id/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /:id/react
**Endpoint:** `POST /api/v1/stories/:id/react`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/stories/:id/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /:id/view
**Endpoint:** `POST /api/v1/stories/:id/view`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/stories/:id/view" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /:id/report
**Endpoint:** `POST /api/v1/stories/:id/report`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/stories/:id/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### DELETE /:id
**Endpoint:** `DELETE /api/v1/stories/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/stories/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /activity/story-replies
**Endpoint:** `GET /api/v1/stories/activity/story-replies`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /archive
**Endpoint:** `GET /api/v1/stories/archive`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/archive" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /
**Endpoint:** `GET /api/v1/stories`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### POST /
**Endpoint:** `POST /api/v1/stories`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status": "success", "message": "API call successful"}
```

---

### DELETE /:storyId
**Endpoint:** `DELETE /api/v1/stories/internal/:storyId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/stories/internal/:storyId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \"temp_story_id\""}
```

---

### GET /:storyId/likes
**Endpoint:** `GET /api/v1/stories/internal/:storyId/likes`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/internal/:storyId/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type integer: \"temp_story_id\""}
```

---

### GET /:storyId/views
**Endpoint:** `GET /api/v1/stories/internal/:storyId/views`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/internal/:storyId/views" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type integer: \"temp_story_id\""}
```

---

### GET /list
**Endpoint:** `GET /api/v1/stories/internal/list`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":85,"userId":51,"username":"akbar","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/stories/temp_12921bca-d5a1-44aa-98d2-92994ebd7dbe_opt.webp","thumbnailUrl":n
```

---

### GET /stats
**Endpoint:** `GET /api/v1/stories/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":83}}
```

---

### DELETE /highlights/:highlightId
**Endpoint:** `DELETE /api/v1/stories/highlights/:highlightId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/stories/highlights/:highlightId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### PUT /highlights/:highlightId
**Endpoint:** `PUT /api/v1/stories/highlights/:highlightId`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/stories/highlights/:highlightId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Title is required"}
```

---

### GET /highlights/:highlightId/stories
**Endpoint:** `GET /api/v1/stories/highlights/:highlightId/stories`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/highlights/:highlightId/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /highlights/:userId
**Endpoint:** `GET /api/v1/stories/highlights/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/highlights/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### POST /highlights
**Endpoint:** `POST /api/v1/stories/highlights`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/stories/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Title is required"}
```

---

### GET /activity/highlights
**Endpoint:** `GET /api/v1/stories/activity/highlights`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/activity/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /stories/me
**Endpoint:** `GET /api/v1/stories/stories/me`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/stories/stories/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

## user-service

### DELETE /followers/:followerId
**Endpoint:** `DELETE /api/v1/users/profile/followers/:followerId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/followers/:followerId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /:userId/following
**Endpoint:** `GET /api/v1/users/profile/:userId/following`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/:userId/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /:userId/followers
**Endpoint:** `GET /api/v1/users/profile/:userId/followers`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/:userId/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /:userId/posts
**Endpoint:** `GET /api/v1/users/profile/:userId/posts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/:userId/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /:username
**Endpoint:** `GET /api/v1/users/profile/:username`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/:username" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"User not found"}
```

---

### GET /activity/account-history
**Endpoint:** `GET /api/v1/users/profile/activity/account-history`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/activity/account-history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### POST /batch
**Endpoint:** `POST /api/v1/users/profile/batch`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/batch" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"userIds array required"}
```

---

### GET /suggestions
**Endpoint:** `GET /api/v1/users/profile/suggestions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/suggestions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[{"userId":2055,"username":"user_demo_55_251","fullName":"Demo User 55","profilePicture":"https://i.pravatar.cc/150?u=2055","isFollowing":false},{"userId":2077,"username":"u
```

---

### GET /me/saved
**Endpoint:** `GET /api/v1/users/profile/me/saved`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/me/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### DELETE /profile-photo
**Endpoint:** `DELETE /api/v1/users/profile/profile-photo`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco
```

---

### POST /profile-photo
**Endpoint:** `POST /api/v1/users/profile/profile-photo`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"website":null,"gender":null,"isPrivate":false,"showAccountSuggestions":true
```

---

### PUT /me
**Endpoint:** `PUT /api/v1/users/profile/me`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco
```

---

### GET /me
**Endpoint:** `GET /api/v1/users/profile/me`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco
```

---

### POST /help/feedback
**Endpoint:** `POST /api/v1/users/profile/help/feedback`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Rating is required"}
```

---

### GET /help/support-requests
**Endpoint:** `GET /api/v1/users/profile/help/support-requests`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/help/support-requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /help/feature-limits
**Endpoint:** `GET /api/v1/users/profile/help/feature-limits`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/help/feature-limits" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /help/violations
**Endpoint:** `GET /api/v1/users/profile/help/violations`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/help/violations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /help/account-status
**Endpoint:** `GET /api/v1/users/profile/help/account-status`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/help/account-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"lastChecked":"2026-02-11T05:03:13.112Z","userId":76,"status":"OK"}}
```

---

### PATCH /settings/apps/:id/revoke
**Endpoint:** `PATCH /api/v1/users/profile/settings/apps/:id/revoke`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/apps/:id/revoke" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"76\""}
```

---

### GET /settings/apps
**Endpoint:** `GET /api/v1/users/profile/settings/apps`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/apps" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### PATCH /settings/general
**Endpoint:** `PATCH /api/v1/users/profile/settings/general`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"saveStoryToArchive":true,"reduceMotion":false,"languageCode":"en","userId":76,"updated_at":"2026-02-11T05:03:13.354Z"}}
```

---

### GET /settings/general
**Endpoint:** `GET /api/v1/users/profile/settings/general`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"saveStoryToArchive":true,"reduceMotion":false,"languageCode":"en","updated_at":"2026-02-11T05:03:13.354Z"}}
```

---

### GET /settings/subscriptions
**Endpoint:** `GET /api/v1/users/profile/settings/subscriptions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/subscriptions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### PATCH /settings/like-share
**Endpoint:** `PATCH /api/v1/users/profile/settings/like-share`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"hideLikeShareCounts":false,"userId":76,"created_at":"2026-02-11T05:03:13.562Z"}}
```

---

### GET /settings/like-share
**Endpoint:** `GET /api/v1/users/profile/settings/like-share`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"hideLikeShareCounts":false,"created_at":"2026-02-11T05:03:13.562Z"}}
```

---

### PATCH /settings/content-preferences
**Endpoint:** `PATCH /api/v1/users/profile/settings/content-preferences`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"sensitiveContentLevel":"limit_more","userId":76,"created_at":"2026-02-11T05:03:13.706Z"}}
```

---

### GET /settings/content-preferences
**Endpoint:** `GET /api/v1/users/profile/settings/content-preferences`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"sensitiveContentLevel":"limit_more","created_at":"2026-02-11T05:03:13.706Z"}}
```

---

### DELETE /settings/muted/:userId
**Endpoint:** `DELETE /api/v1/users/profile/settings/muted/:userId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/settings/muted/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","message":"Account unmuted"}
```

---

### POST /settings/muted/:userId
**Endpoint:** `POST /api/v1/users/profile/settings/muted/:userId`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/settings/muted/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Cannot mute yourself"}
```

---

### GET /settings/muted
**Endpoint:** `GET /api/v1/users/profile/settings/muted`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/muted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### DELETE /settings/hidden-words/words/:id
**Endpoint:** `DELETE /api/v1/users/profile/settings/hidden-words/words/:id`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/settings/hidden-words/words/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"invalid input syntax for type uuid: \"76\""}
```

---

### POST /settings/hidden-words/words
**Endpoint:** `POST /api/v1/users/profile/settings/hidden-words/words`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/settings/hidden-words/words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Word is required"}
```

---

### PUT /settings/hidden-words
**Endpoint:** `PUT /api/v1/users/profile/settings/hidden-words`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"hideComments":false,"advancedFilter":false,"hideMessageRequests":false,"customHideComments":false,"customHideMessageRequests":false,"userId":76}}
```

---

### GET /settings/hidden-words
**Endpoint:** `GET /api/v1/users/profile/settings/hidden-words`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"settings":{"userId":76,"hideComments":false,"advancedFilter":false,"hideMessageRequests":false,"customHideComments":false,"customHideMessageRequests":false},"customWords":
```

---

### DELETE /settings/restricted/:userId
**Endpoint:** `DELETE /api/v1/users/profile/settings/restricted/:userId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/settings/restricted/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","message":"Account unrestricted"}
```

---

### POST /settings/restricted/:userId
**Endpoint:** `POST /api/v1/users/profile/settings/restricted/:userId`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/settings/restricted/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Cannot restrict yourself"}
```

---

### GET /settings/restricted
**Endpoint:** `GET /api/v1/users/profile/settings/restricted`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/restricted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### PUT /settings/sharing
**Endpoint:** `PUT /api/v1/users/profile/settings/sharing`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"storyShares":true,"postToStory":true,"reposts":true,"websiteEmbeds":true,"featuredRequests":true,"userId":76}}
```

---

### GET /settings/sharing
**Endpoint:** `GET /api/v1/users/profile/settings/sharing`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"storyShares":true,"postToStory":true,"reposts":true,"websiteEmbeds":true,"featuredRequests":true}}
```

---

### PUT /settings/comments
**Endpoint:** `PUT /api/v1/users/profile/settings/comments`

**Request Body:**
```json
{
  "content": "This is a test comment"
}
```

**Sample Curl Request:**
```bash
curl -X PUT "http://192.168.1.15:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "This is a test comment"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"allowFrom":"everyone","allowGif":true,"userId":76,"updated_at":"2026-02-11T05:03:14.646Z"}}
```

---

### GET /settings/comments
**Endpoint:** `GET /api/v1/users/profile/settings/comments`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"allowFrom":"everyone","allowGif":true,"updated_at":"2026-02-11T05:03:14.646Z","counts":{"following":0,"followers":0,"mutual":0}}}
```

---

### PATCH /tags/:id/remove
**Endpoint:** `PATCH /api/v1/users/profile/tags/:id/remove`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/tags/:id/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### PATCH /tags/:id/approve
**Endpoint:** `PATCH /api/v1/users/profile/tags/:id/approve`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/tags/:id/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /tags/pending
**Endpoint:** `GET /api/v1/users/profile/tags/pending`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/tags/pending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### PATCH /settings/tags-mentions
**Endpoint:** `PATCH /api/v1/users/profile/settings/tags-mentions`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"allowTagsFrom":"everyone","manualTagApproval":false,"allowMentionsFrom":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.032Z","created_at":"2026-02-11T05:03:15.03
```

---

### GET /settings/tags-mentions
**Endpoint:** `GET /api/v1/users/profile/settings/tags-mentions`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"allowTagsFrom":"everyone","manualTagApproval":false,"allowMentionsFrom":"everyone","created_at":"2026-02-11T05:03:15.032Z","updated_at":"2026-02-11T05:03:15.03
```

---

### PATCH /settings/activity-status
**Endpoint:** `PATCH /api/v1/users/profile/settings/activity-status`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"showActivityStatus":true,"userId":76,"updated_at":"2026-02-11T05:03:15.181Z","created_at":"2026-02-11T05:03:15.181Z","lastActiveAt":null}}
```

---

### GET /settings/activity-status
**Endpoint:** `GET /api/v1/users/profile/settings/activity-status`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"showActivityStatus":true,"lastActiveAt":null,"created_at":"2026-02-11T05:03:15.181Z","updated_at":"2026-02-11T05:03:15.181Z"}}
```

---

### PATCH /settings/story-replies
**Endpoint:** `PATCH /api/v1/users/profile/settings/story-replies`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"success","data":{"storyReplies":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.313Z","created_at":"2026-02-11T05:03:15.313Z"}}
```

---

### GET /settings/story-replies
**Endpoint:** `GET /api/v1/users/profile/settings/story-replies`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"storyReplies":"everyone","created_at":"2026-02-11T05:03:15.313Z","updated_at":"2026-02-11T05:03:15.313Z"}}
```

---

### PATCH /settings/messages
**Endpoint:** `PATCH /api/v1/users/profile/settings/messages`

**Request Body:**
```json
{
  "content": "Hello message",
  "receiverId": 76
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "content": "Hello message",
  "receiverId": 76
}'
```

**Sample Response:**
```json
{"status":"success","data":{"messageRequestsFrom":"everyone","groupAddPermission":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.460Z","created_at":"2026-02-11T05:03:15.460Z"}}
```

---

### GET /settings/messages
**Endpoint:** `GET /api/v1/users/profile/settings/messages`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"userId":76,"messageRequestsFrom":"everyone","groupAddPermission":"everyone","created_at":"2026-02-11T05:03:15.460Z","updated_at":"2026-02-11T05:03:15.460Z"}}
```

---

### DELETE /story-privacy/unhide/:hiddenUserId
**Endpoint:** `DELETE /api/v1/users/profile/story-privacy/unhide/:hiddenUserId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/story-privacy/unhide/:hiddenUserId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /story-privacy/hide
**Endpoint:** `POST /api/v1/users/profile/story-privacy/hide`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/story-privacy/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Hidden User ID required"}
```

---

### GET /story-privacy/hidden-users
**Endpoint:** `GET /api/v1/users/profile/story-privacy/hidden-users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/story-privacy/hidden-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### DELETE /unblock/:userId
**Endpoint:** `DELETE /api/v1/users/profile/unblock/:userId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/unblock/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","message":"User unblocked"}
```

---

### POST /block/:userId
**Endpoint:** `POST /api/v1/users/profile/block/:userId`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/block/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Cannot block yourself"}
```

---

### GET /blocked-users
**Endpoint:** `GET /api/v1/users/profile/blocked-users`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/blocked-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### DELETE /close-friends/:friendId
**Endpoint:** `DELETE /api/v1/users/profile/close-friends/:friendId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/profile/close-friends/:friendId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### POST /close-friends/:friendId
**Endpoint:** `POST /api/v1/users/profile/close-friends/:friendId`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/close-friends/:friendId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Internal Server Error"}
```

---

### GET /close-friends
**Endpoint:** `GET /api/v1/users/profile/close-friends`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/close-friends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /reports/me
**Endpoint:** `GET /api/v1/users/profile/reports/me`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/profile/reports/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### POST /report-problem
**Endpoint:** `POST /api/v1/users/profile/report-problem`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/profile/report-problem" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"status":"error","message":"Please provide some details or attach a file."}
```

---

### GET /:userId/follow-counts
**Endpoint:** `GET /api/v1/users/internal/:userId/follow-counts`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/:userId/follow-counts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"followersCount":0,"followingCount":0}}
```

---

### GET /:userId
**Endpoint:** `GET /api/v1/users/internal/:userId`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccountS
```

---

### POST /bulk
**Endpoint:** `POST /api/v1/users/internal/bulk`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/internal/bulk" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":false,"message":"userIds must be an array"}
```

---

### GET /recent
**Endpoint:** `GET /api/v1/users/internal/recent`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount
```

---

### DELETE /:userId
**Endpoint:** `DELETE /api/v1/users/internal/:userId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/internal/:userId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"message":"User soft deleted"}
```

---

### PATCH /:userId/unban
**Endpoint:** `PATCH /api/v1/users/internal/:userId/unban`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/internal/:userId/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":true,"message":"User unbanned"}
```

---

### PATCH /:userId/ban
**Endpoint:** `PATCH /api/v1/users/internal/:userId/ban`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/internal/:userId/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":true,"message":"User banned"}
```

---

### GET /list
**Endpoint:** `GET /api/v1/users/internal/list`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount
```

---

### GET /countries
**Endpoint:** `GET /api/v1/users/internal/countries`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"name":"Unknown","count":"276"}]}
```

---

### GET /login-methods
**Endpoint:** `GET /api/v1/users/internal/login-methods`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"method":"email","count":"153"},{"method":"google","count":"81"},{"method":"facebook","count":"42"}]}
```

---

### GET /growth
**Endpoint:** `GET /api/v1/users/internal/growth`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"month":"Jan","count":"171"},{"month":"Feb","count":"34"}]}
```

---

### DELETE /avatars/:avatarId
**Endpoint:** `DELETE /api/v1/users/internal/avatars/:avatarId`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/internal/avatars/:avatarId" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}
```

---

### PATCH /avatars/:avatarId/reject
**Endpoint:** `PATCH /api/v1/users/internal/avatars/:avatarId/reject`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/internal/avatars/:avatarId/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}
```

---

### PATCH /avatars/:avatarId/approve
**Endpoint:** `PATCH /api/v1/users/internal/avatars/:avatarId/approve`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/internal/avatars/:avatarId/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}
```

---

### GET /avatars/stats
**Endpoint:** `GET /api/v1/users/internal/avatars/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":0,"pending":0,"approved":0,"rejected":0}}
```

---

### GET /avatars
**Endpoint:** `GET /api/v1/users/internal/avatars`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[],"pagination":{"total":0,"page":1,"limit":12,"totalPages":0}}
```

---

### GET /stats
**Endpoint:** `GET /api/v1/users/internal/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"total":276,"growth":57}}
```

---

### PATCH /reports/:id/status
**Endpoint:** `PATCH /api/v1/users/internal/reports/:id/status`

**Request Body:**
```json
{
  "reason": "SPAM",
  "description": "Test report"
}
```

**Sample Curl Request:**
```bash
curl -X PATCH "http://192.168.1.15:5000/api/v1/users/internal/reports/:id/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "reason": "SPAM",
  "description": "Test report"
}'
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type uuid: \"76\""}
```

---

### GET /reports/:id
**Endpoint:** `GET /api/v1/users/internal/reports/:id`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/reports/:id" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":false,"message":"invalid input syntax for type uuid: \"76\""}
```

---

### GET /reports
**Endpoint:** `GET /api/v1/users/internal/reports`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[{"id":"e3611a21-555d-47ad-b70c-47003bab87f2","userId":51,"reportedUsername":"akbar","reason":"App Feedback / Problem","description":"this is test report a problem in help page
```

---

### GET /reports/stats
**Endpoint:** `GET /api/v1/users/internal/reports/stats`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":{"count":0}}
```

---

### POST /requests/reject
**Endpoint:** `POST /api/v1/users/requests/reject`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/requests/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"}
```

---

### POST /requests/accept
**Endpoint:** `POST /api/v1/users/requests/accept`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/requests/accept" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"}
```

---

### GET /requests
**Endpoint:** `GET /api/v1/users/requests`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":[]}
```

---

### GET /:userId/following
**Endpoint:** `GET /api/v1/users/:userId/following`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/:userId/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/followers
**Endpoint:** `GET /api/v1/users/:userId/followers`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/:userId/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"success":true,"data":[]}
```

---

### GET /:userId/follow/status
**Endpoint:** `GET /api/v1/users/:userId/follow/status`

**Sample Curl Request:**
```bash
curl -X GET "http://192.168.1.15:5000/api/v1/users/:userId/follow/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"success","data":{"isFollowing":{"padding":false,"following":false,"requested":false}}}
```

---

### DELETE /:userId/follow
**Endpoint:** `DELETE /api/v1/users/:userId/follow`

**Sample Curl Request:**
```bash
curl -X DELETE "http://192.168.1.15:5000/api/v1/users/:userId/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}"
```

**Sample Response:**
```json
{"status":"none","isFollowing":false,"isRequested":false,"followersCount":0}
```

---

### POST /:userId/follow
**Endpoint:** `POST /api/v1/users/:userId/follow`

**Request Body:**
```json
{
  "dummy_field": "test"
}
```

**Sample Curl Request:**
```bash
curl -X POST "http://192.168.1.15:5000/api/v1/users/:userId/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{token}}" \
  -d '{
  "dummy_field": "test"
}'
```

**Sample Response:**
```json
{"status":"error","message":"You cannot follow yourself"}
```

---

