import { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, Copy, ArrowUp, ArrowDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getActivityPosts, getActivityReels, getActivityHighlights } from '../../api/activityApi';

const PhotosAndVideos = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'reels' | 'highlights'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [sort, setSort] = useState('newest'); // 'newest' | 'oldest'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'reels', label: 'Reels' },
        { id: 'highlights', label: 'Highlights' },
    ];

    useEffect(() => {
        fetchData();
    }, [activeTab, sort, startDate, endDate, token]);

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            let data = [];
            const params = {
                sort,
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            };

            if (activeTab === 'posts') {
                const res = await getActivityPosts(params);
                data = res.data.data || [];
            } else if (activeTab === 'reels') {
                const res = await getActivityReels(params);
                data = res.data.data || [];
            } else if (activeTab === 'highlights') {
                const res = await getActivityHighlights(params);
                data = res.data.data || [];
            }

            setItems(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">
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
                        <div
                            className="flex items-center text-sm font-semibold text-text-primary cursor-pointer select-none hover:opacity-70"
                            onClick={() => setShowFilterModal(true)}
                        >
                            {sort === 'newest' ? 'Newest to oldest' : 'Oldest to newest'}
                            <ChevronDown size={16} className="ml-1" />
                        </div>
                        <button
                            className="ml-4 font-semibold text-sm text-blue-btn cursor-pointer hover:text-blue-600"
                            onClick={() => setShowFilterModal(true)}
                        >
                            Sort & Filter
                        </button>
                    </div>
                    {/* <button className="text-sm font-semibold text-blue-btn cursor-pointer px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                        Select
                    </button> */}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 text-text-primary">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">{error}</div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center h-[60vh]">
                        <div className="w-16 h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4 text-text-primary">
                            <AlertCircle size={32} strokeWidth={1.5} />
                        </div>
                        <div className="text-xl font-bold mb-2">
                            {activeTab === 'posts' ? "You haven't posted anything" :
                                activeTab === 'reels' ? "You haven't made any reels" :
                                    "No highlights found"}
                        </div>
                        <p className="text-text-secondary">
                            {activeTab === 'posts' ? "When you share photos and videos, they'll appear here." :
                                activeTab === 'reels' ? "When you create a reel, it'll show up here." :
                                    "Stories you've archived will appear here."}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* POSTS - GRID VIEW */}
                        {activeTab === 'posts' && (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="aspect-square relative group cursor-pointer overflow-hidden border border-border/50"
                                        onClick={() => navigate(`/post/${item.id}`)}
                                    >
                                        {item.mediaType === 'video' ? (
                                            <video src={item.mediaUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={item.mediaUrl} alt="Post" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Selection Checkbox Placeholder */}
                                        {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-5 h-5 rounded-full border-2 border-white/80 shadow-sm bg-transparent"></div>
                                        </div> */}

                                        {/* Multiple icon placeholder if needed */}
                                        {/* {item.multiple && (
                                            <div className="absolute top-2 right-2">
                                                <Copy size={16} className="text-white drop-shadow-md rotate-90" />
                                            </div>
                                        )} */}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* REELS - GRID VIEW (Similar to posts) */}
                        {activeTab === 'reels' && (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="aspect-[9/16] relative group cursor-pointer overflow-hidden border border-border/50 bg-black"
                                        onClick={() => navigate('/reels')}
                                    >
                                        <video src={item.videoUrl} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-md">
                                            {item.viewsCount} views
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* HIGHLIGHTS - GRID VIEW */}
                        {activeTab === 'highlights' && (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className="aspect-[9/16] relative group cursor-pointer overflow-hidden border border-border/50 bg-black"
                                        onClick={() => navigate(`/stories/highlights/${item.id}`)}
                                    >
                                        {item.mediaType === 'video' ? (
                                            <video src={item.mediaUrl} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={item.mediaUrl} alt="Story" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                            <h3 className="font-bold text-lg text-center flex-1">Sort & Filter</h3>
                            <button onClick={() => setShowFilterModal(false)}><X size={24} /></button>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Sort */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">Sort by</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                                        <span className="flex items-center">
                                            <ArrowUp size={18} className="mr-3" />
                                            Newest to oldest
                                        </span>
                                        <input
                                            type="radio"
                                            name="sort"
                                            checked={sort === 'newest'}
                                            onChange={() => setSort('newest')}
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                                        <span className="flex items-center">
                                            <ArrowDown size={18} className="mr-3" />
                                            Oldest to newest
                                        </span>
                                        <input
                                            type="radio"
                                            name="sort"
                                            checked={sort === 'oldest'}
                                            onChange={() => setSort('oldest')}
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">Date range</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded bg-transparent text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded bg-transparent text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex gap-3">
                            <button
                                onClick={() => {
                                    setSort('newest');
                                    setStartDate('');
                                    setEndDate('');
                                    setShowFilterModal(false);
                                }}
                                className="flex-1 py-2.5 font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="flex-1 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotosAndVideos;
