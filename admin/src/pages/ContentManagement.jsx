import React, { useState } from 'react';
import { Eye, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const ContentManagement = ({ initialTab = 'posts' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for posts
    const [posts, setPosts] = useState([
        { id: 1, image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400', username: 'johnbrook', email: 'john@admin.com', postedDate: 'January 19, 2026', postedTime: '11:21 am', likes: 1, comments: 1, status: 'active' },
        { id: 2, image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400', username: 'johnbrook', email: 'john@admin.com', postedDate: 'January 19, 2026', postedTime: '10:58 am', likes: 0, comments: 0, status: 'active' },
        { id: 3, image: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400', username: 'jamesdeep', email: 'james@admin.com', postedDate: 'January 19, 2026', postedTime: '09:32 am', likes: 0, comments: 0, status: 'active' },
        { id: 4, image: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400', username: 'jamesdeep', email: 'james@admin.com', postedDate: 'January 13, 2026', postedTime: '08:30 pm', likes: 1, comments: 2, status: 'active' },
        { id: 5, image: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=400', username: 'johnbrook', email: 'john@admin.com', postedDate: 'August 13, 2025', postedTime: '11:21 am', likes: 29, comments: 12, status: 'active' },
        { id: 6, image: 'https://images.unsplash.com/photo-1682687220015-186f63b8850a?w=400', username: 'jamesdeep', email: 'james@admin.com', postedDate: 'August 03, 2025', postedTime: '10:30 pm', likes: 18, comments: 6, status: 'active' },
    ]);

    const [reels, setReels] = useState([
        { id: 1, image: 'https://images.unsplash.com/photo-1682687221073-6a0f49d6f9bb?w=400', username: 'sarahwilson', email: 'sarah@admin.com', postedDate: 'January 18, 2026', postedTime: '03:15 pm', likes: 45, comments: 8, status: 'active' },
        { id: 2, image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400', username: 'mikejohnson', email: 'mike@admin.com', postedDate: 'January 17, 2026', postedTime: '02:45 pm', likes: 32, comments: 5, status: 'active' },
        { id: 3, image: 'https://images.unsplash.com/photo-1682687220801-eef408f95d71?w=400', username: 'emilydavis', email: 'emily@admin.com', postedDate: 'January 16, 2026', postedTime: '01:20 pm', likes: 67, comments: 15, status: 'active' },
    ]);

    const currentData = activeTab === 'posts' ? posts : reels;
    const setCurrentData = activeTab === 'posts' ? setPosts : setReels;

    const toggleStatus = (id) => {
        setCurrentData(currentData.map(item =>
            item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
        ));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setCurrentData(currentData.filter(item => item.id !== id));
        }
    };

    const filteredData = currentData.filter(item =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {activeTab === 'posts' ? 'Post List' : 'Reel List'}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Dashboard • {activeTab === 'posts' ? 'Post List' : 'Reel List'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />

                    {/* Tab Switcher */}
                    <div className="glass-panel p-1 rounded-xl flex gap-1 bg-gray-200/50 dark:bg-white/5">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'posts' ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}
                        >
                            Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('reels')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'reels' ? 'bg-white dark:bg-white/20 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}
                        >
                            Reels
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{activeTab === 'posts' ? 'POST' : 'REEL'} IMAGE</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">USERNAME</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">POSTED DATE/TIME</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">LIKES</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">COMMENTS</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {filteredData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">{index + 1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={item.image}
                                            alt={`${activeTab} by ${item.username}`}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                                {item.username[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.username}</p>
                                                <p className="text-xs text-gray-500">{item.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{item.postedDate}</p>
                                            <p className="text-xs text-gray-500">{item.postedTime}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {item.likes} {item.likes === 1 ? 'Like' : 'Likes'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {item.comments} {item.comments === 1 ? 'Comment' : 'Comments'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(item.id)}
                                            className="flex items-center gap-2 group"
                                        >
                                            {item.status === 'active' ? (
                                                <div className="w-10 h-6 bg-purple-500 rounded-full relative transition-colors group-hover:bg-purple-600">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                            ) : (
                                                <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors group-hover:bg-gray-400">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors"
                                                title="View"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredData.length === 0 && (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No {activeTab} Found</h3>
                    <p className="text-sm text-gray-500">There are no {activeTab} matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
