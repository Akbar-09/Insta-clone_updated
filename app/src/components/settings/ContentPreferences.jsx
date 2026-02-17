import { useState, useEffect } from 'react';
import { getContentPreferences, updateContentPreferences } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContentPreferences = () => {
    const [loading, setLoading] = useState(true);
    // Not actually used in main view unless distinguishing what to show, 
    // but useful to pre-fetch or if we had more settings here.
    const navigate = useNavigate();

    useEffect(() => {
        // Just verify loaded or auth
        setLoading(false);
    }, []);

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Content preferences</h2>
            </div>

            <h3 className="font-bold text-base mb-2">Content from accounts you don't follow</h3>

            <div
                onClick={() => navigate('/settings/content_preferences/sensitive')}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
            >
                <span className="text-base text-text-primary">Sensitive content</span>
                <ChevronRight size={20} className="text-text-secondary" />
            </div>
        </div>
    );
};

export default ContentPreferences;
