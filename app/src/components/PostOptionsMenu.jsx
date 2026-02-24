import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
    reportPost, deletePost, copyLink,
    hideLikeCount, toggleComments, getEmbedCode
} from '../api/postActionsApi';
import { restrictUser, unrestrictUser } from '../api/userApi';
import { blockUser, unblockUser } from '../api/privacyApi';
import * as adApi from '../api/adApi';
import BlockConfirmModal from './BlockConfirmModal';
import { usePrivacy } from '../context/PrivacyContext';
import { useAuth } from '../context/AuthContext';

const PostOptionsMenu = ({
    post,
    isOwnPost,
    onClose,
    onDeleteSuccess,
    onEdit,
    onShare,
    onUpdatePost,
    onReport,
    isFollowing = false
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showBlockConfirm, setShowBlockConfirm] = useState(false);
    const { isUserBlocked, isUserRestricted, block, unblock, restrict, unrestrict } = usePrivacy();

    const isBlocked = post?.userId ? isUserBlocked(post.userId) : false;
    const isRestricted = post?.userId ? isUserRestricted(post.userId) : false;

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !loading && !showBlockConfirm) {
                onClose();
            }
        };
        const handleEscape = (event) => {
            if (event.key === 'Escape' && !loading && !showBlockConfirm) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, loading, showBlockConfirm]);

    const handleAction = async (action, label) => {
        if (loading) return;

        // Validations for actions requiring Auth or User ID
        const authActions = ['block', 'unblock', 'restrict', 'report', 'hideLikes', 'toggleComments', 'delete'];
        if (authActions.includes(action) && !user) {
            onClose();
            navigate('/login');
            return;
        }

        switch (action) {
            case 'edit':
                onEdit();
                onClose();
                return;
            case 'share':
                if (typeof onShare === 'function') {
                    onShare();
                } else {
                    console.warn('onShare prop missing or not a function in PostOptionsMenu');
                }
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
            case 'block':
                if (!post?.userId) {
                    console.error('Cannot block: userId missing', post);
                    alert('Cannot block this user');
                    onClose();
                    return;
                }
                setShowBlockConfirm(true);
                return;
            case 'cancel':
                onClose();
                return;
            default:
                break;
        }

        setLoading(true);
        try {
            // If it's an ad, restrict most post-service specific actions
            const isAd = post.isAd;

            switch (action) {
                case 'report':
                    if (isAd) {
                        await adApi.reportAd?.(post.id); // If implemented later
                        alert("Ad reported. Thank you for your feedback.");
                        onClose();
                        return;
                    }
                    if (onReport) onReport();
                    onClose();
                    break;
                case 'delete':
                    if (isAd) {
                        if (window.confirm('Delete this ad? This will remove it from the platform.')) {
                            try {
                                await adApi.deleteAd(post.id);
                            } catch (delErr) {
                                // 404 means already deleted — treat as success
                                if (delErr.response?.status !== 404) throw delErr;
                            }
                            if (onDeleteSuccess) onDeleteSuccess(post.id);
                            onClose();
                        }
                        return;
                    }
                    if (window.confirm('Delete this post? This cannot be undone.')) {
                        try {
                            await deletePost(post.id);
                        } catch (delErr) {
                            // 401 can happen when the post-service rejects after deletion on gateway
                            // 404 means post already deleted — both are fine to treat as success
                            const status = delErr.response?.status;
                            if (status !== 401 && status !== 404) {
                                console.error('Delete failed with unexpected status:', status);
                                alert('Failed to delete post. Please try again.');
                                onClose();
                                return;
                            }
                        }
                        // Success path — always navigate away after delete
                        if (onDeleteSuccess) onDeleteSuccess(post.id);
                        onClose();
                    }
                    break;

                case 'hideLikes':
                    if (isAd) {
                        await adApi.hideLikeCount(post.id);
                    } else {
                        await hideLikeCount(post.id);
                    }
                    if (onUpdatePost) onUpdatePost({ ...post, hideLikes: !post.hideLikes });
                    onClose();
                    break;
                case 'toggleComments':
                    if (isAd) {
                        await adApi.toggleComments(post.id);
                    } else {
                        await toggleComments(post.id);
                    }
                    if (onUpdatePost) onUpdatePost({ ...post, commentsDisabled: !post.commentsDisabled });
                    onClose();
                    break;
                case 'copyLink':
                    const success = await copyLink(post.id);
                    if (success) {
                        const msg = document.createElement('div');
                        msg.textContent = 'Link copied to clipboard';
                        msg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                        document.body.appendChild(msg);
                        setTimeout(() => msg.remove(), 2000);
                    }
                    onClose();
                    break;
                // block case removed from here

                case 'restrict':
                    if (isRestricted) {
                        await unrestrict(post.userId);
                        if (onUpdatePost) onUpdatePost({ ...post, isRestricted: false });
                        alert(`Unrestricted @${post.username}`);
                    } else {
                        if (window.confirm(`Restrict @${post.username}?`)) {
                            await restrict(post.userId);
                            if (onUpdatePost) onUpdatePost({ ...post, isRestricted: true });
                            alert(`Restricted @${post.username}`);
                        }
                    }
                    onClose();
                    break;
                case 'unblock':
                    await unblock(post.userId);
                    if (onUpdatePost) onUpdatePost({ ...post, isBlocked: false });
                    alert(`Unblocked @${post.username}`);
                    onClose();
                    break;
                case 'copyProfileUrl':
                    const profileUrl = `${window.location.origin}/profile/${post.username}`;
                    try {
                        if (navigator.clipboard && window.isSecureContext) {
                            await navigator.clipboard.writeText(profileUrl);
                        } else {
                            // Fallback for non-secure contexts
                            const textArea = document.createElement("textarea");
                            textArea.value = profileUrl;
                            textArea.style.position = "fixed";
                            textArea.style.left = "-999999px";
                            textArea.style.top = "-999999px";
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            document.execCommand('copy');
                            textArea.remove();
                        }
                        const msg = document.createElement('div');
                        msg.textContent = 'Link copied to clipboard';
                        msg.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#262626] text-white px-4 py-2 rounded-lg shadow-lg z-[200] animate-fade-in';
                        document.body.appendChild(msg);
                        setTimeout(() => msg.remove(), 2000);
                    } catch (err) {
                        console.error('Copy failed:', err);
                        alert('Failed to copy link');
                    }
                    onClose();
                    break;
                case 'embed':
                    try {
                        let embedData;
                        if (isAd) {
                            embedData = await adApi.getEmbedCode(post.id);
                        } else {
                            embedData = await getEmbedCode(post.id);
                        }
                        const textToCopy = embedData.data.embedHtml;

                        if (navigator.clipboard && window.isSecureContext) {
                            await navigator.clipboard.writeText(textToCopy);
                        } else {
                            const textArea = document.createElement("textarea");
                            textArea.value = textToCopy;
                            textArea.style.position = "fixed";
                            textArea.style.left = "-999999px";
                            textArea.style.top = "-999999px";
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            document.execCommand('copy');
                            textArea.remove();
                        }

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

    const handleBlockConfirm = async () => {
        if (!post?.userId) {
            alert('Error: User ID missing');
            setShowBlockConfirm(false);
            onClose();
            return;
        }
        try {
            if (isBlocked) {
                await unblock(post.userId);
                alert(`Unblocked @${post.username}`);
                if (onUpdatePost) onUpdatePost({ ...post, isBlocked: false });
            } else {
                await block(post.userId);
                alert(`Blocked @${post.username}`);
                if (onUpdatePost) onUpdatePost({ ...post, isBlocked: true });
                if (onDeleteSuccess) onDeleteSuccess(post.id); // Re-using this to remove post from view
            }
        } catch (error) {
            console.error('Block/Unblock failed', error);
            alert('Failed to update block status');
        } finally {
            setShowBlockConfirm(false);
            onClose(); // Close the main menu
        }
    };

    const ActionButton = ({ label, action, color = 'text-text-primary', isBold = false }) => (
        <button
            onClick={() => handleAction(action, label)}
            disabled={loading}
            className={`w-full py-3.5 text-sm border-t border-gray-200 dark:border-[#363636] first:border-t-0 hover:bg-gray-100 dark:hover:bg-white/5 active:bg-gray-200 dark:active:bg-white/10 transition-colors ${color} ${isBold ? 'font-bold' : 'font-normal'} disabled:opacity-50`}
        >
            {label}
        </button>
    );

    return ReactDOM.createPortal(
        <>
            {!showBlockConfirm && ( // Conditionally render the main menu
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
                    <div
                        ref={menuRef}
                        className="bg-white dark:bg-[#262626] w-full max-w-[400px] rounded-xl flex flex-col items-center overflow-hidden shadow-2xl animate-zoom-in text-black dark:text-white"
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
                                <ActionButton label={isBlocked ? "Unblock" : "Block"} action={isBlocked ? "unblock" : "block"} color="text-[#ed4956]" isBold />
                                <ActionButton label={isRestricted ? "Unrestrict" : "Restrict"} action="restrict" color="text-[#ed4956]" isBold />
                                <ActionButton label="Report" action="report" color="text-[#ed4956]" isBold />
                                <ActionButton label="Go to post" action="goToPost" />
                                <ActionButton label="Share to..." action="share" />
                                <ActionButton label="Copy link" action="copyLink" />
                                <ActionButton label="Embed" action="embed" />
                                <ActionButton label="About this account" action="aboutAccount" />
                                <ActionButton label="Copy profile URL" action="copyProfileUrl" />
                                <ActionButton label="Cancel" action="cancel" />
                            </>
                        )}
                    </div>
                </div>
            )}

            <BlockConfirmModal
                isOpen={showBlockConfirm}
                onClose={() => { setShowBlockConfirm(false); }} // Only close the modal, not the main menu yet
                onConfirm={handleBlockConfirm}
                username={post.username}
            />
        </>,
        document.body
    );
};

export default PostOptionsMenu;
