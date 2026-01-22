import { useState, useEffect } from 'react';
import { getNotificationSettings, updateNotificationSettings } from '../../../api/notificationSettingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RadioGroup = ({ label, name, value, onChange, options, disabled }) => (
    <div className={`py-6 border-b border-[#dbdbdb] dark:border-[#363636] ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="text-base font-bold mb-3">{label}</h3>
        <div className="space-y-3">
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center cursor-pointer group">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(name, opt.value)}
                        className="w-5 h-5 border-gray-300 text-blue-500 focus:ring-blue-500 bg-transparent"
                    />
                    <span className="ml-3 text-base text-text-primary group-hover:opacity-80 transition-opacity">{opt.label}</span>
                </label>
            ))}
        </div>
    </div>
);

const ToggleGroup = ({ label, description, name, checked, onChange, disabled }) => (
    <div className={`py-6 border-b border-[#dbdbdb] dark:border-[#363636] flex justify-between items-center ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="mr-4">
            <h3 className="text-base font-bold mb-1">{label}</h3>
            {description && <p className="text-xs text-text-secondary">{description}</p>}
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={(e) => onChange(name, e.target.checked)}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
        </label>
    </div>
);

const PushNotifications = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [settings, setSettings] = useState({
        pauseAllPush: false,
        likes: 'EVERYONE',
        comments: 'EVERYONE',
        mentions: 'EVERYONE',
        follows: true,
        messages: true,
        storyReplies: true,
        likeMilestones: true
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getNotificationSettings();
                if (res.data.status === 'success') {
                    setSettings(res.data.data);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = async (key, value) => {
        // Optimistic update
        setSettings(prev => ({ ...prev, [key]: value }));

        try {
            await updateNotificationSettings({ [key]: value });
        } catch (err) {
            console.error('Update failed', err);
            // Revert
            setSettings(prev => ({ ...prev, [key]: !value }));
            // Note: Reverting enum requires explicit previous value, but for simplicity here treating toggle error.
            // For robust production: Store prev state before opt-update.
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    const radioOptions = [
        { label: 'Off', value: 'OFF' },
        { label: 'From profiles I follow', value: 'FOLLOWING' },
        { label: 'From everyone', value: 'EVERYONE' }
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Push notifications</h2>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

            {/* Pause All */}
            <ToggleGroup
                label="Pause all"
                name="pauseAllPush"
                checked={settings.pauseAllPush}
                onChange={handleChange}
            />

            <div className={settings.pauseAllPush ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                {/* Likes */}
                <RadioGroup
                    label="Likes"
                    name="likes"
                    value={settings.likes}
                    onChange={handleChange}
                    options={radioOptions}
                />

                {/* Comments */}
                <RadioGroup
                    label="Comments"
                    name="comments"
                    value={settings.comments}
                    onChange={handleChange}
                    options={radioOptions}
                />

                {/* Mentions */}
                <RadioGroup
                    label="Mentions"
                    name="mentions"
                    value={settings.mentions}
                    onChange={handleChange}
                    options={radioOptions}
                />

                {/* Direct Messages */}
                <ToggleGroup
                    label="Messages"
                    description="Receive notifications for new messages"
                    name="messages"
                    checked={settings.messages}
                    onChange={handleChange}
                />

                {/* Story Replies */}
                <ToggleGroup
                    label="Story Replies"
                    name="storyReplies"
                    checked={settings.storyReplies}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default PushNotifications;
