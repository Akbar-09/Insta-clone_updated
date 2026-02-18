
import { forwardRef, useEffect, useState, useContext } from 'react';
import { getNotifications, markAllNotificationsRead, markNotificationRead, clearAllNotifications } from '../api/notificationApi';
import { AuthContext } from '../context/AuthContext';
import { isThisWeek, isThisMonth, parseISO, formatDistanceToNowStrict } from 'date-fns';
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';

const NotificationsDrawer = forwardRef(({ isOpen }, ref) => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && user) {
            fetchNotifications();
            // Mark all as read after a short delay or immediately
            markAllRead();
        }
    }, [isOpen, user]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await getNotifications();
            if (res.data.status === 'success') {
                setNotifications(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClearAll = async () => {
        if (window.confirm('Are you sure you want to clear all notifications?')) {
            try {
                await clearAllNotifications();
                setNotifications([]);
            } catch (err) {
                console.error("Failed to clear notifications", err);
            }
        }
    };

    const markAllRead = async () => {

        try {
            await markAllNotificationsRead();
            // Optimistically update local state?

            // Actually, backend updates it.
        } catch (err) {
            console.error("Failed to mark read", err);
        }
    };

    const handleItemClick = async (item) => {
        if (!item.isRead) {
            try {
                await markNotificationRead(item.id);
            } catch (e) {
                console.error(e);
            }
        }
        // Navigate based on type
        if (item.type === 'FOLLOW') {
            navigate(`/profile/${item.fromUsername}`);
        } else if (item.resourceId) {
            navigate(`/post/${item.resourceId}`);
        }
    };

    // Grouping logic (More like Instagram's "Today", "This Week", "This Month", "Earlier")
    const grouped = {
        'Today': [],
        'This week': [],
        'This month': [],
        'Earlier': []
    };

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    notifications.forEach(item => {
        const date = parseISO(item.createdAt);
        if (date >= startOfToday) {
            grouped['Today'].push(item);
        } else if (date >= startOfWeek) {
            grouped['This week'].push(item);
        } else if (isThisMonth(date)) {
            grouped['This month'].push(item);
        } else {
            grouped['Earlier'].push(item);
        }
    });

    // Remove empty groups for rendering
    const sections = Object.keys(grouped).filter(key => grouped[key].length > 0);

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="absolute top-0 left-[72px] bottom-0 w-[397px] bg-white dark:bg-black border-r border-gray-200 dark:border-[#363636] rounded-r-[24px] p-0 z-[99] shadow-[10px_0_30px_rgba(0,0,0,0.15)] flex flex-col transition-all duration-300 animate-in slide-in-from-left"
        >
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text-primary dark:text-white">Notifications</h2>
                {notifications.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="text-sm font-semibold text-blue-btn hover:text-blue-btn-hover transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>


            <div className="flex-grow overflow-y-auto pb-5 scrollbar-none hover:scrollbar-thin scrollbar-thumb-white/20">
                {loading && notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-text-secondary">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text-primary mb-4"></div>
                        <span>Loading...</span>
                    </div>
                ) : (
                    sections.length > 0 ? (
                        sections.map((section) => (
                            <div key={section} className="flex flex-col">
                                <div className="flex items-center justify-between px-6 py-2">
                                    <h3 className="text-[17px] font-bold text-text-primary dark:text-white">{section}</h3>
                                </div>
                                {grouped[section].map(item => (
                                    <div
                                        key={item.id}
                                        className={`flex items-center px-6 py-3.5 cursor-pointer hover:bg-secondary/50 transition-colors group ${!item.isRead ? 'relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-blue-btn before:rounded-full bg-blue-50/5' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="mr-3.5 shrink-0 relative">
                                            <div className="w-[46px] h-[46px] rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                                                <img
                                                    src={item.fromUserAvatar || `https://ui-avatars.com/api/?name=${item.fromUsername || (item.message.includes(':') ? item.message.split(':')[0] : 'User')}&background=random`}
                                                    className="w-full h-full rounded-full object-cover border-2 border-primary dark:border-black"
                                                    alt={item.fromUsername || 'User'}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-grow mr-3 text-[14px] leading-[1.3]">
                                            <p className="text-text-primary dark:text-gray-200">
                                                <span className="font-bold hover:underline cursor-pointer dark:text-white" onClick={(e) => {
                                                    e.stopPropagation();
                                                    const username = item.fromUsername || (item.message.includes(':') ? item.message.split(':')[0] : 'User');
                                                    navigate(`/profile/${username}`);
                                                }}>
                                                    {item.fromUsername || (item.message.includes(':') ? item.message.split(':')[0] : 'User')}
                                                </span>
                                                {' '}
                                                <span className="text-text-primary font-medium dark:text-gray-300">
                                                    {(item.type === 'LIKE' || item.type === 'like') && 'liked your post.'}
                                                    {(item.type === 'COMMENT' || item.type === 'comment') && 'commented on your post.'}
                                                    {(item.type === 'REPLY' || item.type === 'reply') && 'replied to your comment.'}
                                                    {(item.type === 'FOLLOW' || item.type === 'follow') && 'started following you.'}
                                                    {(item.type === 'MENTION' || item.type === 'mention') && 'mentioned you.'}
                                                    {(item.type === 'message') && 'sent you a message.'}
                                                </span>
                                                <span className="text-text-secondary ml-1.5 whitespace-nowrap">
                                                    {formatDistanceToNowStrict(parseISO(item.createdAt), { addSuffix: false })
                                                        .replace(' seconds', 's')
                                                        .replace(' second', 's')
                                                        .replace(' minutes', 'm')
                                                        .replace(' minute', 'm')
                                                        .replace(' hours', 'h')
                                                        .replace(' hour', 'h')
                                                        .replace(' days', 'd')
                                                        .replace(' day', 'd')
                                                        .replace(' weeks', 'w')
                                                        .replace(' week', 'w')
                                                    }
                                                </span>
                                            </p>
                                        </div>

                                        <div className="shrink-0 ml-auto">
                                            {item.type === 'FOLLOW' ? (
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <FollowButton
                                                        userId={item.fromUserId}
                                                        initialIsFollowing={null}
                                                        className="px-4 py-1.5 text-xs font-bold rounded-lg"
                                                    />
                                                </div>
                                            ) : item.resourceImage ? (
                                                <div className="w-11 h-11 relative rounded-md overflow-hidden border border-border group-hover:border-text-secondary transition-colors">
                                                    <img src={item.resourceImage} className="w-full h-full object-cover" alt="Post" />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-20 px-10 text-center">
                            <div className="w-16 h-16 rounded-full border-2 border-text-primary flex items-center justify-center mb-4 opacity-20">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                                    <path d="M10.5 13.5l1.5-1.5 1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 12v3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">No notifications yet</h3>
                            <p className="text-text-secondary text-sm">
                                When someone likes or comments on one of your posts, or follows you, you'll see it here.
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
});

NotificationsDrawer.displayName = 'NotificationsDrawer';

export default NotificationsDrawer;


