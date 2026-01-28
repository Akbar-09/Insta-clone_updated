import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { searchUsers, sendMessage } from '../api/postActionsApi';
import { X } from 'lucide-react';

const ShareModal = ({ post, onClose, ...props }) => {
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
            let content = '';
            if (post) {
                content = `Check out this post: ${window.location.origin}/post/${post.id}`;
            } else if (props.story) { // assuming passed as props
                content = `Check out this story: ${window.location.origin}/stories/${props.story.username}/${props.story.id}`;
            }

            // Send to each user
            await Promise.all(userIds.map(uid => sendMessage(uid, content)));
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
            <div className="bg-white dark:bg-[#262626] w-full max-w-[500px] h-[70vh] rounded-xl flex flex-col overflow-hidden shadow-2xl animate-zoom-in">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#363636]">
                    <span className="w-8"></span>
                    <h2 className="text-black dark:text-white font-semibold flex-1 text-center">Share</h2>
                    <button onClick={onClose} className="text-black dark:text-white hover:opacity-70 transition-opacity">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 border-b border-gray-100 dark:border-[#363636]">
                    <div className="flex items-center gap-3">
                        <span className="text-black dark:text-white font-semibold min-w-8">To:</span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent text-black dark:text-white outline-none flex-1 placeholder-gray-500 text-sm"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
                    {users.length === 0 && !query && (
                        <p className="text-gray-400 text-sm text-center p-8">Recent recipients will appear here.</p>
                    )}
                    {users.length === 0 && query && (
                        <p className="text-gray-400 text-sm text-center p-8">No account found.</p>
                    )}
                    {users.map(u => (
                        <div
                            key={u.id}
                            onClick={() => toggleUser(u.id)}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#363636] rounded-lg cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden ring-1 ring-black/5">
                                    {u.avatar || u.profilePicture ? (
                                        <img src={u.avatar || u.profilePicture} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <img src={`https://ui-avatars.com/api/?name=${u.username}&background=random`} className="w-full h-full object-cover" alt="" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold text-sm text-black dark:text-white">{u.username}</div>
                                    <div className="text-sm text-gray-500">{u.fullName}</div>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedUsers.has(u.id) ? 'bg-[#0095f6] border-[#0095f6]' : 'border-gray-300 dark:border-gray-500'}`}>
                                {selectedUsers.has(u.id) && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-[#363636]">
                    <button
                        onClick={handleSend}
                        disabled={selectedUsers.size === 0 || sending}
                        className="w-full py-2.5 bg-[#0095f6] text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-[#1877f2] transition-colors"
                    >
                        {sending ? 'Sending...' : (selectedUsers.size > 0 ? `Send to ${selectedUsers.size} ${selectedUsers.size === 1 ? 'person' : 'people'}` : 'Send')}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShareModal;
