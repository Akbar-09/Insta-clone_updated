import { useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

export const useFollow = (userId, initialIsFollowing = null, initialFollowersCount = 0) => {
    // If null, we don't know yet. If boolean, we know.
    // We default state to false but load if null.
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing === null ? false : initialIsFollowing);
    const [followersCount, setFollowersCount] = useState(initialFollowersCount);
    const [loading, setLoading] = useState(false);

    // Fetch status if unknown
    useEffect(() => {
        if (initialIsFollowing === null && userId) {
            const checkStatus = async () => {
                try {
                    const res = await api.get(`/users/${userId}/follow/status`);
                    if (res.data.status === 'success') {
                        setIsFollowing(res.data.data.isFollowing);
                    }
                } catch (error) {
                    console.error('Failed to checked follow status', error);
                }
            };
            checkStatus();
        } else if (initialIsFollowing !== null) {
            setIsFollowing(initialIsFollowing);
        }
    }, [userId, initialIsFollowing]);

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
