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
import ReportModal from '../components/ReportModal';
import { usePrivacy } from '../context/PrivacyContext';

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
    const [isPlaying, setIsPlaying] = useState(isActive);
    const { isUserBlocked } = usePrivacy();
    const videoRef = useRef(null);

    // Sync save state from props
    useEffect(() => {
        setIsSaved(reel.isSaved || false);
    }, [reel.isSaved]);

    // Handle play/pause on scroll
    useEffect(() => {
        if (isActive && videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log('Autoplay prevented:', e));
            }
            setIsPlaying(true);
        } else if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
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

    const getProxiedUrl = (url) => {
        if (!url) return '';
        if (typeof url !== 'string') return url;

        // Handle bare filenames (likely R2/Media Service uploads)
        if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('data:') && !url.startsWith('blob:')) {
            return `/api/v1/media/files/${url}`;
        }

        try {
            // Remove full origin if it matches any local IP/Port variations to make it relative
            // This handles localhost, 127.0.0.1, and any 192.168.1.x IP with common dev ports
            const cleanedUrl = url.replace(/^http:\/\/(localhost|127\.0\.0\.1|192\.168\.1\.\d+):(5000|5175|8000|5173|5174)/, '');

            if (cleanedUrl !== url) {
                return cleanedUrl;
            }

            // If it's an R2 URL directly, try to convert it to our proxied endpoint
            if (url.includes('r2.dev')) {
                const parts = url.split('.dev/');
                if (parts.length > 1) {
                    return `/api/v1/media/files/${parts[1]}`;
                }
            }

            // Ensure media files are always routed through the api/v1 prefix
            if (url.includes('/media/files') && !url.includes('/api/v1/')) {
                return url.replace('/media/files', '/api/v1/media/files');
            }

            // Route local /uploads/ through the robust files endpoint
            if (url.startsWith('/uploads/')) {
                return url.replace('/uploads/', '/api/v1/media/files/');
            }
        } catch (e) {
            console.warn('URL proxying failed:', e);
        }

        return url;

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
                            muted={isMuted}
                            playsInline
                            onClick={togglePlay}
                            onDoubleClick={handleDoubleTap}
                        />

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
                                    src={reel.userAvatar}
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
                            <img src={reel.userAvatar} className="w-full h-full object-cover" alt="Original Audio" />
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index'));
                    if (!isNaN(index)) {
                        setActiveIndex(index);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        const items = document.querySelectorAll('.group-snap-item');
        items.forEach(item => observer.observe(item));

        return () => observer.disconnect();
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
        <div className="flex flex-col items-center w-full gap-0 bg-transparent min-h-screen">
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
                <div ref={containerRef} className="w-full flex flex-col items-center bg-transparent">
                    {visibleReels.map((reel, index) => {
                        const profile = userProfiles[reel.userId] || {};
                        return (
                            <div key={reel.id} className="group-snap-item w-full flex justify-center snap-start" data-index={index}>
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
