import { useState, useContext, forwardRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { addComment } from '../../api/commentApi';

const CommentInput = forwardRef(({ postId, onCommentAdded }, ref) => {
    const { user } = useContext(AuthContext); // Get user from context
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || submitting || !user) return; // Check user

        setSubmitting(true);
        try {
            const newComment = await addComment(postId, text, user); // Pass user object
            setText('');
            if (onCommentAdded) {
                onCommentAdded(newComment.data || newComment); // Adjust based on actual API response structure
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            alert("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center border-t border-border px-4 py-3">
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
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {text.trim().length > 0 && (
                <button
                    type="submit"
                    disabled={submitting}
                    className="ml-2 font-semibold text-blue-500 hover:text-blue-700 text-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                    Post
                </button>
            )}
        </form>
    );
});

CommentInput.displayName = 'CommentInput';

export default CommentInput;
