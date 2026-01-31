import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export default function useFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeed = useCallback(async () => {
        try {
            setLoading(true);
            const [feedRes, adsRes] = await Promise.allSettled([
                api.get('/feed?limit=20&offset=0'),
                api.get('/ads/active')
            ]);

            let fetchedPosts = [];
            let fetchedAds = [];

            if (feedRes.status === 'fulfilled' && feedRes.value.data.status === 'success') {
                fetchedPosts = feedRes.value.data.data;
            } else {
                if (feedRes.status === 'rejected') console.warn('Feed fetch failed', feedRes.reason);
            }

            if (adsRes.status === 'fulfilled' && adsRes.value.data.status === 'success') {
                fetchedAds = adsRes.value.data.data.map(ad => ({
                    ...ad,
                    isAd: true,
                    // Map generic post fields
                    id: `ad_${ad.id}`, // specific string id
                    originalAdId: ad.id,
                    username: ad.username || 'Sponsored',
                    userAvatar: ad.profileImage || `https://ui-avatars.com/api/?name=${ad.username}&background=random`,
                    imageUrl: ad.mediaUrl, // PostCard uses object.imageUrl or mediaUrl
                    likesCount: 0,
                    hideLikes: true,
                    commentsDisabled: true,
                    trackClick: () => api.post('/ads/click', { adId: ad.id }),
                    trackImpression: () => api.post('/ads/impression', { adId: ad.id })
                }));
            } else {
                if (adsRes.status === 'rejected') console.warn('Ads fetch failed', adsRes.reason);
            }

            // Mix Logic: Ad every 4 posts
            const mixedFeed = [];
            let adIndex = 0;

            fetchedPosts.forEach((post, index) => {
                mixedFeed.push(post);
                if ((index + 1) % 4 === 0 && adIndex < fetchedAds.length) {
                    mixedFeed.push(fetchedAds[adIndex]);
                    adIndex++;
                }
            });

            // If any ads left and feed is short? No, keep balance.

            setPosts(mixedFeed);
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
