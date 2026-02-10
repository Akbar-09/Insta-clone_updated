import { useState, useEffect, useContext, forwardRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { addComment } from '../../api/commentApi';
import * as adApi from '../../api/adApi';

const CommentInput = forwardRef(({ postId, isAd = false, onCommentAdded, replyingTo, onClearReply }, ref) => {
    const { user } = useContext(AuthContext);
    const [submitting, setSubmitting] = useState(false);
    const [textValue, setTextValue] = useState('');

    // Pre-fill username when replying
    useEffect(() => {
        if (replyingTo) {
            setTextValue(`@${replyingTo.username} `);
        }
    }, [replyingTo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!textValue.trim() || submitting || !user) return;

        setSubmitting(true);
        try {
            let res;
            const parentId = replyingTo?.id;

            if (isAd) {
                res = await adApi.addComment(postId, textValue, parentId);
            } else {
                res = await addComment(postId, textValue, user, parentId);
            }

            setTextValue('');
            if (onClearReply) onClearReply();

            if (onCommentAdded) {
                const commentData = res.data?.data || res.data || res;
                onCommentAdded({
                    ...commentData,
                    username: user.username,
                    profileImage: user.profileImage || user.avatarUrl
                });
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            // alert("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col border-t border-border">
            {replyingTo && (
                <div className="flex items-center justify-between px-4 py-1.5 bg-gray-50 dark:bg-neutral-900 border-b border-border">
                    <span className="text-xs text-text-secondary">
                        Replying to <span className="font-semibold text-text-primary">@{replyingTo.username}</span>
                    </span>
                    <button
                        onClick={onClearReply}
                        className="text-text-secondary hover:text-text-primary p-0.5"
                    >
                        <svg aria-label="Close" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="12" role="img" viewBox="0 0 24 24" width="12">
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="21" x2="3" y1="3" y2="21"></line>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="21" x2="3" y1="21" y2="3"></line>
                        </svg>
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center px-4 py-3">
                {/* Simple smiley icon placeholder for emoji picker if needed later */}
                <div className="mr-3 cursor-pointer">
                    <svg aria-label="Emoji" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                    </svg>
                </div>
                <input
                    ref={ref}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-grow bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                />
                {textValue.trim().length > 0 && (
                    <button
                        type="submit"
                        disabled={submitting}
                        className="ml-2 font-semibold text-blue-500 hover:text-blue-700 text-sm transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Post
                    </button>
                )}
            </form>
        </div>
    );
});

CommentInput.displayName = 'CommentInput';

export default CommentInput;
