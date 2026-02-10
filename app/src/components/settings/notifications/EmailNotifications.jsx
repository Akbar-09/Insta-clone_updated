import { useState, useEffect } from 'react';
import { getNotificationSettings, updateNotificationSettings } from '../../../api/notificationSettingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ToggleGroup = ({ label, description, name, checked, onChange }) => (
    <div className="py-5 border-b border-[#dbdbdb] dark:border-[#363636] flex justify-between items-start">
        <div className="mr-8">
            <h3 className="text-base font-bold mb-1">{label}</h3>
            {description && <p className="text-xs text-text-secondary leading-4">{description}</p>}
        </div>
        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
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

const EmailNotifications = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [settings, setSettings] = useState({
        feedbackEmails: true,
        reminderEmails: true,
        productEmails: true,
        newsEmails: true,
        supportEmails: true
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
        setSettings(prev => ({ ...prev, [key]: value }));
        try {
            await updateNotificationSettings({ [key]: value });
        } catch (err) {
            console.error('Update failed', err);
            setSettings(prev => ({ ...prev, [key]: !value }));
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 flex hover:bg-gray-100 dark:hover:bg-zinc-800 p-2 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold">Email notifications</h2>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

            <ToggleGroup
                label="Feedback emails"
                description="Give feedback on Jaadoe."
                name="feedbackEmails"
                checked={settings.feedbackEmails}
                onChange={handleChange}
            />

            <ToggleGroup
                label="Reminder emails"
                description="Get notifications you may have missed."
                name="reminderEmails"
                checked={settings.reminderEmails}
                onChange={handleChange}
            />

            <ToggleGroup
                label="Product emails"
                description="Get tips and tools about Jaadoe."
                name="productEmails"
                checked={settings.productEmails}
                onChange={handleChange}
            />

            <ToggleGroup
                label="News emails"
                description="Learn about new Jaadoe features."
                name="newsEmails"
                checked={settings.newsEmails}
                onChange={handleChange}
            />

            <ToggleGroup
                label="Support emails"
                description="Get updates on reports and violations of our Community Guidelines."
                name="supportEmails"
                checked={settings.supportEmails}
                onChange={handleChange}
            />

            <div className="py-5 text-sm">
                <span className="text-text-secondary">Emails about your account security and logging in are built in and you can't turn them off.</span>
            </div>
        </div>
    );
};

export default EmailNotifications;
