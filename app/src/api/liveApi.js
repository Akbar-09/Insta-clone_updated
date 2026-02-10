import axios from './axios';

// Instagram-style Live Features
export const goLiveNow = (formData) => axios.post('/live/go-live', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const scheduleStream = (formData) => axios.post('/live/schedule', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Feed & Discovery
export const getActiveLiveFeed = () => axios.get('/live/feed');
export const getLiveStreamDetails = (id) => axios.get(`/live/${id}`);

// Interactions
export const endLiveStream = (id) => axios.post(`/live/${id}/end`);
export const sendLiveChatMessage = (id, message) => axios.post(`/live/${id}/chat`, { message });
