# Auth Service API Test Commands

Base URL: `http://localhost:5001`

> **Note**: Ensure the service is running (`npm start`) and PostgreSQL is accessible.

## 1. Signup (Register)
Creates a new user.
```bash
curl -X POST http://localhost:5001/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "curluser",
    "email": "curl@example.com",
    "password": "Password123",
    "fullName": "Curl User"
  }'
```

## 2. Login
Authenticates a user and returns a JWT token.
```bash
curl -X POST http://localhost:5001/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "curl@example.com",
    "password": "Password123"
  }'
```

### PowerTip: Store Token in Variable (PowerShell)
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5001/login" -Method Post -ContentType "application/json" -Body '{"email": "curl@example.com", "password": "Password123"}'
$token = $response.data.token
Write-Host "Token stored."
```

## 3. Check Username Availability
Checks if a username is already taken.
```bash
curl -X GET "http://localhost:5001/check-username?username=curluser"
```

## 4. Check Email Availability
Checks if an email is already registered.
```bash
curl -X GET "http://localhost:5001/check-email?email=curl@example.com"
```

## 5. Get Current User (Protected)
Requires the JWT token from the Login step.
```bash
# Replace <YOUR_TOKEN_HERE> with the actual token string
curl -X GET http://localhost:5001/me \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

**PowerShell (using stored variable):**
```powershell
curl -X GET http://localhost:5001/me -H "Authorization: Bearer $token"
```

## 6. Password Reset Request (Mock)
Initiates the password reset flow.
```bash
curl -X POST http://localhost:5001/reset-password/request \
  -H "Content-Type: application/json" \
  -d '{ "email": "curl@example.com" }'
```

## 7. Password Reset Verify (Mock)
Completes the password reset flow.
```bash
curl -X POST http://localhost:5001/reset-password/verify \
  -H "Content-Type: application/json" \
  -d '{
    "token": "mock-token-123",
    "newPassword": "NewPassword456"
  }'
```

## 8. Logout
Logs out the user (client-side action primarily for JWT).
```bash
curl -X POST http://localhost:5001/logout
```
