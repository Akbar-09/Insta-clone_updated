import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CountryWiseUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data - Country-wise user statistics
    const countryData = [
        { id: 1, country: 'India', users: 382, flag: '🇮🇳', color: 'from-cyan-400 to-cyan-600' },
        { id: 2, country: 'United States', users: 158, flag: '🇺🇸', color: 'from-blue-400 to-blue-600' },
        { id: 3, country: 'Brazil', users: 137, flag: '🇧🇷', color: 'from-yellow-400 to-yellow-600' },
        { id: 4, country: 'Turkey', users: 9, flag: '🇹🇷', color: 'from-red-400 to-red-600' },
        { id: 5, country: 'Bangladesh', users: 6, flag: '🇧🇩', color: 'from-green-400 to-green-600' },
        { id: 6, country: 'Indonesia', users: 6, flag: '🇮🇩', color: 'from-red-400 to-red-500' },
        { id: 7, country: 'Ghana', users: 6, flag: '🇬🇭', color: 'from-yellow-500 to-green-600' },
        { id: 8, country: 'Nigeria', users: 6, flag: '🇳🇬', color: 'from-green-500 to-green-700' },
        { id: 9, country: 'Jordan', users: 3, flag: '🇯🇴', color: 'from-black to-gray-700' },
        { id: 10, country: 'Russia', users: 3, flag: '🇷🇺', color: 'from-blue-500 to-red-500' },
        { id: 11, country: 'Pakistan', users: 3, flag: '🇵🇰', color: 'from-green-600 to-green-800' },
        { id: 12, country: 'Complore dhalia', users: 2, flag: '🌍', color: 'from-purple-400 to-purple-600' },
        { id: 13, country: 'China', users: 2, flag: '🇨🇳', color: 'from-red-600 to-yellow-500' },
    ];

    // Calculate max users for bar width calculation
    const maxUsers = Math.max(...countryData.map(c => c.users));

    // Filter countries based on search
    const filteredCountries = countryData.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Dashboard</span>
                    <span>•</span>
                    <span className="text-gray-700 dark:text-gray-200">Country Wise Users</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Country Wise Users</h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl pl-10 pr-4 py-2 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
            </div>

            {/* Country List with Horizontal Bars */}
            <div className="glass-panel rounded-2xl p-6">
                <div className="space-y-4">
                    {filteredCountries.map((country) => {
                        const barWidth = (country.users / maxUsers) * 100;

                        return (
                            <div key={country.id} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{country.flag}</span>
                                        <span className="font-medium text-gray-800 dark:text-white">
                                            {country.country}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        {country.users} Users
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative w-full h-8 bg-gray-200/50 dark:bg-white/5 rounded-lg overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${country.color} transition-all duration-500 ease-out group-hover:opacity-90 flex items-center justify-end pr-3`}
                                        style={{ width: `${barWidth}%` }}
                                    >
                                        <span className="text-white text-xs font-bold drop-shadow-lg">
                                            {country.users}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredCountries.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <p>No countries found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Countries</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                        {countryData.length}
                    </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                        {countryData.reduce((sum, c) => sum + c.users, 0)}
                    </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Top Country</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1 flex items-center gap-2">
                        <span>{countryData[0].flag}</span>
                        <span>{countryData[0].country}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryWiseUsers;
