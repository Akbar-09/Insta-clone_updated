import React, { useState } from 'react';
import { Image, Play, Trash2, Eye, AlertCircle } from 'lucide-react';

const PostItem = () => (
    <div className="glass-card rounded-xl overflow-hidden group">
        <div className="relative aspect-square bg-gray-200 dark:bg-gray-900">
            <img
                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1000&q=80"
                alt="Post"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute top-2 right-2 flex gap-1">
                <div className="bg-black/50 backdrop-blur-md rounded-full p-1">
                    <Image size={14} className="text-white" />
                </div>
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors">
                    <Eye size={20} />
                </button>
                <button className="p-2 bg-red-500/80 hover:bg-red-600/80 backdrop-blur-md rounded-full text-white transition-colors">
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
        <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <span className="text-sm text-gray-800 dark:text-white font-medium">username</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">Amazing view from the top! 🏔️ #hiking #nature</p>
            <div className="mt-2 text-xs text-gray-400">2 hours ago</div>
        </div>
    </div>
);

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('posts');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Content Management</h1>
                <div className="glass-panel p-1 rounded-xl flex gap-1 w-fit bg-gray-200/50 dark:bg-white/5">
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

            {/* Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <PostItem key={item} />
                ))}
            </div>
        </div>
    );
};

export default ContentManagement;
