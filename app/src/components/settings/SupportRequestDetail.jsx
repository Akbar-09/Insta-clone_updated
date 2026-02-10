import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const SupportRequestDetail = () => {
    const navigate = useNavigate();
    const { category } = useParams();

    const contentMap = {
        report: {
            title: "You haven't reported anything",
            description: "Read our Community Standards to learn what we allow on Instagram and how you can help us report and remove what we don't.",
            button: "See Community Standards"
        },
        safety: {
            title: "You don't have any safety notices",
            description: "Find resources to help you recover from a difficult experience.",
            button: "See Safety Resources"
        },
        violation: {
            title: "You don't have any violations",
            description: "These are posts you've shared that go against our guidelines.",
            button: "See Community Guidelines"
        },
        monetisation: {
            title: "You don't have any monetization support tickets",
            description: "These are monetization support tickets you've submitted.",
            button: "Visit Help Center"
        }
    };

    const content = contentMap[category] || contentMap.report;

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            {/* Main Header */}
            <div className="flex items-center mb-4 mt-1">
                <button
                    onClick={() => navigate('/settings/help/support_requests')}
                    className="flex items-center gap-2 -ml-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <ChevronLeft size={28} strokeWidth={1.5} />
                    <span className="text-xl font-bold">Help</span>
                </button>
            </div>

            {/* Sub Header Back Button */}
            <div className="py-2 border-t border-border mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <ChevronLeft size={28} strokeWidth={1.5} />
                </button>
            </div>

            <div className="h-px bg-border w-full mb-16" />

            {/* Empty State Content */}
            <div className="flex flex-col items-center text-center px-4">
                <h1 className="text-[20px] font-semibold text-text-primary mb-2">{content.title}</h1>
                <p className="text-[14px] text-text-secondary leading-[18px] max-w-[340px] mb-1">
                    {content.description}
                </p>
                <button className="text-[14px] font-semibold text-[#0095f6] hover:opacity-70 transition-opacity">
                    {content.button}
                </button>
            </div>

            {/* Footer matching Instagram's style */}
            <div className="mt-auto pt-20 pb-10 opacity-60">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] text-text-secondary mb-4">
                    {['Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms', 'Locations', 'Instagram Lite', 'Threads', 'Contact Uploading & Non-Users', 'Meta Verified'].map((link) => (
                        <span key={link} className="cursor-pointer hover:underline">{link}</span>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-4 text-[12px] text-text-secondary">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <span>English</span>
                        <ChevronLeft size={12} className="-rotate-90" />
                    </div>
                    <span>© 2024 Instagram from Meta</span>
                </div>
            </div>
        </div>
    );
};

export default SupportRequestDetail;
