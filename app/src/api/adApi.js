import axios from './axios';

// Creation Flow
export const createDraftAd = (adType) => axios.post('/ads/draft', { adType });
export const attachAdMedia = (adId, mediaItems) => axios.post(`/ads/${adId}/media`, { mediaItems });
export const attachBoostContent = (adId, contentData) => axios.post(`/ads/${adId}/boost-content`, contentData);
export const updateAdDetails = (adId, details) => axios.put(`/ads/${adId}/details`, details);
export const updateAdTargeting = (adId, targeting) => axios.put(`/ads/${adId}/targeting`, targeting);
export const updateAdBudget = (adId, budget) => axios.put(`/ads/${adId}/budget`, budget);
export const publishAd = (adId) => axios.post(`/ads/${adId}/publish`);

// Helpers
export const getEligibleContent = () => axios.get('/ads/eligible-content');

// Operations & Analytics
export const createAd = (adData) => axios.post('/ads', adData); // Legacy support
export const getActiveAds = () => axios.get('/ads/active');
export const getAds = () => axios.get('/ads/active'); // Alias for getActiveAds
export const trackImpression = (adId) => axios.post('/ads/impression', { adId });
export const trackClick = (adId) => axios.post('/ads/click', { adId });
export const deleteAd = (adId) => axios.delete(`/ads/${adId}`);
export const updateAd = (adId, data) => axios.put(`/ads/${adId}`, data);
export const hideLikeCount = (adId) => axios.put(`/ads/${adId}/hide-likes`);
export const toggleComments = (adId) => axios.put(`/ads/${adId}/toggle-comments`);
export const getEmbedCode = (adId) => axios.get(`/ads/${adId}/embed`);

// Social
export const likeAd = (adId) => axios.post(`/ads/${adId}/like`);
export const bookmarkAd = (adId) => axios.post(`/ads/${adId}/bookmark`);
export const getComments = (adId) => axios.get(`/ads/${adId}/comments`);
export const addComment = (adId, content) => axios.post(`/ads/${adId}/comments`, { content });
export const deleteComment = (adId, commentId) => axios.delete(`/ads/${adId}/comments/${commentId}`);
