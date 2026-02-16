import { useState, useEffect } from 'react';
import { getSharingSettings, updateSharingSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SharingSettings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        storyShares: true,
        postToStory: true,
        reposts: true,
        websiteEmbeds: true,
        featuredRequests: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getSharingSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data);
                }
            } catch (err) {
                console.error('Failed to load sharing settings', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleToggle = async (key) => {
        const newVal = !settings[key];
        const oldSettings = { ...settings };
        setSettings(prev => ({ ...prev, [key]: newVal }));

        try {
            await updateSharingSettings({ [key]: newVal });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };

    const handleEmbedChange = async (val) => {
        const oldSettings = { ...settings };
        setSettings(prev => ({ ...prev, websiteEmbeds: val }));

        try {
            await updateSharingSettings({ websiteEmbeds: val });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };


    const ToggleSwitch = ({ checked, onChange }) => (
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="toggle-pill"></div>
        </label>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Sharing and reuse</h2>
            </div>

            {/* Section 1: Allow people to share your stories */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Allow people to share your stories</h3>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm p-5 px-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium">Story shares</span>
                        <ToggleSwitch checked={settings.storyShares} onChange={() => handleToggle('storyShares')} />
                    </div>
                </div>
                <p className="text-[12px] text-text-secondary mt-3 pl-1">
                    When this is on, people can send your stories in messages.
                </p>
            </div>

            {/* Section 2: Allow people to share your posts and reels */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Allow people to share your posts and reels</h3>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-5 px-6 border-b border-border">
                        <span className="text-[15px] font-medium">Posts and reels to stories</span>
                        <ToggleSwitch checked={settings.postToStory} onChange={() => handleToggle('postToStory')} />
                    </div>
                    <div className="flex items-center justify-between p-5 px-6">
                        <span className="text-[15px] font-medium">Reposts on posts and reels</span>
                        <ToggleSwitch checked={settings.reposts} onChange={() => handleToggle('reposts')} />
                    </div>
                </div>
            </div>

            {/* Section 3: Allow people to share externally */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Allow people to share externally</h3>
                <div className="mb-4">
                    <span className="text-[15px] font-medium block mb-1">Website embeds</span>
                    <p className="text-[12px] text-text-secondary leading-normal">
                        When this is on, your public posts or profile can be shown outside of Jaadoe, including articles and blogs. <span className="text-[#0095f6] cursor-pointer hover:underline" onClick={() => window.open('/help', '_blank')}>Learn more</span>
                    </p>
                </div>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-5 px-6 border-b border-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5" onClick={() => handleEmbedChange(true)}>
                        <span className="text-[15px] font-medium">On</span>
                        <input type="radio" className="custom-radio" checked={settings.websiteEmbeds === true} readOnly />
                    </div>
                    <div className="flex items-center justify-between p-5 px-6 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5" onClick={() => handleEmbedChange(false)}>
                        <span className="text-[15px] font-medium">Off</span>
                        <input type="radio" className="custom-radio" checked={settings.websiteEmbeds === false} readOnly />
                    </div>
                </div>
            </div>

            {/* Section 4: Allow businesses to interact with you */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Allow businesses to interact with you</h3>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm p-5 px-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[15px] font-medium">Featured content requests</span>
                        <ToggleSwitch checked={settings.featuredRequests} onChange={() => handleToggle('featuredRequests')} />
                    </div>
                </div>
                <p className="text-[12px] text-text-secondary mt-3 pl-1 leading-normal max-w-[500px]">
                    When this is on, business accounts can request to feature any of your new tagged content on Meta Products, including shops, ads and other features on Jaadoe. <span className="text-[#0095f6] cursor-pointer hover:underline" onClick={() => window.open('/help', '_blank')}>Learn more</span>
                </p>
            </div>
        </div>
    );
};

export default SharingSettings;
