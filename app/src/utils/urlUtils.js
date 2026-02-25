export const getProxiedUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;

    // Handle bare filenames (likely R2/Media Service uploads)
    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
        return `/api/v1/media/files/${url}`;
    }

    try {
        // 1. Convert absolute local URLs to relative
        let processedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');

        // 2. Handle R2 URLs directly
        if (processedUrl.includes('r2.dev')) {
            const parts = processedUrl.split('.dev/');
            if (parts.length > 1) {
                return `/api/v1/media/files/${parts[1]}`;
            }
        }

        // 3. Ensure media files are always routed through the api/v1 prefix
        if (processedUrl.includes('/media/files') && !processedUrl.includes('/api/v1/')) {
            processedUrl = processedUrl.replace('/media/files', '/api/v1/media/files');
        }

        // 4. Route legacy /uploads/ through the robust files endpoint
        if (processedUrl.includes('/uploads/')) {
            const fileName = processedUrl.split('/uploads/').pop();
            return `/api/v1/media/files/${fileName}`;
        }

        return processedUrl;
    } catch (e) {
        console.warn('URL proxying failed:', e);
    }

    return url;
};
