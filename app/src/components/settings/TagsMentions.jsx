import { useState, useEffect } from 'react';
import { getTagsMentionsSettings, updateTagsMentionsSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TagsMentions = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        allowTagsFrom: 'everyone',
        manualTagApproval: false,
        allowMentionsFrom: 'everyone'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getTagsMentionsSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data);
                }
            } catch (err) {
                console.error(err);
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
            await updateTagsMentionsSettings({ [key]: value });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };

    const RadioOption = ({ label, value, current, onChange }) => (
        <label className="flex items-center justify-between py-3 cursor-pointer">
            <span className="text-base text-text-primary">{label}</span>
            <input
                type="radio"
                className="w-5 h-5 accent-black dark:accent-white"
                checked={current === value}
                onChange={() => onChange(value)}
            />
        </label>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const areTagsDisabled = settings.allowTagsFrom === 'no_one';

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Tags and mentions</h2>
            </div>

            {/* Who can tag you */}
            <h3 className="text-base font-bold mb-2">Who can tag you</h3>
            <p className="text-xs text-text-secondary leading-4 mb-4">
                Choose who can tag you in their photos and videos. When people try to tag you, they'll see if you don't allow tags from everyone.
            </p>
            <div className="flex flex-col mb-8 pl-1">
                <RadioOption
                    label="Everyone"
                    value="everyone"
                    current={settings.allowTagsFrom}
                    onChange={(val) => handleChange('allowTagsFrom', val)}
                />
                <RadioOption
                    label="People you follow"
                    value="following"
                    current={settings.allowTagsFrom}
                    onChange={(val) => handleChange('allowTagsFrom', val)}
                />
                <RadioOption
                    label="Don't allow tags"
                    value="no_one"
                    current={settings.allowTagsFrom}
                    onChange={(val) => handleChange('allowTagsFrom', val)}
                />
            </div>

            {/* Manually approve tags */}
            <div className="flex items-center justify-between mb-4 mt-2">
                <div>
                    <span className="text-base font-medium block">Manually approve tags</span>
                </div>
                <label className={`relative inline-flex items-center cursor-pointer shrink-0 mt-1 ${areTagsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input
                        type="checkbox"
                        checked={settings.manualTagApproval}
                        onChange={() => !areTagsDisabled && handleChange('manualTagApproval', !settings.manualTagApproval)}
                        disabled={areTagsDisabled}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>

            <div
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors mb-4"
            // onClick={() => navigate('/settings/manually_approve_tags')} // Pending implementation
            >
                <span className="text-base text-text-primary">Review tags from friends</span>
                <ChevronRight size={20} className="text-text-secondary" />
            </div>

            {/* Who can mention you */}
            <h3 className="text-base font-bold mb-2 mt-4">Who can @mention you</h3>
            <p className="text-xs text-text-secondary leading-4 mb-4">
                Choose who can @mention you to link your account in their stories, comments, live videos and captions. When people try to @mention you, they'll see if you don't allow mentions.
            </p>
            <div className="flex flex-col mb-8 pl-1">
                <RadioOption
                    label="Everyone"
                    value="everyone"
                    current={settings.allowMentionsFrom}
                    onChange={(val) => handleChange('allowMentionsFrom', val)}
                />
                <RadioOption
                    label="People you follow"
                    value="following"
                    current={settings.allowMentionsFrom}
                    onChange={(val) => handleChange('allowMentionsFrom', val)}
                />
                <RadioOption
                    label="Don't allow mentions"
                    value="no_one"
                    current={settings.allowMentionsFrom}
                    onChange={(val) => handleChange('allowMentionsFrom', val)}
                />
            </div>

        </div>
    );
};

export default TagsMentions;
