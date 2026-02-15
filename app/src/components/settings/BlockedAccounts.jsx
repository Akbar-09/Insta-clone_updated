import { useState, useEffect, useContext } from 'react';
import { getBlockedUsers, unblockUser, blockUser } from '../../api/privacyApi';
import { searchUsers } from '../../api/searchApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, X, Search } from 'lucide-react';

const BlockedAccounts = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [blockedList, setBlockedList] = useState([]); // IDs
    const [blockedProfiles, setBlockedProfiles] = useState([]); // Full user objects
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [actionId, setActionId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    const res = await getBlockedUsers();
                    if (res.data.status === 'success') {
                        setBlockedList(res.data.data.map(u => u.userId));
                        setBlockedProfiles(res.data.data);
                    }
                } catch (err) {
                    console.error('Failed to load blocked users', err);
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
                        // Filter out yourself
                        const filtered = res.data.filter(u => {
                            const resultId = u.userId || u.referenceId || u.id;
                            return String(resultId) !== String(user.id);
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

    const handleToggleBlock = async (person) => {
        const targetId = person.userId || person.referenceId || person.id;
        const isCurrentlyBlocked = blockedList.includes(targetId);

        if (!isCurrentlyBlocked && !window.confirm(`Are you sure you want to block ${person.username || person.content}?`)) return;
        if (isCurrentlyBlocked && !window.confirm(`Unblock ${person.username || person.content}?`)) return;

        setActionId(targetId);
        // Optimistic update
        if (isCurrentlyBlocked) {
            setBlockedList(prev => prev.filter(id => id !== targetId));
            setBlockedProfiles(prev => prev.filter(p => (p.userId || p.id) !== targetId));
        } else {
            setBlockedList(prev => [...prev, targetId]);
            setBlockedProfiles(prev => [...prev, person]);
        }

        try {
            if (isCurrentlyBlocked) {
                await unblockUser(targetId);
            } else {
                await blockUser(targetId);
            }
        } catch (err) {
            console.error('Failed to update block status', err);
            // Revert
            if (isCurrentlyBlocked) {
                setBlockedList(prev => [...prev, targetId]);
                setBlockedProfiles(prev => [...prev, person]);
            } else {
                setBlockedList(prev => prev.filter(id => id !== targetId));
                setBlockedProfiles(prev => prev.filter(p => (p.userId || p.id) !== targetId));
            }
        } finally {
            setActionId(null);
        }
    };

    const displayList = searchQuery.trim().length > 1 ? searchResults : blockedProfiles;

    const finalDisplay = [...displayList].sort((a, b) => {
        const aName = (a.username || a.content || '').toLowerCase();
        const bName = (b.username || b.content || '').toLowerCase();
        return aName.localeCompare(bName);
    });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10">
            <h2 className="text-xl font-bold mb-4 mt-1">Blocked Accounts</h2>
            <p className="text-sm text-text-secondary mb-6 leading-5">
                You can block people anytime from their profiles. When you block someone, they won't be able to message you or find your profile, posts, or story on Jaadoe. They won't be notified that you blocked them.
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute left-3 top-2.5 text-gray-400">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search people to block"
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

            <div className="space-y-4">
                {isSearching ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin opacity-50" /></div>
                ) : finalDisplay.length === 0 ? (
                    <div className="text-center py-10 text-text-secondary">
                        {searchQuery ? 'No users found.' : "You haven't blocked anyone yet."}
                    </div>
                ) : (
                    finalDisplay.map((blocked, index) => {
                        const targetId = blocked.userId || blocked.referenceId || blocked.id;
                        const isBlocked = blockedList.includes(targetId);
                        const displayName = blocked.username || blocked.content || 'Unknown User';
                        const uniqueKey = targetId ? `blocked-${targetId}` : `index-${index}`;

                        const getAvatarUrl = (profilePic) => {
                            if (!profilePic) return `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                            if (profilePic.startsWith('http') || profilePic.startsWith('data:')) return profilePic;
                            return profilePic.startsWith('/') ? profilePic : `/${profilePic}`;
                        };

                        return (
                            <div key={uniqueKey} className="flex items-center justify-between group">
                                <div className="flex items-center">
                                    <img
                                        src={getAvatarUrl(blocked.profilePicture || blocked.metadata?.profilePicture)}
                                        alt={displayName}
                                        className="w-11 h-11 rounded-full object-cover mr-3 border border-border"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                                        }}
                                    />
                                    <div>
                                        <div className="font-semibold text-sm leading-tight">{displayName}</div>
                                        <div className="text-text-secondary text-[13px] leading-tight mt-0.5">
                                            {blocked.fullName || blocked.fullname || blocked.metadata?.fullName || ''}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleBlock(blocked)}
                                    disabled={actionId === targetId}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${isBlocked
                                        ? 'bg-[#efefef] dark:bg-[#363636] hover:bg-black/10 dark:hover:bg-white/10'
                                        : 'bg-[#0095f6] text-white hover:bg-[#1877f2]'
                                        }`}
                                >
                                    {actionId === targetId
                                        ? (isBlocked ? 'Unblocking...' : 'Blocking...')
                                        : (isBlocked ? 'Unblock' : 'Block')}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BlockedAccounts;
