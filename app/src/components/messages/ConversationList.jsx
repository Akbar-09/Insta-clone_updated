import { useState } from 'react';
import { Edit } from 'lucide-react';
import SwitchAccountModal from '../SwitchAccountModal';
import { getProxiedUrl } from '../../utils/mediaUtils';

const ConversationList = ({ conversations, selectedId, onSelect, currentUser }) => {
    const [showSwitchAccount, setShowSwitchAccount] = useState(false);

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' });
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="h-[75px] flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
                <div
                    className="flex items-center gap-2 cursor-pointer font-bold text-xl text-text-primary"
                    onClick={() => setShowSwitchAccount(true)}
                >
                    <span>{currentUser?.username}</span>
                    <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div onClick={() => window.dispatchEvent(new CustomEvent('open-new-message-modal'))} className="cursor-pointer text-text-primary hover:opacity-50 transition-opacity">
                    <Edit size={24} strokeWidth={1.5} />
                </div>
            </div>

            {showSwitchAccount && (
                <SwitchAccountModal onClose={() => setShowSwitchAccount(false)} />
            )}

            {/* Search Bar */}
            <div className="px-5 pb-3">
                {/* Matches image 2 style: Gray background, rounded */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#efefef] dark:bg-[#262626] border-none rounded-lg px-4 py-2 text-sm outline-none placeholder:text-text-secondary"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
                <div className="flex items-center justify-between px-5 pb-2 pt-2">
                    <h3 className="font-bold text-base text-text-primary">Messages</h3>
                    {/* Requests removed as requested */}
                </div>

                {conversations.length === 0 ? (
                    <div className="p-10 text-center text-text-secondary text-sm">No conversations found.</div>
                ) : (
                    conversations.map(conv => {
                        const isSelected = selectedId === conv.id;
                        const otherUser = conv.otherUser || {};
                        const hasUnread = conv.unreadCount > 0;

                        return (
                            <div
                                key={conv.id}
                                onClick={() => onSelect(conv)}
                                className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors active:opacity-70 ${isSelected ? 'bg-[#efefef] dark:bg-white/10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0 border border-border">
                                    <img
                                        src={getProxiedUrl(otherUser.profilePicture) || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                                        alt={otherUser.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm truncate ${hasUnread ? 'font-bold text-text-primary' : 'font-normal text-text-primary'}`}>
                                        {(otherUser.fullName && !/^User \d+$/.test(otherUser.fullName)) ? otherUser.fullName : otherUser.username}
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs ${hasUnread ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
                                        <span className="truncate max-w-[140px]">
                                            {conv.lastMessageContent ? (
                                                <>
                                                    {conv.lastMessageSenderId === currentUser?.id ? 'You: ' : ''}
                                                    {conv.lastMessageContent}
                                                </>
                                            ) : (
                                                <span className="italic text-gray-400">No messages yet</span>
                                            )}
                                        </span>
                                        <span>•</span>
                                        <span>{formatTime(conv.lastMessageAt)}</span>
                                    </div>
                                </div>
                                {hasUnread && (
                                    <div className="w-2 h-2 rounded-full bg-[#0095F6] shrink-0"></div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ConversationList;
