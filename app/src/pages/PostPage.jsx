import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Volume2, VolumeX, Music, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { fetchPostById, addComment, getComments } from '../api/postActionsApi';
import { savePost, unsavePost } from '../api/bookmarkApi';
import { usePostLikes } from '../hooks/usePostLikes';
import PostOptionsMenu from '../components/PostOptionsMenu';
import ShareModal from '../components/ShareModal';
import EditPostModal from '../components/EditPostModal';
import ReportModal from '../components/ReportModal';
import HeartOverlay from '../components/HeartOverlay';
import FollowButton from '../components/FollowButton';

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoFailed, setVideoFailed] = useState(false);
    const videoRef = useRef(null);

    // Navigation State
    const postMetadata = location.state?.postMetadata || [];
    const postIds = location.state?.postIds || postMetadata.map(m => m.id) || [];
    const [currentIndex, setCurrentIndex] = useState(location.state?.currentIndex ?? -1);

    // Sync current index
    useEffect(() => {
        if (postIds.length > 0 && (currentIndex === -1 || postIds[currentIndex] != id)) {
            const index = postIds.findIndex(pid => String(pid) === String(id));
            if (index !== -1) setCurrentIndex(index);
        }
    }, [id, postIds, currentIndex]);

    const navigateToPost = useCallback((newIndex) => {
        if (newIndex >= 0 && newIndex < postIds.length) {
            const nextId = postIds[newIndex];
            const nextType = postMetadata[newIndex]?.type || 'POST';
            navigate(`/post/${nextId}`, {
                state: { postMetadata, postIds, currentIndex: newIndex, type: nextType },
                replace: true
            });
        }
    }, [postIds, postMetadata, navigate]);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        if (currentIndex > 0) navigateToPost(currentIndex - 1);
    }, [currentIndex, navigateToPost]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        if (currentIndex < postIds.length - 1) navigateToPost(currentIndex + 1);
    }, [currentIndex, postIds.length, navigateToPost]);

    // Keyboard and Wheel Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        let lastWheelTime = 0;
        const handleWheel = (e) => {
            const now = Date.now();
            if (now - lastWheelTime < 1000) return;

            if (Math.abs(e.deltaY) > 50) {
                if (e.deltaY > 0) handleNext();
                else handlePrev();
                lastWheelTime = now;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [handlePrev, handleNext]);

    // Reset video failure on post change
    useEffect(() => {
        setVideoFailed(false);
    }, [id]);

    // Modals
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    // Likes Hook
    const {
        isLiked,
        likesCount,
        toggleLike,
        handleDoubleTap,
        isAnimating,
        setIsAnimating
    } = usePostLikes(post, (postId, isLiked, likesCount) => {
        setPost(prev => ({
            ...prev,
            isLiked,
            likesCount
        }));
    });

    // Fetch Data
    useEffect(() => {
        setLoading(true);
        setPost(null);
        const loadData = async () => {
            try {
                const response = await fetchPostById(id);
                const postData = response.data || response;

                if (postData) {
                    setPost(postData);
                    // Fetch comments (works for both posts and reels)
                    const commentsRes = await getComments(id);
                    setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
                }
            } catch (error) {
                console.error("Failed to load post/reel:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    // Bookmark
    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (post) setIsSaved(post.isSaved || false);
    }, [post]);

    const handleToggleSave = async () => {
        if (saving || !user) return;
        const prev = isSaved;
        setIsSaved(!prev);
        setSaving(true);
        try {
            if (!prev) await savePost(post.id, user.id, post.type || 'POST');
            else await unsavePost(post.id, user.id, post.type || 'POST');
        } catch (e) {
            setIsSaved(prev);
        } finally {
            setSaving(false);
        }
    };

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        // Handle bare filenames (likely R2/Media Service uploads)
        if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
            return `/api/v1/media/files/${url}`;
        }

        try {
            // Remove full origin if it matches any local IP/Port variations to make it relative
            const cleanedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');

            if (cleanedUrl !== url) {
                return cleanedUrl;
            }

            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) {
                    return `/api/v1/media/files/${parts[1]}`;
                }
            }

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

    const handleAddComment = async () => {
        if (!commentText.trim() || submittingComment) return;
        setSubmittingComment(true);
        try {
            const res = await addComment(post.id, commentText);
            setComments(prev => [...prev, res.data]);
            setCommentText('');
        } catch (error) {
            console.error("Failed to comment", error);
        } finally {
            setSubmittingComment(false);
        }
    };

    const togglePlay = async (e) => {
        e?.stopPropagation();
        if (videoRef.current) {
            try {
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                } else {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        await playPromise;
                    }
                    setIsPlaying(true);
                }
            } catch (err) {
                console.error("Playback error:", err);
                setIsPlaying(false);
            }
        }
    };

    const toggleMute = (e) => {
        e?.stopPropagation();
        setIsMuted(!isMuted);
    };

    // HLS Support
    useEffect(() => {
        if (post && (post.mediaType === 'VIDEO' || post.videoUrl)) {
            const video = videoRef.current;
            const videoUrl = getMediaUrl(post.mediaUrl || post.videoUrl);

            if (video && videoUrl && videoUrl.endsWith('.m3u8')) {
                let hls;
                import('hls.js').then((HlsModule) => {
                    const Hls = HlsModule.default;
                    if (Hls.isSupported()) {
                        hls = new Hls();
                        hls.loadSource(videoUrl);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            if (!isMuted) video.play().catch(() => { });
                        });
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = videoUrl;
                    }
                });

                return () => {
                    if (hls) hls.destroy();
                };
            }
        }
    }, [post, isMuted]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );

    if (!post) return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50 gap-4">
            <p className="text-xl font-semibold">Post not found</p>
            <button onClick={() => navigate(-1)} className="text-blue-500 font-medium">Go back</button>
        </div>
    );

    const isOwnPost = user && (user.id === post.userId || user.username === post.username);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
        return `${Math.floor(diffInSeconds / 604800)}w`;
    };

    return (
        <div className="flex h-screen bg-black/80 backdrop-blur-md items-center justify-center p-0 md:p-8 relative">
            {/* Close Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-4 right-4 z-50 text-white hover:opacity-70 transition-opacity"
            >
                <X size={32} />
            </button>

            {/* Navigation Arrows */}
            {currentIndex > 0 && (
                <button
                    onClick={handlePrev}
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-40 text-white p-2 hover:opacity-70 transition-opacity hidden md:block"
                >
                    <ChevronLeft size={48} strokeWidth={1.5} />
                </button>
            )}
            {currentIndex < postIds.length - 1 && (
                <button
                    onClick={handleNext}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-40 text-white p-2 hover:opacity-70 transition-opacity hidden md:block"
                >
                    <ChevronRight size={48} strokeWidth={1.5} />
                </button>
            )}

            <div className="flex w-full max-w-[1100px] h-full max-h-[90vh] glass shadow-2xl overflow-hidden rounded-lg border border-white/20 relative z-10">

                {/* LEFT: Media Section */}
                <div className="flex-1 bg-black flex items-center justify-center relative cursor-pointer" onClick={togglePlay} onDoubleClick={handleDoubleTap}>
                    <HeartOverlay visible={isAnimating} onAnimationEnd={() => setIsAnimating(false)} />

                    {(!videoFailed && (post.mediaType === 'VIDEO' || post.videoUrl)) ? (
                        <>
                            <video
                                key={post.id}
                                ref={videoRef}
                                src={getMediaUrl(post.mediaUrl || post.videoUrl)}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                poster={getMediaUrl(post.imageUrl || post.thumbnailUrl)}
                                onError={(e) => {
                                    const videoUrl = post.mediaUrl || post.videoUrl;
                                    const error = e.target.error;
                                    console.error("Video playback failed:", {
                                        url: videoUrl,
                                        proxiedUrl: getMediaUrl(videoUrl),
                                        errorCode: error?.code,
                                        errorMessage: error?.message,
                                        post: post
                                    });
                                    setVideoFailed(true);
                                }}
                            />

                            {/* Video Overlays */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    className="p-2 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
                                    onClick={toggleMute}
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>

                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                                    <div className="p-5 rounded-full bg-black/40 backdrop-blur-sm">
                                        <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <img
                            src={getMediaUrl(
                                videoFailed
                                    ? (post.imageUrl || post.thumbnailUrl || post.mediaUrl)
                                    : (post.mediaUrl || post.imageUrl)
                            )}
                            alt="Post"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                                console.warn("Image fallback failed for post:", post.id);
                                e.target.onerror = null;
                                e.target.src = 'https://ui-avatars.com/api/?name=Post&background=f3f4f6&color=9ca3af&size=512&semibold=true&format=svg';
                            }}
                        />
                    )}
                </div>

                {/* RIGHT: Sidebar Section */}
                <div className="w-[450px] flex flex-col bg-white/80 dark:bg-black/60 backdrop-blur-xl border-l border-white/20">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/20">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-full bg-secondary overflow-hidden cursor-pointer p-[1px] border border-border"
                                onClick={() => navigate(`/profile/${post.username}`)}
                            >
                                <img
                                    src={post.userAvatar ? getMediaUrl(post.userAvatar) : `https://ui-avatars.com/api/?name=${post.username}&background=random`}
                                    alt={post.username}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span
                                        className="text-text-primary font-semibold text-[14px] cursor-pointer hover:underline"
                                        onClick={() => navigate(`/profile/${post.username}`)}
                                    >
                                        {post.username}
                                    </span>
                                    {!isOwnPost && (
                                        <>
                                            <span className="text-text-secondary text-xs">•</span>
                                            <FollowButton
                                                userId={post.userId}
                                                initialIsFollowing={post.isFollowing}
                                                variant="text"
                                            />
                                        </>
                                    )}
                                </div>
                                {post.music && (
                                    <div className="flex items-center gap-1 opacity-80">
                                        <Music size={10} className="text-text-primary" />
                                        <span className="text-[11px] font-medium leading-none">{post.music || 'Original Audio'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={() => setShowOptionsMenu(true)} className="text-text-primary hover:opacity-50">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Content Section (Caption + Comments) */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {/* Caption Container */}
                        {post.caption && (
                            <div className="flex gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0">
                                    <img
                                        src={post.userAvatar ? getMediaUrl(post.userAvatar) : `https://ui-avatars.com/api/?name=${post.username}&background=random`}
                                        alt={post.username}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm leading-snug">
                                        <span className="font-semibold mr-2 cursor-pointer hover:underline" onClick={() => navigate(`/profile/${post.username}`)}>
                                            {post.username}
                                        </span>
                                        <span className="text-text-primary break-words">{post.caption}</span>
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-text-secondary text-[12px]">
                                        <span>{formatTime(post.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="flex flex-col gap-5">
                            {comments.map(comment => (
                                <div key={comment.id} className="flex gap-3 group">
                                    <div
                                        className="w-8 h-8 rounded-full bg-secondary overflow-hidden shrink-0 cursor-pointer"
                                        onClick={() => navigate(`/profile/${comment.username || comment.User?.username}`)}
                                    >
                                        <img
                                            src={comment.userAvatar ? getMediaUrl(comment.userAvatar) : comment.User?.profilePicture ? getMediaUrl(comment.User.profilePicture) : `https://ui-avatars.com/api/?name=${comment.username || 'User'}&background=random`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] leading-snug">
                                            <span
                                                className="font-semibold mr-2 cursor-pointer hover:underline"
                                                onClick={() => navigate(`/profile/${comment.username || comment.User?.username}`)}
                                            >
                                                {comment.username || comment.User?.username}
                                            </span>
                                            {comment.text}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-text-secondary uppercase tracking-tighter">
                                            <span>{formatTime(comment.createdAt)}</span>
                                            {comment.likesCount > 0 && <span>{comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}</span>}
                                            <button className="hover:text-text-primary transition-colors">Reply</button>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 scale-75">
                                        <Heart size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions & Footer */}
                    <div className="border-t border-white/20 p-4">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex gap-4">
                                <button
                                    onClick={toggleLike}
                                    className={`hover:opacity-50 transition-all ${isLiked ? 'text-[#ff3040] animate-in zoom-in duration-200' : 'text-text-primary'}`}
                                >
                                    <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} strokeWidth={isLiked ? 0 : 2} />
                                </button>
                                <button className="text-text-primary hover:opacity-50" onClick={() => document.getElementById('post-comment-input').focus()}>
                                    <MessageCircle size={24} />
                                </button>
                                <button onClick={() => setShowShareModal(true)} className="text-text-primary hover:opacity-50">
                                    <Send size={24} />
                                </button>
                            </div>
                            <button onClick={handleToggleSave} className="text-text-primary hover:opacity-50">
                                <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-0.5 mb-2">
                            <div className="text-[14px] font-bold text-text-primary">
                                {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
                            </div>
                            {comments.length > 0 && (
                                <div className="text-[13px] text-text-secondary font-medium">
                                    {comments.length.toLocaleString()} {comments.length === 1 ? 'comment' : 'comments'}
                                </div>
                            )}
                        </div>

                        <div className="text-text-secondary text-[10px] uppercase tracking-wide mb-3">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-3 border-t border-white/20 pt-3">
                            <button className="text-text-primary hover:opacity-50">
                                <svg aria-label="Emoji" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.552 1.266 5.402 5.402 0 0 0 8.085-.011 1 1 0 0 0-1.551-1.262ZM12 .5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .5Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                            </button>
                            <input
                                id="post-comment-input"
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent text-sm focus:outline-none text-text-primary placeholder-text-secondary"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                disabled={submittingComment}
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim() || submittingComment}
                                className="text-[#0095F6] text-sm font-semibold hover:text-blue-700 disabled:opacity-50 transition-colors"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {
                showOptionsMenu && (
                    <PostOptionsMenu
                        post={post}
                        isOwnPost={isOwnPost}
                        onClose={() => setShowOptionsMenu(false)}
                        onDeleteSuccess={() => navigate('/')}
                        onEdit={() => setShowEditModal(true)}
                        onShare={() => setShowShareModal(true)}
                        onUpdatePost={(updated) => setPost(prev => ({ ...prev, ...updated }))}
                        onReport={() => setShowReportModal(true)}
                    />
                )
            }
            {showReportModal && <ReportModal postId={post.id} onClose={() => setShowReportModal(false)} />}
            {
                showEditModal && (
                    <EditPostModal
                        post={post}
                        onClose={() => setShowEditModal(false)}
                        onUpdate={(caption) => setPost(prev => ({ ...prev, caption }))}
                    />
                )
            }
            {showShareModal && <ShareModal post={post} onClose={() => setShowShareModal(false)} />}
        </div >
    );
};

export default PostPage;
