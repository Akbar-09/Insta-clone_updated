const MessagesReplies = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Messages and story replies</h2>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Message Controls</h3>
                <div className="flex justify-between items-center py-4 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">Message Controls</div>
                        <div className="text-sm text-text-secondary">Manage who can message you.</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Story replies</h3>
                <div className="flex justify-between items-center py-4 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">Story replies</div>
                        <div className="text-sm text-text-secondary">Manage who can reply to your stories.</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Show activity status</h3>
                <div className="flex justify-between items-center py-4 border-b border-border cursor-pointer">
                    <div>
                        <div className="text-base font-medium">Show activity status</div>
                        <div className="text-sm text-text-secondary">Allow accounts you follow and anyone you message to see when you were last active or are currently active on Jaadoe apps.</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesReplies;
