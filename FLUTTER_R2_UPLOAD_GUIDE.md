# Flutter R2 File Upload Guide

This guide explains how to implement file uploads to Cloudflare R2 using Presigned URLs in Flutter. 

## ⚠️ Important Note on CORS
If you are getting a **CORS error** (usually in Web or when testing on certain devices), ensure your origin is added to the Cloudflare R2 Bucket settings. See [R2_CORS_SETUP.md](./R2_CORS_SETUP.md) for details.

---

## The 3-Step Upload Sequence

Direct R2 uploads avoid sending large files through our backend, but they require three distinct steps:

### 1. Request Presigned URL
Call our API to get a unique, short-lived upload URL.
- **Endpoint**: `POST /api/media/presigned-url`
- **Body**:
  ```json
  {
    "filename": "my_image.jpg",
    "fileType": "image", // or "video"
    "contentType": "image/jpeg", // MUST match the actual file mime type
    "context": "feed" // "feed", "story", "profile", or "chat"
  }
  ```
- **Response**:
  ```json
  {
    "uploadUrl": "https://<bucket>.<account-id>.r2.cloudflarestorage.com/Jaadoe/temp/...",
    "key": "Jaadoe/temp/uuid-name.jpg",
    "mediaId": "uuid-string"
  }
  ```

> [!NOTE]
> The `uploadUrl` is for Cloudflare R2. However, once the upload is completed and finalized, the public URL will be served via our backend at:
> `https://your-api.com/api/media/files/Jaadoe/posts/images/uuid_opt.webp`

### 2. Direct PUT to R2
Upload the file directly to Cloudflare.
- **Method**: `PUT`
- **URL**: Use the `uploadUrl` from Step 1.
- **Headers**: 
  - `Content-Type`: **MUST** be exactly the same as the `contentType` sent in Step 1.
- **Body**: The **Raw Binary Byte Array** of the file (DO NOT use Multipart/FormData).

### 3. Finalize Upload
Notify our backend that the upload is finished so we can optimize the image and move it to the permanent folder.
- **Endpoint**: `POST /api/media/finalize`
- **Body**:
  ```json
  {
    "mediaId": "uuid-string",
    "key": "Jaadoe/temp/uuid-name.jpg",
    "context": "feed" 
  }
  ```

---

## Flutter Implementation (using Dio)

We recommend using the `dio` package for easier byte stream handling.

```dart
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:mime/mime.dart';

Future<String?> uploadFileToR2(File file, String context) async {
  final dio = Dio();
  final fileName = file.path.split('/').last;
  final mimeType = lookupMimeType(file.path) ?? 'application/octet-stream';
  final fileType = mimeType.startsWith('video') ? 'video' : 'image';

  try {
    // START SERVICES (Ensure your base URL is correct)
    const baseUrl = "https://your-api.com/api/media";

    // STEP 1: Get Presigned URL
    final response = await dio.post("$baseUrl/presigned-url", data: {
      "filename": fileName,
      "fileType": fileType,
      "contentType": mimeType,
      "context": context,
    });

    final uploadUrl = response.data['uploadUrl'];
    final key = response.data['key'];
    final mediaId = response.data['mediaId'];

    // STEP 2: Direct PUT to R2
    // CRITICAL: We send file.openRead() or file.readAsBytesSync()
    // DO NOT use FormData.fromMap()
    await dio.put(
      uploadUrl,
      data: file.openRead(), 
      options: Options(
        headers: {
          Headers.contentTypeHeader: mimeType,
          Headers.contentLengthHeader: file.lengthSync(),
        },
      ),
      onSendProgress: (count, total) {
        print("Upload Progress: ${(count / total * 100).toStringAsFixed(0)}%");
      },
    );

    // STEP 3: Finalize
    final finalizeResponse = await dio.post("$baseUrl/finalize", data: {
      "mediaId": mediaId,
      "key": key,
      "context": context,
    });

    print("Upload Successful! Media ID: $mediaId");
    return mediaId;

  } catch (e) {
    print("Upload Failed: $e");
    if (e is DioException) {
      print("Status: ${e.response?.statusCode}");
      print("Data: ${e.response?.data}");
    }
    return null;
  }
}
```

---

## Common Issues & Fixes

| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| **403 Forbidden** | `Content-Type` Mismatch | The header in the `PUT` request must match the `contentType` sent to `/presigned-url`. |
| **400 Bad Request** | Request Body | Ensure you are sending raw bytes, NOT `MultipartFile` or `FormData`. |
| **CORS Error** | Bucket Policy | Log in to Cloudflare and add your app's origin to the CORS settings (see [R2_CORS_SETUP.md](./R2_CORS_SETUP.md)). |
| **File not visible** | Skipped Finalize | If you skip Step 3, the file stays in the `/temp` folder and won't be linked to posts/profiles. |
| **Slow Upload** | Connection | R2 is extremely fast, but ensure you aren't using a VPN or proxy that throttles `PUT` requests. |

---

## Debugging Checklist
- [ ] Is the `Content-Type` (e.g., `image/jpeg`) consistent in both Step 1 and Step 2?
- [ ] Are you using `PUT` for the Cloudflare URL?
- [ ] Are you sending the file as a binary stream?
- [ ] Did you receive `{"message": "Upload finalized..."}` from the finalize endpoint?
