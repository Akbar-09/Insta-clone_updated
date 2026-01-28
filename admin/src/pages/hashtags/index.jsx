import React, { useState } from 'react';
import { Hash, TrendingUp, ToggleLeft, ToggleRight, Trash2, Search } from 'lucide-react';

const HashtagManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hashtags, setHashtags] = useState([
        { id: 1, tag: '#travel', posts: 12500, reels: 3400, status: 'active', trending: true },
        { id: 2, tag: '#food', posts: 9800, reels: 2100, status: 'active', trending: false },
        { id: 3, tag: '#fitness', posts: 8700, reels: 4500, status: 'active', trending: true },
        { id: 4, tag: '#fashion', posts: 7600, reels: 1800, status: 'active', trending: false },
        { id: 5, tag: '#photography', posts: 6500, reels: 900, status: 'active', trending: false },
        { id: 6, tag: '#nature', posts: 5400, reels: 1200, status: 'inactive', trending: false },
        { id: 7, tag: '#art', posts: 4800, reels: 800, status: 'active', trending: false },
        { id: 8, tag: '#music', posts: 4200, reels: 2300, status: 'active', trending: true },
    ]);

    const toggleStatus = (id) => {
        setHashtags(hashtags.map(h =>
            h.id === id ? { ...h, status: h.status === 'active' ? 'inactive' : 'active' } : h
        ));
    };

    const removeHashtag = (id) => {
        setHashtags(hashtags.filter(h => h.id !== id));
    };

    const filteredHashtags = hashtags.filter(h =>
        h.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
            </div>

            {/* Hashtags Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
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
                            {filteredHashtags.map((hashtag) => (
                                <tr key={hashtag.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <Hash className="text-white" size={20} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-white">{hashtag.tag}</p>
                                                {hashtag.trending && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 font-medium">
                                                        <TrendingUp size={12} /> Trending
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{hashtag.posts.toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{hashtag.reels.toLocaleString()}</p>
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
                                                onClick={() => toggleStatus(hashtag.id)}
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                                title={hashtag.status === 'active' ? 'Disable' : 'Enable'}
                                            >
                                                {hashtag.status === 'active' ? (
                                                    <ToggleRight className="text-green-600" size={20} />
                                                ) : (
                                                    <ToggleLeft className="text-gray-400" size={20} />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => removeHashtag(hashtag.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                title="Remove"
                                            >
                                                <Trash2 className="text-red-600" size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HashtagManagement;
