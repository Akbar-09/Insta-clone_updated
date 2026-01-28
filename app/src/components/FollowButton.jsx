import React, { useEffect } from 'react';
import { useFollow } from '../hooks/useFollow';
import { ChevronDown } from 'lucide-react';
import api from '../api/axios';

const FollowButton = ({ userId, initialIsFollowing, className, showChevron = false, onToggle, variant = 'standard' }) => {
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

    // Standard Button Styles
    const standardFollow = "bg-[#0095f6] text-white hover:bg-[#1877F2]";
    const standardFollowing = "bg-[#efefef] text-black hover:bg-[#dbdbdb]";

    // Text Link Styles (for Sidebar)
    const textFollow = "bg-transparent text-[#0095f6] !p-0 hover:text-[#00376b]";
    const textFollowing = "bg-transparent text-gray-500 !p-0 hover:text-gray-700";

    // Outline variant (for Reels)
    const outlineFollow = "bg-transparent text-white border border-white/60 hover:bg-white/10";
    const outlineFollowing = "bg-white/20 text-white border border-white/40 hover:bg-white/30";

    const getClasses = () => {
        if (className && className.includes('!text-')) return className;

        if (variant === 'text') {
            return isFollowing ? textFollowing : textFollow;
        }
        if (variant === 'outline') {
            return isFollowing ? outlineFollowing : outlineFollow;
        }
        return isFollowing ? standardFollowing : standardFollow;
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`${variant !== 'text' ? baseClasses : 'text-xs font-bold transition-colors'} ${getClasses()} ${className || ''}`}
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
