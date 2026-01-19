import { Shield, MessageSquare, Plus } from 'lucide-react';

const CommentsSettings = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Comments</h2>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-4">Controls</h3>

                <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                        <div className="text-base font-medium">Allow comments from</div>
                        <div className="text-sm text-text-secondary">Everyone</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                        <div className="text-base font-medium">Block comments from</div>
                        <div className="text-sm text-text-secondary">0 people</div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-base font-bold mb-1">More Options</h3>
                <p className="text-xs text-text-secondary mb-4">Manage more comment settings.</p>

                <div className="p-4 border border-border rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="text-text-primary" size={20} />
                        <div>
                            <div className="text-base font-medium">Hidden Words</div>
                            <div className="text-xs text-text-secondary">Hide comments containing specific words.</div>
                        </div>
                    </div>
                    <div className="w-4 h-4 text-text-secondary rotate-[-90deg]">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-text-secondary">
                <MessageSquare size={16} />
                <span>Comments on your posts can be edited by the commenter.</span>
            </div>
        </div>
    );
};

export default CommentsSettings;
