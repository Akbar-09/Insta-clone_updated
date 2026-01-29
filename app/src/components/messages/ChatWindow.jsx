import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatWindow = ({ conversation, messages, currentUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

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
        e?.preventDefault(); // Use optional chaining for robustness
        if (!newMessage.trim()) return;
        onSendMessage(newMessage, 'text'); // Explicitly pass type 'text'
        setNewMessage('');
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // In a real app, upload to server (Cloudinary/S3) and get URL.
        // For this demo/MVP, we'll use a local object URL to simulate immediate sending.
        // Ideally, we should upload then send.
        const objectUrl = URL.createObjectURL(file);

        onSendMessage('Sent an image', 'image', { mediaUrl: objectUrl });

        // Reset input
        e.target.value = null;
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

        return groups;
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
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-gray-300 dark:border-gray-800 shrink-0">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/profile/${otherUser.username}`)}>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700">
                        <img
                            src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                            alt={otherUser.username}
                            className="w-full h-full object-cover"
                        />
                    </div >
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary leading-tight">{otherUser.username}</span>
                        <span className="text-[10px] text-text-secondary">Active now</span>
                    </div>
                </div >
                <div className="flex items-center gap-4 text-text-primary">
                    <Phone size={24} className="cursor-pointer hover:opacity-50" />
                    <Video size={24} className="cursor-pointer hover:opacity-50" />
                    <Info size={24} className="cursor-pointer hover:opacity-50" />
                </div>
            </div >

            {/* Messages Area */}
            < div className="flex-1 overflow-y-auto p-5 scrollbar-none" ref={scrollContainerRef} >
                <div className="flex flex-col min-h-full">

                    {/* Profile Hero Section */}
                    {groupedContent.length < 5 && ( /* Only show if few messages or new chat layout logic */
                        <div className="flex flex-col items-center justify-center pt-8 pb-10 w-full mb-auto">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700 mb-3">
                                <img
                                    src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                                    alt={otherUser.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-text-primary tracking-tight">{otherUser.fullName || otherUser.username}</h2>
                            <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                                <span>{otherUser.username}</span>
                                <span>•</span>
                                <span>Instagram</span>
                            </div>
                            <button
                                onClick={() => navigate(`/profile/${otherUser.username}`)}
                                className="mt-5 px-5 py-1.5 bg-[#efefef] dark:bg-[#262626] rounded-lg text-sm font-semibold text-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                View profile
                            </button>
                        </div>
                    )}
                    {/* Spacer if hero is rendered, else auto margin logic handled above/below via flex */}
                    {/* Actually, previous implementation relied on 'mb-auto' or 'mt-auto' logic. 
                        Let's stick to the previous 'mt-auto' for messages container div to push it down if needed. 
                    */}
                    <div className={`flex flex-col ${groupedContent.length < 5 ? '' : 'mt-auto'}`}>
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
                                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-200 self-end mb-1">
                                                <img
                                                    src={otherUser.profilePicture || `https://ui-avatars.com/api/?name=${otherUser.username}&background=random`}
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1">
                                            {/* Media Content (Image/Video) */}
                                            {msg.type === 'image' && msg.mediaUrl && (
                                                <div className="rounded-[22px] overflow-hidden mb-1 border border-gray-200 max-w-[240px]">
                                                    <img src={msg.mediaUrl} alt="Sent attachment" className="w-full h-auto" />
                                                </div>
                                            )}

                                            {/* Story Reply Preview */}
                                            {msg.type === 'story_reply' && (
                                                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-2 mb-1 border border-gray-200 dark:border-gray-800 overflow-hidden">
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

                                            {msg.content && (msg.type === 'text' || msg.type === 'story_reply' || (msg.type === 'image' && msg.content !== 'Sent an image')) && (
                                                <div
                                                    className={`px-4 py-2 rounded-[22px] text-sm break-words ${isOwn
                                                        ? 'bg-[#3797f0] text-white'
                                                        : 'bg-[#efefef] dark:bg-[#262626] text-text-primary'
                                                        }`}
                                                >
                                                    {msg.content}
                                                </div>
                                            )}
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
            </div >

            {/* Input Area */}
            < div className="p-4 shrink-0 border-t border-gray-100 dark:border-[#363636]" >
                <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-[25px] px-4 py-2 bg-white dark:bg-black">
                    <Smile size={24} className="cursor-pointer text-text-primary shrink-0" />
                    <form onSubmit={handleSend} className="flex-1">
                        <input
                            type="text"
                            placeholder="Message..."
                            className="w-full outline-none border-none focus:ring-0 focus:border-none text-sm bg-transparent text-text-primary placeholder-text-secondary"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </form>
                    {newMessage.trim() ? (
                        <button onClick={handleSend} className="text-[#0095F6] text-sm font-semibold px-2">Send</button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                            <ImageIcon
                                size={24}
                                className="cursor-pointer text-text-primary hover:text-gray-600 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            />
                            {/* Heart removed as requested */}
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

export default ChatWindow;
