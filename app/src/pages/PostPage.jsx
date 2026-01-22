import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { fetchPostById, addComment, getComments } from '../api/postActionsApi';
import { savePost, unsavePost } from '../api/bookmarkApi';
import { usePostLikes } from '../hooks/usePostLikes'; // Reuse hook
import PostOptionsMenu from '../components/PostOptionsMenu';
import ShareModal from '../components/ShareModal';
import EditPostModal from '../components/EditPostModal';
import ReportModal from '../components/ReportModal';
import HeartOverlay from '../components/HeartOverlay';

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // For navigation
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    // Modals
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    // Likes Hook (initialized with null, updated when post loads)
    const {
        isLiked,
        likesCount,
        toggleLike,
        handleDoubleTap,
        isAnimating,
        setIsAnimating,
        syncPostLike
    } = usePostLikes(post, (postId, isLiked, likesCount) => {
        setPost(prev => ({
            ...prev,
            isLiked,
            likesCount
        }));
    });

    // Fetch Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchPostById(id);
                setPost(response.data || response);

                // Fetch full comments
                const commentsRes = await getComments(id);
                setComments(Array.isArray(commentsRes.data) ? commentsRes.data : []);
            } catch (error) {
                console.error("Failed to load post", error);
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
            if (!prev) await savePost(post.id, user.id);
            else await unsavePost(post.id, user.id);
        } catch (e) {
            setIsSaved(prev);
        } finally {
            setSaving(false);
        }
    };

    // Add Comment
    const handleAddComment = async () => {
        if (!commentText.trim() || submittingComment) return;
        setSubmittingComment(true);
        try {
            const res = await addComment(post.id, commentText);
            // Append new comment
            setComments(prev => [...prev, res.data]);
            setCommentText('');
            // Scroll to bottom optionally?
        } catch (error) {
            console.error("Failed to comment", error);
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
    if (!post) return <div className="flex justify-center items-center h-screen bg-black text-white">Post not found</div>;

    const isOwnPost = user && (user.id === post.userId || user.username === post.username);

    // Helpers
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
    };

    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http')) return url;
        return url;
    };

    return (
        <div className="flex h-screen bg-black items-center justify-center p-4 md:p-8">
            <div className="flex w-full max-w-6xl h-full max-h-[90vh] bg-black border border-[#262626] rounded-r-lg overflow-hidden">

                {/* LEFT: Media */}
                <div className="flex-1 bg-black flex items-center justify-center relative border-r border-[#262626]" onDoubleClick={handleDoubleTap}>
                    <HeartOverlay visible={isAnimating} onAnimationEnd={() => setIsAnimating(false)} />
                    {post.mediaType === 'VIDEO' ? (
                        <video
                            src={getMediaUrl(post.mediaUrl)}
                            controls
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted // Start muted to avoid autoplay blocks, user can unmute
                        />
                    ) : (
                        <img src={getMediaUrl(post.mediaUrl || post.imageUrl)} alt="Post" className="max-w-full max-h-full object-contain" />
                    )}
                </div>

                {/* RIGHT: Details & Comments */}
                <div className="w-[400px] flex flex-col bg-black">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[#262626]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                                {post.userAvatar && <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />}
                            </div>
                            <span className="text-white font-semibold text-sm cursor-pointer hover:opacity-70" onClick={() => navigate(`/profile/${post.userId}`)}>
                                {post.username}
                            </span>
                        </div>
                        <button onClick={() => setShowOptionsMenu(true)} className="text-white hover:opacity-70">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Scrollable Comments */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {/* Caption */}
                        {post.caption && (
                            <div className="flex gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                                    {post.userAvatar && <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />}
                                </div>
                                <div>
                                    <span className="text-white font-semibold text-sm mr-2 cursor-pointer" onClick={() => navigate(`/profile/${post.userId}`)}>
                                        {post.username}
                                    </span>
                                    <span className="text-white text-sm">{post.caption}</span>
                                    <div className="text-gray-500 text-xs mt-2 uppercase">
                                        {formatTime(post.createdAt)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Comments List */}
                        {Array.isArray(comments) && comments.map(comment => (
                            <div key={comment.id} className="flex gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${comment.userId || comment.User?.id}`)}>
                                    {/* Avatar handling */}
                                    <div className="w-full h-full bg-gray-600"></div>
                                </div>
                                <div className="flex-1">
                                    <span className="text-white font-semibold text-sm mr-2 cursor-pointer" onClick={() => navigate(`/profile/${comment.userId}`)}>
                                        {comment.username || comment.User?.username || 'User'}
                                    </span>
                                    <span className="text-white text-sm">{comment.text}</span>
                                    {/* <button className="block text-gray-500 text-xs mt-1 hover:text-gray-300">Reply</button> */}
                                </div>
                                <button className="text-gray-500 hover:text-gray-300">
                                    <Heart size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Actions Footer */}
                    <div className="border-t border-[#262626] p-4 pb-2 bg-black z-10">
                        <div className="flex justify-between mb-2">
                            <div className="flex gap-4">
                                <button onClick={toggleLike} className={`hover:opacity-60 active:scale-125 transition-transform ${isLiked ? 'text-red-600' : 'text-white'}`}>
                                    <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} className={isLiked && isAnimating ? 'animate-bounce' : ''} />
                                </button>
                                <button className="text-white hover:opacity-60" onClick={() => document.getElementById('comment-input').focus()}>
                                    <MessageCircle size={24} />
                                </button>
                                <button onClick={() => setShowShareModal(true)} className="text-white hover:opacity-60">
                                    <Send size={24} />
                                </button>
                            </div>
                            <button onClick={handleToggleSave} className={`hover:opacity-60 hover:scale-110 transition-all ${isSaved ? 'text-white' : 'text-white'}`}>
                                <Bookmark size={24} fill={isSaved ? 'white' : 'none'} />
                            </button>
                        </div>
                        <div className="text-white font-semibold text-sm mb-1">
                            {likesCount.toLocaleString()} likes
                        </div>
                        <div className="text-gray-500 text-xs uppercase mb-3">
                            {formatTime(post.createdAt)}
                        </div>

                        {/* Comment Input */}
                        <div className="border-t border-[#262626] pt-3 flex items-center">
                            <input
                                id="comment-input"
                                type="text"
                                placeholder="Add a comment..."
                                className="bg-transparent !text-white text-sm w-full focus:outline-none placeholder-gray-500"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                disabled={submittingComment}
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim() || submittingComment}
                                className="text-[#0095F6] text-sm font-semibold hover:text-white disabled:opacity-50 disabled:cursor-default ml-2"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {showOptionsMenu && (
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
                )}
                {showReportModal && (
                    <ReportModal
                        postId={post.id}
                        onClose={() => setShowReportModal(false)}
                    />
                )}
                {showEditModal && (
                    <EditPostModal
                        post={post}
                        onClose={() => setShowEditModal(false)}
                        onUpdate={(caption) => setPost(prev => ({ ...prev, caption }))}
                    />
                )}
                {showShareModal && (
                    <ShareModal
                        post={post}
                        onClose={() => setShowShareModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default PostPage;
