import api from './axios';

/**
 * Search users or hashtags
 */
export const search = async (query, type = 'all') => {
    try {
        const response = await api.get(`/search?q=${query}&type=${type}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Search specifically for users
 */
export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/search/users?q=${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    search,
    searchUsers
};
