import { useState, useEffect } from 'react';
import { getCommentSettings, updateCommentSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommentsSettings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ allowFrom: 'everyone', allowGif: true });
    const navigate = useNavigate();

    useEffect(() => {
        getCommentSettings()
            .then(res => setSettings(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (key, value) => {
        const old = { ...settings };
        setSettings(prev => ({ ...prev, [key]: value }));
        updateCommentSettings({ [key]: value }).catch(() => setSettings(old));
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const RadioOption = ({ label, value }) => (
        <label className="flex items-center justify-between py-3 cursor-pointer">
            <span className="text-base text-text-primary">{label}</span>
            <input
                type="radio"
                checked={settings.allowFrom === value}
                onChange={() => handleChange('allowFrom', value)}
                className="w-5 h-5 accent-black dark:accent-white"
            />
        </label>
    );

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Comments</h2>
            </div>

            <h3 className="font-bold mb-2">Block comments from</h3>
            <div className="flex items-center justify-between py-3 mb-6 cursor-pointer">
                <span>People you block</span>
            </div>

            <h3 className="font-bold mb-2">Allow comments from</h3>
            <div className="flex flex-col mb-8 pl-1">
                <RadioOption label="Everyone" value="everyone" />
                <RadioOption label="People you follow" value="following" />
                <RadioOption label="Your followers" value="followers" />
                <RadioOption label="People you follow and your followers" value="mutual" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Allow GIF comments</span>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                        type="checkbox"
                        checked={settings.allowGif}
                        onChange={() => handleChange('allowGif', !settings.allowGif)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>
        </div>
    );
};

export default CommentsSettings;
