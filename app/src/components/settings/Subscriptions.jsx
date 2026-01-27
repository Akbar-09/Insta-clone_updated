import { useState, useEffect } from 'react';
import { getSubscriptions } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
    const [loading, setLoading] = useState(true);
    const [subs, setSubs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSubscriptions()
            .then(res => setSubs(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Subscriptions</h2>
            </div>

            {subs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-text-primary flex items-center justify-center mb-4">
                        <CreditCard size={48} strokeWidth={1} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No subscriptions</h3>
                    <p className="text-text-secondary">You don't have any active subscriptions.</p>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {/* Placeholder for list */}
                    {subs.map(sub => (
                        <div key={sub.id} className="p-4 border rounded">
                            Subscription ID: {sub.id}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
