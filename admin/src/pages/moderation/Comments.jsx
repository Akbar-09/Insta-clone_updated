import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Trash2, MessageSquare, AlertTriangle, Filter, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const CommentModeration = () => {
    const [filter, setFilter] = useState('pending'); // pending, all, flagged
    const [comments, setComments] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, flagged: 0, approvedToday: 0, removedToday: 0 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchComments();
    }, [filter, pagination.page]);

    const showMessage = (msg, type = 'success') => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchStats = async () => {
        try {
            const res = await adminApi.getCommentStats();
            if (res.success) setStats(res.data);
        } catch (error) {
            console.error('Error fetching comment stats:', error);
        }
    };

    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listComments({
                status: filter === 'all' ? undefined : filter,
                page: pagination.page,
                limit: pagination.limit
            });
            if (res.success) {
                setComments(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action, id) => {
        try {
            setActionLoading(id);
            let res;
            if (action === 'approve') res = await adminApi.approveComment(id);
            if (action === 'remove') res = await adminApi.removeComment(id);
            if (action === 'delete') {
                if (!confirm('Are you sure you want to permanently delete this comment?')) return;
                res = await adminApi.deleteComment(id);
            }

            if (res.success) {
                showMessage(`Comment ${action}d successfully`);
                fetchComments();
                fetchStats();
            }
        } catch (error) {
            showMessage(`Action failed: ${error.message}`, 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'flagged':
                return <span className="px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-md text-xs font-semibold flex items-center gap-1"><AlertTriangle size={12} /> Flagged</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-md text-xs font-semibold">Pending</span>;
            case 'approved':
                return <span className="px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-md text-xs font-semibold">Approved</span>;
            case 'removed':
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-md text-xs font-semibold text-strike">Removed</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-md text-xs font-semibold">{status}</span>;
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

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Comment Moderation</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and action reported comments</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="glass-panel p-1 rounded-xl flex gap-1 bg-gray-200/50 dark:bg-white/5">
                        {['pending', 'flagged', 'all'].map((f) => (
                            <button
                                key={f}
                                onClick={() => { setFilter(f); setPagination(p => ({ ...p, page: 1 })); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Total</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
                </div>
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-yellow-500">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Pending</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.pending}</p>
                </div>
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-red-500">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Flagged</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.flagged}</p>
                </div>
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-green-500">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Approved Today</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.approvedToday}</p>
                </div>
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-gray-500">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Removed Today</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.removedToday}</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-1/4">User & Post</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider w-1/3">Comment Content</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center gap-2 text-gray-500">
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Loading comments...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : comments.length > 0 ? (
                                comments.map((comment) => (
                                    <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-sm text-gray-800 dark:text-white">@{comment.username}</span>
                                                <span className="text-xs text-pink-500 hover:underline cursor-pointer">Post #{comment.postId}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-gray-100 dark:border-white/5 max-w-md">
                                                "{comment.text}"
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(comment.status)}
                                            {comment.reportedCount > 0 && (
                                                <p className="text-[10px] text-red-500 mt-1 font-bold">{comment.reportedCount} Reports</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {comment.status !== 'approved' && (
                                                    <button
                                                        disabled={actionLoading !== null}
                                                        onClick={() => handleAction('approve', comment.id)}
                                                        title="Approve"
                                                        className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === comment.id ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                                                    </button>
                                                )}
                                                {comment.status !== 'removed' && (
                                                    <button
                                                        disabled={actionLoading !== null}
                                                        onClick={() => handleAction('remove', comment.id)}
                                                        title="Reject & Remove (Soft)"
                                                        className="p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === comment.id ? <Loader2 className="animate-spin" size={18} /> : <XCircle size={18} />}
                                                    </button>
                                                )}
                                                <button
                                                    disabled={actionLoading !== null}
                                                    onClick={() => handleAction('delete', comment.id)}
                                                    title="Permanently Delete"
                                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50"
                                                >
                                                    {actionLoading === comment.id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No comments found matching the criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!loading && pagination.totalPages > 1 && (
                    <div className="p-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-center gap-4">
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
            </div>
        </div>
    );
};

export default CommentModeration;
