import { useState, useEffect, useContext } from 'react';
import { getBlockedUsers, unblockUser } from '../../api/privacyApi';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, X } from 'lucide-react';

const BlockedAccounts = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [blockedList, setBlockedList] = useState([]);
    const [unblockingId, setUnblockingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    const res = await getBlockedUsers();
                    if (res.data.status === 'success') {
                        setBlockedList(res.data.data);
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

    const handleUnblock = async (blockedId) => {
        if (!window.confirm('Are you sure you want to unblock this user?')) return;

        setUnblockingId(blockedId);
        try {
            await unblockUser(blockedId);
            setBlockedList(prev => prev.filter(u => u.userId !== blockedId));
        } catch (err) {
            console.error('Failed to unblock', err);
            alert('Failed to unblock user.');
        } finally {
            setUnblockingId(null);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10">
            <h2 className="text-xl font-bold mb-4 mt-1">Blocked Accounts</h2>
            <p className="text-sm text-text-secondary mb-8 leading-5">
                You can block people anytime from their profiles. When you block someone, they won't be able to message you or find your profile, posts, or story on Jaadoe. They won't be notified that you blocked them.
            </p>

            {blockedList.length === 0 ? (
                <div className="text-center py-20 text-text-secondary">
                    You haven't blocked anyone yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {blockedList.map(blocked => (
                        <div key={blocked.userId} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={blocked.profilePicture || '/default-avatar.png'}
                                    alt={blocked.username}
                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <div className="font-semibold text-sm">{blocked.username}</div>
                                    <div className="text-text-secondary text-xs">{blocked.fullName}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUnblock(blocked.userId)}
                                disabled={unblockingId === blocked.userId}
                                className="px-4 py-1.5 border border-[#dbdbdb] dark:border-[#363636] rounded-lg text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                            >
                                {unblockingId === blocked.userId ? 'Unblocking...' : 'Unblock'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlockedAccounts;
