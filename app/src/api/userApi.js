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
    // Note: Based on User Service route /users/:id and gateway stripping /users,
    // this might need to be /users/users/${userId} if the service expects /users prefix.
    // But checking app.get('/users/:id') in service, it likely expects /users/123.
    // Gateway strips /api/v1/users.
    // So request to /api/v1/users/users/123 -> /users/123.
    try {
        const response = await api.get(`/users/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        // Use the controller endpoint that handles history and events
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
        // Direct upload to media service via gateway
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
