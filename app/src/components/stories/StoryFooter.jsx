import { Heart, Send } from 'lucide-react';

const StoryFooter = ({ username, onFocus, onBlur }) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-3">
            <div className="flex-grow relative">
                <input
                    type="text"
                    placeholder={`Reply to ${username}...`}
                    className="w-full bg-transparent border border-white/50 rounded-full px-5 py-3 text-white placeholder-white/90 text-sm font-medium focus:border-white focus:placeholder-white/50 outline-none backdrop-blur-md shadow-sm transition-all"
                    onKeyDown={(e) => e.stopPropagation()} // Prevent nav when typing
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
            <button className="text-white hover:scale-110 active:scale-95 transition-transform bg-transparent border-none cursor-pointer p-1">
                <Heart size={28} />
            </button>
            <button className="text-white hover:scale-110 active:scale-95 transition-transform bg-transparent border-none cursor-pointer p-1">
                <Send size={26} className="-rotate-12 translate-y-[-2px]" />
            </button>
        </div>
    );
};

export default StoryFooter;
