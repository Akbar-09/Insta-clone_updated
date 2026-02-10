import React, { useState, useEffect, useRef } from 'react';
import { getContentInsights } from '../../api/insightApi';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Eye,
    ChevronDown,
    LayoutGrid,
    Film,
    Image as ImageIcon,
    PlayCircle
} from 'lucide-react';

const ContentInsightsTab = ({ range }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedType, setSelectedType] = useState('All');
    const [selectedMetric, setSelectedMetric] = useState('Accounts engaged');
    const [selectedSort, setSelectedSort] = useState('Highest');

    // Dropdown States
    const [openDropdown, setOpenDropdown] = useState(null);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Map UI filters to API params
                const typeParam = selectedType === 'All' ? 'ALL' : selectedType.toUpperCase().slice(0, -1);
                // Simple mapping for demo purposes. Real API would need more complex mapping.
                const sortParam = selectedSort === 'Newest' ? 'newest' : 'highest_engagement';

                const res = await getContentInsights(typeParam, sortParam, range);
                if (res.data.status === 'success') {
                    setData(res.data.data);
                }
            } catch (e) {
                console.error('Content Insights fetch error', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [range, selectedType, selectedSort, selectedMetric]);

    const FilterDropdown = ({ label, options, selected, onSelect, id }) => {
        const isOpen = openDropdown === id;

        return (
            <div className="relative">
                <button
                    onClick={() => setOpenDropdown(isOpen ? null : id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#262626] rounded-full text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#333] transition-colors whitespace-nowrap"
                >
                    {selected}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#262626] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onSelect(option);
                                    setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex justify-between items-center group"
                            >
                                <span className={selected === option ? 'font-bold' : ''}>{option}</span>
                                {selected === option && <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6" ref={dropdownRef}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Content insights</h2>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
                <FilterDropdown
                    id="type"
                    selected={selectedType}
                    options={['All', 'Posts', 'Reels', 'Stories']}
                    onSelect={setSelectedType}
                />
                <FilterDropdown
                    id="metric"
                    selected={selectedMetric}
                    options={[
                        'Accounts engaged',
                        'Accounts reached',
                        'Interactions',
                        'Shares',
                        'Views',
                        'Comments',
                        'Likes',
                        'Saves'
                    ]}
                    onSelect={setSelectedMetric}
                />
                <FilterDropdown
                    id="sort"
                    selected={selectedSort}
                    options={['Newest', 'Highest', 'Lowest']}
                    onSelect={setSelectedSort}
                />
            </div>

            {/* Grid Content */}
            {loading ? (
                <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 dark:bg-[#121212] animate-pulse" />
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#121212] rounded-xl border border-border">
                    <LayoutGrid size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold">No content found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-1">
                    {data.map((item) => (
                        <div key={item.contentId} className="aspect-square relative group bg-gray-100 dark:bg-[#262626] overflow-hidden cursor-pointer">
                            {/* Placeholder for actual media - using random color/icon for now */}
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400">
                                {item.contentType === 'POST' && <ImageIcon size={24} />}
                                {item.contentType === 'REEL' && <Film size={24} />}
                                {item.contentType === 'STORY' && <PlayCircle size={24} />}
                            </div>

                            {/* Overlay Stats */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
                                <div className="text-xl font-bold">{item.totalViews || 0}</div>
                                <div className="text-xs uppercase tracking-wider font-medium">{selectedMetric.split(' ')[0]}</div>
                            </div>

                            {/* Type Indicator */}
                            <div className="absolute top-2 right-2 text-white drop-shadow-md">
                                {item.contentType === 'REEL' && <Film size={16} />}
                                {item.contentType === 'STORY' && <PlayCircle size={16} />}
                                {item.contentType === 'POST' && item.mediaCount > 1 && <LayoutGrid size={16} />}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentInsightsTab;
