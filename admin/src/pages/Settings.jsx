import React, { useState } from 'react';
import { Save, User, Shield, Bell, Moon } from 'lucide-react';
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

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [maintenance, setMaintenance] = useState(false);
    const [registrations, setRegistrations] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);

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
                        <button className="mt-4 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-lg text-sm text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 w-full">
                            Edit Profile
                        </button>
                    </div>
                </div>

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
