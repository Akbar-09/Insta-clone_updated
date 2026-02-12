import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Bookmark, HelpCircle, AlertTriangle } from 'lucide-react';

const HelpCentre = () => {
    const navigate = useNavigate();

    const sections = [
        {
            icon: HelpCircle,
            label: 'Report a Problem',
            description: 'Let us know about a broken feature or content that shouldn\'t be here.'
        },
        {
            icon: Bookmark,
            label: 'Help Center',
            description: 'Find answers, learn more about features, and get support.'
        },
        {
            icon: AlertTriangle,
            label: 'Privacy and Security Help',
            description: 'Learn how to keep your account safe and manage your privacy.'
        }
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Help Center</h2>
            </div>

            {/* Search Bar Placeholder */}
            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-white dark:bg-[#1c1c1c] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0095f6] focus:border-[#0095f6] sm:text-sm"
                    placeholder="How can we help?"
                />
            </div>

            <div className="flex flex-col space-y-4">
                {sections.map(section => (
                    <div
                        key={section.label}
                        onClick={() => {
                            if (section.label === 'Help Center') {
                                window.open('/help', '_blank');
                            }
                        }}
                        className="flex items-start p-4 bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <div className="mt-1 p-2 bg-[#f0f2f5] dark:bg-[#262626] rounded-full mr-4">
                            <section.icon size={22} className="text-text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[15px] font-bold">{section.label}</h3>
                            <p className="text-[13px] text-text-secondary mt-1 leading-normal">
                                {section.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCentre;
