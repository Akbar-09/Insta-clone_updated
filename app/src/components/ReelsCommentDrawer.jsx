import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getComments, addComment, likeComment, unlikeComment } from '../api/commentApi';
import EmojiPicker from './messages/EmojiPicker';
import StickerPicker from './messages/StickerPicker';
import { Sticker } from 'lucide-react';

const ReelsCommentDrawer = ({ postId, onClose, currentUser, onCommentAdded, variant = 'drawer' }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showStickerPicker, setShowStickerPicker] = useState(false);

    const commentsEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) return;
            setLoading(true);
            try {
                const res = await getComments(postId);
                // The API returns { status: 'success', data: [...] }
                const commentsData = res.data || (Array.isArray(res) ? res : []);
                setComments(commentsData);
            } catch (error) {
                console.error('Failed to load comments', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async (e, sticker = null) => {
        if (e) e.preventDefault();

        const text = sticker ? 'Sent a sticker' : newComment;
        if (!text.trim() && !sticker) return;
        if (submitting) return;

        setSubmitting(true);
        try {
            const extra = {
                type: sticker ? 'sticker' : 'text',
                mediaUrl: sticker ? sticker.url : null,
                targetType: 'reel'
            };
            const parentId = replyingTo?.id;

            const res = await addComment(postId, text, currentUser, parentId, extra);
            const addedComment = res.data || res;

            // Construct comment for state
            const commentState = {
                ...addedComment,
                username: currentUser.username,
                userAvatar: currentUser.profilePicture
            };

            setComments(prev => [...prev, commentState]);
            setNewComment('');
            setReplyingTo(null);
            setShowEmojiPicker(false);

            if (onCommentAdded) onCommentAdded();

            setTimeout(() => {
                commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Failed to add comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEmojiSelect = (emoji) => {
        setNewComment(prev => prev + emoji);
        inputRef.current?.focus();
    };

    const handleReply = (comment) => {
        setReplyingTo(comment);
        setNewComment(`@${comment.username} `);
        inputRef.current?.focus();
    };

    const handleLikeComment = async (commentId, isLiked) => {
        try {
            if (isLiked) {
                await unlikeComment(commentId, currentUser.id);
            } else {
                await likeComment(commentId, currentUser.id);
            }
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

    // Organize comments: Parents followed by their replies
    const organizedComments = (() => {
        const parents = comments.filter(c => !c.parentId);
        const replies = comments.filter(c => c.parentId);
        const result = [];
        parents.forEach(p => {
            result.push(p);
            replies.filter(r => String(r.parentId) === String(p.id)).forEach(r => result.push(r));
        });
        // Catch any orphans
        const resultIds = result.map(c => c.id);
        replies.filter(r => !resultIds.includes(r.id)).forEach(r => result.push(r));
        return result;
    })();

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
                ) : organizedComments.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm">
                        No comments yet. Start the conversation.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {organizedComments.map((comment) => (
                            <div key={comment.id} className={`flex gap-3 ${comment.parentId ? 'ml-8' : ''}`}>
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
                                    {comment.type === 'sticker' ? (
                                        <div className="w-20 h-20 my-1">
                                            <img src={comment.mediaUrl} alt="sticker" className="w-full h-full object-contain" />
                                        </div>
                                    ) : (
                                        <p className="text-gray-800 dark:text-white text-[13px] mt-0.5 leading-snug">{comment.text}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-1">
                                        {comment.likesCount > 0 && (
                                            <span className="text-xs text-gray-400 font-medium">{comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}</span>
                                        )}
                                        <button
                                            onClick={() => handleReply(comment)}
                                            className="text-[11px] text-gray-500 font-semibold hover:text-gray-700 dark:hover:text-gray-300"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-1.5 overflow-visible">
                                    <button
                                        className="text-gray-400 hover:opacity-70 transition-colors"
                                        onClick={() => handleLikeComment(comment.id, comment.isLiked)}
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
            <div className="p-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1a1a] flex flex-col gap-2 relative">
                {replyingTo && (
                    <div className="px-3 py-1 flex justify-between items-center bg-gray-50 dark:bg-black/20 text-[11px] text-gray-500 border-l-2 border-blue-500 mb-1">
                        <span>Replying to {replyingTo.username}</span>
                        <button onClick={() => { setReplyingTo(null); setNewComment(''); }} className="hover:text-black dark:hover:text-white">
                            <X size={12} />
                        </button>
                    </div>
                )}

                {showEmojiPicker && (
                    <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
                )}

                {showStickerPicker && (
                    <StickerPicker
                        onSelect={(sticker) => {
                            handleAddComment(null, sticker);
                            setShowStickerPicker(false);
                        }}
                        onClose={() => setShowStickerPicker(false)}
                    />
                )}

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                        <img
                            src={currentUser?.profilePicture || `https://ui-avatars.com/api/?name=${currentUser?.username || 'You'}&background=random`}
                            alt="You"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <form onSubmit={handleAddComment} className="flex-1 flex items-center bg-gray-50 dark:bg-[#262626] rounded-full px-4 py-2 border border-gray-200 dark:border-white/10 focus-within:border-gray-400 transition-colors">
                        <button
                            type="button"
                            className={`mr-2 hover:opacity-70 ${showEmojiPicker ? 'text-[#0095F6]' : 'text-gray-400'}`}
                            onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickerPicker(false); }}
                        >
                            <Smile size={20} />
                        </button>
                        <button
                            type="button"
                            className={`mr-2 hover:opacity-70 ${showStickerPicker ? 'text-[#0095F6]' : 'text-gray-400'}`}
                            onClick={() => { setShowStickerPicker(!showStickerPicker); setShowEmojiPicker(false); }}
                        >
                            <Sticker size={20} />
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Add a comment..."
                            className="bg-transparent text-black dark:text-white text-[13px] w-full focus:outline-none placeholder-gray-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={submitting}
                        />
                        <div className="flex items-center gap-2">
                            {newComment.trim() && (
                                <button
                                    type="submit"
                                    className="text-[#0095F6] text-xs font-semibold hover:text-blue-600"
                                    disabled={submitting}
                                >
                                    Post
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
