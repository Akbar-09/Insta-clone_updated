import { useState, useEffect, useContext } from 'react';
import { getHiddenFromStory, hideStoryFromUser, unhideStoryFromUser } from '../../api/privacyApi';
import { getFollowersList } from '../../api/userApi';
import { searchUsers } from '../../api/searchApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, Search, ArrowLeft, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HideStoryFrom = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [hiddenUsers, setHiddenUsers] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id || user?.userId) {
                try {
                    const userId = user.id || user.userId;
                    const [hiddenRes, followersRes] = await Promise.all([
                        getHiddenFromStory(),
                        getFollowersList(userId)
                    ]);

                    if (hiddenRes.data.status === 'success') {
                        setHiddenUsers(hiddenRes.data.data.map(u => u.userId));
                    }
                    if (followersRes.status === 'success') {
                        setCandidates(followersRes.data);
                    }
                } catch (err) {
                    console.error('Failed to load hidden users', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length > 1) {
                setIsSearching(true);
                try {
                    const res = await searchUsers(searchQuery);
                    if (res.status === 'success') {
                        const currentId = user.id || user.userId;
                        const filtered = res.data.filter(u => String(u.userId) !== String(currentId));
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
    }, [searchQuery, user]);

    const handleToggle = async (targetId) => {
        const isHidden = hiddenUsers.includes(targetId);

        setHiddenUsers(prev => isHidden ? prev.filter(id => id !== targetId) : [...prev, targetId]);

        try {
            if (isHidden) {
                await unhideStoryFromUser(targetId);
            } else {
                await hideStoryFromUser(targetId);
            }
        } catch (err) {
            console.error('Failed to update status', err);
            setHiddenUsers(prev => isHidden ? [...prev, targetId] : prev.filter(id => id !== targetId));
        }
    };

    const displayList = searchQuery.trim().length > 1 ? searchResults : candidates;

    const finalDisplay = searchQuery.trim().length > 1
        ? displayList
        : [...displayList].sort((a, b) => {
            const aHidden = hiddenUsers.includes(a.userId);
            const bHidden = hiddenUsers.includes(b.userId);
            if (aHidden && !bHidden) return -1;
            if (!aHidden && bHidden) return 1;
            return a.username.localeCompare(b.username);
        });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10 overflow-hidden">
            <div className="flex items-center mb-1 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Hide story from</h2>
            </div>

            <p className="text-sm text-text-secondary mt-4 mb-6 leading-tight max-w-[500px]">
                Hide all photos and videos you add to your story from specific people. This also hides your live videos.
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

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {isSearching ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin opacity-50" /></div>
                ) : finalDisplay.length === 0 ? (
                    <div className="text-center text-text-secondary py-10">
                        {searchQuery ? 'No users found.' : 'No followers found.'}
                    </div>
                ) : (
                    finalDisplay.map(person => {
                        const isHidden = hiddenUsers.includes(person.userId);
                        return (
                            <div
                                key={person.userId}
                                className="flex items-center justify-between py-1 px-1 rounded-lg cursor-pointer group"
                                onClick={() => handleToggle(person.userId)}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={person.profilePicture || '/default-avatar.png'}
                                        alt={person.username}
                                        className="w-11 h-11 rounded-full object-cover border border-border"
                                    />
                                    <div className="ml-3">
                                        <div className="font-semibold text-sm leading-tight">{person.username}</div>
                                        <div className="text-text-secondary text-[13px] leading-tight">{person.fullName}</div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className={`w-6 h-6 rounded-full border transition-all duration-200 flex items-center justify-center ${isHidden ? 'border-[#0095f6] bg-[#0095f6]' : 'border-gray-300 dark:border-gray-600'}`}>
                                        {isHidden && <Check size={14} strokeWidth={3} className="text-white" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default HideStoryFrom;
