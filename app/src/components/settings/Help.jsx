import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const Help = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Help Centre', path: '/settings/help/help_centre' },
        { label: 'Account Status', path: '/settings/account_status' },
        { label: 'Privacy and security help', path: '/settings/help/privacy_help' }, // Mock/External
        { label: 'Support requests', path: '/settings/help/support_requests' },
        // Could be a link or modal
        // { label: 'Tell us how we\'re doing', path: '/settings/help/feedback' } 
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Help</h2>
            </div>

            <div className="flex flex-col">
                {items.map(item => (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors"
                    >
                        <span className="text-base text-text-primary">{item.label}</span>
                        <ChevronRight size={20} className="text-text-secondary" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;
