import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, ArrowUp, ArrowDown, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
    getActivityLikes,
    getActivityComments,
    getActivityStoryReplies,
    getActivityReviews,
    deleteComment,
    unlikePost,
    unlikeReel,
    getActivityReelLikes
} from '../../api/activityApi';

const Interactions = () => {
    const { user, token } = useAuth();
    const [activeTab, setActiveTab] = useState('likes');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [sort, setSort] = useState('newest'); // 'newest' | 'oldest'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);

    const tabs = [
        { id: 'likes', label: 'Likes' },
        { id: 'comments', label: 'Comments' },
        { id: 'replies', label: 'Story replies' },
        { id: 'reviews', label: 'Reviews' },
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

            if (activeTab === 'likes') {
                // Fetch both post likes and reel likes
                // Import of getActivityReelLikes is now valid.
                // Note: getActivityLikes returns axios response, so we need .data
                const [postsRes, reelsRes] = await Promise.all([
                    getActivityLikes(params),
                    getActivityReelLikes(params)
                ]);

                const postsData = postsRes.data;
                const reelsData = reelsRes.data;

                const posts = (postsData.data || []).map(p => ({ ...p, type: 'post' }));
                const reels = (reelsData.data || []).map(r => ({ ...r, type: 'reel' }));

                // Merge and sort
                data = [...posts, ...reels].sort((a, b) => {
                    const dateA = new Date(a.likedAt || a.createdAt);
                    const dateB = new Date(b.likedAt || b.createdAt);
                    return sort === 'newest' ? dateB - dateA : dateA - dateB;
                });

            } else if (activeTab === 'comments') {
                const res = await getActivityComments(params);
                data = res.data.data || [];

            } else if (activeTab === 'replies') {
                const res = await getActivityStoryReplies(params);
                data = res.data.data || [];

            } else if (activeTab === 'reviews') {
                const res = await getActivityReviews(params);
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

    const handleDelete = async (id, type) => {
        if (!confirm('Are you sure you want to delete this interaction?')) return;

        // Optimistic update
        const previousItems = [...items];
        setItems(items.filter(item => item.id !== id));

        try {
            if (activeTab === 'comments') {
                await deleteComment(id);
            } else if (activeTab === 'likes') {
                if (type === 'post') {
                    await unlikePost(id);
                } else {
                    await unlikeReel(id);
                }
            }
            // No need to refetch if successful, as we already updated UI
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete item');
            setItems(previousItems); // Revert
        }
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Top Bar content container */}
            <div className="px-6 pt-8 pb-4">
                <h2 className="text-xl font-bold mb-1 text-text-primary">Interactions</h2>
                <p className="text-sm text-text-secondary mb-6">Review and delete likes, comments and your other interactions.</p>

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
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-xl font-bold mb-2">No interactions</div>
                        <p className="text-text-secondary">You haven't interacted with anything yet.</p>
                    </div>
                ) : (
                    <>
                        {/* LIKES - GRID VIEW */}
                        {activeTab === 'likes' && (
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                {items.map(item => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="aspect-square relative group cursor-pointer overflow-hidden border border-border/50 bg-gray-100 dark:bg-neutral-800"
                                        onClick={() => handleDelete(item.id, item.type)} // For now, click to delete or navigate
                                    >
                                        {item.type === 'post' ? (
                                            item.mediaType === 'video' ? (
                                                <video src={item.mediaUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={item.mediaUrl} alt="Like" className="w-full h-full object-cover" />
                                            )
                                        ) : (
                                            <video src={item.videoUrl || item.mediaUrl} className="w-full h-full object-cover" />
                                        )}

                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {(item.mediaType === 'video' || item.type === 'reel') && (
                                            <div className="absolute top-2 right-2">
                                                <svg viewBox="0 0 24 24" fill="white" width="16" height="16" className="drop-shadow-md">
                                                    <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Unlike Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                                            <span className="text-white font-semibold text-xs bg-red-500 px-2 py-1 rounded">Unlike</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* COMMENTS - LIST VIEW */}
                        {activeTab === 'comments' && (
                            <div className="flex flex-col space-y-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-start justify-between py-3 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                                        <div className="flex items-start">
                                            {/* <img src={item.avatar || '/default-avatar.png'} alt="User" className="w-10 h-10 rounded-full object-cover mr-3" /> */}
                                            <div className="flex flex-col text-sm">
                                                <div className="flex items-center flex-wrap">
                                                    <span className="font-bold mr-1">{item.username || 'You'}</span>
                                                    <span className="text-text-primary mr-1">{item.text}</span>
                                                </div>
                                                <span className="text-text-secondary text-xs mt-0.5">{formatDate(item.createdAt)}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                            className="text-xs text-red-500 opacity-0 group-hover:opacity-100 font-semibold px-2"
                                        >
                                            Delete
                                        </button>
                                        {/* <img src={item.thumbnail} alt="Post" className="w-10 h-10 object-cover rounded ml-3 border border-border" /> */}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* STORY REPLIES - LIST VIEW */}
                        {activeTab === 'replies' && (
                            <div className="flex flex-col space-y-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-start justify-between py-3 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                                        <div className="flex items-start">
                                            <div className="flex flex-col text-sm">
                                                <div className="flex items-center flex-wrap">
                                                    <span className="font-bold mr-1">You replied to story</span>
                                                    <span className="text-text-primary">{item.content}</span>
                                                </div>
                                                <span className="text-text-secondary text-xs mt-0.5">{formatDate(item.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* REVIEWS - LIST VIEW */}
                        {activeTab === 'reviews' && (
                            <div className="flex flex-col space-y-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-start justify-between py-3 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                                        <div className="flex items-start">
                                            <div className="flex flex-col text-sm">
                                                <div className="flex items-center flex-wrap">
                                                    <span className="font-bold mr-1">Review</span>
                                                    <span className="text-text-primary">{item.content}</span>
                                                </div>
                                                <span className="text-text-secondary text-xs mt-0.5">{formatDate(item.createdAt)}</span>
                                            </div>
                                        </div>
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

export default Interactions;