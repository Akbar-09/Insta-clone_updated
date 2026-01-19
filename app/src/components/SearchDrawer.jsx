import { forwardRef } from 'react';
import { X, XCircle } from 'lucide-react';


const MOCK_RECENT = [
    { id: 1, username: 'brandhousemumbraa', name: 'Azman khan', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop' },
    { id: 2, username: 'aliyaaa.shk_', name: 'aliyaaa💜', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' }
];

const SearchDrawer = forwardRef(({ isOpen, onClose }, ref) => {
    if (!isOpen) return null;

    return (
        <div ref={ref} className="absolute top-0 left-[72px] bottom-0 w-[397px] bg-primary border-r border-border rounded-r-2xl py-6 z-[99] shadow-[4px_0_24px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="px-6 pb-9 pt-3">
                <h2 className="text-2xl font-semibold">Search</h2>
            </div>

            <div className="mx-4 mb-6 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-secondary border-none rounded-lg px-4 py-3 text-base outline-none placeholder:text-text-secondary placeholder:font-light"
                    autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex">
                    <XCircle size={16} color="#c7c7c7" />
                </div>
            </div>

            <div className="flex justify-between px-6 pb-3 mt-2.5">
                <h3 className="text-base font-semibold">Recent</h3>
                <button className="text-blue-btn font-semibold text-sm cursor-pointer hover:text-blue-btn-hover bg-transparent border-none">Clear All</button>
            </div>

            <div className="flex-grow overflow-y-auto">
                {MOCK_RECENT.map(user => (
                    <div key={user.id} className="flex items-center px-6 py-2 cursor-pointer hover:bg-secondary">
                        <img src={user.avatar} alt={user.username} className="w-11 h-11 rounded-full mr-3 object-cover" />
                        <div className="flex-grow flex flex-col">
                            <span className="font-semibold text-sm text-text-primary">{user.username}</span>
                            <span className="text-text-secondary text-sm">{user.name}</span>
                        </div>
                        <button className="bg-transparent border-none cursor-pointer p-1 text-text-secondary">
                            <X size={20} color="#737373" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});

SearchDrawer.displayName = 'SearchDrawer';

export default SearchDrawer;
