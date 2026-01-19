import { EyeOff, ListPlus } from 'lucide-react';

const HiddenWords = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Hidden Words</h2>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-4">Offensive words and phrases</h3>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Hide comments</div>
                        <div className="text-xs text-text-secondary">
                            Comments that may be offensive will be hidden in a separate section of your posts, reels and lives.
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Advanced comment filtering</div>
                        <div className="text-xs text-text-secondary">
                            Hide even more comments that may contain offensive words and phrases.
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Hide message requests</div>
                        <div className="text-xs text-text-secondary">
                            Message requests that may be offensive will be moved to the hidden requests folder.
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-4">Custom words and phrases</h3>
                <div className="p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <ListPlus className="text-text-primary" size={20} />
                        <div>
                            <div className="text-base font-medium">Manage custom words and phrases</div>
                            <div className="text-xs text-text-secondary">Add words separated by commas.</div>
                        </div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Hide comments</div>
                        <div className="text-xs text-text-secondary">
                            Hide comments that contain custom words or phrases.
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default HiddenWords;
