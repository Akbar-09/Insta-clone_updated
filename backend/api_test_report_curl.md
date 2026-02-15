# API Endpoint Test Report

**Generated:** 13/2/2026, 10:51:30 am

**Gateway URL:** http://localhost:5000
**Swagger Documentation:** http://localhost:5000/api-docs

## Overall Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| **Total Endpoints** | 370 | 100% |
| **Passed** | 5 | 1.4% |
| **Failed** | 0 | 0.0% |
| **Skipped** | 365 | 98.6% |

## Statistics by Service

| Service | Total | Passed | Failed | Skipped | Success Rate |
|---------|-------|--------|--------|---------|-------------|
| ad-service | 22 | 1 | 0 | 21 | 4.5% |
| admin-service | 107 | 1 | 0 | 106 | 0.9% |
| auth-service | 10 | 3 | 0 | 7 | 30.0% |
| comment-service | 15 | 0 | 0 | 15 | 0.0% |
| feed-service | 1 | 0 | 0 | 1 | 0.0% |
| help-service | 5 | 0 | 0 | 5 | 0.0% |
| insight-service | 3 | 0 | 0 | 3 | 0.0% |
| live-service | 8 | 0 | 0 | 8 | 0.0% |
| media-service | 5 | 0 | 0 | 5 | 0.0% |
| message-service | 16 | 0 | 0 | 16 | 0.0% |
| notification-service | 9 | 0 | 0 | 9 | 0.0% |
| post-service | 37 | 0 | 0 | 37 | 0.0% |
| reel-service | 17 | 0 | 0 | 17 | 0.0% |
| search-service | 2 | 0 | 0 | 2 | 0.0% |
| story-service | 21 | 0 | 0 | 21 | 0.0% |
| user-service | 92 | 0 | 0 | 92 | 0.0% |

## Statistics by HTTP Method

| Method | Total | Passed | Failed | Skipped | Success Rate |
|--------|-------|--------|--------|---------|-------------|
| DELETE | 41 | 0 | 0 | 41 | 0.0% |
| GET | 194 | 1 | 0 | 193 | 0.5% |
| PATCH | 48 | 0 | 0 | 48 | 0.0% |
| POST | 70 | 4 | 0 | 66 | 5.7% |
| PUT | 17 | 0 | 0 | 17 | 0.0% |

## Detailed Results by Service

### ad-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | POST | /api/v1/ads/ | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/ads/:id/comments/:commentId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/comments | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/ads/:id/comments | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/bookmark | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/like | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/ads/:id/embed | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id/toggle-comments | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id/hide-likes | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/ads/:id | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/click | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/impression | 0 | No user token available |
| ✅ PASS | GET | /api/v1/ads/active | 200 | {"status":"success","data":[{"id":"7abd623f-c3cf-4 |
| ⊘ SKIPPED | GET | /api/v1/ads/eligible-content | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/publish | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id/budget | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id/targeting | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/ads/:id/details | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/boost-content | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/:id/media | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/ads/draft | 0 | No user token available |

### admin-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/admin/users/:userId/reels | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/users/:userId/posts | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/users/:userId/following | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/users/:userId/followers | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/users/:userId/details | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/users/:userId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/users/:userId/unban | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/users/:userId/ban | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/users/ | 0 | No admin token available |
| ⊘ SKIPPED | PUT | /api/v1/admin/settings/ | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/settings/ | 0 | No admin token available |
| ⊘ SKIPPED | PUT | /api/v1/admin/settings/profile | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/settings/profile | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/reports/:id/ban-user | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/reports/:id/ignore | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/reports/:id | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/reports/ | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/reports/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/reels | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/posts | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/comments/:commentId | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/stories/:storyId | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/reels/:reelId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/posts/:postId/hide | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/posts/:postId | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/default-avatars/ | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/default-avatars/ | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/languages/:id/set-default | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/languages/:id/disable | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/languages/:id/enable | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/languages/ | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/feature | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/:id/block | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/trending | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/ | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/hashtags/:id | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/hashtags/:id/toggle-visibility | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/hashtags/trending | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/hashtags/ | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/geo-users | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/explore/performance-metrics | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/explore/category-distribution | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/explore/trending-topics/:topicId | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/explore/trending-topics | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/explore/trending-topics | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/explore/algorithm | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/explore/algorithm | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/messages/:conversationId/flag | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/messages/reported | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dm-oversight/conversations/:conversationId/transcript | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dm-oversight/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dm-oversight/conversations | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/recent-posts | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/recent-users | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/login-methods | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/media-distribution | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/user-growth | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/activity-feed | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/dashboard/kpis | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/moderation/stories/:storyId | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/stories/:storyId/interactions | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/stories | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/moderation/reels/:reelId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/moderation/reels/:reelId/unhide | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/moderation/reels/:reelId/hide | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/reels/:reelId/interactions | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/reels | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/moderation/posts/:postId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/moderation/posts/:postId/unhide | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/moderation/posts/:postId/hide | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/posts/:postId/interactions | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/moderation/posts | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/comments/:commentId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/comments/:commentId/remove | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/comments/:commentId/approve | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/comments/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/comments/ | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/cms/pages/:id | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/cms/pages | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/avatars/:avatarId | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/avatars/:avatarId/reject | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/avatars/:avatarId/approve | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/avatars/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/avatars/ | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/auth/roles/:id | 0 | No admin token available |
| ⊘ SKIPPED | PUT | /api/v1/admin/auth/roles/:id | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/auth/roles | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/auth/roles | 0 | No admin token available |
| ⊘ SKIPPED | DELETE | /api/v1/admin/auth/admins/:id | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/admin/auth/admins/:id/role | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/auth/admins | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/auth/me | 0 | No admin token available |
| ✅ PASS | POST | /api/v1/admin/auth/login | 400 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ⊘ SKIPPED | GET | /api/v1/admin/audit/ | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/active-hours | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/countries | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/active-hours | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/countries | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/top-content | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/engagement-trends | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/user-acquisition | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/analytics/summary | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/notifications/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/admin/notifications/history | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/admin/notifications/global | 0 | No admin token available |

### auth-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/auth/history | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/auth/me | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/auth/logout | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/auth/reset-password/verify | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/auth/reset-password/request | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/auth/check-email | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/auth/check-username | 0 | No user token available |
| ✅ PASS | POST | /api/v1/auth/login | 400 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | POST | /api/v1/auth/signup | 400 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |
| ✅ PASS | POST | /api/v1/auth/register | 400 | <!DOCTYPE html>
<html lang="en">
<head>
<meta char |

### comment-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/comments/internal/post/:postId | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/comments/internal/:commentId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/comments/internal/:commentId/remove | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/comments/internal/:commentId/approve | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/internal/:commentId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/internal/stats | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/internal/list | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/activity/reviews | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/activity/comments | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/comments/check-comments | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/comments/:id/like | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/comments/:id/like | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/comments/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/comments/ | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/comments/ | 0 | No user token available |

### feed-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/feed/ | 0 | No user token available |

### help-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | POST | /api/v1/help/api/help/feedback | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/help/api/help/search | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/help/api/help/articles/:slug | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/help/api/help/articles/featured | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/help/api/help/categories | 0 | No user token available |

### insight-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/insights/heatmap | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/insights/content | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/insights/account | 0 | No user token available |

### live-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | POST | /api/v1/live/webhook/done | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/live/webhook/publish | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/live/:id/chat | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/live/:id/end | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/live/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/live/feed | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/live/schedule | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/live/go-live | 0 | No user token available |

### media-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/media/files/* | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/media/finalize | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/media/presigned-url | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/media/status/:id | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/media/upload | 0 | No user token available |

### message-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | POST | /api/v1/messages/seen | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/messages/send | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/messages/conversations/:conversationId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/messages/conversations/:conversationId/report | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/messages/conversations/:conversationId/unblock | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/messages/conversations/:conversationId/block | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/messages/conversations/:conversationId/mute | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/conversations/:conversationId/details | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/conversations/:conversationId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/conversations | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/activity/story-replies | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/internal/conversations/:conversationId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/messages/internal/conversations/:conversationId/mark-safe | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/internal/conversations/:conversationId/transcript | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/internal/stats | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/messages/internal/conversations | 0 | No user token available |

### notification-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/notifications/admin/stats | 0 | No admin token available |
| ⊘ SKIPPED | GET | /api/v1/notifications/admin/history | 0 | No admin token available |
| ⊘ SKIPPED | POST | /api/v1/notifications/admin/broadcast | 0 | No admin token available |
| ⊘ SKIPPED | PATCH | /api/v1/notifications/read-all | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/notifications/:id/read | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/notifications/unread-count | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/notifications/ | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/notifications/settings | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/notifications/settings | 0 | No user token available |

### post-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | PATCH | /api/v1/posts/internal/reports/:id/status | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/reports/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/reports | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/reports/stats | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/posts/:id/bookmark | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/posts/:id/bookmark | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/posts/:id/report | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/posts/:id/toggle-comments | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/posts/:id/hide-likes | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/posts/:id | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/posts/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/:id/embed | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/activity/posts | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/activity/likes | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/posts/check-likes | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/saved | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/posts/:id/like | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/posts/:id/like | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/ | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/explore | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/posts/ | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/:postId/bookmarks | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/:postId/likes | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/:postId | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/posts/internal/:postId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/posts/internal/:postId/unhide | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/posts/internal/:postId/hide | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/user/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/stats/user/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/list | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/recent | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/top | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/engagement/trends | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/stats/engagement | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/stats/overall | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/posts/internal/stats | 0 | No user token available |

### reel-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | DELETE | /api/v1/reels/:id/like | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/reels/:id/like | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/activity/likes | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/activity/reels | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/ | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/reels/ | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/:reelId/likes | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/:reelId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/recent | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/reels/internal/:reelId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/reels/internal/:reelId/unhide | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/reels/internal/:reelId/hide | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/list | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/user/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/stats/user/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/stats/overall | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/reels/internal/stats | 0 | No user token available |

### search-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | GET | /api/v1/search/users | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/search/ | 0 | No user token available |

### story-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | DELETE | /api/v1/stories/:id/react | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/stories/:id/react | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/stories/:id/view | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/stories/:id/report | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/stories/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/activity/story-replies | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/archive | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/ | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/stories/ | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/stories/internal/:storyId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/internal/:storyId/likes | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/internal/:storyId/views | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/internal/list | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/internal/stats | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/stories/highlights/:highlightId | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/stories/highlights/:highlightId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/highlights/:highlightId/stories | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/highlights/:userId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/stories/highlights | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/activity/highlights | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/stories/stories/me | 0 | No user token available |

### user-service

| Status | Method | Path | Status Code | Message |
|--------|--------|------|-------------|----------|
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/followers/:followerId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/:userId/following | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/:userId/followers | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/:userId/posts | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/:username | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/activity/account-history | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/batch | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/suggestions | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/me/saved | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/profile-photo | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/profile-photo | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/users/profile/me | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/me | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/help/feedback | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/help/support-requests | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/help/feature-limits | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/help/violations | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/help/account-status | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/apps/:id/revoke | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/apps | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/general | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/general | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/subscriptions | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/like-share | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/like-share | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/content-preferences | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/content-preferences | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/settings/muted/:userId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/settings/muted/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/muted | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/settings/hidden-words/words/:id | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/settings/hidden-words/words | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/users/profile/settings/hidden-words | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/hidden-words | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/settings/restricted/:userId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/settings/restricted/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/restricted | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/users/profile/settings/sharing | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/sharing | 0 | No user token available |
| ⊘ SKIPPED | PUT | /api/v1/users/profile/settings/comments | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/comments | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/tags/:id/remove | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/tags/:id/approve | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/tags/pending | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/tags-mentions | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/tags-mentions | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/activity-status | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/activity-status | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/story-replies | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/story-replies | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/profile/settings/messages | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/settings/messages | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/story-privacy/unhide/:hiddenUserId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/story-privacy/hide | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/story-privacy/hidden-users | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/unblock/:userId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/block/:userId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/blocked-users | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/profile/close-friends/:friendId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/close-friends/:friendId | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/close-friends | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/profile/reports/me | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/profile/report-problem | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/:userId/follow-counts | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/:userId | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/internal/bulk | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/recent | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/internal/:userId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/internal/:userId/unban | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/internal/:userId/ban | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/list | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/countries | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/login-methods | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/growth | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/internal/avatars/:avatarId | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/internal/avatars/:avatarId/reject | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/internal/avatars/:avatarId/approve | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/avatars/stats | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/avatars | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/stats | 0 | No user token available |
| ⊘ SKIPPED | PATCH | /api/v1/users/internal/reports/:id/status | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/reports/:id | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/reports | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/internal/reports/stats | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/requests/reject | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/requests/accept | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/requests | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/:userId/following | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/:userId/followers | 0 | No user token available |
| ⊘ SKIPPED | GET | /api/v1/users/:userId/follow/status | 0 | No user token available |
| ⊘ SKIPPED | DELETE | /api/v1/users/:userId/follow | 0 | No user token available |
| ⊘ SKIPPED | POST | /api/v1/users/:userId/follow | 0 | No user token available |

## Skipped Endpoints (365)

| Service | Method | Path | Reason |
|---------|--------|------|--------|
| ad-service | POST | /api/v1/ads/ | No user token available |
| ad-service | DELETE | /api/v1/ads/:id/comments/:commentId | No user token available |
| ad-service | POST | /api/v1/ads/:id/comments | No user token available |
| ad-service | GET | /api/v1/ads/:id/comments | No user token available |
| ad-service | POST | /api/v1/ads/:id/bookmark | No user token available |
| ad-service | POST | /api/v1/ads/:id/like | No user token available |
| ad-service | GET | /api/v1/ads/:id/embed | No user token available |
| ad-service | PUT | /api/v1/ads/:id/toggle-comments | No user token available |
| ad-service | PUT | /api/v1/ads/:id/hide-likes | No user token available |
| ad-service | PUT | /api/v1/ads/:id | No user token available |
| ad-service | DELETE | /api/v1/ads/:id | No user token available |
| ad-service | POST | /api/v1/ads/click | No user token available |
| ad-service | POST | /api/v1/ads/impression | No user token available |
| ad-service | GET | /api/v1/ads/eligible-content | No user token available |
| ad-service | POST | /api/v1/ads/:id/publish | No user token available |
| ad-service | PUT | /api/v1/ads/:id/budget | No user token available |
| ad-service | PUT | /api/v1/ads/:id/targeting | No user token available |
| ad-service | PUT | /api/v1/ads/:id/details | No user token available |
| ad-service | POST | /api/v1/ads/:id/boost-content | No user token available |
| ad-service | POST | /api/v1/ads/:id/media | No user token available |
| ad-service | POST | /api/v1/ads/draft | No user token available |
| admin-service | GET | /api/v1/admin/users/:userId/reels | No admin token available |
| admin-service | GET | /api/v1/admin/users/:userId/posts | No admin token available |
| admin-service | GET | /api/v1/admin/users/:userId/following | No admin token available |
| admin-service | GET | /api/v1/admin/users/:userId/followers | No admin token available |
| admin-service | GET | /api/v1/admin/users/:userId/details | No admin token available |
| admin-service | DELETE | /api/v1/admin/users/:userId | No admin token available |
| admin-service | PATCH | /api/v1/admin/users/:userId/unban | No admin token available |
| admin-service | PATCH | /api/v1/admin/users/:userId/ban | No admin token available |
| admin-service | GET | /api/v1/admin/users/ | No admin token available |
| admin-service | PUT | /api/v1/admin/settings/ | No admin token available |
| admin-service | GET | /api/v1/admin/settings/ | No admin token available |
| admin-service | PUT | /api/v1/admin/settings/profile | No admin token available |
| admin-service | GET | /api/v1/admin/settings/profile | No admin token available |
| admin-service | POST | /api/v1/admin/reports/:id/ban-user | No admin token available |
| admin-service | POST | /api/v1/admin/reports/:id/ignore | No admin token available |
| admin-service | GET | /api/v1/admin/reports/:id | No admin token available |
| admin-service | GET | /api/v1/admin/reports/ | No admin token available |
| admin-service | GET | /api/v1/admin/reports/stats | No admin token available |
| admin-service | GET | /api/v1/admin/reels | No admin token available |
| admin-service | GET | /api/v1/admin/posts | No admin token available |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | No admin token available |
| admin-service | DELETE | /api/v1/admin/stories/:storyId | No admin token available |
| admin-service | DELETE | /api/v1/admin/reels/:reelId | No admin token available |
| admin-service | PATCH | /api/v1/admin/posts/:postId/hide | No admin token available |
| admin-service | DELETE | /api/v1/admin/posts/:postId | No admin token available |
| admin-service | POST | /api/v1/admin/default-avatars/ | No admin token available |
| admin-service | GET | /api/v1/admin/default-avatars/ | No admin token available |
| admin-service | PATCH | /api/v1/admin/languages/:id/set-default | No admin token available |
| admin-service | PATCH | /api/v1/admin/languages/:id/disable | No admin token available |
| admin-service | PATCH | /api/v1/admin/languages/:id/enable | No admin token available |
| admin-service | GET | /api/v1/admin/languages/ | No admin token available |
| admin-service | POST | /api/v1/admin/feature | No admin token available |
| admin-service | PATCH | /api/v1/admin/:id/block | No admin token available |
| admin-service | GET | /api/v1/admin/trending | No admin token available |
| admin-service | GET | /api/v1/admin/ | No admin token available |
| admin-service | DELETE | /api/v1/admin/hashtags/:id | No admin token available |
| admin-service | PATCH | /api/v1/admin/hashtags/:id/toggle-visibility | No admin token available |
| admin-service | GET | /api/v1/admin/hashtags/trending | No admin token available |
| admin-service | GET | /api/v1/admin/hashtags/ | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/geo-users | No admin token available |
| admin-service | GET | /api/v1/admin/explore/performance-metrics | No admin token available |
| admin-service | GET | /api/v1/admin/explore/category-distribution | No admin token available |
| admin-service | DELETE | /api/v1/admin/explore/trending-topics/:topicId | No admin token available |
| admin-service | POST | /api/v1/admin/explore/trending-topics | No admin token available |
| admin-service | GET | /api/v1/admin/explore/trending-topics | No admin token available |
| admin-service | PATCH | /api/v1/admin/explore/algorithm | No admin token available |
| admin-service | GET | /api/v1/admin/explore/algorithm | No admin token available |
| admin-service | PATCH | /api/v1/admin/messages/:conversationId/flag | No admin token available |
| admin-service | GET | /api/v1/admin/messages/reported | No admin token available |
| admin-service | POST | /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users | No admin token available |
| admin-service | PATCH | /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe | No admin token available |
| admin-service | GET | /api/v1/admin/dm-oversight/conversations/:conversationId/transcript | No admin token available |
| admin-service | GET | /api/v1/admin/dm-oversight/stats | No admin token available |
| admin-service | GET | /api/v1/admin/dm-oversight/conversations | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/recent-posts | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/recent-users | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/login-methods | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/media-distribution | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/user-growth | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/activity-feed | No admin token available |
| admin-service | GET | /api/v1/admin/dashboard/kpis | No admin token available |
| admin-service | DELETE | /api/v1/admin/moderation/stories/:storyId | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/stories/:storyId/interactions | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/stories | No admin token available |
| admin-service | DELETE | /api/v1/admin/moderation/reels/:reelId | No admin token available |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/unhide | No admin token available |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/hide | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/reels/:reelId/interactions | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/reels | No admin token available |
| admin-service | DELETE | /api/v1/admin/moderation/posts/:postId | No admin token available |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/unhide | No admin token available |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/hide | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/posts/:postId/interactions | No admin token available |
| admin-service | GET | /api/v1/admin/moderation/posts | No admin token available |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | No admin token available |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/remove | No admin token available |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/approve | No admin token available |
| admin-service | GET | /api/v1/admin/comments/stats | No admin token available |
| admin-service | GET | /api/v1/admin/comments/ | No admin token available |
| admin-service | PATCH | /api/v1/admin/cms/pages/:id | No admin token available |
| admin-service | GET | /api/v1/admin/cms/pages | No admin token available |
| admin-service | DELETE | /api/v1/admin/avatars/:avatarId | No admin token available |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/reject | No admin token available |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/approve | No admin token available |
| admin-service | GET | /api/v1/admin/avatars/stats | No admin token available |
| admin-service | GET | /api/v1/admin/avatars/ | No admin token available |
| admin-service | DELETE | /api/v1/admin/auth/roles/:id | No admin token available |
| admin-service | PUT | /api/v1/admin/auth/roles/:id | No admin token available |
| admin-service | POST | /api/v1/admin/auth/roles | No admin token available |
| admin-service | GET | /api/v1/admin/auth/roles | No admin token available |
| admin-service | DELETE | /api/v1/admin/auth/admins/:id | No admin token available |
| admin-service | PATCH | /api/v1/admin/auth/admins/:id/role | No admin token available |
| admin-service | GET | /api/v1/admin/auth/admins | No admin token available |
| admin-service | GET | /api/v1/admin/auth/me | No admin token available |
| admin-service | GET | /api/v1/admin/audit/ | No admin token available |
| admin-service | GET | /api/v1/admin/active-hours | No admin token available |
| admin-service | GET | /api/v1/admin/countries | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/active-hours | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/countries | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/top-content | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/engagement-trends | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/user-acquisition | No admin token available |
| admin-service | GET | /api/v1/admin/analytics/summary | No admin token available |
| admin-service | GET | /api/v1/admin/notifications/stats | No admin token available |
| admin-service | GET | /api/v1/admin/notifications/history | No admin token available |
| admin-service | POST | /api/v1/admin/notifications/global | No admin token available |
| auth-service | GET | /api/v1/auth/history | No user token available |
| auth-service | GET | /api/v1/auth/me | No user token available |
| auth-service | POST | /api/v1/auth/logout | No user token available |
| auth-service | POST | /api/v1/auth/reset-password/verify | No user token available |
| auth-service | POST | /api/v1/auth/reset-password/request | No user token available |
| auth-service | GET | /api/v1/auth/check-email | No user token available |
| auth-service | GET | /api/v1/auth/check-username | No user token available |
| comment-service | GET | /api/v1/comments/internal/post/:postId | No user token available |
| comment-service | DELETE | /api/v1/comments/internal/:commentId | No user token available |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/remove | No user token available |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/approve | No user token available |
| comment-service | GET | /api/v1/comments/internal/:commentId | No user token available |
| comment-service | GET | /api/v1/comments/internal/stats | No user token available |
| comment-service | GET | /api/v1/comments/internal/list | No user token available |
| comment-service | GET | /api/v1/comments/activity/reviews | No user token available |
| comment-service | GET | /api/v1/comments/activity/comments | No user token available |
| comment-service | POST | /api/v1/comments/check-comments | No user token available |
| comment-service | DELETE | /api/v1/comments/:id/like | No user token available |
| comment-service | POST | /api/v1/comments/:id/like | No user token available |
| comment-service | DELETE | /api/v1/comments/:id | No user token available |
| comment-service | GET | /api/v1/comments/ | No user token available |
| comment-service | POST | /api/v1/comments/ | No user token available |
| feed-service | GET | /api/v1/feed/ | No user token available |
| help-service | POST | /api/v1/help/api/help/feedback | No user token available |
| help-service | GET | /api/v1/help/api/help/search | No user token available |
| help-service | GET | /api/v1/help/api/help/articles/:slug | No user token available |
| help-service | GET | /api/v1/help/api/help/articles/featured | No user token available |
| help-service | GET | /api/v1/help/api/help/categories | No user token available |
| insight-service | GET | /api/v1/insights/heatmap | No user token available |
| insight-service | GET | /api/v1/insights/content | No user token available |
| insight-service | GET | /api/v1/insights/account | No user token available |
| live-service | POST | /api/v1/live/webhook/done | No user token available |
| live-service | POST | /api/v1/live/webhook/publish | No user token available |
| live-service | POST | /api/v1/live/:id/chat | No user token available |
| live-service | POST | /api/v1/live/:id/end | No user token available |
| live-service | GET | /api/v1/live/:id | No user token available |
| live-service | GET | /api/v1/live/feed | No user token available |
| live-service | POST | /api/v1/live/schedule | No user token available |
| live-service | POST | /api/v1/live/go-live | No user token available |
| media-service | GET | /api/v1/media/files/* | No user token available |
| media-service | POST | /api/v1/media/finalize | No user token available |
| media-service | POST | /api/v1/media/presigned-url | No user token available |
| media-service | GET | /api/v1/media/status/:id | No user token available |
| media-service | POST | /api/v1/media/upload | No user token available |
| message-service | POST | /api/v1/messages/seen | No user token available |
| message-service | POST | /api/v1/messages/send | No user token available |
| message-service | DELETE | /api/v1/messages/conversations/:conversationId | No user token available |
| message-service | POST | /api/v1/messages/conversations/:conversationId/report | No user token available |
| message-service | POST | /api/v1/messages/conversations/:conversationId/unblock | No user token available |
| message-service | POST | /api/v1/messages/conversations/:conversationId/block | No user token available |
| message-service | PATCH | /api/v1/messages/conversations/:conversationId/mute | No user token available |
| message-service | GET | /api/v1/messages/conversations/:conversationId/details | No user token available |
| message-service | GET | /api/v1/messages/conversations/:conversationId | No user token available |
| message-service | GET | /api/v1/messages/conversations | No user token available |
| message-service | GET | /api/v1/messages/activity/story-replies | No user token available |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId | No user token available |
| message-service | PATCH | /api/v1/messages/internal/conversations/:conversationId/mark-safe | No user token available |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId/transcript | No user token available |
| message-service | GET | /api/v1/messages/internal/stats | No user token available |
| message-service | GET | /api/v1/messages/internal/conversations | No user token available |
| notification-service | GET | /api/v1/notifications/admin/stats | No admin token available |
| notification-service | GET | /api/v1/notifications/admin/history | No admin token available |
| notification-service | POST | /api/v1/notifications/admin/broadcast | No admin token available |
| notification-service | PATCH | /api/v1/notifications/read-all | No user token available |
| notification-service | PATCH | /api/v1/notifications/:id/read | No user token available |
| notification-service | GET | /api/v1/notifications/unread-count | No user token available |
| notification-service | GET | /api/v1/notifications/ | No user token available |
| notification-service | PATCH | /api/v1/notifications/settings | No user token available |
| notification-service | GET | /api/v1/notifications/settings | No user token available |
| post-service | PATCH | /api/v1/posts/internal/reports/:id/status | No user token available |
| post-service | GET | /api/v1/posts/internal/reports/:id | No user token available |
| post-service | GET | /api/v1/posts/internal/reports | No user token available |
| post-service | GET | /api/v1/posts/internal/reports/stats | No user token available |
| post-service | DELETE | /api/v1/posts/:id/bookmark | No user token available |
| post-service | POST | /api/v1/posts/:id/bookmark | No user token available |
| post-service | POST | /api/v1/posts/:id/report | No user token available |
| post-service | PUT | /api/v1/posts/:id/toggle-comments | No user token available |
| post-service | PUT | /api/v1/posts/:id/hide-likes | No user token available |
| post-service | PUT | /api/v1/posts/:id | No user token available |
| post-service | DELETE | /api/v1/posts/:id | No user token available |
| post-service | GET | /api/v1/posts/:id | No user token available |
| post-service | GET | /api/v1/posts/:id/embed | No user token available |
| post-service | GET | /api/v1/posts/activity/posts | No user token available |
| post-service | GET | /api/v1/posts/activity/likes | No user token available |
| post-service | POST | /api/v1/posts/check-likes | No user token available |
| post-service | GET | /api/v1/posts/saved | No user token available |
| post-service | DELETE | /api/v1/posts/:id/like | No user token available |
| post-service | POST | /api/v1/posts/:id/like | No user token available |
| post-service | GET | /api/v1/posts/ | No user token available |
| post-service | GET | /api/v1/posts/explore | No user token available |
| post-service | POST | /api/v1/posts/ | No user token available |
| post-service | GET | /api/v1/posts/internal/:postId/bookmarks | No user token available |
| post-service | GET | /api/v1/posts/internal/:postId/likes | No user token available |
| post-service | GET | /api/v1/posts/internal/:postId | No user token available |
| post-service | DELETE | /api/v1/posts/internal/:postId | No user token available |
| post-service | PATCH | /api/v1/posts/internal/:postId/unhide | No user token available |
| post-service | PATCH | /api/v1/posts/internal/:postId/hide | No user token available |
| post-service | GET | /api/v1/posts/internal/user/:userId | No user token available |
| post-service | GET | /api/v1/posts/internal/stats/user/:userId | No user token available |
| post-service | GET | /api/v1/posts/internal/list | No user token available |
| post-service | GET | /api/v1/posts/internal/recent | No user token available |
| post-service | GET | /api/v1/posts/internal/top | No user token available |
| post-service | GET | /api/v1/posts/internal/engagement/trends | No user token available |
| post-service | GET | /api/v1/posts/internal/stats/engagement | No user token available |
| post-service | GET | /api/v1/posts/internal/stats/overall | No user token available |
| post-service | GET | /api/v1/posts/internal/stats | No user token available |
| reel-service | DELETE | /api/v1/reels/:id/like | No user token available |
| reel-service | POST | /api/v1/reels/:id/like | No user token available |
| reel-service | GET | /api/v1/reels/activity/likes | No user token available |
| reel-service | GET | /api/v1/reels/activity/reels | No user token available |
| reel-service | GET | /api/v1/reels/ | No user token available |
| reel-service | POST | /api/v1/reels/ | No user token available |
| reel-service | GET | /api/v1/reels/internal/:reelId/likes | No user token available |
| reel-service | GET | /api/v1/reels/internal/:reelId | No user token available |
| reel-service | GET | /api/v1/reels/internal/recent | No user token available |
| reel-service | DELETE | /api/v1/reels/internal/:reelId | No user token available |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/unhide | No user token available |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/hide | No user token available |
| reel-service | GET | /api/v1/reels/internal/list | No user token available |
| reel-service | GET | /api/v1/reels/internal/user/:userId | No user token available |
| reel-service | GET | /api/v1/reels/internal/stats/user/:userId | No user token available |
| reel-service | GET | /api/v1/reels/internal/stats/overall | No user token available |
| reel-service | GET | /api/v1/reels/internal/stats | No user token available |
| search-service | GET | /api/v1/search/users | No user token available |
| search-service | GET | /api/v1/search/ | No user token available |
| story-service | DELETE | /api/v1/stories/:id/react | No user token available |
| story-service | POST | /api/v1/stories/:id/react | No user token available |
| story-service | POST | /api/v1/stories/:id/view | No user token available |
| story-service | POST | /api/v1/stories/:id/report | No user token available |
| story-service | DELETE | /api/v1/stories/:id | No user token available |
| story-service | GET | /api/v1/stories/activity/story-replies | No user token available |
| story-service | GET | /api/v1/stories/archive | No user token available |
| story-service | GET | /api/v1/stories/ | No user token available |
| story-service | POST | /api/v1/stories/ | No user token available |
| story-service | DELETE | /api/v1/stories/internal/:storyId | No user token available |
| story-service | GET | /api/v1/stories/internal/:storyId/likes | No user token available |
| story-service | GET | /api/v1/stories/internal/:storyId/views | No user token available |
| story-service | GET | /api/v1/stories/internal/list | No user token available |
| story-service | GET | /api/v1/stories/internal/stats | No user token available |
| story-service | DELETE | /api/v1/stories/highlights/:highlightId | No user token available |
| story-service | PUT | /api/v1/stories/highlights/:highlightId | No user token available |
| story-service | GET | /api/v1/stories/highlights/:highlightId/stories | No user token available |
| story-service | GET | /api/v1/stories/highlights/:userId | No user token available |
| story-service | POST | /api/v1/stories/highlights | No user token available |
| story-service | GET | /api/v1/stories/activity/highlights | No user token available |
| story-service | GET | /api/v1/stories/stories/me | No user token available |
| user-service | DELETE | /api/v1/users/profile/followers/:followerId | No user token available |
| user-service | GET | /api/v1/users/profile/:userId/following | No user token available |
| user-service | GET | /api/v1/users/profile/:userId/followers | No user token available |
| user-service | GET | /api/v1/users/profile/:userId/posts | No user token available |
| user-service | GET | /api/v1/users/profile/:username | No user token available |
| user-service | GET | /api/v1/users/profile/activity/account-history | No user token available |
| user-service | POST | /api/v1/users/profile/batch | No user token available |
| user-service | GET | /api/v1/users/profile/suggestions | No user token available |
| user-service | GET | /api/v1/users/profile/me/saved | No user token available |
| user-service | DELETE | /api/v1/users/profile/profile-photo | No user token available |
| user-service | POST | /api/v1/users/profile/profile-photo | No user token available |
| user-service | PUT | /api/v1/users/profile/me | No user token available |
| user-service | GET | /api/v1/users/profile/me | No user token available |
| user-service | POST | /api/v1/users/profile/help/feedback | No user token available |
| user-service | GET | /api/v1/users/profile/help/support-requests | No user token available |
| user-service | GET | /api/v1/users/profile/help/feature-limits | No user token available |
| user-service | GET | /api/v1/users/profile/help/violations | No user token available |
| user-service | GET | /api/v1/users/profile/help/account-status | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/apps/:id/revoke | No user token available |
| user-service | GET | /api/v1/users/profile/settings/apps | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/general | No user token available |
| user-service | GET | /api/v1/users/profile/settings/general | No user token available |
| user-service | GET | /api/v1/users/profile/settings/subscriptions | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/like-share | No user token available |
| user-service | GET | /api/v1/users/profile/settings/like-share | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/content-preferences | No user token available |
| user-service | GET | /api/v1/users/profile/settings/content-preferences | No user token available |
| user-service | DELETE | /api/v1/users/profile/settings/muted/:userId | No user token available |
| user-service | POST | /api/v1/users/profile/settings/muted/:userId | No user token available |
| user-service | GET | /api/v1/users/profile/settings/muted | No user token available |
| user-service | DELETE | /api/v1/users/profile/settings/hidden-words/words/:id | No user token available |
| user-service | POST | /api/v1/users/profile/settings/hidden-words/words | No user token available |
| user-service | PUT | /api/v1/users/profile/settings/hidden-words | No user token available |
| user-service | GET | /api/v1/users/profile/settings/hidden-words | No user token available |
| user-service | DELETE | /api/v1/users/profile/settings/restricted/:userId | No user token available |
| user-service | POST | /api/v1/users/profile/settings/restricted/:userId | No user token available |
| user-service | GET | /api/v1/users/profile/settings/restricted | No user token available |
| user-service | PUT | /api/v1/users/profile/settings/sharing | No user token available |
| user-service | GET | /api/v1/users/profile/settings/sharing | No user token available |
| user-service | PUT | /api/v1/users/profile/settings/comments | No user token available |
| user-service | GET | /api/v1/users/profile/settings/comments | No user token available |
| user-service | PATCH | /api/v1/users/profile/tags/:id/remove | No user token available |
| user-service | PATCH | /api/v1/users/profile/tags/:id/approve | No user token available |
| user-service | GET | /api/v1/users/profile/tags/pending | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/tags-mentions | No user token available |
| user-service | GET | /api/v1/users/profile/settings/tags-mentions | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/activity-status | No user token available |
| user-service | GET | /api/v1/users/profile/settings/activity-status | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/story-replies | No user token available |
| user-service | GET | /api/v1/users/profile/settings/story-replies | No user token available |
| user-service | PATCH | /api/v1/users/profile/settings/messages | No user token available |
| user-service | GET | /api/v1/users/profile/settings/messages | No user token available |
| user-service | DELETE | /api/v1/users/profile/story-privacy/unhide/:hiddenUserId | No user token available |
| user-service | POST | /api/v1/users/profile/story-privacy/hide | No user token available |
| user-service | GET | /api/v1/users/profile/story-privacy/hidden-users | No user token available |
| user-service | DELETE | /api/v1/users/profile/unblock/:userId | No user token available |
| user-service | POST | /api/v1/users/profile/block/:userId | No user token available |
| user-service | GET | /api/v1/users/profile/blocked-users | No user token available |
| user-service | DELETE | /api/v1/users/profile/close-friends/:friendId | No user token available |
| user-service | POST | /api/v1/users/profile/close-friends/:friendId | No user token available |
| user-service | GET | /api/v1/users/profile/close-friends | No user token available |
| user-service | GET | /api/v1/users/profile/reports/me | No user token available |
| user-service | POST | /api/v1/users/profile/report-problem | No user token available |
| user-service | GET | /api/v1/users/internal/:userId/follow-counts | No user token available |
| user-service | GET | /api/v1/users/internal/:userId | No user token available |
| user-service | POST | /api/v1/users/internal/bulk | No user token available |
| user-service | GET | /api/v1/users/internal/recent | No user token available |
| user-service | DELETE | /api/v1/users/internal/:userId | No user token available |
| user-service | PATCH | /api/v1/users/internal/:userId/unban | No user token available |
| user-service | PATCH | /api/v1/users/internal/:userId/ban | No user token available |
| user-service | GET | /api/v1/users/internal/list | No user token available |
| user-service | GET | /api/v1/users/internal/countries | No user token available |
| user-service | GET | /api/v1/users/internal/login-methods | No user token available |
| user-service | GET | /api/v1/users/internal/growth | No user token available |
| user-service | DELETE | /api/v1/users/internal/avatars/:avatarId | No user token available |
| user-service | PATCH | /api/v1/users/internal/avatars/:avatarId/reject | No user token available |
| user-service | PATCH | /api/v1/users/internal/avatars/:avatarId/approve | No user token available |
| user-service | GET | /api/v1/users/internal/avatars/stats | No user token available |
| user-service | GET | /api/v1/users/internal/avatars | No user token available |
| user-service | GET | /api/v1/users/internal/stats | No user token available |
| user-service | PATCH | /api/v1/users/internal/reports/:id/status | No user token available |
| user-service | GET | /api/v1/users/internal/reports/:id | No user token available |
| user-service | GET | /api/v1/users/internal/reports | No user token available |
| user-service | GET | /api/v1/users/internal/reports/stats | No user token available |
| user-service | POST | /api/v1/users/requests/reject | No user token available |
| user-service | POST | /api/v1/users/requests/accept | No user token available |
| user-service | GET | /api/v1/users/requests | No user token available |
| user-service | GET | /api/v1/users/:userId/following | No user token available |
| user-service | GET | /api/v1/users/:userId/followers | No user token available |
| user-service | GET | /api/v1/users/:userId/follow/status | No user token available |
| user-service | DELETE | /api/v1/users/:userId/follow | No user token available |
| user-service | POST | /api/v1/users/:userId/follow | No user token available |

## Recommendations

- **365 endpoints skipped**: Ensure proper authentication tokens are available for testing.

## Swagger Documentation

For detailed API documentation, visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

You can test individual endpoints interactively using the Swagger UI.
