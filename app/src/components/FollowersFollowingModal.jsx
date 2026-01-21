import { useState, useEffect, useContext } from 'react';
import { X, Search } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getFollowersList, getFollowingList, removeFollower, followUser, unfollowUser } from '../api/profileApi';

const FollowersFollowingModal = ({ userId, type = 'followers', onClose }) => {
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});

    const isOwnProfile = currentUser?.id === parseInt(userId) || currentUser?.userId === parseInt(userId);

    useEffect(() => {
        fetchUsers();
    }, [userId, type]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = users.filter(user =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = type === 'followers'
                ? await getFollowersList(userId)
                : await getFollowingList(userId);

            if (response.status === 'success') {
                setUsers(response.data);
                setFilteredUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFollower = async (followerId) => {
        if (!isOwnProfile) return;

        setActionLoading(prev => ({ ...prev, [followerId]: true }));
        try {
            await removeFollower(followerId);
            setUsers(prev => prev.filter(u => u.userId !== followerId));
            setFilteredUsers(prev => prev.filter(u => u.userId !== followerId));
        } catch (error) {
            console.error('Error removing follower:', error);
            alert('Failed to remove follower');
        } finally {
            setActionLoading(prev => ({ ...prev, [followerId]: false }));
        }
    };

    const handleFollowToggle = async (targetUserId, isFollowing) => {
        setActionLoading(prev => ({ ...prev, [targetUserId]: true }));
        try {
            if (isFollowing) {
                await unfollowUser(targetUserId);
            } else {
                await followUser(targetUserId);
            }

            // Update local state
            setUsers(prev => prev.map(u =>
                u.userId === targetUserId ? { ...u, isFollowing: !isFollowing } : u
            ));
            setFilteredUsers(prev => prev.map(u =>
                u.userId === targetUserId ? { ...u, isFollowing: !isFollowing } : u
            ));
        } catch (error) {
            console.error('Error toggling follow:', error);
            alert('Failed to update follow status');
        } finally {
            setActionLoading(prev => ({ ...prev, [targetUserId]: false }));
        }
    };

    const handleUserClick = (username) => {
        navigate(`/profile/${username}`);
        onClose();
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#262626] w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl animate-zoom-in flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="border-b border-[#363636] px-4 py-3 flex items-center justify-between sticky top-0 bg-[#262626] z-10">
                    <h2 className="text-white font-semibold text-base">
                        {type === 'followers' ? 'Followers' : 'Following'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-70 transition-opacity"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-3 border-b border-[#363636]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1a1a1a] text-white pl-10 pr-3 py-2 rounded-lg border border-[#363636] focus:border-[#0095F6] focus:outline-none transition-colors text-sm"
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            {searchQuery ? 'No users found' : `No ${type} yet`}
                        </div>
                    ) : (
                        <div className="divide-y divide-[#363636]">
                            {filteredUsers.map((user) => {
                                const isCurrentUser = currentUser?.id === user.userId || currentUser?.userId === user.userId;
                                const isLoading = actionLoading[user.userId];

                                return (
                                    <div key={user.userId} className="px-4 py-3 hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar */}
                                            <div
                                                onClick={() => handleUserClick(user.username)}
                                                className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden cursor-pointer flex-shrink-0"
                                            >
                                                {user.profilePicture ? (
                                                    <img
                                                        src={user.profilePicture}
                                                        alt={user.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white text-lg font-bold">
                                                        {user.username[0].toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            {/* User Info */}
                                            <div
                                                onClick={() => handleUserClick(user.username)}
                                                className="flex-1 min-w-0 cursor-pointer"
                                            >
                                                <div className="text-white text-sm font-semibold truncate">
                                                    {user.username}
                                                </div>
                                                {user.fullName && (
                                                    <div className="text-gray-400 text-xs truncate">
                                                        {user.fullName}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            {!isCurrentUser && (
                                                <div className="flex-shrink-0">
                                                    {type === 'followers' && isOwnProfile ? (
                                                        <button
                                                            onClick={() => handleRemoveFollower(user.userId)}
                                                            disabled={isLoading}
                                                            className="px-4 py-1.5 bg-[#363636] text-white text-sm font-semibold rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-50"
                                                        >
                                                            {isLoading ? '...' : 'Remove'}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleFollowToggle(user.userId, user.isFollowing)}
                                                            disabled={isLoading}
                                                            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${user.isFollowing
                                                                ? 'bg-[#363636] text-white hover:bg-[#404040]'
                                                                : 'bg-[#0095F6] text-white hover:bg-[#1877F2]'
                                                                }`}
                                                        >
                                                            {isLoading ? '...' : user.isFollowing ? 'Following' : 'Follow'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default FollowersFollowingModal;
