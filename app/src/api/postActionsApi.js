import api from './axios';

export const deletePost = async (postId) => {
    return api.delete(`/posts/${postId}`);
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

export const unfollowUser = async (userId) => {
    return api.post(`/follow/${userId}/unfollow`);
};

export const favoriteUser = async (userId) => {
    return api.post(`/favorites/${userId}/add`);
};

export const copyLink = async (postId) => {
    try {
        await navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
        return true;
    } catch (err) {
        console.error('Failed to copy link', err);
        return false;
    }
};

export const fetchPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
};

export const searchUsers = async (query) => {
    return api.get(`/search/users?q=${query}`);
};

export const sendMessage = async (userId, content) => {
    return api.post(`/messages/${userId}/send`, { content });
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

