import api from './axios';

export const reportPost = async (postId, reason, details) => {
    try {
        const response = await api.post(`/posts/${postId}/report`, {
            reason,
            details
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const reportProblem = async (data) => {
    try {
        const response = await api.post('/users/profile/report-problem', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadReportFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
