import {
    Settings, ChevronDown, BarChart2, Zap, MessageSquare,
    CreditCard, Award, Layout, Megaphone, Users
} from 'lucide-react';
import {
    InsightCard, ToolItem, SectionHeader, MonetizationCard, AdToolsCard
} from '../components/dashboard/DashboardComponents';

const Dashboard = () => {
    return (
        <div className="w-full max-w-[935px] mx-auto py-8 px-5 lg:px-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-1">Professional dashboard</h1>
                    <p className="text-sm text-text-secondary">Tools and resources to grow your account</p>
                </div>
                <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                    <Settings size={24} className="text-text-primary" />
                </button>
            </div>

            {/* Insights Section */}
            <div className="mb-10">
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 no-scrollbar">
                    <InsightCard
                        title="Accounts reached"
                        value="12.5K"
                        subtext="+15% vs last 30 days"
                    />
                    <InsightCard
                        title="Accounts engaged"
                        value="3.2K"
                        subtext="+4.5% vs last 30 days"
                    />
                    <InsightCard
                        title="Total followers"
                        value="5,432"
                        subtext="+120 vs last 30 days"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
                {/* Left Column: Tools & Monetization */}
                <div>
                    <SectionHeader title="Your tools" action="See all" />

                    <MonetizationCard />
                    <AdToolsCard />

                    <div className="bg-white dark:bg-black border border-border dark:border-[#262626] rounded-xl overflow-hidden mb-8">
                        <ToolItem
                            icon={Award}
                            title="Branded content"
                            subtitle="Manage your paid partnerships"
                            isNew={true}
                        />
                        <div className="h-[1px] bg-border dark:bg-[#262626] mx-4" />
                        <ToolItem
                            icon={Users}
                            title="Affiliate"
                            subtitle="Earn commission by tagging products"
                        />
                        <div className="h-[1px] bg-border dark:bg-[#262626] mx-4" />
                        <ToolItem
                            icon={MessageSquare}
                            title="Saved replies"
                            subtitle="Create shortcuts for common responses"
                        />
                    </div>
                </div>

                {/* Right Column: Tips & Resources (Simulated as Promotions/Other for layout balance) */}
                <div>
                    <SectionHeader title="Promotions" />
                    <div className="bg-white dark:bg-black border border-border dark:border-[#262626] rounded-xl p-6 text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                            <Megaphone size={32} className="text-text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-text-primary mb-2">No active promotions</h3>
                        <p className="text-sm text-text-secondary mb-6">Boost a post to reach more people and grow your audience.</p>
                        <button className="text-blue-btn font-semibold text-sm hover:text-blue-btn-hover">
                            Create promotion
                        </button>
                    </div>

                    <h3 className="font-bold text-text-secondary text-sm mb-4 uppercase tracking-wide">More Resources</h3>
                    <div className="space-y-4">
                        <div className="flex items-start cursor-pointer hover:opacity-70 transition-opacity">
                            <div className="mr-3 mt-1"><Zap size={20} className="text-text-primary" /></div>
                            <div>
                                <div className="text-sm font-semibold text-text-primary">Inspiration</div>
                                <div className="text-xs text-text-secondary">See what other businesses are doing</div>
                            </div>
                        </div>
                        <div className="flex items-start cursor-pointer hover:opacity-70 transition-opacity">
                            <div className="mr-3 mt-1"><Layout size={20} className="text-text-primary" /></div>
                            <div>
                                <div className="text-sm font-semibold text-text-primary">Guides</div>
                                <div className="text-xs text-text-secondary">Learn how to get the most out of Jaadoe</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
