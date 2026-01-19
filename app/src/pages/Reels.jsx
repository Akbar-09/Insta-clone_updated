import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music, Volume2, VolumeX, ChevronUp, ChevronDown, X } from 'lucide-react';

const MOCK_REELS = [
    {
        id: 1,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        poster: 'https://images.unsplash.com/photo-1542272617-08f086303b9b?w=600&h=1066&fit=crop',
        username: 'lennymilleryt',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop',
        caption: 'Lenny gets crazy assist during this 2v1😭😭🥀',
        music: 'lennymilleryt • Original audio',
        likes: '9.2k',
        comments: '405',
        isLiked: false,
        isSaved: false
    },
    {
        id: 2,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-shot-from-below-1185-large.mp4',
        poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=1066&fit=crop',
        username: 'nature_vibe',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        caption: 'Morning walks in the forest are the best therapy 🌲✨',
        music: 'Nature Sounds • Original audio',
        likes: '15.4k',
        comments: '890',
        isLiked: true,
        isSaved: true
    },
    {
        id: 3,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
        poster: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=1066&fit=crop',
        username: 'ocean_life',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop',
        caption: 'Deep blue mystery 🌊 #ocean #waves',
        music: 'Calm Waters • Original audio',
        likes: '45.2k',
        comments: '2.1k',
        isLiked: false,
        isSaved: false
    },
    {
        id: 4,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-urban-traffic-timelapse-at-night-846-large.mp4',
        poster: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=1066&fit=crop',
        username: 'city_lights',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
        caption: 'City never sleeps 🌃',
        music: 'Urban Beats • Original audio',
        likes: '128k',
        comments: '5.3k',
        isLiked: false,
        isSaved: false
    },
    {
        id: 5,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-ink-in-water-2345-large.mp4',
        poster: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=600&h=1066&fit=crop',
        username: 'art_daily',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
        caption: 'Ink flow dynamics are mesmerizing 🎨 #art #abstract',
        music: 'Artistic Vibe • Original audio',
        likes: '32.1k',
        comments: '1.2k',
        isLiked: true,
        isSaved: false
    },
    {
        id: 6,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-123-large.mp4',
        poster: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=1066&fit=crop',
        username: 'night_owl',
        userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop',
        caption: 'Midnight drives 🚗💨',
        music: 'Nightcall • Original audio',
        likes: '8.5k',
        comments: '230',
        isLiked: false,
        isSaved: true
    }
];

const ReelItem = ({ reel, isActive, toggleMute, isMuted, onNext, onPrev }) => {
    const [isLiked, setIsLiked] = useState(reel.isLiked);
    const [isSaved, setIsSaved] = useState(reel.isSaved);
    const [isPlaying, setIsPlaying] = useState(isActive);
    const videoRef = useRef(null);

    // In a real app, use IntersectionObserver to play/pause video based on isActive
    useEffect(() => {
        if (isActive) {
            // videoRef.current?.play();
            setIsPlaying(true);
        } else {
            // videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    return (
        <div className="h-screen w-full flex justify-center items-center snap-start relative shrink-0">
            {/* Center Content Wrapper */}
            <div className="flex items-end gap-5 relative h-[90vh] max-h-[850px] w-full max-w-[950px] justify-center pt-5">

                {/* Main Video Card */}
                {/* Using a fixed aspect ratio and responsive height/width to match Instagram's "tall slim" look */}
                <div className="relative h-full aspect-[9/16] bg-black rounded-[9px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-white/20 group">
                    {/* Video / Placeholder */}
                    <img
                        src={reel.poster}
                        className="w-full h-full object-cover block"
                        alt="Reel"
                    />

                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

                    {/* Mute Button - Top Right of Video */}
                    <button
                        className="absolute top-5 right-5 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-black/70 z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                        }}
                    >
                        {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                    </button>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 pb-5 bg-gradient-to-b from-transparent via-black/50 to-black/80 text-white flex flex-col gap-3 pointer-events-none z-10">
                        {/* User Info */}
                        <div className="flex items-center gap-3 pointer-events-auto">
                            <img src={reel.userAvatar} alt={reel.username} className="w-[32px] h-[32px] rounded-full object-cover border border-white/20" />
                            <span className="font-semibold text-sm hover:underline cursor-pointer text-shadow-sm">{reel.username}</span>
                            <button className="bg-transparent border border-white/60 rounded-[8px] px-3 py-[6px] text-[13px] font-semibold transition-colors hover:bg-white/20">Follow</button>
                        </div>

                        {/* Caption */}
                        <div className="text-[14px] leading-snug pointer-events-auto max-w-[90%] text-shadow-sm">
                            <span className="opacity-100">{reel.caption}</span>
                            <span className="text-white/60 text-xs ml-1 font-medium cursor-pointer hover:text-white/80">... more</span>
                        </div>

                        {/* Music */}
                        <div className="flex items-center gap-2 text-xs pointer-events-auto opacity-100 mb-1">
                            <div className="flex items-center gap-1.5 px-0 py-0 rounded-full">
                                <Music size={13} strokeWidth={2.5} />
                                <div className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis font-medium">
                                    <span>{reel.music}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Action Bar */}
                {/* Vertically aligned icons on the right side */}
                <div className="flex flex-col gap-5 pb-5 self-end z-20">
                    <ActionButton icon={Heart} label={reel.likes} isActive={isLiked} onClick={() => setIsLiked(!isLiked)} activeColor="#ff3040" />
                    <ActionButton icon={MessageCircle} label={reel.comments} />
                    <ActionButton icon={Send} />
                    <ActionButton icon={Bookmark} isActive={isSaved} onClick={() => setIsSaved(!isSaved)} activeColor="white" fillActive={true} />
                    <ActionButton icon={MoreHorizontal} />

                    <div className="mt-2 w-[30px] h-[30px] rounded-md border-[2px] border-white/20 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={reel.userAvatar} className="w-full h-full object-cover" alt="Original Audio" />
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4 max-[1150px]:hidden">
                    <NavButton icon={ChevronUp} onClick={onPrev} />
                    <NavButton icon={ChevronDown} onClick={onNext} />
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, isActive, onClick, activeColor = 'currentColor', fillActive = false }) => (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={onClick}>
        <div className="p-0 transition-transform active:scale-95 hover:opacity-70">
            <Icon
                size={27}
                strokeWidth={2}
                className={`drop-shadow-lg transition-colors`}
                color={isActive ? activeColor : 'white'} // Requirement: "Style icons with white color"
                fill={isActive && fillActive ? activeColor : (isActive && activeColor === '#ff3040' ? activeColor : 'none')}
                style={{
                    filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))'
                }}
            />
        </div>
        {label && <span className="text-[13px] font-medium text-white drop-shadow-md">{label}</span>}
    </div>
);

const NavButton = ({ icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="w-12 h-12 bg-[#1a1a1a]/90 hover:bg-[#2a2a2a] rounded-full flex items-center justify-center shadow-lg border border-white/5 transition-transform active:scale-95 group cursor-pointer"
    >
        <Icon size={24} className="text-white opacity-90 group-hover:opacity-100" />
    </button>
);

const Reels = () => {
    const [muted, setMuted] = useState(true);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle scroll programmatically
    const scrollToIndex = (index) => {
        const items = document.querySelectorAll('.group-snap-item');
        if (items[index]) {
            items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="flex flex-col items-center w-full gap-0 bg-black min-h-screen">
            {/* Added bg-black for a dark background as per standard Instagram Reels feel. 
                Using min-h-screen to ensure coverage. 
            */}

            {/* Close Button - Fixed Top Right */}
            <div
                className="fixed top-6 right-6 z-[60] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/feed')}
            >
                <X color="white" size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
            </div>

            {MOCK_REELS.map((reel, index) => (
                <div key={reel.id} className="group-snap-item w-full flex justify-center">
                    <ReelItem
                        reel={reel}
                        isActive={true} // In real app use intersection observer
                        isMuted={muted}
                        toggleMute={() => setMuted(!muted)}
                        onNext={() => scrollToIndex(index + 1)}
                        onPrev={() => scrollToIndex(index - 1)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Reels;
