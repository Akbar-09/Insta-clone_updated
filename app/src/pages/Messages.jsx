import { useState, useRef, useEffect, useContext } from 'react';
import {
    Edit, ChevronDown, Search, MessageCircle, Phone, Video, Info,
    Smile, Image as ImageIcon, Heart, Mic, ArrowLeft
} from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

const Messages = () => {
    const { user } = useContext(AuthContext);
    const { socket, isConnected, messages: socketMessages } = useSocket();

    // State
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const chatBottomRef = useRef(null);

    // Initial Fetch
    useEffect(() => {
        const fetchInbox = async () => {
            if (!user) return;
            try {
                // Fetch all messages involving the user
                const res = await api.get(`/messages?userId1=${user.id}`);
                if (res.data.status === 'success') {
                    processConversations(res.data.data);
                }
            } catch (err) {
                console.error("Failed to load inbox", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInbox();
    }, [user]);

    // Handle Socket Messages
    useEffect(() => {
        if (socketMessages.length > 0) {
            // Re-process conversations with new messages
            // In a real app, we'd merge efficiently. For MVP, re-fetching or appending is okay,
            // but here we just append to the state if it matches active chat
            const lastMsg = socketMessages[socketMessages.length - 1];

            // Update conversation list logic would be complex here without efficient state structure
            // For now, simpler approach: If new message, assume it's valid and update UI if chat is open
            if (selectedChat) {
                if (lastMsg.senderId === selectedChat.userId || lastMsg.recipientId === selectedChat.userId) {
                    // It belongs to current chat
                    // We actually need to ensure we don't duplicate if we already optimistically added it
                    // MOCK logic for now since we rely on fetching for persistence source of truth usually
                }
            }
        }
    }, [socketMessages, selectedChat]);

    // Process flat messages into conversations
    const processConversations = (allMessages) => {
        const convMap = new Map();

        allMessages.forEach(msg => {
            const otherId = msg.senderId === user.id ? msg.recipientId : msg.senderId;
            // We need username/avatar. Since message doesn't have it, we might display user ID 
            // or fetch user details. For MVP, we will treat otherId as filtered list.
            // Ideally backend returns populated data.
            // Let's assume we need to fetch user info or it's just ID for now.
            // Optimized: Create unique set of IDs and fetch their profiles.

            const existing = convMap.get(otherId) || { messages: [] };
            existing.messages.push(msg);
            existing.userId = otherId;
            existing.lastMessage = msg;
            convMap.set(otherId, existing);
        });

        // Convert map to array and sort by last message time
        const sortedConvs = Array.from(convMap.values()).sort((a, b) =>
            new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
        );

        setConversations(sortedConvs);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !selectedChat) return;

        const tempId = Date.now();
        const optimisticMsg = {
            id: tempId,
            senderId: user.id,
            recipientId: selectedChat.userId,
            text: messageInput,
            createdAt: new Date().toISOString(),
            sender: 'me'
        };

        // UI Update (Optimistic)
        const updatedConvs = conversations.map(c => {
            if (c.userId === selectedChat.userId) {
                return { ...c, messages: [...c.messages, optimisticMsg], lastMessage: optimisticMsg };
            }
            return c;
        });
        setConversations(updatedConvs);
        setMessageInput('');

        // API Call
        try {
            await api.post('/messages', {
                senderId: user.id,
                recipientId: selectedChat.userId,
                text: optimisticMsg.text
            });
            // Success - Socket will confirm eventually, or we just trust optimistic
        } catch (err) {
            console.error("Failed to send message", err);
            // Revert on failure (omitted for brevity)
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedChat, conversations]);

    const activeConversation = selectedChat
        ? conversations.find(c => c.userId === selectedChat.userId)
        : null;

    if (loading) return <div className="flex h-screen items-center justify-center">Loading Messages...</div>;

    return (
        <div className="flex h-screen w-full bg-primary overflow-hidden">
            {/* LEFT PANEL: Chats List */}
            <div className={`w-full md:w-[398px] border-r border-border flex flex-col bg-primary z-[2] shrink-0 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="h-[75px] flex justify-between items-center px-6 shrink-0">
                    <div className="flex items-center font-bold text-base cursor-pointer">
                        <span className="block text-text-primary">{user?.username}</span>
                        <ChevronDown size={20} className="ml-2 text-text-primary" />
                    </div>
                    <Edit size={24} className="cursor-pointer text-text-primary" />
                </div>

                <div className="px-5 pb-3 shrink-0">
                    <div className="bg-secondary rounded-lg h-9 flex items-center px-4 w-full">
                        <div className="flex items-center w-full">
                            <Search size={16} className="text-text-secondary mr-3" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent border-none text-sm w-full outline-none text-text-primary placeholder:text-text-secondary"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto flex flex-col">
                    <div className="flex flex-col">
                        {conversations.length === 0 ? (
                            <div className="p-5 text-center text-text-secondary text-sm">No messages found.</div>
                        ) : (
                            conversations.map(conv => (
                                <div
                                    key={conv.userId}
                                    className={`flex items-center px-6 py-2 cursor-pointer transition-colors hover:bg-secondary ${selectedChat?.userId === conv.userId ? 'bg-secondary' : ''}`}
                                    onClick={() => setSelectedChat({ userId: conv.userId, username: `User ${conv.userId}` })} // Mock username
                                >
                                    <div className="w-14 h-14 rounded-full mr-3 bg-gray-200 flex items-center justify-center text-xl text-gray-500">
                                        {/* Avatar Fallback */}
                                        {conv.userId.toString().slice(0, 2)}
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <span className="text-sm text-text-primary block font-semibold">User {conv.userId}</span>
                                        <div className="flex">
                                            <span className="text-xs text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis block mt-0.5 truncate">
                                                {conv.lastMessage?.text || 'Sent an attachment'} · {new Date(conv.lastMessage?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Chat Window */}
            {selectedChat ? (
                <div className={`flex-grow flex flex-col bg-primary h-screen ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
                    {/* Header */}
                    <div className="h-[75px] border-b border-border flex justify-between items-center px-6 shrink-0">
                        <div className="flex items-center cursor-pointer">
                            {/* Mobile Back Button */}
                            <div className="md:hidden mr-4" onClick={() => setSelectedChat(null)}>
                                <ArrowLeft size={24} className="text-text-primary" />
                            </div>
                            <div className="w-11 h-11 rounded-full mr-3 bg-gray-200 flex items-center justify-center text-gray-500">
                                {selectedChat.username.slice(0, 2)}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-base text-text-primary">{selectedChat.username}</span>
                                <span className="text-xs text-text-secondary">{isConnected ? 'Active now' : 'Offline'}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Phone size={26} className="cursor-pointer text-text-primary" />
                            <Video size={28} className="cursor-pointer text-text-primary" />
                            <Info size={26} className="cursor-pointer text-text-primary" />
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-2">
                        {activeConversation?.messages.map((msg, idx) => (
                            <div key={idx} className={`flex items-end mb-2 ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                                {msg.senderId !== user.id && <div className="w-7 h-7 rounded-full mr-2 mb-2 bg-gray-300" />}
                                <div className={`px-[18px] py-[14px] rounded-[22px] max-w-[60%] text-sm leading-[1.4] break-words
                                    ${msg.senderId === user.id
                                        ? 'bg-[#3797f0] text-white rounded-br-md'
                                        : 'bg-secondary text-text-primary rounded-bl-md'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatBottomRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-5 shrink-0">
                        <div className="bg-primary border border-border rounded-[22px] h-11 flex items-center px-4 focus-within:border-[#c7c7c7] dark:focus-within:border-text-secondary">
                            <Smile size={24} className="cursor-pointer mr-1 text-text-primary" />
                            <input
                                type="text"
                                placeholder="Message..."
                                className="flex-grow border-none outline-none mx-3 text-sm bg-transparent text-text-primary placeholder:text-text-secondary"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            {messageInput ? (
                                <button onClick={handleSendMessage} className="text-blue-btn font-semibold bg-transparent border-none cursor-pointer text-sm">Send</button>
                            ) : (
                                <>
                                    <ImageIcon size={24} className="cursor-pointer mr-1 text-text-primary" />
                                    <Heart size={24} className="cursor-pointer ml-1 text-text-primary" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty State (Desktop) */
                <div className="hidden md:flex flex-grow flex-col items-center justify-center bg-primary h-screen">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 border-2 border-text-primary rounded-full flex items-center justify-center mb-4">
                            <MessageCircle size={44} strokeWidth={1.5} className="text-text-primary" />
                        </div>
                        <h2 className="text-xl font-light mb-1 text-text-primary">Your messages</h2>
                        <p className="text-sm text-text-secondary mb-4">Send private photos and messages to a friend or group.</p>
                        <button className="bg-blue-btn text-white px-4 py-1.5 rounded font-semibold text-sm">Send message</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
