import api from './axios';

const API_URL = 'calls';

export const startCallLog = async (callerId, receiverId, callType) => {
    const response = await api.post(`${API_URL}/start`, {
        callerId,
        receiverId,
        callType
    });
    return response.data;
};

export const updateCallLogStatus = async (id, status, endedAt, duration) => {
    const response = await api.put(`${API_URL}/${id}/status`, {
        status,
        endedAt,
        duration
    });
    return response.data;
};

export const getCallHistory = async (userId) => {
    const response = await api.get(`${API_URL}/history/${userId}`);
    return response.data;
};
