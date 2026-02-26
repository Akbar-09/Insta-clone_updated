import React, { useState, useEffect } from 'react';
import { Search, Ban, Trash2, Eye, CheckCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as adminApi from '../../api/adminApi';

const UserManagement = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

    useEffect(() => {
        fetchUsers();
    }, [pagination.page, searchTerm]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listUsers({
                page: pagination.page,
                limit: pagination.limit,
                search: searchTerm
            });
            if (res.success) {
                setUsers(res.data);
                setPagination(prev => ({
                    ...prev,
                    total: res.pagination?.total || 0,
                    totalPages: res.pagination?.totalPages || 1
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBan = async (user) => {
        try {
            if (user.accountStatus === 'banned') {
                await adminApi.unbanUser(user.userId);
            } else {
                await adminApi.banUser(user.userId);
            }
            fetchUsers();
        } catch (error) {
            alert('Failed to update user status');
        }
    };

    const handleDelete = async (userId) => {
        if (!confirm('Are you sure you want to delete this user? This is a soft delete.')) return;
        try {
            await adminApi.deleteUser(userId);
            fetchUsers();
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    const handleViewDetails = (userId) => {
        navigate(`/user-list/user-profile/${userId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
    };

    const getMediaUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = window.location.origin;
        const cleanUrl = url.startsWith('/') ? url : `/${url}`;
        return `${baseUrl}${cleanUrl}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User List</h1>
                    <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-gray-500 cursor-pointer hover:text-purple-600 transition-colors" onClick={() => navigate('/dashboard')}>Dashboard</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400">User List</span>
                    </div>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f8fafc] dark:bg-white/5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4">S.L</th>
                                <th className="p-4">USERNAME</th>
                                <th className="p-4">CREATED DATE/TIME</th>
                                <th className="p-4">LOGIN TYPE</th>
                                <th className="p-4">ACCOUNT STATUS</th>
                                <th className="p-4">TOTAL REPORTS</th>
                                <th className="p-4 text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm text-gray-700 dark:text-white">
                            {loading && users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center text-gray-400">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center text-gray-400">No users found</td>
                                </tr>
                            ) : users.map((user, index) => (
                                <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-semibold text-blue-500">
                                        {(pagination.page - 1) * pagination.limit + index + 1}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                                <img
                                                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                                    alt={user.username}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.username}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-800 dark:text-gray-200">{formatDate(user.createdAt)}</div>
                                        <div className="text-xs text-gray-400">{formatTime(user.createdAt)}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${user.loginProvider === 'google' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {user.loginProvider === 'google' ? 'Google' : 'Mobile Number'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${user.accountStatus === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                            {user.accountStatus === 'active' ? 'Active' : 'Banned'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-gray-600 dark:text-gray-300">
                                        {user.reportCount || 0} report
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                title="View Details"
                                                className="p-2 bg-green-50 hover:bg-green-100 text-green-500 rounded-full transition-all"
                                                onClick={() => handleViewDetails(user.userId)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                title={user.accountStatus === 'banned' ? "Unban User" : "Ban User"}
                                                className={`p-2 rounded-full transition-all ${user.accountStatus === 'banned'
                                                    ? 'bg-green-50 hover:bg-green-100 text-green-500'
                                                    : 'bg-red-50 hover:bg-red-100 text-red-500'
                                                    }`}
                                                onClick={() => handleBan(user)}
                                            >
                                                {user.accountStatus === 'banned' ? <CheckCircle size={18} /> : <Ban size={18} />}
                                            </button>
                                            <button
                                                title="Delete User"
                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all"
                                                onClick={() => handleDelete(user.userId)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
                            <option>10</option>
                        </select>
                        <span>Showing {pagination.total} results</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagination.page === 1}
                            onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(pagination.totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPagination(p => ({ ...p, page: i + 1 }))}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${pagination.page === i + 1 ? 'bg-purple-600 text-white font-bold' : 'hover:bg-gray-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={pagination.page >= (pagination.totalPages || 1)}
                            onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
