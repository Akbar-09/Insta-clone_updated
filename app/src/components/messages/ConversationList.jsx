import { Edit } from 'lucide-react';

const ConversationList = ({ conversations, selectedId, onSelect, currentUser }) => {
    return (
        <div className="flex flex-col h-full border-r border-[#dbdbdb] w-[350px] max-md:w-full shrink-0">
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-[#dbdbdb]">
                <div className="flex items-center gap-1 cursor-pointer font-bold text-base">
                    <span>{currentUser?.username}</span>
                    {/* Chevron down icon */}
                </div>
                <Edit size={24} className="cursor-pointer" />
            </div>

            {/* Sub-header (Categories - Omitted per requirement, keeping unified) */}
            <div className="flex items-center justify-between px-5 py-3">
                <h3 className="font-bold text-base">Messages</h3>
                <span className="text-[#0095F6] text-sm font-semibold cursor-pointer">Requests</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {conversations.length === 0 ? (
                    <div className="p-5 text-center text-gray-500 text-sm">No messages yet.</div>
                ) : (
                    conversations.map(conv => {
                        // Determine other user logic (simplified, assuming we have extended data or mock)
                        // In reality, specific logic in hook/controller should return 'otherUser' object
                        // For now, using ID as placeholder or assuming conv contains it
                        const isSelected = selectedId === conv.id;
                        const otherUserId = conv.user1Id === currentUser?.id ? conv.user2Id : conv.user1Id;

                        return (
                            <div
                                key={conv.id}
                                onClick={() => onSelect(conv)}
                                className={`flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-[#efefef]' : ''}`}
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=User+${otherUserId}&background=random`}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-normal truncate">User {otherUserId}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <span className="truncate max-w-[150px]">
                                            {conv.lastMessageSenderId === currentUser?.id ? 'You: ' : ''}
                                            {conv.lastMessageContent || 'Sent an attachment'}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(conv.lastMessageAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ConversationList;
