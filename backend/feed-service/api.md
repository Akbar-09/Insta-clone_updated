# Feed Service API Test Commands

Base URL: `http://localhost:5007`

> **Note**: This service primarily reads from Redis. Ensure Redis is running and has data (populated by other services publishing events).

## 1. Get Global Feed
Retrieves the aggregated feed (currently the last 50 items from `global_feed`).
```bash
curl -X GET "http://localhost:5007/?userId=1"
```
