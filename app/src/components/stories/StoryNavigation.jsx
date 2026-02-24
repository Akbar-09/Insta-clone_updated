import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProxiedUrl } from '../../utils/mediaUtils';

const StoryNavigation = ({ hasPrev, hasNext, onPrev, onNext, prevPreview, nextPreview }) => {
    return (
        <>
            {/* Left Zone (Navigation Logic usually handled by container, but previews here) */}

            {/* Previous Story Preview */}
            {prevPreview && (
                <div
                    className="absolute left-[calc(50%-340px)] w-[200px] h-[350px] bg-black/50 rounded-lg overflow-hidden opacity-40 scale-90 blur-[2px] cursor-pointer hidden md:block transform -translate-x-full transition-opacity hover:opacity-60"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                >
                    <img
                        src={getProxiedUrl(prevPreview.mediaUrl)}
                        className="w-full h-full object-cover"
                        alt="prev"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full border-2 border-primary p-[2px]">
                            <img src={getProxiedUrl(prevPreview.userAvatar)} className="w-full h-full rounded-full" alt="avatar" />
                        </div>
                        <span className="absolute mt-14 text-white text-sm font-semibold">{prevPreview.username}</span>
                    </div>
                </div>
            )}

            {/* Arrow Button Left */}
            {hasPrev && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 md:left-[calc(50%-270px)] z-50 bg-white/90 hover:bg-white text-black/60 rounded-full p-1.5 shadow-lg border-none cursor-pointer transition-transform transform active:scale-95 flex items-center justify-center"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {/* Next Story Preview */}
            {nextPreview && (
                <div
                    className="absolute right-[calc(50%-340px)] w-[200px] h-[350px] bg-black/50 rounded-lg overflow-hidden opacity-40 scale-90 blur-[2px] cursor-pointer hidden md:block transform translate-x-full transition-opacity hover:opacity-60"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                >
                    <img
                        src={getProxiedUrl(nextPreview.mediaUrl)}
                        className="w-full h-full object-cover"
                        alt="next"
                    />
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="w-14 h-14 rounded-full border-2 border-primary p-[2px] bg-black/20 backdrop-blur-sm mb-2">
                            <img src={getProxiedUrl(nextPreview.userAvatar)} className="w-full h-full rounded-full object-cover" alt="avatar" />
                        </div>
                        <span className="text-white text-sm font-semibold drop-shadow-md">{nextPreview.username}</span>
                    </div>
                </div>
            )}

            {/* Arrow Button Right */}
            {hasNext && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 md:right-[calc(50%-270px)] z-50 bg-white/90 hover:bg-white text-black/60 rounded-full p-1.5 shadow-lg border-none cursor-pointer transition-transform transform active:scale-95 flex items-center justify-center"
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </>
    );
};

export default StoryNavigation;
