import { BarChart2, Briefcase, RefreshCw } from 'lucide-react';

const ProfessionalAccount = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Professional Account</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-base font-bold">Account Type</h3>
                        <p className="text-sm text-text-secondary">Creator</p>
                    </div>
                </div>
                <div className="bg-[#EFEFEF] dark:bg-[#262626] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <RefreshCw size={20} />
                        <span className="font-semibold text-sm">Switch Account Type</span>
                    </div>
                    <span className="text-xs text-blue-500 font-bold">Change</span>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Professional Dashboard</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-text-secondary">
                            <BarChart2 size={18} />
                            <span className="text-xs font-semibold">Accounts reached</span>
                        </div>
                        <div className="text-2xl font-bold">12.4K</div>
                        <div className="text-xs text-green-500 font-semibold mt-1">+14% vs last 30 days</div>
                    </div>
                    <div className="border border-border rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-2 text-text-secondary">
                            <Briefcase size={18} />
                            <span className="text-xs font-semibold">Engagement</span>
                        </div>
                        <div className="text-2xl font-bold">8.2K</div>
                        <div className="text-xs text-green-500 font-semibold mt-1">+5% vs last 30 days</div>
                    </div>
                </div>
                <button className="w-full mt-4 text-sm text-blue-500 font-semibold hover:text-text-primary transition-colors text-left">
                    View all insights
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-base font-bold mb-2">Tools</h3>
                <div className="flex flex-col gap-1">
                    {['Ad Tools', 'Branded Content', 'Saved Replies', 'Links'].map((item) => (
                        <div key={item} className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer flex justify-between items-center -mx-3">
                            <span className="text-base">{item}</span>
                            <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfessionalAccount;
