import axios from './axios';

export const createLiveSession = (data) => axios.post('/live/create', data);
export const getActiveLiveFeed = () => axios.get('/live/feed/active');
export const getLiveSession = (id) => axios.get(`/live/${id}`);
export const addLiveComment = (id, text) => axios.post(`/live/${id}/comment`, { text });
