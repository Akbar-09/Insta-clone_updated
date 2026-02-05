import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const STICKERS = [
    { id: '1', url: 'https://cdn-icons-png.flaticon.com/512/3248/3248450.png', category: 'fun' },
    { id: '2', url: 'https://cdn-icons-png.flaticon.com/512/3248/3248439.png', category: 'fun' },
    { id: '3', url: 'https://cdn-icons-png.flaticon.com/512/3248/3248435.png', category: 'fun' },
    { id: '4', url: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png', category: 'love' },
    { id: '5', url: 'https://cdn-icons-png.flaticon.com/512/2589/2589182.png', category: 'love' },
    { id: '6', url: 'https://cdn-icons-png.flaticon.com/512/2589/2589190.png', category: 'love' },
    { id: '7', url: 'https://cdn-icons-png.flaticon.com/512/4160/4160751.png', category: 'reaction' },
    { id: '8', url: 'https://cdn-icons-png.flaticon.com/512/4160/4160755.png', category: 'reaction' },
    { id: '9', url: 'https://cdn-icons-png.flaticon.com/512/4160/4160752.png', category: 'reaction' },
];

const StickerPicker = ({ onSelect, onClose }) => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = STICKERS.filter(s =>
        (activeCategory === 'all' || s.category === activeCategory) &&
        (search === '' || s.category.includes(search.toLowerCase()))
    );

    return (
        <div className="absolute bottom-full mb-2 left-0 w-[300px] h-[400px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-border flex flex-col overflow-hidden z-[100]">
            <div className="p-3 border-b border-border">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search stickers"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm"
                    />
                </div>
            </div>

            <div className="flex px-3 py-2 gap-2 border-b border-border overflow-x-auto scrollbar-none">
                {['all', 'fun', 'love', 'reaction'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-3 gap-2">
                {filtered.map(sticker => (
                    <button
                        key={sticker.id}
                        onClick={() => onSelect(sticker)}
                        className="aspect-square p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <img src={sticker.url} className="w-full h-full object-contain" alt="Sticker" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StickerPicker;
