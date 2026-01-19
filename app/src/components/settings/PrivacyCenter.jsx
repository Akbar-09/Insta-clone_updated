import { Shield, ExternalLink } from 'lucide-react';

const PrivacyCenter = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Privacy Centre</h2>

            <p className="text-sm text-text-secondary mb-8">
                Control your privacy settings and learn more about how we use your information.
            </p>

            <div className="bg-[#EFEFEF] dark:bg-[#262626] p-6 rounded-xl mb-6 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                        <Shield size={24} className="text-text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Privacy Centre</h3>
                        <p className="text-sm text-text-secondary mb-4">
                            Get more information about our privacy policy and learn how to manage your privacy settings.
                        </p>
                        <div className="flex items-center text-blue-500 font-semibold text-sm">
                            <span>Visit Privacy Centre</span>
                            <ExternalLink size={14} className="ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyCenter;
