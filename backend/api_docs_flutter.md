# Instagram Clone API Documentation (Flutter)

**Base URL:** `http://192.168.1.100:5000/api/v1`

**Authentication:** All endpoints (except Auth/Public) typically require a Bearer Token via `Authorization` header.

## Auth

### GET /api/v1/auth/history (authRoutes.js)

**Endpoint:** `GET /api/v1/auth/history`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/auth/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/auth/me (authRoutes.js)

**Endpoint:** `GET /api/v1/auth/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/logout (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/logout`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/reset-password/verify (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/reset-password/verify`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/reset-password/verify" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/reset-password/request (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/reset-password/request`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/reset-password/request" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/auth/check-email (authRoutes.js)

**Endpoint:** `GET /api/v1/auth/check-email`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/auth/check-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/auth/check-username (authRoutes.js)

**Endpoint:** `GET /api/v1/auth/check-username`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/auth/check-username" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/login (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/login`

<h4> Request Body (Example)</h4>
```json
{
  "email": "user@example.com",
  "password": "password123",
  "deviceId": "device-xyz"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "email": "user@example.com",
  "password": "password123",
  "deviceId": "device-xyz"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/signup (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/signup`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/auth/register (authRoutes.js)

**Endpoint:** `POST /api/v1/auth/register`

<h4> Request Body (Example)</h4>
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Register a new user

**Endpoint:** `POST /auth/register`

<h4> Request Body (Example)</h4>
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/register" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "email": "user@example.com",
  "password": "password123",
  "username": "newuser",
  "fullName": "New User"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Register a new user (Alias)

**Endpoint:** `POST /auth/signup`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/signup" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Log in a user

**Endpoint:** `POST /auth/login`

<h4> Request Body (Example)</h4>
```json
{
  "email": "user@example.com",
  "password": "password123",
  "deviceId": "device-xyz"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "email": "user@example.com",
  "password": "password123",
  "deviceId": "device-xyz"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Check if username is available

**Endpoint:** `GET /auth/check-username`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | query | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/auth/check-username" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Check if email is available

**Endpoint:** `GET /auth/check-email`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `email` | query | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/auth/check-email" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Request password reset token

**Endpoint:** `POST /auth/reset-password/request`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/reset-password/request" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Verify token and reset password

**Endpoint:** `POST /auth/reset-password/verify`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/reset-password/verify" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Log out the current user

**Endpoint:** `POST /auth/logout`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/auth/logout" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get current user details

**Endpoint:** `GET /auth/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user account history

**Endpoint:** `GET /auth/history`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/auth/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Users

### DELETE /api/v1/users/profile/followers/:followerId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/followers/{followerId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `followerId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/followers/{followerId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/:userId/following (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/{userId}/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/:userId/followers (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/{userId}/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/:userId/reels (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/{userId}/reels`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/{userId}/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/:userId/posts (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/{userId}/posts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/{userId}/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/:username (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/{username}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/{username}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/onboarding/event (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/onboarding/event`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/onboarding/event" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/onboarding/suggestions (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/onboarding/suggestions`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/onboarding/suggestions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/onboarding/interests (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/onboarding/interests`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/onboarding/interests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/onboarding/interests (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/onboarding/interests`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/onboarding/interests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/users/profile/onboarding/profile (profileRoutes.js)

**Endpoint:** `PUT /api/v1/users/profile/onboarding/profile`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/users/profile/onboarding/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/activity/account-history (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/activity/account-history`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/activity/account-history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/batch (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/batch`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/batch" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/suggestions (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/suggestions`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/suggestions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/me/saved (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/me/saved`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/me/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/profile-photo (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/profile-photo`

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/profile-photo (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/profile-photo`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/profile-photo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/users/profile/me (profileRoutes.js)

**Endpoint:** `PUT /api/v1/users/profile/me`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/me (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/help/feedback (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/help/feedback`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/help/support-requests (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/help/support-requests`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/help/support-requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/help/feature-limits (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/help/feature-limits`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/help/feature-limits" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/help/violations (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/help/violations`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/help/violations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/help/account-status (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/help/account-status`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/help/account-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/apps/:id/revoke (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/apps/{id}/revoke`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/apps/{id}/revoke" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/apps (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/apps`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/apps" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/general (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/general`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/general (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/general`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/general" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/subscriptions (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/subscriptions`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/subscriptions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/like-share (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/like-share`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/like-share (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/like-share`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/like-share" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/content-preferences (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/content-preferences`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/content-preferences (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/content-preferences`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/content-preferences" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/settings/muted/:userId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/settings/muted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/settings/muted/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/settings/muted/:userId (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/settings/muted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/settings/muted/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/muted (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/muted`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/muted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/settings/hidden-words/words/:id (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/settings/hidden-words/words/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/settings/hidden-words/words/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/settings/hidden-words/words (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/settings/hidden-words/words`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/settings/hidden-words/words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/users/profile/settings/hidden-words (profileRoutes.js)

**Endpoint:** `PUT /api/v1/users/profile/settings/hidden-words`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/hidden-words (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/hidden-words`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/hidden-words" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/settings/restricted/:userId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/settings/restricted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/settings/restricted/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/settings/restricted/:userId (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/settings/restricted/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/settings/restricted/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/restricted (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/restricted`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/restricted" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/users/profile/settings/sharing (profileRoutes.js)

**Endpoint:** `PUT /api/v1/users/profile/settings/sharing`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/sharing (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/sharing`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/sharing" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/users/profile/settings/comments (profileRoutes.js)

**Endpoint:** `PUT /api/v1/users/profile/settings/comments`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/comments (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/comments`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/tags/:id/remove (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/tags/{id}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/tags/{id}/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/tags/:id/approve (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/tags/{id}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/tags/{id}/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/tags/pending (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/tags/pending`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/tags/pending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/tags-mentions (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/tags-mentions`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/tags-mentions (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/tags-mentions`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/tags-mentions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/activity-status (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/activity-status`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/activity-status (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/activity-status`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/activity-status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/story-replies (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/story-replies`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/story-replies (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/story-replies`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/profile/settings/messages (profileRoutes.js)

**Endpoint:** `PATCH /api/v1/users/profile/settings/messages`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/settings/messages (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/settings/messages`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/settings/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/story-privacy/unhide/:hiddenUserId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/story-privacy/unhide/{hiddenUserId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `hiddenUserId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/story-privacy/unhide/{hiddenUserId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/story-privacy/hide (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/story-privacy/hide`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/story-privacy/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/story-privacy/hidden-users (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/story-privacy/hidden-users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/story-privacy/hidden-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/unblock/:userId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/unblock/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/unblock/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/block/:userId (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/block/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/block/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/blocked-users (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/blocked-users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/blocked-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/profile/close-friends/:friendId (profileRoutes.js)

**Endpoint:** `DELETE /api/v1/users/profile/close-friends/{friendId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `friendId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/profile/close-friends/{friendId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/close-friends/:friendId (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/close-friends/{friendId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `friendId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/close-friends/{friendId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/close-friends (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/close-friends`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/close-friends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/profile/reports/me (profileRoutes.js)

**Endpoint:** `GET /api/v1/users/profile/reports/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/profile/reports/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/profile/report-problem (profileRoutes.js)

**Endpoint:** `POST /api/v1/users/profile/report-problem`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/profile/report-problem" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/:userId/follow-counts (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/{userId}/follow-counts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/{userId}/follow-counts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/:userId (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/internal/:userId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/users/internal/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/internal/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/internal/bulk (internalRoutes.js)

**Endpoint:** `POST /api/v1/users/internal/bulk`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/internal/bulk" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/recent (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/recent`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/internal/:userId/unban (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/users/internal/{userId}/unban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/internal/{userId}/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/internal/:userId/ban (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/users/internal/{userId}/ban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/internal/{userId}/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/list (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/list`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/countries (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/countries`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/login-methods (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/login-methods`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/growth (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/growth`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/internal/avatars/:avatarId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/users/internal/avatars/{avatarId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/internal/avatars/{avatarId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/internal/avatars/:avatarId/reject (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/users/internal/avatars/{avatarId}/reject`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/internal/avatars/{avatarId}/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/internal/avatars/:avatarId/approve (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/users/internal/avatars/{avatarId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/internal/avatars/{avatarId}/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/avatars/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/avatars/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/avatars (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/avatars`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/avatars" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/users/internal/reports/:id/status (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/users/internal/reports/{id}/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/users/internal/reports/{id}/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/reports/:id (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/reports/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/reports (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/reports`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/internal/reports/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/users/internal/reports/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/requests/reject (followRoutes.js)

**Endpoint:** `POST /api/v1/users/requests/reject`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/requests/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/requests/accept (followRoutes.js)

**Endpoint:** `POST /api/v1/users/requests/accept`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/requests/accept" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/requests (followRoutes.js)

**Endpoint:** `GET /api/v1/users/requests`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/requests" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/followers/:userId (followRoutes.js)

**Endpoint:** `DELETE /api/v1/users/followers/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/followers/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/follow/:userId (followRoutes.js)

**Endpoint:** `DELETE /api/v1/users/follow/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/follow/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/follow/:userId (followRoutes.js)

**Endpoint:** `POST /api/v1/users/follow/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/follow/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/:userId/following (followRoutes.js)

**Endpoint:** `GET /api/v1/users/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/{userId}/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/:userId/followers (followRoutes.js)

**Endpoint:** `GET /api/v1/users/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/{userId}/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/users/:userId/follow/status (followRoutes.js)

**Endpoint:** `GET /api/v1/users/{userId}/follow/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/users/{userId}/follow/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/users/:userId/follow (followRoutes.js)

**Endpoint:** `DELETE /api/v1/users/{userId}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/users/{userId}/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/users/:userId/follow (followRoutes.js)

**Endpoint:** `POST /api/v1/users/{userId}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/users/{userId}/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get current logged-in user profile

**Endpoint:** `GET /users/profile/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/users/profile/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user profile by username

**Endpoint:** `GET /users/{username}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `username` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/users/{username}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Follow a user

**Endpoint:** `POST /users/{id}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/users/{id}/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Unfollow a user

**Endpoint:** `DELETE /users/{id}/follow`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/users/{id}/follow" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Posts

### PATCH /api/v1/posts/internal/reports/:id/status (reportInternalRoutes.js)

**Endpoint:** `PATCH /api/v1/posts/internal/reports/{id}/status`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/posts/internal/reports/{id}/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/reports/:id (reportInternalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/reports/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/reports (reportInternalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/reports`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/reports/stats (reportInternalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/reports/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/posts/:id/bookmark (postRoutes.js)

**Endpoint:** `DELETE /api/v1/posts/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/posts/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/:id/bookmark (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/:id/report (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/{id}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/{id}/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/posts/:id/toggle-comments (postRoutes.js)

**Endpoint:** `PUT /api/v1/posts/{id}/toggle-comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/posts/{id}/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/posts/:id/hide-likes (postRoutes.js)

**Endpoint:** `PUT /api/v1/posts/{id}/hide-likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/posts/{id}/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/posts/:id (postRoutes.js)

**Endpoint:** `PUT /api/v1/posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/posts/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/posts/:id (postRoutes.js)

**Endpoint:** `DELETE /api/v1/posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/posts/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/:id (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/:id/embed (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/{id}/embed`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/{id}/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/activity/posts (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/activity/posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/activity/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/activity/likes (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/activity/likes`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/check-likes (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/check-likes`

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/check-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/saved (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/saved`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/posts/:id/like (postRoutes.js)

**Endpoint:** `DELETE /api/v1/posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/posts/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/:id/like (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/ (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/ (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/`

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/hashtag/:hashtag (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/hashtag/{hashtag}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `hashtag` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/hashtag/{hashtag}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/explore (postRoutes.js)

**Endpoint:** `GET /api/v1/posts/explore`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/explore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/posts/feed (postRoutes.js)

**Endpoint:** `POST /api/v1/posts/feed`

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/posts/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/:postId/bookmarks (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/{postId}/bookmarks`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/{postId}/bookmarks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/:postId/likes (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/{postId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/{postId}/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/:postId (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/posts/internal/:postId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/posts/internal/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/posts/internal/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/posts/internal/:postId/unhide (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/posts/internal/{postId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/posts/internal/{postId}/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/posts/internal/:postId/hide (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/posts/internal/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/posts/internal/{postId}/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/user/:userId (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/user/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/stats/user/:userId (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/stats/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/stats/user/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/list (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/list`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/recent (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/recent`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/top (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/top`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/top" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/engagement/trends (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/engagement/trends`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/engagement/trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/stats/engagement (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/stats/engagement`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/stats/engagement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/stats/overall (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/stats/overall`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/posts/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/posts/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/posts/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get all posts

**Endpoint:** `GET /posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Create a new post

**Endpoint:** `POST /posts`

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get a single post by ID

**Endpoint:** `GET /posts/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/posts/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Like a post

**Endpoint:** `POST /posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/posts/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Unlike a post

**Endpoint:** `DELETE /posts/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/posts/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Bookmark a post

**Endpoint:** `POST /posts/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/posts/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "caption": "My new post",
  "mediaUrls": [
    "http://..."
  ],
  "location": "New York"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Stories

### DELETE /api/v1/stories/:id/react (storyRoutes.js)

**Endpoint:** `DELETE /api/v1/stories/{id}/react`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/stories/{id}/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/stories/:id/react (storyRoutes.js)

**Endpoint:** `POST /api/v1/stories/{id}/react`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/stories/{id}/react" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/stories/:id/view (storyRoutes.js)

**Endpoint:** `POST /api/v1/stories/{id}/view`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/stories/{id}/view" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/stories/:id/report (storyRoutes.js)

**Endpoint:** `POST /api/v1/stories/{id}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/stories/{id}/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/stories/:id (storyRoutes.js)

**Endpoint:** `DELETE /api/v1/stories/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/stories/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/activity/story-replies (storyRoutes.js)

**Endpoint:** `GET /api/v1/stories/activity/story-replies`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/user/:targetUserId (storyRoutes.js)

**Endpoint:** `GET /api/v1/stories/user/{targetUserId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `targetUserId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/user/{targetUserId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/archive (storyRoutes.js)

**Endpoint:** `GET /api/v1/stories/archive`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/archive" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/ (storyRoutes.js)

**Endpoint:** `GET /api/v1/stories/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/stories/ (storyRoutes.js)

**Endpoint:** `POST /api/v1/stories/`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/stories/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/stories/internal/:storyId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/stories/internal/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/stories/internal/{storyId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/internal/:storyId/likes (internalRoutes.js)

**Endpoint:** `GET /api/v1/stories/internal/{storyId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/internal/{storyId}/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/internal/:storyId/views (internalRoutes.js)

**Endpoint:** `GET /api/v1/stories/internal/{storyId}/views`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/internal/{storyId}/views" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/internal/list (internalRoutes.js)

**Endpoint:** `GET /api/v1/stories/internal/list`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/stories/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/stories/highlights/:highlightId (highlightRoutes.js)

**Endpoint:** `DELETE /api/v1/stories/highlights/{highlightId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/stories/highlights/{highlightId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/stories/highlights/:highlightId (highlightRoutes.js)

**Endpoint:** `PUT /api/v1/stories/highlights/{highlightId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/stories/highlights/{highlightId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/highlights/:highlightId/stories (highlightRoutes.js)

**Endpoint:** `GET /api/v1/stories/highlights/{highlightId}/stories`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `highlightId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/highlights/{highlightId}/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/highlights/:userId (highlightRoutes.js)

**Endpoint:** `GET /api/v1/stories/highlights/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/highlights/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/stories/highlights (highlightRoutes.js)

**Endpoint:** `POST /api/v1/stories/highlights`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/stories/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/activity/highlights (highlightRoutes.js)

**Endpoint:** `GET /api/v1/stories/activity/highlights`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/activity/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/stories/stories/me (highlightRoutes.js)

**Endpoint:** `GET /api/v1/stories/stories/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/stories/stories/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get active stories provided by people you follow

**Endpoint:** `GET /stories`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Create a new story

**Endpoint:** `POST /stories`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Mark a story as viewed

**Endpoint:** `POST /stories/{id}/view`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/stories/{id}/view" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user's archived stories

**Endpoint:** `GET /stories/archive`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/stories/archive" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get story replies activity

**Endpoint:** `GET /stories/activity/story-replies`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/stories/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Create a story highlight

**Endpoint:** `POST /stories/highlights`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/stories/highlights" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user's highlights

**Endpoint:** `GET /stories/highlights/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/stories/highlights/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Reels

### GET /api/v1/reels/:id (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/user (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/user`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/reels/:id/report (reelRoutes.js)

**Endpoint:** `POST /api/v1/reels/{id}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/reels/{id}/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/reels/:id/bookmark (reelRoutes.js)

**Endpoint:** `DELETE /api/v1/reels/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/reels/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/reels/:id/bookmark (reelRoutes.js)

**Endpoint:** `POST /api/v1/reels/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/reels/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/reels/:id/like (reelRoutes.js)

**Endpoint:** `DELETE /api/v1/reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/reels/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/reels/:id/like (reelRoutes.js)

**Endpoint:** `POST /api/v1/reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/reels/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/activity/likes (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/activity/likes`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/activity/reels (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/activity/reels`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/activity/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/saved (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/saved`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/saved" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/ (reelRoutes.js)

**Endpoint:** `GET /api/v1/reels/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/reels/ (reelRoutes.js)

**Endpoint:** `POST /api/v1/reels/`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/reels/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/:reelId/likes (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/{reelId}/likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/{reelId}/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/:reelId (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/{reelId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/reels/internal/:reelId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/reels/internal/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/reels/internal/{reelId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/recent (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/recent`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/recent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/reels/internal/:reelId/unhide (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/reels/internal/{reelId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/reels/internal/{reelId}/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/reels/internal/:reelId/hide (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/reels/internal/{reelId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/reels/internal/{reelId}/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/list (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/list`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/user/:userId (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/user/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/stats/user/:userId (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/stats/user/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/stats/user/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/stats/overall (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/stats/overall`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/stats/overall" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/reels/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/reels/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/reels/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get reels feed

**Endpoint:** `GET /reels`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Like a reel

**Endpoint:** `POST /reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/reels/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Unlike a reel

**Endpoint:** `DELETE /reels/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/reels/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user reel activity

**Endpoint:** `GET /reels/activity/reels`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/reels/activity/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user liked reels

**Endpoint:** `GET /reels/activity/likes`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/reels/activity/likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Feed

### GET /api/v1/feed/ (feedRoutes.js)

**Endpoint:** `GET /api/v1/feed/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/feed/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get personalized post feed

**Endpoint:** `GET /feed`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Comments

### GET /api/v1/comments/internal/post/:postId (internalRoutes.js)

**Endpoint:** `GET /api/v1/comments/internal/post/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/internal/post/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/comments/internal/:commentId (internalRoutes.js)

**Endpoint:** `DELETE /api/v1/comments/internal/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/comments/internal/{commentId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/internal/:commentId (internalRoutes.js)

**Endpoint:** `GET /api/v1/comments/internal/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/internal/{commentId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/comments/internal/:commentId/remove (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/comments/internal/{commentId}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/comments/internal/{commentId}/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/comments/internal/:commentId/approve (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/comments/internal/{commentId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/comments/internal/{commentId}/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/comments/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/internal/list (internalRoutes.js)

**Endpoint:** `GET /api/v1/comments/internal/list`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/internal/list" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/activity/reviews (commentRoutes.js)

**Endpoint:** `GET /api/v1/comments/activity/reviews`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/activity/reviews" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/activity/comments (commentRoutes.js)

**Endpoint:** `GET /api/v1/comments/activity/comments`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/activity/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/comments/check-comments (commentRoutes.js)

**Endpoint:** `POST /api/v1/comments/check-comments`

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/comments/check-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/comments/:id/like (commentRoutes.js)

**Endpoint:** `DELETE /api/v1/comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/comments/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/comments/:id/like (commentRoutes.js)

**Endpoint:** `POST /api/v1/comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/comments/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/comments/:id (commentRoutes.js)

**Endpoint:** `DELETE /api/v1/comments/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/comments/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/comments/ (commentRoutes.js)

**Endpoint:** `GET /api/v1/comments/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/comments/ (commentRoutes.js)

**Endpoint:** `POST /api/v1/comments/`

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get comments for a post

**Endpoint:** `GET /comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | query | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Add a comment to a post

**Endpoint:** `POST /comments`

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Delete a comment

**Endpoint:** `DELETE /comments/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/comments/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Like a comment

**Endpoint:** `POST /comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/comments/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Unlike a comment

**Endpoint:** `DELETE /comments/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/comments/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Batch check like status for comments

**Endpoint:** `POST /comments/check-comments`

<h4> Request Body (Example)</h4>
```json
{
  "content": "Great post!"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/comments/check-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "content": "Great post!"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Messages

### POST /api/v1/messages/seen (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/seen`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/seen" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/messages/send (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/send`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/send" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/messages/conversations/:conversationId (messageRoutes.js)

**Endpoint:** `DELETE /api/v1/messages/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/conversations/:conversationId (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/messages/conversations/:conversationId/report (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/conversations/{conversationId}/report`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/messages/conversations/:conversationId/unblock (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/conversations/{conversationId}/unblock`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/unblock" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/messages/conversations/:conversationId/block (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/conversations/{conversationId}/block`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/messages/conversations/:conversationId/mute (messageRoutes.js)

**Endpoint:** `PATCH /api/v1/messages/conversations/{conversationId}/mute`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/mute" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/conversations/:conversationId/details (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/conversations/{conversationId}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/messages/conversations/:conversationId/messages (messageRoutes.js)

**Endpoint:** `POST /api/v1/messages/conversations/{conversationId}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/conversations/:conversationId/messages (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/conversations/{conversationId}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/conversations/{conversationId}/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/conversations (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/conversations`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/unread-count (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/unread-count`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/unread-count" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/activity/story-replies (messageRoutes.js)

**Endpoint:** `GET /api/v1/messages/activity/story-replies`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/activity/story-replies" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/internal/conversations/:conversationId (internalRoutes.js)

**Endpoint:** `GET /api/v1/messages/internal/conversations/{conversationId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/internal/conversations/{conversationId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/messages/internal/conversations/:conversationId/mark-safe (internalRoutes.js)

**Endpoint:** `PATCH /api/v1/messages/internal/conversations/{conversationId}/mark-safe`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/messages/internal/conversations/{conversationId}/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/internal/conversations/:conversationId/transcript (internalRoutes.js)

**Endpoint:** `GET /api/v1/messages/internal/conversations/{conversationId}/transcript`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/internal/conversations/{conversationId}/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/internal/stats (internalRoutes.js)

**Endpoint:** `GET /api/v1/messages/internal/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/internal/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/messages/internal/conversations (internalRoutes.js)

**Endpoint:** `GET /api/v1/messages/internal/conversations`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/messages/internal/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user conversations

**Endpoint:** `GET /messages/conversations`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/messages/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get messages in a conversation

**Endpoint:** `GET /messages/conversations/{id}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | Conversation ID or User ID (depending on implementation) |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/messages/conversations/{id}/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Send a message

**Endpoint:** `POST /messages/conversations/{id}/messages`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | Recipient ID |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/messages/conversations/{id}/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Notifications

### PATCH /api/v1/notifications/read-all (notificationRoutes.js)

**Endpoint:** `PATCH /api/v1/notifications/read-all`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/notifications/read-all" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/notifications/:id/read (notificationRoutes.js)

**Endpoint:** `PATCH /api/v1/notifications/{id}/read`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/notifications/{id}/read" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/notifications/unread-count (notificationRoutes.js)

**Endpoint:** `GET /api/v1/notifications/unread-count`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/notifications/unread-count" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/notifications/ (notificationRoutes.js)

**Endpoint:** `GET /api/v1/notifications/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/notifications/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/notifications/settings (notificationRoutes.js)

**Endpoint:** `PATCH /api/v1/notifications/settings`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/notifications/settings (notificationRoutes.js)

**Endpoint:** `GET /api/v1/notifications/settings`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get user notifications

**Endpoint:** `GET /notifications`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get notification preferences

**Endpoint:** `GET /notifications/settings`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Update notification preferences

**Endpoint:** `PATCH /notifications/settings`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/notifications/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get count of unread notifications

**Endpoint:** `GET /notifications/unread-count`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/notifications/unread-count" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Mark a notification as read

**Endpoint:** `PATCH /notifications/{id}/read`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | integer | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/notifications/{id}/read" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Search

### GET /api/v1/search/hashtags (searchRoutes.js)

**Endpoint:** `GET /api/v1/search/hashtags`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/search/hashtags" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/search/users (searchRoutes.js)

**Endpoint:** `GET /api/v1/search/users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/search/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/search/ (searchRoutes.js)

**Endpoint:** `GET /api/v1/search/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/search/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Search users or posts

**Endpoint:** `GET /search`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `q` | query | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Media

### GET /api/v1/media/files/* (mediaRoutes.js)

**Endpoint:** `GET /api/v1/media/files/*`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/media/files/*" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/media/finalize (mediaRoutes.js)

**Endpoint:** `POST /api/v1/media/finalize`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/media/finalize" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/media/presigned-url (mediaRoutes.js)

**Endpoint:** `POST /api/v1/media/presigned-url`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/media/presigned-url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/media/status/:id (mediaRoutes.js)

**Endpoint:** `GET /api/v1/media/status/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/media/status/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/media/upload (mediaRoutes.js)

**Endpoint:** `POST /api/v1/media/upload`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/media/upload" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Ads

### POST /api/v1/ads/ (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/ads/:id/comments/:commentId (adRoutes.js)

**Endpoint:** `DELETE /api/v1/ads/{id}/comments/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `commentId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/ads/{id}/comments/{commentId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/comments (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/ads/:id/comments (adRoutes.js)

**Endpoint:** `GET /api/v1/ads/{id}/comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/ads/{id}/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/bookmark (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/bookmark`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/bookmark" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/like (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/like`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/like" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/ads/:id/embed (adRoutes.js)

**Endpoint:** `GET /api/v1/ads/{id}/embed`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/ads/{id}/embed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id/toggle-comments (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}/toggle-comments`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}/toggle-comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id/hide-likes (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}/hide-likes`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}/hide-likes" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/ads/:id (adRoutes.js)

**Endpoint:** `DELETE /api/v1/ads/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/ads/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/click (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/click`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/click" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/impression (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/impression`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/impression" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/ads/active (adRoutes.js)

**Endpoint:** `GET /api/v1/ads/active`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/ads/active" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/ads/eligible-content (adRoutes.js)

**Endpoint:** `GET /api/v1/ads/eligible-content`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/ads/eligible-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/publish (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/publish`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id/budget (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}/budget`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}/budget" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id/targeting (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}/targeting`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}/targeting" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/ads/:id/details (adRoutes.js)

**Endpoint:** `PUT /api/v1/ads/{id}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/ads/{id}/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/boost-content (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/boost-content`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/boost-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/:id/media (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/{id}/media`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/{id}/media" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/ads/draft (adRoutes.js)

**Endpoint:** `POST /api/v1/ads/draft`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/ads/draft" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Live

### POST /api/v1/live/:id/block/:userId (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/{id}/block/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/{id}/block/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/:id/mute/:userId (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/{id}/mute/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/{id}/mute/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/live/:id/moderator/:userId (liveRoutes.js)

**Endpoint:** `DELETE /api/v1/live/{id}/moderator/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/live/{id}/moderator/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/:id/moderator (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/{id}/moderator`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/{id}/moderator" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/live/:id/keyword/:keywordId (liveRoutes.js)

**Endpoint:** `DELETE /api/v1/live/{id}/keyword/{keywordId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |
| `keywordId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/live/{id}/keyword/{keywordId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/:id/keyword (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/{id}/keyword`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/{id}/keyword" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/live/:id/settings (liveRoutes.js)

**Endpoint:** `PATCH /api/v1/live/{id}/settings`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/live/{id}/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/live/:id/settings (liveRoutes.js)

**Endpoint:** `GET /api/v1/live/{id}/settings`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/live/{id}/settings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/:id/chat (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/{id}/chat`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/{id}/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/live/:id (liveRoutes.js)

**Endpoint:** `GET /api/v1/live/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/live/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/live/feed (liveRoutes.js)

**Endpoint:** `GET /api/v1/live/feed`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/live/feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/end/:id (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/end/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/end/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/join/:id (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/join/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/join/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/start/:id (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/start/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/start/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/live/create (liveRoutes.js)

**Endpoint:** `POST /api/v1/live/create`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/live/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Create a new live stream session

**Endpoint:** `POST /live/create`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/live/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get active live streams

**Endpoint:** `GET /live/feed/active`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/live/feed/active" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get live session details

**Endpoint:** `GET /live/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/live/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Add comment to a live stream

**Endpoint:** `POST /live/{id}/comment`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/live/{id}/comment" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Insights

### GET /api/v1/insights/heatmap (insightRoutes.js)

**Endpoint:** `GET /api/v1/insights/heatmap`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/insights/heatmap" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/insights/content (insightRoutes.js)

**Endpoint:** `GET /api/v1/insights/content`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/insights/content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/insights/account (insightRoutes.js)

**Endpoint:** `GET /api/v1/insights/account`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/insights/account" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Admin

### GET /api/v1/admin/users/:userId/reels (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/{userId}/reels`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/{userId}/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/users/:userId/posts (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/{userId}/posts`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/{userId}/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/users/:userId/following (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/{userId}/following`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/{userId}/following" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/users/:userId/followers (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/{userId}/followers`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/{userId}/followers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/users/:userId/details (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/{userId}/details`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/{userId}/details" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/users/:userId (userManagementRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/users/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/users/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/users/:userId/unban (userManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/users/{userId}/unban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/users/{userId}/unban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/users/:userId/ban (userManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/users/{userId}/ban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/users/{userId}/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/users/ (userManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/users/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/users/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/admin/settings/ (settingRoutes.js)

**Endpoint:** `PUT /api/v1/admin/settings/`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/admin/settings/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/settings/ (settingRoutes.js)

**Endpoint:** `GET /api/v1/admin/settings/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/settings/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/admin/settings/profile (settingRoutes.js)

**Endpoint:** `PUT /api/v1/admin/settings/profile`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/settings/profile (settingRoutes.js)

**Endpoint:** `GET /api/v1/admin/settings/profile`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/settings/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/reports/:id/ban-user (reportRoutes.js)

**Endpoint:** `POST /api/v1/admin/reports/{id}/ban-user`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/reports/{id}/ban-user" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/reports/:id/ignore (reportRoutes.js)

**Endpoint:** `POST /api/v1/admin/reports/{id}/ignore`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/reports/{id}/ignore" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/reports/:id (reportRoutes.js)

**Endpoint:** `GET /api/v1/admin/reports/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/reports/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/reports/ (reportRoutes.js)

**Endpoint:** `GET /api/v1/admin/reports/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/reports/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/reports/stats (reportRoutes.js)

**Endpoint:** `GET /api/v1/admin/reports/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/reports/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/monitoring/logs/:serviceName/:type (monitoringRoutes.js)

**Endpoint:** `GET /api/v1/admin/monitoring/logs/{serviceName}/{type}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | ✅ | - |
| `type` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/monitoring/logs/{serviceName}/{type}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/monitoring/statuses (monitoringRoutes.js)

**Endpoint:** `GET /api/v1/admin/monitoring/statuses`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/monitoring/statuses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/reels (moderationRoutes.js)

**Endpoint:** `GET /api/v1/admin/reels`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/posts (moderationRoutes.js)

**Endpoint:** `GET /api/v1/admin/posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/comments/:commentId (commentModerationRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/comments/{commentId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/comments/{commentId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/stories/:storyId (moderationRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/stories/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/stories/{storyId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/reels/:reelId (moderationRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/reels/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/reels/{reelId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/posts/:postId/hide (moderationRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/posts/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/posts/{postId}/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/posts/:postId (moderationRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/posts/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/posts/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/default-avatars/ (mediaDefaultRoutes.js)

**Endpoint:** `POST /api/v1/admin/default-avatars/`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/default-avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/default-avatars/ (mediaDefaultRoutes.js)

**Endpoint:** `GET /api/v1/admin/default-avatars/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/default-avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/languages/:id/set-default (languageRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/languages/{id}/set-default`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/languages/{id}/set-default" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/languages/:id/disable (languageRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/languages/{id}/disable`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/languages/{id}/disable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/languages/:id/enable (languageRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/languages/{id}/enable`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/languages/{id}/enable" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/languages/ (languageRoutes.js)

**Endpoint:** `GET /api/v1/admin/languages/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/languages/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/feature (hashtagRoutes.js)

**Endpoint:** `POST /api/v1/admin/feature`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/feature" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/:id/block (hashtagRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/{id}/block`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/{id}/block" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/trending (hashtagRoutes.js)

**Endpoint:** `GET /api/v1/admin/trending`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/ (hashtagRoutes.js)

**Endpoint:** `GET /api/v1/admin/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/hashtags/:id (hashtagAdminRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/hashtags/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/hashtags/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/hashtags/:id/toggle-visibility (hashtagAdminRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/hashtags/{id}/toggle-visibility`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/hashtags/{id}/toggle-visibility" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/hashtags/trending (hashtagAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/hashtags/trending`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/hashtags/trending" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/hashtags/ (hashtagAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/hashtags/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/hashtags/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/geo-users (geoAnalyticsRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/geo-users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/geo-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/explore/performance-metrics (exploreAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/explore/performance-metrics`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/explore/performance-metrics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/explore/category-distribution (exploreAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/explore/category-distribution`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/explore/category-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/explore/trending-topics/:topicId (exploreAdminRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/explore/trending-topics/{topicId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `topicId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/explore/trending-topics/{topicId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/explore/trending-topics (exploreAdminRoutes.js)

**Endpoint:** `POST /api/v1/admin/explore/trending-topics`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/explore/trending-topics (exploreAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/explore/trending-topics`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/explore/trending-topics" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/explore/algorithm (exploreAdminRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/explore/algorithm`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/explore/algorithm (exploreAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/explore/algorithm`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/explore/algorithm" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/messages/:conversationId/flag (dmSafetyRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/messages/{conversationId}/flag`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/messages/{conversationId}/flag" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/messages/reported (dmSafetyRoutes.js)

**Endpoint:** `GET /api/v1/admin/messages/reported`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/messages/reported" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/dm-oversight/conversations/:conversationId/ban-users (dmOversightRoutes.js)

**Endpoint:** `POST /api/v1/admin/dm-oversight/conversations/{conversationId}/ban-users`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/dm-oversight/conversations/{conversationId}/ban-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/dm-oversight/conversations/:conversationId/mark-safe (dmOversightRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/dm-oversight/conversations/{conversationId}/mark-safe`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/dm-oversight/conversations/{conversationId}/mark-safe" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dm-oversight/conversations/:conversationId/transcript (dmOversightRoutes.js)

**Endpoint:** `GET /api/v1/admin/dm-oversight/conversations/{conversationId}/transcript`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `conversationId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dm-oversight/conversations/{conversationId}/transcript" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dm-oversight/stats (dmOversightRoutes.js)

**Endpoint:** `GET /api/v1/admin/dm-oversight/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dm-oversight/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dm-oversight/conversations (dmOversightRoutes.js)

**Endpoint:** `GET /api/v1/admin/dm-oversight/conversations`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dm-oversight/conversations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/recent-posts (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/recent-posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/recent-posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/recent-users (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/recent-users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/recent-users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/login-methods (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/login-methods`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/login-methods" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/media-distribution (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/media-distribution`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/media-distribution" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/user-growth (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/user-growth`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/user-growth" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/activity-feed (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/activity-feed`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/activity-feed" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/dashboard/kpis (dashboardRoutes.js)

**Endpoint:** `GET /api/v1/admin/dashboard/kpis`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/dashboard/kpis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/moderation/stories/:storyId (contentManagementRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/moderation/stories/{storyId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/moderation/stories/{storyId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/stories/:storyId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/stories/{storyId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `storyId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/stories/{storyId}/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/stories (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/stories`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/moderation/reels/:reelId (contentManagementRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/moderation/reels/{reelId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/moderation/reels/{reelId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/moderation/reels/:reelId/unhide (contentManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/moderation/reels/{reelId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/moderation/reels/{reelId}/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/moderation/reels/:reelId/hide (contentManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/moderation/reels/{reelId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/moderation/reels/{reelId}/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/reels/:reelId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/reels/{reelId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `reelId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/reels/{reelId}/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/reels (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/reels`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/reels" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/moderation/posts/:postId (contentManagementRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/moderation/posts/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/moderation/posts/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/moderation/posts/:postId/unhide (contentManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/moderation/posts/{postId}/unhide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/moderation/posts/{postId}/unhide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/moderation/posts/:postId/hide (contentManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/moderation/posts/{postId}/hide`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/moderation/posts/{postId}/hide" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/posts/:postId/interactions (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/posts/{postId}/interactions`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/posts/{postId}/interactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/moderation/posts (contentManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/moderation/posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/moderation/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/comments/:commentId/remove (commentModerationRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/comments/{commentId}/remove`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/comments/{commentId}/remove" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/comments/:commentId/approve (commentModerationRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/comments/{commentId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `commentId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/comments/{commentId}/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/comments/stats (commentModerationRoutes.js)

**Endpoint:** `GET /api/v1/admin/comments/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/comments/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/comments/ (commentModerationRoutes.js)

**Endpoint:** `GET /api/v1/admin/comments/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/comments/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/cms/pages/:id (cmsRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/cms/pages/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/cms/pages/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/cms/pages (cmsRoutes.js)

**Endpoint:** `GET /api/v1/admin/cms/pages`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/cms/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/avatars/:avatarId (avatarManagementRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/avatars/{avatarId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/avatars/{avatarId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/avatars/:avatarId/reject (avatarManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/avatars/{avatarId}/reject`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/avatars/{avatarId}/reject" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/avatars/:avatarId/approve (avatarManagementRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/avatars/{avatarId}/approve`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `avatarId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/avatars/{avatarId}/approve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/avatars/stats (avatarManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/avatars/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/avatars/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/avatars/ (avatarManagementRoutes.js)

**Endpoint:** `GET /api/v1/admin/avatars/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/avatars/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/auth/roles/:id (authRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/auth/roles/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/auth/roles/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/admin/auth/roles/:id (authRoutes.js)

**Endpoint:** `PUT /api/v1/admin/auth/roles/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/admin/auth/roles/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/auth/roles (authRoutes.js)

**Endpoint:** `POST /api/v1/admin/auth/roles`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/auth/roles (authRoutes.js)

**Endpoint:** `GET /api/v1/admin/auth/roles`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/admin/auth/admins/:id (authRoutes.js)

**Endpoint:** `DELETE /api/v1/admin/auth/admins/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/admin/auth/admins/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PATCH /api/v1/admin/auth/admins/:id/role (authRoutes.js)

**Endpoint:** `PATCH /api/v1/admin/auth/admins/{id}/role`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/api/v1/admin/auth/admins/{id}/role" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/auth/admins (authRoutes.js)

**Endpoint:** `GET /api/v1/admin/auth/admins`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/auth/admins" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/auth/me (authRoutes.js)

**Endpoint:** `GET /api/v1/admin/auth/me`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/auth/login (authRoutes.js)

**Endpoint:** `POST /api/v1/admin/auth/login`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/audit/ (auditRoutes.js)

**Endpoint:** `GET /api/v1/admin/audit/`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/audit/" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/active-hours (analyticsRoutes.js)

**Endpoint:** `GET /api/v1/admin/active-hours`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/countries (analyticsRoutes.js)

**Endpoint:** `GET /api/v1/admin/countries`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/active-hours (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/active-hours`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/active-hours" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/countries (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/countries`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/top-content (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/top-content`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/top-content" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/engagement-trends (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/engagement-trends`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/engagement-trends" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/user-acquisition (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/user-acquisition`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/user-acquisition" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/analytics/summary (analyticsAdminRoutes.js)

**Endpoint:** `GET /api/v1/admin/analytics/summary`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/analytics/summary" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/notifications/stats (adminNotificationRoutes.js)

**Endpoint:** `GET /api/v1/admin/notifications/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/notifications/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/admin/notifications/history (adminNotificationRoutes.js)

**Endpoint:** `GET /api/v1/admin/notifications/history`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/admin/notifications/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/admin/notifications/global (adminNotificationRoutes.js)

**Endpoint:** `POST /api/v1/admin/notifications/global`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/admin/notifications/global" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/help/admin/article/:id (adminRoutes.js)

**Endpoint:** `DELETE /api/v1/help/admin/article/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/help/admin/article/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/help/admin/article/:id (adminRoutes.js)

**Endpoint:** `PUT /api/v1/help/admin/article/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/help/admin/article/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/admin/articles (adminRoutes.js)

**Endpoint:** `GET /api/v1/help/admin/articles`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/admin/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/help/admin/article (adminRoutes.js)

**Endpoint:** `POST /api/v1/help/admin/article`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/help/admin/article" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### DELETE /api/v1/help/admin/category/:id (adminRoutes.js)

**Endpoint:** `DELETE /api/v1/help/admin/category/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/api/v1/help/admin/category/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### PUT /api/v1/help/admin/category/:id (adminRoutes.js)

**Endpoint:** `PUT /api/v1/help/admin/category/{id}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `id` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PUT "http://192.168.1.100:5000/api/v1/help/admin/category/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/help/admin/category (adminRoutes.js)

**Endpoint:** `POST /api/v1/help/admin/category`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/help/admin/category" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/notifications/admin/stats (notificationRoutes.js)

**Endpoint:** `GET /api/v1/notifications/admin/stats`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/notifications/admin/stats" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/notifications/admin/history (notificationRoutes.js)

**Endpoint:** `GET /api/v1/notifications/admin/history`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/notifications/admin/history" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### POST /api/v1/notifications/admin/broadcast (notificationRoutes.js)

**Endpoint:** `POST /api/v1/notifications/admin/broadcast`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/notifications/admin/broadcast" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Admin panel login

**Endpoint:** `POST /admin/auth/login`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/admin/auth/login" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get all admin roles

**Endpoint:** `GET /admin/auth/roles`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/auth/roles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get platform performance indicators

**Endpoint:** `GET /admin/dashboard/kpis`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/dashboard/kpis" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### List all users for management

**Endpoint:** `GET /admin/users`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get full user details for admin

**Endpoint:** `GET /admin/users/{userId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/users/{userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Ban a user permanently

**Endpoint:** `PATCH /admin/users/{userId}/ban`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `userId` | path | string | ✅ | - |

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X PATCH "http://192.168.1.100:5000/admin/users/{userId}/ban" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### List all user reports

**Endpoint:** `GET /admin/reports`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/reports" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### List all posts for moderation

**Endpoint:** `GET /admin/moderation/posts`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/moderation/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Delete a post by admin

**Endpoint:** `DELETE /admin/moderation/posts/{postId}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `postId` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X DELETE "http://192.168.1.100:5000/admin/moderation/posts/{postId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### List and manage hashtags

**Endpoint:** `GET /admin/hashtags`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/hashtags" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Get regional user distribution

**Endpoint:** `GET /admin/analytics/countries`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/analytics/countries" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### List CMS pages

**Endpoint:** `GET /admin/cms/pages`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/cms/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Send a global system notification

**Endpoint:** `POST /admin/notifications/global`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/admin/notifications/global" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### Review reported direct messages

**Endpoint:** `GET /admin/messages/reported`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/messages/reported" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### View administrative audit logs

**Endpoint:** `GET /admin/audit`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/admin/audit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

## Help

### POST /api/v1/help/feedback (helpRoutes.js)

**Endpoint:** `POST /api/v1/help/feedback`

<h4> Request Body (Example)</h4>
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

<h4> Sample Request (CURL)</h4>
```bash
curl -X POST "http://192.168.1.100:5000/api/v1/help/feedback" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
  "field1": "value1",
  "field2": "value2"
}'
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/search (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/search`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/article/:slug (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/article/{slug}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `slug` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/article/{slug}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/articles (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/articles`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/articles/featured (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/articles/featured`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/articles/featured" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/category/:slug (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/category/{slug}`

#### Parameters
| Name | In | Type | Required | Description |
|---|---|---|---|---|
| `slug` | path | string | ✅ | - |

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/category/{slug}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

### GET /api/v1/help/categories (helpRoutes.js)

**Endpoint:** `GET /api/v1/help/categories`

<h4> Sample Request (CURL)</h4>
```bash
curl -X GET "http://192.168.1.100:5000/api/v1/help/categories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

<h4> Sample Response</h4>
```json
{
  "status": "success",
  "data": { ... }
}
```

---

