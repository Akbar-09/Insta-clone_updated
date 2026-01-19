import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, Search, Compass, Clapperboard, MessageCircle,
    Heart, PlusSquare, Menu, BarChart2, Box, Instagram,
    Image as ImageIcon, Video, Mic, Sparkles
} from 'lucide-react';
import SearchDrawer from './SearchDrawer';
import NotificationsDrawer from './NotificationsDrawer';
import CreatePostModal from './CreatePostModal';
import MoreMenu from './MoreMenu';
import ReportProblemModal from './ReportProblemModal';
import LiveVideoModal from './LiveVideoModal';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const USER_AVATAR = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop';

const Sidebar = () => {
    const location = useLocation();
    const [activeDrawer, setActiveDrawer] = useState(null); // 'search' | 'notifications' | null
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

    // Refs
    const sidebarRef = useRef(null);
    const createButtonRef = useRef(null);
    const createMenuRef = useRef(null);
    const moreButtonRef = useRef(null);
    const moreMenuRef = useRef(null);
    const drawerRef = useRef(null);

    const isActive = (path) => location.pathname === path;

    // Close drawers on route change
    useEffect(() => {
        setActiveDrawer(null);
        setShowCreateMenu(false);
        setShowMoreMenu(false);
    }, [location.pathname]);

    // Handle clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Logic for Create Menu
            if (showCreateMenu &&
                createMenuRef.current &&
                !createMenuRef.current.contains(event.target) &&
                !createButtonRef.current.contains(event.target)) {
                setShowCreateMenu(false);
            }

            // Logic for More Menu
            if (showMoreMenu &&
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target) &&
                !moreButtonRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }

            // Logic for Drawers (Search/Notifications)
            if (activeDrawer) {
                // If click is inside the drawer, do nothing
                if (drawerRef.current && drawerRef.current.contains(event.target)) {
                    return;
                }
                // If click is inside the sidebar (navigation), do nothing (nav/toggle logic handles it)
                if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
                    return;
                }
                // Otherwise (click on main content), close drawer
                setActiveDrawer(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCreateMenu, showMoreMenu, activeDrawer]);

    const toggleDrawer = (drawerName) => {
        if (activeDrawer === drawerName) {
            setActiveDrawer(null);
        } else {
            setActiveDrawer(drawerName);
        }
        setShowCreateMenu(false); // Close create menu if opening drawer
        setShowMoreMenu(false);
    };

    const toggleCreateMenu = () => {
        setShowCreateMenu(!showCreateMenu);
        setShowMoreMenu(false);
        setActiveDrawer(null); // Close drawers if opening create menu
    };

    const toggleReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
        setShowMoreMenu(false);
    };

    const toggleMoreMenu = () => {
        setShowMoreMenu(!showMoreMenu);
        setShowCreateMenu(false);
        setActiveDrawer(null);
    };

    const handleCreatePostClick = () => {
        setShowCreateMenu(false);
        setIsCreateModalOpen(true);
    };

    const handleLiveVideoClick = () => {
        setShowCreateMenu(false);
        setIsLiveModalOpen(true);
    };

    const isNarrow = activeDrawer !== null || location.pathname === '/messages';

    const NavItem = ({ to, icon: Icon, label, path, badge, onClick, drawerName, isCreateBtn, isMoreBtn }) => {
        const activeRoute = path && isActive(path);
        const activeState = activeDrawer === drawerName || (isCreateBtn && showCreateMenu) || (isMoreBtn && showMoreMenu);
        const isLink = !!to;

        const content = (
            <div
                ref={isCreateBtn ? createButtonRef : (isMoreBtn ? moreButtonRef : null)}
                className={`flex items-center p-3 my-1 rounded-lg text-text-primary dark:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 group
                    ${(activeRoute || activeState) ? 'font-bold' : ''} 
                    ${isNarrow ? 'justify-center p-3' : ''}
                    max-[1264px]:justify-center max-[1264px]:p-3`}
                onClick={onClick}
            >
                <div className="relative flex items-center justify-center transition-transform group-active:scale-95 duration-100">
                    <Icon
                        size={24}
                        className={`text-text-primary dark:text-white transition-transform duration-100 ${(!isNarrow) ? 'mr-4' : ''} max-[1264px]:mr-0`}
                        strokeWidth={(activeRoute || activeState) ? 3 : 2}
                    />
                    {badge && (
                        <span className={`absolute -top-1 -right-1.5 bg-[#ff3040] text-white text-[11px] font-semibold h-[18px] min-w-[18px] rounded-full flex items-center justify-center border-2 border-primary px-1
                            ${(!isNarrow) ? 'right-2.5' : '-right-1.5'}
                            max-[1264px]:-right-1.5`}>
                            {badge}
                        </span>
                    )}
                </div>
                <span className={`text-base leading-6 whitespace-nowrap 
                    ${isNarrow ? 'hidden' : 'block'}
                    max-[1264px]:hidden`}>
                    {label}
                </span>
            </div>
        );

        if (isLink) {
            return <Link to={to} className="block no-underline">{content}</Link>;
        }
        return <div className="block cursor-pointer">{content}</div>;
    };

    return (
        <>
            <div
                ref={sidebarRef} // Attach ref to sidebar container
                className={`fixed top-0 left-0 bottom-0 flex flex-col pt-2 px-3 pb-5 bg-primary border-r border-border z-[100] transition-[width] duration-200 ease-in-out
                ${isNarrow ? 'w-[72px] items-center z-[101]' : 'w-[245px]'}
                max-[1264px]:w-[72px] max-[1264px]:items-center max-[1264px]:z-[101]`}>

                <Link to="/feed" className={`mb-[19px] px-3 py-6 block w-full h-[73px] 
                    ${isNarrow ? 'flex justify-center mt-3 mb-0 p-3' : ''}
                    max-[1264px]:flex max-[1264px]:justify-center max-[1264px]:mt-3 max-[1264px]:mb-0 max-[1264px]:p-3`}>


                    {(isNarrow) ? (
                        <img src={jaadoeLogo} alt="Jaadoe" className="h-8 w-auto object-contain" />
                    ) : (
                        <>
                            <img src={jaadoeLogo} alt="Jaadoe" className="max-[1264px]:hidden h-8 w-auto mt-2 object-contain" />
                            <img src={jaadoeLogo} alt="Jaadoe" className="hidden max-[1264px]:block h-8 w-auto object-contain" />
                        </>
                    )}
                </Link>

                <div className="flex flex-col w-full relative">
                    <NavItem to="/feed" path="/feed" icon={Home} label="Home" />
                    <NavItem
                        onClick={() => toggleDrawer('search')}
                        drawerName="search"
                        icon={Search}
                        label="Search"
                    />
                    <NavItem to="/explore" path="/explore" icon={Compass} label="Explore" />
                    <NavItem to="/reels" path="/reels" icon={Clapperboard} label="Reels" />
                    <NavItem to="/messages" path="/messages" icon={MessageCircle} label="Messages" badge="6" />
                    <NavItem
                        onClick={() => toggleDrawer('notifications')}
                        drawerName="notifications"
                        icon={Heart}
                        label="Notifications"
                        badge="2"
                    />
                    <NavItem
                        onClick={toggleCreateMenu}
                        icon={PlusSquare}
                        label="Create"
                        isCreateBtn={true}
                    />
                    {/* Dashboard was custom request, keeping it */}
                    <NavItem to="/dashboard" path="/dashboard" icon={BarChart2} label="Dashboard" />

                    <Link to="/profile/me" className="block mt-1 no-underline">
                        <div className={`flex items-center p-3 my-1 rounded-lg text-text-primary transition-colors cursor-pointer hover:bg-black/5
                             ${isActive('/profile/me') ? 'font-bold' : ''}
                             ${isNarrow ? 'justify-center p-3' : ''} 
                             max-[1264px]:justify-center max-[1264px]:p-3`}>
                            <img src={USER_AVATAR} alt="Profile" className={`w-6 h-6 rounded-full object-cover 
                                ${isActive('/profile/me') ? 'border-[2px] border-text-primary p-[1px]' : ''}
                                ${!isNarrow ? 'mr-4' : ''}
                                max-[1264px]:mr-0`} />
                            <span className={`text-base leading-6 whitespace-nowrap 
                                ${isNarrow ? 'hidden' : 'block'}
                                max-[1264px]:hidden`}>Profile</span>
                        </div>
                    </Link>

                    {/* Create Menu Floating Pop-up */}
                    {showCreateMenu && (
                        <div
                            ref={createMenuRef}
                            className={`absolute left-0 bottom-[calc(100%-430px)] bg-white dark:bg-[#262626] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[266px] overflow-hidden py-2 z-[200]
                                ${isNarrow ? 'left-[80px] bottom-auto top-[350px]' : ''}
                                max-[1264px]:left-[80px] max-[1264px]:bottom-auto max-[1264px]:top-[350px]
                            `}
                        >
                            <div className="flex items-center px-4 py-3 hover:bg-[#fafafa] cursor-pointer justify-between" onClick={handleCreatePostClick}>
                                <span className="text-sm font-semibold">Post</span>
                                <ImageIcon size={20} className="text-text-primary" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-[#fafafa] cursor-pointer justify-between border-t border-border" onClick={handleLiveVideoClick}>
                                <span className="text-sm font-semibold">Live video</span>
                                <Video size={20} className="text-text-primary" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-[#fafafa] cursor-pointer justify-between border-t border-border">
                                <span className="text-sm font-semibold">Ad</span>
                                <BarChart2 size={20} className="text-text-primary" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-[#fafafa] cursor-pointer justify-between border-t border-border">
                                <span className="text-sm font-semibold">AI Studio</span>
                                <Sparkles size={20} className="text-text-primary" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto w-full relative">
                    <NavItem
                        icon={Menu}
                        label="More"
                        onClick={toggleMoreMenu}
                        isMoreBtn={true}
                    />
                    {showMoreMenu && (
                        <MoreMenu
                            ref={moreMenuRef}
                            isOpen={showMoreMenu}
                            onClose={() => setShowMoreMenu(false)}
                            onReportClick={toggleReportModal}
                        />
                    )}
                </div>

                {(!isNarrow) && (
                    <div className="mt-[10px] max-[1264px]:hidden">
                        <Link to="#" className="flex items-center p-3 my-1 rounded-lg text-text-primary transition-colors cursor-pointer hover:bg-black/5">
                            <Box size={20} className="mr-4 text-text-primary" />
                            <span className="text-base leading-6 whitespace-nowrap">Also from Jaadoe</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Drawers */}
            <SearchDrawer
                ref={drawerRef}
                isOpen={activeDrawer === 'search'}
                onClose={() => setActiveDrawer(null)}
            />
            <NotificationsDrawer
                ref={drawerRef}
                isOpen={activeDrawer === 'notifications'}
                onClose={() => setActiveDrawer(null)}
            />

            {/* Create Post Modal */}
            {isCreateModalOpen && <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />}

            {isReportModalOpen && <ReportProblemModal onClose={() => setIsReportModalOpen(false)} />}

            {isLiveModalOpen && <LiveVideoModal onClose={() => setIsLiveModalOpen(false)} />}
        </>
    );
};

export default Sidebar;
