import React, { useState, useEffect } from 'react';
import { X, Search, Send, Check, Copy } from 'lucide-react';
import { searchUsers, sendPostViaDM } from '../api/shareApi';
import ReactDOM from 'react-dom';

const SharePostModal = ({ postId, mediaUrl, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sentUsers, setSentUsers] = useState(new Set());
    const [copied, setCopied] = useState(false);

    // Initial load - ideally fetch recent or suggested users
    useEffect(() => {
        handleSearch('');
    }, []);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        setLoading(true);
        try {
            // If query is empty, backend might return suggestions or we handle it
            const results = await searchUsers(query);
            setUsers(Array.isArray(results) ? results : []);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (user) => {
        try {
            await sendPostViaDM(user.userId || user.id, postId);
            setSentUsers(prev => new Set(prev).add(user.userId || user.id));
        } catch (error) {
            console.error("Failed to send", error);
            // Optionally show error toast
        }
    };

    const handleCopyLink = () => {
        const link = `http://localhost:5173/p/${postId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const content = (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white dark:bg-[#262626] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-8"></div> {/* Spacer */}
                    <h2 className="font-semibold text-base text-black dark:text-white">Share</h2>
                    <button onClick={onClose} className="text-black dark:text-white hover:opacity-70">
                        <X size={24} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative flex items-center bg-gray-100 dark:bg-[#363636] rounded-md px-3 py-1.5">
                        <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-sm w-full text-black dark:text-white placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                    {loading && users.length === 0 ? (
                        <div className="flex justify-center p-8">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {users.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No users found.
                                </div>
                            ) : (
                                users.map(user => {
                                    const isSent = sentUsers.has(user.userId || user.id);
                                    return (
                                        <div key={user.userId || user.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors cursor-pointer" onClick={() => !isSent && handleSend(user)}>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.profilePicture || 'https://via.placeholder.com/150'}
                                                    alt={user.username}
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-black dark:text-white">{user.username}</span>
                                                    <span className="text-xs text-gray-500">{user.fullName}</span>
                                                </div>
                                            </div>
                                            <button
                                                className={`px-4 py-1.5 rounded text-sm font-semibold transition-all ${isSent
                                                        ? 'bg-transparent text-gray-400 border border-gray-300 dark:border-gray-600 cursor-default'
                                                        : 'bg-[#0095f6] hover:bg-[#1877f2] text-white shadow-sm'
                                                    }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isSent) handleSend(user);
                                                }}
                                            >
                                                {isSent ? 'Sent' : 'Send'}
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#262626]">
                    <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#363636] transition-colors text-black dark:text-white font-medium text-sm"
                    >
                        {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        {copied ? 'Link Copied' : 'Copy Link'}
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(content, document.body);
};

export default SharePostModal;
