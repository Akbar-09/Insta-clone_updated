import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MOCK_LIKES = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop' },
    { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop' },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=300&h=300&fit=crop' },
    { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300&h=300&fit=crop' },
    { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop' },
    { id: 8, type: 'video', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
    { id: 9, type: 'image', url: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=300&h=300&fit=crop' },
    { id: 10, type: 'image', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=300&fit=crop' },
];

const MOCK_COMMENTS = [
    {
        id: 1,
        user: 'khan_akbar_09',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
        text: 'Back conditioning 🔥🔥',
        time: '3w',
        thumbnail: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        user: 'alex_fitness',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
        text: 'Insane progress! Keep it up 💪',
        time: '4w',
        thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        user: 'fitness_junkie',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop',
        text: 'What is your routine?',
        time: '5w',
        thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop'
    },
];

const MOCK_REPLIES = [
    {
        id: 1,
        user: 'khan_akbar_09',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
        text: 'voted Yes',
        subtext: 'Poll from xyz',
        time: '1w',
        thumbnail: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=100&h=100&fit=crop',
        isPoll: true
    },
    {
        id: 2,
        user: 'khan_akbar_09',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
        text: '50%',
        subtext: 'Slider from abc',
        time: '2w',
        thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
        isSlider: true
    },
];

const Interactions = () => {
    const [activeTab, setActiveTab] = useState('comments'); // Default to comments as per request or 'likes'

    const tabs = [
        { id: 'likes', label: 'Likes' },
        { id: 'comments', label: 'Comments' },
        { id: 'replies', label: 'Story replies' },
        { id: 'reviews', label: 'Reviews' },
    ];

    return (
        <div className="flex flex-col h-full w-full">
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

                {/* LIKES - GRID VIEW */}
                {activeTab === 'likes' && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                        {MOCK_LIKES.map(item => (
                            <div key={item.id} className="aspect-square relative group cursor-pointer overflow-hidden border border-border/50">
                                <img src={item.url} alt="Like" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {item.type === 'video' && (
                                    <div className="absolute top-2 right-2">
                                        <svg viewBox="0 0 24 24" fill="white" width="16" height="16" className="drop-shadow-md">
                                            <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* COMMENTS - LIST VIEW */}
                {activeTab === 'comments' && (
                    <div className="flex flex-col">
                        {MOCK_COMMENTS.map(item => (
                            <div key={item.id} className="flex items-start justify-between py-3 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                                <div className="flex items-start">
                                    <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover mr-3" />
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center flex-wrap">
                                            <span className="font-bold mr-1">{item.user}</span>
                                            <span className="text-text-primary mr-1">{item.text}</span>
                                        </div>
                                        <span className="text-text-secondary text-xs mt-0.5">{item.time}</span>
                                    </div>
                                </div>
                                <img src={item.thumbnail} alt="Post" className="w-10 h-10 object-cover rounded ml-3 border border-border" />
                            </div>
                        ))}
                    </div>
                )}

                {/* STORY REPLIES - LIST VIEW */}
                {activeTab === 'replies' && (
                    <div className="flex flex-col">
                        {MOCK_REPLIES.map(item => (
                            <div key={item.id} className="flex items-start justify-between py-3 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                                <div className="flex items-start">
                                    <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover mr-3" />
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center flex-wrap">
                                            <span className="font-bold mr-1">{item.user}</span>
                                            <span className="text-text-primary">{item.text}</span>
                                        </div>
                                        {item.subtext && (
                                            <span className="text-text-secondary text-xs">{item.subtext}</span>
                                        )}
                                        <span className="text-text-secondary text-xs mt-0.5">{item.time}</span>
                                    </div>
                                </div>
                                <img src={item.thumbnail} alt="Story" className="w-10 h-16 object-cover rounded ml-3 border border-border" />
                            </div>
                        ))}
                    </div>
                )}

                {/* REVIEWS - EMPTY STATE */}
                {activeTab === 'reviews' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-xl font-bold mb-2">No reviews</div>
                        <p className="text-text-secondary">When you write a review, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Interactions;
