import { useState, useEffect } from 'react';
import { getGeneralSettings, updateGeneralSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArchivingDownloading = () => {
    const [loading, setLoading] = useState(true);
    const [saveToArchive, setSaveToArchive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getGeneralSettings()
            .then(res => setSaveToArchive(res.data.data.saveStoryToArchive))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = () => {
        const val = !saveToArchive;
        setSaveToArchive(val);
        updateGeneralSettings({ saveStoryToArchive: val }).catch(() => setSaveToArchive(!val));
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Archiving and downloading</h2>
            </div>

            <h3 className="font-bold mb-4">Saving to archive</h3>

            <div className="flex items-start justify-between mb-4">
                <div className="mr-4">
                    <span className="text-base font-medium block">Save story to archive</span>
                    <p className="text-xs text-text-secondary mt-1">Automatically save your story to your archive so you don't have to save it to your phone. Only you can see your archive.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                        type="checkbox"
                        checked={saveToArchive}
                        onChange={handleChange}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                </label>
            </div>
        </div>
    );
};

export default ArchivingDownloading;
