import React, { useState, useEffect } from 'react';
import { Eye, Trash2, X, Heart, MessageCircle, Bookmark, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as adminApi from '../../api/adminApi';

const StoryManagement = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [modalActiveTab, setModalActiveTab] = useState('view');
    const [modalData, setModalData] = useState({ views: [], likes: [] });
    const [loadingModalData, setLoadingModalData] = useState(false);

    useEffect(() => {
        fetchStories();
    }, [pagination.page, searchQuery, statusFilter]);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listStories({
                page: pagination.page,
                limit: pagination.limit,
                search: searchQuery,
                status: statusFilter === 'all' ? undefined : statusFilter
            });
            if (res.success) {
                setStories(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this story?')) return;
        try {
            await adminApi.deleteStory(id);
            fetchStories();
        } catch (error) {
            alert('Failed to delete story');
        }
    };

    const handleViewDetails = async (story) => {
        setSelectedItem(story);
        setModalActiveTab('view');
        setViewModalOpen(true);
        try {
            setLoadingModalData(true);
            const res = await adminApi.getStoryInteractions(story.id);
            if (res.success) {
                setModalData(res.data);
            }
        } catch (error) {
            console.error('Error fetching story interactions:', error);
        } finally {
            setLoadingModalData(false);
        }
    };

    const formatDateShort = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' ' +
            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    };

    const navigateToUserProfile = (userId) => {
        // Navigate to the new user profile page
        navigate(`/user-list/user-profile/${userId}`);
    };

    const getMediaUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = 'http://localhost:5000';
        const cleanUrl = url.startsWith('/') ? url : `/${url}`;
        return `${baseUrl}${cleanUrl}`;
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Stories List</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dashboard • Stories List</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white focus:outline-none"
                    >
                        <option value="all">All Stories</option>
                        <option value="live">Live Only</option>
                        <option value="expired">Expired Only</option>
                    </select>

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
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">S.L</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">STORY IMAGE</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">USERNAME</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">POSTED DATE/TIME</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">VIEWS</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">LIKES</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">Loading stories...</td>
                                </tr>
                            ) : stories.map((story, index) => {
                                const isLive = new Date(story.expiresAt) > new Date();
                                return (
                                    <tr key={story.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                                                {(pagination.page - 1) * pagination.limit + index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
                                                <img
                                                    src={story.mediaUrl?.startsWith('http') ? story.mediaUrl : story.mediaUrl?.startsWith('/') ? story.mediaUrl : `/uploads/${story.mediaUrl}`}
                                                    alt={`Story by ${story.username}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
                                                    onClick={() => navigateToUserProfile(story.userId)}
                                                >
                                                    <img
                                                        src={getMediaUrl(story.userProfilePicture) || `https://ui-avatars.com/api/?name=${story.username}&background=random`}
                                                        alt={story.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-800 dark:text-white">{story.username}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium lowercase">{story.username}@demo.com</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                    {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <p className="text-[11px] text-gray-400 font-medium">
                                                    {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold ${isLive
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}>
                                                {isLive ? `Live(${Math.ceil((new Date(story.expiresAt) - new Date()) / (1000 * 60 * 60))}h)` : 'Expired'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            {story.viewsCount || 0} View
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                            {story.likesCount || 0} Like
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="p-2 rounded-full bg-green-50 text-green-500 hover:bg-green-100 transition-all"
                                                    title="View"
                                                    onClick={() => handleViewDetails(story)}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                                    title="Delete"
                                                    onClick={() => handleDelete(story.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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

            {!loading && stories.length === 0 && (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Stories Found</h3>
                    <p className="text-sm text-gray-500">There are no stories matching your search.</p>
                </div>
            )}

            {/* Story Detail Modal */}
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
                            {selectedItem.mediaType === 'VIDEO' ? (
                                <video
                                    src={selectedItem.mediaUrl?.startsWith('http') ? selectedItem.mediaUrl : selectedItem.mediaUrl?.startsWith('/') ? selectedItem.mediaUrl : `/uploads/${selectedItem.mediaUrl}`}
                                    className="max-w-full max-h-full object-contain"
                                    controls
                                    autoPlay
                                    onError={(e) => {
                                        console.error('Video load error:', e);
                                        e.target.style.display = 'none';
                                        const errorDiv = document.createElement('div');
                                        errorDiv.className = 'text-white text-center p-8';
                                        errorDiv.innerHTML = '<p>Failed to load video</p>';
                                        e.target.parentNode.appendChild(errorDiv);
                                    }}
                                />
                            ) : (
                                <img
                                    src={selectedItem.mediaUrl?.startsWith('http') ? selectedItem.mediaUrl : selectedItem.mediaUrl?.startsWith('/') ? selectedItem.mediaUrl : `/uploads/${selectedItem.mediaUrl}`}
                                    alt="Story content"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        console.error('Image load error:', e);
                                        console.log('Attempted URL:', e.target.src);
                                        console.log('Original mediaUrl:', selectedItem.mediaUrl);
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
                                    }}
                                />
                            )}
                        </div>

                        {/* Right: Details */}
                        <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-[#1e293b]">
                            {/* User Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full border-2 border-purple-500 p-0.5 overflow-hidden cursor-pointer"
                                    onClick={() => navigateToUserProfile(selectedItem.userId)}
                                >
                                    <img
                                        src={getMediaUrl(selectedItem.userProfilePicture) || `https://ui-avatars.com/api/?name=${selectedItem.username}&background=random`}
                                        alt={selectedItem.username}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="cursor-pointer" onClick={() => navigateToUserProfile(selectedItem.userId)}>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedItem.username}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{formatDateShort(selectedItem.createdAt)}</p>
                                </div>
                            </div>

                            {/* Interaction Tabs */}
                            <div className="px-6 py-4 flex items-center gap-3">
                                <button
                                    onClick={() => setModalActiveTab('view')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${modalActiveTab === 'view'
                                        ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-500/30'
                                        : 'border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <Eye size={18} /> View
                                </button>
                                <button
                                    onClick={() => setModalActiveTab('like')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${modalActiveTab === 'like'
                                        ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:border-purple-500/30'
                                        : 'border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <Heart size={18} fill={modalActiveTab === 'like' ? 'currentColor' : 'none'} /> Like
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
                                        {modalActiveTab === 'view' && (
                                            modalData.views?.length > 0 ? (
                                                modalData.views.map((view, i) => (
                                                    <div
                                                        key={view.id || i}
                                                        className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl p-2 -mx-2 transition-colors"
                                                        onClick={() => navigateToUserProfile(view.viewerId)}
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-white/10">
                                                            <img
                                                                src={view.profilePicture?.startsWith('http')
                                                                    ? view.profilePicture
                                                                    : view.profilePicture
                                                                        ? (view.profilePicture?.startsWith('/') ? view.profilePicture : `/uploads/${view.profilePicture}`)
                                                                        : `https://ui-avatars.com/api/?name=${view.username}&background=random`
                                                                }
                                                                alt={view.username}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = `https://ui-avatars.com/api/?name=${view.username}&background=random`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1 border-b border-gray-50 dark:border-white/5 pb-3">
                                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm capitalize">{view.username}</h4>
                                                            <p className="text-[10px] text-gray-400">{new Date(view.viewedAt).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                                    <Eye size={32} className="mb-2 opacity-20" />
                                                    <p className="text-sm font-medium">No views yet</p>
                                                </div>
                                            )
                                        )}

                                        {modalActiveTab === 'like' && (
                                            modalData.likes?.length > 0 ? (
                                                modalData.likes.map((like, i) => (
                                                    <div
                                                        key={like.id || i}
                                                        className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl p-2 -mx-2 transition-colors"
                                                        onClick={() => navigateToUserProfile(like.reactorId)}
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-white/10">
                                                            <img
                                                                src={like.profilePicture?.startsWith('http')
                                                                    ? like.profilePicture
                                                                    : like.profilePicture
                                                                        ? (like.profilePicture?.startsWith('/') ? like.profilePicture : `/uploads/${like.profilePicture}`)
                                                                        : `https://ui-avatars.com/api/?name=${like.username}&background=random`
                                                                }
                                                                alt={like.username}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = `https://ui-avatars.com/api/?name=${like.username}&background=random`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1 border-b border-gray-50 dark:border-white/5 pb-3">
                                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm capitalize">{like.username}</h4>
                                                            <p className="text-[10px] text-purple-500 font-medium">Liked this story</p>
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

export default StoryManagement;
