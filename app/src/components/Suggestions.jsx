import { useState, useEffect, useContext } from 'react';
import { Play, Heart, UserPlus, Hash, Sparkles, MessageCircle } from 'lucide-react';
import UserCard from './UserCard';
import { getSuggestions } from '../api/profileApi';
import { getNotifications } from '../api/notificationApi';
import { AuthContext } from '../context/AuthContext';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import SwitchAccountModal from './SwitchAccountModal';

const TRENDING_HASHTAGS = [
    '#fitness', '#travel', '#inspiration', '#codinglife', '#photography', '#nature', '#art', '#foodie'
];

const Suggestions = () => {
    const { user: currentUser } = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);
    const [activities, setActivities] = useState([]);
    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Suggestions
                const suggestionsRes = await getSuggestions();
                if (suggestionsRes.status === 'success') {
                    const mapped = suggestionsRes.data.map(u => ({
                        id: u.userId,
                        username: u.username,
                        name: u.fullName || u.username,
                        avatar: u.profilePicture,
                        mutual: 'Suggested for you',
                        type: 'USER',
                        isFollowing: u.isFollowing // Backend returns this as false for suggestions
                    }));
                    setSuggestions(mapped);
                }

                // Fetch Latest Activity
                const notifRes = await getNotifications(3); // Limit 3
                if (notifRes.data.status === 'success') {
                    setActivities(notifRes.data.data);
                }
            } catch (e) {
                console.error("Failed to fetch sidebar data", e);
            }
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    const getActivityIcon = (type) => {
        switch (type) {
            case 'LIKE': return <Heart size={14} className="text-red-500" />;
            case 'FOLLOW': return <UserPlus size={14} className="text-blue-500" />;
            case 'COMMENT': return <MessageCircle size={14} className="text-green-500" />;
            case 'MENTION': return <Hash size={14} />;
            default: return <Sparkles size={14} />;
        }
    };

    const getActivityText = (act) => {
        switch (act.type) {
            case 'LIKE': return `${act.fromUsername} liked your post`;
            case 'FOLLOW': return `${act.fromUsername} started following you`;
            case 'COMMENT': return `${act.fromUsername} commented on your post`;
            case 'MENTION': return `${act.fromUsername} mentioned you`;
            case 'REPLY': return `${act.fromUsername} replied to your comment`;
            default: return 'New activity';
        }
    };

    if (!currentUser) return null;

    return (
        <div className="w-[319px] pl-3 h-full flex flex-col overflow-y-auto scrollbar-none pb-4">
            {showSwitchModal && (
                <SwitchAccountModal onClose={() => setShowSwitchModal(false)} />
            )}

            {/* Current User */}
            <div className="flex items-center justify-between mb-2 mt-2 px-2">
                <div className="flex items-center cursor-pointer" onClick={() => navigate(`/profile/${currentUser.id}`)}>
                    {currentUser.profilePicture ? (
                        <img
                            src={currentUser.profilePicture}
                            alt="My Profile"
                            className="w-12 h-12 rounded-full mr-3 object-cover border border-white/20"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full mr-3 bg-gray-700 flex items-center justify-center text-white font-bold">
                            {currentUser.username[0].toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm text-text-primary">{currentUser.username}</span>
                        <span className="text-sm text-text-secondary">{currentUser.fullName || currentUser.username}</span>
                    </div>
                </div>
                <button
                    className="text-blue-btn text-xs font-semibold cursor-pointer hover:text-link transition-colors"
                    onClick={() => setShowSwitchModal(true)}
                >
                    Switch
                </button>
            </div>

            <div className="border-b border-border/40 my-3 mx-2"></div>

            {/* Suggested For You */}
            <div className="flex justify-between mb-3 px-2">
                <span className="font-semibold text-text-secondary text-sm">Suggested for you</span>
                <button
                    className="text-xs font-semibold text-text-primary cursor-pointer hover:text-text-secondary transition-colors"
                    onClick={() => navigate('/explore/people')}
                >
                    See All
                </button>
            </div>

            <div className="flex flex-col mb-6">
                {suggestions.length > 0 ? (
                    suggestions.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            subtitle={user.mutual}
                            followButtonVariant="text"
                        />
                    ))
                ) : (
                    <div className="text-xs text-text-secondary px-2">No suggestions available</div>
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
                    {activities.length > 0 ? activities.map((act, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs text-text-primary">
                            <div className="mt-0.5 text-text-secondary">
                                {getActivityIcon(act.type)}
                            </div>
                            <div>
                                <p>{getActivityText(act)}</p>
                                <span className="text-text-secondary text-[10px]">
                                    {formatDistanceToNowStrict(new Date(act.createdAt))} ago
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="text-xs text-text-secondary">No recent activity</div>
                    )}
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
