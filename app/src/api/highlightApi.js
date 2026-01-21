import api from './axios';

/**
 * Get current user's stories for highlight selection
 */
export const getMyStories = async () => {
    const response = await api.get('/stories/stories/me');
    return response.data;
};

/**
 * Get archived stories
 */
export const getArchivedStories = async () => {
    const response = await api.get('/stories/archive');
    return response.data;
};

/**
 * Create a new highlight
 */
export const createHighlight = async (title, storyIds) => {
    const response = await api.post('/stories/highlights', {
        title,
        storyIds
    });
    return response.data;
};

/**
 * Get user's highlights
 */
export const getUserHighlights = async (userId) => {
    const response = await api.get(`/stories/highlights/${userId}`);
    return response.data;
};

/**
 * Get highlight stories
 */
export const getHighlightStories = async (highlightId) => {
    const response = await api.get(`/stories/highlights/${highlightId}/stories`);
    return response.data;
};

/**
 * Update highlight title
 */
export const updateHighlight = async (highlightId, title) => {
    const response = await api.put(`/stories/highlights/${highlightId}`, {
        title
    });
    return response.data;
};

/**
 * Delete a highlight
 */
export const deleteHighlight = async (highlightId) => {
    const response = await api.delete(`/stories/highlights/${highlightId}`);
    return response.data;
};

export default {
    getMyStories,
    createHighlight,
    getUserHighlights,
    getHighlightStories,
    updateHighlight,
    deleteHighlight
};
