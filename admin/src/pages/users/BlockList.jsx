import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ban, Unlock, Trash2, Eye, Calendar, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const BlockList = () => {
    const navigate = useNavigate();
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlockedUsers();
    }, []);

    const fetchBlockedUsers = async () => {
        try {
            setLoading(true);
            const res = await adminApi.listUsers({ status: 'banned', limit: 100 });
            if (res.success) {
                setBlockedUsers(res.data);
            }
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnblock = async (id) => {
        if (confirm('Are you sure you want to unblock this user?')) {
            try {
                await adminApi.unbanUser(id);
                fetchBlockedUsers();
            } catch (error) {
                alert('Failed to unblock user');
            }
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to permanently delete this user account?')) {
            try {
                await adminApi.deleteUser(id);
                fetchBlockedUsers();
            } catch (error) {
                alert('Failed to delete user');
            }
        }
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Blocked Users</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage blocked user accounts</p>
                </div>
                <div className="glass-card px-4 py-2 rounded-xl">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-bold text-2xl text-gray-800 dark:text-white">{blockedUsers.length}</span> Blocked
                    </p>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="animate-spin text-pink-500" size={40} />
                        <p className="text-gray-500">Loading blocked users...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Blocked Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                                {blockedUsers.map((user) => (
                                    <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={getMediaUrl(user.profilePicture) || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                                    alt={user.username}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{user.username}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                                Policy Violation
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <Calendar size={14} />
                                                {new Date(user.updatedAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleUnblock(user.userId)}
                                                    className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
                                                    title="Unblock User"
                                                >
                                                    <Unlock className="text-green-600 group-hover:text-green-700" size={18} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/user-list/user-profile/${user.userId}`)}
                                                    className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                                                    title="View Details"
                                                >
                                                    <Eye className="text-blue-600 group-hover:text-blue-700" size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.userId)}
                                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                                                    title="Delete Account"
                                                >
                                                    <Trash2 className="text-red-600 group-hover:text-red-700" size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {blockedUsers.length === 0 && !loading && (
                            <div className="p-12 text-center">
                                <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Ban className="text-gray-400" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Blocked Users</h3>
                                <p className="text-sm text-gray-500">There are no blocked users at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockList;
