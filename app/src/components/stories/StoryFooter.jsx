import { useState } from 'react';
import { Heart, Send } from 'lucide-react';

const StoryFooter = ({ username, onFocus, onBlur, onSend, isLiked, onToggleLike, onShare }) => {
    const [reply, setReply] = useState('');

    const handleSend = () => {
        if (!reply.trim()) return;
        onSend(reply);
        setReply('');
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-3">
            <div className="flex-grow relative">
                <input
                    type="text"
                    placeholder={`Reply to ${username}...`}
                    className="w-full bg-transparent border border-white/50 rounded-full px-5 py-3 text-white placeholder-white/90 text-sm font-medium focus:border-white focus:placeholder-white/50 outline-none backdrop-blur-md shadow-sm transition-all text-shadow pr-12"
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') handleSend();
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />
                {reply.trim() && (
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm px-3 py-1 hover:opacity-80"
                    >
                        Send
                    </button>
                )}
            </div>
            <button
                onClick={onToggleLike}
                className="text-white hover:scale-110 active:scale-95 transition-transform bg-transparent border-none cursor-pointer p-1"
            >
                <Heart size={28} fill={isLiked ? "#ff3040" : "none"} color={isLiked ? "#ff3040" : "white"} />
            </button>
            <button
                onClick={onShare}
                className="text-white hover:scale-110 active:scale-95 transition-transform bg-transparent border-none cursor-pointer p-1"
            >
                <Send size={26} className="-rotate-12 translate-y-[-2px]" />
            </button>
        </div>
    );
};

export default StoryFooter;
