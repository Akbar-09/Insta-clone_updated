const GATEWAY_URL = 'http://localhost:5000/api/v1';

export const searchUsers = async (query) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return [];

        const response = await fetch(`${GATEWAY_URL}/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data.status === 'success') {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error('Search API Error:', error);
        return [];
    }
};
