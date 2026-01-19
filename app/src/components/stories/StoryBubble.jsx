import React from 'react';

const StoryBubble = ({ user, count, onClick }) => {
    // Default avatar if missing
    const avatarUrl = user.userAvatar || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+';

    return (
        <li
            className="flex flex-col items-center cursor-pointer min-w-[66px] group"
            onClick={onClick}
        >
            <div className={`
                w-[66px] h-[66px] rounded-full p-[2px] 
                flex justify-center items-center mb-1.5 
                bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]
                transform transition-transform duration-200 group-hover:scale-105
            `}>
                <div className="w-full h-full rounded-full border-[2px] border-white dark:border-black overflow-hidden bg-white dark:bg-black">
                    <img
                        src={avatarUrl}
                        alt={user.username}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <span className="text-xs text-text-primary text-center max-w-[74px] truncate">
                {user.username}
            </span>
        </li>
    );
};

export default StoryBubble;
