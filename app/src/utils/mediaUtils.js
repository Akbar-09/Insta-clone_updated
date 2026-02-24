export const getProxiedUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;

    // Handle bare filenames (likely R2/Media Service uploads)
    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
        return `/api/v1/media/files/${url}`;
    }

    try {
        // Remove full origin if it matches any local IP/Port variations to make it relative
        const cleanedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');

        if (cleanedUrl !== url) {
            return cleanedUrl;
        }

        // If it's an R2 URL directly, try to convert it to our proxied endpoint
        if (url.includes('r2.dev')) {
            const parts = url.split('.dev/');
            if (parts.length > 1) {
                return `/api/v1/media/files/${parts[1]}`;
            }
        }

        // Ensure media files are always routed through the api/v1 prefix
        if (url.includes('/media/files') && !url.includes('/api/v1/')) {
            return url.replace('/media/files', '/api/v1/media/files');
        }

        // Route local /uploads/ through the robust files endpoint
        if (url.startsWith('/uploads/')) {
            return url.replace('/uploads/', '/api/v1/media/files/');
        }
    } catch (e) {
        console.warn('URL proxying failed:', e);
    }

    return url;
};
