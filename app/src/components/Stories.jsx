import { useState, useEffect, useMemo } from 'react';
import api from '../api/axios';
import CreateStoryModal from './CreateStoryModal';
import StoryViewer from './StoryViewer';
import { groupStoriesByUser } from '../utils/storyUtils';
import StoryBubble from './stories/StoryBubble';

const Stories = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await api.get('/stories');
                if (response.data.status === 'success') {
                    setStories(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch stories", error);
            }
        };

        fetchStories();
    }, []);

    // Group stories for display
    const groupedStories = useMemo(() => groupStoriesByUser(stories), [stories]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeStory, setActiveStory] = useState(null);

    const handleStoryClick = (group) => {
        // We pass the index of the FIRST story of this user in the flat list
        // logic: find index in flat list where story.id === group.stories[0].id
        const index = stories.findIndex(s => s.id === group.stories[0].id);
        setActiveStory(index !== -1 ? index : 0);
    };

    const getMediaUrl = (url) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        return url;
    };

    return (
        <>
            <div className="mb-0 overflow-hidden max-w-[630px] mx-auto">
                <ul className="flex gap-[14px] overflow-x-auto p-1 scrollbar-none scroll-smooth">
                    {/* Always show "Your Story" first */}
                    <li
                        className="flex flex-col items-center cursor-pointer min-w-[66px]"
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
            </div>

            {isCreateModalOpen && (
                <CreateStoryModal onClose={() => setIsCreateModalOpen(false)} />
            )}

            {activeStory !== null && (
                <StoryViewer
                    stories={stories}
                    activeIndex={activeStory}
                    onClose={() => setActiveStory(null)}
                />
            )}
        </>
    );
};

export default Stories;
