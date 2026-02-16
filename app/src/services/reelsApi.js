import axios from 'axios';

const API_BASE_URL = '/api/v1'; // Uses Vite Proxy

const getReels = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/reels`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reels:', error);
        throw error;
    }
};

export const reelsApi = {
    getReels,
    getReelById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/reels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching reel by id:', error);
            throw error;
        }
    },
    reportReel: async (id, reason, details) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/reels/${id}/report`, {
                reason,
                details
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error reporting reel:', error);
            throw error;
        }
    }
};
