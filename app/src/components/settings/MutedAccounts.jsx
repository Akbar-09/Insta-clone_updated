import { useState, useEffect } from 'react';
import { getMutedAccounts, unmuteUser } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MutedAccounts = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getMutedAccounts()
            .then(res => setUsers(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleUnmute = async (id) => {
        const old = [...users];
        setUsers(prev => prev.filter(u => u.userId !== id));
        try {
            await unmuteUser(id);
        } catch (err) {
            console.error(err);
            setUsers(old);
        }
    };

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.fullName && u.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Muted accounts</h2>
            </div>

            <div className="relative mb-6">
                {/* Search could be added more robustly, focusing on key elements */}
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#efefef] dark:bg-[#262626] rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
            </div>

            {users.length === 0 ? (
                <div className="text-center text-text-secondary py-10 font-medium">
                    You haven't muted anyone.
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center text-text-secondary py-10 font-medium">
                    No users found.
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {filteredUsers.map(user => (
                        <div key={user.userId} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={user.profilePicture || '/default-avatar.png'}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div className="font-semibold text-sm">{user.username}</div>
                            </div>
                            <button
                                onClick={() => handleUnmute(user.userId)}
                                className="bg-[#efefef] dark:bg-[#363636] px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity"
                            >
                                Unmute
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MutedAccounts;
