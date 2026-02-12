# API Test Report
Generated: 2026-02-11T05:03:18.890Z

**Total Endpoints:** 370
**Working:** 267
**Failing:** 103

| Service | Method | Endpoint | Status | Output Snippet |
|---|---|---|---|---|
| ad-service | POST | /api/v1/ads/ | PASS | `{"status":"success","data":{"id":"3ebd5878-d291-4b9c-9329-da9a2d587257","hideLikes":false,"commentsDisabled":false,"userId":76,"adType":"NEW_MEDIA","status":"DRAFT","updatedAt":"2026-02-11T05:02:29.03` |
| ad-service | DELETE | /api/v1/ads/:id/comments/:commentId | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_comment_id\""}` |
| ad-service | POST | /api/v1/ads/:id/comments | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | GET | /api/v1/ads/:id/comments | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/:id/bookmark | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/:id/like | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | GET | /api/v1/ads/:id/embed | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id/toggle-comments | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id/hide-likes | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | DELETE | /api/v1/ads/:id | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/click | FAIL | `{"status":"error","message":"notNull Violation: AdClick.adId cannot be null"}` |
| ad-service | POST | /api/v1/ads/impression | FAIL | `{"status":"error","message":"notNull Violation: AdImpression.adId cannot be null"}` |
| ad-service | GET | /api/v1/ads/active | PASS | `{"status":"success","data":[{"id":"7abd623f-c3cf-4b03-9e22-3c4cdef367bc","userId":51,"title":"","caption":"","ctaText":"Learn More","destinationUrl":"","adType":"BOOST_CONTENT","status":"ACTIVE","hide` |
| ad-service | GET | /api/v1/ads/eligible-content | PASS | `{"status":"success","data":{"posts":[],"reels":[],"stories":[]}}` |
| ad-service | POST | /api/v1/ads/:id/publish | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id/budget | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id/targeting | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | PUT | /api/v1/ads/:id/details | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/:id/boost-content | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/:id/media | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"temp_ad_id\""}` |
| ad-service | POST | /api/v1/ads/draft | PASS | `{"status":"success","data":{"id":"fa4354ab-230a-48b5-abcc-3f4735b068e2","hideLikes":false,"commentsDisabled":false,"userId":76,"adType":"NEW_MEDIA","status":"DRAFT","updatedAt":"2026-02-11T05:02:31.89` |
| admin-service | GET | /api/v1/admin/users/:userId/reels | PASS | `{"success":true,"data":[]}` |
| admin-service | GET | /api/v1/admin/users/:userId/posts | PASS | `{"success":true,"data":[]}` |
| admin-service | GET | /api/v1/admin/users/:userId/following | PASS | `{"success":true,"data":[]}` |
| admin-service | GET | /api/v1/admin/users/:userId/followers | PASS | `{"success":true,"data":[]}` |
| admin-service | GET | /api/v1/admin/users/:userId/details | PASS | `{"success":true,"data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccountS` |
| admin-service | DELETE | /api/v1/admin/users/:userId | PASS | `{"success":true,"message":"User soft deleted"}` |
| admin-service | PATCH | /api/v1/admin/users/:userId/unban | PASS | `{"success":true,"message":"User unbanned"}` |
| admin-service | PATCH | /api/v1/admin/users/:userId/ban | PASS | `{"success":true,"message":"User banned"}` |
| admin-service | GET | /api/v1/admin/users/ | PASS | `{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount` |
| admin-service | PUT | /api/v1/admin/settings/ | PASS | `{"success":true,"message":"Settings updated","data":{"id":1,"maintenanceMode":true,"allowRegistrations":true,"emailAlerts":true,"adminTheme":"light","updated_at":"2026-02-04T12:59:50.624Z"}}` |
| admin-service | GET | /api/v1/admin/settings/ | PASS | `{"success":true,"data":{"id":1,"maintenanceMode":true,"allowRegistrations":true,"emailAlerts":true,"adminTheme":"light","updated_at":"2026-02-04T12:59:50.624Z"}}` |
| admin-service | PUT | /api/v1/admin/settings/profile | PASS | `{"success":true,"message":"Profile updated","data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","password":"$2b$10$FL9tBjgpJn4pGPeN7wt91.zVnS3ZvOIaO4nfjdZ2HZrvEn8GiSWiO",` |
| admin-service | GET | /api/v1/admin/settings/profile | PASS | `{"success":true,"data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","roleId":1}}` |
| admin-service | POST | /api/v1/admin/reports/:id/ban-user | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | POST | /api/v1/admin/reports/:id/ignore | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/reports/:id | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/reports/ | PASS | `{"success":true,"data":[{"id":5,"postId":1863,"reportedBy":51,"reason":"spam","description":"Fake engagement","status":"pending","created_at":"2026-02-10T06:20:10.930Z","updated_at":"2026-02-10T06:20:` |
| admin-service | GET | /api/v1/admin/reports/stats | PASS | `{"success":true,"data":{"pending":4,"underReview":0,"resolvedToday":0}}` |
| admin-service | GET | /api/v1/admin/reels | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /reels</pre> </body> </html> ` |
| admin-service | GET | /api/v1/admin/posts | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /posts</pre> </body> </html> ` |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | DELETE | /api/v1/admin/stories/:storyId | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /stories/temp_story_id</pre> </body> </html> ` |
| admin-service | DELETE | /api/v1/admin/reels/:reelId | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /reels/temp_reel_id</pre> </body> </html> ` |
| admin-service | PATCH | /api/v1/admin/posts/:postId/hide | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot PATCH /posts/temp_post_id/hide</pre> </body> </html> ` |
| admin-service | DELETE | /api/v1/admin/posts/:postId | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /posts/temp_post_id</pre> </body> </html> ` |
| admin-service | POST | /api/v1/admin/default-avatars/ | PASS | `{"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violation: AuditLog.targetType cannot be null"}` |
| admin-service | GET | /api/v1/admin/default-avatars/ | PASS | `{"success":true,"data":[{"id":1,"url":"/uploads/default-avatar-1.png"},{"id":2,"url":"/uploads/default-avatar-2.png"}]}` |
| admin-service | PATCH | /api/v1/admin/languages/:id/set-default | PASS | `{"success":false,"message":"Language not found"}` |
| admin-service | PATCH | /api/v1/admin/languages/:id/disable | PASS | `{"success":false,"message":"Language not found"}` |
| admin-service | PATCH | /api/v1/admin/languages/:id/enable | PASS | `{"success":false,"message":"Language not found"}` |
| admin-service | GET | /api/v1/admin/languages/ | PASS | `{"success":true,"data":{"stats":{"total":5,"active":4,"defaultLanguage":"EN"},"languages":[{"id":1,"name":"English","code":"EN","flagCode":"US","isActive":true,"isDefault":true,"created_at":"2026-02-0` |
| admin-service | POST | /api/v1/admin/feature | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot POST /feature</pre> </body> </html> ` |
| admin-service | PATCH | /api/v1/admin/:id/block | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot PATCH /76/block</pre> </body> </html> ` |
| admin-service | GET | /api/v1/admin/trending | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /trending</pre> </body> </html> ` |
| admin-service | GET | /api/v1/admin/ | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /</pre> </body> </html> ` |
| admin-service | DELETE | /api/v1/admin/hashtags/:id | PASS | `{"success":false,"message":"Hashtag not found"}` |
| admin-service | PATCH | /api/v1/admin/hashtags/:id/toggle-visibility | PASS | `{"success":false,"message":"Hashtag not found"}` |
| admin-service | GET | /api/v1/admin/hashtags/trending | PASS | `{"success":true,"data":[{"id":9,"name":"#fashion","status":"active","isTrending":true,"deleted":false,"postsCount":8900,"reelsCount":2100,"created_at":"2026-02-04T10:20:48.143Z","updated_at":"2026-02-` |
| admin-service | GET | /api/v1/admin/hashtags/ | PASS | `{"success":true,"data":{"hashtags":[{"id":9,"name":"#fashion","status":"active","isTrending":true,"deleted":false,"postsCount":8900,"reelsCount":2100,"created_at":"2026-02-04T10:20:48.143Z","updated_a` |
| admin-service | GET | /api/v1/admin/analytics/geo-users | PASS | `{"success":true,"data":{"countries":[{"code":"UN","name":"Unknown","users":276}],"summary":{"totalCountries":1,"totalUsers":276,"topCountry":{"code":"UN","name":"Unknown","users":276}}}}` |
| admin-service | GET | /api/v1/admin/explore/performance-metrics | PASS | `{"success":true,"data":{"impressions":17843069,"impressionsChange":5,"ctr":11.8,"ctrChange":0.5,"avgWatchTime":0,"watchTimeChange":0,"engagementRate":11.8,"engagementChange":1.2}}` |
| admin-service | GET | /api/v1/admin/explore/category-distribution | PASS | `{"success":true,"data":[{"category":"fashion","percentage":41},{"category":"art","percentage":25},{"category":"photography","percentage":16},{"category":"travel","percentage":10},{"category":"fitness"` |
| admin-service | DELETE | /api/v1/admin/explore/trending-topics/:topicId | PASS | `{"success":false,"message":"invalid input syntax for type integer: \":topicId\""}` |
| admin-service | POST | /api/v1/admin/explore/trending-topics | PASS | `{"success":false,"message":"Topic is required"}` |
| admin-service | GET | /api/v1/admin/explore/trending-topics | PASS | `{"success":true,"data":[{"id":6,"topic":"#fitness","created_at":"2026-02-04T11:18:24.988Z"}]}` |
| admin-service | PATCH | /api/v1/admin/explore/algorithm | PASS | `{"success":true,"message":"Algorithm updated successfully","data":{"id":1,"updated_at":"2026-02-11T05:02:39.596Z"}}` |
| admin-service | GET | /api/v1/admin/explore/algorithm | PASS | `{"success":true,"data":{"id":1,"freshnessWeight":70,"engagementWeight":60,"relevanceWeight":80,"locationWeight":40,"updated_at":"2026-02-11T05:02:39.596Z"}}` |
| admin-service | PATCH | /api/v1/admin/messages/:conversationId/flag | PASS | `{"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violation: AuditLog.targetType cannot be null"}` |
| admin-service | GET | /api/v1/admin/messages/reported | PASS | `{"success":true,"data":[{"id":1,"senderId":101,"text":"Harmful message","reportedBy":102}]}` |
| admin-service | POST | /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/dm-oversight/conversations/:conversationId/transcript | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/dm-oversight/stats | PASS | `{"success":true,"data":{"highRisk":1,"underInvestigation":0,"safeCleared":7}}` |
| admin-service | GET | /api/v1/admin/dm-oversight/conversations | PASS | `{"success":true,"data":[{"id":7,"user1Id":7,"user2Id":20,"lastMessageId":null,"lastMessageContent":"I will find where you live and make you regret this.","lastMessageSenderId":7,"lastMessageAt":"2026-` |
| admin-service | GET | /api/v1/admin/dashboard/recent-posts | PASS | `{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f` |
| admin-service | GET | /api/v1/admin/dashboard/recent-users | PASS | `{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount` |
| admin-service | GET | /api/v1/admin/dashboard/login-methods | PASS | `{"success":true,"data":[{"method":"email","count":"153"},{"method":"google","count":"81"},{"method":"facebook","count":"42"}],"message":"Login methods fetched successfully"}` |
| admin-service | GET | /api/v1/admin/dashboard/media-distribution | PASS | `{"success":true,"data":{"posts":93,"reels":2,"stories":4},"message":"Media distribution data fetched successfully"}` |
| admin-service | GET | /api/v1/admin/dashboard/user-growth | PASS | `{"success":true,"data":[{"month":"Jan","count":"171"},{"month":"Feb","count":"34"}],"message":"User growth data fetched successfully"}` |
| admin-service | GET | /api/v1/admin/dashboard/activity-feed | PASS | `{"success":true,"data":[{"id":89,"adminId":1,"actionType":"UPDATE_ALGORITHM","targetType":"system","targetId":"1","metadata":{"title":"Test Ad","budget":100,"subType":"explore_config","duration":5},"c` |
| admin-service | GET | /api/v1/admin/dashboard/kpis | PASS | `{"success":true,"data":{"totalUsers":276,"totalPosts":1857,"activeReels":49,"pendingReports":4,"growthRates":{"users":57,"posts":46,"reels":100}},"message":"Dashboard data fetched successfully"}` |
| admin-service | DELETE | /api/v1/admin/moderation/stories/:storyId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/stories/:storyId/interactions | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/stories | PASS | `{"success":true,"data":[{"id":85,"userId":51,"username":"akbar","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/stories/temp_12921bca-d5a1-44aa-98d2-92994ebd7dbe_opt.webp","thumbnailUrl":n` |
| admin-service | DELETE | /api/v1/admin/moderation/reels/:reelId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/unhide | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/moderation/reels/:reelId/hide | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/reels/:reelId/interactions | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/reels | PASS | `{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou` |
| admin-service | DELETE | /api/v1/admin/moderation/posts/:postId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/unhide | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/moderation/posts/:postId/hide | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/posts/:postId/interactions | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/moderation/posts | PASS | `{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f` |
| admin-service | DELETE | /api/v1/admin/comments/:commentId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/remove | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/comments/:commentId/approve | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/comments/stats | PASS | `{"success":true,"data":{"total":25,"pending":16,"flagged":2,"approvedToday":0,"removedToday":0}}` |
| admin-service | GET | /api/v1/admin/comments/ | PASS | `{"success":true,"data":[{"id":31,"postId":1864,"userId":51,"username":"akbar","text":"hello","createdAt":"2026-02-10T06:13:08.558Z","likesCount":1,"status":"pending","reportedCount":0,"parentId":null,` |
| admin-service | PATCH | /api/v1/admin/cms/pages/:id | PASS | `{"success":false,"message":"notNull Violation: AuditLog.actionType cannot be null,\nnotNull Violation: AuditLog.targetType cannot be null"}` |
| admin-service | GET | /api/v1/admin/cms/pages | PASS | `{"success":true,"data":[{"id":1,"title":"Terms of Service","slug":"terms","lastUpdated":"2025-01-01"},{"id":2,"title":"Privacy Policy","slug":"privacy","lastUpdated":"2025-01-01"}]}` |
| admin-service | DELETE | /api/v1/admin/avatars/:avatarId | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/reject | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | PATCH | /api/v1/admin/avatars/:avatarId/approve | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| admin-service | GET | /api/v1/admin/avatars/stats | PASS | `{"success":true,"data":{"total":0,"pending":0,"approved":0,"rejected":0}}` |
| admin-service | GET | /api/v1/admin/avatars/ | PASS | `{"success":true,"data":[],"pagination":{"total":0,"page":1,"limit":12,"totalPages":0}}` |
| admin-service | DELETE | /api/v1/admin/auth/roles/:id | PASS | `{"success":false,"message":"Role not found"}` |
| admin-service | PUT | /api/v1/admin/auth/roles/:id | PASS | `{"success":false,"message":"Role not found"}` |
| admin-service | POST | /api/v1/admin/auth/roles | PASS | `{"success":false,"message":"notNull Violation: Role.name cannot be null"}` |
| admin-service | GET | /api/v1/admin/auth/roles | PASS | `{"success":true,"data":[{"id":1,"name":"SuperAdmin","permissions":["all"],"description":null,"createdAt":"2026-01-31T11:31:48.956Z","updatedAt":"2026-01-31T11:31:48.956Z"},{"id":2,"name":"moderator","` |
| admin-service | DELETE | /api/v1/admin/auth/admins/:id | PASS | `{"success":false,"message":"Admin not found"}` |
| admin-service | PATCH | /api/v1/admin/auth/admins/:id/role | PASS | `{"success":false,"message":"Admin not found"}` |
| admin-service | GET | /api/v1/admin/auth/admins | PASS | `{"success":true,"data":[{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","roleId":1,"isActive":true,"lastLogin":"2026-02-11T05:02:28.629Z","created_at":"2026-01-31T13:19:07.0` |
| admin-service | GET | /api/v1/admin/auth/me | PASS | `{"success":true,"data":{"id":1,"username":"admin","name":"Super Admin","email":"admin@jaadoe.com","password":"$2b$10$FL9tBjgpJn4pGPeN7wt91.zVnS3ZvOIaO4nfjdZ2HZrvEn8GiSWiO","roleId":1,"isActive":true,"` |
| admin-service | POST | /api/v1/admin/auth/login | PASS | `{"success":false,"message":"Invalid credentials"}` |
| admin-service | GET | /api/v1/admin/audit/ | PASS | `{"success":true,"data":[{"id":89,"adminId":1,"actionType":"UPDATE_ALGORITHM","targetType":"system","targetId":"1","metadata":{"title":"Test Ad","budget":100,"subType":"explore_config","duration":5},"c` |
| admin-service | GET | /api/v1/admin/active-hours | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /active-hours</pre> </body> </html> ` |
| admin-service | GET | /api/v1/admin/countries | FAIL | `<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /countries</pre> </body> </html> ` |
| admin-service | GET | /api/v1/admin/analytics/active-hours | PASS | `{"success":true,"data":{"peakHour":"20:00","dailyAverageActiveUsers":1500}}` |
| admin-service | GET | /api/v1/admin/analytics/countries | PASS | `{"success":true,"data":[{"name":"Unknown","count":"276"}],"message":"Country analytics fetched successfully"}` |
| admin-service | GET | /api/v1/admin/analytics/top-content | PASS | `{"success":true,"data":[{"contentId":759,"creatorUsername":"user_demo_138_127","views":20316,"likes":1989,"engagementRate":"11.7"},{"contentId":907,"creatorUsername":"user_demo_53_25","views":20464,"l` |
| admin-service | GET | /api/v1/admin/analytics/engagement-trends | PASS | `{"success":true,"data":[{"month":"Jan","engagementRate":"1256.9"},{"month":"Feb","engagementRate":"982.3"}]}` |
| admin-service | GET | /api/v1/admin/analytics/user-acquisition | PASS | `{"success":true,"data":[{"month":"Jan","users":171},{"month":"Feb","users":34}]}` |
| admin-service | GET | /api/v1/admin/analytics/summary | PASS | `{"success":true,"data":{"newUsers":276,"newUsersChange":57,"avgEngagementRate":11.7,"engagementChange":0.5,"adRevenue":45200,"revenueChange":-2,"serverLoad":20,"serverStatus":"stable"}}` |
| admin-service | GET | /api/v1/admin/notifications/stats | PASS | `{"success":true,"data":{"totalRecipients":0,"sentToday":0,"sentMonth":0}}` |
| admin-service | GET | /api/v1/admin/notifications/history | PASS | `{"success":true,"data":[]}` |
| admin-service | POST | /api/v1/admin/notifications/global | PASS | `{"success":false,"message":"Request failed with status code 500"}` |
| auth-service | GET | /api/v1/auth/history | PASS | `{"status":"success","data":[{"id":27,"userId":76,"action":"account_created","title":"Account Created","description":"You created your account.","oldValue":null,"newValue":null,"icon":"UserPlus","creat` |
| auth-service | GET | /api/v1/auth/me | PASS | `{"status":"success","data":{"id":76,"username":"test_user_1770786147742","email":"test_user_1770786147742@example.com","createdAt":"2026-02-11T05:02:28.048Z"}}` |
| auth-service | POST | /api/v1/auth/logout | PASS | `{"status":"success","message":"Logged out successfully"}` |
| auth-service | POST | /api/v1/auth/reset-password/verify | PASS | `{"status":"success","message":"Password updated (mock)"}` |
| auth-service | POST | /api/v1/auth/reset-password/request | PASS | `{"status":"success","message":"Reset link sent (mock)"}` |
| auth-service | GET | /api/v1/auth/check-email | FAIL | `{"status":"error","message":"Server error"}` |
| auth-service | GET | /api/v1/auth/check-username | FAIL | `{"status":"error","message":"Server error"}` |
| auth-service | POST | /api/v1/auth/login | PASS | `{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzUsInVzZXJuYW1lIjoidXNlciIsImlhdCI6MTc3MDc4NjE2OSwiZXhwIjoxNzcxMzkwOTY5fQ.EXBV7SPCgzUSBGpffCQhJWrfsO-5X0_abqKv8YNoyAQ` |
| auth-service | POST | /api/v1/auth/signup | FAIL | `{"status":"fail","message":"Email already exists"}` |
| auth-service | POST | /api/v1/auth/register | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| comment-service | GET | /api/v1/comments/internal/post/:postId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| comment-service | DELETE | /api/v1/comments/internal/:commentId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}` |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/remove | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}` |
| comment-service | PATCH | /api/v1/comments/internal/:commentId/approve | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}` |
| comment-service | GET | /api/v1/comments/internal/:commentId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_comment_id\""}` |
| comment-service | GET | /api/v1/comments/internal/stats | PASS | `{"success":true,"data":{"total":25,"pending":16,"flagged":2,"approvedToday":0,"removedToday":0}}` |
| comment-service | GET | /api/v1/comments/internal/list | PASS | `{"success":true,"data":[{"id":31,"postId":1864,"userId":51,"username":"akbar","text":"hello","createdAt":"2026-02-10T06:13:08.558Z","likesCount":1,"status":"pending","reportedCount":0,"parentId":null,` |
| comment-service | GET | /api/v1/comments/activity/reviews | PASS | `{"status":"success","data":[]}` |
| comment-service | GET | /api/v1/comments/activity/comments | PASS | `{"status":"success","data":[]}` |
| comment-service | POST | /api/v1/comments/check-comments | PASS | `{"message":"postIds array required"}` |
| comment-service | DELETE | /api/v1/comments/:id/like | FAIL | `{"status":"error","message":"userId required"}` |
| comment-service | POST | /api/v1/comments/:id/like | FAIL | `{"status":"error","message":"userId required"}` |
| comment-service | DELETE | /api/v1/comments/:id | FAIL | `{"status":"error","message":"Server error"}` |
| comment-service | GET | /api/v1/comments/ | PASS | `{"message":"postId query param required"}` |
| comment-service | POST | /api/v1/comments/ | FAIL | `{"status":"error","message":"Missing required fields"}` |
| feed-service | GET | /api/v1/feed/ | PASS | `{"status":"success","data":[{"createdAt":"2026-02-10T06:12:49.098Z","likesCount":0,"commentsCount":1,"viewsCount":0,"hideLikes":false,"commentsDisabled":false,"isHidden":false,"id":1864,"userId":51,"u` |
| help-service | POST | /api/v1/help/api/help/feedback | FAIL | `{"status":"error","message":"notNull Violation: Feedback.articleId cannot be null,\nnotNull Violation: Feedback.isHelpful cannot be null"}` |
| help-service | GET | /api/v1/help/api/help/search | PASS | `{"status":"success","data":[]}` |
| help-service | GET | /api/v1/help/api/help/articles/:slug | FAIL | `{"status":"fail","message":"Article not found"}` |
| help-service | GET | /api/v1/help/api/help/articles/featured | PASS | `{"status":"success","data":[{"id":"97ea79eb-4614-4ad4-accc-4f49571e99ec","title":"How to Reset Your password","slug":"reset-password","content":"To reset your password, go to the login page and click ` |
| help-service | GET | /api/v1/help/api/help/categories | PASS | `{"status":"success","data":[{"id":"a10bbe73-07b8-4cad-ab53-2da40c1e8ad7","name":"Jaadoe Features","slug":"features","icon":"LayoutGrid","description":null,"parentId":null,"order":1,"createdAt":"2026-0` |
| insight-service | GET | /api/v1/insights/heatmap | PASS | `{"status":"success","data":[]}` |
| insight-service | GET | /api/v1/insights/content | PASS | `{"status":"success","data":[]}` |
| insight-service | GET | /api/v1/insights/account | PASS | `{"status":"success","data":{"totalViews":0,"accountsReached":0,"accountsEngaged":0,"profileVisits":0,"followerGrowth":{"gained":0,"lost":0,"net":0},"timeSeries":[]}}` |
| live-service | POST | /api/v1/live/webhook/done | FAIL | `Error` |
| live-service | POST | /api/v1/live/webhook/publish | FAIL | `Error` |
| live-service | POST | /api/v1/live/:id/chat | FAIL | `{"status":"error","message":"notNull Violation: LiveChatMessage.message cannot be null"}` |
| live-service | POST | /api/v1/live/:id/end | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"dummy_id\""}` |
| live-service | GET | /api/v1/live/:id | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"dummy_id\""}` |
| live-service | GET | /api/v1/live/feed | PASS | `{"status":"success","data":[{"id":"9ddfdc57-d3d7-4c7c-8030-5af35172cb47","userId":"51","streamKey":"f744e24ebe4c42da85ecc9fcad50ca4emlgb7aow","ingestUrl":"rtmp://localhost:1935/live","title":"asdfasdf` |
| live-service | POST | /api/v1/live/schedule | FAIL | `{"status":"error","message":"Title and scheduled time are required"}` |
| live-service | POST | /api/v1/live/go-live | FAIL | `{"status":"error","message":"Title is required"}` |
| media-service | GET | /api/v1/media/files/* | FAIL | `spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT` |
| media-service | POST | /api/v1/media/finalize | PASS | `{"error":"Key is required"}` |
| media-service | POST | /api/v1/media/presigned-url | FAIL | `{"status":"error","message":"Missing filename or fileType"}` |
| media-service | GET | /api/v1/media/status/:id | PASS | `{"error":"invalid input syntax for type uuid: \"dummy_id\""}` |
| media-service | POST | /api/v1/media/upload | PASS | `{"error":"No file uploaded"}` |
| message-service | POST | /api/v1/messages/seen | FAIL | `{"status":"error","message":"WHERE parameter \"conversation_id\" has invalid \"undefined\" value"}` |
| message-service | POST | /api/v1/messages/send | PASS | `{"status":"success","data":{"flagged":false,"id":72,"conversationId":18,"senderId":76,"content":"Hello message","type":"text","mediaUrl":null,"replyToStoryId":null,"isSeen":false,"updatedAt":"2026-02-` |
| message-service | DELETE | /api/v1/messages/conversations/:conversationId | FAIL | `{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | POST | /api/v1/messages/conversations/:conversationId/report | PASS | `{"status":"success","message":"Report submitted"}` |
| message-service | POST | /api/v1/messages/conversations/:conversationId/unblock | FAIL | `{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | POST | /api/v1/messages/conversations/:conversationId/block | FAIL | `{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | PATCH | /api/v1/messages/conversations/:conversationId/mute | FAIL | `{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | GET | /api/v1/messages/conversations/:conversationId/details | FAIL | `{"status":"error","message":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | GET | /api/v1/messages/conversations/:conversationId | FAIL | `{"status":"error","message":"Failed to fetch messages"}` |
| message-service | GET | /api/v1/messages/conversations | PASS | `{"status":"success","data":[{"id":18,"user1Id":76,"user2Id":76,"lastMessageId":null,"lastMessageContent":"Hello message","lastMessageSenderId":76,"lastMessageAt":"2026-02-11T05:02:59.948Z","riskScore"` |
| message-service | GET | /api/v1/messages/activity/story-replies | PASS | `{"status":"success","data":[]}` |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | PATCH | /api/v1/messages/internal/conversations/:conversationId/mark-safe | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | GET | /api/v1/messages/internal/conversations/:conversationId/transcript | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_conv_id\""}` |
| message-service | GET | /api/v1/messages/internal/stats | PASS | `{"success":true,"data":{"highRisk":1,"underInvestigation":0,"safeCleared":8}}` |
| message-service | GET | /api/v1/messages/internal/conversations | PASS | `{"success":true,"data":[{"id":7,"user1Id":7,"user2Id":20,"lastMessageId":null,"lastMessageContent":"I will find where you live and make you regret this.","lastMessageSenderId":7,"lastMessageAt":"2026-` |
| notification-service | GET | /api/v1/notifications/admin/stats | FAIL | `{"status":"error","message":"Invalid token"}` |
| notification-service | GET | /api/v1/notifications/admin/history | FAIL | `{"status":"error","message":"Invalid token"}` |
| notification-service | POST | /api/v1/notifications/admin/broadcast | FAIL | `{"status":"error","message":"Invalid token"}` |
| notification-service | PATCH | /api/v1/notifications/read-all | PASS | `{"status":"success","message":"All notifications marked as read"}` |
| notification-service | PATCH | /api/v1/notifications/:id/read | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| notification-service | GET | /api/v1/notifications/unread-count | PASS | `{"status":"success","data":{"count":0}}` |
| notification-service | GET | /api/v1/notifications/ | PASS | `{"status":"success","data":[]}` |
| notification-service | PATCH | /api/v1/notifications/settings | PASS | `{"status":"success","data":{"id":"229ad457-b46c-4db5-8259-1b99d9f08f4e","pauseAllPush":false,"likes":"EVERYONE","comments":"EVERYONE","mentions":"EVERYONE","follows":true,"messages":true,"storyReplies` |
| notification-service | GET | /api/v1/notifications/settings | PASS | `{"status":"success","data":{"id":"229ad457-b46c-4db5-8259-1b99d9f08f4e","userId":76,"pauseAllPush":false,"likes":"EVERYONE","comments":"EVERYONE","mentions":"EVERYONE","follows":true,"messages":true,"` |
| post-service | PATCH | /api/v1/posts/internal/reports/:id/status | PASS | `{"success":false,"message":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | GET | /api/v1/posts/internal/reports/:id | PASS | `{"success":false,"message":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | GET | /api/v1/posts/internal/reports | PASS | `{"success":true,"data":[{"id":5,"postId":1863,"reportedBy":51,"reason":"spam","description":"Fake engagement","status":"pending","created_at":"2026-02-10T06:20:10.930Z","updated_at":"2026-02-10T06:20:` |
| post-service | GET | /api/v1/posts/internal/reports/stats | PASS | `{"success":true,"data":{"count":0}}` |
| post-service | DELETE | /api/v1/posts/:id/bookmark | PASS | `{"message":"User ID required"}` |
| post-service | POST | /api/v1/posts/:id/bookmark | PASS | `{"message":"User ID required"}` |
| post-service | POST | /api/v1/posts/:id/report | FAIL | `{"status":"error","message":"Invalid Post ID"}` |
| post-service | PUT | /api/v1/posts/:id/toggle-comments | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | PUT | /api/v1/posts/:id/hide-likes | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | PUT | /api/v1/posts/:id | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | DELETE | /api/v1/posts/:id | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | GET | /api/v1/posts/:id | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | GET | /api/v1/posts/:id/embed | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | GET | /api/v1/posts/activity/posts | PASS | `{"status":"success","data":[]}` |
| post-service | GET | /api/v1/posts/activity/likes | PASS | `{"status":"success","data":[]}` |
| post-service | POST | /api/v1/posts/check-likes | PASS | `{"message":"User ID and postIds array required"}` |
| post-service | GET | /api/v1/posts/saved | PASS | `{"status":"success","data":[]}` |
| post-service | DELETE | /api/v1/posts/:id/like | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | POST | /api/v1/posts/:id/like | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | GET | /api/v1/posts/ | PASS | `{"status":"success","data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa2444` |
| post-service | GET | /api/v1/posts/explore | PASS | `{"status":"success","data":[{"id":533,"userId":2038,"username":"user_demo_38_877","caption":"Analytics demo post #190. #metrics #2026","mediaUrl":"https://picsum.photos/seed/1190/600/600","thumbnailUr` |
| post-service | POST | /api/v1/posts/ | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| post-service | GET | /api/v1/posts/internal/:postId/bookmarks | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | GET | /api/v1/posts/internal/:postId/likes | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | GET | /api/v1/posts/internal/:postId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | DELETE | /api/v1/posts/internal/:postId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | PATCH | /api/v1/posts/internal/:postId/unhide | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | PATCH | /api/v1/posts/internal/:postId/hide | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_post_id\""}` |
| post-service | GET | /api/v1/posts/internal/user/:userId | PASS | `{"success":true,"data":[]}` |
| post-service | GET | /api/v1/posts/internal/stats/user/:userId | PASS | `{"success":true,"data":{"count":0}}` |
| post-service | GET | /api/v1/posts/internal/list | PASS | `{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f` |
| post-service | GET | /api/v1/posts/internal/recent | PASS | `{"success":true,"data":[{"id":1863,"userId":55,"username":"farhan","caption":"test 4","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/posts/images/temp_cbf2dedb-ddb9-41f6-80e0-1aaa24448f5f` |
| post-service | GET | /api/v1/posts/internal/top | PASS | `{"success":true,"data":[{"contentId":759,"creatorUsername":"user_demo_138_127","views":20316,"likes":1989,"engagementRate":"11.7"},{"contentId":907,"creatorUsername":"user_demo_53_25","views":20464,"l` |
| post-service | GET | /api/v1/posts/internal/engagement/trends | PASS | `{"success":true,"data":[{"month":"Jan","engagementRate":"1256.9"},{"month":"Feb","engagementRate":"982.3"}]}` |
| post-service | GET | /api/v1/posts/internal/stats/engagement | PASS | `{"success":true,"data":{"rate":"11.7"}}` |
| post-service | GET | /api/v1/posts/internal/stats/overall | PASS | `{"success":true,"data":{"likes":1679427,"comments":405561,"views":17843069}}` |
| post-service | GET | /api/v1/posts/internal/stats | PASS | `{"success":true,"data":{"total":1857,"growth":46}}` |
| reel-service | DELETE | /api/v1/reels/:id/like | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| reel-service | POST | /api/v1/reels/:id/like | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| reel-service | GET | /api/v1/reels/activity/likes | PASS | `{"status":"success","data":[]}` |
| reel-service | GET | /api/v1/reels/activity/reels | PASS | `{"status":"success","data":[]}` |
| reel-service | GET | /api/v1/reels/ | PASS | `{"status":"success","data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","like` |
| reel-service | POST | /api/v1/reels/ | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| reel-service | GET | /api/v1/reels/internal/:reelId/likes | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}` |
| reel-service | GET | /api/v1/reels/internal/:reelId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}` |
| reel-service | GET | /api/v1/reels/internal/recent | PASS | `{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou` |
| reel-service | DELETE | /api/v1/reels/internal/:reelId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}` |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/unhide | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}` |
| reel-service | PATCH | /api/v1/reels/internal/:reelId/hide | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_reel_id\""}` |
| reel-service | GET | /api/v1/reels/internal/list | PASS | `{"success":true,"data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","videoUrl":"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","likesCou` |
| reel-service | GET | /api/v1/reels/internal/user/:userId | PASS | `{"success":true,"data":[]}` |
| reel-service | GET | /api/v1/reels/internal/stats/user/:userId | PASS | `{"success":true,"data":{"count":0}}` |
| reel-service | GET | /api/v1/reels/internal/stats/overall | PASS | `{"success":true,"data":{"likes":11917,"comments":3,"views":0}}` |
| reel-service | GET | /api/v1/reels/internal/stats | PASS | `{"success":true,"data":{"total":49,"growth":100}}` |
| search-service | GET | /api/v1/search/users | PASS | `{"status":"success","data":[]}` |
| search-service | GET | /api/v1/search/ | PASS | `{"status":"success","data":[]}` |
| story-service | DELETE | /api/v1/stories/:id/react | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | POST | /api/v1/stories/:id/react | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | POST | /api/v1/stories/:id/view | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | POST | /api/v1/stories/:id/report | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | DELETE | /api/v1/stories/:id | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | GET | /api/v1/stories/activity/story-replies | PASS | `{"status":"success","data":[]}` |
| story-service | GET | /api/v1/stories/archive | PASS | `{"status":"success","data":[]}` |
| story-service | GET | /api/v1/stories/ | PASS | `{"status":"success","data":[{"id":85,"userId":51,"username":"akbar","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/stories/temp_12921bca-d5a1-44aa-98d2-92994ebd7dbe_opt.webp","thumbnailUr` |
| story-service | POST | /api/v1/stories/ | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | DELETE | /api/v1/stories/internal/:storyId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \"temp_story_id\""}` |
| story-service | GET | /api/v1/stories/internal/:storyId/likes | PASS | `{"success":false,"message":"invalid input syntax for type integer: \"temp_story_id\""}` |
| story-service | GET | /api/v1/stories/internal/:storyId/views | PASS | `{"success":false,"message":"invalid input syntax for type integer: \"temp_story_id\""}` |
| story-service | GET | /api/v1/stories/internal/list | PASS | `{"success":true,"data":[{"id":85,"userId":51,"username":"akbar","mediaUrl":"http://localhost:5000/api/v1/media/files/Jaadoe/stories/temp_12921bca-d5a1-44aa-98d2-92994ebd7dbe_opt.webp","thumbnailUrl":n` |
| story-service | GET | /api/v1/stories/internal/stats | PASS | `{"success":true,"data":{"total":83}}` |
| story-service | DELETE | /api/v1/stories/highlights/:highlightId | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | PUT | /api/v1/stories/highlights/:highlightId | FAIL | `{"status":"error","message":"Title is required"}` |
| story-service | GET | /api/v1/stories/highlights/:highlightId/stories | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| story-service | GET | /api/v1/stories/highlights/:userId | PASS | `{"status":"success","data":[]}` |
| story-service | POST | /api/v1/stories/highlights | FAIL | `{"status":"error","message":"Title is required"}` |
| story-service | GET | /api/v1/stories/activity/highlights | PASS | `{"status":"success","data":[]}` |
| story-service | GET | /api/v1/stories/stories/me | PASS | `{"status":"success","data":[]}` |
| user-service | DELETE | /api/v1/users/profile/followers/:followerId | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | GET | /api/v1/users/profile/:userId/following | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/:userId/followers | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/:userId/posts | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/:username | FAIL | `{"status":"error","message":"User not found"}` |
| user-service | GET | /api/v1/users/profile/activity/account-history | PASS | `{"status":"success","data":[]}` |
| user-service | POST | /api/v1/users/profile/batch | FAIL | `{"status":"error","message":"userIds array required"}` |
| user-service | GET | /api/v1/users/profile/suggestions | PASS | `{"status":"success","data":[{"userId":2055,"username":"user_demo_55_251","fullName":"Demo User 55","profilePicture":"https://i.pravatar.cc/150?u=2055","isFollowing":false},{"userId":2077,"username":"u` |
| user-service | GET | /api/v1/users/profile/me/saved | PASS | `{"status":"success","data":[]}` |
| user-service | DELETE | /api/v1/users/profile/profile-photo | PASS | `{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco` |
| user-service | POST | /api/v1/users/profile/profile-photo | PASS | `{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"website":null,"gender":null,"isPrivate":false,"showAccountSuggestions":true` |
| user-service | PUT | /api/v1/users/profile/me | PASS | `{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco` |
| user-service | GET | /api/v1/users/profile/me | PASS | `{"status":"success","data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAcco` |
| user-service | POST | /api/v1/users/profile/help/feedback | FAIL | `{"status":"error","message":"Rating is required"}` |
| user-service | GET | /api/v1/users/profile/help/support-requests | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/help/feature-limits | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/help/violations | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/help/account-status | PASS | `{"status":"success","data":{"lastChecked":"2026-02-11T05:03:13.112Z","userId":76,"status":"OK"}}` |
| user-service | PATCH | /api/v1/users/profile/settings/apps/:id/revoke | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"76\""}` |
| user-service | GET | /api/v1/users/profile/settings/apps | PASS | `{"status":"success","data":[]}` |
| user-service | PATCH | /api/v1/users/profile/settings/general | PASS | `{"status":"success","data":{"saveStoryToArchive":true,"reduceMotion":false,"languageCode":"en","userId":76,"updated_at":"2026-02-11T05:03:13.354Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/general | PASS | `{"status":"success","data":{"userId":76,"saveStoryToArchive":true,"reduceMotion":false,"languageCode":"en","updated_at":"2026-02-11T05:03:13.354Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/subscriptions | PASS | `{"status":"success","data":[]}` |
| user-service | PATCH | /api/v1/users/profile/settings/like-share | PASS | `{"status":"success","data":{"hideLikeShareCounts":false,"userId":76,"created_at":"2026-02-11T05:03:13.562Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/like-share | PASS | `{"status":"success","data":{"userId":76,"hideLikeShareCounts":false,"created_at":"2026-02-11T05:03:13.562Z"}}` |
| user-service | PATCH | /api/v1/users/profile/settings/content-preferences | PASS | `{"status":"success","data":{"sensitiveContentLevel":"limit_more","userId":76,"created_at":"2026-02-11T05:03:13.706Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/content-preferences | PASS | `{"status":"success","data":{"userId":76,"sensitiveContentLevel":"limit_more","created_at":"2026-02-11T05:03:13.706Z"}}` |
| user-service | DELETE | /api/v1/users/profile/settings/muted/:userId | PASS | `{"status":"success","message":"Account unmuted"}` |
| user-service | POST | /api/v1/users/profile/settings/muted/:userId | FAIL | `{"status":"error","message":"Cannot mute yourself"}` |
| user-service | GET | /api/v1/users/profile/settings/muted | PASS | `{"status":"success","data":[]}` |
| user-service | DELETE | /api/v1/users/profile/settings/hidden-words/words/:id | FAIL | `{"status":"error","message":"invalid input syntax for type uuid: \"76\""}` |
| user-service | POST | /api/v1/users/profile/settings/hidden-words/words | FAIL | `{"status":"error","message":"Word is required"}` |
| user-service | PUT | /api/v1/users/profile/settings/hidden-words | PASS | `{"status":"success","data":{"hideComments":false,"advancedFilter":false,"hideMessageRequests":false,"customHideComments":false,"customHideMessageRequests":false,"userId":76}}` |
| user-service | GET | /api/v1/users/profile/settings/hidden-words | PASS | `{"status":"success","data":{"settings":{"userId":76,"hideComments":false,"advancedFilter":false,"hideMessageRequests":false,"customHideComments":false,"customHideMessageRequests":false},"customWords":` |
| user-service | DELETE | /api/v1/users/profile/settings/restricted/:userId | PASS | `{"status":"success","message":"Account unrestricted"}` |
| user-service | POST | /api/v1/users/profile/settings/restricted/:userId | FAIL | `{"status":"error","message":"Cannot restrict yourself"}` |
| user-service | GET | /api/v1/users/profile/settings/restricted | PASS | `{"status":"success","data":[]}` |
| user-service | PUT | /api/v1/users/profile/settings/sharing | PASS | `{"status":"success","data":{"storyShares":true,"postToStory":true,"reposts":true,"websiteEmbeds":true,"featuredRequests":true,"userId":76}}` |
| user-service | GET | /api/v1/users/profile/settings/sharing | PASS | `{"status":"success","data":{"userId":76,"storyShares":true,"postToStory":true,"reposts":true,"websiteEmbeds":true,"featuredRequests":true}}` |
| user-service | PUT | /api/v1/users/profile/settings/comments | PASS | `{"status":"success","data":{"allowFrom":"everyone","allowGif":true,"userId":76,"updated_at":"2026-02-11T05:03:14.646Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/comments | PASS | `{"status":"success","data":{"userId":76,"allowFrom":"everyone","allowGif":true,"updated_at":"2026-02-11T05:03:14.646Z","counts":{"following":0,"followers":0,"mutual":0}}}` |
| user-service | PATCH | /api/v1/users/profile/tags/:id/remove | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | PATCH | /api/v1/users/profile/tags/:id/approve | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | GET | /api/v1/users/profile/tags/pending | PASS | `{"status":"success","data":[]}` |
| user-service | PATCH | /api/v1/users/profile/settings/tags-mentions | PASS | `{"status":"success","data":{"allowTagsFrom":"everyone","manualTagApproval":false,"allowMentionsFrom":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.032Z","created_at":"2026-02-11T05:03:15.03` |
| user-service | GET | /api/v1/users/profile/settings/tags-mentions | PASS | `{"status":"success","data":{"userId":76,"allowTagsFrom":"everyone","manualTagApproval":false,"allowMentionsFrom":"everyone","created_at":"2026-02-11T05:03:15.032Z","updated_at":"2026-02-11T05:03:15.03` |
| user-service | PATCH | /api/v1/users/profile/settings/activity-status | PASS | `{"status":"success","data":{"showActivityStatus":true,"userId":76,"updated_at":"2026-02-11T05:03:15.181Z","created_at":"2026-02-11T05:03:15.181Z","lastActiveAt":null}}` |
| user-service | GET | /api/v1/users/profile/settings/activity-status | PASS | `{"status":"success","data":{"userId":76,"showActivityStatus":true,"lastActiveAt":null,"created_at":"2026-02-11T05:03:15.181Z","updated_at":"2026-02-11T05:03:15.181Z"}}` |
| user-service | PATCH | /api/v1/users/profile/settings/story-replies | PASS | `{"status":"success","data":{"storyReplies":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.313Z","created_at":"2026-02-11T05:03:15.313Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/story-replies | PASS | `{"status":"success","data":{"userId":76,"storyReplies":"everyone","created_at":"2026-02-11T05:03:15.313Z","updated_at":"2026-02-11T05:03:15.313Z"}}` |
| user-service | PATCH | /api/v1/users/profile/settings/messages | PASS | `{"status":"success","data":{"messageRequestsFrom":"everyone","groupAddPermission":"everyone","userId":76,"updated_at":"2026-02-11T05:03:15.460Z","created_at":"2026-02-11T05:03:15.460Z"}}` |
| user-service | GET | /api/v1/users/profile/settings/messages | PASS | `{"status":"success","data":{"userId":76,"messageRequestsFrom":"everyone","groupAddPermission":"everyone","created_at":"2026-02-11T05:03:15.460Z","updated_at":"2026-02-11T05:03:15.460Z"}}` |
| user-service | DELETE | /api/v1/users/profile/story-privacy/unhide/:hiddenUserId | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | POST | /api/v1/users/profile/story-privacy/hide | FAIL | `{"status":"error","message":"Hidden User ID required"}` |
| user-service | GET | /api/v1/users/profile/story-privacy/hidden-users | PASS | `{"status":"success","data":[]}` |
| user-service | DELETE | /api/v1/users/profile/unblock/:userId | PASS | `{"status":"success","message":"User unblocked"}` |
| user-service | POST | /api/v1/users/profile/block/:userId | FAIL | `{"status":"error","message":"Cannot block yourself"}` |
| user-service | GET | /api/v1/users/profile/blocked-users | PASS | `{"status":"success","data":[]}` |
| user-service | DELETE | /api/v1/users/profile/close-friends/:friendId | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | POST | /api/v1/users/profile/close-friends/:friendId | FAIL | `{"status":"error","message":"Internal Server Error"}` |
| user-service | GET | /api/v1/users/profile/close-friends | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/profile/reports/me | PASS | `{"status":"success","data":[]}` |
| user-service | POST | /api/v1/users/profile/report-problem | FAIL | `{"status":"error","message":"Please provide some details or attach a file."}` |
| user-service | GET | /api/v1/users/internal/:userId/follow-counts | PASS | `{"success":true,"data":{"followersCount":0,"followingCount":0}}` |
| user-service | GET | /api/v1/users/internal/:userId | PASS | `{"success":true,"data":{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccountS` |
| user-service | POST | /api/v1/users/internal/bulk | PASS | `{"success":false,"message":"userIds must be an array"}` |
| user-service | GET | /api/v1/users/internal/recent | PASS | `{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount` |
| user-service | DELETE | /api/v1/users/internal/:userId | PASS | `{"success":true,"message":"User soft deleted"}` |
| user-service | PATCH | /api/v1/users/internal/:userId/unban | PASS | `{"success":true,"message":"User unbanned"}` |
| user-service | PATCH | /api/v1/users/internal/:userId/ban | PASS | `{"success":true,"message":"User banned"}` |
| user-service | GET | /api/v1/users/internal/list | PASS | `{"success":true,"data":[{"id":876,"userId":76,"username":"test_user_1770786147742","fullName":"Test API User","bio":null,"profilePicture":"","website":null,"gender":null,"isPrivate":false,"showAccount` |
| user-service | GET | /api/v1/users/internal/countries | PASS | `{"success":true,"data":[{"name":"Unknown","count":"276"}]}` |
| user-service | GET | /api/v1/users/internal/login-methods | PASS | `{"success":true,"data":[{"method":"email","count":"153"},{"method":"google","count":"81"},{"method":"facebook","count":"42"}]}` |
| user-service | GET | /api/v1/users/internal/growth | PASS | `{"success":true,"data":[{"month":"Jan","count":"171"},{"month":"Feb","count":"34"}]}` |
| user-service | DELETE | /api/v1/users/internal/avatars/:avatarId | PASS | `{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}` |
| user-service | PATCH | /api/v1/users/internal/avatars/:avatarId/reject | PASS | `{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}` |
| user-service | PATCH | /api/v1/users/internal/avatars/:avatarId/approve | PASS | `{"success":false,"error":"invalid input syntax for type integer: \":avatarId\""}` |
| user-service | GET | /api/v1/users/internal/avatars/stats | PASS | `{"success":true,"data":{"total":0,"pending":0,"approved":0,"rejected":0}}` |
| user-service | GET | /api/v1/users/internal/avatars | PASS | `{"success":true,"data":[],"pagination":{"total":0,"page":1,"limit":12,"totalPages":0}}` |
| user-service | GET | /api/v1/users/internal/stats | PASS | `{"success":true,"data":{"total":276,"growth":57}}` |
| user-service | PATCH | /api/v1/users/internal/reports/:id/status | PASS | `{"success":false,"message":"invalid input syntax for type uuid: \"76\""}` |
| user-service | GET | /api/v1/users/internal/reports/:id | PASS | `{"success":false,"message":"invalid input syntax for type uuid: \"76\""}` |
| user-service | GET | /api/v1/users/internal/reports | PASS | `{"success":true,"data":[{"id":"e3611a21-555d-47ad-b70c-47003bab87f2","userId":51,"reportedUsername":"akbar","reason":"App Feedback / Problem","description":"this is test report a problem in help page ` |
| user-service | GET | /api/v1/users/internal/reports/stats | PASS | `{"success":true,"data":{"count":0}}` |
| user-service | POST | /api/v1/users/requests/reject | FAIL | `{"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"}` |
| user-service | POST | /api/v1/users/requests/accept | FAIL | `{"status":"error","message":"WHERE parameter \"requesterId\" has invalid \"undefined\" value"}` |
| user-service | GET | /api/v1/users/requests | PASS | `{"status":"success","data":[]}` |
| user-service | GET | /api/v1/users/:userId/following | PASS | `{"success":true,"data":[]}` |
| user-service | GET | /api/v1/users/:userId/followers | PASS | `{"success":true,"data":[]}` |
| user-service | GET | /api/v1/users/:userId/follow/status | PASS | `{"status":"success","data":{"isFollowing":{"padding":false,"following":false,"requested":false}}}` |
| user-service | DELETE | /api/v1/users/:userId/follow | PASS | `{"status":"none","isFollowing":false,"isRequested":false,"followersCount":0}` |
| user-service | POST | /api/v1/users/:userId/follow | FAIL | `{"status":"error","message":"You cannot follow yourself"}` |
