import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';

const AvatarManagement = () => {
    const [avatars, setAvatars] = useState([
        { id: 1, username: '@john_doe', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', status: 'pending', uploadedDate: '2 hours ago' },
        { id: 2, username: '@jane_smith', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', status: 'pending', uploadedDate: '5 hours ago' },
        { id: 3, username: '@mike_wilson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', status: 'approved', uploadedDate: '1 day ago' },
        { id: 4, username: '@sarah_jones', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', status: 'pending', uploadedDate: '3 hours ago' },
        { id: 5, username: '@alex_brown', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', status: 'rejected', uploadedDate: '2 days ago' },
        { id: 6, username: '@emma_davis', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', status: 'approved', uploadedDate: '3 days ago' },
    ]);

    const [filter, setFilter] = useState('all');

    const handleApprove = (id) => {
        setAvatars(avatars.map(avatar =>
            avatar.id === id ? { ...avatar, status: 'approved' } : avatar
        ));
    };

    const handleReject = (id) => {
        setAvatars(avatars.map(avatar =>
            avatar.id === id ? { ...avatar, status: 'rejected' } : avatar
        ));
    };

    const handleRemove = (id) => {
        if (confirm('Are you sure you want to remove this avatar?')) {
            setAvatars(avatars.filter(avatar => avatar.id !== id));
        }
    };

    const filteredAvatars = filter === 'all' ? avatars : avatars.filter(a => a.status === filter);

    const stats = {
        pending: avatars.filter(a => a.status === 'pending').length,
        approved: avatars.filter(a => a.status === 'approved').length,
        rejected: avatars.filter(a => a.status === 'rejected').length,
    };

    return (
        <div className="space-y-6">
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
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    All ({avatars.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'pending' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Pending ({stats.pending})
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'approved' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Approved ({stats.approved})
                </button>
                <button
                    onClick={() => setFilter('rejected')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'rejected' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                >
                    Rejected ({stats.rejected})
                </button>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAvatars.map((avatar) => (
                    <div key={avatar.id} className="glass-card rounded-2xl overflow-hidden group">
                        <div className="aspect-square relative">
                            <img src={avatar.image} alt={avatar.username} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white font-semibold text-sm truncate">{avatar.username}</p>
                                    <p className="text-white/70 text-xs">{avatar.uploadedDate}</p>
                                </div>
                            </div>
                            {avatar.status !== 'pending' && (
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${avatar.status === 'approved'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                        }`}>
                                        {avatar.status}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-3 flex gap-1">
                            {avatar.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => handleApprove(avatar.id)}
                                        className="flex-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                    >
                                        <CheckCircle size={14} /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(avatar.id)}
                                        className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                    >
                                        <XCircle size={14} /> Reject
                                    </button>
                                </>
                            )}
                            {avatar.status !== 'pending' && (
                                <button
                                    onClick={() => handleRemove(avatar.id)}
                                    className="w-full py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-xs font-medium flex items-center justify-center gap-1"
                                >
                                    <Trash2 size={14} /> Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarManagement;
