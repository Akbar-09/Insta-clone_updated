import { useState, useEffect } from 'react';
import { getCommentSettings, updateCommentSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommentsSettings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        allowFrom: 'everyone',
        allowGif: true,
        counts: { followers: 0, following: 0, mutual: 0 }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getCommentSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data);
                }
            } catch (err) {
                console.error('Failed to load comment settings', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = async (key, value) => {
        const oldSettings = { ...settings };
        setSettings(prev => ({ ...prev, [key]: value }));

        try {
            await updateCommentSettings({ [key]: value });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };


    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            <div className="flex items-center mb-10 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Comments</h2>
            </div>

            {/* Allow comments from Section */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Allow comments from</h3>
                <div className="flex flex-col space-y-6">

                    <div className="flex items-center cursor-pointer group" onClick={() => handleChange('allowFrom', 'everyone')}>
                        <input type="radio" className="custom-radio mr-4" checked={settings.allowFrom === 'everyone'} readOnly />
                        <span className="text-[15px] font-medium">Everyone</span>
                    </div>

                    <div className="flex items-start cursor-pointer group" onClick={() => handleChange('allowFrom', 'following')}>
                        <div className="pt-0.5">
                            <input type="radio" className="custom-radio mr-4" checked={settings.allowFrom === 'following'} readOnly />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-medium leading-tight">People you follow</span>
                            <span className="text-[13px] text-text-secondary mt-1">{settings.counts?.following || 0} people</span>
                        </div>
                    </div>

                    <div className="flex items-start cursor-pointer group" onClick={() => handleChange('allowFrom', 'followers')}>
                        <div className="pt-0.5">
                            <input type="radio" className="custom-radio mr-4" checked={settings.allowFrom === 'followers'} readOnly />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-medium leading-tight">Your followers</span>
                            <span className="text-[13px] text-text-secondary mt-1">{settings.counts?.followers || 0} people</span>
                        </div>
                    </div>

                    <div className="flex items-start cursor-pointer group" onClick={() => handleChange('allowFrom', 'mutual')}>
                        <div className="pt-0.5">
                            <input type="radio" className="custom-radio mr-4" checked={settings.allowFrom === 'mutual'} readOnly />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-medium leading-tight">People you follow and your followers</span>
                            <span className="text-[13px] text-text-secondary mt-1">{settings.counts?.mutual || 0} people</span>
                        </div>
                    </div>

                    <div className="flex items-center cursor-pointer group" onClick={() => handleChange('allowFrom', 'off')}>
                        <input type="radio" className="custom-radio mr-4" checked={settings.allowFrom === 'off'} readOnly />
                        <span className="text-[15px] font-medium">Off</span>
                    </div>
                </div>
            </div>

            {/* Allow GIF comments Section */}
            <div className="mt-4 pt-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-medium">Allow GIF comments</span>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            type="checkbox"
                            checked={settings.allowGif}
                            onChange={() => handleChange('allowGif', !settings.allowGif)}
                            className="sr-only peer"
                        />
                        <div className="toggle-pill"></div>
                    </label>
                </div>
                <p className="text-[13px] text-text-secondary leading-normal max-w-[500px]">
                    People will be able to comment GIFs on your posts and reels.
                </p>
            </div>
        </div>
    );
};

export default CommentsSettings;
