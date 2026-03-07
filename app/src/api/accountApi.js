import api from './axios';

export const getAccountType = async () => {
    try {
        const response = await api.get('/users/account/type');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const switchAccountType = async (accountType) => {
    try {
        const response = await api.post('/users/account/switch', { accountType });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAccountCategories = async (type) => {
    try {
        const response = await api.get(`/users/account/categories?type=${type}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const saveAccountCategory = async (categoryId, displayCategory) => {
    try {
        const response = await api.post('/users/account/category', { categoryId, displayCategory });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAccountProfile = async (data) => {
    try {
        const response = await api.post('/users/account/profile', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAccountProfile = async () => {
    try {
        const response = await api.get('/users/account/profile');
        return response.data;
    } catch (error) {
        throw error;
    }
};
