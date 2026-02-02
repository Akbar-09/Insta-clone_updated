import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

// Helper to get flag emoji from country code
const getFlagEmoji = (countryCode) => {
    if (!countryCode || countryCode === 'Unknown') return '🌍';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

// Helper for coloring bars
const getGradient = (index) => {
    const gradients = [
        'from-cyan-400 to-cyan-600',
        'from-blue-400 to-blue-600',
        'from-yellow-400 to-yellow-600',
        'from-red-400 to-red-600',
        'from-green-400 to-green-600',
        'from-purple-400 to-purple-600',
        'from-pink-400 to-pink-600',
        'from-indigo-400 to-indigo-600',
        'from-orange-400 to-orange-600',
        'from-teal-400 to-teal-600'
    ];
    return gradients[index % gradients.length];
};

const CountryWiseUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const [summary, setSummary] = useState({ totalCountries: 0, totalUsers: 0, topCountry: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await adminApi.getGeoUserDistribution({
                search: searchTerm,
                limit: 50
            });

            if (res.success) {
                setCountries(res.data.countries);
                setSummary(res.data.summary);
            }
        } catch (error) {
            console.error("Failed to fetch geo users", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate max users for bar width calculation
    const maxUsers = countries.length > 0 ? Math.max(...countries.map(c => c.users)) : 0;

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
            <div className="glass-panel rounded-2xl p-6 min-h-[200px]">
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="animate-spin text-pink-500" size={32} />
                    </div>
                ) : countries.length > 0 ? (
                    <div className="space-y-4">
                        {countries.map((country, index) => {
                            const barWidth = maxUsers > 0 ? (country.users / maxUsers) * 100 : 0;
                            const flag = getFlagEmoji(country.code);
                            const color = getGradient(index);

                            return (
                                <div key={country.code} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{flag}</span>
                                            <span className="font-medium text-gray-800 dark:text-white">
                                                {country.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            {country.users} Users
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative w-full h-8 bg-gray-200/50 dark:bg-white/5 rounded-lg overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ease-out group-hover:opacity-90 flex items-center justify-end pr-3`}
                                            style={{ width: `${Math.max(barWidth, 5)}%` }} // Minimum width for visibility
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
                ) : (
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
                        {summary.totalCountries}
                    </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                        {summary.totalUsers}
                    </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Top Country</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1 flex items-center gap-2">
                        {summary.topCountry && (
                            <>
                                <span>{getFlagEmoji(summary.topCountry.code)}</span>
                                <span className="truncate">{summary.topCountry.name}</span>
                            </>
                        )}
                        {!summary.topCountry && <span>-</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryWiseUsers;
