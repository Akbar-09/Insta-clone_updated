import React, { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

const StoryManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [stories, setStories] = useState([
        { id: 1, username: 'jamesdeep', email: 's.jagt@admin.com', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600', postedDate: 'January 02, 2026', postedTime: '02:22 pm', status: 'live', duration: '17d', views: 6, likes: 0 },
        { id: 2, username: 'kathrine12', email: 'kathrine.wil@gmail.com', image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600', postedDate: 'July 03, 2025', postedTime: '04:50 pm', status: 'live', duration: '6M', views: 151, likes: 0 },
        { id: 3, username: 'kathrine12', email: 'kathrine.wil@gmail.com', image: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=600', postedDate: 'July 02, 2025', postedTime: '06:40 pm', status: 'live', duration: '6M', views: 99, likes: 0 },
        { id: 4, username: 'johnbrook', email: 'john@admin.com', image: 'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=600', postedDate: 'June 30, 2025', postedTime: '03:44 pm', status: 'live', duration: '6M', views: 93, likes: 0 },
        { id: 5, username: 'kathrine12', email: 'kathrine.wil@gmail.com', image: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=600', postedDate: 'June 05, 2025', postedTime: '07:22 pm', status: 'expired', duration: '7M', views: 0, likes: 0 },
        { id: 6, username: 'kathrine12', email: 'kathrine.wil@gmail.com', image: 'https://images.unsplash.com/photo-1682687220015-186f63b8850a?w=600', postedDate: 'June 02, 2025', postedTime: '07:30 pm', status: 'expired', duration: '7M', views: 0, likes: 0 },
    ]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this story?')) {
            setStories(stories.filter(story => story.id !== id));
        }
    };

    const filteredStories = stories.filter(story =>
        story.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Stories List</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dashboard • Stories List</p>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">S.L</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">STORY IMAGE</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">USERNAME</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">POSTED DATE/TIME</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">VIEWS</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">LIKES</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {filteredStories.map((story, index) => (
                                <tr key={story.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">{index + 1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={story.image}
                                            alt={`Story by ${story.username}`}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                                {story.username[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800 dark:text-white">{story.username}</p>
                                                <p className="text-xs text-gray-500">{story.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white">{story.postedDate}</p>
                                            <p className="text-xs text-gray-500">{story.postedTime}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${story.status === 'live'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                            {story.status === 'live' ? `Live(${story.duration})` : 'Expired'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {story.views} View{story.views !== 1 ? 's' : ''}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {story.likes} Like{story.likes !== 1 ? 's' : ''}
                                        </span>
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
                                                onClick={() => handleDelete(story.id)}
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

            {filteredStories.length === 0 && (
                <div className="glass-card p-12 rounded-2xl text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No Stories Found</h3>
                    <p className="text-sm text-gray-500">There are no stories matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default StoryManagement;
