import { useState, useEffect } from 'react';
import { getMessageSettings, updateMessageSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MessageControls = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        messageRequestsFrom: 'everyone',
        groupAddPermission: 'everyone'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getMessageSettings();
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
            await updateMessageSettings({ [key]: value });
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

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Message controls</h2>
            </div>

            <h3 className="text-base font-bold mb-2 mt-4">Who can send you message requests?</h3>
            <div className="flex flex-col mb-8 pl-1">
                <RadioOption
                    label="Everyone on Instagram"
                    value="everyone"
                    current={settings.messageRequestsFrom}
                    onChange={(val) => handleChange('messageRequestsFrom', val)}
                />
                <RadioOption
                    label="Your followers"
                    value="followers"
                    current={settings.messageRequestsFrom}
                    onChange={(val) => handleChange('messageRequestsFrom', val)}
                />
                <RadioOption
                    label="No one"
                    value="no_one"
                    current={settings.messageRequestsFrom}
                    onChange={(val) => handleChange('messageRequestsFrom', val)}
                />
            </div>

            <h3 className="text-base font-bold mb-2">Who can add you to groups?</h3>
            <div className="flex flex-col pl-1">
                <RadioOption
                    label="Everyone on Instagram"
                    value="everyone"
                    current={settings.groupAddPermission}
                    onChange={(val) => handleChange('groupAddPermission', val)}
                />
                <RadioOption
                    label="Only people you follow"
                    value="followers_only"
                    current={settings.groupAddPermission}
                    onChange={(val) => handleChange('groupAddPermission', val)}
                />
            </div>
        </div>
    );
};

export default MessageControls;
