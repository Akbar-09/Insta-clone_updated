import { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import StoryHeader from './stories/StoryHeader';
import StoryProgressBar from './stories/StoryProgressBar';
import StoryNavigation from './stories/StoryNavigation';
import StoryFooter from './stories/StoryFooter';
import { groupStoriesByUser } from '../utils/storyUtils';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const StoryViewer = ({ stories, activeIndex = 0, onClose }) => {

    // --- 1. Data Preparation: Group stories by User ---
    const groupedStories = useMemo(() => groupStoriesByUser(stories), [stories]);

    // Initial State Calculation
    // Find which group/item the activeIndex points to in the flat list
    // OR if passed index is purely flat, we need to map it. 
    // Optimization: Just finding the user of stories[activeIndex]
    const getInitialState = () => {
        if (!stories[activeIndex]) return { userIdx: 0, itemIdx: 0 };
        const targetUserId = stories[activeIndex].userId;
        const targetStoryId = stories[activeIndex].id;

        const userIdx = groupedStories.findIndex(g => g.userId === targetUserId);
        const itemIdx = groupedStories[userIdx].stories.findIndex(s => s.id === targetStoryId);

        return { userIdx: userIdx >= 0 ? userIdx : 0, itemIdx: itemIdx >= 0 ? itemIdx : 0 };
    };

    const initState = getInitialState();

    const [currentUserIndex, setCurrentUserIndex] = useState(initState.userIdx);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initState.itemIdx);
    const [isPaused, setIsPaused] = useState(false);

    const currentUserGroup = groupedStories[currentUserIndex];
    const currentStory = currentUserGroup?.stories[currentStoryIndex];

    // Navigation Logic
    const goToNext = useCallback(() => {
        if (!currentUserGroup) return;

        if (currentStoryIndex < currentUserGroup.stories.length - 1) {
            // Next story for same user
            setCurrentStoryIndex(prev => prev + 1);
        } else {
            // Next user
            if (currentUserIndex < groupedStories.length - 1) {
                setCurrentUserIndex(prev => prev + 1);
                setCurrentStoryIndex(0);
            } else {
                // End of all stories
                onClose();
            }
        }
    }, [currentStoryIndex, currentUserIndex, currentUserGroup, groupedStories.length, onClose]);

    const goToPrev = useCallback(() => {
        if (currentStoryIndex > 0) {
            // Prev story for same user
            setCurrentStoryIndex(prev => prev - 1);
        } else {
            // Prev user
            if (currentUserIndex > 0) {
                const prevUserIdx = currentUserIndex - 1;
                setCurrentUserIndex(prevUserIdx);
                // Go to LAST story of previous user
                setCurrentStoryIndex(groupedStories[prevUserIdx].stories.length - 1);
            } else {
                // Start of all stories (could close or stay)
                // Stay at 0,0
            }
        }
    }, [currentStoryIndex, currentUserIndex, groupedStories]);

    // Keyboard Events
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev, onClose]);

    // Helpers for media
    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return url;
    };

    // Previews
    const prevStoryPreview = useCallback(() => {
        if (currentUserIndex > 0) {
            const group = groupedStories[currentUserIndex - 1];
            return {
                ...group.stories[group.stories.length - 1],
                userAvatar: group.userAvatar,
                username: group.username
            };
        }
        return null;
    }, [currentUserIndex, groupedStories]);

    const nextStoryPreview = useCallback(() => {
        if (currentUserIndex < groupedStories.length - 1) {
            const group = groupedStories[currentUserIndex + 1];
            return {
                ...group.stories[0],
                userAvatar: group.userAvatar,
                username: group.username
            };
        }
        return null;
    }, [currentUserIndex, groupedStories]);


    if (!currentStory) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            {/* Logo */}
            <div className="absolute top-4 left-4 z-[10000] cursor-pointer">
                <img src={jaadoeLogo} alt="Jaadoe" className="w-[120px] h-auto object-contain" />
            </div>

            {/* Close Button (Top Right Fallback) */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:opacity-75 z-[10000] bg-transparent border-none cursor-pointer p-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Main Stage */}
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Navigation & Previews */}
                <StoryNavigation
                    hasPrev={currentUserIndex > 0 || currentStoryIndex > 0}
                    hasNext={true}
                    onPrev={goToPrev}
                    onNext={goToNext}
                    prevPreview={prevStoryPreview()}
                    nextPreview={nextStoryPreview()}
                />

                {/* Click Zones (Invisible) */}
                <div
                    className="absolute inset-y-0 left-0 w-[30%] z-20 cursor-pointer"
                    onClick={goToPrev}
                ></div>
                <div
                    className="absolute inset-y-0 right-0 w-[30%] z-20 cursor-pointer"
                    onClick={goToNext}
                ></div>

                {/* ACTIVE STORY CARD */}
                <div
                    className="relative w-full md:w-[400px] h-full md:h-[90vh] bg-black md:rounded-xl overflow-hidden shadow-2xl flex flex-col mx-4 md:mx-0 z-30"
                    onMouseDown={() => setIsPaused(true)}
                    onMouseUp={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Progress */}
                    <StoryProgressBar
                        duration={5000}
                        activeIndex={currentStoryIndex}
                        count={currentUserGroup.stories.length}
                        isPaused={isPaused || currentStory.mediaType === 'VIDEO'}
                        onCompleted={goToNext}
                    />

                    {/* Header */}
                    <StoryHeader
                        user={{
                            username: currentStory.username,
                            avatar: currentStory.userAvatar || currentUserGroup.userAvatar
                        }}
                        timestamp={new Date(currentStory.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        onClose={onClose}
                        isPaused={isPaused}
                        onTogglePause={() => setIsPaused(p => !p)}
                    />

                    {/* Media */}
                    <div className="flex-grow flex items-center justify-center bg-[#262626] relative h-full w-full">
                        {currentStory.mediaType === 'VIDEO' ? (
                            <video
                                src={getMediaUrl(currentStory.mediaUrl)}
                                className="w-full h-full object-cover"
                                autoPlay
                                playsInline
                                onEnded={goToNext}
                            />
                        ) : (
                            <img
                                src={getMediaUrl(currentStory.mediaUrl)}
                                alt="Story"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <StoryFooter
                        username={currentStory.username}
                        onFocus={() => setIsPaused(true)}
                        onBlur={() => setIsPaused(false)}
                    />

                </div>

            </div>
        </div>,
        document.body
    );
};

export default StoryViewer;
