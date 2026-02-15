import { useState, useEffect } from 'react';
import { getFeatureLimits } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, Info, ChevronRight, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureLimits = () => {
    const [loading, setLoading] = useState(true);
    const [limits, setLimits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLimits = async () => {
            try {
                const res = await getFeatureLimits();
                if (res.data.status === 'success') {
                    setLimits(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch feature limits', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLimits();
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-text-secondary" /></div>;

    const noIssues = limits.length === 0;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 mt-1">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">Features you can't use</h2>
                </div>
            </div>

            {/* Status Card */}
            <div className="bg-[#f0f2f5] dark:bg-[#262626] p-8 rounded-xl flex flex-col items-center text-center mb-10">
                <div className="w-[84px] h-[84px] bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 shadow-sm border border-black/5 dark:border-white/5">
                    {noIssues ? (
                        <CheckCircle size={48} className="text-[#00c950]" strokeWidth={1} />
                    ) : (
                        <Ban size={48} className="text-[#ed4956]" strokeWidth={1} />
                    )}
                </div>
                <h3 className="text-[17px] font-bold mb-2">
                    {noIssues ? 'You can use all the features right now' : 'Access to some features is limited'}
                </h3>
                <p className="text-[14px] text-text-secondary leading-tight">
                    Thank you for following our <span className="text-[#0095f6] cursor-pointer hover:underline" onClick={() => window.open('/help', '_blank')}>Community Standards</span>.
                </p>
            </div>

            {/* Content for when there ARE issues */}
            {!noIssues && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold mb-4">Limited features</h3>
                    {limits.map(l => (
                        <div key={l.id} className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[15px] font-bold text-text-primary line-clamp-1">{l.featureName}</span>
                                <span className="text-[11px] text-[#ed4956] font-bold uppercase tracking-wider">Limited</span>
                            </div>
                            <p className="text-[14px] text-text-secondary leading-normal">
                                Access to this feature has been temporarily restricted due to community standard violations.
                            </p>
                            {l.expiresAt && (
                                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                    <span className="text-[12px] text-text-secondary">Expected restoration:</span>
                                    <span className="text-[12px] font-bold text-text-primary">
                                        {new Date(l.expiresAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Generic What this means Section (Optional, keeping consistent) */}
            <div className="mt-4 p-4">
                <p className="text-[13px] text-text-secondary leading-normal italic text-center">
                    Maintaining a safe and supportive community is our priority. If you believe this is a mistake, you can request a review in the <span className="text-[#0095f6] cursor-pointer hover:underline" onClick={() => window.open('/help', '_blank')}>Help Centre</span>.
                </p>
            </div>
        </div>
    );
};

export default FeatureLimits;
