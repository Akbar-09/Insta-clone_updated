# Cloudflare R2 CORS Configuration Guide

## Current Setup
- **Status**: Direct R2 uploads are DISABLED
- **Reason**: CORS policy blocking browser uploads
- **Current Flow**: Files upload through backend → backend uploads to R2

## Why CORS Error Occurred
When the frontend tries to upload directly to R2 using presigned URLs, the browser makes a "preflight" OPTIONS request to check if the origin is allowed. R2 was rejecting this because CORS wasn't configured.

## How to Enable Direct R2 Uploads (Optional)

### Step 1: Configure CORS on R2 Bucket

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Navigate to R2 → Your Bucket (`omretesting`)

2. **Add CORS Policy**
   - Click on "Settings" tab
   - Scroll to "CORS Policy"
   - Add the following JSON configuration:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://localhost:5175",
      "http://192.168.1.15:5175",
      "https://yourdomain.com"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag",
      "Content-Length"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

3. **Save the CORS configuration**

### Step 2: Re-enable Direct Uploads in Frontend

In `app/src/api/mediaApi.js`, change back to:

```javascript
// Default export uses R2 flow with local fallback
export const uploadMedia = async (file, context = 'feed') => {
    try {
        console.log(`Attempting R2 upload for ${file.name}...`);
        return await uploadMediaToR2(file, context);
    } catch (error) {
        console.warn('R2 Upload failed, falling back to local upload:', error.message);
        return await uploadMediaLocal(file);
    }
};
```

## Benefits of Each Approach

### Current Approach (Backend Upload)
✅ No CORS issues
✅ Works immediately
✅ Backend has full control
❌ Slower (file goes through backend)
❌ Uses more backend bandwidth

### Direct R2 Upload (After CORS Config)
✅ Faster uploads (direct to R2)
✅ Saves backend bandwidth
✅ Better for large files
❌ Requires CORS configuration
❌ Exposes R2 bucket URL to clients

## Recommendation
- **For Development**: Keep current backend upload (simpler)
- **For Production**: Configure CORS and enable direct uploads (better performance)

## Testing After CORS Configuration

1. Enable direct uploads in `mediaApi.js`
2. Try uploading an image in messages
3. Check browser console - should see "Attempting R2 upload..."
4. No CORS errors should appear
5. Upload should complete successfully

## Troubleshooting

If CORS errors persist after configuration:
1. Wait 5-10 minutes for CORS changes to propagate
2. Clear browser cache
3. Check that your origin is in the AllowedOrigins list
4. Verify the CORS JSON is valid (no syntax errors)
5. Check Cloudflare R2 documentation for updates
