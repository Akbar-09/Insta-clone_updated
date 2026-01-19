const SharingSettings = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Sharing and Remixes</h2>

            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Sharing</h3>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Allow others to share your story</div>
                        <div className="text-xs text-text-secondary">People can share your story if you tag them.</div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Allow sharing to messages</div>
                        <div className="text-xs text-text-secondary">Let people share your story in messages.</div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Remixes</h3>
                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Allow Remixing</div>
                        <div className="text-xs text-text-secondary">Let anyone create a reel including your public videos.</div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">External Apps</h3>
                <div className="flex justify-between items-center py-4 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">See apps you've authorized</div>
                        <div className="text-sm text-text-secondary">Manage apps and websites</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharingSettings;
