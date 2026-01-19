import { Users } from 'lucide-react';

const FamilyCentre = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Family Centre</h2>

            <div className="bg-[#EFEFEF] dark:bg-[#262626] p-6 rounded-xl flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Users size={28} className="text-text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Supervision on Jaadoe</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-[400px]">
                    You can supervise your teen's account to help them have a safe and positive experience on Jaadoe. They'll need to agree to be supervised.
                </p>
                <button className="bg-blue-btn hover:bg-[#1877f2] text-white px-6 py-2 rounded-lg font-semibold transition-colors mb-2">
                    Create invitation
                </button>
                <button className="text-blue-500 font-bold hover:text-text-primary transition-colors mt-4 text-sm">
                    Learn more in Family Centre
                </button>
            </div>
        </div>
    );
};

export default FamilyCentre;
