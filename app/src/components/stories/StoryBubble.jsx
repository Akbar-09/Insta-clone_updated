import React from 'react';

const StoryBubble = ({ user, count, onClick }) => {
    // Default avatar if missing
    const avatarUrl = user.userAvatar || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+';

    return (
        <li
            className="flex flex-col items-center cursor-pointer min-w-[66px] group relative"
            onClick={onClick}
        >
            <div className={`
                w-[66px] h-[66px] rounded-full p-[2px] 
                flex justify-center items-center mb-1.5 
                ${user.isLive
                    ? 'bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-500 shadow-[0_0_15px_rgba(236,72,153,0.6)] animate-pulse'
                    : user.allSeen
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]'}
                transform transition-transform duration-200 group-hover:scale-105
            `}>
                <div className="w-full h-full rounded-full border-[2px] border-white dark:border-black overflow-hidden bg-white dark:bg-black relative">
                    <img
                        src={user.userAvatar || user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random` }}
                    />
                </div>
            </div>
            {user.isLive && (
                <div className="absolute top-[52px] bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow z-10">
                    LIVE
                </div>
            )}
            <span className="text-xs text-text-primary text-center max-w-[74px] truncate">
                {user.username}
            </span>
        </li>
    );
};

export default StoryBubble;
