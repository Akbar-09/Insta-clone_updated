const GATEWAY_URL = '/api/v1';

export const getExplorePosts = async (limit = 20, offset = 0) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const response = await fetch(`${GATEWAY_URL}/posts/explore?limit=${limit}&offset=${offset}`, {
            headers
        });

        const data = await response.json();
        if (data.status === 'success') {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error('Explore API Error:', error);
        return [];
    }
};
