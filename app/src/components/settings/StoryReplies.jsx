import { useState, useEffect } from 'react';
import { getStorySettings, updateStorySettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoryReplies = () => {
    const [loading, setLoading] = useState(true);
    const [replySetting, setReplySetting] = useState('everyone');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStorySettings();
                if (res.data.status === 'success') {
                    setReplySetting(res.data.data.storyReplies);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = async (val) => {
        const oldVal = replySetting;
        setReplySetting(val);

        try {
            await updateStorySettings({ storyReplies: val });
        } catch (err) {
            console.error('Update failed', err);
            setReplySetting(oldVal);
        }
    };

    const RadioOption = ({ label, value }) => (
        <label className="flex items-center justify-between py-3 cursor-pointer">
            <span className="text-base text-text-primary">{label}</span>
            <input
                type="radio"
                className="custom-radio"
                checked={replySetting === value}
                onChange={() => handleChange(value)}
            />
        </label>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-2 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Story replies</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">Choose who can reply to your stories.</p>

            <div className="flex flex-col pl-1">
                <RadioOption label="Everyone" value="everyone" />
                <RadioOption label="People you follow" value="followers" />
                <RadioOption label="Off" value="off" />
            </div>
        </div>
    );
};

export default StoryReplies;
