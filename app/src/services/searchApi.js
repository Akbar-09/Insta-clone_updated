import api from '../api/axios';

export const searchUsers = async (query) => {
    try {
        const response = await api.get(`/search?q=${encodeURIComponent(query)}`);

        if (response.data.status === 'success') {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error('Search API Error:', error);
        return [];
    }
};
