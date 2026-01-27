import { Edit } from 'lucide-react';

const ConversationList = ({ conversations, selectedId, onSelect, currentUser }) => {
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
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-[#dbdbdb] shrink-0">
                <div className="flex items-center gap-1 cursor-pointer font-bold text-lg text-text-primary">
                    <span>{currentUser?.username}</span>
                    <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <Edit size={24} className="cursor-pointer text-text-primary" />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
                <div className="flex items-center justify-between px-5 py-3">
                    <h3 className="font-bold text-base text-text-primary">Messages</h3>
                    <span className="text-[#0095F6] text-sm font-semibold cursor-pointer">Requests</span>
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
                                        src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                                        alt={otherUser.username}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm truncate ${hasUnread ? 'font-bold text-text-primary' : 'font-normal text-text-primary'}`}>
                                        {otherUser.fullName || otherUser.username}
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs ${hasUnread ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
                                        <span className="truncate max-w-[140px]">
                                            {conv.lastMessageSenderId === currentUser?.id ? 'You: ' : ''}
                                            {conv.lastMessageContent}
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
