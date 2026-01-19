import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { searchUsers, sendMessage } from '../api/postActionsApi';
import { X } from 'lucide-react';

const ShareModal = ({ post, onClose }) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]); // In real app, init with recent suggestions
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const res = await searchUsers(query);
                    if (res.data.status === 'success') {
                        setUsers(res.data.data);
                    }
                } catch (e) {
                    console.error('Search failed', e);
                }
            } else {
                setUsers([]); // Clear or show recents
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const toggleUser = (userId) => {
        const newSet = new Set(selectedUsers);
        if (newSet.has(userId)) newSet.delete(userId);
        else newSet.add(userId);
        setSelectedUsers(newSet);
    };

    const handleSend = async () => {
        setSending(true);
        try {
            const userIds = Array.from(selectedUsers);
            const link = `${window.location.origin}/post/${post.id}`;
            // Send to each user
            await Promise.all(userIds.map(uid => sendMessage(uid, `Check out this post: ${link}`)));
            alert('Sent!');
            onClose();
        } catch (e) {
            console.error('Send failed', e);
            alert('Failed to send');
        } finally {
            setSending(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#262626] w-full max-w-[500px] h-[70vh] rounded-xl flex flex-col overflow-hidden animate-zoom-in">
                <div className="flex items-center justify-between p-4 border-b border-[#363636]">
                    <span className="w-8"></span>
                    <h2 className="text-white font-semibold flex-1 text-center">Share</h2>
                    <button onClick={onClose} className="text-white hover:opacity-70"><X /></button>
                </div>

                <div className="p-4 border-b border-[#363636]">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-white font-semibold">To:</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent text-white outline-none flex-1"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {users.length === 0 && query && <p className="text-gray-400 text-center p-4">No account found.</p>}
                    {users.map(u => (
                        <div
                            key={u.id}
                            onClick={() => toggleUser(u.id)}
                            className="flex items-center justify-between p-2 hover:bg-[#363636] rounded cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                                    {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : null}
                                </div>
                                <div className="text-white">
                                    <div className="font-semibold">{u.username}</div>
                                    <div className="text-sm text-gray-400">{u.fullName}</div>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedUsers.has(u.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                                {selectedUsers.has(u.id) && <div className="w-3 h-3 bg-white rounded-full"></div>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4">
                    <button
                        onClick={handleSend}
                        disabled={selectedUsers.size === 0 || sending}
                        className="w-full py-3 bg-[#0095f6] text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-[#1877f2]"
                    >
                        {sending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShareModal;
