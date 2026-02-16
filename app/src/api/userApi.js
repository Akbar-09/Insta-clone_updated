import api from './axios';

export const getUserProfile = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await api.get(`/users/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        const response = await api.put('/users/profile/me', { ...data, userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadMedia = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/media/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfilePhoto = async (photoUrl) => {
    try {
        const response = await api.post('/users/profile/profile-photo', { profilePicture: photoUrl });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProfilePhoto = async () => {
    try {
        const response = await api.delete('/users/profile/profile-photo');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFollowingList = async (userId) => {
    try {
        const response = await api.get(`/users/profile/${userId}/following`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFollowersList = async (userId) => {
    try {
        const response = await api.get(`/users/profile/${userId}/followers`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const blockUser = async (userId) => {
    try {
        const response = await api.post(`/users/profile/block/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restrictUser = async (userId) => {
    try {
        const response = await api.post(`/users/profile/settings/restricted/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const unrestrictUser = async (userId) => {
    try {
        const response = await api.delete(`/users/profile/settings/restricted/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRestrictedUsers = async () => {
    try {
        const response = await api.get('/users/profile/settings/restricted');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const reportProblem = async (data) => {
    try {
        const response = await api.post('/users/report-problem', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
