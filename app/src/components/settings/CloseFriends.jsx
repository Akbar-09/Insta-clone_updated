import { Star, Search } from 'lucide-react';

const CloseFriends = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Close Friends</h2>

            <div className="mb-6">
                <p className="text-sm text-text-secondary">
                    We don't send notifications when you edit your Close Friends list.
                </p>
                <button className="text-sm font-semibold text-blue-500 hover:text-text-primary transition-colors mt-2">
                    How it works
                </button>
            </div>

            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#EFEFEF] dark:bg-[#262626] rounded-xl px-4 py-3 pl-10 focus:outline-none"
                />
                <div className="absolute left-3 top-3.5 text-text-secondary">
                    <Search size={18} />
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=50&h=50&fit=crop`}
                                    className="w-full h-full rounded-full object-cover"
                                    alt="User"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                            <div>
                                <div className="text-sm font-semibold">username_{i}</div>
                                <div className="text-xs text-text-secondary">Name {i}</div>
                            </div>
                        </div>
                        <button className="w-6 h-6 rounded-full border border-text-secondary flex items-center justify-center hover:bg-black/10 transition-colors">
                            {/* Empty circle for clear, Check with green for selected */}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-border flex justify-end gap-3 sticky bottom-4 bg-primary p-4 -mx-4">
                <button className="px-6 py-2 text-sm font-semibold text-text-primary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">Clear all</button>
                <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">Done</button>
            </div>
        </div>
    );
};

export default CloseFriends;
