import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const AvatarManagement = () => {
    const [avatars, setAvatars] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // stores ID of avatar being processed
    const [filter, setFilter] = useState('all');
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchAvatars();
    }, [filter, pagination.page]);

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchStats = async () => {
        try {
            const res = await adminApi.getAvatarStats();
            if (res.success) setStats(res.data);
        } catch (error) {
            console.error('Error fetching avatar stats:', error);
        }
    };

    const fetchAvatars = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listAvatars({
                status: filter === 'all' ? undefined : filter,
                page: pagination.page,
                limit: pagination.limit
            });
            if (res.success) {
                setAvatars(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching avatars:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            setActionLoading(id);
            const res = await adminApi.approveAvatar(id);
            if (res.success) {
                showMessage('Avatar approved successfully');
                fetchAvatars();
                fetchStats();
            }
        } catch (error) {
            showMessage('Failed to approve avatar', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        try {
            setActionLoading(id);
            const res = await adminApi.rejectAvatar(id);
            if (res.success) {
                showMessage('Avatar rejected successfully');
                fetchAvatars();
                fetchStats();
            }
        } catch (error) {
            showMessage('Failed to reject avatar', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemove = async (id) => {
        if (!confirm('Are you sure you want to remove this avatar?')) return;
        try {
            setActionLoading(id);
            const res = await adminApi.deleteAvatar(id);
            if (res.success) {
                showMessage('Avatar removed successfully');
                fetchAvatars();
                fetchStats();
            }
        } catch (error) {
            showMessage('Failed to remove avatar', 'error');
        } finally {
            setActionLoading(null);
        }
    };



    return (
        <div className="space-y-6 relative">
            {/* Message Toast */}
            {message && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Avatar Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and approve user profile pictures</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Eye className="text-yellow-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Review</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.pending}</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <CheckCircle className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.approved}</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <XCircle className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setFilter('all'); setPagination(p => ({ ...p, page: 1 })); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    All ({stats.total})
                </button>
                <button
                    onClick={() => { setFilter('pending'); setPagination(p => ({ ...p, page: 1 })); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'pending' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Pending ({stats.pending})
                </button>
                <button
                    onClick={() => { setFilter('approved'); setPagination(p => ({ ...p, page: 1 })); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'approved' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Approved ({stats.approved})
                </button>
                <button
                    onClick={() => { setFilter('rejected'); setPagination(p => ({ ...p, page: 1 })); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'rejected' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Rejected ({stats.rejected})
                </button>
            </div>

            {/* Avatar Grid */}
            {loading ? (
                <div className="p-12 text-center text-gray-500">Loading avatars...</div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {avatars.map((avatar) => (
                            <div key={avatar.id} className="glass-card rounded-2xl overflow-hidden group">
                                <div className="aspect-square relative">
                                    <img
                                        src={avatar.avatarUrl?.startsWith('http') ? avatar.avatarUrl : `${window.location.origin}/uploads/${avatar.avatarUrl}`}
                                        alt={avatar.username}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <p className="text-white font-semibold text-sm truncate">{avatar.username}</p>
                                            <p className="text-white/70 text-xs">{new Date(avatar.uploadedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${avatar.status === 'approved'
                                            ? 'bg-green-500 text-white'
                                            : avatar.status === 'rejected'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-yellow-500 text-white'
                                            }`}>
                                            {avatar.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 flex gap-1 font-sans">
                                    {avatar.status === 'pending' ? (
                                        <>
                                            <button
                                                disabled={actionLoading !== null}
                                                onClick={() => handleApprove(avatar.id)}
                                                className={`flex-1 py-2 rounded-lg bg-green-500 text-white transition-colors text-xs font-medium flex items-center justify-center gap-1 ${actionLoading === avatar.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                                            >
                                                {actionLoading === avatar.id ? '...' : <><CheckCircle size={14} /> Approve</>}
                                            </button>
                                            <button
                                                disabled={actionLoading !== null}
                                                onClick={() => handleReject(avatar.id)}
                                                className={`flex-1 py-2 rounded-lg bg-red-500 text-white transition-colors text-xs font-medium flex items-center justify-center gap-1 ${actionLoading === avatar.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                                            >
                                                {actionLoading === avatar.id ? '...' : <><XCircle size={14} /> Reject</>}
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            disabled={actionLoading !== null}
                                            onClick={() => handleRemove(avatar.id)}
                                            className={`w-full py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 transition-colors text-xs font-medium flex items-center justify-center gap-1 ${actionLoading === avatar.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                disabled={pagination.page === 1}
                                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 disabled:opacity-50 text-gray-600 dark:text-gray-300"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 disabled:opacity-50 text-gray-600 dark:text-gray-300"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default AvatarManagement;
