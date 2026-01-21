import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
    reportPost, unfollowUser, deletePost, copyLink, favoriteUser,
    hideLikeCount, toggleComments, getEmbedCode
} from '../api/postActionsApi';

const PostOptionsMenu = ({
    post,
    isOwnPost,
    onClose,
    onDeleteSuccess,
    onEdit,
    onShare,
    onUpdatePost,
    onReport,
    isFollowing = false // New prop to determine if user is following the post owner
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
                onClose();
                return;
            case 'aboutAccount':
                navigate(`/profile/${post.username}`);
                onClose();
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
                    alert('Removed from favorites!');
                    onClose();
                    break;
                case 'hideLikes':
                    await hideLikeCount(post.id);
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
                    if (success) {
                        // Show a temporary success message
                        const msg = document.createElement('div');
                        msg.textContent = 'Link copied to clipboard';
                        msg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                        document.body.appendChild(msg);
                        setTimeout(() => msg.remove(), 2000);
                    }
                    onClose();
                    break;
                case 'embed':
                    try {
                        const embedData = await getEmbedCode(post.id);
                        // Copy embed code to clipboard
                        await navigator.clipboard.writeText(embedData.data.embedHtml);
                        const msg = document.createElement('div');
                        msg.textContent = 'Embed code copied to clipboard';
                        msg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                        document.body.appendChild(msg);
                        setTimeout(() => msg.remove(), 2000);
                    } catch (error) {
                        console.error('Embed failed:', error);
                        alert('Failed to get embed code');
                    }
                    onClose();
                    break;
                default:
                    console.warn('Unknown action', action);
                    onClose();
            }
        } catch (error) {
            console.error(`Action ${label} failed:`, error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
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
                {loading && (
                    <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-sm">Processing...</span>
                        </div>
                    </div>
                )}

                {isOwnPost ? (
                    <>
                        <ActionButton label="Delete" action="delete" color="text-[#ed4956]" isBold />
                        <ActionButton label="Edit" action="edit" />
                        <ActionButton label={post.hideLikes ? "Unhide like count" : "Hide like count"} action="hideLikes" />
                        <ActionButton label={post.commentsDisabled ? "Turn on commenting" : "Turn off commenting"} action="toggleComments" />
                        <ActionButton label="Go to post" action="goToPost" />
                        <ActionButton label="Share to..." action="share" />
                        <ActionButton label="Copy link" action="copyLink" />
                        <ActionButton label="Embed" action="embed" />
                        <ActionButton label="About this account" action="aboutAccount" />
                        <ActionButton label="Cancel" action="cancel" />
                    </>
                ) : (
                    <>
                        <ActionButton label="Report" action="report" color="text-[#ed4956]" isBold />
                        {isFollowing && <ActionButton label="Unfollow" action="unfollow" color="text-[#ed4956]" isBold />}
                        <ActionButton label="Remove from favorites" action="favorites" />
                        <ActionButton label="Go to post" action="goToPost" />
                        <ActionButton label="Share to..." action="share" />
                        <ActionButton label="Copy link" action="copyLink" />
                        <ActionButton label="Embed" action="embed" />
                        <ActionButton label="About this account" action="aboutAccount" />
                        <ActionButton label="Cancel" action="cancel" />
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default PostOptionsMenu;
