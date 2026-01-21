import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';
import { AuthContext } from '../context/AuthContext';

const UserCard = ({ user, showFollowButton = true, subtitle, onUserClick }) => {
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
                    src={user.avatar || user.profilePicture || 'https://placehold.co/150'}
                    alt={user.username}
                    className="w-11 h-11 rounded-full mr-3 object-cover"
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
                        // Using a smaller simpler style for lists
                        className="!bg-transparent !text-[#0095f6] !px-0 !py-0 hover:!text-[#00376b] hover:!bg-transparent text-xs font-bold"
                    />
                </div>
            )}
        </div>
    );
};

export default UserCard;
