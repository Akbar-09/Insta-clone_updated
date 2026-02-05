# API Test Report

Generated at: 2026-02-05T05:21:51.862Z

| Endpoint | Status | Details |
| :--- | :--- | :--- |
| POST /auth/signup | PASS | {"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsInVzZXJuYW1lIj... |
| POST /auth/login | PASS | N/A |
| POST /admin/auth/login | PASS | N/A |
| POST /media/upload | PASS | N/A |
| GET /users/profile/me | PASS | {"status":"success","data":{"id":860,"userId":60,"username":"testuser_1770268905311","fullName":"Tes... |
| GET /users/{username} | PASS | {"status":"success","data":{"id":860,"userId":60,"username":"testuser_1770268905311","fullName":"Tes... |
| POST /users/{id}/follow | PASS | {"status":"error","message":"You cannot follow yourself"}... |
| GET /posts | PASS | {"status":"success","data":[{"id":477,"userId":2063,"username":"user_demo_63_396","caption":"Analyti... |
| POST /posts | PASS | {"status":"success","data":{"createdAt":"2026-02-05T05:21:47.677Z","likesCount":0,"commentsCount":0,... |
| GET /posts/explore | PASS | {"status":"success","data":[{"id":533,"userId":2038,"username":"user_demo_38_877","caption":"Analyti... |
| GET /reels | PASS | {"status":"success","data":[{"id":49,"userId":50,"username":"user_test_50","caption":"Reel 1 #fun","... |
| GET /stories | PASS | {"status":"success","data":[]}... |
| GET /notifications | PASS | {"status":"success","data":[]}... |
| GET /search | PASS | {"status":"success","data":[{"id":3,"type":"USER","referenceId":1,"content":"user_test_1","metadata"... |
| GET /messages/conversations | PASS | {"status":"success","data":[]}... |
| POST /posts/477/like | PASS | N/A |
| GET /admin/auth/roles | PASS | {"success":true,"data":[{"id":1,"name":"SuperAdmin","permissions":["all"],"description":null,"create... |
| GET /admin/dashboard/kpis | PASS | {"success":true,"data":{"totalUsers":260,"totalPosts":1841,"activeReels":49,"pendingReports":0,"grow... |
| GET /admin/users | PASS | {"success":true,"data":[{"id":860,"userId":60,"username":"testuser_1770268905311","fullName":"Test U... |
| GET /admin/reports | PASS | {"success":true,"data":[{"id":4,"postId":140,"reportedBy":51,"reason":"spam","description":"Repetiti... |
| GET /admin/audit | PASS | {"success":true,"data":[{"id":73,"adminId":1,"actionType":"LOGIN","targetType":"auth","targetId":"1"... |
