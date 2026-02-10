import { useState, useCallback, useRef, useEffect } from 'react';
import { likePost, unlikePost } from '../api/likeApi';
import * as adApi from '../api/adApi';

export const usePostLikes = (post, onLikeUpdate) => {
    // Initialize state from props (safely handle null post)
    const [isLiked, setIsLiked] = useState(!!(post?.isLiked || post?.likedByYou));
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Ref to track if query is in flight to prevent race conditions
    const isRequesting = useRef(false);

    // Sync state with props if they change (e.g., feed refresh)
    useEffect(() => {
        if (!post) return;
        setIsLiked(!!(post.isLiked || post.likedByYou));
        setLikesCount(post.likesCount || 0);
    }, [post?.isLiked, post?.likedByYou, post?.likesCount, post]);

    const toggleLike = useCallback(async () => {
        if (!post || isRequesting.current) return;

        // Optimistic Update
        const previousLiked = isLiked;
        const previousCount = likesCount;

        const newIsLiked = !previousLiked;
        const newCount = previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1;

        setIsLiked(newIsLiked);
        setLikesCount(newCount);

        // Notify parent immediately
        if (onLikeUpdate) {
            onLikeUpdate(post.id, newIsLiked, newCount);
        }

        isRequesting.current = true;
        const isAd = post.isAd;

        try {
            if (isAd) {
                await adApi.likeAd(post.id);
            } else {
                if (previousLiked) {
                    await unlikePost(post.id);
                } else {
                    await likePost(post.id);
                }
            }
        } catch (error) {
            console.error('Like toggle failed', error);

            // Handle synchronization issues (e.g. "Already liked")
            // If we tried to LIKE and got "Already liked" (400), keep it LIKED (don't revert)
            const isAlreadyLikedError = error.response?.status === 400 &&
                (error.response?.data?.message?.includes('already liked') || error.response?.data?.message?.includes('duplicate'));

            // If we tried to UNLIKE and got "Like not found" (404), keep it UNLIKED (don't revert)
            const isLikeNotFoundError = error.response?.status === 404 &&
                error.response?.data?.message?.includes('not found');

            if (isAlreadyLikedError) {
                // We tried to LIKE but it was already liked. State is true (correct), 
                // but our optimistic count increment was wrong because it was already incremented on server.
                setIsLiked(true);
                setLikesCount(previousCount);
            } else if (isLikeNotFoundError) {
                // We tried to UNLIKE but it was already unliked (not found). State is false (correct),
                // but our optimistic count decrement was wrong because it was already at the unliked count.
                setIsLiked(false);
                setLikesCount(previousCount);
            } else {
                // Genuine error (404 for post itself, 500, etc.), revert everything
                console.error('Like toggle failed: Reverting state');
                setIsLiked(previousLiked);
                setLikesCount(previousCount);
                if (onLikeUpdate) {
                    onLikeUpdate(post.id, previousLiked, previousCount);
                }
            }
        } finally {
            isRequesting.current = false;
        }
    }, [isLiked, likesCount, post?.id, onLikeUpdate, post]);

    const handleDoubleTap = useCallback(() => {
        // If already liked, just show animation
        if (isLiked) {
            setIsAnimating(true);
            return;
        }
        // If not liked, like it and show animation
        toggleLike();
        setIsAnimating(true);
    }, [isLiked, toggleLike]);

    return {
        isLiked,
        likesCount,
        toggleLike,
        handleDoubleTap,
        isAnimating,
        setIsAnimating
    };
};
