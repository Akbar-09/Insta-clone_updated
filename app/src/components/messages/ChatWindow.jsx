import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Smile, Image as ImageIcon, Heart } from 'lucide-react';

const ChatWindow = ({ conversation, messages, currentUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    const otherUserId = conversation.user1Id === currentUser?.id ? conversation.user2Id : conversation.user1Id;

    return (
        <div className="flex flex-col h-full w-full bg-white">
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-5 border-b border-[#dbdbdb] shrink-0">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=User+${otherUserId}&background=random`}
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-semibold text-base">User {otherUserId}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Phone size={24} className="cursor-pointer" />
                    <Video size={24} className="cursor-pointer" />
                    <Info size={24} className="cursor-pointer" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 pb-2">
                <div className="flex flex-col gap-2">
                    {/* Timestamp Separator (Optional) */}
                    <div className="text-center text-xs text-gray-400 my-4">
                        Today
                    </div>

                    {messages.map((msg, index) => {
                        const isOwn = msg.senderId === currentUser?.id;
                        return (
                            <div
                                key={msg.id || index}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} w-full mb-1`}
                            >
                                {!isOwn && (
                                    <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden mr-2 self-end mb-1">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=User+${msg.senderId}&background=random`}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${isOwn
                                            ? 'bg-[#3797f0] text-white rounded-br-none'
                                            : 'bg-[#efefef] text-black rounded-bl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 shrink-0">
                <div className="flex items-center gap-2 border border-[#dbdbdb] rounded-full px-4 py-2 bg-white">
                    <Smile size={24} className="cursor-pointer text-black" />
                    <form onSubmit={handleSend} className="flex-1">
                        <input
                            type="text"
                            placeholder="Message..."
                            className="w-full outline-none text-sm placeholder-gray-500"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </form>
                    {newMessage.trim() ? (
                        <button onClick={handleSend} className="text-[#0095F6] text-sm font-semibold">Send</button>
                    ) : (
                        <>
                            <ImageIcon size={24} className="cursor-pointer text-black" />
                            <Heart size={24} className="cursor-pointer text-black" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
