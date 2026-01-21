import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    deletePost,
    editPost,
    hideLikeCount,
    toggleComments,
    copyLink,
    getEmbedCode
} from '../api/postActionsApi';

/**
 * Custom hook for handling post actions (delete, edit, hide likes, toggle comments, etc.)
 * Provides a consistent interface for post management across the app
 */
export const usePostActions = (post, onPostUpdate, onPostDelete) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Check if current user owns the post
    const isOwnPost = user && (user.id === post?.userId || user.username === post?.username);

    /**
     * Delete post with confirmation
     */
    const handleDelete = useCallback(async () => {
        if (!isOwnPost) {
            setError('You can only delete your own posts');
            return false;
        }

        if (!window.confirm('Delete this post? This cannot be undone.')) {
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await deletePost(post.id);
            if (onPostDelete) onPostDelete(post.id);
            return true;
        } catch (err) {
            console.error('Delete post error:', err);
            setError('Failed to delete post');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post, isOwnPost, onPostDelete]);

    /**
     * Edit post caption
     */
    const handleEdit = useCallback(async (newCaption) => {
        if (!isOwnPost) {
            setError('You can only edit your own posts');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await editPost(post.id, { caption: newCaption });
            if (onPostUpdate) {
                onPostUpdate({ ...post, caption: newCaption });
            }
            return true;
        } catch (err) {
            console.error('Edit post error:', err);
            setError('Failed to edit post');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post, isOwnPost, onPostUpdate]);

    /**
     * Toggle like count visibility
     */
    const handleToggleHideLikes = useCallback(async () => {
        if (!isOwnPost) {
            setError('You can only modify your own posts');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await hideLikeCount(post.id);
            if (onPostUpdate) {
                onPostUpdate({ ...post, hideLikes: !post.hideLikes });
            }
            return true;
        } catch (err) {
            console.error('Toggle hide likes error:', err);
            setError('Failed to update like visibility');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post, isOwnPost, onPostUpdate]);

    /**
     * Toggle comments on/off
     */
    const handleToggleComments = useCallback(async () => {
        if (!isOwnPost) {
            setError('You can only modify your own posts');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await toggleComments(post.id);
            if (onPostUpdate) {
                onPostUpdate({ ...post, commentsDisabled: !post.commentsDisabled });
            }
            return true;
        } catch (err) {
            console.error('Toggle comments error:', err);
            setError('Failed to update comment settings');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post, isOwnPost, onPostUpdate]);

    /**
     * Copy post link to clipboard
     */
    const handleCopyLink = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const success = await copyLink(post.id);
            if (success) {
                showToast('Link copied to clipboard');
            }
            return success;
        } catch (err) {
            console.error('Copy link error:', err);
            setError('Failed to copy link');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post]);

    /**
     * Get embed code and copy to clipboard
     */
    const handleGetEmbed = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const embedData = await getEmbedCode(post.id);
            await navigator.clipboard.writeText(embedData.data.embedHtml);
            showToast('Embed code copied to clipboard');
            return true;
        } catch (err) {
            console.error('Get embed error:', err);
            setError('Failed to get embed code');
            return false;
        } finally {
            setLoading(false);
        }
    }, [post]);

    /**
     * Helper function to show toast notifications
     */
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    };

    return {
        isOwnPost,
        loading,
        error,
        handleDelete,
        handleEdit,
        handleToggleHideLikes,
        handleToggleComments,
        handleCopyLink,
        handleGetEmbed,
    };
};

export default usePostActions;
