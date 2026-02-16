import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { searchUsers, sendMessage } from '../api/postActionsApi';
import { X } from 'lucide-react';

const ShareModal = ({ post, onClose, title, actionLabel, onAction, ...props }) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]); // In real app, init with recent suggestions
    const [selectedUsersMap, setSelectedUsersMap] = useState(new Map());
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const res = await searchUsers(query);
                    // Handle Axios response structure: res.data.data contains the users array
                    if (res.data && res.data.data) {
                        setUsers(res.data.data);
                    } else if (Array.isArray(res)) {
                        // Fallback in case the API utility was changed to return data directly
                        setUsers(res);
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

    const toggleUser = (user) => {
        const userId = user.userId || user.id;
        const newMap = new Map(selectedUsersMap);
        if (newMap.has(userId)) {
            newMap.delete(userId);
        } else {
            newMap.set(userId, user);
        }
        setSelectedUsersMap(newMap);
    };

    const handleSend = async () => {
        setSending(true);
        try {
            const userIds = Array.from(selectedUsersMap.keys());
            const selectedObjects = Array.from(selectedUsersMap.values());

            // If custom action handler is provided
            if (onAction) {
                await onAction(userIds, selectedObjects);
                onClose();
                return;
            }

            // Send to each user
            await Promise.all(userIds.map(uid => {
                const shareContent = {
                    id: post?.id || props.story?.id,
                    postId: post?.id || props.story?.id,
                    type: post ? 'post' : 'story',
                    username: post?.username || props.story?.username || 'User',
                    thumbnailUrl: post?.mediaUrl || post?.imageUrl || props.story?.mediaUrl,
                    caption: post?.caption || '',
                    text: post ? `Shared a post: /posts/${post.id}` : `Shared a story`
                };

                return sendMessage(uid, JSON.stringify(shareContent), post ? 'post_share' : 'story_share');
            }));
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
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#262626] w-full max-w-[500px] h-[70vh] rounded-xl flex flex-col overflow-hidden shadow-2xl animate-zoom-in">
                <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-[#363636]">
                    <div className="w-8"></div>
                    <h2 className="text-base font-bold text-black dark:text-white flex-1 text-center">{title || 'Share'}</h2>
                    <button onClick={onClose} className="p-1 text-black dark:text-white hover:opacity-70 transition-opacity">
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

                <div className="flex-1 overflow-y-auto p-0 scrollbar-none">
                    {users.length > 0 && (
                        <h3 className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Suggested</h3>
                    )}

                    {users.length === 0 && !query && (
                        <p className="text-gray-400 text-sm text-center p-8">Recent recipients will appear here.</p>
                    )}
                    {users.length === 0 && query && (
                        <p className="text-gray-400 text-sm text-center p-8">No account found.</p>
                    )}
                    {users.map(u => (
                        <div
                            key={u.id}
                            onClick={() => toggleUser(u)}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#363636] cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden relative">
                                    {u.avatar || u.profilePicture ? (
                                        <img src={u.avatar || u.profilePicture} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <img src={`https://ui-avatars.com/api/?name=${u.username}&background=random`} className="w-full h-full object-cover" alt="" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-semibold text-black dark:text-white leading-tight">{u.username}</div>
                                    <div className="text-sm text-gray-500 leading-tight">{u.fullName || u.username}</div>
                                </div>
                            </div>

                            {/* Selection Radio/Checkbox */}
                            <div className={`
                                w-6 h-6 rounded-full border border-gray-300 dark:border-gray-500 
                                flex items-center justify-center transition-all
                                ${selectedUsersMap.has(u.userId || u.id) ? 'bg-[#0095f6] border-transparent' : 'bg-transparent'}
                            `}>
                                {selectedUsersMap.has(u.userId || u.id) && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-4 h-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-[#363636]">
                    <button
                        onClick={handleSend}
                        disabled={selectedUsersMap.size === 0 || sending}
                        className="w-full py-2.5 bg-[#0095f6] text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-[#1877f2] transition-colors"
                    >
                        {sending ? 'Processing...' : (actionLabel || (selectedUsersMap.size > 0 ? `Send to ${selectedUsersMap.size} ${selectedUsersMap.size === 1 ? 'person' : 'people'}` : 'Send'))}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ShareModal;
