import { useState, useEffect } from 'react';
import { getTagsMentionsSettings, updateTagsMentionsSettings } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManuallyApproveTags = () => {
    const [loading, setLoading] = useState(true);
    const [manualTagApproval, setManualTagApproval] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getTagsMentionsSettings();
                if (res.data.status === 'success') {
                    setManualTagApproval(res.data.data.manualTagApproval);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleToggle = async () => {
        const newState = !manualTagApproval;
        setManualTagApproval(newState); // Optimistic Update

        try {
            await updateTagsMentionsSettings({ manualTagApproval: newState });
        } catch (err) {
            console.error('Update failed', err);
            setManualTagApproval(!newState); // Revert
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Manually approve tags</h2>
            </div>

            <div className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium block mb-1">Tag options</span>
                        <p className="text-[12px] text-text-secondary">Manually approve tags</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            type="checkbox"
                            checked={manualTagApproval}
                            onChange={handleToggle}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white transition-colors duration-200"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ManuallyApproveTags;
