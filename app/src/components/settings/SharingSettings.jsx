import { useState, useEffect } from 'react';
import { getSharingSettings, updateSharingSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SharingSettings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        storyShares: true, postToStory: true, reposts: true, websiteEmbeds: true, featuredRequests: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        getSharingSettings()
            .then(res => setSettings(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (key) => {
        const val = !settings[key];
        const old = { ...settings };
        setSettings(prev => ({ ...prev, [key]: val }));
        updateSharingSettings({ [key]: val }).catch(() => setSettings(old));
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const Toggle = ({ label, propKey }) => (
        <div className="flex items-center justify-between mb-6">
            <span className="text-base font-medium">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                    type="checkbox"
                    checked={settings[propKey]}
                    onChange={() => handleChange(propKey)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
            </label>
        </div>
    );

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Sharing and remixes</h2>
            </div>

            <Toggle label="Allow story shares in messages" propKey="storyShares" />
            <Toggle label="Allow post and reel sharing to stories" propKey="postToStory" />
            <Toggle label="Allow reposts of posts and reels" propKey="reposts" />
            <Toggle label="Allow featured content requests" propKey="featuredRequests" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-base font-medium block">Allow embeds</span>
                    <p className="text-xs text-text-secondary w-3/4 mt-1">Allow people to embed your posts or profile on other websites.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                        type="checkbox"
                        checked={settings.websiteEmbeds}
                        onChange={() => handleChange('websiteEmbeds')}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>


        </div>
    );
};

export default SharingSettings;
