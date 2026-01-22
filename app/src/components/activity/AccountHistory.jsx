import { useState, useEffect } from 'react';
import {
    ChevronDown, ChevronRight, User, AtSign, PenSquare, Mail,
    Eye, Key, Info, MessageCircle, Shield, Lock, Calendar, X, ArrowUp, ArrowDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAccountHistory } from '../../api/activityApi';

const AccountHistory = () => {
    const { user, token } = useAuth();
    const [historyGroups, setHistoryGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [sort, setSort] = useState('newest'); // 'newest' | 'oldest'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [sort, startDate, endDate, token]);

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const params = {
                sort,
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            };

            const res = await getAccountHistory(params);
            const data = res.data.data || [];

            // Group data
            const groups = groupHistory(data);
            setHistoryGroups(groups);

        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const groupHistory = (items) => {
        const groups = {};
        const currentYear = new Date().getFullYear();

        items.forEach(item => {
            const date = new Date(item.createdAt);
            const year = date.getFullYear();
            const key = year === currentYear ? 'This year' : 'Earlier';
            // Or group by specific year if not current year
            // const key = year === currentYear ? 'This year' : year.toString();

            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
        });

        // Convert to array and sort keys if needed (This year first)
        // If sorting by oldest, order might need to be reversed? 
        // The mock shows "This year" then "Earlier". 
        // If sorting is 'newest', 'This year' comes first.
        // If sorting is 'oldest', 'Earlier' (or oldest year) comes first.

        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (sort === 'newest') {
                if (a === 'This year') return -1;
                if (b === 'This year') return 1;
                if (a === 'Earlier') return 1; // Earlier comes last
                if (b === 'Earlier') return -1;
                return b.localeCompare(a); // Descending years
            } else {
                if (a === 'Earlier') return -1;
                if (b === 'Earlier') return 1;
                if (a === 'This year') return 1;
                if (b === 'This year') return -1;
                return a.localeCompare(b); // Ascending years
            }
        });

        return sortedKeys.map(key => ({
            section: key,
            items: groups[key]
        }));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'NAME_CHANGE': return User;
            case 'BIO_CHANGE': return PenSquare;
            case 'EMAIL_CHANGE': return Mail;
            case 'PASSWORD_CHANGE': return Key;
            case 'USERNAME_CHANGE': return AtSign;
            case 'PRIVACY_CHANGE': return Eye;
            case 'ACCOUNT_CREATED': return Info;
            case 'LOGIN': return Shield;
            default: return Info;
        }
    };

    const getTitle = (type) => {
        switch (type) {
            case 'NAME_CHANGE': return 'Name';
            case 'BIO_CHANGE': return 'Bio';
            case 'EMAIL_CHANGE': return 'Email';
            case 'PASSWORD_CHANGE': return 'Password';
            case 'USERNAME_CHANGE': return 'Username';
            case 'PRIVACY_CHANGE': return 'Account privacy';
            case 'ACCOUNT_CREATED': return 'Account created';
            case 'LOGIN': return 'Login activity';
            default: return 'Account update';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Header */}
            <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-transparent text-text-primary">
                <h2 className="text-xl font-bold mb-2">About account history</h2>
                <p className="text-sm text-text-secondary text-center max-w-[400px]">
                    Review changes that you've made to your account since you created it.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between px-6 mb-2">
                <div className="flex items-center">
                    <div
                        className="flex items-center text-sm font-semibold text-text-primary cursor-pointer select-none hover:opacity-70"
                        onClick={() => setShowFilterModal(true)}
                    >
                        {sort === 'newest' ? 'Newest to oldest' : 'Oldest to newest'}
                        <ChevronDown size={16} className="ml-1" />
                    </div>
                    <button
                        className="ml-4 font-semibold text-sm text-blue-btn cursor-pointer hover:text-blue-600"
                        onClick={() => setShowFilterModal(true)}
                    >
                        Sort & Filter
                    </button>
                </div>
                {/* <button className="text-sm font-semibold text-blue-btn cursor-pointer px-4 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
                    Select
                </button> */}
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">{error}</div>
                ) : historyGroups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-xl font-bold mb-2">No history found</div>
                        <p className="text-text-secondary">Changes to your account will appear here.</p>
                    </div>
                ) : (
                    <div className="flex flex-col pb-10">
                        {historyGroups.map((section, idx) => (
                            <div key={idx}>
                                <div className="px-6 py-3 sticky top-0 bg-white dark:bg-black z-10">
                                    <span className="font-bold text-base text-text-primary">{section.section}</span>
                                </div>
                                <div>
                                    {section.items.map((item) => {
                                        const Icon = getIcon(item.type);
                                        return (
                                            <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors group">
                                                <div className="flex items-center overflow-hidden">
                                                    {/* Icon Box */}
                                                    <div className="mr-4 flex-shrink-0">
                                                        {Icon && <Icon size={24} className="text-text-primary" />}
                                                    </div>
                                                    {/* Text */}
                                                    <div className="flex flex-col min-w-0 pr-4">
                                                        <span className="text-base font-bold text-text-primary leading-5 mb-0.5">{getTitle(item.type)}</span>
                                                        <span className="text-sm text-text-secondary truncate">
                                                            {item.description || item.type}
                                                            <span className="text-text-secondary mx-1">·</span>
                                                            {formatDate(item.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* <ChevronRight size={20} className="text-text-secondary flex-shrink-0" /> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
                            <h3 className="font-bold text-lg text-center flex-1">Sort & Filter</h3>
                            <button onClick={() => setShowFilterModal(false)}><X size={24} /></button>
                        </div>

                        <div className="p-4 space-y-6">
                            {/* Sort */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">Sort by</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                                        <span className="flex items-center">
                                            <ArrowUp size={18} className="mr-3" />
                                            Newest to oldest
                                        </span>
                                        <input
                                            type="radio"
                                            name="sort"
                                            checked={sort === 'newest'}
                                            onChange={() => setSort('newest')}
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                                        <span className="flex items-center">
                                            <ArrowDown size={18} className="mr-3" />
                                            Oldest to newest
                                        </span>
                                        <input
                                            type="radio"
                                            name="sort"
                                            checked={sort === 'oldest'}
                                            onChange={() => setSort('oldest')}
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wider">Date range</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded bg-transparent text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full p-2 border border-gray-300 dark:border-neutral-600 rounded bg-transparent text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-neutral-700 flex gap-3">
                            <button
                                onClick={() => {
                                    setSort('newest');
                                    setStartDate('');
                                    setEndDate('');
                                    setShowFilterModal(false);
                                }}
                                className="flex-1 py-2.5 font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setShowFilterModal(false)}
                                className="flex-1 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountHistory;
