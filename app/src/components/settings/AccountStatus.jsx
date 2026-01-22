import { useState, useEffect } from 'react';
import { getAccountStatus } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccountStatus = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth(); // Assume user loaded in context

    useEffect(() => {
        getAccountStatus()
            .then(res => setStatus(res.data.data))
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
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Account Status</h2>
                </div>
            </div>

            <div className="flex items-center py-4 mb-6">
                <img
                    src={user?.profilePicture || '/default-avatar.png'}
                    alt={user?.username}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                    <h3 className="font-bold text-lg">{user?.username}</h3>
                    <p className="text-sm text-text-secondary">Account Status</p>
                </div>
            </div>

            <div
                onClick={() => navigate('/settings/account_status/removed_content')}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
            >
                <div className="flex items-center">
                    <img src="/icons/removed-content.svg" alt="" className="w-6 h-6 mr-3 opacity-50" onError={(e) => e.target.style.display = 'none'} /> {/* Placeholder icon */}
                    <div>
                        <span className="text-base font-medium block">Removed content</span>
                        <p className="text-xs text-text-secondary">What you posted that affected your account status.</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-text-secondary" />
            </div>

            <div
                onClick={() => navigate('/settings/account_status/features')}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
            >
                <div className="flex items-center">
                    <img src="/icons/features.svg" alt="" className="w-6 h-6 mr-3 opacity-50" onError={(e) => e.target.style.display = 'none'} />
                    <div>
                        <span className="text-base font-medium block">Features you can't use</span>
                        <p className="text-xs text-text-secondary">What you can't do right now.</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-text-secondary" />
            </div>

        </div>
    );
};

export default AccountStatus;
