import { useState, useEffect, useRef } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { getComments, addComment, likeComment, unlikeComment } from '../api/commentApi';
import { useNavigate } from 'react-router-dom';

const ReelsCommentDrawer = ({ postId, onClose, currentUser, onCommentAdded, variant = 'drawer' }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const commentsEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;
            setLoading(true);
            try {
                const data = await getComments(postId);
                setComments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to load comments', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || submitting) return;

        setSubmitting(true);
        try {
            const addedComment = await addComment(postId, newComment, currentUser);

            // Construct comment for state with fallbacks in case API response is partial
            const commentState = {
                ...addedComment.data,
                id: addedComment.data?.id || addedComment.id || Date.now(),
                text: addedComment.data?.text || addedComment.text || newComment, // Fallback to input text
                createdAt: addedComment.data?.createdAt || addedComment.createdAt || new Date().toISOString(),
                username: addedComment.data?.username || addedComment.username || currentUser.username,
                userAvatar: addedComment.data?.userAvatar || addedComment.userAvatar || currentUser.profilePicture
            };

            setComments(prev => [...prev, commentState]);
            setNewComment('');
            if (onCommentAdded) onCommentAdded();
            // Scroll to bottom
            setTimeout(() => {
                commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Failed to add comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLikeComment = async (commentId, isLiked, likesCount) => {
        try {
            if (isLiked) {
                await unlikeComment(commentId, currentUser.id);
            } else {
                await likeComment(commentId, currentUser.id);
            }
            // Refresh comments or manually toggle in state
            setComments(prev => prev.map(c => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        isLiked: !isLiked,
                        likesCount: isLiked ? Math.max(0, (c.likesCount || 0) - 1) : (c.likesCount || 0) + 1
                    };
                }
                return c;
            }));
        } catch (error) {
            console.error("Failed to toggle like on comment", error);
        }
    };

    const isInline = variant === 'inline';

    return (
        <div className={`
            ${isInline ? 'w-[400px] h-full relative rounded-xl' : 'absolute bottom-0 left-0 w-full h-[70vh] rounded-t-2xl z-[60]'} 
            bg-white dark:bg-[#1a1a1a] flex flex-col shadow-2xl animate-in fade-in duration-300
        `}>
            {/* Header */}
            <div className="flex items-center p-3 border-b border-gray-100 dark:border-white/10 relative">
                <button
                    onClick={onClose}
                    className="text-black dark:text-white hover:opacity-70 z-10"
                >
                    <X size={20} />
                </button>
                <div className="absolute inset-x-0 text-center">
                    <h3 className="text-black dark:text-white font-semibold text-sm">Comments</h3>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {loading ? (
                    <div className="flex justify-center mt-10">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 dark:border-white"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm">
                        No comments yet. Start the conversation.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0 cursor-pointer"
                                    onClick={() => navigate(`/profile/${comment.username}`)}
                                >
                                    <img
                                        src={comment.userAvatar || comment.User?.profilePicture || `https://ui-avatars.com/api/?name=${comment.username || 'User'}&background=random`}
                                        alt={comment.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-black dark:text-white text-xs font-semibold cursor-pointer hover:underline"
                                            onClick={() => navigate(`/profile/${comment.username}`)}
                                        >
                                            {comment.username || comment.User?.username}
                                        </span>
                                        <span className="text-gray-400 text-[10px]">1w</span>
                                    </div>
                                    <p className="text-gray-800 dark:text-white text-[13px] mt-0.5 leading-snug">{comment.text}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        {comment.likesCount > 0 && (
                                            <span className="text-xs text-gray-400 font-medium">{comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}</span>
                                        )}
                                        <button className="text-[11px] text-gray-500 font-semibold hover:text-gray-700 dark:hover:text-gray-300">Reply</button>
                                    </div>
                                </div>
                                <div className="pt-1.5 overflow-visible">
                                    <button
                                        className="text-gray-400 hover:opacity-70 transition-colors"
                                        onClick={() => handleLikeComment(comment.id, comment.isLiked, comment.likesCount)}
                                    >
                                        <Heart
                                            size={12}
                                            fill={comment.isLiked ? "#ed4956" : "none"}
                                            color={comment.isLiked ? "#ed4956" : "gray"}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div ref={commentsEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1a1a] flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                        <img
                            src={currentUser?.profilePicture || `https://ui-avatars.com/api/?name=${currentUser?.username || 'You'}&background=random`}
                            alt="You"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <form onSubmit={handleAddComment} className="flex-1 flex items-center bg-gray-50 dark:bg-[#262626] rounded-full px-4 py-2 border border-gray-200 dark:border-white/10 focus-within:border-gray-400 transition-colors">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="bg-transparent text-black dark:text-white text-[13px] w-full focus:outline-none placeholder-gray-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={submitting}
                        />
                        <div className="flex items-center gap-2">
                            {newComment.trim() ? (
                                <button
                                    type="submit"
                                    className="text-[#0095F6] text-xs font-semibold hover:text-blue-600"
                                    disabled={submitting}
                                >
                                    Post
                                </button>
                            ) : (
                                <button type="button" className="text-gray-400 hover:opacity-70">
                                    <svg aria-label="Emoji" color="currentColor" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.552 1.266 5.402 5.402 0 0 0 8.085-.011 1 1 0 0 0-1.551-1.262ZM12 .5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .5Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReelsCommentDrawer;
