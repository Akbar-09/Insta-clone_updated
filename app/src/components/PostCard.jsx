import { useState, useRef, useContext, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, Bookmark } from 'lucide-react';
import CommentSection from './comments/CommentSection';
import ShareModal from './ShareModal';
import PostOptionsMenu from './PostOptionsMenu'; // Import Menu
import { savePost, unsavePost } from '../api/bookmarkApi'; // Import API
import { AuthContext } from '../context/AuthContext';
import { usePostLikes } from '../hooks/usePostLikes';
import HeartOverlay from './HeartOverlay';


import ReportModal from './ReportModal';
import EditPostModal from './EditPostModal';
// ShareModal is already imported as SharePostModal, so no need to re-import.
// The instruction mentioned "ShareModal" but the existing component is "SharePostModal".
// I will assume the instruction meant to use the existing SharePostModal.

const PostCard = ({ post, onLikeUpdate }) => {
    const { user } = useContext(AuthContext);

    // Internal state for optimism/updates
    const [currentPost, setCurrentPost] = useState(post);
    const [isDeleted, setIsDeleted] = useState(false);

    // Use custom hook for like logic (pass currentPost)
    const {
        isLiked,
        likesCount,
        toggleLike,
        handleDoubleTap,
        isAnimating,
        setIsAnimating
    } = usePostLikes(currentPost, onLikeUpdate);

    // State for interactions
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);

    // Saved State
    const [isSaved, setIsSaved] = useState(currentPost.isSaved || false);
    const [saving, setSaving] = useState(false);

    // Effect to update local state if prop changes (e.g. from parent refresh)
    useEffect(() => {
        setCurrentPost(post);
        setIsSaved(post.isSaved || false); // Also update saved state if post prop changes
    }, [post]);

    const commentInputRef = useRef(null);
    const commentSectionRef = useRef(null);

    if (isDeleted) return null;

    // Is Own Post Logic
    const isOwnPost = user && (user.id === currentPost.userId || user.username === currentPost.username);

    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http')) return url;
        return url; // Proxy handles /uploads
    };

    // --- Comment Icon Handler ---
    const handleCommentClick = () => {
        // Toggle expansion
        setShowComments(prev => !prev);

        // If opening, focus and scroll
        if (!showComments) {
            setTimeout(() => {
                // Focus input
                commentInputRef.current?.focus();

                // Scroll to view
                commentSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    };

    // --- Bookmark Handler ---
    const handleToggleSave = async () => {
        if (saving || !user) return;

        // Optimistic Update
        const previousState = isSaved;
        setIsSaved(!previousState);
        setSaving(true);

        try {
            if (!previousState) {
                await savePost(post.id, user.id || user.userId);
            } else {
                await unsavePost(post.id, user.id || user.userId);
            }
        } catch (error) {
            console.error("Bookmark failed", error);
            setIsSaved(previousState); // Revert on failure
            alert("Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    // Helper function for time formatting (assuming it exists elsewhere or needs to be added)
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffSeconds = Math.floor((now - date) / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) return `${diffSeconds}s`;
        if (diffMinutes < 60) return `${diffMinutes}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 7) return `${diffDays}d`;
        return date.toLocaleDateString();
    };

    // Helper function for caption formatting (assuming it exists elsewhere or needs to be added)
    const formatCaption = (caption) => {
        if (!caption) return '';
        // Basic formatting for hashtags and mentions
        return caption
            .replace(/#(\w+)/g, '<span class="text-blue-500 cursor-pointer">#$1</span>')
            .replace(/@(\w+)/g, '<span class="text-blue-500 cursor-pointer">@$1</span>');
    };

    return (
        <article className="bg-white dark:bg-black border-b border-border md:border md:border-border md:rounded-lg mb-4">
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-border">
                        {currentPost.userAvatar && <img src={currentPost.userAvatar} alt={currentPost.username} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <div className="font-semibold text-sm text-text-primary flex items-center gap-1">
                            {currentPost.username}
                            {/* Time */}
                            <span className="text-text-secondary font-normal">• {formatTime(currentPost.createdAt)}</span>
                        </div>
                        {currentPost.location && <div className="text-xs text-text-secondary">{currentPost.location}</div>}
                    </div>
                </div>
                <button
                    onClick={() => setShowOptionsMenu(true)}
                    className="text-text-primary hover:opacity-60"
                >
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Image (Full width, no padding) */}
            <div className="w-full overflow-hidden border-y border-border relative" onDoubleClick={handleDoubleTap}>
                <HeartOverlay visible={isAnimating} onAnimationEnd={() => setIsAnimating(false)} />
                {currentPost.mediaType === 'VIDEO' ? (
                    <video src={getMediaUrl(currentPost.mediaUrl)} controls className="w-full h-auto block" />
                ) : (
                    <img src={getMediaUrl(currentPost.mediaUrl || currentPost.imageUrl)} alt="Post content" className="w-full h-full object-cover" />
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between py-3 px-4">
                <div className="flex gap-4">
                    {/* Like */}
                    <button
                        onClick={toggleLike}
                        className={`cursor-pointer hover:opacity-60 transition-transform active:scale-125 ${isLiked ? 'text-like' : 'text-text-primary'}`}
                    >
                        <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} className={isLiked && isAnimating ? 'animate-bounce' : ''} />
                    </button>

                    {/* Comment */}
                    <button
                        onClick={handleCommentClick}
                        disabled={currentPost.commentsDisabled}
                        className={`cursor-pointer hover:opacity-60 transition-opacity ${showComments ? 'text-text-primary opacity-50' : 'text-text-primary'} ${currentPost.commentsDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                        <MessageCircle size={24} />
                    </button>

                    {/* Share */}
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="cursor-pointer text-text-primary hover:opacity-60 transition-opacity"
                    >
                        <Send size={24} />
                    </button>
                </div>
                {/* Save/Bookmark */}
                <button
                    onClick={handleToggleSave}
                    disabled={saving}
                    className={`cursor-pointer hover:opacity-60 transition-all hover:scale-110 ${isSaved ? 'text-black dark:text-white' : 'text-text-primary'}`}
                >
                    <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* Likes */}
            {!currentPost.hideLikes && (
                <div className="font-semibold text-sm text-text-primary mb-2 px-4">
                    {likesCount.toLocaleString()} like{likesCount !== 1 ? 's' : ''}
                </div>
            )}

            {/* Caption */}
            <div className="px-4 pb-2">
                <span className="font-semibold text-sm mr-2 cursor-pointer hover:text-gray-500">{currentPost.username}</span>
                <span className="text-sm dropdown-caption" dangerouslySetInnerHTML={{ __html: formatCaption(currentPost.caption) }} />
            </div>

            {/* Comments Section */}
            {!currentPost.commentsDisabled && !showComments && currentPost.commentsCount > 0 && (
                <div className="px-4">
                    <button
                        onClick={handleCommentClick}
                        className="text-sm text-gray-500 hover:underline cursor-pointer border-none bg-transparent"
                    >
                        View all {currentPost.commentsCount} comments
                    </button>
                    {/* Add Comment Input Preview */}
                </div>
            )}

            {/* Modals */}
            {showOptionsMenu && (
                <PostOptionsMenu
                    post={currentPost}
                    isOwnPost={user?.id === currentPost.userId || user?.userId === currentPost.userId}
                    onClose={() => setShowOptionsMenu(false)}
                    onDeleteSuccess={() => setIsDeleted(true)}
                    onEdit={() => setShowEditModal(true)}
                    onShare={() => setShowShareModal(true)}
                    onUpdatePost={(updated) => setCurrentPost(prev => ({ ...prev, ...updated }))}
                    onReport={() => setShowReportModal(true)}
                />
            )}

            {showReportModal && (
                <ReportModal
                    postId={currentPost.id}
                    onClose={() => setShowReportModal(false)}
                />
            )}

            {showEditModal && (
                <EditPostModal
                    post={currentPost}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={(newCaption) => setCurrentPost(prev => ({ ...prev, caption: newCaption }))}
                />
            )}

            {showShareModal && (
                <ShareModal
                    post={currentPost}
                    onClose={() => setShowShareModal(false)}
                />
            )}

            {showComments && (
                <CommentSection
                    postId={currentPost.id}
                    onClose={() => setShowComments(false)}
                    initialComments={currentPost.latestComments || []}
                    initialCount={currentPost.commentsCount || 0}
                    isExpanded={true}
                />
            )}
        </article>
    );
};

export default PostCard;
