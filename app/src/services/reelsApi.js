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
    getReels
};
