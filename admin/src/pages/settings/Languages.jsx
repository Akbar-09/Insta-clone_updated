import React, { useState, useEffect } from 'react';
import { Globe, ToggleLeft, ToggleRight, Star, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const LanguageManagement = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLanguages();
    }, []);

    const [error, setError] = useState(null);

    const fetchLanguages = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await adminApi.getLanguages();
            console.log('Languages API Response:', res);

            if (res && res.data) {
                // Handle different response structures gracefully
                const langs = res.data.languages || (Array.isArray(res.data) ? res.data : []);
                setLanguages(langs);
            } else {
                setLanguages([]);
            }
        } catch (error) {
            console.error('Failed to fetch languages', error);
            setError('Failed to load languages. Please check if the admin service is running.');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            if (currentStatus) {
                await adminApi.disableLanguage(id);
            } else {
                await adminApi.enableLanguage(id);
            }
            fetchLanguages();
        } catch (error) {
            console.error('Failed to toggle status', error);
        }
    };

    const setDefault = async (id) => {
        try {
            await adminApi.setDefaultLanguage(id);
            fetchLanguages();
        } catch (error) {
            console.error('Failed to set default', error);
        }
    };

    const getFlagEmoji = (countryCode) => {
        if (!countryCode) return '🌍';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-pink-500" size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg mb-4">
                    {error}
                </div>
                <button
                    onClick={fetchLanguages}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    const activeCount = languages.filter(l => l.isActive).length;
    const defaultLang = languages.find(l => l.isDefault)?.name || 'None';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Language Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage supported languages and localization</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Globe className="text-blue-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Languages</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{languages.length}</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <ToggleRight className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Active Languages</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                {activeCount}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Star className="text-yellow-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Default Language</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                {defaultLang}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Languages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language) => (
                    <div key={language.id} className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{getFlagEmoji(language.flagCode)}</span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800 dark:text-white">{language.name}</h3>
                                        {language.isDefault && (
                                            <Star className="text-yellow-500 fill-yellow-500" size={14} />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{language.code.toUpperCase()}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${language.isActive
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                {language.isActive ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">{language.users.toLocaleString()}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (language.isDefault) {
                                        alert("You cannot disable the default language. Please set another language as default first.");
                                        return;
                                    }
                                    toggleStatus(language.id, language.isActive);
                                }}
                                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${language.isActive
                                    ? 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                    } ${language.isDefault ? 'opacity-50 cursor-not-allowed' : ''}`}
                            // removed disabled attribute to allow click for alert, added visual cue instead
                            >
                                {language.isActive ? 'Disable' : 'Enable'}
                            </button>
                            {!language.isDefault && language.isActive && (
                                <button
                                    onClick={() => setDefault(language.id)}
                                    className="flex-1 py-2 rounded-xl text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition-all"
                                >
                                    Set Default
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageManagement;
