import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const StoryAndLiveSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl">
            <h2 className="text-xl font-bold mb-6 mt-1">Story and live</h2>

            <div className="flex flex-col">
                <div
                    onClick={() => navigate('/settings/story_and_live/hide_from')}
                    className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                >
                    <span className="text-base font-medium">Hide story and live from</span>
                    <ChevronRight size={20} className="text-text-secondary" />
                </div>
            </div>
            <p className="text-sm text-text-secondary mt-2">
                Hide your story and live videos from specific people.
            </p>
        </div>
    );
};

export default StoryAndLiveSettings;
