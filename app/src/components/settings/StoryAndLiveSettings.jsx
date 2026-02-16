import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const StoryAndLiveSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Hide story and live</h2>
            </div>

            <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl overflow-hidden shadow-sm">
                <div
                    onClick={() => navigate('/settings/story_and_live/hide_from')}
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                    <span className="text-base font-medium">Hide story and live from</span>
                    <ChevronRight size={20} className="text-text-secondary group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
};

export default StoryAndLiveSettings;
