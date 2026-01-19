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
        // user-service route: PUT /:id
        // Gateway: /api/v1/users -> strips /api/v1/users
        // Request: /api/v1/users/${userId} -> /${userId}
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
