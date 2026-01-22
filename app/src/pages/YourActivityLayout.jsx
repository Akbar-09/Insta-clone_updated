import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    ArrowLeftRight, Image, Timer, Download
} from 'lucide-react';

const YourActivityLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    const MenuLink = ({ to, icon: Icon, label, subtitle, active }) => (
        <Link
            to={to}
            className={`flex items-start px-5 py-4 hover:bg-black/5 dark:hover:bg-white/10 transition-colors 
                ${active ? 'border-l-2 border-black dark:border-white' : 'border-l-2 border-transparent'}`}
        >
            <Icon size={24} className={`mr-4 shrink-0 mt-0.5 ${active ? 'text-black dark:text-white' : 'text-black dark:text-white'}`} strokeWidth={1.5} />
            <div className="flex flex-col">
                <span className={`text-base text-text-primary leading-5 mb-1 ${active ? 'font-medium' : 'font-normal'}`}>{label}</span>
                {subtitle && <span className="text-xs text-text-secondary leading-4">{subtitle}</span>}
            </div>
        </Link>
    );

    return (
        <div className="flex w-full min-h-screen bg-primary">
            {/* Sidebar */}
            <div className="w-[315px] border-r border-border h-full overflow-y-auto hidden md:flex flex-col pt-9 pb-10 flex-shrink-0 sticky top-0">
                <div className="px-5 mb-4">
                    <h2 className="text-xl font-bold px-2 text-text-primary">Your activity</h2>
                </div>

                <div className="flex flex-col">
                    <MenuLink
                        to="/your_activity/interactions"
                        icon={ArrowLeftRight}
                        label="Interactions"
                        subtitle="Review and delete likes, comments and your other interactions"
                        active={isActive('/interactions')}
                    />
                    <MenuLink
                        to="/your_activity/photos_and_videos"
                        icon={Image}
                        label="Photos and videos"
                        subtitle="View, archive or delete photos and videos you've shared"
                        active={isActive('/photos_and_videos')}
                    />
                    <MenuLink
                        to="/your_activity/account_history"
                        icon={Timer}
                        label="Account history"
                        subtitle="Review changes that you've made to your account since you created it"
                        active={isActive('/account_history')}
                    />
                    {/* <MenuLink
                        to="#"
                        icon={Download}
                        label="Download your information"
                        subtitle="Download a copy of your information to keep, or to transfer to another service"
                    /> */}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 bg-primary">
                <Outlet />
            </div>
        </div>
    );
};

export default YourActivityLayout;
