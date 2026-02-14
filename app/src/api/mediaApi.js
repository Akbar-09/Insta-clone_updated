import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1'
});

// Add interceptor for auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Legacy local upload
 */
export const uploadMediaLocal = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    const media = res.data.data;
    return { url: media.url, key: media.filename, id: media.id };
};

/**
 * Cloudflare R2 direct upload flow (3-step)
 */
export const uploadMediaToR2 = async (file, context = 'feed') => {
    // 1. Get Pre-signed URL from Backend
    const presignRes = await api.post('/media/presigned-url', {
        filename: file.name,
        fileType: file.type,
        context
    });

    if (presignRes.data.status !== 'success') throw new Error('Failed to get upload URL');

    const { uploadUrl, key, publicUrl } = presignRes.data.data;

    // 2. Upload directly to R2
    const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    if (!uploadResponse.ok) throw new Error('R2 Upload failed');

    // 3. Finalize on Backend (starts background optimization)
    const finalizeRes = await api.post('/media/finalize', {
        key,
        filename: file.name,
        fileType: file.type,
        size: file.size,
        context
    });

    if (finalizeRes.data.status !== 'success') throw new Error('Finalization failed');

    return { url: publicUrl, key, id: finalizeRes.data.data.id };
};

// Default export - use local upload (backend handles R2 if configured)
// This avoids CORS issues with direct R2 uploads
export const uploadMedia = async (file, context = 'feed') => {
    console.log(`Uploading ${file.name} via backend...`);
    return await uploadMediaLocal(file);
};
