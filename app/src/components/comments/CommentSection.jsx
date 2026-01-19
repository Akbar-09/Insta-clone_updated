import { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { getComments } from '../../api/commentApi';

const CommentSection = ({ postId, initialCount = 0, initialComments = [], isExpanded = false, onToggle, inputRef }) => {
    const [comments, setComments] = useState(initialComments);
    const [loading, setLoading] = useState(false);
    const [internalExpanded, setInternalExpanded] = useState(false);
    const [commentCount, setCommentCount] = useState(initialCount);
    const [fetchedOnce, setFetchedOnce] = useState(false);

    // Controlled or uncontrolled toggle state
    // If isExpanded is passed (and controlled by parent), use it. But here we interpret `isExpanded` as "is it currently forced open by parent?"
    // Actually, usually controlled components use `isExpanded` + `onToggle`. Use internal state if `isExpanded` is undefined.
    // However, the prompt implies toggle behavior.
    const showComments = isExpanded || internalExpanded;

    const toggleExpand = () => {
        if (onToggle) {
            onToggle(!showComments);
        } else {
            setInternalExpanded(!showComments);
        }
    };

    // Fetch comments only when expanded
    useEffect(() => {
        if (showComments && !fetchedOnce) {
            fetchComments();
        }
    }, [showComments, fetchedOnce]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getComments(postId);
            if (data.status === 'success') {
                setComments(data.data);
                setFetchedOnce(true);
            }
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCommentAdded = (newComment) => {
        setComments(prev => [...prev, newComment]);
        setCommentCount(prev => prev + 1);
        if (!showComments) {
            if (onToggle) onToggle(true);
            else setInternalExpanded(true);
            setFetchedOnce(true);
        }
    };

    const handleCommentDeleted = (commentId) => {
        setComments(prev => prev.filter(c => c.id !== commentId));
        setCommentCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="flex flex-col">
            {/* View all comments toggle */}
            {commentCount > 0 && !showComments && (
                <button
                    onClick={toggleExpand}
                    className="px-4 pb-1 pt-1 text-sm text-text-secondary cursor-pointer border-none bg-transparent hover:text-text-primary text-left"
                >
                    View all {commentCount} comments
                </button>
            )}

            {/* Comments List */}
            {showComments && (
                <div className="px-4 py-2 flex flex-col gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                postId={postId}
                                onDelete={handleCommentDeleted}
                            />
                        ))
                    )}
                    {/* Hide toggle if open */}
                    <button
                        onClick={toggleExpand}
                        className="text-xs text-text-secondary mt-2 hover:text-text-primary self-start cursor-pointer"
                    >
                        Hide comments
                    </button>
                </div>
            )}

            {/* Input */}
            <CommentInput ref={inputRef} postId={postId} onCommentAdded={handleCommentAdded} />
        </div>
    );
};

export default CommentSection;
