import { useState, useEffect } from 'react';
import { getLikeShareSettings, updateLikeShareSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LikeCounts = () => {
    const [loading, setLoading] = useState(true);
    const [hideCounts, setHideCounts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getLikeShareSettings()
            .then(res => setHideCounts(res.data.data.hideLikeShareCounts))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = () => {
        const val = !hideCounts;
        setHideCounts(val);
        updateLikeShareSettings({ hideLikeShareCounts: val }).catch(() => setHideCounts(!val));
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Like and share counts</h2>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium">Hide like and share counts</span>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                        type="checkbox"
                        checked={hideCounts}
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>

            <p className="text-xs text-text-secondary leading-4">
                On Instagram, the number of likes on posts and reels from other accounts will be hidden. You can hide the number of likes on your own posts and reels by going to Advanced settings before sharing.
            </p>
        </div>
    );
};

export default LikeCounts;
