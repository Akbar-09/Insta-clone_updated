import { useState, useEffect, useMemo, useRef } from 'react';
import api from '../api/axios';
import CreateStoryModal from './CreateStoryModal';
import StoryViewer from './StoryViewer';
import { groupStoriesByUser } from '../utils/storyUtils';
import StoryBubble from './stories/StoryBubble';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [userProfiles, setUserProfiles] = useState({});
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    useEffect(() => {
        const fetchStoriesAndProfiles = async () => {
            try {
                // 1. Fetch Stories
                const response = await api.get('/stories');
                let allStories = [];

                if (response.data.status === 'success') {
                    allStories = response.data.data;
                }

                setStories(allStories);

                // 2. Extract unique user IDs (exclude mocks if they don't exist in DB)
                const realUserIds = [...new Set(
                    allStories
                        .filter(s => {
                            const uid = String(s.userId);
                            return !uid.startsWith('mock-user');
                        })
                        .map(s => s.userId)
                )];

                if (realUserIds.length > 0) {
                    try {
                        // 3. Fetch Profiles for these users
                        const profilesRes = await api.post('/users/profile/batch', { userIds: realUserIds });

                        if (profilesRes.data.status === 'success') {
                            const profilesMap = {};
                            profilesRes.data.data.forEach(p => {
                                profilesMap[p.userId] = p;
                            });
                            setUserProfiles(profilesMap);
                        }
                    } catch (profileErr) {
                        console.error("Failed to fetch profiles for stories", profileErr);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch stories", error);
            }
        };

        fetchStoriesAndProfiles();
    }, []);

    // Scroll Handlers
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        // Initial check
        handleScroll();
    }, [stories]);

    // Group stories and merge with profile data
    const groupedStories = useMemo(() => {
        const grouped = groupStoriesByUser(stories);
        // Enrich with profile data
        const enriched = grouped.map(group => {
            // Check both string and number keys to be safe
            const profile = userProfiles[group.userId] || userProfiles[String(group.userId)];

            if (profile) {
                return {
                    ...group,
                    userAvatar: profile.profilePicture || group.userAvatar, // Prefer fetched profile picture
                    username: profile.username || group.username
                };
            }
            return group;
        });
        return enriched;
    }, [stories, userProfiles]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState(null);

    const handleStoryClick = (group) => {
        const index = stories.findIndex(s => s.id === group.stories[0].id);
        setActiveStory(index !== -1 ? index : 0);
    };

    return (
        <>
            <div className="relative mb-6 max-w-[630px] mx-auto group/scroll">
                {/* Left Scroll Button */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md opacity-90 hover:opacity-100 hidden md:block"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                <ul
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-[14px] overflow-x-auto p-1 scrollbar-none scroll-smooth items-center"
                >
                    {/* Always show "Your Story" first */}
                    <li
                        className="flex flex-col items-center cursor-pointer min-w-[66px] flex-shrink-0"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <div className="w-[66px] h-[66px] rounded-full bg-white dark:bg-black p-[2px] flex justify-center items-center mb-1.5 border border-border">
                            <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <span className="text-xl text-blue-500">+</span>
                            </div>
                        </div>
                        <span className="text-xs text-text-primary text-center max-w-[74px] truncate">Your Story</span>
                    </li>

                    {/* Render Grouped User Bubbles */}
                    {groupedStories.map((group) => (
                        <StoryBubble
                            key={group.userId}
                            user={group}
                            count={group.stories.length}
                            onClick={() => handleStoryClick(group)}
                        />
                    ))}
                </ul>

                {/* Right Scroll Button */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md opacity-90 hover:opacity-100 hidden md:block"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            {isCreateModalOpen && (
                <CreateStoryModal onClose={() => setIsCreateModalOpen(false)} />
            )}

            {activeStory !== null && (
                <StoryViewer
                    stories={stories}
                    activeIndex={activeStory}
                    onClose={() => setActiveStory(null)}
                    onSeen={(storyId) => {
                        setStories(prev => prev.map(s => s.id === storyId ? { ...s, seen: true } : s));
                    }}
                />
            )}
        </>
    );
};

export default Stories;
