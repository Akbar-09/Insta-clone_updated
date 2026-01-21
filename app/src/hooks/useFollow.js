import { useState, useCallback } from 'react';
import api from '../api/axios';

export const useFollow = (userId, initialIsFollowing = false, initialFollowersCount = 0) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followersCount, setFollowersCount] = useState(initialFollowersCount);
    const [loading, setLoading] = useState(false);

    const toggleFollow = useCallback(async () => {
        if (loading || !userId) return;

        // Optimistic Update
        const previousIsFollowing = isFollowing;
        const previousCount = followersCount;

        setIsFollowing(!previousIsFollowing);
        setFollowersCount(prev => previousIsFollowing ? prev - 1 : prev + 1);
        setLoading(true);

        try {
            if (previousIsFollowing) {
                // Unfollow
                await api.delete(`/users/${userId}/follow`);
            } else {
                // Follow
                await api.post(`/users/${userId}/follow`);
            }
        } catch (error) {
            console.error('Follow toggle error:', error);
            // Rollback
            setIsFollowing(previousIsFollowing);
            setFollowersCount(previousCount);
        } finally {
            setLoading(false);
        }
    }, [isFollowing, followersCount, userId, loading]);

    return {
        isFollowing,
        followersCount,
        toggleFollow,
        loading
    };
};
