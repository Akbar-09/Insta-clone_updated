# Comment Service API Test Commands

Base URL: `http://localhost:5006`

## 1. Create Comment
Adds a comment to a specific post.
```bash
curl -X POST http://localhost:5006/ \
  -H "Content-Type: application/json" \
  -d '{
    "postId": 1,
    "userId": 2,
    "username": "commenter",
    "text": "This is a test comment!"
  }'
```

## 2. Get Comments for Post
Retrieves all comments for a post.
```bash
curl -X GET "http://localhost:5006/?postId=1"
```
