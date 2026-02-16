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


    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Tags and mentions</h2>
            </div>

            {/* Who can tag you Section */}
            <div className="mb-8">
                <h3 className="text-base font-bold mb-2">Who can tag you</h3>
                <p className="text-[13px] text-text-secondary leading-tight mb-4">
                    Choose who can tag you in their photos and videos. When people try to tag you, they'll see if you don't allow tags from everyone.
                </p>
                <p className="text-[13px] text-[#8e8e8e] leading-tight mb-4">
                    You currently have Limited interactions turned on, which means that some people can't tag or mention you.
                </p>

                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between p-4 px-6 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowTagsFrom', 'everyone')}>
                        <span className="text-sm font-medium">Allow tags from everyone</span>
                        <input type="radio" className="custom-radio" checked={settings.allowTagsFrom === 'everyone'} readOnly />
                    </div>
                    <div className="flex items-center justify-between p-4 px-6 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowTagsFrom', 'following')}>
                        <span className="text-sm font-medium">Allow tags from people that you follow</span>
                        <input type="radio" className="custom-radio" checked={settings.allowTagsFrom === 'following'} readOnly />
                    </div>
                    <div className="flex items-center justify-between p-4 px-6 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowTagsFrom', 'no_one')}>
                        <span className="text-sm font-medium">Don't allow tags</span>
                        <input type="radio" className="custom-radio" checked={settings.allowTagsFrom === 'no_one'} readOnly />
                    </div>
                </div>
            </div>

            {/* Manually approve tags button row */}
            <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl overflow-hidden shadow-sm mb-10">
                <div
                    onClick={() => navigate('/settings/manually_approve_tags')}
                    className="flex items-center justify-between p-4 px-6 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                    <span className="text-sm font-medium">Manually approve tags</span>
                    <ChevronRight size={20} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Who can @mention you Section */}
            <div className="mb-8">
                <h3 className="text-base font-bold mb-2">Who can @mention you</h3>
                <p className="text-[13px] text-text-secondary leading-tight mb-4">
                    Choose who can @mention you to link your account in their stories, notes, comments, live videos, bio and captions. When people try to @mention you, they'll see if you don't allow @mentions.
                </p>

                <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between p-4 px-6 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowMentionsFrom', 'everyone')}>
                        <span className="text-sm font-medium">Allow mentions from everyone</span>
                        <input type="radio" className="custom-radio" checked={settings.allowMentionsFrom === 'everyone'} readOnly />
                    </div>
                    <div className="flex items-center justify-between p-4 px-6 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowMentionsFrom', 'following')}>
                        <span className="text-sm font-medium">Allow mentions from people you follow</span>
                        <input type="radio" className="custom-radio" checked={settings.allowMentionsFrom === 'following'} readOnly />
                    </div>
                    <div className="flex items-center justify-between p-4 px-6 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" onClick={() => handleChange('allowMentionsFrom', 'no_one')}>
                        <span className="text-sm font-medium">Don't allow mentions</span>
                        <input type="radio" className="custom-radio" checked={settings.allowMentionsFrom === 'no_one'} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagsMentions;
