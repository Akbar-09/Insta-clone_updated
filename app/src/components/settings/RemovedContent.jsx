import { useState, useEffect } from 'react';
import { getViolations } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RemovedContent = () => {
    const [loading, setLoading] = useState(true);
    const [violations, setViolations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getViolations()
            .then(res => setViolations(res.data.data))
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
                    <h2 className="text-xl font-bold">Removed content</h2>
                </div>
                <button><Info size={24} /></button>
            </div>

            {violations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle size={64} className="text-green-500 mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold mb-2">You haven't posted anything that is affecting your account status right now.</h3>
                    <p className="text-text-secondary text-sm max-w-sm">
                        Thank you for following our Community Guidelines.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {violations.map(v => (
                        <div key={v.id} className="border p-4 rounded-lg">
                            <div className="font-bold text-red-500">{v.type}</div>
                            <p className="text-sm">{v.description}</p>
                            <div className="text-xs text-text-secondary mt-2">{new Date(v.createdAt).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RemovedContent;
