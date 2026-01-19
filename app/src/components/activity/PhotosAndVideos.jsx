import { useState } from 'react';
import { ChevronDown, AlertCircle, Copy } from 'lucide-react'; // Using Copy as a placeholder for "select multiple" icon if needed, or just Squares

const MOCK_POSTS = [
    { id: 1, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop', multiple: false },
    { id: 2, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop', multiple: true },
    { id: 3, url: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop', multiple: false },
    { id: 4, url: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=300&h=300&fit=crop', multiple: false },
    { id: 5, url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop', multiple: true },
    { id: 6, url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300&h=300&fit=crop', multiple: false },
];

const PhotosAndVideos = () => {
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'reels' | 'highlights'

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'reels', label: 'Reels' },
        { id: 'highlights', label: 'Highlights' },
    ];

    return (
        <div className="flex flex-col h-full w-full">
            {/* Top Bar content container */}
            <div className="px-6 pt-8 pb-4">
                <h2 className="text-xl font-bold mb-1 text-text-primary">Photos and videos</h2>
                <p className="text-sm text-text-secondary mb-6">View, archive or delete photos and videos you've shared.</p>

                {/* Tabs */}
                <div className="flex border-b border-border mb-4 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-[2px] -mb-[1px]
                                ${activeTab === tab.id
                                    ? 'border-black dark:border-white text-text-primary'
                                    : 'border-transparent text-text-secondary hover:text-text-primary'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="flex items-center text-sm font-semibold text-text-primary cursor-pointer select-none">
                            Newest to oldest
                            <ChevronDown size={16} className="ml-1" />
                        </div>
                        <button className="ml-4 font-semibold text-sm text-blue-btn cursor-pointer">Sort & Filter</button>
                    </div>
                    <button className="text-sm font-semibold text-blue-btn cursor-pointer px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                        Select
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 text-text-primary">

                {/* POSTS - GRID VIEW */}
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
                        {MOCK_POSTS.map(item => (
                            <div key={item.id} className="aspect-square relative group cursor-pointer overflow-hidden border border-border/50">
                                <img src={item.url} alt="Post" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Selection Checkbox Placeholder */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-5 h-5 rounded-full border-2 border-white/80 shadow-sm bg-transparent"></div>
                                </div>

                                {item.multiple && (
                                    <div className="absolute top-2 right-2">
                                        <Copy size={16} className="text-white drop-shadow-md rotate-90" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* REELS - EMPTY STATE */}
                {activeTab === 'reels' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center h-[60vh]">
                        <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4 text-text-primary">
                            <AlertCircle size={32} strokeWidth={1.5} />
                        </div>
                        <div className="text-xl font-bold mb-2">You haven't made any reels</div>
                        <p className="text-text-secondary">When you create a reel, it'll show up here.</p>
                    </div>
                )}

                {/* HIGHLIGHTS - EMPTY STATE */}
                {activeTab === 'highlights' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center h-[60vh]">
                        <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4 text-text-primary">
                            <AlertCircle size={32} strokeWidth={1.5} />
                        </div>
                        <div className="text-xl font-bold mb-2">You haven't made any highlights</div>
                        <p className="text-text-secondary">When you create a highlight, it'll show up here.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PhotosAndVideos;
