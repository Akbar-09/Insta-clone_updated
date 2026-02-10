import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    User, Bell, Lock, Star, AlertCircle, MessageCircle,
    AtSign, MessageSquare, Repeat, Shield, VolumeX, EyeOff,
    Heart, CreditCard, Monitor, Type, Globe, MousePointerClick,
    Users, HelpCircle, HardDrive, Share2, Info, BookOpen,
    LayoutGrid, UserPlus, FileText, Ban, ChevronDown, Menu, X
} from 'lucide-react';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

import { useState } from 'react';

const SettingsLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { pathname } = location;

    // Helper to get current page title for mobile header
    const getPageTitle = () => {
        if (pathname.includes('edit-profile')) return 'Edit profile';
        if (pathname.includes('notifications')) return 'Notifications';
        if (pathname.includes('professional_account')) return 'Professional Account';
        if (pathname.includes('creator_tools')) return 'Creator tools';
        if (pathname.includes('privacy')) return 'Account privacy';
        if (pathname.includes('close_friends')) return 'Close Friends';
        if (pathname.includes('blocked')) return 'Blocked';
        if (pathname.includes('story_highlights')) return 'Story and live';
        if (pathname.includes('messages_replies')) return 'Messages and replies';
        if (pathname.includes('tags_mentions')) return 'Tags and mentions';
        if (pathname.includes('manually_approve_tags')) return 'Manually approve tags';
        if (pathname.includes('comments')) return 'Comments';
        if (pathname.includes('sharing')) return 'Sharing and reuse';
        if (pathname.includes('restricted_accounts')) return 'Restricted accounts';
        if (pathname.includes('hidden_words/custom')) return 'Comment filtering';
        if (pathname.includes('hidden_words')) return 'Hidden words';
        if (pathname.includes('muted_accounts')) return 'Muted accounts';
        if (pathname.includes('like_counts')) return 'Like and share counts';
        if (pathname.includes('archiving')) return 'Archiving and downloading';
        if (pathname.includes('accessibility')) return 'Accessibility';
        if (pathname.includes('language')) return 'Language';
        if (pathname.includes('website_permissions')) return 'Website permissions';
        if (pathname.includes('supervision')) return 'Family Centre';
        if (pathname.includes('help/support_requests/')) {
            if (pathname.includes('report')) return 'Reports';
            if (pathname.includes('safety')) return 'Safety Notices';
            if (pathname.includes('violation')) return 'Violations';
            if (pathname.includes('monetisation')) return 'Monetization Support';
            return 'Support Requests';
        }
        if (pathname.includes('help/feedback')) return 'Help';
        if (pathname.includes('help/privacy_help')) return 'Privacy and security help';
        if (pathname.includes('help')) return 'Help';
        if (pathname.includes('privacy_center')) return 'Privacy Centre';
        if (pathname.includes('account_status/removed_content')) return 'Removed content';
        if (pathname.includes('account_status/feature_limits')) return 'Features you can\'t use';
        if (pathname.includes('account_status')) return 'Account Status';
        if (pathname.includes('meta_verified')) return 'Jaadoe Verified';
        if (pathname.includes('about')) return 'About';
        return 'Settings';
    };

    // Sidebar Section Helper
    const SidebarSection = ({ title, children }) => (
        <div className="mb-2">
            <h3 className="text-xs font-bold text-text-secondary px-5 mb-3 mt-6 uppercase tracking-wide">{title}</h3>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );

    // Sidebar Item Helper
    const SidebarItem = ({ icon: Icon, label, path = "#", isExternal = false }) => (
        <Link
            to={path}
            className={`flex items-center px-5 py-3 hover:bg-[#FAFAFA] dark:hover:bg-white/10 transition-colors cursor-pointer border-l-2 ${isActive(path) && path !== '#' ? 'border-black dark:border-white' : 'border-transparent'}`}
        >
            <Icon size={22} strokeWidth={1.5} className="mr-3 text-text-primary" />
            <span className="text-[15px] font-normal text-text-primary leading-5">{label}</span>
            {isExternal && <Share2 size={14} className="ml-auto text-text-secondary" />}
        </Link>
    );

    return (
        <div className="flex w-full min-h-screen bg-primary">
            {/* Settings Sidebar */}

            <div className="w-[315px] min-w-[315px] border-r border-[#dbdbdb] dark:border-[#363636] h-[calc(100vh)] overflow-y-auto hidden md:flex flex-col pt-5 pb-10 bg-primary shrink-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="px-5 mb-6 pt-4">
                    <h2 className="text-xl font-bold mb-6 px-1 text-text-primary">Settings</h2>

                    {/* Jaadoe Accounts Center */}
                    <div className="bg-[#f0f2f5] dark:bg-[#262626] p-4 rounded-xl mb-1 cursor-pointer hover:bg-[#e4e6eb] dark:hover:bg-[#363636] transition-colors shadow-sm">
                        <div className="flex items-center mb-2">
                            <img src={jaadoeLogo} className="w-4 h-auto mr-1 opacity-70 object-contain" alt="Jaadoe" />
                            <span className="font-semibold text-text-primary text-base">Jaadoe</span>
                        </div>
                        <h3 className="font-bold text-[17px] mb-1 text-text-primary">Accounts Centre</h3>
                        <p className="text-[12px] text-text-secondary leading-4 mb-3">
                            Manage your connected experiences and account settings across Jaadoe technologies.
                        </p>
                        <div className="flex items-center text-[12px] text-text-secondary gap-2 mb-1">
                            <User size={14} />
                            <span>Personal details</span>
                        </div>
                        <div className="flex items-center text-[12px] text-text-secondary gap-2 mb-1">
                            <Shield size={14} />
                            <span>Password and security</span>
                        </div>
                        <div className="flex items-center text-[12px] text-text-secondary gap-2">
                            <AlertCircle size={14} />
                            <span>Ad preferences</span>
                        </div>
                        <div className="mt-4 text-[#0095f6] font-semibold text-[12px] hover:text-[#00376b]">See more in Accounts Centre</div>
                    </div>
                </div>

                {/* HOW YOU USE INSTAGRAM */}
                <SidebarSection title="How you use Jaadoe">
                    <SidebarItem icon={User} label="Edit profile" path="/settings/edit-profile" />
                    <SidebarItem icon={Bell} label="Notifications" path="/settings/notifications" />
                    <SidebarItem icon={Monitor} label="Professional Account" path="/settings/professional_account" />
                    <SidebarItem icon={LayoutGrid} label="Creator tools and controls" path="/settings/creator_tools" />
                </SidebarSection>

                {/* WHO CAN SEE YOUR CONTENT */}
                <SidebarSection title="Who can see your content">
                    <SidebarItem icon={Lock} label="Account privacy" path="/settings/privacy" />
                    <SidebarItem icon={Star} label="Close Friends" path="/settings/close_friends" />
                    <SidebarItem icon={Ban} label="Blocked" path="/settings/blocked" />
                    <SidebarItem icon={BookOpen} label="Story and location" path="/settings/story_and_live" />
                </SidebarSection>

                {/* HOW OTHERS CAN INTERACT WITH YOU */}
                <SidebarSection title="How others can interact with you">
                    <SidebarItem icon={MessageCircle} label="Messages and story replies" path="/settings/messages_replies" />
                    <SidebarItem icon={AtSign} label="Tags and mentions" path="/settings/tags_mentions" />
                    <SidebarItem icon={MessageSquare} label="Comments" path="/settings/comments" />
                    <SidebarItem icon={Share2} label="Sharing and reuse" path="/settings/sharing" />
                    <SidebarItem icon={AlertCircle} label="Restricted accounts" path="/settings/restricted_accounts" />
                    <SidebarItem icon={Type} label="Hidden Words" path="/settings/hidden_words" />
                </SidebarSection>

                {/* WHAT YOU SEE */}
                <SidebarSection title="What you see">
                    <SidebarItem icon={VolumeX} label="Muted accounts" path="/settings/muted_accounts" />
                    <SidebarItem icon={FileText} label="Content preferences" path="/settings/content_preferences" />
                    <SidebarItem icon={Heart} label="Like and share counts" path="/settings/like_counts" />
                    <SidebarItem icon={CreditCard} label="Subscriptions" path="/settings/subscriptions" />
                </SidebarSection>

                {/* YOUR APP AND MEDIA */}
                <SidebarSection title="Your app and media">
                    <SidebarItem icon={HardDrive} label="Archiving and downloading" path="/settings/archiving" />
                    <SidebarItem icon={MousePointerClick} label="Accessibility" path="/settings/accessibility" />
                    <SidebarItem icon={Globe} label="Language" path="/settings/language" />
                    <SidebarItem icon={Monitor} label="Website permissions" path="/settings/website_permissions" />
                </SidebarSection>

                {/* FOR FAMILIES */}
                <SidebarSection title="For families">
                    <SidebarItem icon={Users} label="Family Centre" path="/settings/supervision" />
                </SidebarSection>

                {/* MORE INFO AND SUPPORT */}
                <SidebarSection title="More info and support">
                    <SidebarItem icon={HelpCircle} label="Help" path="/settings/help" />
                    <SidebarItem icon={Shield} label="Privacy Centre" path="/settings/privacy_center" />
                    <SidebarItem icon={User} label="Account Status" path="/settings/account_status" />
                    <SidebarItem icon={UserPlus} label="Jaadoe Verified" path="/settings/meta_verified" />
                    <SidebarItem icon={Info} label="About" path="/settings/about" />
                </SidebarSection>

                {/* FOOTER LINKS */}
                <div className="px-5 mt-8 mb-20 opacity-50">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-secondary">
                        <span className="cursor-pointer hover:underline">Jaadoe</span>
                        <span className="cursor-pointer hover:underline">About</span>
                        <span className="cursor-pointer hover:underline">Blog</span>
                        <span className="cursor-pointer hover:underline">Jobs</span>
                        <span className="cursor-pointer hover:underline">Help</span>
                        <span className="cursor-pointer hover:underline">API</span>
                        <span className="cursor-pointer hover:underline">Privacy</span>
                        <span className="cursor-pointer hover:underline">Terms</span>
                        <span className="cursor-pointer hover:underline">Locations</span>
                        <span className="cursor-pointer hover:underline">Jaadoe Lite</span>
                        <span className="cursor-pointer hover:underline">Threads</span>
                        <span className="cursor-pointer hover:underline">Contact Uploading & Non-Users</span>
                        <span className="cursor-pointer hover:underline">Jaadoe Verified</span>
                    </div>
                    <div className="text-xs text-text-secondary mt-4">
                        © 2024 Jaadoe from Jaadoe
                    </div>
                </div>

            </div>

            {/* Mobile Sidebar (Dropdown/Overlay) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="bg-primary w-[80%] max-w-[300px] h-full overflow-y-auto pt-5 pb-10 border-r border-[#dbdbdb] dark:border-[#363636]" onClick={e => e.stopPropagation()}>
                        <div className="px-5 mb-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-primary">Settings</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X size={24} className="text-text-primary" />
                            </button>
                        </div>
                        {/* Re-use content structure - duplicated for mobile implementation brevity, or could refactor to component */}

                        <SidebarSection title="How you use Jaadoe">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={User} label="Edit profile" path="/settings/edit-profile" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Bell} label="Notifications" path="/settings/notifications" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Monitor} label="Professional Account" path="/settings/professional_account" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={LayoutGrid} label="Creator tools and controls" path="/settings/creator_tools" /></div>
                        </SidebarSection>

                        <SidebarSection title="Who can see your content">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Lock} label="Account privacy" path="/settings/privacy" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Star} label="Close Friends" path="/settings/close_friends" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Ban} label="Blocked" path="/settings/blocked" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={BookOpen} label="Story and location" path="/settings/story_and_live" /></div>
                        </SidebarSection>

                        <SidebarSection title="How others can interact with you">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={MessageCircle} label="Messages and story replies" path="/settings/messages_replies" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={AtSign} label="Tags and mentions" path="/settings/tags_mentions" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={MessageSquare} label="Comments" path="/settings/comments" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Share2} label="Sharing and reuse" path="/settings/sharing" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={AlertCircle} label="Restricted accounts" path="/settings/restricted_accounts" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Type} label="Hidden Words" path="/settings/hidden_words" /></div>
                        </SidebarSection>

                        <SidebarSection title="What you see">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={VolumeX} label="Muted accounts" path="/settings/muted_accounts" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Heart} label="Like and share counts" path="/settings/like_counts" /></div>
                        </SidebarSection>

                        <SidebarSection title="Your app and media">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={HardDrive} label="Archiving and downloading" path="/settings/archiving" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={MousePointerClick} label="Accessibility" path="/settings/accessibility" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Globe} label="Language" path="/settings/language" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Monitor} label="Website permissions" path="/settings/website_permissions" /></div>
                        </SidebarSection>

                        <SidebarSection title="More info and support">
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={HelpCircle} label="Help" path="/settings/help" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Shield} label="Privacy Centre" path="/settings/privacy_center" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={User} label="Account Status" path="/settings/account_status" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={UserPlus} label="Jaadoe Verified" path="/settings/meta_verified" /></div>
                            <div onClick={() => setIsMobileMenuOpen(false)}><SidebarItem icon={Info} label="About" path="/settings/about" /></div>
                        </SidebarSection>
                    </div>
                </div>
            )}

            {/* Right Content Area */}
            <div className="flex-1 min-w-0 h-screen overflow-y-auto bg-transparent">
                {/* Mobile Header Toggle */}
                <div className="md:hidden px-4 pt-4 pb-0 flex items-center mb-2">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex items-center gap-2 font-bold text-lg text-text-primary px-2 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        <span>{getPageTitle()}</span>
                        <ChevronDown size={20} />
                    </button>
                </div>

                <div className="w-full h-full pt-4 md:pt-8 px-4 md:px-8 pb-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
