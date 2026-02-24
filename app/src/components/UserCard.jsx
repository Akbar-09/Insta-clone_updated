import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';
import { AuthContext } from '../context/AuthContext';
import { getProxiedUrl } from '../utils/mediaUtils';

const UserCard = ({ user, showFollowButton = true, subtitle, onUserClick, followButtonVariant = 'standard' }) => {
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);

    const isMe = currentUser?.username === user.username || currentUser?.id === user.id;

    const handleProfileClick = () => {
        if (onUserClick) {
            onUserClick(user);
        } else {
            navigate(`/profile/${user.username}`);
        }
    };

    return (
        <div className="flex items-center justify-between py-2 px-4 hover:bg-white/5 transition-colors cursor-pointer group" onClick={handleProfileClick}>
            <div className="flex items-center">
                <img
                    src={getProxiedUrl(user.avatar || user.profilePicture) || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                    alt={user.username}
                    className="w-11 h-11 rounded-full mr-3 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random` }}
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-text-primary group-hover:opacity-80">
                        {user.username}
                    </span>
                    <span className="text-text-secondary text-sm truncate max-w-[200px]">
                        {subtitle || user.fullName || user.name}
                    </span>
                </div>
            </div>

            {showFollowButton && !isMe && (
                <div onClick={(e) => e.stopPropagation()}>
                    <FollowButton
                        userId={user.id || user.userId}
                        initialIsFollowing={user.isFollowing}
                        variant={followButtonVariant}
                    />
                </div>
            )}
        </div>
    );
};

export default UserCard;
