import { Plus } from 'lucide-react';

const ProfileHighlights = () => {
    // This could also fetch highlights from API in the future
    return (
        <div className="flex gap-10 px-10 mb-11 overflow-x-auto scrollbar-hide">
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-[87px] h-[87px] rounded-full border border-white/20 p-[1px] flex items-center justify-center bg-transparent group-hover:bg-white/10 transition-colors">
                    <div className="w-[83px] h-[83px] rounded-full bg-[#121212] flex items-center justify-center border border-white/10">
                        <Plus size={44} className="text-gray-400" strokeWidth={1} />
                    </div>
                </div>
                <span className="text-xs font-semibold text-white">New</span>
            </div>
        </div>
    );
};

export default ProfileHighlights;
