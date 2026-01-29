import React, { useState } from 'react';
import { Search, MoreVertical, Ban, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const users = [
        { id: 1, username: 'sarah_w', email: 'sarah@example.com', status: 'Active', joined: '2023-01-15' },
        { id: 2, username: 'mike_j', email: 'mike@example.com', status: 'Banned', joined: '2023-02-20' },
        { id: 3, username: 'alex_photo', email: 'alex@example.com', status: 'Active', joined: '2023-03-10' },
        { id: 4, username: 'emily_d', email: 'emily@example.com', status: 'Active', joined: '2023-04-05' },
        { id: 5, username: 'spam_bot', email: 'bot@example.com', status: 'Reported', joined: '2023-05-12' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl pl-10 pr-4 py-2 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-200">
                            <tr>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Joined</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-gray-700 dark:text-white">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                                                    alt={user.username}
                                                    className="w-full h-full rounded-full border-2 border-white dark:border-black object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.username}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${user.status === 'Active' ? 'bg-green-500/10 text-green-600 dark:text-green-300 border-green-500/20' :
                                            user.status === 'Banned' ? 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-600 dark:text-yellow-300 border-yellow-500/20'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 dark:text-gray-300">{user.joined}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="View Profile" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-blue-500 dark:text-blue-400 transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            <button title="Ban User" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-yellow-500 dark:text-yellow-400 transition-colors">
                                                <Ban size={18} />
                                            </button>
                                            <button title="Delete User" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-red-500 dark:text-red-400 transition-colors">
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
                <div className="p-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div>Showing 1-5 of 142 users</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
