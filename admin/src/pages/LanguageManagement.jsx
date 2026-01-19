import React, { useState } from 'react';
import { Globe, ToggleLeft, ToggleRight, Star } from 'lucide-react';

const LanguageManagement = () => {
    const [languages, setLanguages] = useState([
        { id: 1, name: 'English', code: 'en', flag: '🇺🇸', users: 18500, status: 'active', isDefault: true },
        { id: 2, name: 'Spanish', code: 'es', flag: '🇪🇸', users: 12300, status: 'active', isDefault: false },
        { id: 3, name: 'French', code: 'fr', flag: '🇫🇷', users: 9800, status: 'active', isDefault: false },
        { id: 4, name: 'German', code: 'de', flag: '🇩🇪', users: 7600, status: 'active', isDefault: false },
        { id: 5, name: 'Italian', code: 'it', flag: '🇮🇹', users: 5400, status: 'inactive', isDefault: false },
        { id: 6, name: 'Portuguese', code: 'pt', flag: '🇵🇹', users: 6200, status: 'active', isDefault: false },
        { id: 7, name: 'Japanese', code: 'ja', flag: '🇯🇵', users: 4800, status: 'active', isDefault: false },
        { id: 8, name: 'Chinese', code: 'zh', flag: '🇨🇳', users: 8900, status: 'inactive', isDefault: false },
    ]);

    const toggleStatus = (id) => {
        setLanguages(languages.map(lang =>
            lang.id === id ? { ...lang, status: lang.status === 'active' ? 'inactive' : 'active' } : lang
        ));
    };

    const setDefault = (id) => {
        setLanguages(languages.map(lang => ({
            ...lang,
            isDefault: lang.id === id
        })));
    };

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
                                {languages.filter(l => l.status === 'active').length}
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
                                {languages.find(l => l.isDefault)?.name}
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
                                <span className="text-4xl">{language.flag}</span>
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
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${language.status === 'active'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                {language.status}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Users</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">{language.users.toLocaleString()}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleStatus(language.id)}
                                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${language.status === 'active'
                                        ? 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                            >
                                {language.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                            {!language.isDefault && language.status === 'active' && (
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
