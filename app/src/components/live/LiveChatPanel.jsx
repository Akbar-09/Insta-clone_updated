import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart } from 'lucide-react';
import axios from 'axios';

const LiveChatPanel = ({ socket, streamId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Fetch initial chat history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
                const res = await axios.get(`${API_URL}/live/${streamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.data && res.data.data.LiveChatMessages) {
                    // Chat messages come back DESC
                    setMessages(res.data.data.LiveChatMessages.reverse());
                }
            } catch (err) {
                console.error("Failed to load chat history");
            }
        };
        fetchHistory();
    }, [streamId]);

    // Socket listeners
    useEffect(() => {
        if (!socket) return;

        socket.on('new_live_message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('new_live_message');
        };
    }, [socket]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const ts = new Date().toISOString();
        const msgText = input;
        setInput('');

        // Optimistic update
        const optimisticMsg = {
            id: 'temp_' + Date.now(),
            user_id: currentUser.id || 'me',
            username: currentUser.username || 'You',
            message: msgText,
            created_at: ts
        };
        setMessages(prev => [...prev, optimisticMsg]);

        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
            await axios.post(`${API_URL}/live/${streamId}/chat`, {
                message: msgText
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Also emit via socket immediately to save database latency for other clients
            if (socket) {
                socket.emit('send_live_message', { streamId, message: msgText });
            }
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const emitReaction = () => {
        if (socket) {
            socket.emit('send_reaction', { streamId, emoji: 'heart' });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-3 border-b border-gray-800 font-semibold text-white">Live Chat</div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm mt-10">Welcome to the live chat!</div>
                ) : (
                    messages.map((m, i) => (
                        <div key={m.id || i} className="text-sm">
                            <span className="font-semibold text-pink-400 mr-2">
                                {m.username || 'User'}
                            </span>
                            <span className="text-white break-words">{m.message}</span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-800 bg-gray-900">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-gray-700"
                    />
                    <button type="submit" disabled={!input.trim()} className="text-primary-500 p-2 disabled:text-gray-600">
                        <Send size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={emitReaction}
                        className="text-pink-500 p-2 hover:bg-gray-800 rounded-full transition"
                    >
                        <Heart size={20} fill="#ec4899" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LiveChatPanel;
