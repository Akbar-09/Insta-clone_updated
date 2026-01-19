import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, action }) => (
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {action && (
            <button className="text-sm font-semibold text-blue-btn hover:text-blue-btn-hover transition-colors">
                {action}
            </button>
        )}
    </div>
);

export const InsightCard = ({ title, value, subtext, icon: Icon }) => (
    <div className="flex flex-col bg-white dark:bg-black border border-border dark:border-[#262626] rounded-xl p-4 flex-1 min-w-[200px] cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary font-medium">{title}</span>
            {Icon && <Icon size={16} className="text-text-secondary" />}
        </div>
        <div className="mb-1">
            <span className="text-xl font-bold text-text-primary block">{value}</span>
        </div>
        <div className="text-xs text-text-secondary">
            {subtext}
        </div>
    </div>
);

export const ToolItem = ({ icon: Icon, title, subtitle, isNew, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
        <div className="flex items-center">
            {Icon && (
                <div className="mr-4 text-text-primary">
                    <Icon size={24} strokeWidth={1.5} />
                </div>
            )}
            <div className="flex flex-col">
                <div className="flex items-center">
                    <span className="text-base font-medium text-text-primary mr-2">{title}</span>
                    {isNew && (
                        <span className="bg-blue-btn text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px]">NEW</span>
                    )}
                </div>
                {subtitle && <span className="text-sm text-text-secondary">{subtitle}</span>}
            </div>
        </div>
        <ChevronRight size={20} className="text-text-secondary" />
    </div>
);

export const MonetizationCard = () => (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-black border border-border dark:border-[#262626] rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors mb-6">
        <div className="flex flex-col">
            <h3 className="text-base font-medium text-text-primary mb-1">Your tools</h3>
            <span className="text-sm text-text-secondary">1 eligible</span>
        </div>
        <div className="flex items-center">
            <span className="text-sm font-semibold text-blue-btn mr-1">Brand content</span>
            <div className="w-2 h-2 bg-red-500 rounded-full ml-1"></div>
        </div>
    </div>
);

export const AdToolsCard = () => (
    <div className="flex flex-col bg-white dark:bg-black border border-border dark:border-[#262626] rounded-xl p-4 mb-6">
        <h3 className="text-base font-bold text-text-primary mb-1">Ad tools</h3>
        <p className="text-sm text-text-secondary mb-4">Grow your business by promoting your content.</p>
        <button className="bg-secondary hover:bg-[#e0e0e0] dark:bg-[#363636] dark:hover:bg-[#464646] text-text-primary text-sm font-semibold py-2 px-4 rounded-lg self-start transition-colors">
            Create ad
        </button>
    </div>
);
