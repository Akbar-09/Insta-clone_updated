import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music, Volume2, VolumeX, ChevronUp, ChevronDown, X } from 'lucide-react';
import { reelsApi } from '../services/reelsApi';
import { usePostLikes } from '../hooks/usePostLikes';
import { savePost, unsavePost } from '../api/bookmarkApi';
import { AuthContext } from '../context/AuthContext';
import ReelsCommentDrawer from '../components/ReelsCommentDrawer';
import HeartOverlay from '../components/HeartOverlay';
import FollowButton from '../components/FollowButton';
import SharePostModal from '../components/SharePostModal';
import PostOptionsMenu from '../components/PostOptionsMenu';
import api from '../api/axios';
import CreateAdModal from '../components/CreateAdModal';
import { getProxiedUrl } from '../utils/mediaUtils';
import ReportModal from '../components/ReportModal';
import { usePrivacy } from '../context/PrivacyContext';
import { getComments } from '../api/commentApi';

const ReelItem = ({ reel, isActive, toggleMute, isMuted, onNext, onPrev, onDeleteReel, onUpdateReel }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Use the hook for likes
    const {
        isLiked,
        likesCount,
        toggleLike,
        handleDoubleTap,
        isAnimating,
        setIsAnimating
    } = usePostLikes(reel, null, 'reel');

    // Local states
    const [showComments, setShowComments] = useState(false);
    const [localCommentsCount, setLocalCommentsCount] = useState(reel.comments || 0);
    const [isSaved, setIsSaved] = useState(reel.isSaved || false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isUserBlocked } = usePrivacy();
    const videoRef = useRef(null);
    const pendingPlayRef = useRef(null);
    const pauseAfterPlayRef = useRef(false);
    // Track whether this reel has ever been played (for UI hint)
    const hasPlayedRef = useRef(false);

    // Sync save state from props
    useEffect(() => {
        setIsSaved(reel.isSaved || false);
    }, [reel.isSaved]);

    // Fetch real comment count from API on mount to override stale DB value
    useEffect(() => {
        if (!reel.id) return;
        getComments(reel.id)
            .then(res => {
                const data = res.data || (Array.isArray(res) ? res : []);
                setLocalCommentsCount(data.length);
            })
            .catch(() => { /* keep DB value if fetch fails */ });
    }, [reel.id]);

    // IMPORTANT: React's `muted` prop has a known bug — it won't update after mount.
    // We must set it directly on the DOM element every time isMuted changes.
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Reliable safe play helper
    const safePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        // MUST be muted for autoplay to work in Chrome/Safari
        video.muted = isMuted;

        try {
            pendingPlayRef.current = video.play();
            await pendingPlayRef.current;
            pendingPlayRef.current = null;
            if (pauseAfterPlayRef.current) {
                pauseAfterPlayRef.current = false;
                video.pause();
                setIsPlaying(false);
            } else {
                hasPlayedRef.current = true;
                setIsPlaying(true);
            }
        } catch (e) {
            pendingPlayRef.current = null;
            pauseAfterPlayRef.current = false;
            // AbortError is expected when scroll interrupts play — not a real error
            if (e.name !== 'AbortError') {
                console.warn('Video play error:', e.name, e.message);
            }
            setIsPlaying(false);
        }
    };

    const safePause = async () => {
        const video = videoRef.current;
        if (!video) return;
        if (pendingPlayRef.current) {
            pauseAfterPlayRef.current = true;
            try { await pendingPlayRef.current; } catch (_) { }
        } else {
            if (!video.paused) video.pause();
            setIsPlaying(false);
        }
    };

    // When this reel becomes active/inactive, play or pause
    useEffect(() => {
        if (isActive) {
            pauseAfterPlayRef.current = false;
            // If video already has enough data, play immediately
            if (videoRef.current && videoRef.current.readyState >= 2) {
                safePlay();
            }
            // Otherwise onCanPlay (below) will fire and start it
        } else {
            safePause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // onCanPlay fires when the video has enough data to start playing
    const handleCanPlay = () => {
        if (isActive && videoRef.current && videoRef.current.paused && !pendingPlayRef.current) {
            pauseAfterPlayRef.current = false;
            safePlay();
        }
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused && !pendingPlayRef.current) {
            pauseAfterPlayRef.current = false;
            safePlay();
        } else {
            safePause();
        }
    };


    const handleSave = async () => {
        const prev = isSaved;
        setIsSaved(!prev); // Optimistic
        try {
            if (prev) {
                await unsavePost(reel.id, user.id, 'REEL');
            } else {
                await savePost(reel.id, user.id, 'REEL');
            }
        } catch (error) {
            console.error("Failed to toggle save", error);
            setIsSaved(prev); // Revert
        }
    };


    return (
        <div className="flex flex-col items-center h-screen">
            <div className={`flex items-end gap-16 relative h-full w-full max-h-screen transition-all duration-500 ease-in-out px-4 pb-4 ${showComments ? 'justify-center' : 'justify-center'}`}>

                {/* Video & Actions Wrapper */}
                <div className={`relative flex items-end h-full transition-all duration-300 ease-in-out ${showComments ? 'w-[600px]' : 'aspect-[9/16] w-auto'}`}>

                    {/* Video Section */}
                    <div className="w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
                        <video
                            ref={videoRef}
                            src={getProxiedUrl(reel.videoUrl)}
                            className="w-full h-full object-cover cursor-pointer"
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onCanPlay={handleCanPlay}
                            onLoadedData={handleCanPlay}
                            onError={(e) => console.error('[Video Error]', reel.videoUrl, e.target.error)}
                            onClick={togglePlay}
                            onDoubleClick={handleDoubleTap}
                        />
                        {/* Tap to Play overlay — shown when video hasn't started yet */}
                        {!isPlaying && isActive && (
                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                                onClick={togglePlay}
                            >
                                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-white ml-1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Top Overlays */}
                        <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
                            <button
                                className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-black/40 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMute();
                                }}
                            >
                                {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                            </button>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-4 pb-5 bg-gradient-to-b from-transparent via-black/50 to-black/80 text-white flex flex-col gap-3 pointer-events-none z-10">
                            {/* User Info */}
                            <div className="flex items-center gap-3 pointer-events-auto">
                                <img
                                    src={getProxiedUrl(reel.userAvatar)}
                                    alt={reel.username}
                                    className="w-[32px] h-[32px] rounded-full object-cover border border-white/20 cursor-pointer"
                                    onClick={() => navigate(`/profile/${reel.username}`)}
                                />
                                <span
                                    className="font-semibold text-sm hover:underline cursor-pointer text-shadow-sm"
                                    onClick={() => navigate(`/profile/${reel.username}`)}
                                >
                                    {reel.username}
                                </span>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <FollowButton
                                        userId={reel.userId || reel.id}
                                        initialIsFollowing={reel.isFollowing}
                                        variant="outline"
                                        onToggle={(newIsFollowing) => {
                                            onUpdateReel({ ...reel, isFollowing: newIsFollowing });
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Caption */}
                            <div className="pointer-events-auto max-w-[80%]">
                                <p className="text-sm line-clamp-2 leading-snug text-shadow-sm">
                                    {reel.caption}
                                </p>
                                <div className="flex items-center gap-2 mt-2 opacity-90">
                                    <Music size={12} />
                                    <span className="text-[11px] font-medium tracking-tight truncate">{reel.music || 'Original Audio'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Centered Play/Pause Indicator */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 font-bold">
                                <div className="p-5 rounded-full bg-black/40 backdrop-blur-sm animate-in zoom-in duration-200">
                                    <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <HeartOverlay visible={isAnimating} onAnimationEnd={() => setIsAnimating(false)} />
                    </div>

                    {/* Vertical Action Column - Attached to Video */}
                    <div className={`absolute -right-14 bottom-0 flex flex-col gap-6 pb-6 z-20 transition-all duration-300 ${showComments ? 'opacity-100' : 'opacity-100'}`}>
                        <ActionButton
                            icon={Heart}
                            label={likesCount}
                            isActive={isLiked}
                            onClick={toggleLike}
                            activeColor="#ff3040"
                        />
                        <ActionButton
                            icon={MessageCircle}
                            label={localCommentsCount}
                            onClick={() => setShowComments(prev => !prev)}
                        />
                        <ActionButton icon={Send} onClick={() => setShowShareModal(true)} />
                        <ActionButton
                            icon={Bookmark}
                            isActive={isSaved}
                            onClick={handleSave}
                            activeColor="white"
                            fillActive={true}
                        />
                        <ActionButton icon={MoreHorizontal} onClick={() => setShowOptionsMenu(true)} />

                        <div className="mt-1 w-[26px] h-[26px] rounded-md border-[2.5px] border-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                            <img src={getProxiedUrl(reel.userAvatar)} className="w-full h-full object-cover" alt="Original Audio" />
                        </div>
                    </div>
                </div>

                {/* Side Comment Section */}
                {showComments && (
                    <div className="w-[400px] h-[92%] my-auto flex flex-col animate-in slide-in-from-right duration-500 ease-in-out">
                        <ReelsCommentDrawer
                            postId={reel.id}
                            onClose={() => setShowComments(false)}
                            currentUser={user}
                            onCommentAdded={() => setLocalCommentsCount(prev => prev + 1)}
                            onCommentCountLoaded={(count) => setLocalCommentsCount(count)}
                            variant="inline"
                        />
                    </div>
                )}

                {/* Modals outside the main container flow */}
                {showShareModal && (
                    <SharePostModal
                        postId={reel.id}
                        mediaUrl={reel.videoUrl}
                        username={reel.username}
                        caption={reel.caption}
                        onClose={() => setShowShareModal(false)}
                        isReel={true}
                    />
                )}

                {/* Options Menu Modal */}
                {showOptionsMenu && (
                    <PostOptionsMenu
                        post={{
                            ...reel,
                            id: reel.id,
                            userId: reel.userId,
                            username: reel.username
                        }}
                        isOwnPost={user && reel.userId ? String(user.id) === String(reel.userId) : false}
                        isFollowing={reel.isFollowing}
                        onClose={() => setShowOptionsMenu(false)}
                        onShare={() => setShowShareModal(true)}
                        onReport={() => setShowReportModal(true)}
                        onDeleteSuccess={onDeleteReel}
                        onUpdatePost={onUpdateReel}
                    />
                )}


                {showReportModal && (
                    <ReportModal
                        postId={reel.id}
                        type="reel"
                        onClose={() => setShowReportModal(false)}
                    />
                )}

                {/* Navigation Arrows */}
                <div className="absolute top-[40%] right-[-100px] flex flex-col gap-4 z-50">
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
                color={isActive ? activeColor : 'white'}
                fill={isActive && fillActive ? activeColor : (isActive && activeColor === '#ff3040' ? activeColor : 'none')}
                style={{
                    filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))'
                }}
            />
        </div>
        {(label !== undefined && label !== null) && <span className="text-[13px] font-medium text-white drop-shadow-md">{label}</span>}
    </div>
);

const NavButton = ({ icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="w-12 h-12 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/10 transition-transform active:scale-95 group cursor-pointer"
    >
        <Icon size={24} className="text-white opacity-90 group-hover:opacity-100" />
    </button>
);

const Reels = () => {
    const { reelId } = useParams();
    const { user } = useContext(AuthContext);
    const { isUserBlocked } = usePrivacy();
    const [muted, setMuted] = useState(true);
    const [reels, updateReelsState] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [userProfiles, setUserProfiles] = useState({});

    // Filtered Reels based on Privacy
    const visibleReels = reels.filter(reel => !isUserBlocked(reel.userId));

    useEffect(() => {
        const fetchReelsAndProfiles = async () => {
            try {
                let fetchedReels = [];

                // 1. Fetch Standard Reels Feed
                // If deep linking, we might want to fetch recommendations based on that reel, but for now just mixed feed
                const data = await reelsApi.getReels();
                if (data && data.data) {
                    fetchedReels = data.data;
                }

                // 2. Handle specific reel request
                if (reelId) {
                    const existingIndex = fetchedReels.findIndex(r => String(r.id) === String(reelId));

                    if (existingIndex !== -1) {
                        // Move to top
                        const targetReel = fetchedReels[existingIndex];
                        fetchedReels.splice(existingIndex, 1);
                        fetchedReels.unshift(targetReel);
                    } else {
                        // Fetch individual reel
                        try {
                            const singleRes = await reelsApi.getReelById(reelId);
                            if (singleRes.status === 'success') {
                                fetchedReels.unshift(singleRes.data);
                            }
                        } catch (e) {
                            console.error('Failed to fetch specific reel', e);
                            // If failed, just show feed
                        }
                    }
                }

                updateReelsState(fetchedReels);

                // 3. Extract unique user IDs for profiles
                const userIds = [...new Set(fetchedReels.map(r => r.userId))];

                if (userIds.length > 0) {
                    try {
                        const profilesRes = await api.post('/users/profile/batch', {
                            userIds,
                            currentUserId: user?.id
                        });
                        if (profilesRes.data.status === 'success' && Array.isArray(profilesRes.data.data)) {
                            const profilesMap = {};
                            profilesRes.data.data.forEach(p => {
                                profilesMap[p.userId] = p;
                            });
                            setUserProfiles(profilesMap);
                        }
                    } catch (profileError) {
                        console.error('Failed to load user profiles for reels', profileError);
                    }
                }

            } catch (error) {
                console.error('Failed to load reels', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReelsAndProfiles();
    }, [user?.id, reelId]);

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = (index) => {
        const items = document.querySelectorAll('.group-snap-item');
        if (items[index]) {
            items[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            let bestEntry = null;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                        bestEntry = entry;
                    }
                }
            });
            if (bestEntry) {
                const index = parseInt(bestEntry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setActiveIndex(index);
                }
            }
        }, {
            root: container,       // <-- KEY FIX: observe within the scroll container
            threshold: 0.6,
            rootMargin: '0px'
        });

        // Small timeout to allow DOM to render snap items
        const timer = setTimeout(() => {
            const items = container.querySelectorAll('.group-snap-item');
            items.forEach(item => observer.observe(item));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [reels, loading]);

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center text-black dark:text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="font-medium">Loading Reels...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full h-screen overflow-hidden">
            {/* Close Button - Fixed Top Right */}
            <div
                className="fixed top-6 right-6 z-[60] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/feed')}
            >
                <X className="text-black dark:text-white" size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
            </div>

            {visibleReels.length === 0 ? (
                <div className="flex items-center justify-center h-screen text-black dark:text-white">
                    <p>No reels found.</p>
                </div>
            ) : (
                <div
                    ref={containerRef}
                    className="w-full h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                >
                    {visibleReels.map((reel, index) => {
                        const profile = userProfiles[reel.userId] || {};
                        return (
                            <div key={reel.id} className="group-snap-item w-full h-screen flex justify-center snap-start" data-index={index}>
                                <ReelItem
                                    reel={{
                                        ...reel,
                                        userAvatar: profile.profilePicture || `https://ui-avatars.com/api/?name=${reel.username}&background=random`,
                                        isFollowing: profile.isFollowing || false,
                                        isBlocked: profile.isBlocked || false,
                                        isRestricted: profile.isRestricted || false,
                                        music: reel.music || 'Original Audio'
                                    }}
                                    isActive={index === activeIndex}
                                    isMuted={muted}
                                    toggleMute={() => setMuted(!muted)}
                                    onNext={() => scrollToIndex(index + 1)}
                                    onPrev={() => scrollToIndex(index - 1)}
                                    onDeleteReel={(id) => {
                                        updateReelsState(prev => prev.filter(r => String(r.id) !== String(id)));
                                    }}
                                    onUpdateReel={(updated) => {
                                        // 1. Update the reels list (for content like captions, etc.)
                                        updateReelsState(prev => prev.map(r => String(r.id) === String(updated.id) ? { ...r, ...updated } : r));

                                        // 2. Update the profile cache (for consistency across multiple reels/posts by same user)
                                        if (updated.userId) {
                                            setUserProfiles(prev => ({
                                                ...prev,
                                                [updated.userId]: {
                                                    ...(prev[updated.userId] || {}),
                                                    isFollowing: updated.isFollowing !== undefined ? updated.isFollowing : prev[updated.userId]?.isFollowing,
                                                    isBlocked: updated.isBlocked !== undefined ? updated.isBlocked : prev[updated.userId]?.isBlocked,
                                                    isRestricted: updated.isRestricted !== undefined ? updated.isRestricted : prev[updated.userId]?.isRestricted
                                                }
                                            }));
                                        }
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Reels;
