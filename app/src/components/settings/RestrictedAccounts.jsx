import { AlertCircle, UserX } from 'lucide-react';

const RestrictedAccounts = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Restricted Accounts</h2>

            <div className="bg-[#EFEFEF] dark:bg-[#262626] p-6 rounded-xl flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <UserX size={28} className="text-text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Protect yourself from unwanted interactions</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-[400px]">
                    Restricting someone limits what they can see and do on your posts, without blocking them. They won't know you've restricted them.
                </p>
                <button className="text-blue-500 font-bold hover:text-text-primary transition-colors mb-4">
                    Learn more about restricting
                </button>
            </div>

            <div className="mb-6">
                <h3 className="text-base font-bold mb-4">Search</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#EFEFEF] dark:bg-[#262626] rounded-xl px-4 py-3 pl-10 focus:outline-none"
                    />
                    <div className="absolute left-3 top-3.5 text-text-secondary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </div>
            </div>

            {/* Empty State / List */}
            <div className="flex flex-col items-center justify-center py-20 text-text-secondary opacity-60">
                <p>You haven't restricted anyone yet.</p>
            </div>
        </div>
    );
};

export default RestrictedAccounts;
