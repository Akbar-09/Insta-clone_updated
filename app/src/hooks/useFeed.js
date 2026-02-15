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
                fetchedAds = adsRes.value.data.data.map(ad => {
                    const originalId = ad.id;
                    return {
                        ...ad,
                        isAd: true,
                        // Map generic post fields
                        id: originalId,
                        originalAdId: originalId,
                        username: ad.username || 'Sponsored',
                        userAvatar: ad.profileImage || `https://ui-avatars.com/api/?name=${ad.username}&background=random`,
                        // Backend now provides mediaUrl, imageUrl, likesCount, hideLikes, etc.
                        likesCount: ad.likesCount || 0,
                        commentsCount: ad.commentsCount || 0,
                        isLiked: !!ad.isLiked,
                        isSaved: !!ad.isSaved,
                        hideLikes: ad.hideLikes || false,
                        commentsDisabled: ad.commentsDisabled || false,
                        trackClick: () => api.post('/ads/click', { adId: originalId }),
                        trackImpression: () => api.post('/ads/impression', { adId: originalId })
                    };
                });
            } else {
                if (adsRes.status === 'rejected') console.warn('Ads fetch failed', adsRes.reason);
            }

            console.log(`Feed: ${fetchedPosts.length} posts, ${fetchedAds.length} ads fetched.`);

            // Mix Logic: Ad every 3 posts
            const mixedFeed = [];
            let adIndex = 0;

            if (fetchedPosts.length > 0) {
                fetchedPosts.forEach((post, index) => {
                    mixedFeed.push(post);
                    // Inject ad after every 3 posts
                    if ((index + 1) % 3 === 0 && adIndex < fetchedAds.length) {
                        mixedFeed.push(fetchedAds[adIndex]);
                        adIndex++;
                    }
                });
            } else if (fetchedAds.length > 0) {
                // If no regular posts, show just ads
                mixedFeed.push(...fetchedAds);
            }

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
