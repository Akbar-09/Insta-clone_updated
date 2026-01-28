import React, { useState } from 'react';
import { Ban, Unlock, Trash2, Eye, Calendar } from 'lucide-react';

const BlockList = () => {
    const [blockedUsers, setBlockedUsers] = useState([
        { id: 1, username: '@mike_wilson', email: 'mike@example.com', reason: 'Spam and harassment', blockedDate: '2024-01-15', blockedBy: 'Admin User', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
        { id: 2, username: '@sarah_jones', email: 'sarah@example.com', reason: 'Inappropriate content', blockedDate: '2024-01-12', blockedBy: 'Admin User', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
        { id: 3, username: '@alex_brown', email: 'alex@example.com', reason: 'Multiple policy violations', blockedDate: '2024-01-10', blockedBy: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
        { id: 4, username: '@emma_davis', email: 'emma@example.com', reason: 'Fake account', blockedDate: '2024-01-08', blockedBy: 'Admin User', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    ]);

    const handleUnblock = (id) => {
        if (confirm('Are you sure you want to unblock this user?')) {
            setBlockedUsers(blockedUsers.filter(user => user.id !== id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to permanently delete this user account?')) {
            setBlockedUsers(blockedUsers.filter(user => user.id !== id));
        }
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

            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Blocked Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Blocked By</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {blockedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-white">{user.username}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                            {user.reason}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar size={14} />
                                            {new Date(user.blockedDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{user.blockedBy}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleUnblock(user.id)}
                                                className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
                                                title="Unblock User"
                                            >
                                                <Unlock className="text-green-600 group-hover:text-green-700" size={18} />
                                            </button>
                                            <button
                                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
                                                title="View Details"
                                            >
                                                <Eye className="text-blue-600 group-hover:text-blue-700" size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
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
                </div>
            </div>

            {blockedUsers.length === 0 && (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <Ban className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Blocked Users</h3>
                    <p className="text-sm text-gray-500">There are no blocked users at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default BlockList;
