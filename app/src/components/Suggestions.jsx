import { useRef, useState, useEffect } from 'react';
import { Play, Heart, UserPlus, Hash, Sparkles } from 'lucide-react';
import UserCard from './UserCard';
import { searchUsers } from '../services/searchApi';



const TRENDING_HASHTAGS = [
    '#fitness', '#travel', '#inspiration', '#codinglife', '#photography', '#nature', '#art', '#foodie'
];

const RECENT_ACTIVITY = [
    { type: 'like', text: 'Your post got 12 likes', time: '2m' },
    { type: 'follow', text: 'nehal990 started following you', time: '1h' },
    { type: 'mention', text: 'You were mentioned in a comment', time: '3h' },
];

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Fetch real users so Follow functionality works
        const fetchSuggestions = async () => {
            // Temporary strategy: search for common term to get users
            // In production, this should be a dedicated /users/suggestions endpoint
            // that uses graph logic (friends of friends).
            try {
                // Using 'a' to get some users. 
                const users = await searchUsers('a');
                // Filter out current user if possible (requires auth context, but search might return self)
                // Map to required format
                const mapped = users
                    .filter(u => u.type === 'USER')
                    .slice(0, 5)
                    .map(u => ({
                        id: u.referenceId, // IMPORTANT: Real UUID for FollowButton
                        username: u.content,
                        name: u.metadata?.fullName || u.content,
                        avatar: u.metadata?.profilePicture || 'https://placehold.co/150',
                        mutual: 'Suggested for you'
                    }));
                setSuggestions(mapped);
            } catch (e) {
                console.error("Failed to fetch suggestions", e);
            }
        };
        fetchSuggestions();
    }, []);

    return (
        <div className="w-[319px] pl-3 h-full flex flex-col overflow-y-auto scrollbar-none pb-4">
            {/* Current User */}
            <div className="flex items-center justify-between mb-2 mt-2 px-2">
                <div className="flex items-center cursor-pointer">
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+"
                        alt="My Profile"
                        className="w-12 h-12 rounded-full mr-3 object-cover border border-white/20"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary">khan_akbar_09</span>
                        <span className="text-sm text-text-secondary">Akbar Khan</span>
                    </div>
                </div>
                <button className="text-blue-btn text-xs font-semibold cursor-pointer hover:text-link transition-colors">Switch</button>
            </div>

            <div className="border-b border-border/40 my-3 mx-2"></div>

            {/* Suggested For You */}
            <div className="flex justify-between mb-3 px-2">
                <span className="font-semibold text-text-secondary text-sm">Suggested for you</span>
                <button className="text-xs font-semibold text-text-primary cursor-pointer hover:text-text-secondary transition-colors">See All</button>
            </div>

            <div className="flex flex-col mb-6">
                {suggestions.length > 0 ? (
                    suggestions.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            subtitle={user.mutual}
                        />
                    ))
                ) : (
                    <div className="text-xs text-text-secondary px-2">Loading suggestions...</div>
                )}
            </div>

            {/* Chat with AI Widget */}
            <div className="mb-6 px-2">
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-[20px] p-4 border border-white/10 relative overflow-hidden group cursor-pointer shadow-lg hover:-translate-y-0.5 transition-transform duration-300">
                    <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center relative shadow-inner">
                                <Sparkles size={20} className="text-white animate-pulse" />
                                <div className="absolute inset-0 bg-white/30 rounded-full blur-[2px] animate-pulse"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base leading-tight">Chat with AI</h3>
                                <p className="text-white/70 text-[11px] font-light leading-tight mt-0.5">Ask anything or get suggestions</p>
                            </div>
                        </div>
                        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all">Start</button>
                    </div>
                </div>
            </div>

            {/* Trending Hashtags */}
            <div className="mb-6 px-2">
                <span className="font-semibold text-text-secondary text-sm block mb-3">Trending Hashtags</span>
                <div className="flex flex-wrap gap-2">
                    {TRENDING_HASHTAGS.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-full text-xs text-text-primary cursor-pointer transition-all hover:scale-105 shadow-sm backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Latest Activity (Mini) */}
            <div className="mb-6 px-2">
                <span className="font-semibold text-text-secondary text-sm block mb-3">Latest Activity</span>
                <div className="flex flex-col gap-3">
                    {RECENT_ACTIVITY.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs text-text-primary">
                            <div className="mt-0.5 text-text-secondary">
                                {activity.type === 'like' && <Heart size={14} />}
                                {activity.type === 'follow' && <UserPlus size={14} />}
                                {activity.type === 'mention' && <Hash size={14} />}
                            </div>
                            <div>
                                <p>{activity.text}</p>
                                <span className="text-text-secondary text-[10px]">{activity.time} ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-auto px-2 text-xs text-[#c7c7c7] leading-relaxed opacity-80 pb-6">
                <p className="mb-2 hover:underline cursor-pointer">About · Help · Press · API · Jobs · Privacy · Terms</p>
                <p className="mb-4 hover:underline cursor-pointer">Locations · Language · Jaadoe Verified</p>
                <p className="uppercase text-[11px] font-medium">© 2026 JAADOE FROM JAADOE</p>
            </div>
        </div>
    );
};

export default Suggestions;
