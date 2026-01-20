import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1'; // Hardcoded for now based on gateway port

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
