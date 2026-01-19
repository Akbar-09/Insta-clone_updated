import React, { useState } from 'react';
import { Save, User, Shield, Bell, Moon, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsToggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 last:border-0">
        <div>
            <h4 className="text-sm font-medium text-gray-800 dark:text-white">{label}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-pink-500' : 'bg-gray-300 dark:bg-white/10'}`}
        >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></span>
        </button>
    </div>
);

const EditProfileModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Edit Profile</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <X size={20} className="text-gray-500" />
                </button>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px] mb-2 cursor-pointer group relative">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                            alt="Admin"
                            className="w-full h-full rounded-full border-4 border-white dark:border-black object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-medium">Change</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                    <input
                        type="text"
                        defaultValue="Admin User"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Title</label>
                    <input
                        type="text"
                        defaultValue="Super Admin"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                    <input
                        type="email"
                        defaultValue="admin@instagram.com"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                </div>

                <div className="pt-4 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium hover:from-pink-600 hover:to-violet-700 shadow-lg shadow-pink-500/20 transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [maintenance, setMaintenance] = useState(false);
    const [registrations, setRegistrations] = useState(true);

    const [emailNotifs, setEmailNotifs] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Col - Profile */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full p-[2px] mb-4">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" className="w-full h-full rounded-full border-4 border-white dark:border-black object-cover" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Super Admin</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">admin@instagram.com</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-lg text-sm text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 w-full"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {isEditing && <EditProfileModal onClose={() => setIsEditing(false)} />}

                {/* Right Col - Settings Forms */}
                <div className="md:col-span-2 space-y-6">

                    {/* General Configuration */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Shield className="text-pink-500" size={20} />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Security & Access</h3>
                        </div>

                        <SettingsToggle
                            label="Maintenance Mode"
                            description="Disable platform access for all non-admin users."
                            checked={maintenance}
                            onChange={setMaintenance}
                        />
                        <SettingsToggle
                            label="Allow New Registrations"
                            description="Pause new user signups temporarily."
                            checked={registrations}
                            onChange={setRegistrations}
                        />
                    </div>

                    {/* Notifications */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Bell className="text-blue-500" size={20} />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
                        </div>

                        <SettingsToggle
                            label="Email Alerts"
                            description="Receive daily summaries of reported content."
                            checked={emailNotifs}
                            onChange={setEmailNotifs}
                        />
                    </div>


                    {/* Appearance */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Moon className="text-violet-500" size={20} />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Appearance</h3>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 dark:text-white">Dark Mode</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Toggle admin panel theme.</p>
                            </div>
                            <button onClick={toggleTheme} className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg text-xs text-gray-800 dark:text-white">
                                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
