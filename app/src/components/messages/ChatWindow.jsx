import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon, Heart } from 'lucide-react';

const ChatWindow = ({ conversation, messages, currentUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const scrollToBottom = (behavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToBottom('auto');
    }, [conversation.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    const otherUser = conversation.otherUser || {};

    const groupMessagesByDate = (msgs) => {
        const groups = [];
        let currentDate = null;

        msgs.forEach(msg => {
            const msgDate = new Date(msg.createdAt).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
            if (msgDate !== currentDate) {
                currentDate = msgDate;
                groups.push({ type: 'date', value: msgDate });
            }
            groups.push({ type: 'message', value: msg });
        });

        return groups; groupMessagesByDate
    };

    const formatMessageDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        if (date.toLocaleDateString() === now.toLocaleDateString()) return 'Today';
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toLocaleDateString() === yesterday.toLocaleDateString()) return 'Yesterday';
        return date.toLocaleDateString([], { month: 'long', day: 'numeric' });
    };

    const groupedContent = [];
    let lastDate = null;
    messages.forEach(msg => {
        const date = formatMessageDate(msg.createdAt);
        if (date !== lastDate) {
            groupedContent.push({ type: 'date', label: date });
            lastDate = date;
        }
        groupedContent.push({ type: 'message', data: msg });
    });

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-black">
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-border shrink-0">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-border">
                        <img
                            src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                            alt={otherUser.username}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary leading-tight">{otherUser.username}</span>
                        <span className="text-[10px] text-text-secondary">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-text-primary">
                    <Phone size={24} className="cursor-pointer hover:opacity-50" />
                    <Video size={24} className="cursor-pointer hover:opacity-50" />
                    <Info size={24} className="cursor-pointer hover:opacity-50" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-none" ref={scrollContainerRef}>
                <div className="flex flex-col">
                    {groupedContent.map((item, index) => {
                        if (item.type === 'date') {
                            return (
                                <div key={`date-${index}`} className="text-center text-[11px] font-semibold text-text-secondary my-8 uppercase tracking-wider">
                                    {item.label}
                                </div>
                            );
                        }

                        const msg = item.data;
                        const isOwn = msg.senderId === currentUser?.id;
                        const isLastInGroup = index === groupedContent.length - 1 || groupedContent[index + 1].type === 'date';

                        return (
                            <div
                                key={msg.id || index}
                                className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-2`}
                            >
                                <div className={`flex items-end gap-2 max-w-[75%]`}>
                                    {!isOwn && (
                                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0 border border-border self-end mb-1">
                                            <img
                                                src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-1">
                                        {/* Story Reply Preview */}
                                        {msg.type === 'story_reply' && (
                                            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-2 mb-1 border border-border overflow-hidden">
                                                <div className="flex items-center gap-2 mb-2 px-1">
                                                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                                                    <span className="text-[10px] font-semibold">Replying to story</span>
                                                </div>
                                                <div className="w-32 h-48 bg-gray-200 dark:bg-gray-800 rounded-lg relative overflow-hidden cursor-pointer group">
                                                    {msg.mediaUrl ? (
                                                        <img src={msg.mediaUrl} alt="Story" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">Story expired</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div
                                            className={`px-4 py-2 rounded-[22px] text-sm break-words ${isOwn
                                                ? 'bg-[#3797f0] text-white'
                                                : 'bg-secondary text-text-primary'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>

                                {isOwn && isLastInGroup && (
                                    <div className="text-[10px] text-text-secondary px-2 mt-1">
                                        {msg.isSeen ? 'Seen' : 'Delivered'}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} className="h-2" />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 shrink-0 border-t border-border">
                <div className="flex items-center gap-3 border border-border rounded-[25px] px-4 py-2 bg-white dark:bg-black">
                    <Smile size={24} className="cursor-pointer text-text-primary shrink-0" />
                    <form onSubmit={handleSend} className="flex-1">
                        <input
                            type="text"
                            placeholder="Message..."
                            className="w-full outline-none text-sm bg-transparent text-text-primary placeholder-text-secondary"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </form>
                    {newMessage.trim() ? (
                        <button onClick={handleSend} className="text-[#0095F6] text-sm font-semibold px-2">Send</button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <ImageIcon size={24} className="cursor-pointer text-text-primary" />
                            <Heart size={24} className="cursor-pointer text-text-primary" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
