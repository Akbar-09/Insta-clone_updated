import React, { useState, useEffect } from 'react';
import { Hash, TrendingUp, ToggleLeft, ToggleRight, Trash2, Search, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const HashtagManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchHashtags();
        }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [searchQuery, pagination.page]);

    const fetchHashtags = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listHashtags({
                search: searchQuery,
                page: pagination.page,
                limit: pagination.limit
            });
            if (res.success) {
                setHashtags(res.data.hashtags);
                setPagination(prev => ({
                    ...prev,
                    total: res.data.pagination.total,
                    totalPages: res.data.pagination.totalPages
                }));
            }
        } catch (error) {
            console.error('Error fetching hashtags:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        try {
            setActionLoading(id);
            const res = await adminApi.toggleHashtagVisibility(id);
            if (res.success) {
                setHashtags(hashtags.map(h =>
                    h.id === id ? { ...h, status: res.data.status } : h
                ));
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const removeHashtag = async (id) => {
        if (!confirm('Are you sure you want to delete this hashtag?')) return;
        try {
            setActionLoading(id);
            const res = await adminApi.deleteHashtag(id);
            if (res.success) {
                setHashtags(hashtags.filter(h => h.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete hashtag:', error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hashtag Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and monitor trending hashtags</p>
                </div>
            </div>

            {/* Search */}
            <div className="glass-card p-4 rounded-2xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search hashtags..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
            </div>

            {/* Hashtags Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hashtag</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Posts</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reels</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center gap-2 text-gray-500">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Loading hashtags...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : hashtags.length > 0 ? (
                                hashtags.map((hashtag) => (
                                    <tr key={hashtag.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                    <Hash className="text-white" size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{hashtag.name}</p>
                                                    {hashtag.isTrending && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 font-medium">
                                                            <TrendingUp size={12} /> Trending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{(hashtag.postsCount || 0).toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{(hashtag.reelsCount || 0).toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${hashtag.status === 'active'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                                                }`}>
                                                {hashtag.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    disabled={actionLoading === hashtag.id}
                                                    onClick={() => toggleStatus(hashtag.id)}
                                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                                                    title={hashtag.status === 'active' ? 'Disable' : 'Enable'}
                                                >
                                                    {actionLoading === hashtag.id ? <Loader2 className="animate-spin" size={20} /> : (
                                                        hashtag.status === 'active' ? (
                                                            <ToggleRight className="text-green-600" size={20} />
                                                        ) : (
                                                            <ToggleLeft className="text-gray-400" size={20} />
                                                        )
                                                    )}
                                                </button>
                                                <button
                                                    disabled={actionLoading === hashtag.id}
                                                    onClick={() => removeHashtag(hashtag.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                                                    title="Remove"
                                                >
                                                    {actionLoading === hashtag.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 className="text-red-600" size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No hashtags found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HashtagManagement;
