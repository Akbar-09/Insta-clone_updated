import api from './axios';

export const likePost = async (postId) => {
    return api.post(`/posts/${postId}/like`);
};

export const unlikePost = async (postId) => {
    return api.delete(`/posts/${postId}/like`);
};

export const fetchPostLikeStatus = async (postId) => {
    return api.get(`/posts/${postId}`);
};
