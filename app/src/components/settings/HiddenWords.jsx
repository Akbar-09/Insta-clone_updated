import { useState, useEffect } from 'react';
import { getHiddenWordsSettings, updateHiddenWordsSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HiddenWords = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        hideComments: false,
        advancedFilter: false,
        hideMessageRequests: false,
        customHideComments: false,
        customHideMessageRequests: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getHiddenWordsSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data.settings);
                }
            } catch (err) {
                console.error('Failed to load hidden words settings', err);
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
            await updateHiddenWordsSettings({ [key]: newVal });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(oldSettings); // Rollback
        }
    };

    const ToggleRow = ({ label, description, checked, onChange, learnMore = false }) => (
        <div className="flex items-start justify-between py-1 mb-6">
            <div className="flex-1 mr-8">
                <span className="text-[15px] font-medium block leading-tight mb-1">{label}</span>
                <p className="text-[12px] text-text-secondary leading-normal">
                    {description} {learnMore && <span className="text-[#0095f6] cursor-pointer hover:underline" onClick={() => window.open('/help', '_blank')}>Learn more</span>}
                </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-all duration-200"></div>
            </label>
        </div>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-10 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Hidden words</h2>
            </div>

            {/* Section 1: Unwanted comments and message requests */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Unwanted comments and message requests</h3>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm p-6 pb-2">
                    <ToggleRow
                        label="Hide Comments"
                        description="Comments that are potentially offensive, misleading or spam will be moved to a separate section. Anyone can see these comments and you can unhide comments on your own posts at any time."
                        checked={settings.hideComments}
                        onChange={() => handleToggle('hideComments')}
                        learnMore={true}
                    />
                    <ToggleRow
                        label="Advanced comment filtering"
                        description="Even more comments that meet our criteria will automatically be hidden."
                        checked={settings.advancedFilter}
                        onChange={() => handleToggle('advancedFilter')}
                    />
                    <ToggleRow
                        label="Hide Message Requests"
                        description="Message requests that may be offensive, spam or scams will be moved to the Hidden requests folder. We'll also filter notifications for these messages. This feature is not currently supported on web or Meta Quest."
                        checked={settings.hideMessageRequests}
                        onChange={() => handleToggle('hideMessageRequests')}
                    />
                </div>
            </div>

            {/* Section 2: Custom words for messages and comments */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-6">Custom words for messages and comments</h3>
                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm overflow-hidden pt-1">
                    <div
                        onClick={() => navigate('/settings/hidden_words/custom')}
                        className="flex items-center justify-between p-6 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-border"
                    >
                        <span className="text-[15px] font-medium">Manage custom words and phrases</span>
                        <ChevronRight size={20} className="text-[#8e8e8e]" />
                    </div>

                    <div className="p-6 pb-2">
                        <ToggleRow
                            label="Hide Comments"
                            description="Comments that contain words, phrases or emojis on your custom list and similar misspellings will be filtered out so that they are only visible to the authors."
                            checked={settings.customHideComments}
                            onChange={() => handleToggle('customHideComments')}
                        />
                        <ToggleRow
                            label="Hide Message Requests"
                            description="Message requests that contain words from your list will be hidden. This feature is not currently supported on web or Meta Quest."
                            checked={settings.customHideMessageRequests}
                            onChange={() => handleToggle('customHideMessageRequests')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HiddenWords;
