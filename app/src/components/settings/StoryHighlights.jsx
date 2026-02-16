const StoryHighlights = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Story and live</h2>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Viewing</h3>
                <div className="flex items-center justify-between py-3 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">Hide story and live from</div>
                        <div className="text-sm text-text-secondary">0 People</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Replying</h3>
                <div className="flex items-center justify-between py-3">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Allow message replies</div>
                        <div className="text-xs text-text-secondary">Choose who can reply to your story.</div>
                    </div>
                    {/* Simplified selection UI */}
                    <span className="text-sm text-text-secondary">Everyone</span>
                </div>

                <div className="pl-4 border-l-2 border-border ml-2 flex flex-col gap-3 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="replies" className="custom-radio" defaultChecked />
                        <span className="text-sm">Everyone</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="replies" className="custom-radio" />
                        <span className="text-sm">People you follow</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="replies" className="w-4 h-4 accent-black dark:accent-white" />
                        <span className="text-sm">Off</span>
                    </label>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Saving</h3>

                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Save story to Archive</div>
                        <div className="text-xs text-text-secondary">Automatically save your story to your archive so you don't have to save it to your phone. Only you can see your archive.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="toggle-pill"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Save story to Gallery</div>
                        <div className="text-xs text-text-secondary">Automatically save your story to your phone's gallery.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="toggle-pill"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default StoryHighlights;
