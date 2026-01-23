import api from './axios';

export const createStory = async (storyData) => {
    const response = await api.post('/stories', storyData);
    return response.data;
};

export const getStories = async () => {
    const response = await api.get('/stories');
    return response.data;
};

export const getArchivedStories = async () => {
    const response = await api.get('/stories/archive');
    return response.data;
};

export const deleteStory = async (storyId) => {
    const response = await api.delete(`/stories/${storyId}`);
    return response.data;
};

export const reportStory = async (storyId, reason) => {
    const response = await api.post(`/stories/${storyId}/report`, { reason });
    return response.data;
};

export const viewStory = async (storyId) => {
    const response = await api.post(`/stories/${storyId}/view`);
    return response.data;
};

export const reactToStory = async (storyId) => {
    const response = await api.post(`/stories/${storyId}/react`, { type: 'LIKE' });
    return response.data;
};

export const unreactToStory = async (storyId) => {
    const response = await api.delete(`/stories/${storyId}/react`);
    return response.data;
};
