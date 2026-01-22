import { useState, useEffect, useContext } from 'react';
import { getCloseFriends, addCloseFriend, removeCloseFriend } from '../../api/privacyApi';
import { getFollowingList } from '../../api/userApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, Search, X, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CloseFriends = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [closeFriends, setCloseFriends] = useState([]); // Array of IDs
    const [candidates, setCandidates] = useState([]); // All following
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleToggle = async (friendId) => {
        const isAdded = closeFriends.includes(friendId);

        // Optimistic Update
        setCloseFriends(prev => isAdded ? prev.filter(id => id !== friendId) : [...prev, friendId]);

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
        }
    };

    const filteredCandidates = candidates.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort: Close friends first, then alphabetical
    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        const aIsCF = closeFriends.includes(a.userId);
        const bIsCF = closeFriends.includes(b.userId);
        if (aIsCF && !bIsCF) return -1;
        if (!aIsCF && bIsCF) return 1;
        return a.username.localeCompare(b.username);
    });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10 h-full">
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
                    className="w-full bg-[#efefef] dark:bg-[#262626] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
                {sortedCandidates.length === 0 ? (
                    <div className="text-center text-text-secondary py-10">No users found.</div>
                ) : (
                    sortedCandidates.map(friend => {
                        const isClose = closeFriends.includes(friend.userId);
                        return (
                            <div key={friend.userId} className="flex items-center justify-between py-2 hover:bg-black/5 dark:hover:bg-white/5 px-2 -mx-2 rounded-lg cursor-pointer" onClick={() => handleToggle(friend.userId)}>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={friend.profilePicture || '/default-avatar.png'}
                                            alt={friend.username}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {isClose && (
                                            <div className="absolute bottom-0 right-0 bg-white dark:bg-black rounded-full p-0.5">
                                                <Star size={12} className="text-green-500 fill-green-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <div className="font-semibold text-sm">{friend.username}</div>
                                        <div className="text-text-secondary text-sm">{friend.fullName}</div>
                                    </div>
                                </div>

                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isClose ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'}`}>
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
