import { ShieldCheck, AlertTriangle } from 'lucide-react';

const AccountStatus = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-2">Account Status</h2>
            <p className="text-sm text-text-secondary mb-8">
                See if you have posted something that shouldn't be on Jaadoe, know what to do if your content is removed or discover if your account could be taken down.
            </p>

            <div className="flex flex-col gap-2">
                <div className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-base">Removed content</div>
                        <div className="text-sm text-text-secondary">
                            See content that was removed from your account.
                        </div>
                    </div>
                    <div className="w-5 h-5 text-gray-400 rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                <div className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-base">What can't be recommended</div>
                        <div className="text-sm text-text-secondary">
                            See if your content may be eligible for recommendation.
                        </div>
                    </div>
                    <div className="w-5 h-5 text-gray-400 rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                <div className="flex items-center p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="mr-4">
                        <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-text-secondary">J</div>
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-base">Monetisation</div>
                        <div className="text-sm text-text-secondary">
                            See if your account is eligible for monetization tools.
                        </div>
                    </div>
                    <div className="w-5 h-5 text-gray-400 rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">Good news:</span> You haven't posted anything that is affecting your account status.
            </div>
        </div>
    );
};

export default AccountStatus;
