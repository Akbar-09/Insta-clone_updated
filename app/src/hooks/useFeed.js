import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export default function useFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeed = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/feed?limit=10&offset=0');
            if (response.data.status === 'success') {
                // Determine structure based on verifying API responses
                // API likely returns { status: 'success', data: [...] }
                setPosts(response.data.data);
            } else {
                setError('Failed to load feed');
            }
        } catch (err) {
            console.error('Feed fetch error:', err);
            setError(err.response?.data?.message || 'Error loading feed');
        } finally {
            setLoading(false);
        }
    }, []);

    const syncPostLike = (postId, isLiked, likesCount) => {
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    isLiked,
                    likesCount
                };
            }
            return p;
        }));
    };

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    return { posts, loading, error, syncPostLike, refresh: fetchFeed };
}
