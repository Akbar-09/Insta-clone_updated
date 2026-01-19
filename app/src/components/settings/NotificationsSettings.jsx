import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const NotificationsSettings = () => {
    const [pauseAll, setPauseAll] = useState(false);

    const NotificationItem = ({ label }) => (
        <div className="flex items-center justify-between py-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
            <span className="text-base text-text-primary">{label}</span>
            <ChevronRight size={20} className="text-text-secondary" />
        </div>
    );

    return (
        <div className="flex flex-col w-full text-text-primary">
            <h2 className="text-xl font-bold mb-8 mt-1">Push notifications</h2>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium">Pause all</span>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                            type="checkbox"
                            checked={pauseAll}
                            onChange={() => setPauseAll(!pauseAll)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#dbdbdb] dark:bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="flex flex-col">
                <NotificationItem label="Quiet mode" />
                <NotificationItem label="Post, stories and comments" />
                <NotificationItem label="Following and followers" />
                <NotificationItem label="Messages" />
                <NotificationItem label="Calls" />
                <NotificationItem label="Live and reels" />
                <NotificationItem label="Fundraisers" />
                <NotificationItem label="From Jaadoe" />
                <NotificationItem label="Birthdays" />
                <NotificationItem label="Shopping" />
            </div>

            <div className="mt-8 pt-8 border-t border-[#dbdbdb] dark:border-[#363636]">
                <h3 className="font-bold text-base mb-4">Email notifications</h3>
                <NotificationItem label="Email notifications" />
            </div>
        </div>
    );
};

export default NotificationsSettings;
