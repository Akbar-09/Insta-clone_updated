import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import * as adApi from '../api/adApi';

const PostCard = ({ post, onLikeUpdate }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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
        setIsSaved(post.isSaved || false);

        // Ad Impression Tracking
        if (post.isAd && post.trackImpression) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        post.trackImpression();
                        observer.disconnect(); // Count once per render cycle/session
                    }
                },
                { threshold: 0.5 } // 50% visible
            );

            // Assuming article ref would be better, but we don't have one exposed easily on root
            // I'll grab by ID since I have it or just querySelector.
            // Actually, I can use a ref on the article.

            // Let's postpone this or use a simple timeout hack? No, let's add a Ref to the article.
        }
    }, [post]);

    // Create Ref
    const cardRef = useRef(null);

    useEffect(() => {
        if (currentPost.isAd && currentPost.trackImpression && cardRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        currentPost.trackImpression();
                        observer.disconnect();
                    }
                },
                { threshold: 0.5 }
            );
            observer.observe(cardRef.current);
            return () => observer.disconnect();
        }
    }, [currentPost.isAd, currentPost.trackImpression]);


    const commentInputRef = useRef(null);
    const commentSectionRef = useRef(null);

    if (isDeleted) return null;

    // Is Own Post Logic
    const isOwnPost = user && (user.id === currentPost.userId || user.username === currentPost.username);

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        // Handle bare filenames (likely R2/Media Service uploads)
        if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
            return `/api/v1/media/files/${url}`;
        }

        // Convert absolute local gateway URLs to relative to use Vite proxy
        // This handles http://localhost:5000, http://127.0.0.1:5000, etc.
        try {
            // Check for frontend dev server IP with port 5175
            if (url.startsWith('http://192.168.1.15:5175/api/v1/')) {
                return url.replace('http://192.168.1.15:5175', '');
            }

            // Check for old backend IP with port 5000
            if (url.startsWith('http://192.168.1.15:5000')) {
                return url.replace('http://192.168.1.15:5000', '');
            }
            if (url.startsWith('http://localhost:5000') || url.startsWith('http://127.0.0.1:5000') || url.startsWith('http://192.168.1.15:5000')) {
                return url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.15):5000/, '');
            }

            // If it's an R2 URL directly, try to convert it to our proxied endpoint
            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) {
                    return `/api/v1/media/files/${parts[1]}`;
                }
            }

            // Ensure media files are always routed through the api/v1 prefix
            if (url.includes('/media/files') && !url.includes('/api/v1/')) {
                return url.replace('/media/files', '/api/v1/media/files');
            }
        } catch (e) {
            console.warn('URL proxying failed:', e);
        }

        return url;
    };

    const getMediaUrl = (url) => {
        return getProxiedUrl(url);
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
            if (currentPost.isAd) {
                await adApi.bookmarkAd(currentPost.id);
            } else {
                if (!previousState) {
                    await savePost(post.id, user.id || user.userId);
                } else {
                    await unsavePost(post.id, user.id || user.userId);
                }
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
        <article ref={cardRef} className="bg-white dark:bg-black border-b border-border md:border md:border-border md:rounded-lg mb-4 w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between py-2 px-3">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/profile/${currentPost.username}`)}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
                        <div className="w-full h-full rounded-full bg-white dark:bg-black p-[1.5px]">
                            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border border-border flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
                                {currentPost.userAvatar ? (
                                    <img src={getMediaUrl(currentPost.userAvatar)} alt={currentPost.username} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={`https://ui-avatars.com/api/?name=${currentPost.username}&background=random`} alt={currentPost.username} className="w-full h-full object-cover" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col -gap-1">
                        <div className="font-semibold text-[13px] text-text-primary flex items-center gap-1 group">
                            <span className="hover:text-gray-500 transition-colors leading-none">{currentPost.username}</span>
                            {/* Time / Ad Label */}
                            {currentPost.isAd ? (
                                <span className="text-text-secondary font-normal flex items-center gap-1 leading-none">• Sponsored</span>
                            ) : (
                                <span className="text-text-secondary font-normal leading-none">• {formatTime(currentPost.createdAt)}</span>
                            )}
                        </div>

                        {currentPost.location && <div className="text-[9px] text-text-secondary font-medium tracking-tight uppercase leading-none mt-0.5">{currentPost.location}</div>}
                    </div>
                </div>
                <button
                    onClick={() => setShowOptionsMenu(true)}
                    className="text-text-primary hover:opacity-60 transition-opacity p-1"
                >
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Image (Full width, no padding) */}
            <div className="w-full overflow-hidden border-y border-border relative bg-gray-50 dark:bg-neutral-900 group" onDoubleClick={handleDoubleTap}>
                <HeartOverlay visible={isAnimating} onAnimationEnd={() => setIsAnimating(false)} />
                {currentPost.mediaType === 'VIDEO' ? (
                    <video
                        key={getMediaUrl(currentPost.mediaUrl)}
                        src={getMediaUrl(currentPost.mediaUrl)}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full aspect-square object-contain bg-black block"
                        onError={(e) => {
                            // Sometimes simple retries or just letting the browser handle it is better than invasive replacement
                            console.error("Video Error:", getMediaUrl(currentPost.mediaUrl), e.target.error);
                            // Don't hide immediately, might be a transient network issue or format issue
                        }}
                    />
                ) : (
                    <div className="aspect-square w-full relative">
                        {(!currentPost.mediaUrl && !currentPost.imageUrl) ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800 text-gray-400">
                                <span className="text-sm italic">No media content</span>
                            </div>
                        ) : (
                            <img
                                src={getMediaUrl(currentPost.mediaUrl || currentPost.imageUrl)}
                                alt="Post content"
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    // Use a high-quality placeholder for broken images
                                    e.target.src = 'https://ui-avatars.com/api/?name=Post&background=f3f4f6&color=9ca3af&size=512&semibold=true&format=svg';
                                }}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between py-2 px-3">
                <div className="flex gap-4">
                    {/* Like */}
                    <button
                        onClick={toggleLike}
                        className={`cursor-pointer hover:opacity-60 transition-transform active:scale-125 ${isLiked ? 'text-like' : 'text-text-primary'}`}
                    >
                        <Heart size={22} fill={isLiked ? 'currentColor' : 'none'} className={isLiked && isAnimating ? 'animate-bounce' : ''} />
                    </button>

                    {/* Comment */}
                    <button
                        onClick={handleCommentClick}
                        disabled={currentPost.commentsDisabled}
                        className={`cursor-pointer hover:opacity-60 transition-opacity ${showComments ? 'text-text-primary opacity-50' : 'text-text-primary'} ${currentPost.commentsDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                        <MessageCircle size={22} />
                    </button>

                    {/* Share */}
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="cursor-pointer text-text-primary hover:opacity-60 transition-opacity"
                    >
                        <Send size={22} />
                    </button>
                </div>
                {/* Save/Bookmark */}
                <button
                    onClick={handleToggleSave}
                    disabled={saving}
                    className={`cursor-pointer hover:opacity-60 transition-all hover:scale-110 ${isSaved ? 'text-black dark:text-white' : 'text-text-primary'}`}
                >
                    <Bookmark size={22} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
            </div>

            {/* CTA Bar for Ads */}
            {currentPost.isAd && (
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/10 flex justify-between items-center cursor-pointer mb-2"
                    onClick={() => {
                        // Track Click
                        if (currentPost.trackClick) currentPost.trackClick();
                        window.open(currentPost.linkUrl || '#', '_blank');
                    }}>
                    <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">{currentPost.ctaText || 'Learn More'}</span>
                    <span className="text-blue-600 dark:text-blue-400">›</span>
                </div>
            )}

            {/* Likes */}
            {!currentPost.hideLikes && (
                <div className="font-semibold text-[13px] text-text-primary mb-1 px-3">
                    {likesCount.toLocaleString()} like{likesCount !== 1 ? 's' : ''}
                </div>
            )}


            {/* Caption */}
            <div className="px-3 pb-1.5">
                <span
                    className="font-semibold text-[13px] mr-2 cursor-pointer hover:text-gray-500"
                    onClick={() => navigate(`/profile/${currentPost.username}`)}
                >
                    {currentPost.username}
                </span>
                <span className="text-[13px] dropdown-caption leading-relaxed" dangerouslySetInnerHTML={{ __html: formatCaption(currentPost.caption) }} />
            </div>

            {/* Comments Section */}
            {!currentPost.commentsDisabled && !showComments && currentPost.commentsCount > 0 && (
                <div className="px-3 pb-2">
                    <button
                        onClick={handleCommentClick}
                        className="text-[13px] text-gray-500 hover:text-gray-400 cursor-pointer border-none bg-transparent"
                    >
                        View all {currentPost.commentsCount} comments
                    </button>
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

            {showReportModal && !currentPost.isAd && (
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
                    isAd={currentPost.isAd || false}
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
