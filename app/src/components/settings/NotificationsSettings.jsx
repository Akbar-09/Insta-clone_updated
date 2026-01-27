import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, Mail } from 'lucide-react';

const NotificationsSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full text-text-primary px-4 md:px-0 max-w-2xl">
            <h2 className="text-xl font-bold mb-6 mt-1">Notifications</h2>

            <div className="flex flex-col space-y-4">
                {/* Push Notifications Card */}
                <div
                    onClick={() => navigate('/settings/notifications/push')}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                    <div className="flex items-center space-x-4">
                        <Bell size={24} className="text-text-primary" />
                        <div>
                            <div className="font-semibold text-base">Push notifications</div>
                            <div className="text-sm text-text-secondary">Likes, comments, request, etc.</div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-text-secondary" />
                </div>

                {/* Email Notifications Card */}
                <div
                    onClick={() => navigate('/settings/notifications/email')}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                    <div className="flex items-center space-x-4">
                        <Mail size={24} className="text-text-primary" />
                        <div>
                            <div className="font-semibold text-base">Email notifications</div>
                            <div className="text-sm text-text-secondary">Feedback, reminder, product, etc.</div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-text-secondary" />
                </div>
            </div>
        </div>
    );
};

export default NotificationsSettings;
