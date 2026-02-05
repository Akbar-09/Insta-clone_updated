import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1'
});

// Add interceptor for auth token (copied from messageApi if needed, or assume global axios config if used elsewhere)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post('/media/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data.data; // { url, filename, ... }
};
