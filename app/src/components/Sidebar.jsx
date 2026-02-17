import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getUnreadNotificationCount } from '../api/notificationApi';
import { getUnreadMessageCount } from '../api/messageApi';
import { useSocket } from '../hooks/useSocket';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

import {
    Home, Search, Compass, Clapperboard, MessageCircle,
    Heart, PlusSquare, Menu, BarChart2, Box, Instagram,
    Image as ImageIcon, Video, Mic, Sparkles
} from 'lucide-react';
import SearchDrawer from './SearchDrawer';
import NotificationsDrawer from './NotificationsDrawer';
import CreatePostModal from './CreatePostModal';
import CreateAdModal from './CreateAdModal';
import MoreMenu from './MoreMenu';
import ReportProblemModal from './ReportProblemModal';
import LiveVideoModal from './LiveVideoModal';
import jaadoeLogo from '../assets/jaadoe_logo.svg';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [activeDrawer, setActiveDrawer] = useState(null); // 'search' | 'notifications' | null
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

    const { user } = useContext(AuthContext);
    const { t } = useLanguage();
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const socket = useSocket(user?.userId || user?.id);


    // Fetch unread counts
    useEffect(() => {
        const fetchCounts = async () => {
            if (user?.userId || user?.id) {
                try {
                    // Fetch Notifications Count
                    const res = await getUnreadNotificationCount();
                    if (res.data.status === 'success') {
                        setUnreadCount(res.data.data.count);
                    }

                    // Fetch Messages Count
                    const msgCount = await getUnreadMessageCount();
                    setUnreadMessages(msgCount);
                } catch (e) {
                    console.error('Failed to fetch unread counts', e);
                }
            }
        };

        fetchCounts();
    }, [user]);

    // Listen for real-time notifications
    useEffect(() => {
        if (socket) {
            const handleMessage = (message) => {
                console.log('[Sidebar] Socket message:receive', message, 'Current Path:', location.pathname);

                // Show toast if not on the messages page or if on messages page but different conversation
                const isMessagesPath = location.pathname.startsWith('/messages');
                const isCurrentConv = isMessagesPath && location.pathname.endsWith(`/${message.conversationId}`);

                if (!isCurrentConv) {
                    showToast({
                        title: message.sender?.username || 'New Message',
                        message: message.content,
                        type: 'message',
                        icon: message.sender?.avatar || `https://ui-avatars.com/api/?name=${message.sender?.username || 'User'}&background=random`,
                        onClick: () => navigate(`/messages/${message.conversationId}`)
                    });

                    // Increment badge if not looking at THIS conversation
                    setUnreadMessages(prev => prev + 1);
                }
            };

            const handleMessageSeen = (payload) => {
                // If the payload shows I saw messages (e.g. from another tab/window)
                if (String(payload.seenBy) === String(user?.id || user?.userId)) {
                    refreshCounts();
                }
            };

            socket.on('new_notification', (notification) => {
                console.log('Real-time notification received:', notification);
                setUnreadCount(prev => prev + 1);

                // Dedup: skip toast if it's a message, because handleMessage already handles it
                if (notification.type === 'message') return;

                showToast({
                    title: notification.title || 'New Notification',
                    message: notification.message || 'You have a new update',
                    type: notification.type || 'notification',
                    icon: notification.fromUserAvatar || `https://ui-avatars.com/api/?name=${notification.fromUsername || 'User'}&background=random`,
                    onClick: () => {
                        if (notification.link) navigate(notification.link);
                        else toggleDrawer('notifications');
                    }
                });
            });

            socket.on('message:receive', handleMessage);
            socket.on('message:seen', handleMessageSeen);

            return () => {
                socket.off('new_notification');
                socket.off('message:receive', handleMessage);
                socket.off('message:seen', handleMessageSeen);
            };
        }
    }, [socket, location.pathname, user, showToast, navigate]);

    // Refresh counts on navigation to messages
    useEffect(() => {
        if (location.pathname.startsWith('/messages')) {
            refreshCounts();
        }
    }, [location.pathname]);

    const refreshCounts = async () => {
        if (user?.userId || user?.id) {
            try {
                const res = await getUnreadNotificationCount();
                if (res.data.status === 'success') {
                    setUnreadCount(res.data.data.count);
                }
                const msgCount = await getUnreadMessageCount();
                setUnreadMessages(msgCount);
            } catch (e) {
                console.error('Failed to refresh counts', e);
            }
        }
    };


    // Refs
    const sidebarRef = useRef(null);
    const createButtonRef = useRef(null);
    const createMenuRef = useRef(null);
    const moreButtonRef = useRef(null);
    const moreMenuRef = useRef(null);
    const drawerRef = useRef(null);

    const isActive = (path) => {
        if (path === '/messages') return /^\/messages/i.test(location.pathname);
        return location.pathname === path;
    };

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
                // If click is inside the sidebar (navigation), do nothing
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
        if (drawerName === 'notifications' && activeDrawer !== 'notifications') {
            setUnreadCount(0);
        }

        if (activeDrawer === drawerName) {
            setActiveDrawer(null);
        } else {
            setActiveDrawer(drawerName);
        }
        setShowCreateMenu(false);
        setShowMoreMenu(false);
    };

    const toggleCreateMenu = () => {
        setShowCreateMenu(!showCreateMenu);
        setShowMoreMenu(false);
        setActiveDrawer(null);
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

    const handleAdClick = () => {
        setShowCreateMenu(false);
        setIsAdModalOpen(true);
    };

    const handleLiveVideoClick = () => {
        setShowCreateMenu(false);
        setIsLiveModalOpen(true);
    };

    const isNarrow = activeDrawer !== null || /^\/messages/i.test(location.pathname);

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
                ref={sidebarRef}
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
                    <NavItem to="/feed" path="/feed" icon={Home} label={t('Home')} />
                    <NavItem
                        onClick={() => toggleDrawer('search')}
                        drawerName="search"
                        icon={Search}
                        label={t('Search')}
                    />
                    <NavItem to="/explore" path="/explore" icon={Compass} label={t('Explore')} />
                    <NavItem to="/reels" path="/reels" icon={Clapperboard} label={t('Reels')} />
                    <NavItem
                        to="/messages"
                        path="/messages"
                        icon={MessageCircle}
                        label={t('Messages')}
                        badge={unreadMessages > 0 ? (unreadMessages > 9 ? '9+' : unreadMessages) : null}
                    />
                    <NavItem
                        onClick={() => toggleDrawer('notifications')}
                        drawerName="notifications"
                        icon={Heart}
                        label={t('Notifications')}
                        badge={unreadCount > 0 ? (unreadCount > 9 ? '9+' : unreadCount) : null}
                    />
                    <NavItem
                        onClick={toggleCreateMenu}
                        icon={PlusSquare}
                        label={t('Create')}
                        isCreateBtn={true}
                    />
                    <NavItem to="/dashboard" path="/dashboard" icon={BarChart2} label={t('Dashboard')} />

                    <Link to={`/profile/${user?.username || 'me'}`} className="block mt-1 no-underline">
                        <div className={`flex items-center p-3 my-1 rounded-lg text-text-primary dark:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10
                             ${(isActive('/profile/me') || (user?.username && isActive(`/profile/${user.username}`))) ? 'font-bold' : ''}
                             ${isNarrow ? 'justify-center p-3' : ''} 
                             max-[1264px]:justify-center max-[1264px]:p-3`}>
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
                                alt="Profile"
                                className={`w-6 h-6 rounded-full object-cover 
                                    ${(isActive('/profile/me') || (user?.username && isActive(`/profile/${user.username}`))) ? 'border-[2px] border-text-primary p-[1px]' : ''}
                                    ${!isNarrow ? 'mr-4' : ''}
                                    max-[1264px]:mr-0`}
                            />
                            <span className={`text-base leading-6 whitespace-nowrap 
                                ${isNarrow ? 'hidden' : 'block'}
                                max-[1264px]:hidden`}>{t('Profile')}</span>
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
                            <div className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer justify-between transition-colors" onClick={handleCreatePostClick}>
                                <span className="text-sm font-semibold text-text-primary dark:text-white">{t('Post')}</span>
                                <ImageIcon size={20} className="text-text-primary dark:text-white" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer justify-between border-t border-border transition-colors" onClick={handleLiveVideoClick}>
                                <span className="text-sm font-semibold text-text-primary dark:text-white">{t('Live video')}</span>
                                <Video size={20} className="text-text-primary dark:text-white" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer justify-between border-t border-border transition-colors" onClick={handleAdClick}>
                                <span className="text-sm font-semibold text-text-primary dark:text-white">{t('Ad')}</span>
                                <BarChart2 size={20} className="text-text-primary dark:text-white" />
                            </div>
                            <div className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer justify-between border-t border-border transition-colors">
                                <span className="text-sm font-semibold text-text-primary dark:text-white">{t('AI Studio')}</span>
                                <Sparkles size={20} className="text-text-primary dark:text-white" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto w-full relative">
                    <NavItem
                        icon={Menu}
                        label={t('More')}
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
                        <Link to="#" className="flex items-center p-3 my-1 rounded-lg text-text-primary dark:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10">
                            <Box size={20} className="mr-4 text-text-primary" />
                            <span className="text-base leading-6 whitespace-nowrap">{t('Also from Jaadoe')}</span>
                        </Link>
                    </div>
                )}
            </div>

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

            {isCreateModalOpen && <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />}
            {isAdModalOpen && <CreateAdModal onClose={() => setIsAdModalOpen(false)} />}
            {isReportModalOpen && <ReportProblemModal onClose={() => setIsReportModalOpen(false)} />}
            {isLiveModalOpen && <LiveVideoModal onClose={() => setIsLiveModalOpen(false)} />}
        </>
    );
};

export default Sidebar;
