import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const Help = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Help Center', path: '/settings/help/help_centre' },
        { label: 'Account status', path: '/settings/account_status' },
        { label: 'Privacy and security help', path: '/settings/help/privacy_help' },
        { label: 'Support requests', path: '/settings/help/support_requests' },
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Help</h2>
            </div>

            <div className="flex flex-col space-y-1">
                {items.map(item => (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="flex items-center justify-between py-[12px] px-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                    >
                        <span className="text-[15px] font-medium text-text-primary">{item.label}</span>
                        <ChevronRight size={20} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                    </div>
                ))}

                {/* Tell us how we're doing */}
                <div
                    onClick={() => navigate('/settings/help/feedback')}
                    className="flex flex-col py-[12px] px-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors group"
                >
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[15px] font-medium text-text-primary">Tell us how we're doing</span>
                        <ChevronRight size={20} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[12px] text-text-secondary mt-0.5 leading-normal max-w-[450px]">
                        How satisfied or dissatisfied are you with the help you received for this issue?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Help;
