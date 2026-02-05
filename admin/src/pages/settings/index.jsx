import React, { useState, useEffect } from 'react';
import { Save, User, Shield, Bell, Moon, X, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import * as adminApi from '../../api/adminApi';

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

const EditProfileModal = ({ profile, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: profile.name || '',
        email: profile.email || '',
        title: 'Super Admin' // Static for now
    });

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
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
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium hover:from-pink-600 hover:to-violet-700 shadow-lg shadow-pink-500/20 transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Settings = () => {
    const { theme, toggleTheme, setTheme } = useTheme();
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowRegistrations: true,
        emailAlerts: true,
        adminTheme: 'light'
    });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [settingsRes, profileRes] = await Promise.all([
                adminApi.getSettings(),
                adminApi.getProfile()
            ]);

            if (settingsRes.success) {
                setSettings(settingsRes.data);
                if (settingsRes.data.adminTheme && settingsRes.data.adminTheme !== theme) {
                    setTheme(settingsRes.data.adminTheme);
                }
            }
            if (profileRes.success) setProfile(profileRes.data);
        } catch (error) {
            console.error('Failed to load settings', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        // We defer saving until "Save Changes" is clicked, or we could auto-save.
        // For consistency with other settings, we update the local state which will be saved on "Save Settings".
        handleSettingChange('adminTheme', newTheme);
    };

    const saveSettings = async () => {
        try {
            // Ensure we send the current theme 
            await adminApi.updateSettings({ ...settings, adminTheme: theme });
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings', error);
            alert('Failed to save settings.');
        }
    };

    const handleProfileUpdate = async (data) => {
        try {
            const res = await adminApi.updateProfile(data);
            if (res.success) {
                setProfile(res.data);
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-pink-500" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Col - Profile */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full p-[2px] mb-4">
                            <img
                                src={`https://ui-avatars.com/api/?name=${profile?.name || 'Admin'}&background=random`}
                                alt="Admin"
                                className="w-full h-full rounded-full border-4 border-white dark:border-black object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{profile?.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-lg text-sm text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 w-full"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {isEditing && profile && (
                    <EditProfileModal
                        profile={profile}
                        onClose={() => setIsEditing(false)}
                        onSave={handleProfileUpdate}
                    />
                )}

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
                            checked={settings.maintenanceMode}
                            onChange={(val) => handleSettingChange('maintenanceMode', val)}
                        />
                        <SettingsToggle
                            label="Allow New Registrations"
                            description="Pause new user signups temporarily."
                            checked={settings.allowRegistrations}
                            onChange={(val) => handleSettingChange('allowRegistrations', val)}
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
                            checked={settings.emailAlerts}
                            onChange={(val) => handleSettingChange('emailAlerts', val)}
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
                            <button onClick={handleThemeToggle} className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg text-xs text-gray-800 dark:text-white">
                                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={saveSettings}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

