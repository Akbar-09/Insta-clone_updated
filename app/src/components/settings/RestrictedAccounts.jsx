import { useState, useEffect, useContext } from 'react';
import { getRestrictedAccounts, restrictUser, unrestrictUser } from '../../api/settingsApi';
import { searchUsers } from '../../api/searchApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, ArrowLeft, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RestrictedAccounts = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [restrictedList, setRestrictedList] = useState([]); // IDs
    const [restrictedProfiles, setRestrictedProfiles] = useState([]); // Full user objects
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [actionId, setActionId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    const res = await getRestrictedAccounts();
                    if (res.data.status === 'success') {
                        setRestrictedList(res.data.data.map(u => u.userId));
                        setRestrictedProfiles(res.data.data);
                    }
                } catch (err) {
                    console.error('Failed to load restricted users', err);
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

    const handleToggleRestrict = async (person) => {
        const targetId = person.userId || person.referenceId || person.id;
        const isRestricted = restrictedList.includes(targetId);

        if (!isRestricted && !window.confirm(`Are you sure you want to restrict ${person.username || person.content}?`)) return;

        setActionId(targetId);

        // Optimistic update
        if (isRestricted) {
            setRestrictedList(prev => prev.filter(id => String(id) !== String(targetId)));
            setRestrictedProfiles(prev => prev.filter(p => {
                const pId = p.userId || p.referenceId || p.id;
                return String(pId) !== String(targetId);
            }));
        } else {
            setRestrictedList(prev => [...prev, targetId]);
            setRestrictedProfiles(prev => [...prev, person]);
        }

        try {
            if (isRestricted) {
                await unrestrictUser(targetId);
            } else {
                await restrictUser(targetId);
            }
        } catch (err) {
            console.error('Failed to update restriction status', err);
            // Revert
            if (isRestricted) {
                setRestrictedList(prev => [...prev, targetId]);
                setRestrictedProfiles(prev => [...prev, person]);
            } else {
                setRestrictedList(prev => prev.filter(id => String(id) !== String(targetId)));
                setRestrictedProfiles(prev => prev.filter(p => {
                    const pId = p.userId || p.referenceId || p.id;
                    return String(pId) !== String(targetId);
                }));
            }
        } finally {
            setActionId(null);
        }
    };

    const displayList = searchQuery.trim().length > 1 ? searchResults : restrictedProfiles;

    // Deduplicate logic
    const uniqueMap = new Map();
    displayList.forEach(item => {
        const id = item.userId || item.referenceId || item.id;
        if (id && !uniqueMap.has(String(id))) {
            uniqueMap.set(String(id), item);
        }
    });

    const finalDisplay = Array.from(uniqueMap.values()).sort((a, b) => {
        const aName = (a.username || a.content || '').toLowerCase();
        const bName = (b.username || b.content || '').toLowerCase();
        return aName.localeCompare(bName);
    });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Restricted accounts</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                Protect yourself from unwanted interactions without blocking people. You can restrict someone to hide their comments and messages.
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute left-3 top-2.5 text-gray-400">
                    <Search size={18} />
                </div>
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

            <div className="space-y-4">
                {isSearching ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin opacity-50" /></div>
                ) : finalDisplay.length === 0 ? (
                    <div className="text-center text-text-secondary py-10 font-medium">
                        {searchQuery ? 'No users found.' : "You haven't restricted anyone."}
                    </div>
                ) : (
                    finalDisplay.map((user, index) => {
                        const targetId = user.userId || user.referenceId || user.id;
                        const isRestricted = restrictedList.includes(targetId);
                        const displayName = user.username || user.content || 'Unknown User';
                        const uniqueKey = targetId ? `restricted-${targetId}` : `index-${index}`;

                        const getAvatarUrl = (profilePic) => {
                            if (!profilePic) return `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                            if (profilePic.startsWith('http') || profilePic.startsWith('data:')) return profilePic;
                            return profilePic.startsWith('/') ? profilePic : `/${profilePic}`;
                        };

                        return (
                            <div key={uniqueKey} className="flex items-center justify-between group">
                                <div className="flex items-center">
                                    <img
                                        src={getAvatarUrl(user.profilePicture || user.metadata?.profilePicture)}
                                        alt={displayName}
                                        className="w-10 h-10 rounded-full object-cover mr-3 border border-border"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=random`;
                                        }}
                                    />
                                    <div>
                                        <div className="font-semibold text-sm leading-tight">{displayName}</div>
                                        <div className="text-text-secondary text-[13px] leading-tight mt-0.5">
                                            {user.fullName || user.fullname || user.metadata?.fullName || ''}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleRestrict(user)}
                                    disabled={actionId === targetId}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${isRestricted
                                        ? 'bg-[#efefef] dark:bg-[#363636] hover:bg-black/10 dark:hover:bg-white/10'
                                        : 'bg-[#0095f6] text-white hover:bg-[#1877f2]'
                                        }`}
                                >
                                    {actionId === targetId
                                        ? (isRestricted ? 'Unrestricting...' : 'Restricting...')
                                        : (isRestricted ? 'Unrestrict' : 'Restrict')}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default RestrictedAccounts;
