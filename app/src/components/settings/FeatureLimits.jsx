import { useState, useEffect } from 'react';
import { getFeatureLimits } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureLimits = () => {
    const [loading, setLoading] = useState(true);
    const [limits, setLimits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFeatureLimits()
            .then(res => setLimits(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center justify-between mb-6 mt-1">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                        <ArrowLeft />
                    </button>
                    <h2 className="text-xl font-bold">Features you can't use</h2>
                </div>
                <button><Info size={24} /></button>
            </div>

            {limits.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle size={64} className="text-green-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold mb-2">You can use all features right now.</h3>
                    <p className="text-text-secondary text-sm max-w-sm">
                        Thank you for following our Community Guidelines.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {limits.map(l => (
                        <div key={l.id} className="border p-4 rounded-lg">
                            <div className="font-bold text-red-500">{l.featureName}</div>
                            <p className="text-sm">Access to this feature is currently restricted.</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeatureLimits;
