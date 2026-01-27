import { useState, useEffect, useRef } from 'react';
import { X, Heart, Send } from 'lucide-react';
import { getComments, addComment, likeComment, unlikeComment } from '../api/commentApi';
import { useNavigate } from 'react-router-dom';

const ReelsCommentDrawer = ({ postId, onClose, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const commentsEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(postId);
                setComments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to load comments', error);
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || submitting) return;

        setSubmitting(true);
        try {
            const addedComment = await addComment(postId, newComment, currentUser);

            // Construct comment for state with fallbacks in case API response is partial
            const commentState = {
                ...addedComment,
                id: addedComment.id || Date.now(),
                text: addedComment.text || newComment, // Fallback to input text
                createdAt: addedComment.createdAt || new Date().toISOString(),
                username: addedComment.username || currentUser.username,
                userAvatar: addedComment.userAvatar || currentUser.profilePicture
            };

            setComments(prev => [...prev, commentState]);
            setNewComment('');
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
        // Optimistic update would be ideal here if we had state for it per comment. 
        // For now, implementing basic toggle relying on API response or local toggle if API returns updated object.
        // Since the comment object structure might vary, let's keep it simple or expand if needed.
        // Assuming we can't easily optimistic update without a complex reducer or state map.
        // We will just call the API.
        try {
            if (isLiked) {
                await unlikeComment(commentId, currentUser.id);
            } else {
                await likeComment(commentId, currentUser.id);
            }
            // Refresh comments or manually toggle in state
            // A simple re-fetch or manual update:
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

    return (
        <div className="absolute bottom-0 left-0 w-full h-[70vh] bg-[#1a1a1a] rounded-t-2xl z-[60] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-semibold mx-auto">Comments</h3>
                <button onClick={onClose} className="absolute right-4 text-white hover:opacity-70">
                    <X size={24} />
                </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {loading ? (
                    <div className="flex justify-center mt-10">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 text-sm">
                        No comments yet. Start the conversation.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shrink-0 cursor-pointer"
                                    onClick={() => navigate(`/profile/${comment.userId}`)}
                                >
                                    <img
                                        src={comment.userAvatar || comment.User?.profilePicture || 'https://via.placeholder.com/150'}
                                        alt={comment.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span
                                            className="text-white text-xs font-semibold cursor-pointer hover:underline"
                                            onClick={() => navigate(`/profile/${comment.userId}`)}
                                        >
                                            {comment.username || comment.User?.username}
                                        </span>
                                        <span className="text-gray-400 text-[10px]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-white text-sm mt-0.5 leading-snug">{comment.text}</p>
                                    <button className="text-xs text-gray-500 font-semibold mt-1 hover:text-gray-300">Reply</button>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 pt-1">
                                    <button
                                        className="text-gray-500 hover:opacity-70"
                                        onClick={() => handleLikeComment(comment.id, comment.isLiked, comment.likesCount)}
                                    >
                                        <Heart
                                            size={12}
                                            fill={comment.isLiked ? "#ed4956" : "none"}
                                            color={comment.isLiked ? "#ed4956" : "gray"}
                                        />
                                    </button>
                                    {comment.likesCount > 0 && (
                                        <span className="text-[10px] text-gray-500">{comment.likesCount}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={commentsEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-[#1a1a1a] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shrink-0">
                    <img
                        src={currentUser?.profilePicture || 'https://via.placeholder.com/150'}
                        alt="You"
                        className="w-full h-full object-cover"
                    />
                </div>
                <form onSubmit={handleAddComment} className="flex-1 flex items-center bg-[#262626] rounded-full px-4 py-2 border border-white/10 focus-within:border-white/30 transition-colors">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-500"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={submitting}
                    />
                    {newComment.trim() && (
                        <button
                            type="submit"
                            className="text-[#0095F6] text-sm font-semibold hover:text-white ml-2"
                            disabled={submitting}
                        >
                            Post
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ReelsCommentDrawer;
