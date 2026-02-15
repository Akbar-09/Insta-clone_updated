import axios from 'axios';

const API_BASE = 'http://localhost:5060/api/help';

export const helpApi = {
    getCategories: () => axios.get(`${API_BASE}/categories`),
    getFeaturedArticles: () => axios.get(`${API_BASE}/articles/featured`),
    getArticle: (slug) => axios.get(`${API_BASE}/articles/${slug}`),
    search: (q) => axios.get(`${API_BASE}/search?q=${q}`),
    submitFeedback: (data) => axios.post(`${API_BASE}/feedback`, data)
};
