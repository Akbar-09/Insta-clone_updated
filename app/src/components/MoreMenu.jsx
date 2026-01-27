import { forwardRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Settings, Activity, Bookmark, Moon, AlertTriangle, LogOut, ChevronLeft, Check, Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MENU_ITEMS = [
    { icon: Settings, label: 'Settings', to: '/settings/edit-profile' },
    { icon: Activity, label: 'Your activity', to: '/your_activity/interactions' },
    { icon: Bookmark, label: 'Saved', to: '/profile/me/saved' },
    { icon: Moon, label: 'Switch appearance', action: 'appearance' },
    { icon: AlertTriangle, label: 'Report a problem', action: 'report' },
];

const MoreMenu = forwardRef(({ isOpen, onClose, onReportClick }, ref) => {
    const { theme, setTheme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [view, setView] = useState('main'); // 'main' | 'appearance'

    if (!isOpen) return null;

    const handleBack = () => {
        setView('main');
    };

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    // Calculate height or use auto to let content dictate size, but fixed width
    // Instagram More menu is usually fixed width.

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div
            ref={ref}
            className="absolute left-0 bottom-[calc(100%+8px)] w-[266px] bg-white dark:bg-[#262626] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden py-2 z-[200] animate-in fade-in slide-in-from-bottom-2 duration-200 border border-transparent dark:border-[#363636]"
        >
            <div className={`transition-transform duration-300 ease-in-out flex w-[532px] ${view === 'appearance' ? '-translate-x-1/2' : 'translate-x-0'}`}>

                {/* Main Menu View */}
                <div className="w-[266px] flex-shrink-0 flex flex-col">
                    {MENU_ITEMS.map((item, index) => {
                        const Content = (
                            <div
                                className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                                onClick={(e) => {
                                    if (item.action === 'appearance') {
                                        e.preventDefault();
                                        setView('appearance');
                                    } else if (item.action === 'report') {
                                        onReportClick();
                                        onClose();
                                    } else if (!item.to) {
                                        // Handle other actions or placeholder
                                    }
                                }}
                            >
                                <item.icon size={20} className="mr-3 text-text-primary" strokeWidth={2} />
                                <span className="text-sm text-text-primary font-normal">{item.label}</span>
                            </div>
                        );

                        return (
                            <div key={index}>
                                {item.to ? (
                                    <Link to={item.to} className="no-underline text-inherit" onClick={onClose}>
                                        {Content}
                                    </Link>
                                ) : (
                                    Content
                                )}
                            </div>
                        );
                    })}

                    <div className="h-[6px] border-b-[6px] border-secondary dark:border-[#363636] my-1"></div>

                    <div
                        className="flex items-center px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                        onClick={handleLogout}
                    >
                        <span className="text-sm text-text-primary font-normal">Log out</span>
                    </div>
                </div>

                {/* Appearance Menu View */}
                <div className="w-[266px] flex-shrink-0 flex flex-col">
                    <div className="flex items-center px-2 py-3 border-b border-border dark:border-[#363636] mb-2">
                        <button onClick={handleBack} className="p-1 hover:opacity-50 text-text-secondary">
                            <ChevronLeft size={24} />
                        </button>
                        <span className="flex-grow font-bold text-center text-text-primary text-base pr-8">Switch appearance</span>
                    </div>

                    <div className="flex flex-col px-2">
                        <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors group">
                            <span className="text-sm text-text-primary">Dark mode</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${theme === 'dark' ? 'border-none bg-blue-btn' : 'border-text-secondary'}`}
                                onClick={() => handleThemeSelect('dark')}>
                                {theme === 'dark' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                        </label>

                        <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors group">
                            <span className="text-sm text-text-primary">Light mode</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${theme === 'light' ? 'border-none bg-blue-btn' : 'border-text-secondary'}`}
                                onClick={() => handleThemeSelect('light')}>
                                {theme === 'light' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                        </label>

                        <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors group">
                            <span className="text-sm text-text-primary">System default</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                                ${theme === 'system' ? 'border-none bg-blue-btn' : 'border-text-secondary'}`}
                                onClick={() => handleThemeSelect('system')}>
                                {theme === 'system' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MoreMenu;
