import api from './axios';

export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/search?q=${query}`);
        // Ensure we always return an array, even if backend structure varies
        return response.data.data || response.data || [];
    } catch (error) {
        console.error("Error searching users:", error);
        return [];
    }
};

export const sendPostViaDM = async (receiverId, postId, type = 'post', metadata = {}) => {
    try {
        const isReel = type === 'reel';

        // Prepare JSON content for premium rendering
        const shareContent = {
            id: postId,
            postId: postId,
            type: type,
            username: metadata.username || 'User',
            thumbnailUrl: metadata.mediaUrl || metadata.thumbnailUrl,
            caption: metadata.caption || '',
            text: isReel ? `Shared a reel: /reels/${postId}` : `Shared a post: /posts/${postId}`
        };

        const response = await api.post('/messages/send', {
            receiverId: receiverId,
            content: JSON.stringify(shareContent),
            postId: postId,
            type: isReel ? 'reel_share' : 'post_share'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
