import { useState, useEffect } from 'react';
import { getActivitySettings, updateActivitySettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActivityStatus = () => {
    const [loading, setLoading] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getActivitySettings();
                if (res.data.status === 'success') {
                    setShowStatus(res.data.data.showActivityStatus);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggle = async () => {
        const newVal = !showStatus;
        setShowStatus(newVal);

        try {
            await updateActivitySettings({ showActivityStatus: newVal });
        } catch (err) {
            console.error('Update failed', err);
            setShowStatus(!newVal);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Activity Status</h2>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium">Show Activity Status</span>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                        type="checkbox"
                        checked={showStatus}
                        onChange={handleToggle}
                        className="sr-only peer"
                    />
                    <div className="toggle-pill"></div>
                </label>
            </div>

            <p className="text-xs text-text-secondary leading-4 mb-4">
                Allow accounts you follow and anyone you message to see when you were last active or are currently active on Instagram apps. When this is turned off, you won't be able to see the activity status of other accounts.
            </p>
        </div>
    );
};

export default ActivityStatus;
