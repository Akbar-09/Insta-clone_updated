import { useState, useEffect, useContext } from 'react';
import { getHiddenFromStory, hideStoryFromUser, unhideStoryFromUser } from '../../api/privacyApi';
import { getFollowersList } from '../../api/userApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, Search, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HideStoryFrom = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [hiddenUsers, setHiddenUsers] = useState([]); // List of IDs
    const [candidates, setCandidates] = useState([]); // Followers
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    const [hiddenRes, followersRes] = await Promise.all([
                        getHiddenFromStory(),
                        getFollowersList(user.id)
                    ]);

                    if (hiddenRes.data.status === 'success') {
                        setHiddenUsers(hiddenRes.data.data.map(u => u.userId));
                    }
                    if (followersRes.status === 'success') {
                        setCandidates(followersRes.data);
                    }
                } catch (err) {
                    console.error('Failed to load data', err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    const handleToggle = async (targetId) => {
        const isHidden = hiddenUsers.includes(targetId);

        // Optimistic
        setHiddenUsers(prev => isHidden ? prev.filter(id => id !== targetId) : [...prev, targetId]);

        try {
            if (isHidden) {
                await unhideStoryFromUser(targetId);
            } else {
                await hideStoryFromUser(targetId);
            }
        } catch (err) {
            console.error('Failed to update status', err);
            // Revert
            setHiddenUsers(prev => isHidden ? [...prev, targetId] : prev.filter(id => id !== targetId));
        }
    };

    const filteredCandidates = candidates.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort: Hidden users first, then alphabetical
    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        const aHidden = hiddenUsers.includes(a.userId);
        const bHidden = hiddenUsers.includes(b.userId);
        if (aHidden && !bHidden) return -1;
        if (!aHidden && bHidden) return 1;
        return a.username.localeCompare(b.username);
    });

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-4 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Hide story from</h2>
            </div>

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
                    <div className="text-center text-text-secondary py-10">No followers found.</div>
                ) : (
                    sortedCandidates.map(follower => {
                        const isHidden = hiddenUsers.includes(follower.userId);
                        return (
                            <div key={follower.userId} className="flex items-center justify-between py-2 hover:bg-black/5 dark:hover:bg-white/5 px-2 -mx-2 rounded-lg cursor-pointer" onClick={() => handleToggle(follower.userId)}>
                                <div className="flex items-center">
                                    <img
                                        src={follower.profilePicture || '/default-avatar.png'}
                                        alt={follower.username}
                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                    />
                                    <div>
                                        <div className="font-semibold text-sm">{follower.username}</div>
                                        <div className="text-text-secondary text-sm">{follower.fullName}</div>
                                    </div>
                                </div>

                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${isHidden ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {isHidden && <CheckCircle size={20} className="text-white fill-blue-500 bg-white rounded-full" />}
                                    {/* Simple check circle style */}
                                    {isHidden && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                </div>
                                <div className="relative">
                                    <input
                                        type="radio"
                                        checked={isHidden}
                                        readOnly
                                        className={`w-6 h-6 border-2 border-gray-300 rounded-full appearance-none checked:bg-blue-500 checked:border-transparent transition-all duration-200 cursor-pointer`}
                                    />
                                    {isHidden && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                        </div>
                                    )}
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
