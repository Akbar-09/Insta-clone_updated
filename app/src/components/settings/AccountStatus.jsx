import { useState, useEffect } from 'react';
import { getAccountStatus } from '../../api/settingsApi';
import { Loader2, ArrowLeft, CheckCircle, ChevronRight, Image as ImageIcon, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AccountStatus = () => {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await getAccountStatus();
                if (res.data.status === 'success') {
                    setStatus(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch account status', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const StatusItem = ({ icon: Icon, label, onClick, hasIssue = false }) => (
        <div
            onClick={onClick}
            className="flex items-center justify-between py-[12px] cursor-pointer group"
        >
            <div className="flex items-center">
                <Icon size={24} strokeWidth={1.2} className="mr-4 text-text-primary" />
                <span className="text-[15px] font-medium text-text-primary">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-[#00c950]" strokeWidth={2.5} />
                <ChevronRight size={20} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-text-secondary" /></div>;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto pb-10">
            <div className="flex items-center mb-10 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Account Status</h2>
            </div>

            {/* Profile Card */}
            <div className="bg-[#f0f2f5] dark:bg-[#262626] p-4 rounded-xl flex items-center mb-8">
                <img
                    src={user?.profilePicture || 'https://via.placeholder.com/150'}
                    alt={user?.username}
                    className="w-[50px] h-[50px] rounded-full object-cover mr-4 ring-1 ring-black/10 dark:ring-white/10"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-bold leading-tight">{user?.username || 'user'}</span>
                    <span className="text-sm text-text-secondary">{user?.fullName || 'Full Name'}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-text-secondary leading-normal mb-8 max-w-[550px]">
                See any actions Instagram has taken when your account or content don't follow our standards. <span className="text-[#0095f6] cursor-pointer hover:underline">Learn more about Account Status</span>
            </p>

            {/* Status List */}
            <div className="flex flex-col">
                <StatusItem
                    icon={ImageIcon}
                    label="Removed content and messaging issues"
                    onClick={() => navigate('/settings/account_status/removed_content')}
                />
                <StatusItem
                    icon={Search}
                    label="Features you can't use"
                    onClick={() => navigate('/settings/account_status/feature_limits')}
                />
            </div>
        </div>
    );
};

export default AccountStatus;
