import { useState, useCallback, useRef, useEffect } from 'react';
import { likePost, unlikePost } from '../api/likeApi';

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

        try {
            if (previousLiked) {
                await unlikePost(post.id);
            } else {
                await likePost(post.id);
            }
        } catch (error) {
            console.error('Like toggle failed', error);
            // Revert on error
            setIsLiked(previousLiked);
            setLikesCount(previousCount);
            if (onLikeUpdate) {
                onLikeUpdate(post.id, previousLiked, previousCount);
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
