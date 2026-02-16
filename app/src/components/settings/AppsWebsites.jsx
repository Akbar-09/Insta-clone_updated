import { useState, useEffect } from 'react';
import { getConnectedApps, revokeAppAccess } from '../../api/settingsApi';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppsWebsites = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');
    const [apps, setApps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getConnectedApps(activeTab)
            .then(res => setApps(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [activeTab]);

    const handleRevoke = async (id) => {
        try {
            await revokeAppAccess(id);
            setApps(prev => prev.filter(app => app.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === id ? 'border-black dark:border-white text-text-primary' : 'border-transparent text-text-secondary'}`}
        >
            {label}
        </button>
    );

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Apps and websites</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                These are apps and websites you've used Jaadoe to log into and haven't used recently. They can access details you shared.
            </p>

            <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
                <TabButton id="active" label="Active" />
                <TabButton id="expired" label="Expired" />
                <TabButton id="removed" label="Removed" />
            </div>

            {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
            ) : apps.length === 0 ? (
                <div className="text-center text-text-secondary py-10 font-medium">
                    You have no {activeTab} apps.
                </div>
            ) : (
                <div className="flex flex-col space-y-6">
                    {apps.map(app => (
                        <div key={app.id} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-base">{app.appName}</h3>
                                <p className="text-sm text-text-secondary mt-0.5">{app.accessType}</p>
                                <p className="text-xs text-text-secondary mt-1">
                                    {activeTab === 'removed' ? 'Removed' : activeTab === 'expired' ? 'Expired' : 'Connected'} on {formatDate(app.connectedAt)}
                                </p>
                            </div>
                            {activeTab === 'active' && (
                                <button
                                    onClick={() => handleRevoke(app.id)}
                                    className="bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    Remove
                                </button>
                            )}
                            {activeTab !== 'active' && (
                                <button
                                    className="text-[#0095f6] hover:text-[#00376b] text-sm font-semibold"
                                >
                                    View
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppsWebsites;
