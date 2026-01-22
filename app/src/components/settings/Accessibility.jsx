import { useState, useEffect } from 'react';
import { getGeneralSettings, updateGeneralSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Accessibility = () => {
    const [loading, setLoading] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getGeneralSettings()
            .then(res => setReduceMotion(res.data.data.reduceMotion))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = () => {
        const val = !reduceMotion;
        setReduceMotion(val);
        updateGeneralSettings({ reduceMotion: val }).catch(() => setReduceMotion(!val));
        // Apply globally if using a context or document class
        if (val) document.documentElement.classList.add('reduce-motion');
        else document.documentElement.classList.remove('reduce-motion');
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Accessibility</h2>
            </div>

            <h3 className="font-bold mb-4">Motion</h3>

            <div className="flex items-start justify-between mb-4">
                <div className="mr-4">
                    <span className="text-base font-medium block">Reduce motion</span>
                    <p className="text-xs text-text-secondary mt-1">Reduce visual motion, such as animations when opening or closing a window.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                        type="checkbox"
                        checked={reduceMotion}
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>
        </div>
    );
};

export default Accessibility;
