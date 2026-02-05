import React, { useState, useEffect } from 'react';
import { Bell, Send, Calendar, Users, Globe, Smartphone, History, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const NotificationManagement = () => {
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        target: 'all', // all, country, platform
        country: '',
        platform: '',
        schedule: 'now'
    });

    const [notifications, setNotifications] = useState([]);
    const [stats, setStats] = useState({ totalRecipients: 0, sentToday: 0, sentMonth: 0 });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [historyRes, statsRes] = await Promise.all([
                adminApi.getNotificationHistory(),
                adminApi.getNotificationStats()
            ]);

            if (historyRes.success) {
                setNotifications(historyRes.data);
            }
            if (statsRes.success) {
                setStats(statsRes.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSending(true);
            const res = await adminApi.sendNotification(formData);
            if (res.success) {
                setFormData({ title: '', message: '', target: 'all', country: '', platform: '', schedule: 'now' });
                fetchData(); // Refresh list and stats
                alert('Notification sent successfully!');
            }
        } catch (error) {
            console.error('Failed to send notification:', error);
            alert('Failed to send notification');
        } finally {
            setSending(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Just now';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Management</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create and manage push notifications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Create Notification Form */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6">
                        <Bell className="text-pink-500" size={24} />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Create Notification</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                                placeholder="Enter notification title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 resize-none"
                                placeholder="Enter notification message"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Audience</label>
                                <select
                                    value={formData.target}
                                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                                >
                                    <option value="all">All Users</option>
                                    <option value="country">By Country</option>
                                    <option value="platform">By Platform</option>
                                </select>
                            </div>

                            {formData.target === 'country' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Country</label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                                    >
                                        <option value="">Choose...</option>
                                        <option value="United States">United States</option>
                                        <option value="India">India</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            )}

                            {formData.target === 'platform' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Platform</label>
                                    <select
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Website">Website</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schedule</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="now"
                                        checked={formData.schedule === 'now'}
                                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Send Now</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="later"
                                        checked={formData.schedule === 'later'}
                                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Schedule for Later</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold hover:from-pink-600 hover:to-violet-700 shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                            {sending ? 'Sending...' : 'Send Notification'}
                        </button>
                    </form>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Users className="text-blue-500" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Recipients</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {loading ? '...' : stats.totalRecipients.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <Bell className="text-green-500" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Sent Today</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {loading ? '...' : stats.sentToday.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <History className="text-purple-500" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {loading ? '...' : stats.sentMonth.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification History */}
            <div className="glass-card p-6 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notification History</h2>
                <div className="space-y-3">
                    {loading ? (
                        <div className="text-center py-8 text-gray-500">Loading history...</div>
                    ) : notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-800 dark:text-white">{notification.title}</h3>
                                            {notification.status === 'scheduled' && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700">Scheduled</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                            <span>👥 {notification.recipientsCount?.toLocaleString()} recipients</span>
                                            <span>🎯 {notification.target === 'all' ? 'All Users' : `${notification.target} (${notification.targetValue})`}</span>
                                            <span>🕒 {formatDate(notification.sentAt || notification.scheduledFor)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">No notifications sent yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationManagement;
