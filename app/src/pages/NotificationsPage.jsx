import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../api/notificationApi';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, UserPlus, Bell, ArrowLeft, MoreHorizontal, Trash2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

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

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsRead();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await markNotificationRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        // Assume we have a delete API
        try {
            await fetch(`/api/v1/notifications/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !n.is_read;
        return n.type === filter;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <Heart className="text-red-500 fill-red-500" size={16} />;
            case 'comment': return <MessageCircle className="text-blue-500" size={16} />;
            case 'follow': return <UserPlus className="text-green-500" size={16} />;
            default: return <Bell className="text-gray-500" size={16} />;
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                </div>
                <button
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600"
                >
                    <CheckCircle size={18} />
                    Mark all as read
                </button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                {['all', 'unread', 'like', 'comment', 'follow'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-1">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black dark:border-white"></div>
                    </div>
                ) : filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`group flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${notification.is_read
                                ? 'hover:bg-gray-50 dark:hover:bg-white/5'
                                : 'bg-blue-50/30 dark:bg-blue-500/5 hover:bg-blue-50/50 dark:hover:bg-blue-500/10'
                                }`}
                            onClick={() => {
                                handleMarkRead(notification.id);
                                if (notification.link) navigate(notification.link);
                            }}
                        >
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                                    {/* We should ideally have the actor avatar here too, but our model uses generic fields for now */}
                                    <Bell className="m-auto mt-3 opacity-20" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-black rounded-full shadow-sm">
                                    {getIcon(notification.type)}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm truncate">{notification.title}</p>
                                    {!notification.is_read && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(notification.id);
                                    }}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl">
                        <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">No notifications found</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                            {filter === 'all'
                                ? "You're all caught up! No recent notifications to show."
                                : `No ${filter} notifications found matching your filter.`
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
