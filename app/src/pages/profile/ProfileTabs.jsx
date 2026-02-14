import { Grid, Bookmark, UserSquare2, Clapperboard } from 'lucide-react';

const ProfileTabs = ({ activeTab, setActiveTab, isOwnProfile }) => {
    const tabs = [
        { id: 'posts', label: 'POSTS', icon: Grid },
        ...(!isOwnProfile ? [{ id: 'reels', label: 'REELS', icon: Clapperboard }] : []),
        ...(isOwnProfile ? [{ id: 'saved', label: 'SAVED', icon: Bookmark }] : []),
        { id: 'tagged', label: 'TAGGED', icon: UserSquare2 },
    ];

    return (
        <div className="border-t border-border flex justify-center uppercase tracking-[1px] text-xs font-semibold">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 h-[52px] -mt-px px-0 mx-4 md:mx-8 cursor-pointer transition-colors ${activeTab === tab.id
                        ? 'border-t border-text-primary text-text-primary'
                        : 'text-text-secondary border-t border-transparent hover:text-text-primary'
                        }`}
                >
                    <tab.icon size={12} strokeWidth={activeTab === tab.id ? 3 : 2} />
                    <span>{tab.label}</span>
                </div>
            ))}
        </div>
    );
};

export default ProfileTabs;
