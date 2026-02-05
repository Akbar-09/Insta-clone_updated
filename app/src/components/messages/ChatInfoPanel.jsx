import React, { useState, useEffect } from 'react';
import { X, Bell, BellOff, Info, UserMinus, ShieldAlert, Trash2, ChevronRight } from 'lucide-react';
import { getConversationDetails, toggleMute, deleteConversation, blockUser, unblockUser, reportConversation } from '../../api/messageApi';
import { useNavigate } from 'react-router-dom';
import ReportModal from '../ReportModal';

const ChatInfoPanel = ({ conversationId, onClose, onUpdate }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReportModal, setShowReportModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!conversationId || conversationId === 'new') {
            setLoading(false);
            return;
        }

        const fetchDetails = async () => {
            try {
                const data = await getConversationDetails(conversationId);
                setDetails(data);
            } catch (error) {
                console.error("Failed to load details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [conversationId]);

    const handleToggleMute = async () => {
        try {
            const isMuted = await toggleMute(conversationId);
            setDetails(prev => ({
                ...prev,
                conversation: { ...prev.conversation, isMuted }
            }));
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Mute failed", error);
        }
    };

    const handleBlock = async () => {
        if (window.confirm("Are you sure you want to block this user? You will not receive any further messages from them.")) {
            try {
                await blockUser(conversationId);
                alert("User blocked successfully");
                setDetails(prev => ({
                    ...prev,
                    otherUser: { ...prev.otherUser, isBlocked: true }
                }));
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error("Block failed", error);
                alert("Failed to block user");
            }
        }
    };

    const handleUnblock = async () => {
        if (window.confirm("Are you sure you want to unblock this user?")) {
            try {
                await unblockUser(conversationId);
                alert("User unblocked successfully");
                setDetails(prev => ({
                    ...prev,
                    otherUser: { ...prev.otherUser, isBlocked: false }
                }));
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error("Unblock failed", error);
                alert("Failed to unblock user");
            }
        }
    };

    const handleReportClick = () => {
        setShowReportModal(true);
    };

    const handleReportSubmit = async (reason, detail) => {
        // reason is the category ID (e.g. 'spam'), detail is the subcategory string
        try {
            await reportConversation(conversationId, `${reason}: ${detail}`);
            // Report modal handles its own success state usually, but since we are passing onReport, 
            // the modal expects us to handle the API call. 
            // The modal component in '../ReportModal' sets state to 'submitted' after await.
        } catch (error) {
            console.error("Report failed", error);
            throw error; // Let the modal handle the error display
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this chat? This cannot be undone.")) {
            try {
                await deleteConversation(conversationId);
                if (onUpdate) onUpdate(); // Refresh the list
                navigate('/messages');
            } catch (error) {
                console.error("Delete failed", error);
                alert("Failed to delete conversation");
            }
        }
    };

    if (loading) return (
        <div className="w-[350px] h-full border-l border-gray-200 dark:border-[#363636] bg-white dark:bg-black animate-pulse p-4">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"></div>
            <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2"></div>
            <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2"></div>
        </div>
    );

    if (!details) return null;

    const { otherUser, conversation, media } = details;
    const isBlocked = otherUser.isBlocked;

    return (
        <>
            <div className="w-[350px] h-full border-l border-gray-200 dark:border-[#363636] bg-white dark:bg-black overflow-y-auto flex flex-col max-md:fixed max-md:inset-0 max-md:w-full max-md:z-[200]">
                <div className="flex items-center h-[60px] px-4 border-b border-gray-200 dark:border-[#363636] sticky top-0 bg-white dark:bg-black z-10 shrink-0">
                    <span className="font-bold flex-1 text-center text-text-primary">Details</span>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-text-primary">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200 dark:border-[#363636]">
                    <img
                        src={otherUser.profilePicture || otherUser.avatar || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                        alt={otherUser.username}
                        className="w-[82px] h-[82px] rounded-full object-cover mb-4 border border-gray-100 dark:border-gray-800"
                    />
                    <h3 className="font-bold text-lg mb-2 text-text-primary">{otherUser.username}</h3>
                    {isBlocked && <span className="text-sm text-red-500 font-medium mb-2">Blocked • {otherUser.username}</span>}
                    <button
                        onClick={() => navigate(`/profile/${otherUser.userId || otherUser.id}`)}
                        className="bg-[#efefef] dark:bg-[#262626] hover:bg-[#dbdbdb] dark:hover:bg-[#363636] px-4 py-[7px] rounded-lg font-semibold text-sm transition-colors text-text-primary"
                    >
                        View profile
                    </button>
                </div>

                <div className="py-2">
                    <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors" onClick={handleToggleMute}>
                        <div className="flex items-center gap-3 text-text-primary">
                            {conversation.isMuted ? <BellOff size={24} /> : <Bell size={24} />}
                            <span>Mute messages</span>
                        </div>
                        <div className={`w-[44px] h-[24px] rounded-full relative transition-colors ${conversation.isMuted ? 'bg-blue-500' : 'bg-gray-200 dark:bg-[#363636]'}`}>
                            <div className={`absolute top-0.5 bottom-0.5 w-[20px] bg-white rounded-full shadow transition-all ${conversation.isMuted ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                </div>

                <div className="py-4 border-t border-gray-200 dark:border-[#363636]">
                    <div className="px-4 mb-2 flex justify-between items-center">
                        <span className="font-bold text-text-primary">Media</span>
                        {media.length > 0 && <span className="text-xs text-blue-500 font-semibold cursor-pointer">See all</span>}
                    </div>
                    {media.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1 px-4">
                            {media.filter(m => (m.type === 'image' || m.type === 'video') && !m.mediaUrl?.startsWith('blob:') && !m.content?.startsWith('blob:')).slice(0, 6).map((m, i) => (
                                <div key={m.id} className="aspect-square bg-gray-100 dark:bg-gray-900 rounded overflow-hidden cursor-pointer group relative">
                                    <img src={m.mediaUrl || m.content} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" alt="Media" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-gray-400 text-sm">
                            No photos or videos shared yet
                        </div>
                    )}
                </div>

                <div className="mt-auto py-2 border-t border-gray-200 dark:border-[#363636]">
                    {isBlocked ? (
                        <button onClick={handleUnblock} className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
                            <UserMinus size={24} />
                            <span>Unblock</span>
                        </button>
                    ) : (
                        <button onClick={handleBlock} className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
                            <UserMinus size={24} />
                            <span>Block</span>
                        </button>
                    )}
                    <button onClick={handleReportClick} className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
                        <ShieldAlert size={24} />
                        <span>Report</span>
                    </button>
                    <button onClick={handleDelete} className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
                        <Trash2 size={24} />
                        <span>Delete chat</span>
                    </button>
                </div>
            </div>

            {showReportModal && (
                <ReportModal
                    onClose={() => setShowReportModal(false)}
                    onReport={handleReportSubmit}
                />
            )}
        </>
    );
};

export default ChatInfoPanel;
