import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Shield, Lock, EyeOff, UserCheck } from 'lucide-react';

const PrivacySecurityHelp = () => {
    const navigate = useNavigate();

    const sections = [
        {
            icon: Shield,
            label: 'Privacy policy',
            description: 'Learn how we collect, use and share your information.'
        },
        {
            icon: Lock,
            label: 'Security settings',
            description: 'Manage your password, two-factor authentication and more.'
        },
        {
            icon: EyeOff,
            label: 'Reporting',
            description: 'Learn how to report content that violates our standards.'
        },
        {
            icon: UserCheck,
            label: 'Verification',
            description: 'Find out if you are eligible for a verified badge.'
        }
    ];

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl mx-auto h-full pb-10">
            <div className="flex items-center mb-8 mt-1">
                <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h3 className="text-xl font-bold">Privacy and security help</h3>
            </div>

            <div className="flex flex-col space-y-4">
                {sections.map(section => (
                    <div
                        key={section.label}
                        onClick={() => {
                            if (section.label === 'Privacy policy') {
                                window.open('/help/category/privacy-settings', '_blank');
                            } else if (section.label === 'Security settings') {
                                window.open('/help/category/login-help', '_blank');
                            } else if (section.label === 'Reporting') {
                                window.open('/help/category/reporting', '_blank');
                            } else if (section.label === 'Verification') {
                                navigate('/help/category/verified-badge');
                            }
                        }}
                        className="flex items-start p-4 bg-white dark:bg-[#1c1c1c] border border-border rounded-xl shadow-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                    >
                        <div className="mt-1 p-2 bg-[#f0f2f5] dark:bg-[#262626] rounded-full mr-4">
                            <section.icon size={22} className="text-text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-bold">{section.label}</span>
                                <ChevronRight size={18} className="text-[#8e8e8e] group-hover:translate-x-1 transition-transform" />
                            </div>
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

export default PrivacySecurityHelp;
