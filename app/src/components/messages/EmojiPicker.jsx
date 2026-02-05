import { useState } from 'react';
import { Search, Smile, Heart, Coffee, Bike, Map, Lightbulb, Music, Flag, Plane } from 'lucide-react';

const EMOJI_DATA = [
    { category: 'Smileys & people', emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'] },
    { category: 'Animals & nature', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🐘', '🦏', '🦛', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦦', '🦥', '🐁', '🐀', '🐾'] },
    { category: 'Food & drink', emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌽', '🥕', '🧄', ' onion', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕️', '🍵', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥤'] },
    { category: 'Travel & places', emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛵', '🚲', '🛴', '🛹', '🛶', '🚤', '🛳', '⛴', '🚢', '✈️', '🛩', '🛫', '🛬', '🚁', '🛰', '🚀', '🛸', '🛰', '🏠', '🏡', '🏘', '🏠', '🏗', '🏢', '🏬', '🏡', '🏚', '⛪️', '🕌', '🕍', '⛩', '🏢', '🏬', '🏫', '🏥', '🏢', '🏨', '🏦', '🏪', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '🗾', '🌋', '🗻', '🌄', '🌅', '🏜', '🏖', '🏝', '🏙', '🌆', '🌇'] },
    { category: 'Activities', emojis: ['⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑', '🏏', '🥅', '⛳️', '🏹', '🎣', '🥊', '🥋', '⛸', '🎿', '🛷', '🥌', '🏂', '🏋️', '🤺', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🎫', '🎟', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟', '🎯', '🎳', '🎮', '🎰', '🧩'] },
    { category: 'Objects', emojis: ['⌚️', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛️', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧳', '⌛️', '🚿', '🛁', '🛀', '🧼', '🧽', '🧹', '🧺', '🧻', '🧴', '🧵', '🧶', '🧷', '🧹', '🧺', '🧻', '🧴', '🧵', '🧶', '🧷', '👓', '🕶', '👓', '🕶', '👕', '👕', '👕', '👖', '🧣', '🧤', '🧥', '👚', '👗', '👘', '👕', '👖', '🧣', '🧤', '🧥', '👚', '👗', '👘'] },
    { category: 'Symbols', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯️', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤'] }
];

const CATEGORIES = [
    { name: 'Smileys & people', icon: Smile },
    { name: 'Animals & nature', icon: Heart },
    { name: 'Food & drink', icon: Coffee },
    { name: 'Travel & places', icon: Map },
    { name: 'Activities', icon: Bike },
    { name: 'Objects', icon: Lightbulb },
    { name: 'Symbols', icon: Flag }
];

const EmojiPicker = ({ onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Smileys & people');

    const filteredData = EMOJI_DATA.map(cat => ({
        ...cat,
        emojis: cat.emojis.filter(e => searchTerm ? true : true) // Simplistic filter, could search by name if data had it
    })).filter(cat => cat.emojis.length > 0);

    // In a real app we'd have search aliases for each emoji. 
    // For this prototype, search will just filter by category if we wanted, or we just show them.

    return (
        <div className="absolute bottom-[70px] left-0 w-[315px] h-[400px] bg-white dark:bg-[#262626] rounded-xl shadow-2xl border border-gray-200 dark:border-[#363636] flex flex-col z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search emoji"
                        className="w-full bg-gray-100 dark:bg-[#363636] rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-0 text-text-primary placeholder-text-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
                {filteredData.map((category) => (
                    <div key={category.category} id={category.category.replace(/\s+/g, '-')} className="mb-4">
                        <h3 className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1 lowercase first-letter:uppercase">
                            {category.category}
                        </h3>
                        <div className="grid grid-cols-8 gap-1">
                            {category.emojis.map((emoji, idx) => (
                                <button
                                    key={idx}
                                    className="text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                                    onClick={() => onSelect(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Tabs */}
            <div className="h-12 border-t border-gray-100 dark:border-[#363636] flex items-center justify-around text-gray-400 px-2">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.name}
                            className={`p-1.5 rounded-lg transition-colors ${activeCategory === cat.name ? 'text-text-primary bg-gray-100 dark:bg-gray-800' : 'hover:text-text-primary'}`}
                            onClick={() => {
                                setActiveCategory(cat.name);
                                document.getElementById(cat.name.replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            <Icon size={20} />
                        </button>
                    );
                })}
            </div>

            {/* Triangle indicator */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-[#262626] rotate-45 border-r border-b border-gray-200 dark:border-[#363636]" />
        </div>
    );
};

export default EmojiPicker;
