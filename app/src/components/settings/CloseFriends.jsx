import { useState, useEffect, useContext } from 'react';
import { getCloseFriends, addCloseFriend, removeCloseFriend } from '../../api/privacyApi';
import { getFollowingList } from '../../api/userApi';
import { searchUsers } from '../../api/searchApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, Search, X, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CloseFriends = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [closeFriends, setCloseFriends] = useState([]); // Array of IDs
    const [cfProfiles, setCfProfiles] = useState([]); // Array of User Objects
    const [candidates, setCandidates] = useState([]); // All following
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    const [cfRes, followingRes] = await Promise.all([
                        getCloseFriends(),
                        getFollowingList(user.id)
                    ]);

                    if (cfRes.data.status === 'success') {
                        setCloseFriends(cfRes.data.data.map(u => u.userId));
                        setCfProfiles(cfRes.data.data);
                    }
                    if (followingRes.status === 'success') {
                        setCandidates(followingRes.data);
                    }
                } catch (err) {
                    console.error('Failed to load close friends', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    // Global Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length > 1) {
                setIsSearching(true);
                try {
                    const res = await searchUsers(searchQuery);
                    if (res.status === 'success') {
                        // Filter out yourself from search results (handles both userId and referenceId)
                        const filtered = res.data.filter(u => {
                            const resultId = u.userId || u.referenceId || u.id;
                            return String(resultId) !== String(user.id || user.userId);
                        });
                        setSearchResults(filtered);
                    }
                } catch (err) {
                    console.error('Search failed', err);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, user.id]);

    const handleToggle = async (friend) => {
        const friendId = friend.userId || friend.referenceId || friend.id;
        const isAdded = closeFriends.includes(friendId);

        // Optimistic Update
        setCloseFriends(prev => isAdded ? prev.filter(id => id !== friendId) : [...prev, friendId]);
        if (!isAdded) {
            setCfProfiles(prev => [...prev, friend]);
        } else {
            setCfProfiles(prev => prev.filter(p => (p.userId || p.referenceId || p.id) !== friendId));
        }

        try {
            if (isAdded) {
                await removeCloseFriend(friendId);
            } else {
                await addCloseFriend(friendId);
            }
        } catch (err) {
            console.error('Failed to update status', err);
            // Revert
            setCloseFriends(prev => isAdded ? [...prev, friendId] : prev.filter(id => id !== friendId));
            if (!isAdded) {
                setCfProfiles(prev => prev.filter(p => (p.userId || p.referenceId || p.id) !== friendId));
            } else {
                setCfProfiles(prev => [...prev, friend]);
            }
        }
    };

    // If searching globally (more than 1 char), show search results. 
    // Otherwise show combined following list and close friends profiles.
    let displayList = [];
    if (searchQuery.trim().length > 1) {
        displayList = searchResults;
    } else {
        // Merge candidates and cfProfiles, ensuring no duplicates
        // Use a Set of normalized IDs for fast lookup
        const candidateIds = new Set(candidates.map(c => String(c.userId || c.id || '')));
        const uniqueCfProfiles = cfProfiles.filter(p => {
            const pId = String(p.userId || p.referenceId || p.id || '');
            return !candidateIds.has(pId);
        });
        displayList = [...uniqueCfProfiles, ...candidates];
    }

    // Sort: Global Search results don't need sorting, but Following List should have Close Friends first
    const finalDisplay = searchQuery.trim().length > 1
        ? displayList
        : [...displayList].sort((a, b) => {
            const aId = a.userId || a.referenceId || a.id;
            const bId = b.userId || b.referenceId || b.id;
            const aIsCF = closeFriends.includes(aId);
            const bIsCF = closeFriends.includes(bId);

            if (aIsCF && !bIsCF) return -1;
            if (!aIsCF && bIsCF) return 1;

            const aName = (a.username || a.content || '').toLowerCase();
            const bName = (b.username || b.content || '').toLowerCase();
            return aName.localeCompare(bName);
        });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10 h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 mt-1">
                <h2 className="text-xl font-bold">Close Friends</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                We're not sending notifications when you edit your close friends list.
            </p>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#efefef] dark:bg-[#262626] rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-text-primary"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {isSearching ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin opacity-50" /></div>
                ) : finalDisplay.length === 0 ? (
                    <div className="text-center text-text-secondary py-10">No users found.</div>
                ) : (
                    finalDisplay.map((friend, index) => {
                        const currentId = friend.userId || friend.referenceId || friend.id;
                        const isClose = closeFriends.includes(currentId);

                        // Fallback username for search results where enrichment might be partial
                        const displayName = friend.username || friend.content || 'Unknown User';

                        // Use currentId as key, but add index as fallback to ensure uniqueness if data is inconsistent
                        const uniqueKey = currentId ? `friend-${currentId}` : `index-${index}`;

                        const getAvatarUrl = (profilePic) => {
                            if (!profilePic) return `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                            if (profilePic.startsWith('http') || profilePic.startsWith('data:')) return profilePic;
                            // Ensure it starts with / for proxy to catch it if it's a relative path like 'uploads/...'
                            return profilePic.startsWith('/') ? profilePic : `/${profilePic}`;
                        };

                        return (
                            <div
                                key={uniqueKey}
                                className="flex items-center justify-between py-2 hover:bg-black/5 dark:hover:bg-white/5 px-2 rounded-lg cursor-pointer transition-colors group"
                                onClick={() => handleToggle(friend)}
                            >
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={getAvatarUrl(friend.profilePicture || friend.metadata?.profilePicture)}
                                            alt={displayName}
                                            className="w-12 h-12 rounded-full object-cover border border-border"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                                            }}
                                        />
                                        {isClose && (
                                            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-[#121212] rounded-full p-0.5 shadow-sm">
                                                <Star size={12} className="text-[#00f260] fill-[#00f260]" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <div className="font-semibold text-sm flex items-center gap-1">
                                            {displayName}
                                        </div>
                                        <div className="text-text-secondary text-xs">{friend.fullName || friend.fullname || friend.metadata?.fullName || ''}</div>
                                    </div>
                                </div>

                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${isClose ? 'bg-[#0095f6] border-[#0095f6]' : 'border-gray-400 dark:border-gray-500 group-hover:border-gray-600 dark:group-hover:border-gray-400'}`}>
                                    {isClose && <Check size={14} className="text-white" strokeWidth={3} />}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CloseFriends;
