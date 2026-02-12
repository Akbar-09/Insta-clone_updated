
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/help';

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

export const getFeaturedArticles = async () => {
    const response = await axios.get(`${API_URL}/articles/featured`);
    return response.data;
};

export const getArticleBySlug = async (slug) => {
    const response = await axios.get(`${API_URL}/articles/${slug}`);
    return response.data;
};

export const searchArticles = async (query) => {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
};

export const submitFeedback = async (feedbackData) => {
    const response = await axios.post(`${API_URL}/feedback`, feedbackData);
    return response.data;
};
