const TagsMentions = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Tags and mentions</h2>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Who can tag you</h3>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Everyone</span>
                        <input type="radio" name="tags" className="w-5 h-5 accent-black dark:accent-white" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Allow tags from people you follow</span>
                        <input type="radio" name="tags" className="w-5 h-5 accent-black dark:accent-white" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Don't allow tags</span>
                        <input type="radio" name="tags" className="w-5 h-5 accent-black dark:accent-white" />
                    </label>
                </div>
            </div>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="mr-8">
                        <div className="text-base font-medium mb-1">Manually approve tags</div>
                        <div className="text-xs text-text-secondary">Review tags before they appear on your profile.</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mb-8 pt-6 border-t border-border">
                <h3 className="text-base font-bold mb-4">Who can mention you</h3>
                <p className="text-xs text-text-secondary mb-4">Choose who can @mention you to link your account in their stories, comments, live videos and captions. When people try to mention you, they'll see if you don't allow mentions.</p>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Everyone</span>
                        <input type="radio" name="mentions" className="w-5 h-5 accent-black dark:accent-white" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Allow mentions from people you follow</span>
                        <input type="radio" name="mentions" className="w-5 h-5 accent-black dark:accent-white" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium">Don't allow mentions</span>
                        <input type="radio" name="mentions" className="w-5 h-5 accent-black dark:accent-white" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TagsMentions;
