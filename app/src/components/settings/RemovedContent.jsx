import { useState, useEffect } from 'react';
import { getViolations } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, Info, ChevronRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RemovedContent = () => {
    const [loading, setLoading] = useState(true);
    const [violations, setViolations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchViolations = async () => {
            try {
                const res = await getViolations();
                if (res.data.status === 'success') {
                    setViolations(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch violations', err);
            } finally {
                setLoading(false);
            }
        };
        fetchViolations();
    }, []);

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-text-secondary" /></div>;

    const noIssues = violations.length === 0;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 mt-1">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">Removed content and messaging issues</h2>
                </div>
                <button className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                    <Info size={24} className="text-text-primary" />
                </button>
            </div>

            {/* Status Card */}
            <div className="bg-[#f0f2f5] dark:bg-[#262626] p-8 rounded-xl flex flex-col items-center text-center mb-10">
                <div className="w-[84px] h-[84px] bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 shadow-sm border border-black/5 dark:border-white/5">
                    {noIssues ? (
                        <CheckCircle size={48} className="text-[#00c950]" strokeWidth={1} />
                    ) : (
                        <ShieldCheck size={48} className="text-[#ed4956]" strokeWidth={1} />
                    )}
                </div>
                <h3 className="text-[17px] font-bold mb-2">
                    {noIssues ? 'Your account is not affected right now' : 'Your account may be affected'}
                </h3>
                <p className="text-[14px] text-text-secondary leading-tight">
                    Thank you for following our <span className="text-[#0095f6] cursor-pointer hover:underline">Community Standards</span>.
                </p>
            </div>

            {/* What this means Section */}
            <div className="mb-10">
                <h3 className="text-base font-bold mb-4">What this means</h3>
                <p className="text-[14px] text-text-secondary mb-4 leading-normal">
                    You are not at risk of losing access to your account right now.
                </p>
                <p className="text-[14px] text-text-secondary leading-normal">
                    We may still take down your account without warning if something you post is a risk to the Instagram community.
                </p>
            </div>

            {/* More Information Section */}
            <div className="mb-10 pt-4 border-t border-border">
                <h3 className="text-base font-bold mb-4">More information</h3>
                <div
                    onClick={() => { }} // Navigate to guidelines or help center
                    className="flex items-center justify-between py-2 cursor-pointer group"
                >
                    <div className="flex items-center">
                        <ShieldCheck size={24} strokeWidth={1.5} className="mr-3 text-text-primary" />
                        <span className="text-[15px] font-medium">Learn about our Community Standards</span>
                    </div>
                    <ChevronRight size={20} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* List specific violations if any */}
            {!noIssues && (
                <div className="mt-8 space-y-4">
                    <h3 className="text-base font-bold mb-2">Specific Issues</h3>
                    {violations.map(v => (
                        <div key={v.id} className="bg-white dark:bg-[#1c1c1c] border border-border rounded-xl p-4 shadow-sm">
                            <div className="font-bold text-[#ed4956] mb-1">{v.type}</div>
                            <p className="text-sm text-text-primary mb-2">{v.description}</p>
                            <div className="text-[11px] text-text-secondary uppercase font-semibold">
                                {new Date(v.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RemovedContent;
