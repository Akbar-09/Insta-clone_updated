import axios from './axios';

export const createLiveSession = async (data) => {
    return await axios.post('/live/create', data);
};

export const getLiveSession = async (id) => {
    return await axios.get(`/live/${id}`);
};

export const getActiveLives = async () => {
    return await axios.get('/live/feed/active');
};

export const sendLiveComment = async (sessionId, content) => {
    return await axios.post(`/live/${sessionId}/comment`, { content });
};
