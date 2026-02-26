import React, { useState, useEffect } from 'react';
import { Eye, Trash2, X, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as adminApi from '../../api/adminApi';

const ContentManagement = ({ initialTab = 'posts' }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(initialTab);

    const navigateToUserProfile = (userId) => {
        if (!userId) return;
        navigate(`/user-list/user-profile/${userId}`);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [modalActiveTab, setModalActiveTab] = useState('comment');
    const [modalData, setModalData] = useState({ likes: [], comments: [], bookmarks: [] });
    const [loadingModalData, setLoadingModalData] = useState(false);

    useEffect(() => {
        setActiveTab(initialTab);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [initialTab]);

    useEffect(() => {
        fetchData();
    }, [activeTab, pagination.page, pagination.limit, searchQuery]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                search: searchQuery
            };

            let res;
            if (activeTab === 'posts') {
                res = await adminApi.listPosts(params);
            } else {
                res = await adminApi.listReels(params);
            }

            if (res.success) {
                setData(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (item) => {
        try {
            if (activeTab === 'posts') {
                if (item.isHidden) await adminApi.unhidePost(item.id);
                else await adminApi.hidePost(item.id);
            } else {
                if (item.isHidden) await adminApi.unhideReel(item.id);
                else await adminApi.hideReel(item.id);
            }
            fetchData();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            if (activeTab === 'posts') await adminApi.deletePost(id);
            else await adminApi.deleteReel(id);
            fetchData();
        } catch (error) {
            alert('Failed to delete item');
        }
    };

    const handleViewDetails = async (item) => {
        setSelectedItem(item);
        setModalActiveTab('comment');
        setViewModalOpen(true);

        try {
            setLoadingModalData(true);
            let res;
            if (activeTab === 'posts') {
                res = await adminApi.getPostInteractions(item.id);
            } else {
                res = await adminApi.getReelInteractions(item.id);
            }
            if (res.success) {
                setModalData(res.data);
            }
        } catch (error) {
            console.error('Error fetching interactions:', error);
        } finally {
            setLoadingModalData(false);
        }
    };

    const getMediaUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = window.location.origin;
        let cleanPath = url;

        if (url.includes('uploads/')) {
            cleanPath = url.startsWith('/') ? url : '/' + url;
        } else {
            cleanPath = url.startsWith('/') ? `/uploads${url}` : `/uploads/${url}`;
        }

        return `${baseUrl}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
    };

    const formatDateShort = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {activeTab === 'posts' ? 'Post List' : 'Reel List'}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Dashboard • {activeTab === 'posts' ? 'Post List' : 'Reel List'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1e293b] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#f8fafc] dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">S.L</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{activeTab === 'posts' ? 'POST' : 'REEL'} IMAGE</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">USERNAME</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">POSTED DATE/TIME</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">LIKES</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">COMMENTS</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">VIEWS</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500">Loading {activeTab}...</td>
                                </tr>
                            ) : data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                            {(pagination.page - 1) * pagination.limit + index + 1}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {(item.mediaUrl && item.mediaType !== 'VIDEO') ? (
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                                <img
                                                    src={getMediaUrl(item.mediaUrl)}
                                                    alt={`Post by ${item.username}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm bg-black border border-gray-100 dark:border-white/5">
                                                <video
                                                    src={getMediaUrl(item.videoUrl || item.mediaUrl)}
                                                    className="w-full h-full object-cover"
                                                    muted
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item.userProfilePicture || `https://ui-avatars.com/api/?name=${item.username}&background=random`}
                                                    alt={item.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-800 dark:text-white">{item.username}</p>
                                                <p className="text-[11px] text-gray-400 font-medium lowercase">{item.username}@demo.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <p className="text-[11px] text-gray-400 font-medium">
                                                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                        {item.likesCount || 0} {item.likesCount === 1 ? 'Like' : 'Likes'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                        {item.commentsCount || 0} {item.commentsCount === 1 ? 'Comment' : 'Comments'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                        {item.viewsCount || 0} Views
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(item)}
                                            className={`w-10 h-5 rounded-full relative transition-all duration-300 ${!item.isHidden ? 'bg-purple-600' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${!item.isHidden ? 'right-1' : 'left-1'}`}></div>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 rounded-full bg-green-50 text-green-500 hover:bg-green-100 transition-all"
                                                title="View"
                                                onClick={() => handleViewDetails(item)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative inline-block">
                            <select
                                value={pagination.limit}
                                onChange={(e) => setPagination(p => ({ ...p, limit: parseInt(e.target.value), page: 1 }))}
                                className="appearance-none px-4 py-1.5 pr-8 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <span className="text-gray-400 font-medium whitespace-nowrap">
                            Showing <span className="text-gray-900 dark:text-white font-bold">{pagination.total}</span> results
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                            className="px-3 py-1.5 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all font-semibold"
                        >
                            Previous
                        </button>

                        {Array.from({ length: Math.min(5, pagination.totalPages || 1) }, (_, i) => {
                            const pageNum = i + 1;
                            // Basic page range logic can be added here if needed, keeping it simple for now
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPagination(p => ({ ...p, page: pageNum }))}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all ${pagination.page === pageNum
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none'
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            disabled={pagination.page >= (pagination.totalPages || 1)}
                            onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                            className="px-3 py-1.5 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all font-semibold"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Post Detail Modal */}
            {viewModalOpen && selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-[#1e293b] w-full max-w-5xl h-[80vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setViewModalOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors hidden md:block"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        {/* Left: Media Content */}
                        <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative group">
                            {(selectedItem.mediaUrl && selectedItem.mediaType !== 'VIDEO') ? (
                                <img
                                    src={getMediaUrl(selectedItem.mediaUrl)}
                                    alt="Post content"
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <video
                                    src={getMediaUrl(selectedItem.mediaUrl || selectedItem.videoUrl)}
                                    className="max-w-full max-h-full object-contain"
                                    controls
                                    autoPlay
                                />
                            )}
                        </div>

                        {/* Right: Details */}
                        <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-[#1e293b]">
                            {/* User Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full overflow-hidden bg-purple-100 dark:bg-purple-900/30 cursor-pointer"
                                    onClick={() => navigateToUserProfile(selectedItem.userId)}
                                >
                                    {selectedItem.userProfilePicture ? (
                                        <img src={getMediaUrl(selectedItem.userProfilePicture)} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-purple-600 font-bold">
                                            {selectedItem.username[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="cursor-pointer" onClick={() => navigateToUserProfile(selectedItem.userId)}>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg capitalize">{selectedItem.username}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{formatDateShort(selectedItem.createdAt)}</p>
                                </div>
                            </div>

                            {/* Interaction Tabs / Buttons */}
                            <div className="px-6 py-4 flex items-center gap-3">
                                <button
                                    onClick={() => setModalActiveTab('like')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${modalActiveTab === 'like'
                                        ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-500/30'
                                        : 'border-transparent text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <Heart size={18} fill={modalActiveTab === 'like' ? 'currentColor' : 'none'} /> Like
                                </button>
                                <button
                                    onClick={() => setModalActiveTab('comment')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${modalActiveTab === 'comment'
                                        ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white'
                                        : 'border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <MessageCircle size={18} /> Comment
                                </button>
                                <button
                                    onClick={() => setModalActiveTab('bookmark')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${modalActiveTab === 'bookmark'
                                        ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white'
                                        : 'border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <Bookmark size={18} fill={modalActiveTab === 'bookmark' ? 'currentColor' : 'none'} /> Bookmark
                                </button>
                            </div>

                            {/* Content / Interaction List */}
                            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
                                {loadingModalData ? (
                                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                        Loading interactions...
                                    </div>
                                ) : (
                                    <>
                                        {modalActiveTab === 'comment' && (
                                            modalData.comments?.length > 0 ? (
                                                modalData.comments.map((comment, i) => (
                                                    <div key={comment.id || i} className="flex items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                                        <div
                                                            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
                                                            onClick={() => navigateToUserProfile(comment.userId)}
                                                        >
                                                            <img
                                                                src={getMediaUrl(comment.profilePicture) || `https://ui-avatars.com/api/?name=${comment.username}&background=random`}
                                                                className="w-full h-full object-cover"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex-1 border-b border-gray-50 dark:border-white/5 pb-3">
                                                            <div className="flex items-center justify-between">
                                                                <h4
                                                                    className="font-bold text-gray-900 dark:text-white text-sm capitalize cursor-pointer hover:text-purple-600 transition-colors"
                                                                    onClick={() => navigateToUserProfile(comment.userId)}
                                                                >
                                                                    {comment.username || 'User'}
                                                                </h4>
                                                                <span className="text-[10px] text-gray-400">{formatDateShort(comment.createdAt)}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{comment.text}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                                    <MessageCircle size={32} className="mb-2 opacity-20" />
                                                    <p className="text-sm font-medium">No comments yet</p>
                                                </div>
                                            )
                                        )}

                                        {modalActiveTab === 'like' && (
                                            modalData.likes?.length > 0 ? (
                                                modalData.likes.map((like, i) => (
                                                    <div key={like.id || i} className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
                                                        <div
                                                            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
                                                            onClick={() => navigateToUserProfile(like.userId || like.reactorId)}
                                                        >
                                                            <img
                                                                src={getMediaUrl(like.profilePicture) || `https://ui-avatars.com/api/?name=${like.username}&background=random`}
                                                                className="w-full h-full object-cover"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex-1 border-b border-gray-50 dark:border-white/5 pb-3">
                                                            <h4
                                                                className="font-bold text-gray-900 dark:text-white text-sm capitalize cursor-pointer hover:text-purple-600 transition-colors"
                                                                onClick={() => navigateToUserProfile(like.userId || like.reactorId)}
                                                            >
                                                                {like.username || `User_${String(like.userId || like.reactorId || i).substring(0, 4)}`}
                                                            </h4>
                                                            <p className="text-[10px] text-purple-500 font-medium">Liked this content</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                                    <Heart size={32} className="mb-2 opacity-20" />
                                                    <p className="text-sm font-medium">No likes yet</p>
                                                </div>
                                            )
                                        )}

                                        {modalActiveTab === 'bookmark' && (
                                            modalData.bookmarks?.length > 0 ? (
                                                modalData.bookmarks.map((bookmark, i) => (
                                                    <div key={bookmark.id || i} className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
                                                        <div
                                                            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
                                                            onClick={() => navigateToUserProfile(bookmark.userId)}
                                                        >
                                                            <img
                                                                src={getMediaUrl(bookmark.profilePicture) || `https://ui-avatars.com/api/?name=${bookmark.username}&background=random`}
                                                                className="w-full h-full object-cover"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex-1 border-b border-gray-50 dark:border-white/5 pb-3">
                                                            <h4
                                                                className="font-bold text-gray-900 dark:text-white text-sm capitalize cursor-pointer hover:text-purple-600 transition-colors"
                                                                onClick={() => navigateToUserProfile(bookmark.userId)}
                                                            >
                                                                {bookmark.username || `User_${String(bookmark.userId || i).substring(0, 4)}`}
                                                            </h4>
                                                            <p className="text-[10px] text-blue-500 font-medium">Saved to collection</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                                    <Bookmark size={32} className="mb-2 opacity-20" />
                                                    <p className="text-sm font-medium">No bookmarks yet</p>
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
