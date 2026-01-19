import { MoreHorizontal, X, Volume2, Pause, Play } from 'lucide-react';

const StoryHeader = ({ user, timestamp, onClose, isPaused, onTogglePause }) => {
    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return url;
    };

    return (
        <div className="absolute top-6 left-0 right-0 px-3 z-30 flex items-center justify-between text-white pt-4 pb-12 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                    <img
                        src={getMediaUrl(user.avatar) || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTA5MDkwIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNCIvPjxwYXRoIGQ9Ik02IDIxdjItYTcgNyAwIDAgMSAxNCAwdi0yIi8+PC9zdmc+'}
                        alt={user.username}
                        className="w-8 h-8 rounded-full border border-white/20 object-cover"
                    />
                    <span className="text-sm font-semibold text-white drop-shadow-md">{user.username}</span>
                    <span className="text-white/70 text-sm font-light">• {timestamp}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onTogglePause(); }}
                    className="text-white hover:opacity-75 bg-transparent border-none cursor-pointer"
                >
                    {isPaused ? <Play size={20} fill="white" /> : <Pause size={20} fill="white" />}
                </button>
                <button className="text-white hover:opacity-75 bg-transparent border-none cursor-pointer">
                    <MoreHorizontal size={24} />
                </button>
                <button
                    onClick={onClose}
                    className="text-white hover:opacity-75 bg-transparent border-none cursor-pointer"
                >
                    <X size={28} />
                </button>
            </div>
        </div>
    );
};

export default StoryHeader;
