import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAds } from '../../api/adApi';
import {
    Plus,
    Info,
    ChevronDown,
    ChevronRight,
    CreditCard,
    LayoutDashboard
} from 'lucide-react';

import CreateAdModal from '../CreateAdModal';

const getProxiedUrl = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return url;

    // Convert absolute local gateway URLs to relative to use Vite proxy
    // This handles http://localhost:5000, http://127.0.0.1:5000, etc.
    try {
        if (url.startsWith('http://localhost:5000') || url.startsWith('http://127.0.0.1:5000')) {
            return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, '');
        }

        if (url.includes('r2.dev')) {
            const parts = url.split('.dev/');
            if (parts.length > 1) {
                return `/api/v1/media/files/${parts[1]}`;
            }
        }
        if (url.includes('/media/files') && !url.includes('/api/v1/')) {
            return url.replace('/media/files', '/api/v1/media/files');
        }
    } catch (e) {
        console.warn('Ad URL proxying failed:', e);
    }
    return url;
};

const AdToolsTab = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Filter states
    const [filterSort, setFilterSort] = useState('Most recent');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterGoal, setFilterGoal] = useState('All');

    // Dropdown state
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchAds = useCallback(async () => {
        setLoading(true);
        try {
            // In a real app, we would pass these filters to the API
            const res = await getAds();
            if (res.data.status === 'success') {
                setAds(res.data.data);
            }
        } catch (e) {
            console.error('Ads fetch error', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAds();
    }, [fetchAds, filterSort, filterStatus, filterGoal]);

    const handleModalClose = (shouldRefresh) => {
        setIsCreateModalOpen(false);
        if (shouldRefresh === true) {
            fetchAds();
        }
    };

    const FilterDropdown = ({ id, label, options, selected, onSelect }) => {
        const isOpen = activeDropdown === id;

        // Determine label text: if selected is 'All', show original label, else show selected
        // But for Sort, we always show selected. For others, let's follow the screenshot logic:
        // Recent -> Most recent (selected)
        // Status -> Status (if All) or Selected Status
        // Goal -> Goal (if All) or Selected Goal

        let buttonText = label;
        if (id === 'sort') buttonText = selected;
        else if (selected !== 'All') buttonText = selected;

        return (
            <div className="relative">
                <button
                    onClick={() => setActiveDropdown(isOpen ? null : id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${isOpen || (selected !== 'All' && id !== 'sort') ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-gray-100 dark:bg-[#262626] border-transparent hover:bg-gray-200 dark:hover:bg-[#333]'}`}
                >
                    {buttonText}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#262626] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 mb-1">
                            {id === 'sort' ? 'Sort by' : `Filter by ${id}`}
                        </div>
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onSelect(option);
                                    setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex justify-between items-center"
                            >
                                <span className={selected === option ? 'font-bold' : ''}>{option}</span>
                                {selected === option && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8" ref={dropdownRef}>
            {/* Left Column - Manage Ads */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Manage ads</h2>
                    <Info size={16} className="text-gray-500" />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    <FilterDropdown
                        id="sort"
                        label="Sort by"
                        options={['Most recent', 'Most views']}
                        selected={filterSort}
                        onSelect={setFilterSort}
                    />
                    <FilterDropdown
                        id="status"
                        label="Status"
                        options={['All', 'Active', 'Paused', 'Completed', 'Drafts', 'Not delivering']}
                        selected={filterStatus}
                        onSelect={setFilterStatus}
                    />
                    <FilterDropdown
                        id="goal"
                        label="Goal"
                        options={['All', 'Profile visits', 'Website visits', 'Purchases', 'Messages']}
                        selected={filterGoal}
                        onSelect={setFilterGoal}
                    />
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : ads.length === 0 ? (
                    // Empty State
                    <div className="bg-white dark:bg-black rounded-lg py-12 flex flex-col items-center text-center">
                        <div className="w-24 h-24 mb-6 relative">
                            {/* Simple illustration mimicking the screenshot */}
                            <div className="absolute inset-0 bg-pink-50 rounded-full flex items-center justify-center">
                                <LayoutDashboard size={40} className="text-pink-500" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                <div className="bg-blue-500 rounded-full p-1">
                                    <TrendingUpIcon size={12} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Let more people see what you're creating</h3>
                        <p className="text-gray-500 text-sm mb-8">Boost your content into ads.</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#0095F6] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#00376b] transition-colors"
                        >
                            Boost content
                        </button>
                    </div>
                ) : (
                    // Ads List
                    <div className="space-y-4">
                        {ads.map((ad) => (
                            <div key={ad.id} className="bg-white dark:bg-[#121212] p-4 rounded-xl border border-border flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    {ad.mediaUrl ? (
                                        ad.mediaType === 'VIDEO' ? (
                                            <video
                                                src={getProxiedUrl(ad.mediaUrl)}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                onMouseOver={e => e.target.play()}
                                                onMouseOut={e => e.target.pause()}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.style.display = 'none';
                                                    e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-[10px] font-bold">AD</div>';
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={getProxiedUrl(ad.mediaUrl)}
                                                alt=""
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://ui-avatars.com/api/?name=Ad&background=f3f4f6&color=9ca3af&size=128';
                                                }}
                                            />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">AD</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-sm">{ad.title || 'Untitled Ad'}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{ad.status}</p>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Budget: ${ad.budget?.dailyBudget}/day
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column - Create & Tools */}
            <div className="w-full lg:w-[400px] space-y-8">
                {/* Create Section */}
                <div>
                    <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Create your next ad</h3>
                    <div
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-between p-4 bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-[#262626] rounded-lg flex items-center justify-center">
                                <Plus size={24} className="text-gray-900 dark:text-white" />
                            </div>
                            <span className="font-medium">Create ad</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </div>
                </div>

                {/* Other Tools Section */}
                <div>
                    <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Other tools</h3>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#121212] hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                        <div className="flex items-center gap-4">
                            <CreditCard size={24} className="text-gray-900 dark:text-white" />
                            <span className="font-medium">Billing and payments</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {isCreateModalOpen && <CreateAdModal onClose={handleModalClose} />}
        </div>
    );
};

// Helper icon component for the illustration
const TrendingUpIcon = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

export default AdToolsTab;
