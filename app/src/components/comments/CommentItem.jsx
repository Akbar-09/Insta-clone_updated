import { useState, useContext } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { likeComment, unlikeComment, deleteComment } from '../../api/commentApi';
import * as adApi from '../../api/adApi';

const CommentItem = ({ comment, postId, isAd = false, onDelete, onReply }) => {
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(comment.isLiked || false);
    const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
    const [isHovered, setIsHovered] = useState(false);

    const isOwner = user?.id === comment.userId || user?.userId === comment.userId;
    const commentContent = comment.text || comment.content; // Fallback for different models

    const handleLikeToggle = async () => {
        if (isAd) return; // Not supporting comment likes for ads yet
        const newLiked = !liked;
        // Optimistic update
        setLiked(newLiked);
        setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

        try {
            if (newLiked) {
                await likeComment(comment.id, user.id);
            } else {
                await unlikeComment(comment.id, user.id);
            }
        } catch (error) {
            // Revert on error
            setLiked(!newLiked);
            setLikesCount(prev => !newLiked ? prev + 1 : prev - 1);
            console.error("Failed to toggle like on comment", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                if (isAd) {
                    await adApi.deleteComment(postId, comment.id);
                } else {
                    await deleteComment(postId, comment.id);
                }
                onDelete(comment.id);
            } catch (error) {
                console.error("Failed to delete comment", error);
                alert("Failed to delete comment");
            }
        }
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d`;
        return `${Math.floor(days / 7)}w`;
    };

    return (
        <div
            className={`flex justify-between items-start py-2 group ${comment.parentId ? 'ml-10' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-start gap-3 w-full max-w-[90%]">
                <img
                    src={comment.userAvatar || `https://ui-avatars.com/api/?name=${comment.username}&background=random`}
                    alt={comment.username}
                    className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
                />
                <div className="flex flex-col">
                    <div className="text-sm">
                        <span className="font-semibold text-text-primary mr-2 cursor-pointer">{comment.username}</span>
                        <span className="text-text-primary whitespace-pre-wrap break-words">{commentContent}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                        <span>{formatTimeAgo(comment.createdAt)}</span>
                        {likesCount > 0 && (
                            <span className="font-semibold">{likesCount} like{likesCount !== 1 && 's'}</span>
                        )}
                        <span
                            onClick={onReply ? () => onReply(comment) : undefined}
                            className="cursor-pointer hover:text-text-primary"
                        >
                            Reply
                        </span>
                        {isOwner && isHovered && (
                            <button onClick={handleDelete} className="ml-2 text-text-secondary hover:text-red-500 transition-colors">
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {!isAd && (
                <button
                    onClick={handleLikeToggle}
                    className={`pt-1 hover:opacity-60 transition-opacity ${liked ? 'text-red-500' : 'text-text-secondary'}`}
                >
                    <Heart size={12} fill={liked ? 'currentColor' : 'none'} />
                </button>
            )}
        </div>
    );
};

export default CommentItem;
