import React, { useState, useEffect } from 'react';
import { X, User, Heart, MessageCircle, Play } from 'lucide-react';
import * as adminApi from '../api/adminApi';

const ProfileListModal = ({ isOpen, onClose, userId, type, title, onViewProfile }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && userId) {
            fetchData();
        }
    }, [isOpen, userId, type]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let res;
            switch (type) {
                case 'followers':
                    res = await adminApi.getUserFollowers(userId);
                    break;
                case 'following':
                    res = await adminApi.getUserFollowing(userId);
                    break;
                // Posts/Reels could still be in modal if needed, but and UserManagement handles grid now
                case 'posts':
                    res = await adminApi.getUserPosts(userId);
                    break;
                case 'reels':
                    res = await adminApi.getUserReels(userId);
                    break;
                default:
                    res = { success: true, data: [] };
            }

            if (res.success) {
                setData(res.data || []);
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const getMediaUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = 'http://localhost:5000';
        const cleanUrl = url.startsWith('/') ? url : `/${url}`;
        return `${baseUrl}${cleanUrl}`;
    };

    if (!isOpen) return null;

    const handleViewProfile = (uid) => {
        if (onViewProfile) {
            onViewProfile(uid);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1e293b] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{title || type}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">Fetching {title || type}...</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
                            <User size={48} className="opacity-20" />
                            <p className="text-lg font-medium">No {title || type} found</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {data.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                                    {(type === 'followers' || type === 'following') ? (
                                        <>
                                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-white/10 shadow-sm">
                                                <img
                                                    src={getMediaUrl(item.profilePicture) || `https://ui-avatars.com/api/?name=${item.username}&background=random`}
                                                    alt={item.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 dark:text-white truncate">{item.username}</p>
                                                <p className="text-xs text-gray-500 truncate">{item.fullName || 'User'}</p>
                                            </div>
                                            <button
                                                onClick={() => handleViewProfile(item.userId)}
                                                className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 hover:bg-purple-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                                            >
                                                View Profile
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                                                {item.mediaType === 'video' || type === 'reels' ? (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                                                        <Play size={20} fill="currentColor" />
                                                    </div>
                                                ) : null}
                                                <img
                                                    src={getMediaUrl(item.mediaUrl || item.thumbnailUrl)}
                                                    alt="content"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                                                    {item.caption || 'No caption'}
                                                </p>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="flex items-center gap-1.5 text-xs text-pink-500 font-bold">
                                                        <Heart size={12} fill="currentColor" /> {item.likesCount || 0}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs text-blue-500 font-bold">
                                                        <MessageCircle size={12} fill="currentColor" /> {item.commentsCount || 0}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-purple-600 hover:text-white rounded-xl transition-all">
                                                <X size={16} className="rotate-45" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-white dark:bg-[#1e293b] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-white/10 transition-all shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileListModal;
