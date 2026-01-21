import React, { useEffect } from 'react';
import { useFollow } from '../hooks/useFollow';
import { ChevronDown } from 'lucide-react';
import api from '../api/axios';

const FollowButton = ({ userId, initialIsFollowing, className, showChevron = false, onToggle }) => {
    // If initialIsFollowing is undefined, we might want to fetch it, but usually the parent provides it.
    // However, if we want consistency, we can also fetch it here if needed.
    // For now, assume parent passes valid initial state or we default to false.

    const { isFollowing, toggleFollow, loading } = useFollow(userId, initialIsFollowing);

    const handleClick = async (e) => {
        e.stopPropagation();
        await toggleFollow();
        if (onToggle) onToggle(!isFollowing);
    };

    // Optional: Check status on mount if not provided?
    // Doing it simple for now to rely on parent data or optimistic updates.

    const baseClasses = "px-5 py-[7px] rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1";
    const followClasses = "bg-[#0095f6] text-white hover:bg-[#1877F2]";
    const followingClasses = "bg-[#efefef] text-black hover:bg-[#dbdbdb]";

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`${baseClasses} ${isFollowing ? followingClasses : followClasses} ${className || ''}`}
        >
            {loading ? (
                <span className="opacity-50">...</span>
            ) : isFollowing ? (
                <>
                    Following {showChevron && <ChevronDown size={16} />}
                </>
            ) : (
                'Follow'
            )}
        </button>
    );
};

export default FollowButton;
