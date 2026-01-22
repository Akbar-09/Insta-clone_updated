import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const HelpCentre = () => {
    const navigate = useNavigate();

    // In a real app these would link to external support articles or internal knowledge base
    const categories = [
        'Managing your account',
        'Using Instagram',
        'Troubleshooting and login help',
        'Privacy and safety centre',
        'For business'
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl h-full pb-10">
            <div className="flex items-center mb-6 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 md:hidden">
                    <ArrowLeft />
                </button>
                <h2 className="text-xl font-bold">Help Centre</h2>
            </div>

            <p className="text-sm text-text-secondary mb-6">
                Hi, how can we help?
            </p>

            <div className="flex flex-col">
                {categories.map(cat => (
                    <div
                        key={cat}
                        className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors border-b border-gray-100 dark:border-gray-800"
                    >
                        <span className="text-base text-text-primary font-medium">{cat}</span>
                        <ChevronRight size={20} className="text-text-secondary" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpCentre;
