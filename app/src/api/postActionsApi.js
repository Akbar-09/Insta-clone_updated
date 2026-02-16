import api from './axios';

export const deletePost = async (postId) => {
    try {
        return await api.delete(`/posts/${postId}`);
    } catch (error) {
        // If post already deleted (404), treat as success
        if (error.response && error.response.status === 404) {
            console.warn(`Post ${postId} not found (404), treating as deleted.`);
            return { status: 'success', data: { message: 'Post already deleted' } };
        }
        throw error;
    }
};

export const editPost = async (postId, data) => {
    // data: { caption: string }
    return api.put(`/posts/${postId}`, data);
};

export const hideLikeCount = async (postId) => {
    return api.put(`/posts/${postId}/hide-likes`);
};

export const toggleComments = async (postId) => {
    return api.put(`/posts/${postId}/toggle-comments`);
};

export const reportPost = async (postId, reason) => {
    return api.post(`/posts/${postId}/report`, { reason });
};

export const followUser = async (userId) => {
    return api.post(`/follow/${userId}`);
};

export const unfollowUser = async (userId) => {
    return api.post(`/follow/${userId}/unfollow`);
};

export const favoriteUser = async (userId) => {
    return api.post(`/favorites/${userId}/add`);
};

export const copyLink = async (postId) => {
    try {
        const link = `${window.location.origin}/post/${postId}`;

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(link);
        } else {
            // Fallback for http or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = link;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                return false;
            } finally {
                textArea.remove();
            }
        }
        return true;
    } catch (err) {
        console.error('Failed to copy link', err);
        return false;
    }
};

export const fetchPostById = async (postId) => {
    try {
        const response = await api.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            const response = await api.get(`/reels/${postId}`);
            return response.data;
        }
        throw error;
    }
};

export const searchUsers = async (query) => {
    return api.get(`/search/users?q=${query}`);
};

export const sendMessage = async (userId, content, type = 'text') => {
    // Intercept Mock
    if (String(userId).startsWith('mock-')) {
        return { status: 'success' };
    }
    // Use the standardized message endpoint
    return api.post('/messages/send', {
        receiverId: userId,
        content,
        type: type
    });
};

export const addComment = async (postId, text) => {
    return api.post('/comments', { postId, text });
};

export const getComments = async (postId) => {
    return api.get('/comments', { params: { postId } });
};

export const likePost = async (postId) => {
    return api.post(`/posts/${postId}/like`);
};

export const getExplorePosts = async () => {
    return api.get('/posts/explore');
};

export const unlikePost = async (postId) => {
    return api.delete(`/posts/${postId}/like`);
};

export const getEmbedCode = async (postId) => {
    const response = await api.get(`/posts/${postId}/embed`);
    return response.data;
};

