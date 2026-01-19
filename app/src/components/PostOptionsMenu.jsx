import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
    reportPost, unfollowUser, deletePost, copyLink, favoriteUser,
    hideLikeCount, toggleComments
} from '../api/postActionsApi';

const PostOptionsMenu = ({
    post,
    isOwnPost,
    onClose,
    onDeleteSuccess,
    onEdit,
    onShare,
    onUpdatePost, // To update local state like comment count, etc if changed
    onReport
}) => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !loading) {
                onClose();
            }
        };
        // ... existing escape logic ...
        const handleEscape = (event) => {
            if (event.key === 'Escape' && !loading) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, loading]);

    const handleAction = async (action, label) => {
        if (loading) return;

        switch (action) {
            case 'edit':
                onEdit();
                onClose();
                return;
            case 'share':
                onShare();
                onClose();
                return;
            case 'goToPost':
                navigate(`/post/${post.id}`);
                onClose(); // Close menu
                return;
            case 'cancel':
                onClose();
                return;
            default:
                break;
        }

        setLoading(true);
        try {
            switch (action) {
                case 'report':
                    if (onReport) onReport();
                    onClose();
                    break;
                case 'delete':
                    if (window.confirm('Delete this post? This cannot be undone.')) {
                        await deletePost(post.id);
                        if (onDeleteSuccess) onDeleteSuccess(post.id);
                        onClose();
                    }
                    break;
                case 'unfollow':
                    if (window.confirm(`Unfollow @${post.username}?`)) {
                        await unfollowUser(post.userId);
                        alert(`Unfollowed @${post.username}`);
                        onClose();
                    }
                    break;
                case 'favorites':
                    await favoriteUser(post.userId);
                    alert('Added to favorites!');
                    onClose();
                    break;
                case 'hideLikes':
                    await hideLikeCount(post.id);
                    // Update local post state if needed, or refresh?
                    // Ideally call onUpdatePost to toggle hideLikes
                    if (onUpdatePost) onUpdatePost({ ...post, hideLikes: !post.hideLikes });
                    onClose();
                    break;
                case 'toggleComments':
                    await toggleComments(post.id);
                    if (onUpdatePost) onUpdatePost({ ...post, commentsDisabled: !post.commentsDisabled });
                    onClose();
                    break;
                case 'copyLink':
                    const success = await copyLink(post.id);
                    if (success) alert('Link copied to clipboard.');
                    onClose();
                    break;
                default:
                    console.warn('Unknown action', action);
                    onClose();
            }
        } catch (error) {
            console.error(`Action ${label} failed:`, error);
            alert('Something went wrong. Please try again.');
            setLoading(false); // Only stop loading if error or not closing
        }
    };

    const ActionButton = ({ label, action, color = 'text-white', isBold = false }) => (
        <button
            onClick={() => handleAction(action, label)}
            disabled={loading}
            className={`w-full py-3.5 text-sm border-t border-[#363636] first:border-t-0 hover:bg-white/5 active:bg-white/10 transition-colors ${color} ${isBold ? 'font-bold' : 'font-normal'} disabled:opacity-50`}
        >
            {label}
        </button>
    );

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
            <div
                ref={menuRef}
                className="bg-[#262626] w-full max-w-[400px] rounded-xl flex flex-col items-center overflow-hidden shadow-2xl animate-zoom-in text-white"
            >
                {loading && <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">Processing...</div>}

                {isOwnPost ? (
                    <>
                        <ActionButton label="Delete" action="delete" color="text-[#ed4956]" isBold />
                        <ActionButton label="Edit" action="edit" />
                        <ActionButton label={post.hideLikes ? "Unhide like count" : "Hide like count"} action="hideLikes" />
                        <ActionButton label={post.commentsDisabled ? "Turn on commenting" : "Turn off commenting"} action="toggleComments" />
                        <ActionButton label="Go to post" action="goToPost" />
                        <ActionButton label="Share to..." action="share" />
                        <ActionButton label="Copy link" action="copyLink" />
                        <ActionButton label="Cancel" action="cancel" />
                    </>
                ) : (
                    <>
                        <ActionButton label="Report" action="report" color="text-[#ed4956]" isBold />
                        <ActionButton label="Unfollow" action="unfollow" color="text-[#ed4956]" isBold />
                        <ActionButton label="Add to favorites" action="favorites" />
                        <ActionButton label="Go to post" action="goToPost" />
                        <ActionButton label="Share to..." action="share" />
                        <ActionButton label="Copy link" action="copyLink" />
                        <ActionButton label="Cancel" action="cancel" />
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default PostOptionsMenu;
