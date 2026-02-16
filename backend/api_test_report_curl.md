# API Endpoint Test Report

**Generated:** 16/2/2026, 1:45:30 pm

**Gateway URL:** http://localhost:5000
**Swagger Documentation:** http://localhost:5000/api-docs

## Overall Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| **Total Endpoints** | 388 | 100% |
| **Passed** | 285 | 73.5% |
| **Failed** | 103 | 26.5% |
| **Skipped** | 0 | 0.0% |

## Statistics by Service

| Service | Total | Passed | Failed | Skipped | Success Rate |
|---------|-------|--------|--------|---------|-------------|
| ad-service | 22 | 17 | 5 | 0 | 77.3% |
| admin-service | 109 | 85 | 24 | 0 | 78.0% |
| auth-service | 10 | 5 | 5 | 0 | 50.0% |
| comment-service | 15 | 9 | 6 | 0 | 60.0% |
| feed-service | 1 | 1 | 0 | 0 | 100.0% |
| help-service | 14 | 11 | 3 | 0 | 78.6% |
| insight-service | 3 | 3 | 0 | 0 | 100.0% |
| live-service | 8 | 5 | 3 | 0 | 62.5% |
| media-service | 5 | 5 | 0 | 0 | 100.0% |
| message-service | 16 | 6 | 10 | 0 | 37.5% |
| notification-service | 9 | 7 | 2 | 0 | 77.8% |
| post-service | 38 | 21 | 17 | 0 | 55.3% |
| reel-service | 22 | 11 | 11 | 0 | 50.0% |
| search-service | 2 | 2 | 0 | 0 | 100.0% |
| story-service | 21 | 10 | 11 | 0 | 47.6% |
| user-service | 93 | 87 | 6 | 0 | 93.5% |

## Statistics by HTTP Method

| Method | Total | Passed | Failed | Skipped | Success Rate |
|--------|-------|--------|--------|---------|-------------|
| DELETE | 44 | 22 | 22 | 0 | 50.0% |
| GET | 203 | 181 | 22 | 0 | 89.2% |
| PATCH | 48 | 28 | 20 | 0 | 58.3% |
| POST | 74 | 38 | 36 | 0 | 51.4% |
| PUT | 19 | 16 | 3 | 0 | 84.2% |

## Detailed Results by Service

### ad-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | POST | /api/v1/ads/ | 201 | {"status":"success","data":{"id":"e0754d0a-0e9a-44 |
| ✅ PASS | DELETE | /api/v1/ads/:id/comments/:commentId | 404 | {"status":"error","message":"Comment not found"} |
| ❌ FAIL | POST | /api/v1/ads/:id/comments | 500 | {"status":"error","message":"insert or update on t |
| ✅ PASS | GET | /api/v1/ads/:id/comments | 200 | {"status":"success","data":[]} |
| ❌ FAIL | POST | /api/v1/ads/:id/bookmark | 500 | {"status":"error","message":"insert or update on t |
| ❌ FAIL | POST | /api/v1/ads/:id/like | 500 | {"status":"error","message":"insert or update on t |
| ✅ PASS | GET | /api/v1/ads/:id/embed | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id/toggle-comments | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id/hide-likes | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | DELETE | /api/v1/ads/:id | 404 | {"status":"error","message":"Ad not found"} |
| ❌ FAIL | POST | /api/v1/ads/click | 500 | {"status":"error","message":"insert or update on t |
| ❌ FAIL | POST | /api/v1/ads/impression | 500 | {"status":"error","message":"insert or update on t |
| ✅ PASS | GET | /api/v1/ads/active | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/ads/eligible-content | 200 | {"status":"success","data":{"posts":[],"reels":[], |
| ✅ PASS | POST | /api/v1/ads/:id/publish | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id/budget | 404 | {"success":false,"message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id/targeting | 404 | {"success":false,"message":"Ad not found"} |
| ✅ PASS | PUT | /api/v1/ads/:id/details | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | POST | /api/v1/ads/:id/boost-content | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | POST | /api/v1/ads/:id/media | 404 | {"status":"error","message":"Ad not found"} |
| ✅ PASS | POST | /api/v1/ads/draft | 201 | {"status":"success","data":{"id":"08828035-7ea5-4b |

### admin-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/admin/users/:userId/reels | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/admin/users/:userId/posts | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/admin/users/:userId/following | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/admin/users/:userId/followers | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/admin/users/:userId/details | 200 | {"success":true,"data":{"id":1096,"userId":128,"us |
| ✅ PASS | DELETE | /api/v1/admin/users/:userId | 200 | {"success":true,"message":"User soft deleted"} |
| ✅ PASS | PATCH | /api/v1/admin/users/:userId/unban | 200 | {"success":true,"message":"User unbanned"} |
| ✅ PASS | PATCH | /api/v1/admin/users/:userId/ban | 200 | {"success":true,"message":"User banned"} |
| ✅ PASS | GET | /api/v1/admin/users/ | 200 | {"success":true,"data":[{"id":3185,"userId":112,"u |
| ✅ PASS | PUT | /api/v1/admin/settings/ | 200 | {"success":true,"message":"Settings updated","data |
| ✅ PASS | GET | /api/v1/admin/settings/ | 200 | {"success":true,"data":{"id":1,"maintenanceMode":f |
| ✅ PASS | PUT | /api/v1/admin/settings/profile | 200 | {"success":true,"message":"Profile updated","data" |
| ✅ PASS | GET | /api/v1/admin/settings/profile | 200 | {"success":true,"data":{"id":1,"username":"admin", |
| ❌ FAIL | POST | /api/v1/admin/reports/:id/ban-user | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | POST | /api/v1/admin/reports/:id/ignore | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | GET | /api/v1/admin/reports/:id | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/reports/ | 200 | {"success":true,"data":[{"id":"6e7ff125-e3f8-4302- |
| ✅ PASS | GET | /api/v1/admin/reports/stats | 200 | {"success":true,"data":{"pending":6,"underReview": |
| ✅ PASS | GET | /api/v1/admin/monitoring/logs/:serviceName/:type | 200 | {"success":true,"data":"No logs found for this ser |
| ✅ PASS | GET | /api/v1/admin/monitoring/statuses | 200 | {"success":true,"data":[{"name":"gateway","port":5 |
| ✅ PASS | GET | /api/v1/admin/reels | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | GET | /api/v1/admin/posts | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ❌ FAIL | DELETE | /api/v1/admin/comments/:commentId | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | DELETE | /api/v1/admin/stories/:storyId | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | DELETE | /api/v1/admin/reels/:reelId | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | PATCH | /api/v1/admin/posts/:postId/hide | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | DELETE | /api/v1/admin/posts/:postId | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ❌ FAIL | POST | /api/v1/admin/default-avatars/ | 500 | {"success":false,"message":"notNull Violation: Aud |
| ✅ PASS | GET | /api/v1/admin/default-avatars/ | 200 | {"success":true,"data":[{"id":1,"url":"/uploads/de |
| ✅ PASS | PATCH | /api/v1/admin/languages/:id/set-default | 200 | {"success":true,"message":"Default language update |
| ✅ PASS | PATCH | /api/v1/admin/languages/:id/disable | 200 | {"success":true,"message":"Language disabled","dat |
| ✅ PASS | PATCH | /api/v1/admin/languages/:id/enable | 200 | {"success":true,"message":"Language enabled","data |
| ✅ PASS | GET | /api/v1/admin/languages/ | 200 | {"success":true,"data":{"stats":{"total":5,"active |
| ✅ PASS | POST | /api/v1/admin/feature | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | PATCH | /api/v1/admin/:id/block | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | GET | /api/v1/admin/trending | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | GET | /api/v1/admin/ | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | DELETE | /api/v1/admin/hashtags/:id | 200 | {"success":true,"message":"Hashtag deleted"} |
| ✅ PASS | PATCH | /api/v1/admin/hashtags/:id/toggle-visibility | 200 | {"success":true,"message":"Hashtag visibility upda |
| ✅ PASS | GET | /api/v1/admin/hashtags/trending | 200 | {"success":true,"data":[{"id":9,"name":"#fashion", |
| ✅ PASS | GET | /api/v1/admin/hashtags/ | 200 | {"success":true,"data":{"hashtags":[{"id":9,"name" |
| ✅ PASS | GET | /api/v1/admin/analytics/geo-users | 200 | {"success":true,"data":{"countries":[{"code":"UN", |
| ✅ PASS | GET | /api/v1/admin/explore/performance-metrics | 200 | {"success":true,"data":{"impressions":14369,"impre |
| ✅ PASS | GET | /api/v1/admin/explore/category-distribution | 200 | {"success":true,"data":[{"category":"fashion","per |
| ✅ PASS | DELETE | /api/v1/admin/explore/trending-topics/:topicId | 404 | {"success":false,"message":"Topic not found"} |
| ✅ PASS | POST | /api/v1/admin/explore/trending-topics | 400 | {"success":false,"message":"Topic is required"} |
| ✅ PASS | GET | /api/v1/admin/explore/trending-topics | 200 | {"success":true,"data":[{"id":6,"topic":"#fitness" |
| ✅ PASS | PATCH | /api/v1/admin/explore/algorithm | 200 | {"success":true,"message":"Algorithm updated succe |
| ✅ PASS | GET | /api/v1/admin/explore/algorithm | 200 | {"success":true,"data":{"id":1,"freshnessWeight":7 |
| ❌ FAIL | PATCH | /api/v1/admin/messages/:conversationId/flag | 500 | {"success":false,"message":"notNull Violation: Aud |
| ✅ PASS | GET | /api/v1/admin/messages/reported | 200 | {"success":true,"data":[{"id":1,"senderId":101,"te |
| ❌ FAIL | POST | /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | GET | /api/v1/admin/dm-oversight/conversations/:conversationId/transcript | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/dm-oversight/stats | 200 | {"success":true,"data":{"highRisk":1,"underInvesti |
| ✅ PASS | GET | /api/v1/admin/dm-oversight/conversations | 200 | {"success":true,"data":[{"id":7,"user1Id":7,"user2 |
| ✅ PASS | GET | /api/v1/admin/dashboard/recent-posts | 200 | {"success":true,"data":[{"id":2072,"userId":112,"u |
| ✅ PASS | GET | /api/v1/admin/dashboard/recent-users | 200 | {"success":true,"data":[{"id":3185,"userId":112,"u |
| ✅ PASS | GET | /api/v1/admin/dashboard/login-methods | 200 | {"success":true,"data":[{"method":"email","count": |
| ✅ PASS | GET | /api/v1/admin/dashboard/media-distribution | 200 | {"success":true,"data":{"posts":29,"reels":2,"stor |
| ✅ PASS | GET | /api/v1/admin/dashboard/user-growth | 200 | {"success":true,"data":[{"month":"Jan","count":"17 |
| ✅ PASS | GET | /api/v1/admin/dashboard/activity-feed | 200 | {"success":true,"data":[{"id":169,"adminId":1,"act |
| ✅ PASS | GET | /api/v1/admin/dashboard/kpis | 200 | {"success":true,"data":{"totalUsers":899,"totalPos |
| ❌ FAIL | DELETE | /api/v1/admin/moderation/stories/:storyId | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/moderation/stories/:storyId/interactions | 200 | {"success":true,"data":{"views":[{"id":26,"storyId |
| ✅ PASS | GET | /api/v1/admin/moderation/stories | 200 | {"success":true,"data":[{"id":86,"userId":85,"user |
| ❌ FAIL | DELETE | /api/v1/admin/moderation/reels/:reelId | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/moderation/reels/:reelId/unhide | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/moderation/reels/:reelId/hide | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/moderation/reels/:reelId/interactions | 200 | {"success":true,"data":{"likes":[],"comments":[]," |
| ✅ PASS | GET | /api/v1/admin/moderation/reels | 200 | {"success":true,"data":[{"id":57,"userId":55,"user |
| ❌ FAIL | DELETE | /api/v1/admin/moderation/posts/:postId | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/moderation/posts/:postId/unhide | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/moderation/posts/:postId/hide | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/moderation/posts/:postId/interactions | 200 | {"success":true,"data":{"likes":[],"comments":[]," |
| ✅ PASS | GET | /api/v1/admin/moderation/posts | 200 | {"success":true,"data":[{"id":2072,"userId":112,"u |
| ❌ FAIL | DELETE | /api/v1/admin/comments/:commentId | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/comments/:commentId/remove | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/comments/:commentId/approve | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/comments/stats | 200 | {"success":true,"data":{"total":19,"pending":13,"f |
| ✅ PASS | GET | /api/v1/admin/comments/ | 200 | {"success":true,"data":[{"id":46,"postId":57,"user |
| ✅ PASS | PATCH | /api/v1/admin/cms/pages/:id | 200 | {"success":true,"message":"Page updated successful |
| ✅ PASS | GET | /api/v1/admin/cms/pages | 200 | {"success":true,"data":[{"id":1,"title":"Terms of  |
| ❌ FAIL | DELETE | /api/v1/admin/avatars/:avatarId | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/avatars/:avatarId/reject | 500 | {"success":false,"message":"Request failed with st |
| ❌ FAIL | PATCH | /api/v1/admin/avatars/:avatarId/approve | 500 | {"success":false,"message":"Request failed with st |
| ✅ PASS | GET | /api/v1/admin/avatars/stats | 200 | {"success":true,"data":{"total":0,"pending":0,"app |
| ✅ PASS | GET | /api/v1/admin/avatars/ | 200 | {"success":true,"data":[],"pagination":{"total":0, |
| ✅ PASS | DELETE | /api/v1/admin/auth/roles/:id | 200 | {"success":true,"message":"Role deleted"} |
| ✅ PASS | PUT | /api/v1/admin/auth/roles/:id | 404 | {"success":false,"message":"Role not found"} |
| ❌ FAIL | POST | /api/v1/admin/auth/roles | 500 | {"success":false,"message":"notNull Violation: Rol |
| ✅ PASS | GET | /api/v1/admin/auth/roles | 200 | {"success":true,"data":[{"id":2,"name":"moderator" |
| ❌ FAIL | DELETE | /api/v1/admin/auth/admins/:id | 500 | {"success":false,"message":"insert or update on ta |
| ✅ PASS | PATCH | /api/v1/admin/auth/admins/:id/role | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/auth/admins | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/auth/me | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | POST | /api/v1/admin/auth/login | 401 | {"success":false,"message":"Invalid credentials"} |
| ✅ PASS | GET | /api/v1/admin/audit/ | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/active-hours | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | GET | /api/v1/admin/countries | 404 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | GET | /api/v1/admin/analytics/active-hours | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/analytics/countries | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/analytics/top-content | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/analytics/engagement-trends | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/analytics/user-acquisition | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/analytics/summary | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/notifications/stats | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | GET | /api/v1/admin/notifications/history | 401 | {"success":false,"message":"Invalid or inactive ad |
| ✅ PASS | POST | /api/v1/admin/notifications/global | 401 | {"success":false,"message":"Invalid or inactive ad |

### auth-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/auth/history | 200 | {"status":"success","data":[{"id":72,"userId":128, |
| ✅ PASS | GET | /api/v1/auth/me | 200 | {"status":"success","data":{"id":128,"username":"t |
| ✅ PASS | POST | /api/v1/auth/logout | 200 | {"status":"success","message":"Logged out successf |
| ❌ FAIL | POST | /api/v1/auth/reset-password/verify | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/auth/reset-password/request | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | GET | /api/v1/auth/check-email | 500 | {"status":"error","message":"Server error"} |
| ❌ FAIL | GET | /api/v1/auth/check-username | 500 | {"status":"error","message":"Server error"} |
| ✅ PASS | POST | /api/v1/auth/login | 200 | {"status":"success","data":{"token":"eyJhbGciOiJIU |
| ❌ FAIL | POST | /api/v1/auth/signup | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | POST | /api/v1/auth/register | 400 | {"status":"fail","message":"Email already exists"} |

### comment-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | GET | /api/v1/comments/internal/post/:postId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | DELETE | /api/v1/comments/internal/:commentId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/comments/internal/:commentId/remove | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/comments/internal/:commentId/approve | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/comments/internal/:commentId | 500 | {"success":false,"error":"invalid input syntax for |
| ✅ PASS | GET | /api/v1/comments/internal/stats | 200 | {"success":true,"data":{"total":19,"pending":13,"f |
| ✅ PASS | GET | /api/v1/comments/internal/list | 200 | {"success":true,"data":[{"id":46,"postId":57,"user |
| ✅ PASS | GET | /api/v1/comments/activity/reviews | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/comments/activity/comments | 200 | {"status":"success","data":[]} |
| ✅ PASS | POST | /api/v1/comments/check-comments | 400 | {"message":"postIds array required"} |
| ✅ PASS | DELETE | /api/v1/comments/:id/like | 400 | {"status":"error","message":"userId required"} |
| ✅ PASS | POST | /api/v1/comments/:id/like | 400 | {"status":"error","message":"userId required"} |
| ❌ FAIL | DELETE | /api/v1/comments/:id | 500 | {"status":"error","message":"Server error"} |
| ✅ PASS | GET | /api/v1/comments/ | 400 | {"message":"postId query param required"} |
| ✅ PASS | POST | /api/v1/comments/ | 400 | {"status":"error","message":"Missing required fiel |

### feed-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/feed/ | 200 | {"status":"success","data":[{"createdAt":"2026-02- |

### help-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | POST | /api/v1/help/feedback | 500 | {"status":"error","message":"notNull Violation: Fe |
| ✅ PASS | GET | /api/v1/help/search | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/help/article/:slug | 404 | {"status":"fail","message":"Article not found"} |
| ✅ PASS | GET | /api/v1/help/articles | 200 | {"status":"success","data":[{"id":"e0087e06-4b7d-4 |
| ✅ PASS | GET | /api/v1/help/articles/featured | 200 | {"status":"success","data":[{"id":"b4e0bdc7-f300-4 |
| ✅ PASS | GET | /api/v1/help/category/:slug | 404 | {"status":"fail","message":"Category not found"} |
| ✅ PASS | GET | /api/v1/help/categories | 200 | {"status":"success","data":[{"id":"b33947d0-2fe9-4 |
| ✅ PASS | DELETE | /api/v1/help/admin/article/:id | 404 | {"message":"Article not found"} |
| ✅ PASS | PUT | /api/v1/help/admin/article/:id | 404 | {"message":"Article not found"} |
| ✅ PASS | GET | /api/v1/help/admin/articles | 200 | {"status":"success","data":[{"id":"1669b52c-afd8-4 |
| ❌ FAIL | POST | /api/v1/help/admin/article | 500 | {"status":"error","message":"notNull Violation: Ar |
| ✅ PASS | DELETE | /api/v1/help/admin/category/:id | 404 | {"message":"Category not found"} |
| ✅ PASS | PUT | /api/v1/help/admin/category/:id | 404 | {"message":"Category not found"} |
| ❌ FAIL | POST | /api/v1/help/admin/category | 500 | {"status":"error","message":"WHERE parameter \"slu |

### insight-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/insights/heatmap | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/insights/content | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/insights/account | 200 | {"status":"success","data":{"totalViews":0,"accoun |

### live-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | POST | /api/v1/live/webhook/done | 500 | Error |
| ❌ FAIL | POST | /api/v1/live/webhook/publish | 500 | Error |
| ❌ FAIL | POST | /api/v1/live/:id/chat | 500 | {"status":"error","message":"notNull Violation: Li |
| ✅ PASS | POST | /api/v1/live/:id/end | 404 | {"status":"error","message":"Stream not found"} |
| ✅ PASS | GET | /api/v1/live/:id | 404 | {"status":"error","message":"Stream not found"} |
| ✅ PASS | GET | /api/v1/live/feed | 200 | {"status":"success","data":[{"id":"f718d3d3-03f7-4 |
| ✅ PASS | POST | /api/v1/live/schedule | 400 | {"status":"error","message":"Title and scheduled t |
| ✅ PASS | POST | /api/v1/live/go-live | 400 | {"status":"error","message":"Title is required"} |

### media-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/media/files/* | 404 | File not found |
| ✅ PASS | POST | /api/v1/media/finalize | 400 | {"error":"Key is required"} |
| ✅ PASS | POST | /api/v1/media/presigned-url | 400 | {"status":"error","message":"Missing filename or f |
| ✅ PASS | GET | /api/v1/media/status/:id | 404 | {"error":"Media not found"} |
| ✅ PASS | POST | /api/v1/media/upload | 400 | {"error":"No file uploaded"} |

### message-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | POST | /api/v1/messages/seen | 500 | {"status":"error","message":"WHERE parameter \"con |
| ✅ PASS | POST | /api/v1/messages/send | 404 | {"status":"error","message":"Conversation not foun |
| ❌ FAIL | DELETE | /api/v1/messages/conversations/:conversationId | 500 | {"status":"error","message":"invalid input syntax  |
| ✅ PASS | POST | /api/v1/messages/conversations/:conversationId/report | 200 | {"status":"success","message":"Report submitted"} |
| ❌ FAIL | POST | /api/v1/messages/conversations/:conversationId/unblock | 500 | {"status":"error","message":"invalid input syntax  |
| ❌ FAIL | POST | /api/v1/messages/conversations/:conversationId/block | 500 | {"status":"error","message":"invalid input syntax  |
| ❌ FAIL | PATCH | /api/v1/messages/conversations/:conversationId/mute | 500 | {"status":"error","message":"invalid input syntax  |
| ❌ FAIL | GET | /api/v1/messages/conversations/:conversationId/details | 500 | {"status":"error","message":"invalid input syntax  |
| ❌ FAIL | GET | /api/v1/messages/conversations/:conversationId | 500 | {"status":"error","message":"Failed to fetch messa |
| ✅ PASS | GET | /api/v1/messages/conversations | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/messages/activity/story-replies | 200 | {"status":"success","data":[]} |
| ❌ FAIL | GET | /api/v1/messages/internal/conversations/:conversationId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/messages/internal/conversations/:conversationId/mark-safe | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/messages/internal/conversations/:conversationId/transcript | 500 | {"success":false,"error":"invalid input syntax for |
| ✅ PASS | GET | /api/v1/messages/internal/stats | 200 | {"success":true,"data":{"highRisk":1,"underInvesti |
| ✅ PASS | GET | /api/v1/messages/internal/conversations | 200 | {"success":true,"data":[{"id":7,"user1Id":7,"user2 |

### notification-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/notifications/admin/stats | 200 | {"success":true,"data":{"totalRecipients":0,"sentT |
| ✅ PASS | GET | /api/v1/notifications/admin/history | 200 | {"success":true,"data":[]} |
| ❌ FAIL | POST | /api/v1/notifications/admin/broadcast | 500 | {"success":false,"message":"notNull Violation: Adm |
| ✅ PASS | PATCH | /api/v1/notifications/read-all | 200 | {"status":"success","message":"All notifications m |
| ❌ FAIL | PATCH | /api/v1/notifications/:id/read | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/notifications/unread-count | 200 | {"status":"success","data":{"count":0}} |
| ✅ PASS | GET | /api/v1/notifications/ | 200 | {"status":"success","data":[]} |
| ✅ PASS | PATCH | /api/v1/notifications/settings | 200 | {"status":"success","data":{"id":"408dd1e7-d11e-4b |
| ✅ PASS | GET | /api/v1/notifications/settings | 200 | {"status":"success","data":{"id":"408dd1e7-d11e-4b |

### post-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | PATCH | /api/v1/posts/internal/reports/:id/status | 500 | {"success":false,"message":"invalid input syntax f |
| ❌ FAIL | GET | /api/v1/posts/internal/reports/:id | 500 | {"success":false,"message":"invalid input syntax f |
| ✅ PASS | GET | /api/v1/posts/internal/reports | 200 | {"success":true,"data":[],"pagination":{"page":1," |
| ✅ PASS | GET | /api/v1/posts/internal/reports/stats | 200 | {"success":true,"data":{"count":0}} |
| ✅ PASS | DELETE | /api/v1/posts/:id/bookmark | 400 | {"message":"User ID required"} |
| ✅ PASS | POST | /api/v1/posts/:id/bookmark | 400 | {"message":"User ID required"} |
| ✅ PASS | POST | /api/v1/posts/:id/report | 400 | {"status":"error","message":"Invalid Post ID"} |
| ❌ FAIL | PUT | /api/v1/posts/:id/toggle-comments | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | PUT | /api/v1/posts/:id/hide-likes | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | PUT | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | DELETE | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | GET | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | GET | /api/v1/posts/:id/embed | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/posts/activity/posts | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/posts/activity/likes | 200 | {"status":"success","data":[]} |
| ✅ PASS | POST | /api/v1/posts/check-likes | 400 | {"message":"User ID and postIds array required"} |
| ✅ PASS | GET | /api/v1/posts/saved | 200 | {"status":"success","data":[]} |
| ❌ FAIL | DELETE | /api/v1/posts/:id/like | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/posts/:id/like | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/posts/ | 200 | {"status":"success","data":[{"id":2072,"userId":11 |
| ✅ PASS | GET | /api/v1/posts/explore | 200 | {"status":"success","data":[{"id":56,"userId":51," |
| ✅ PASS | POST | /api/v1/posts/feed | 200 | {"status":"success","data":[]} |
| ❌ FAIL | POST | /api/v1/posts/ | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | GET | /api/v1/posts/internal/:postId/bookmarks | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/posts/internal/:postId/likes | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/posts/internal/:postId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | DELETE | /api/v1/posts/internal/:postId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/posts/internal/:postId/unhide | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/posts/internal/:postId/hide | 500 | {"success":false,"error":"invalid input syntax for |
| ✅ PASS | GET | /api/v1/posts/internal/user/:userId | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/posts/internal/stats/user/:userId | 200 | {"success":true,"data":{"count":0}} |
| ✅ PASS | GET | /api/v1/posts/internal/list | 200 | {"success":true,"data":[{"id":2072,"userId":112,"u |
| ✅ PASS | GET | /api/v1/posts/internal/recent | 200 | {"success":true,"data":[{"id":2072,"userId":112,"u |
| ✅ PASS | GET | /api/v1/posts/internal/top | 200 | {"success":true,"data":[{"contentId":137,"creatorU |
| ✅ PASS | GET | /api/v1/posts/internal/engagement/trends | 200 | {"success":true,"data":[{"month":"Feb","engagement |
| ✅ PASS | GET | /api/v1/posts/internal/stats/engagement | 200 | {"success":true,"data":{"rate":"10.3"}} |
| ✅ PASS | GET | /api/v1/posts/internal/stats/overall | 200 | {"success":true,"data":{"likes":1231,"comments":11 |
| ✅ PASS | GET | /api/v1/posts/internal/stats | 200 | {"success":true,"data":{"total":34,"growth":85}} |

### reel-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | GET | /api/v1/reels/:id | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/reels/user | 200 | {"status":"success","data":[]} |
| ❌ FAIL | DELETE | /api/v1/reels/:id/bookmark | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/reels/:id/bookmark | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | DELETE | /api/v1/reels/:id/like | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/reels/:id/like | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/reels/activity/likes | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/reels/activity/reels | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/reels/saved | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/reels/ | 200 | {"status":"success","data":[{"id":57,"userId":55," |
| ❌ FAIL | POST | /api/v1/reels/ | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | GET | /api/v1/reels/internal/:reelId/likes | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/reels/internal/:reelId | 500 | {"success":false,"error":"invalid input syntax for |
| ✅ PASS | GET | /api/v1/reels/internal/recent | 200 | {"success":true,"data":[{"id":57,"userId":55,"user |
| ❌ FAIL | DELETE | /api/v1/reels/internal/:reelId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/reels/internal/:reelId/unhide | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | PATCH | /api/v1/reels/internal/:reelId/hide | 500 | {"success":false,"error":"invalid input syntax for |
| ✅ PASS | GET | /api/v1/reels/internal/list | 200 | {"success":true,"data":[{"id":57,"userId":55,"user |
| ✅ PASS | GET | /api/v1/reels/internal/user/:userId | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/reels/internal/stats/user/:userId | 200 | {"success":true,"data":{"count":0}} |
| ✅ PASS | GET | /api/v1/reels/internal/stats/overall | 200 | {"success":true,"data":{"likes":74,"comments":6,"v |
| ✅ PASS | GET | /api/v1/reels/internal/stats | 200 | {"success":true,"data":{"total":2,"growth":100}} |

### search-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ✅ PASS | GET | /api/v1/search/users | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/search/ | 200 | {"status":"success","data":[]} |

### story-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | DELETE | /api/v1/stories/:id/react | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/stories/:id/react | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/stories/:id/view | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | POST | /api/v1/stories/:id/report | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | DELETE | /api/v1/stories/:id | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/stories/activity/story-replies | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/stories/archive | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/stories/ | 200 | {"status":"success","data":[]} |
| ❌ FAIL | POST | /api/v1/stories/ | 500 | {"status":"error","message":"Internal Server Error |
| ❌ FAIL | DELETE | /api/v1/stories/internal/:storyId | 500 | {"success":false,"error":"invalid input syntax for |
| ❌ FAIL | GET | /api/v1/stories/internal/:storyId/likes | 500 | {"success":false,"message":"invalid input syntax f |
| ❌ FAIL | GET | /api/v1/stories/internal/:storyId/views | 500 | {"success":false,"message":"invalid input syntax f |
| ✅ PASS | GET | /api/v1/stories/internal/list | 200 | {"success":true,"data":[{"id":86,"userId":85,"user |
| ✅ PASS | GET | /api/v1/stories/internal/stats | 200 | {"success":true,"data":{"total":83}} |
| ❌ FAIL | DELETE | /api/v1/stories/highlights/:highlightId | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | PUT | /api/v1/stories/highlights/:highlightId | 400 | {"status":"error","message":"Title is required"} |
| ❌ FAIL | GET | /api/v1/stories/highlights/:highlightId/stories | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/stories/highlights/:userId | 200 | {"status":"success","data":[]} |
| ✅ PASS | POST | /api/v1/stories/highlights | 400 | {"status":"error","message":"Title is required"} |
| ✅ PASS | GET | /api/v1/stories/activity/highlights | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/stories/stories/me | 200 | {"status":"success","data":[]} |

### user-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ❌ FAIL | DELETE | /api/v1/users/profile/followers/:followerId | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/users/profile/:userId/following | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/:userId/followers | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/:userId/reels | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/:userId/posts | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/:username | 404 | {"status":"error","message":"User not found"} |
| ✅ PASS | GET | /api/v1/users/profile/activity/account-history | 200 | {"status":"success","data":[]} |
| ✅ PASS | POST | /api/v1/users/profile/batch | 400 | {"status":"error","message":"userIds array require |
| ✅ PASS | GET | /api/v1/users/profile/suggestions | 200 | {"status":"success","data":[{"userId":2136,"userna |
| ✅ PASS | GET | /api/v1/users/profile/me/saved | 200 | {"status":"success","data":[]} |
| ✅ PASS | DELETE | /api/v1/users/profile/profile-photo | 200 | {"status":"success","data":{"id":1096,"userId":128 |
| ✅ PASS | POST | /api/v1/users/profile/profile-photo | 200 | {"status":"success","data":{"id":1096,"userId":128 |
| ✅ PASS | PUT | /api/v1/users/profile/me | 200 | {"status":"success","data":{"id":1096,"userId":128 |
| ✅ PASS | GET | /api/v1/users/profile/me | 200 | {"status":"success","data":{"id":1096,"userId":128 |
| ✅ PASS | POST | /api/v1/users/profile/help/feedback | 400 | {"status":"error","message":"Rating is required"} |
| ✅ PASS | GET | /api/v1/users/profile/help/support-requests | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/help/feature-limits | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/help/violations | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/help/account-status | 200 | {"status":"success","data":{"lastChecked":"2026-02 |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/apps/:id/revoke | 404 | {"status":"error","message":"App not found"} |
| ✅ PASS | GET | /api/v1/users/profile/settings/apps | 200 | {"status":"success","data":[]} |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/general | 200 | {"status":"success","data":{"saveStoryToArchive":t |
| ✅ PASS | GET | /api/v1/users/profile/settings/general | 200 | {"status":"success","data":{"userId":128,"saveStor |
| ✅ PASS | GET | /api/v1/users/profile/settings/subscriptions | 200 | {"status":"success","data":[]} |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/like-share | 200 | {"status":"success","data":{"hideLikeShareCounts": |
| ✅ PASS | GET | /api/v1/users/profile/settings/like-share | 200 | {"status":"success","data":{"userId":128,"hideLike |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/content-preferences | 200 | {"status":"success","data":{"sensitiveContentLevel |
| ✅ PASS | GET | /api/v1/users/profile/settings/content-preferences | 200 | {"status":"success","data":{"userId":128,"sensitiv |
| ✅ PASS | DELETE | /api/v1/users/profile/settings/muted/:userId | 200 | {"status":"success","message":"Account unmuted"} |
| ✅ PASS | POST | /api/v1/users/profile/settings/muted/:userId | 400 | {"status":"error","message":"Cannot mute yourself" |
| ✅ PASS | GET | /api/v1/users/profile/settings/muted | 200 | {"status":"success","data":[]} |
| ✅ PASS | DELETE | /api/v1/users/profile/settings/hidden-words/words/:id | 200 | {"status":"success","message":"Word removed"} |
| ✅ PASS | POST | /api/v1/users/profile/settings/hidden-words/words | 400 | {"status":"error","message":"Word is required"} |
| ✅ PASS | PUT | /api/v1/users/profile/settings/hidden-words | 200 | {"status":"success","data":{"hideComments":false," |
| ✅ PASS | GET | /api/v1/users/profile/settings/hidden-words | 200 | {"status":"success","data":{"settings":{"userId":1 |
| ✅ PASS | DELETE | /api/v1/users/profile/settings/restricted/:userId | 200 | {"status":"success","message":"Account unrestricte |
| ✅ PASS | POST | /api/v1/users/profile/settings/restricted/:userId | 400 | {"status":"error","message":"Cannot restrict yours |
| ✅ PASS | GET | /api/v1/users/profile/settings/restricted | 200 | {"status":"success","data":[]} |
| ✅ PASS | PUT | /api/v1/users/profile/settings/sharing | 200 | {"status":"success","data":{"storyShares":true,"po |
| ✅ PASS | GET | /api/v1/users/profile/settings/sharing | 200 | {"status":"success","data":{"userId":128,"storySha |
| ✅ PASS | PUT | /api/v1/users/profile/settings/comments | 200 | {"status":"success","data":{"allowFrom":"everyone" |
| ✅ PASS | GET | /api/v1/users/profile/settings/comments | 200 | {"status":"success","data":{"userId":128,"allowFro |
| ✅ PASS | PATCH | /api/v1/users/profile/tags/:id/remove | 404 | {"status":"error","message":"Tag request not found |
| ✅ PASS | PATCH | /api/v1/users/profile/tags/:id/approve | 404 | {"status":"error","message":"Tag request not found |
| ✅ PASS | GET | /api/v1/users/profile/tags/pending | 200 | {"status":"success","data":[]} |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/tags-mentions | 200 | {"status":"success","data":{"allowTagsFrom":"every |
| ✅ PASS | GET | /api/v1/users/profile/settings/tags-mentions | 200 | {"status":"success","data":{"userId":128,"allowTag |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/activity-status | 200 | {"status":"success","data":{"showActivityStatus":t |
| ✅ PASS | GET | /api/v1/users/profile/settings/activity-status | 200 | {"status":"success","data":{"userId":128,"showActi |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/story-replies | 200 | {"status":"success","data":{"storyReplies":"everyo |
| ✅ PASS | GET | /api/v1/users/profile/settings/story-replies | 200 | {"status":"success","data":{"userId":128,"storyRep |
| ✅ PASS | PATCH | /api/v1/users/profile/settings/messages | 200 | {"status":"success","data":{"messageRequestsFrom": |
| ✅ PASS | GET | /api/v1/users/profile/settings/messages | 200 | {"status":"success","data":{"userId":128,"messageR |
| ❌ FAIL | DELETE | /api/v1/users/profile/story-privacy/unhide/:hiddenUserId | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | POST | /api/v1/users/profile/story-privacy/hide | 400 | {"status":"error","message":"Hidden User ID requir |
| ✅ PASS | GET | /api/v1/users/profile/story-privacy/hidden-users | 200 | {"status":"success","data":[]} |
| ✅ PASS | DELETE | /api/v1/users/profile/unblock/:userId | 200 | {"status":"success","message":"User unblocked"} |
| ✅ PASS | POST | /api/v1/users/profile/block/:userId | 400 | {"status":"error","message":"Cannot block yourself |
| ✅ PASS | GET | /api/v1/users/profile/blocked-users | 200 | {"status":"success","data":[]} |
| ✅ PASS | DELETE | /api/v1/users/profile/close-friends/:friendId | 400 | {"status":"error","message":"Invalid Friend ID. Ex |
| ❌ FAIL | POST | /api/v1/users/profile/close-friends/:friendId | 500 | {"status":"error","message":"Internal Server Error |
| ✅ PASS | GET | /api/v1/users/profile/close-friends | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/profile/reports/me | 200 | {"status":"success","data":[]} |
| ✅ PASS | POST | /api/v1/users/profile/report-problem | 400 | {"status":"error","message":"Please provide some d |
| ✅ PASS | GET | /api/v1/users/internal/:userId/follow-counts | 200 | {"success":true,"data":{"followersCount":0,"follow |
| ✅ PASS | GET | /api/v1/users/internal/:userId | 200 | {"success":true,"data":{"id":1096,"userId":128,"us |
| ✅ PASS | POST | /api/v1/users/internal/bulk | 400 | {"success":false,"message":"userIds must be an arr |
| ✅ PASS | GET | /api/v1/users/internal/recent | 200 | {"success":true,"data":[{"id":3185,"userId":112,"u |
| ✅ PASS | DELETE | /api/v1/users/internal/:userId | 200 | {"success":true,"message":"User soft deleted"} |
| ✅ PASS | PATCH | /api/v1/users/internal/:userId/unban | 200 | {"success":true,"message":"User unbanned"} |
| ✅ PASS | PATCH | /api/v1/users/internal/:userId/ban | 200 | {"success":true,"message":"User banned"} |
| ✅ PASS | GET | /api/v1/users/internal/list | 200 | {"success":true,"data":[{"id":3185,"userId":112,"u |
| ✅ PASS | GET | /api/v1/users/internal/countries | 200 | {"success":true,"data":[{"name":"Unknown","count": |
| ✅ PASS | GET | /api/v1/users/internal/login-methods | 200 | {"success":true,"data":[{"method":"email","count": |
| ✅ PASS | GET | /api/v1/users/internal/growth | 200 | {"success":true,"data":[{"month":"Jan","count":"17 |
| ✅ PASS | DELETE | /api/v1/users/internal/avatars/:avatarId | 404 | {"success":false,"message":"Avatar not found"} |
| ✅ PASS | PATCH | /api/v1/users/internal/avatars/:avatarId/reject | 404 | {"success":false,"message":"Avatar not found"} |
| ✅ PASS | PATCH | /api/v1/users/internal/avatars/:avatarId/approve | 404 | {"success":false,"message":"Avatar not found"} |
| ✅ PASS | GET | /api/v1/users/internal/avatars/stats | 200 | {"success":true,"data":{"total":0,"pending":0,"app |
| ✅ PASS | GET | /api/v1/users/internal/avatars | 200 | {"success":true,"data":[],"pagination":{"total":0, |
| ✅ PASS | GET | /api/v1/users/internal/stats | 200 | {"success":true,"data":{"total":899,"growth":84}} |
| ✅ PASS | PATCH | /api/v1/users/internal/reports/:id/status | 404 | {"success":false,"message":"Report not found"} |
| ✅ PASS | GET | /api/v1/users/internal/reports/:id | 404 | {"success":false,"message":"Report not found"} |
| ✅ PASS | GET | /api/v1/users/internal/reports | 200 | {"success":true,"data":[{"id":"6e7ff125-e3f8-4302- |
| ✅ PASS | GET | /api/v1/users/internal/reports/stats | 200 | {"success":true,"data":{"count":0}} |
| ❌ FAIL | POST | /api/v1/users/requests/reject | 500 | {"status":"error","message":"WHERE parameter \"req |
| ❌ FAIL | POST | /api/v1/users/requests/accept | 500 | {"status":"error","message":"WHERE parameter \"req |
| ✅ PASS | GET | /api/v1/users/requests | 200 | {"status":"success","data":[]} |
| ✅ PASS | GET | /api/v1/users/:userId/following | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/users/:userId/followers | 200 | {"success":true,"data":[]} |
| ✅ PASS | GET | /api/v1/users/:userId/follow/status | 200 | {"status":"success","data":{"isFollowing":{"paddin |
| ✅ PASS | DELETE | /api/v1/users/:userId/follow | 200 | {"status":"none","isFollowing":false,"isRequested" |
| ❌ FAIL | POST | /api/v1/users/:userId/follow | 500 | {"status":"error","message":"You cannot follow you |

## Failed Endpoints (103)

| Service | Method | Path | Status Code | Error |
|---------|--------|------|-------------|-------|
| ad-service | POST | /api/v1/ads/:id/comments | 500 | {"status":"error","message":"insert or update on table \"ad_comments\" violates foreign key constrai |
| ad-service | POST | /api/v1/ads/:id/bookmark | 500 | {"status":"error","message":"insert or update on table \"ad_bookmarks\" violates foreign key constra |
| ad-service | POST | /api/v1/ads/:id/like | 500 | {"status":"error","message":"insert or update on table \"ad_likes\" violates foreign key constraint  |
| ad-service | POST | /api/v1/ads/click | 500 | {"status":"error","message":"insert or update on table \"ad_clicks\" violates foreign key constraint |
| ad-service | POST | /api/v1/ads/impression | 500 | {"status":"error","message":"insert or update on table \"ad_impressions\" violates foreign key const |
| admin-service | POST | /api/v1/admin/reports/:id/ban-user | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | POST | /api/v1/admin/reports/:id/ignore | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | GET | /api/v1/admin/reports/:id | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | POST | /api/v1/admin/default-avatars/ | 500 | {"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violatio |
| admin-service | PATCH | /api/v1/admin/messages/:conversationId/flag | 500 | {"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violatio |
| admin-service | POST | /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | GET | /api/v1/admin/dm-oversight/conversations/:conversationId/transcript | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/moderation/stories/:storyId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/moderation/reels/:reelId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/unhide | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/hide | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/moderation/posts/:postId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/unhide | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/hide | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/remove | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/approve | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | DELETE | /api/v1/admin/avatars/:avatarId | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/reject | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/approve | 500 | {"success":false,"message":"Request failed with status code 404"} |
| admin-service | POST | /api/v1/admin/auth/roles | 500 | {"success":false,"message":"notNull Violation: Role.name cannot be null"} |
| admin-service | DELETE | /api/v1/admin/auth/admins/:id | 500 | {"success":false,"message":"insert or update on table \"admin_audit_logs\" violates foreign key cons |
| auth-service | POST | /api/v1/auth/reset-password/verify | 500 | {"status":"error","message":"Internal Server Error"} |
| auth-service | POST | /api/v1/auth/reset-password/request | 500 | {"status":"error","message":"Internal Server Error"} |
| auth-service | GET | /api/v1/auth/check-email | 500 | {"status":"error","message":"Server error"} |
| auth-service | GET | /api/v1/auth/check-username | 500 | {"status":"error","message":"Server error"} |
| auth-service | POST | /api/v1/auth/signup | 500 | {"status":"error","message":"Internal Server Error"} |
| comment-service | GET | /api/v1/comments/internal/post/:postId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| comment-service | DELETE | /api/v1/comments/internal/:commentId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/remove | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/approve | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| comment-service | GET | /api/v1/comments/internal/:commentId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| comment-service | DELETE | /api/v1/comments/:id | 500 | {"status":"error","message":"Server error"} |
| help-service | POST | /api/v1/help/feedback | 500 | {"status":"error","message":"notNull Violation: Feedback.articleId cannot be null,\nnotNull Violatio |
| help-service | POST | /api/v1/help/admin/article | 500 | {"status":"error","message":"notNull Violation: Article.title cannot be null,\nnotNull Violation: Ar |
| help-service | POST | /api/v1/help/admin/category | 500 | {"status":"error","message":"WHERE parameter \"slug\" has invalid \"undefined\" value"} |
| live-service | POST | /api/v1/live/webhook/done | 500 | Error |
| live-service | POST | /api/v1/live/webhook/publish | 500 | Error |
| live-service | POST | /api/v1/live/:id/chat | 500 | {"status":"error","message":"notNull Violation: LiveChatMessage.message cannot be null"} |
| message-service | POST | /api/v1/messages/seen | 500 | {"status":"error","message":"WHERE parameter \"conversation_id\" has invalid \"undefined\" value"} |
| message-service | DELETE | /api/v1/messages/conversations/:conversationId | 500 | {"status":"error","message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f0 |
| message-service | POST | /api/v1/messages/conversations/:conversationId/unblock | 500 | {"status":"error","message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f0 |
| message-service | POST | /api/v1/messages/conversations/:conversationId/block | 500 | {"status":"error","message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f0 |
| message-service | PATCH | /api/v1/messages/conversations/:conversationId/mute | 500 | {"status":"error","message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f0 |
| message-service | GET | /api/v1/messages/conversations/:conversationId/details | 500 | {"status":"error","message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f0 |
| message-service | GET | /api/v1/messages/conversations/:conversationId | 500 | {"status":"error","message":"Failed to fetch messages"} |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| message-service | PATCH | /api/v1/messages/internal/conversations/:conversationId/mark-safe | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId/transcript | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| notification-service | POST | /api/v1/notifications/admin/broadcast | 500 | {"success":false,"message":"notNull Violation: AdminNotification.title cannot be null,\nnotNull Viol |
| notification-service | PATCH | /api/v1/notifications/:id/read | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | PATCH | /api/v1/posts/internal/reports/:id/status | 500 | {"success":false,"message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f06 |
| post-service | GET | /api/v1/posts/internal/reports/:id | 500 | {"success":false,"message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f06 |
| post-service | PUT | /api/v1/posts/:id/toggle-comments | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | PUT | /api/v1/posts/:id/hide-likes | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | PUT | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | DELETE | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | GET | /api/v1/posts/:id | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | GET | /api/v1/posts/:id/embed | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | DELETE | /api/v1/posts/:id/like | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | POST | /api/v1/posts/:id/like | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | POST | /api/v1/posts/ | 500 | {"status":"error","message":"Internal Server Error"} |
| post-service | GET | /api/v1/posts/internal/:postId/bookmarks | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| post-service | GET | /api/v1/posts/internal/:postId/likes | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| post-service | GET | /api/v1/posts/internal/:postId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| post-service | DELETE | /api/v1/posts/internal/:postId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| post-service | PATCH | /api/v1/posts/internal/:postId/unhide | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| post-service | PATCH | /api/v1/posts/internal/:postId/hide | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| reel-service | GET | /api/v1/reels/:id | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | DELETE | /api/v1/reels/:id/bookmark | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | POST | /api/v1/reels/:id/bookmark | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | DELETE | /api/v1/reels/:id/like | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | POST | /api/v1/reels/:id/like | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | POST | /api/v1/reels/ | 500 | {"status":"error","message":"Internal Server Error"} |
| reel-service | GET | /api/v1/reels/internal/:reelId/likes | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| reel-service | GET | /api/v1/reels/internal/:reelId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| reel-service | DELETE | /api/v1/reels/internal/:reelId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/unhide | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/hide | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| story-service | DELETE | /api/v1/stories/:id/react | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | POST | /api/v1/stories/:id/react | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | POST | /api/v1/stories/:id/view | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | POST | /api/v1/stories/:id/report | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | DELETE | /api/v1/stories/:id | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | POST | /api/v1/stories/ | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | DELETE | /api/v1/stories/internal/:storyId | 500 | {"success":false,"error":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f064f |
| story-service | GET | /api/v1/stories/internal/:storyId/likes | 500 | {"success":false,"message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f06 |
| story-service | GET | /api/v1/stories/internal/:storyId/views | 500 | {"success":false,"message":"invalid input syntax for type integer: \"724aea3d-51d9-482a-92e1-9533f06 |
| story-service | DELETE | /api/v1/stories/highlights/:highlightId | 500 | {"status":"error","message":"Internal Server Error"} |
| story-service | GET | /api/v1/stories/highlights/:highlightId/stories | 500 | {"status":"error","message":"Internal Server Error"} |
| user-service | DELETE | /api/v1/users/profile/followers/:followerId | 500 | {"status":"error","message":"Internal Server Error"} |
| user-service | DELETE | /api/v1/users/profile/story-privacy/unhide/:hiddenUserId | 500 | {"status":"error","message":"Internal Server Error"} |
| user-service | POST | /api/v1/users/profile/close-friends/:friendId | 500 | {"status":"error","message":"Internal Server Error"} |
| user-service | POST | /api/v1/users/requests/reject | 500 | {"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"} |
| user-service | POST | /api/v1/users/requests/accept | 500 | {"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"} |
| user-service | POST | /api/v1/users/:userId/follow | 500 | {"status":"error","message":"You cannot follow yourself"} |

## Recommendations

- **103 endpoints failed**: Review the failed endpoints above and check service logs for errors.

## Swagger Documentation

For detailed API documentation, visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

You can test individual endpoints interactively using the Swagger UI.
