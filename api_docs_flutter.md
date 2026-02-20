# Instagram Clone API Documentation (Flutter)

**Base URL:** `http://192.168.1.4:5000/api/v1`

**Authentication:** All endpoints (except Auth/Public) typically require a Bearer Token via `Authorization` header.

## Auth

### Get user account history

**Endpoint:** `GET /auth/history`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/auth/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Get current user details

**Endpoint:** `GET /auth/me`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Log out the current user

**Endpoint:** `POST /auth/logout`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Request password reset token

**Endpoint:** `POST /auth/reset-password/request`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/reset-password/request" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Check if email is available

**Endpoint:** `GET /auth/check-email`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `email` | query | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/auth/check-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Check if username is available

**Endpoint:** `GET /auth/check-username`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | query | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/auth/check-username" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Log in a user

**Endpoint:** `POST /auth/login`

#### Request Body (Example)
```json
{
  "email": "user@example.com",
  "password": "password123",
  "deviceId": "device-xyz"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","deviceId":"device-xyz"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Register a new user (Alias)

**Endpoint:** `POST /auth/signup`

#### Request Body (Example)
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","username":"newuser","fullName":"New User"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Register a new user

**Endpoint:** `POST /auth/register`

#### Request Body (Example)
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","username":"newuser","fullName":"New User"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

### Verify token and reset password

**Endpoint:** `POST /auth/reset-password/verify`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/auth/reset-password/verify" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {
    "token": "ey...",
    "user": {
      "id": 123,
      "username": "user"
    }
  }
}
```

---

## Users

### DELETE /users/profile/followers/:followerId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/followers/{followerId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `followerId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/followers/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/:userId/following (profileRoutes.js)

**Endpoint:** `GET /users/profile/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/123/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/:userId/followers (profileRoutes.js)

**Endpoint:** `GET /users/profile/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/123/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/:userId/reels (profileRoutes.js)

**Endpoint:** `GET /users/profile/{userId}/reels`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/123/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/:userId/posts (profileRoutes.js)

**Endpoint:** `GET /users/profile/{userId}/posts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/123/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/:username (profileRoutes.js)

**Endpoint:** `GET /users/profile/{username}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/activity/account-history (profileRoutes.js)

**Endpoint:** `GET /users/profile/activity/account-history`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/activity/account-history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/batch (profileRoutes.js)

**Endpoint:** `POST /users/profile/batch`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/batch" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/suggestions (profileRoutes.js)

**Endpoint:** `GET /users/profile/suggestions`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/suggestions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/me/saved (profileRoutes.js)

**Endpoint:** `GET /users/profile/me/saved`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/me/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /users/profile/profile-photo (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/profile-photo`

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/profile-photo (profileRoutes.js)

**Endpoint:** `POST /users/profile/profile-photo`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /users/profile/me (profileRoutes.js)

**Endpoint:** `PUT /users/profile/me`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get current logged-in user profile

**Endpoint:** `GET /users/profile/me`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/help/feedback (profileRoutes.js)

**Endpoint:** `POST /users/profile/help/feedback`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/help/support-requests (profileRoutes.js)

**Endpoint:** `GET /users/profile/help/support-requests`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/help/support-requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/help/feature-limits (profileRoutes.js)

**Endpoint:** `GET /users/profile/help/feature-limits`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/help/feature-limits" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/help/violations (profileRoutes.js)

**Endpoint:** `GET /users/profile/help/violations`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/help/violations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/help/account-status (profileRoutes.js)

**Endpoint:** `GET /users/profile/help/account-status`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/help/account-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/apps/:id/revoke (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/apps/{id}/revoke`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/apps/123/revoke" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/apps (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/apps`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/apps" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/general (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/general`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/general (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/general`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/subscriptions (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/subscriptions`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/subscriptions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/like-share (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/like-share`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/like-share (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/like-share`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/profile/settings/content-preferences (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/content-preferences`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/content-preferences (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/content-preferences`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/profile/settings/muted/:userId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/settings/muted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/settings/muted/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/settings/muted/:userId (profileRoutes.js)

**Endpoint:** `POST /users/profile/settings/muted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/settings/muted/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/muted (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/muted`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/muted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /users/profile/settings/hidden-words/words/:id (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/settings/hidden-words/words/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/settings/hidden-words/words/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/settings/hidden-words/words (profileRoutes.js)

**Endpoint:** `POST /users/profile/settings/hidden-words/words`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/settings/hidden-words/words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /users/profile/settings/hidden-words (profileRoutes.js)

**Endpoint:** `PUT /users/profile/settings/hidden-words`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/hidden-words (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/hidden-words`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/profile/settings/restricted/:userId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/settings/restricted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/settings/restricted/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/settings/restricted/:userId (profileRoutes.js)

**Endpoint:** `POST /users/profile/settings/restricted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/settings/restricted/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/restricted (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/restricted`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/restricted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /users/profile/settings/sharing (profileRoutes.js)

**Endpoint:** `PUT /users/profile/settings/sharing`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/sharing (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/sharing`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /users/profile/settings/comments (profileRoutes.js)

**Endpoint:** `PUT /users/profile/settings/comments`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/comments (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/comments`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/tags/:id/remove (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/tags/{id}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/tags/123/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/profile/tags/:id/approve (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/tags/{id}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/tags/123/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/tags/pending (profileRoutes.js)

**Endpoint:** `GET /users/profile/tags/pending`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/tags/pending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/profile/settings/tags-mentions (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/tags-mentions`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/tags-mentions (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/tags-mentions`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/activity-status (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/activity-status`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/activity-status (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/activity-status`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/story-replies (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/story-replies`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/story-replies (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/story-replies`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/profile/settings/messages (profileRoutes.js)

**Endpoint:** `PATCH /users/profile/settings/messages`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/settings/messages (profileRoutes.js)

**Endpoint:** `GET /users/profile/settings/messages`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/profile/story-privacy/unhide/:hiddenUserId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/story-privacy/unhide/{hiddenUserId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `hiddenUserId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/story-privacy/unhide/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/story-privacy/hide (profileRoutes.js)

**Endpoint:** `POST /users/profile/story-privacy/hide`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/story-privacy/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/story-privacy/hidden-users (profileRoutes.js)

**Endpoint:** `GET /users/profile/story-privacy/hidden-users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/story-privacy/hidden-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/profile/unblock/:userId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/unblock/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/unblock/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/block/:userId (profileRoutes.js)

**Endpoint:** `POST /users/profile/block/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/block/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/blocked-users (profileRoutes.js)

**Endpoint:** `GET /users/profile/blocked-users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/blocked-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/profile/close-friends/:friendId (profileRoutes.js)

**Endpoint:** `DELETE /users/profile/close-friends/{friendId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `friendId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/profile/close-friends/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/profile/close-friends/:friendId (profileRoutes.js)

**Endpoint:** `POST /users/profile/close-friends/{friendId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `friendId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/profile/close-friends/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/profile/close-friends (profileRoutes.js)

**Endpoint:** `GET /users/profile/close-friends`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/close-friends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/profile/reports/me (profileRoutes.js)

**Endpoint:** `GET /users/profile/reports/me`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/profile/reports/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/:userId/follow-counts (internalRoutes.js)

**Endpoint:** `GET /users/internal/{userId}/follow-counts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/123/follow-counts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/:userId (internalRoutes.js)

**Endpoint:** `GET /users/internal/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /users/internal/:userId (internalRoutes.js)

**Endpoint:** `DELETE /users/internal/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/internal/bulk (internalRoutes.js)

**Endpoint:** `POST /users/internal/bulk`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/internal/bulk" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/recent (internalRoutes.js)

**Endpoint:** `GET /users/internal/recent`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/internal/:userId/unban (internalRoutes.js)

**Endpoint:** `PATCH /users/internal/{userId}/unban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/internal/123/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/internal/:userId/ban (internalRoutes.js)

**Endpoint:** `PATCH /users/internal/{userId}/ban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/internal/123/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/list (internalRoutes.js)

**Endpoint:** `GET /users/internal/list`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/countries (internalRoutes.js)

**Endpoint:** `GET /users/internal/countries`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/login-methods (internalRoutes.js)

**Endpoint:** `GET /users/internal/login-methods`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/growth (internalRoutes.js)

**Endpoint:** `GET /users/internal/growth`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /users/internal/avatars/:avatarId (internalRoutes.js)

**Endpoint:** `DELETE /users/internal/avatars/{avatarId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/internal/avatars/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/internal/avatars/:avatarId/reject (internalRoutes.js)

**Endpoint:** `PATCH /users/internal/avatars/{avatarId}/reject`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/internal/avatars/123/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /users/internal/avatars/:avatarId/approve (internalRoutes.js)

**Endpoint:** `PATCH /users/internal/avatars/{avatarId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/internal/avatars/123/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/avatars/stats (internalRoutes.js)

**Endpoint:** `GET /users/internal/avatars/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/avatars (internalRoutes.js)

**Endpoint:** `GET /users/internal/avatars`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/stats (internalRoutes.js)

**Endpoint:** `GET /users/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /users/internal/reports/:id/status (internalRoutes.js)

**Endpoint:** `PATCH /users/internal/reports/{id}/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/users/internal/reports/123/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/reports/:id (internalRoutes.js)

**Endpoint:** `GET /users/internal/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/reports/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/internal/reports (internalRoutes.js)

**Endpoint:** `GET /users/internal/reports`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/internal/reports/stats (internalRoutes.js)

**Endpoint:** `GET /users/internal/reports/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /users/requests/reject (followRoutes.js)

**Endpoint:** `POST /users/requests/reject`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/requests/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/requests/accept (followRoutes.js)

**Endpoint:** `POST /users/requests/accept`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/requests/accept" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/requests (followRoutes.js)

**Endpoint:** `GET /users/requests`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/:userId/following (followRoutes.js)

**Endpoint:** `GET /users/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/123/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /users/:userId/followers (followRoutes.js)

**Endpoint:** `GET /users/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/123/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /users/:userId/follow/status (followRoutes.js)

**Endpoint:** `GET /users/{userId}/follow/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/123/follow/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /users/:userId/follow (followRoutes.js)

**Endpoint:** `DELETE /users/{userId}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/123/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /users/:userId/follow (followRoutes.js)

**Endpoint:** `POST /users/{userId}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/123/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get user profile by username

**Endpoint:** `GET /users/{username}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/users/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Follow a user

**Endpoint:** `POST /users/{id}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/users/123/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Unfollow a user

**Endpoint:** `DELETE /users/{id}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/users/123/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Posts

### PATCH /posts/internal/reports/:id/status (reportInternalRoutes.js)

**Endpoint:** `PATCH /posts/internal/reports/{id}/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/posts/internal/reports/123/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/reports/:id (reportInternalRoutes.js)

**Endpoint:** `GET /posts/internal/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/reports/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/reports (reportInternalRoutes.js)

**Endpoint:** `GET /posts/internal/reports`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /posts/internal/reports/stats (reportInternalRoutes.js)

**Endpoint:** `GET /posts/internal/reports/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /posts/:id/bookmark (postRoutes.js)

**Endpoint:** `DELETE /posts/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/posts/123/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Bookmark a post

**Endpoint:** `POST /posts/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/123/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /posts/:id/report (postRoutes.js)

**Endpoint:** `POST /posts/{id}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/123/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /posts/:id/toggle-comments (postRoutes.js)

**Endpoint:** `PUT /posts/{id}/toggle-comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/posts/123/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /posts/:id/hide-likes (postRoutes.js)

**Endpoint:** `PUT /posts/{id}/hide-likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/posts/123/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /posts/:id (postRoutes.js)

**Endpoint:** `PUT /posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/posts/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /posts/:id (postRoutes.js)

**Endpoint:** `DELETE /posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/posts/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get a single post by ID

**Endpoint:** `GET /posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/:id/embed (postRoutes.js)

**Endpoint:** `GET /posts/{id}/embed`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/123/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/activity/posts (postRoutes.js)

**Endpoint:** `GET /posts/activity/posts`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/activity/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /posts/activity/likes (postRoutes.js)

**Endpoint:** `GET /posts/activity/likes`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /posts/check-likes (postRoutes.js)

**Endpoint:** `POST /posts/check-likes`

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/check-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/saved (postRoutes.js)

**Endpoint:** `GET /posts/saved`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Unlike a post

**Endpoint:** `DELETE /posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/posts/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Like a post

**Endpoint:** `POST /posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/ (postRoutes.js)

**Endpoint:** `GET /posts/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /posts/ (postRoutes.js)

**Endpoint:** `POST /posts/`

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/explore (postRoutes.js)

**Endpoint:** `GET /posts/explore`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/explore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /posts/feed (postRoutes.js)

**Endpoint:** `POST /posts/feed`

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/:postId/bookmarks (internalRoutes.js)

**Endpoint:** `GET /posts/internal/{postId}/bookmarks`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/123/bookmarks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /posts/internal/:postId/likes (internalRoutes.js)

**Endpoint:** `GET /posts/internal/{postId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/123/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /posts/internal/:postId (internalRoutes.js)

**Endpoint:** `GET /posts/internal/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /posts/internal/:postId (internalRoutes.js)

**Endpoint:** `DELETE /posts/internal/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/posts/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /posts/internal/:postId/unhide (internalRoutes.js)

**Endpoint:** `PATCH /posts/internal/{postId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/posts/internal/123/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /posts/internal/:postId/hide (internalRoutes.js)

**Endpoint:** `PATCH /posts/internal/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/posts/internal/123/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/user/:userId (internalRoutes.js)

**Endpoint:** `GET /posts/internal/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/user/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/stats/user/:userId (internalRoutes.js)

**Endpoint:** `GET /posts/internal/stats/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/stats/user/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/list (internalRoutes.js)

**Endpoint:** `GET /posts/internal/list`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/recent (internalRoutes.js)

**Endpoint:** `GET /posts/internal/recent`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/top (internalRoutes.js)

**Endpoint:** `GET /posts/internal/top`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/top" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/engagement/trends (internalRoutes.js)

**Endpoint:** `GET /posts/internal/engagement/trends`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/engagement/trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /posts/internal/stats/engagement (internalRoutes.js)

**Endpoint:** `GET /posts/internal/stats/engagement`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/stats/engagement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/stats/overall (internalRoutes.js)

**Endpoint:** `GET /posts/internal/stats/overall`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /posts/internal/stats (internalRoutes.js)

**Endpoint:** `GET /posts/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get all posts

**Endpoint:** `GET /posts`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Create a new post

**Endpoint:** `POST /posts`

#### Request Body (Example)
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"caption":"My new post","mediaUrls":["http://..."],"location":"New York"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Stories

### DELETE /stories/:id/react (storyRoutes.js)

**Endpoint:** `DELETE /stories/{id}/react`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/stories/123/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /stories/:id/react (storyRoutes.js)

**Endpoint:** `POST /stories/{id}/react`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories/123/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Mark a story as viewed

**Endpoint:** `POST /stories/{id}/view`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories/123/view" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /stories/:id/report (storyRoutes.js)

**Endpoint:** `POST /stories/{id}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories/123/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /stories/:id (storyRoutes.js)

**Endpoint:** `DELETE /stories/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/stories/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get story replies activity

**Endpoint:** `GET /stories/activity/story-replies`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get user's archived stories

**Endpoint:** `GET /stories/archive`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/archive" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /stories/ (storyRoutes.js)

**Endpoint:** `GET /stories/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /stories/ (storyRoutes.js)

**Endpoint:** `POST /stories/`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /stories/internal/:storyId (internalRoutes.js)

**Endpoint:** `DELETE /stories/internal/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/stories/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /stories/internal/:storyId/likes (internalRoutes.js)

**Endpoint:** `GET /stories/internal/{storyId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/internal/123/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /stories/internal/:storyId/views (internalRoutes.js)

**Endpoint:** `GET /stories/internal/{storyId}/views`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/internal/123/views" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /stories/internal/list (internalRoutes.js)

**Endpoint:** `GET /stories/internal/list`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /stories/internal/stats (internalRoutes.js)

**Endpoint:** `GET /stories/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /stories/highlights/:highlightId (highlightRoutes.js)

**Endpoint:** `DELETE /stories/highlights/{highlightId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/stories/highlights/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /stories/highlights/:highlightId (highlightRoutes.js)

**Endpoint:** `PUT /stories/highlights/{highlightId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/stories/highlights/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /stories/highlights/:highlightId/stories (highlightRoutes.js)

**Endpoint:** `GET /stories/highlights/{highlightId}/stories`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/highlights/123/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get user's highlights

**Endpoint:** `GET /stories/highlights/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/highlights/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Create a story highlight

**Endpoint:** `POST /stories/highlights`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /stories/activity/highlights (highlightRoutes.js)

**Endpoint:** `GET /stories/activity/highlights`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/activity/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /stories/stories/me (highlightRoutes.js)

**Endpoint:** `GET /stories/stories/me`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories/stories/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get active stories provided by people you follow

**Endpoint:** `GET /stories`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Create a new story

**Endpoint:** `POST /stories`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Reels

### GET /reels/:id (reelRoutes.js)

**Endpoint:** `GET /reels/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/user (reelRoutes.js)

**Endpoint:** `GET /reels/user`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /reels/:id/bookmark (reelRoutes.js)

**Endpoint:** `DELETE /reels/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/reels/123/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /reels/:id/bookmark (reelRoutes.js)

**Endpoint:** `POST /reels/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/reels/123/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Unlike a reel

**Endpoint:** `DELETE /reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/reels/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Like a reel

**Endpoint:** `POST /reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/reels/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get user liked reels

**Endpoint:** `GET /reels/activity/likes`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get user reel activity

**Endpoint:** `GET /reels/activity/reels`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/activity/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /reels/saved (reelRoutes.js)

**Endpoint:** `GET /reels/saved`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/ (reelRoutes.js)

**Endpoint:** `GET /reels/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /reels/ (reelRoutes.js)

**Endpoint:** `POST /reels/`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/reels/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/:reelId/likes (internalRoutes.js)

**Endpoint:** `GET /reels/internal/{reelId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/123/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /reels/internal/:reelId (internalRoutes.js)

**Endpoint:** `GET /reels/internal/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /reels/internal/:reelId (internalRoutes.js)

**Endpoint:** `DELETE /reels/internal/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/reels/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/recent (internalRoutes.js)

**Endpoint:** `GET /reels/internal/recent`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /reels/internal/:reelId/unhide (internalRoutes.js)

**Endpoint:** `PATCH /reels/internal/{reelId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/reels/internal/123/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /reels/internal/:reelId/hide (internalRoutes.js)

**Endpoint:** `PATCH /reels/internal/{reelId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/reels/internal/123/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/list (internalRoutes.js)

**Endpoint:** `GET /reels/internal/list`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/user/:userId (internalRoutes.js)

**Endpoint:** `GET /reels/internal/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/user/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/stats/user/:userId (internalRoutes.js)

**Endpoint:** `GET /reels/internal/stats/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/stats/user/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/stats/overall (internalRoutes.js)

**Endpoint:** `GET /reels/internal/stats/overall`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /reels/internal/stats (internalRoutes.js)

**Endpoint:** `GET /reels/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get reels feed

**Endpoint:** `GET /reels`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

## Feed

### GET /feed/ (feedRoutes.js)

**Endpoint:** `GET /feed/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/feed/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get personalized post feed

**Endpoint:** `GET /feed`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Comments

### GET /comments/internal/post/:postId (internalRoutes.js)

**Endpoint:** `GET /comments/internal/post/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/internal/post/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /comments/internal/:commentId (internalRoutes.js)

**Endpoint:** `DELETE /comments/internal/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/comments/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /comments/internal/:commentId (internalRoutes.js)

**Endpoint:** `GET /comments/internal/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/internal/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /comments/internal/:commentId/remove (internalRoutes.js)

**Endpoint:** `PATCH /comments/internal/{commentId}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/comments/internal/123/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /comments/internal/:commentId/approve (internalRoutes.js)

**Endpoint:** `PATCH /comments/internal/{commentId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/comments/internal/123/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /comments/internal/stats (internalRoutes.js)

**Endpoint:** `GET /comments/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /comments/internal/list (internalRoutes.js)

**Endpoint:** `GET /comments/internal/list`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /comments/activity/reviews (commentRoutes.js)

**Endpoint:** `GET /comments/activity/reviews`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/activity/reviews" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /comments/activity/comments (commentRoutes.js)

**Endpoint:** `GET /comments/activity/comments`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/activity/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Batch check like status for comments

**Endpoint:** `POST /comments/check-comments`

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/comments/check-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Unlike a comment

**Endpoint:** `DELETE /comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/comments/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Like a comment

**Endpoint:** `POST /comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/comments/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Delete a comment

**Endpoint:** `DELETE /comments/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/comments/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /comments/ (commentRoutes.js)

**Endpoint:** `GET /comments/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /comments/ (commentRoutes.js)

**Endpoint:** `POST /comments/`

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get comments for a post

**Endpoint:** `GET /comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | query | integer | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Add a comment to a post

**Endpoint:** `POST /comments`

#### Request Body (Example)
```json
{
  "content": "Great post!"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"content":"Great post!"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Messages

### POST /messages/seen (messageRoutes.js)

**Endpoint:** `POST /messages/seen`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/seen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /messages/send (messageRoutes.js)

**Endpoint:** `POST /messages/send`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/send" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /messages/conversations/:conversationId (messageRoutes.js)

**Endpoint:** `DELETE /messages/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/messages/conversations/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /messages/conversations/:conversationId (messageRoutes.js)

**Endpoint:** `GET /messages/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/conversations/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /messages/conversations/:conversationId/report (messageRoutes.js)

**Endpoint:** `POST /messages/conversations/{conversationId}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/conversations/123/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /messages/conversations/:conversationId/unblock (messageRoutes.js)

**Endpoint:** `POST /messages/conversations/{conversationId}/unblock`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/conversations/123/unblock" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /messages/conversations/:conversationId/block (messageRoutes.js)

**Endpoint:** `POST /messages/conversations/{conversationId}/block`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/conversations/123/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /messages/conversations/:conversationId/mute (messageRoutes.js)

**Endpoint:** `PATCH /messages/conversations/{conversationId}/mute`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/messages/conversations/123/mute" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /messages/conversations/:conversationId/details (messageRoutes.js)

**Endpoint:** `GET /messages/conversations/{conversationId}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/conversations/123/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get user conversations

**Endpoint:** `GET /messages/conversations`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /messages/activity/story-replies (messageRoutes.js)

**Endpoint:** `GET /messages/activity/story-replies`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /messages/internal/conversations/:conversationId (internalRoutes.js)

**Endpoint:** `GET /messages/internal/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/internal/conversations/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /messages/internal/conversations/:conversationId/mark-safe (internalRoutes.js)

**Endpoint:** `PATCH /messages/internal/conversations/{conversationId}/mark-safe`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/messages/internal/conversations/123/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /messages/internal/conversations/:conversationId/transcript (internalRoutes.js)

**Endpoint:** `GET /messages/internal/conversations/{conversationId}/transcript`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/internal/conversations/123/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /messages/internal/stats (internalRoutes.js)

**Endpoint:** `GET /messages/internal/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /messages/internal/conversations (internalRoutes.js)

**Endpoint:** `GET /messages/internal/conversations`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/internal/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get messages in a conversation

**Endpoint:** `GET /messages/conversations/{id}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | Conversation ID or User ID (depending on implementation) |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/messages/conversations/123/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Send a message

**Endpoint:** `POST /messages/conversations/{id}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | Recipient ID |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/messages/conversations/123/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Notifications

### GET /notifications/admin/stats (notificationRoutes.js)

**Endpoint:** `GET /notifications/admin/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications/admin/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /notifications/admin/history (notificationRoutes.js)

**Endpoint:** `GET /notifications/admin/history`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications/admin/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /notifications/admin/broadcast (notificationRoutes.js)

**Endpoint:** `POST /notifications/admin/broadcast`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/notifications/admin/broadcast" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /notifications/read-all (notificationRoutes.js)

**Endpoint:** `PATCH /notifications/read-all`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/notifications/read-all" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Mark a notification as read

**Endpoint:** `PATCH /notifications/{id}/read`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/notifications/123/read" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get count of unread notifications

**Endpoint:** `GET /notifications/unread-count`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications/unread-count" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /notifications/ (notificationRoutes.js)

**Endpoint:** `GET /notifications/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Update notification preferences

**Endpoint:** `PATCH /notifications/settings`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get notification preferences

**Endpoint:** `GET /notifications/settings`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get user notifications

**Endpoint:** `GET /notifications`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

## Search

### GET /search/users (searchRoutes.js)

**Endpoint:** `GET /search/users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/search/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /search/ (searchRoutes.js)

**Endpoint:** `GET /search/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/search/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Search users or posts

**Endpoint:** `GET /search`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `q` | query | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Media

### GET /media/files/* (mediaRoutes.js)

**Endpoint:** `GET /media/files/*`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/media/files/*" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /media/finalize (mediaRoutes.js)

**Endpoint:** `POST /media/finalize`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/media/finalize" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /media/presigned-url (mediaRoutes.js)

**Endpoint:** `POST /media/presigned-url`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/media/presigned-url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /media/status/:id (mediaRoutes.js)

**Endpoint:** `GET /media/status/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/media/status/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /media/upload (mediaRoutes.js)

**Endpoint:** `POST /media/upload`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/media/upload" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Ads

### POST /ads/ (adRoutes.js)

**Endpoint:** `POST /ads/`

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /ads/:id/comments/:commentId (adRoutes.js)

**Endpoint:** `DELETE /ads/{id}/comments/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `commentId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/ads/123/comments/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/:id/comments (adRoutes.js)

**Endpoint:** `POST /ads/{id}/comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /ads/:id/comments (adRoutes.js)

**Endpoint:** `GET /ads/{id}/comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/ads/123/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /ads/:id/bookmark (adRoutes.js)

**Endpoint:** `POST /ads/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/:id/like (adRoutes.js)

**Endpoint:** `POST /ads/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /ads/:id/embed (adRoutes.js)

**Endpoint:** `GET /ads/{id}/embed`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/ads/123/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id/toggle-comments (adRoutes.js)

**Endpoint:** `PUT /ads/{id}/toggle-comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id/hide-likes (adRoutes.js)

**Endpoint:** `PUT /ads/{id}/hide-likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id (adRoutes.js)

**Endpoint:** `PUT /ads/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /ads/:id (adRoutes.js)

**Endpoint:** `DELETE /ads/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/ads/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/click (adRoutes.js)

**Endpoint:** `POST /ads/click`

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/click" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/impression (adRoutes.js)

**Endpoint:** `POST /ads/impression`

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/impression" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /ads/active (adRoutes.js)

**Endpoint:** `GET /ads/active`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/ads/active" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /ads/eligible-content (adRoutes.js)

**Endpoint:** `GET /ads/eligible-content`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/ads/eligible-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/:id/publish (adRoutes.js)

**Endpoint:** `POST /ads/{id}/publish`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id/budget (adRoutes.js)

**Endpoint:** `PUT /ads/{id}/budget`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123/budget" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id/targeting (adRoutes.js)

**Endpoint:** `PUT /ads/{id}/targeting`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123/targeting" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /ads/:id/details (adRoutes.js)

**Endpoint:** `PUT /ads/{id}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/ads/123/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/:id/boost-content (adRoutes.js)

**Endpoint:** `POST /ads/{id}/boost-content`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/boost-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/:id/media (adRoutes.js)

**Endpoint:** `POST /ads/{id}/media`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/123/media" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /ads/draft (adRoutes.js)

**Endpoint:** `POST /ads/draft`

#### Request Body (Example)
```json
{
  "adType": "NEW_MEDIA",
  "caption": "Ad Body",
  "mediaItems": [
    {
      "mediaType": "IMAGE",
      "url": "http://..."
    }
  ]
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/ads/draft" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"adType":"NEW_MEDIA","caption":"Ad Body","mediaItems":[{"mediaType":"IMAGE","url":"http://..."}]}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Live

### POST /live/webhook/done (liveRoutes.js)

**Endpoint:** `POST /live/webhook/done`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/webhook/done" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /live/webhook/publish (liveRoutes.js)

**Endpoint:** `POST /live/webhook/publish`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/webhook/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /live/:id/chat (liveRoutes.js)

**Endpoint:** `POST /live/{id}/chat`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/123/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /live/:id/end (liveRoutes.js)

**Endpoint:** `POST /live/{id}/end`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/123/end" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get live session details

**Endpoint:** `GET /live/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/live/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /live/feed (liveRoutes.js)

**Endpoint:** `GET /live/feed`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/live/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /live/schedule (liveRoutes.js)

**Endpoint:** `POST /live/schedule`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/schedule" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /live/go-live (liveRoutes.js)

**Endpoint:** `POST /live/go-live`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/go-live" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Create a new live stream session

**Endpoint:** `POST /live/create`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get active live streams

**Endpoint:** `GET /live/feed/active`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/live/feed/active" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Add comment to a live stream

**Endpoint:** `POST /live/{id}/comment`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/live/123/comment" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Insights

### GET /insights/heatmap (insightRoutes.js)

**Endpoint:** `GET /insights/heatmap`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/insights/heatmap" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /insights/content (insightRoutes.js)

**Endpoint:** `GET /insights/content`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/insights/content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /insights/account (insightRoutes.js)

**Endpoint:** `GET /insights/account`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/insights/account" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Admin

### GET /admin/users/:userId/reels (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/{userId}/reels`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/users/:userId/posts (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/{userId}/posts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/users/:userId/following (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/users/:userId/followers (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/users/:userId/details (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/{userId}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/users/:userId (userManagementRoutes.js)

**Endpoint:** `DELETE /admin/users/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/users/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get full user details for admin

**Endpoint:** `GET /admin/users/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/users/:userId/unban (userManagementRoutes.js)

**Endpoint:** `PATCH /admin/users/{userId}/unban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/users/123/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Ban a user permanently

**Endpoint:** `PATCH /admin/users/{userId}/ban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/users/123/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/users/ (userManagementRoutes.js)

**Endpoint:** `GET /admin/users/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PUT /admin/settings/ (settingRoutes.js)

**Endpoint:** `PUT /admin/settings/`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/admin/settings/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/settings/ (settingRoutes.js)

**Endpoint:** `GET /admin/settings/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/settings/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PUT /admin/settings/profile (settingRoutes.js)

**Endpoint:** `PUT /admin/settings/profile`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/settings/profile (settingRoutes.js)

**Endpoint:** `GET /admin/settings/profile`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/reports/:id/ban-user (reportRoutes.js)

**Endpoint:** `POST /admin/reports/{id}/ban-user`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/reports/123/ban-user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/reports/:id/ignore (reportRoutes.js)

**Endpoint:** `POST /admin/reports/{id}/ignore`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/reports/123/ignore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/reports/:id (reportRoutes.js)

**Endpoint:** `GET /admin/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/reports/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/reports/ (reportRoutes.js)

**Endpoint:** `GET /admin/reports/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/reports/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/reports/stats (reportRoutes.js)

**Endpoint:** `GET /admin/reports/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/monitoring/logs/:serviceName/:type (monitoringRoutes.js)

**Endpoint:** `GET /admin/monitoring/logs/{serviceName}/{type}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | ✅ | - |
| `type` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/monitoring/logs/123/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/monitoring/statuses (monitoringRoutes.js)

**Endpoint:** `GET /admin/monitoring/statuses`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/monitoring/statuses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/reels (moderationRoutes.js)

**Endpoint:** `GET /admin/reels`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/posts (moderationRoutes.js)

**Endpoint:** `GET /admin/posts`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/comments/:commentId (commentModerationRoutes.js)

**Endpoint:** `DELETE /admin/comments/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/comments/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /admin/stories/:storyId (moderationRoutes.js)

**Endpoint:** `DELETE /admin/stories/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/stories/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /admin/reels/:reelId (moderationRoutes.js)

**Endpoint:** `DELETE /admin/reels/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/reels/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/posts/:postId/hide (moderationRoutes.js)

**Endpoint:** `PATCH /admin/posts/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/posts/123/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /admin/posts/:postId (moderationRoutes.js)

**Endpoint:** `DELETE /admin/posts/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/posts/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/default-avatars/ (mediaDefaultRoutes.js)

**Endpoint:** `POST /admin/default-avatars/`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/default-avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/default-avatars/ (mediaDefaultRoutes.js)

**Endpoint:** `GET /admin/default-avatars/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/default-avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /admin/languages/:id/set-default (languageRoutes.js)

**Endpoint:** `PATCH /admin/languages/{id}/set-default`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/languages/123/set-default" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/languages/:id/disable (languageRoutes.js)

**Endpoint:** `PATCH /admin/languages/{id}/disable`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/languages/123/disable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/languages/:id/enable (languageRoutes.js)

**Endpoint:** `PATCH /admin/languages/{id}/enable`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/languages/123/enable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/languages/ (languageRoutes.js)

**Endpoint:** `GET /admin/languages/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/languages/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /admin/feature (hashtagRoutes.js)

**Endpoint:** `POST /admin/feature`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/feature" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/:id/block (hashtagRoutes.js)

**Endpoint:** `PATCH /admin/{id}/block`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/123/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/trending (hashtagRoutes.js)

**Endpoint:** `GET /admin/trending`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/ (hashtagRoutes.js)

**Endpoint:** `GET /admin/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/hashtags/:id (hashtagAdminRoutes.js)

**Endpoint:** `DELETE /admin/hashtags/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/hashtags/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/hashtags/:id/toggle-visibility (hashtagAdminRoutes.js)

**Endpoint:** `PATCH /admin/hashtags/{id}/toggle-visibility`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/hashtags/123/toggle-visibility" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/hashtags/trending (hashtagAdminRoutes.js)

**Endpoint:** `GET /admin/hashtags/trending`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/hashtags/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/hashtags/ (hashtagAdminRoutes.js)

**Endpoint:** `GET /admin/hashtags/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/hashtags/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/analytics/geo-users (geoAnalyticsRoutes.js)

**Endpoint:** `GET /admin/analytics/geo-users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/geo-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/explore/performance-metrics (exploreAdminRoutes.js)

**Endpoint:** `GET /admin/explore/performance-metrics`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/explore/performance-metrics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/explore/category-distribution (exploreAdminRoutes.js)

**Endpoint:** `GET /admin/explore/category-distribution`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/explore/category-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /admin/explore/trending-topics/:topicId (exploreAdminRoutes.js)

**Endpoint:** `DELETE /admin/explore/trending-topics/{topicId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `topicId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/explore/trending-topics/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/explore/trending-topics (exploreAdminRoutes.js)

**Endpoint:** `POST /admin/explore/trending-topics`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/explore/trending-topics (exploreAdminRoutes.js)

**Endpoint:** `GET /admin/explore/trending-topics`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /admin/explore/algorithm (exploreAdminRoutes.js)

**Endpoint:** `PATCH /admin/explore/algorithm`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/explore/algorithm (exploreAdminRoutes.js)

**Endpoint:** `GET /admin/explore/algorithm`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/messages/:conversationId/flag (dmSafetyRoutes.js)

**Endpoint:** `PATCH /admin/messages/{conversationId}/flag`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/messages/123/flag" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Review reported direct messages

**Endpoint:** `GET /admin/messages/reported`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/messages/reported" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/dm-oversight/conversations/:conversationId/ban-users (dmOversightRoutes.js)

**Endpoint:** `POST /admin/dm-oversight/conversations/{conversationId}/ban-users`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/dm-oversight/conversations/123/ban-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/dm-oversight/conversations/:conversationId/mark-safe (dmOversightRoutes.js)

**Endpoint:** `PATCH /admin/dm-oversight/conversations/{conversationId}/mark-safe`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/dm-oversight/conversations/123/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/dm-oversight/conversations/:conversationId/transcript (dmOversightRoutes.js)

**Endpoint:** `GET /admin/dm-oversight/conversations/{conversationId}/transcript`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dm-oversight/conversations/123/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/dm-oversight/stats (dmOversightRoutes.js)

**Endpoint:** `GET /admin/dm-oversight/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dm-oversight/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/dm-oversight/conversations (dmOversightRoutes.js)

**Endpoint:** `GET /admin/dm-oversight/conversations`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dm-oversight/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/dashboard/recent-posts (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/recent-posts`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/recent-posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/dashboard/recent-users (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/recent-users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/recent-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/dashboard/login-methods (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/login-methods`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/dashboard/media-distribution (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/media-distribution`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/media-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/dashboard/user-growth (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/user-growth`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/user-growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/dashboard/activity-feed (dashboardRoutes.js)

**Endpoint:** `GET /admin/dashboard/activity-feed`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/activity-feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get platform performance indicators

**Endpoint:** `GET /admin/dashboard/kpis`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/dashboard/kpis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/moderation/stories/:storyId (contentManagementRoutes.js)

**Endpoint:** `DELETE /admin/moderation/stories/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/moderation/stories/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/moderation/stories/:storyId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /admin/moderation/stories/{storyId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/stories/123/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/moderation/stories (contentManagementRoutes.js)

**Endpoint:** `GET /admin/moderation/stories`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/moderation/reels/:reelId (contentManagementRoutes.js)

**Endpoint:** `DELETE /admin/moderation/reels/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/moderation/reels/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/moderation/reels/:reelId/unhide (contentManagementRoutes.js)

**Endpoint:** `PATCH /admin/moderation/reels/{reelId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/moderation/reels/123/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/moderation/reels/:reelId/hide (contentManagementRoutes.js)

**Endpoint:** `PATCH /admin/moderation/reels/{reelId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/moderation/reels/123/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/moderation/reels/:reelId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /admin/moderation/reels/{reelId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/reels/123/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/moderation/reels (contentManagementRoutes.js)

**Endpoint:** `GET /admin/moderation/reels`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Delete a post by admin

**Endpoint:** `DELETE /admin/moderation/posts/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/moderation/posts/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/moderation/posts/:postId/unhide (contentManagementRoutes.js)

**Endpoint:** `PATCH /admin/moderation/posts/{postId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/moderation/posts/123/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/moderation/posts/:postId/hide (contentManagementRoutes.js)

**Endpoint:** `PATCH /admin/moderation/posts/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/moderation/posts/123/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/moderation/posts/:postId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /admin/moderation/posts/{postId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/posts/123/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### List all posts for moderation

**Endpoint:** `GET /admin/moderation/posts`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/moderation/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /admin/comments/:commentId/remove (commentModerationRoutes.js)

**Endpoint:** `PATCH /admin/comments/{commentId}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/comments/123/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/comments/:commentId/approve (commentModerationRoutes.js)

**Endpoint:** `PATCH /admin/comments/{commentId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/comments/123/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/comments/stats (commentModerationRoutes.js)

**Endpoint:** `GET /admin/comments/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/comments/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/comments/ (commentModerationRoutes.js)

**Endpoint:** `GET /admin/comments/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### PATCH /admin/cms/pages/:id (cmsRoutes.js)

**Endpoint:** `PATCH /admin/cms/pages/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/cms/pages/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### List CMS pages

**Endpoint:** `GET /admin/cms/pages`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/cms/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/avatars/:avatarId (avatarManagementRoutes.js)

**Endpoint:** `DELETE /admin/avatars/{avatarId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/avatars/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/avatars/:avatarId/reject (avatarManagementRoutes.js)

**Endpoint:** `PATCH /admin/avatars/{avatarId}/reject`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/avatars/123/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/avatars/:avatarId/approve (avatarManagementRoutes.js)

**Endpoint:** `PATCH /admin/avatars/{avatarId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/avatars/123/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/avatars/stats (avatarManagementRoutes.js)

**Endpoint:** `GET /admin/avatars/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/avatars/ (avatarManagementRoutes.js)

**Endpoint:** `GET /admin/avatars/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/auth/roles/:id (authRoutes.js)

**Endpoint:** `DELETE /admin/auth/roles/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/auth/roles/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /admin/auth/roles/:id (authRoutes.js)

**Endpoint:** `PUT /admin/auth/roles/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/admin/auth/roles/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /admin/auth/roles (authRoutes.js)

**Endpoint:** `POST /admin/auth/roles`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Get all admin roles

**Endpoint:** `GET /admin/auth/roles`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /admin/auth/admins/:id (authRoutes.js)

**Endpoint:** `DELETE /admin/auth/admins/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/admin/auth/admins/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PATCH /admin/auth/admins/:id/role (authRoutes.js)

**Endpoint:** `PATCH /admin/auth/admins/{id}/role`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PATCH "http://192.168.1.4:5000/api/v1/admin/auth/admins/123/role" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/auth/admins (authRoutes.js)

**Endpoint:** `GET /admin/auth/admins`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/auth/admins" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/auth/me (authRoutes.js)

**Endpoint:** `GET /admin/auth/me`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Admin panel login

**Endpoint:** `POST /admin/auth/login`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/audit/ (auditRoutes.js)

**Endpoint:** `GET /admin/audit/`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/audit/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/active-hours (analyticsRoutes.js)

**Endpoint:** `GET /admin/active-hours`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/countries (analyticsRoutes.js)

**Endpoint:** `GET /admin/countries`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/analytics/active-hours (analyticsAdminRoutes.js)

**Endpoint:** `GET /admin/analytics/active-hours`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### Get regional user distribution

**Endpoint:** `GET /admin/analytics/countries`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/analytics/top-content (analyticsAdminRoutes.js)

**Endpoint:** `GET /admin/analytics/top-content`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/top-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/analytics/engagement-trends (analyticsAdminRoutes.js)

**Endpoint:** `GET /admin/analytics/engagement-trends`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/engagement-trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/analytics/user-acquisition (analyticsAdminRoutes.js)

**Endpoint:** `GET /admin/analytics/user-acquisition`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/user-acquisition" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/analytics/summary (analyticsAdminRoutes.js)

**Endpoint:** `GET /admin/analytics/summary`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/analytics/summary" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /admin/notifications/stats (adminNotificationRoutes.js)

**Endpoint:** `GET /admin/notifications/stats`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/notifications/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /admin/notifications/history (adminNotificationRoutes.js)

**Endpoint:** `GET /admin/notifications/history`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/notifications/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### Send a global system notification

**Endpoint:** `POST /admin/notifications/global`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/admin/notifications/global" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### List all users for management

**Endpoint:** `GET /admin/users`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### List all user reports

**Endpoint:** `GET /admin/reports`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### List and manage hashtags

**Endpoint:** `GET /admin/hashtags`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/hashtags" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### View administrative audit logs

**Endpoint:** `GET /admin/audit`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/admin/audit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

## Help

### POST /help/feedback (helpRoutes.js)

**Endpoint:** `POST /help/feedback`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/search (helpRoutes.js)

**Endpoint:** `GET /help/search`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/article/:slug (helpRoutes.js)

**Endpoint:** `GET /help/article/{slug}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `slug` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/article/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/articles (helpRoutes.js)

**Endpoint:** `GET /help/articles`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### GET /help/articles/featured (helpRoutes.js)

**Endpoint:** `GET /help/articles/featured`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/articles/featured" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/category/:slug (helpRoutes.js)

**Endpoint:** `GET /help/category/{slug}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `slug` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/category/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/categories (helpRoutes.js)

**Endpoint:** `GET /help/categories`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/categories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### DELETE /help/admin/article/:id (adminRoutes.js)

**Endpoint:** `DELETE /help/admin/article/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/help/admin/article/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /help/admin/article/:id (adminRoutes.js)

**Endpoint:** `PUT /help/admin/article/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/help/admin/article/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### GET /help/admin/articles (adminRoutes.js)

**Endpoint:** `GET /help/admin/articles`

#### Sample Request (CURL)
```bash
curl -X GET "http://192.168.1.4:5000/api/v1/help/admin/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": [
    {
      "id": 1
    },
    {
      "id": 2
    }
  ]
}
```

---

### POST /help/admin/article (adminRoutes.js)

**Endpoint:** `POST /help/admin/article`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/help/admin/article" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### DELETE /help/admin/category/:id (adminRoutes.js)

**Endpoint:** `DELETE /help/admin/category/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Sample Request (CURL)
```bash
curl -X DELETE "http://192.168.1.4:5000/api/v1/help/admin/category/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### PUT /help/admin/category/:id (adminRoutes.js)

**Endpoint:** `PUT /help/admin/category/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X PUT "http://192.168.1.4:5000/api/v1/help/admin/category/123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

### POST /help/admin/category (adminRoutes.js)

**Endpoint:** `POST /help/admin/category`

#### Request Body (Example)
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Sample Request (CURL)
```bash
curl -X POST "http://192.168.1.4:5000/api/v1/help/admin/category" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"field1":"value1","field2":"value2"}'
```

#### Sample Response
```json
{
  "status": "success",
  "data": {}
}
```

---

