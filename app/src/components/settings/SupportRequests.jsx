import { useState, useEffect } from 'react';
import { getSupportRequests } from '../../api/settingsApi';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportRequests = () => {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSupportRequests()
            .then(res => setRequests(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Helper to count by category
    const getCount = (cat) => requests.filter(r => r.category === cat).length;

    const items = [
        { label: 'Reports', category: 'report' },
        { label: 'Violations', category: 'violation' },
        { label: 'Monetisation Support', category: 'monetisation' },
    ];

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Support requests</h2>
            </div>

            <div className="flex flex-col">
                {items.map(item => (
                    <div
                        key={item.category}
                        // onClick={() => navigate(`/settings/help/reports/${item.category}`)} // Routing to list not fully requested but structure implies it
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <span className="text-base text-text-primary">{item.label}</span>
                        </div>
                        <div className="flex items-center">
                            {getCount(item.category) > 0 && (
                                <span className="text-xs text-green-500 font-semibold mr-3">{getCount(item.category)} updates</span>
                            )}
                            <ChevronRight size={20} className="text-text-secondary" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportRequests;
