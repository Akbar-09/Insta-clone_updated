import { Download } from 'lucide-react';

const ArchivingDownloading = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Archiving and downloading</h2>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Saving to Archive</h3>
                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Save story to Archive</div>
                        <div className="text-xs text-text-secondary">Automatically save your story to your archive so you don't have to save it to your phone. Only you can see your archive.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Save live to Archive</div>
                        <div className="text-xs text-text-secondary">Automatically save your live video to your archive so you don't have to save it to your phone. Only you can see your archive. Live broadcasts are archived for 30 days.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Downloading your data</h3>
                <div className="p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Download className="text-text-primary" size={20} />
                        <div>
                            <div className="text-base font-medium">Download your information</div>
                            <div className="text-xs text-text-secondary">Get a copy of what you've shared on Jaadoe.</div>
                        </div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchivingDownloading;
