import { DollarSign, ShieldCheck, Star, Users } from 'lucide-react';

const CreatorTools = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Creator tools and controls</h2>

            <div className="mb-8">
                <h3 className="text-text-secondary font-bold text-xs uppercase tracking-wide mb-4">Monetization</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <DollarSign size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Monetization Status</div>
                                <div className="text-sm text-text-secondary">You are eligible for monetization</div>
                            </div>
                        </div>
                        <div className="text-blue-500 text-sm font-semibold cursor-pointer">View</div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-xl opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                <Star size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-base">Bonuses</div>
                                <div className="text-sm text-text-secondary">Coming soon</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-text-secondary font-bold text-xs uppercase tracking-wide mb-4">Content & Safety</h3>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between py-4 cursor-pointer hover:opacity-70 border-b border-border">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={22} className="text-text-primary" />
                            <span className="text-base">Branded Content</span>
                        </div>
                        <div className="text-xs text-text-secondary">Status: Eligible</div>
                    </div>
                    <div className="flex items-center justify-between py-4 cursor-pointer hover:opacity-70 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Users size={22} className="text-text-primary" />
                            <span className="text-base">Minimum Age</span>
                        </div>
                        <div className="text-xs text-text-secondary">Default</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorTools;
