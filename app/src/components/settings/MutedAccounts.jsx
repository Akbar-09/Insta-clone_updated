import { VolumeX } from 'lucide-react';

const MutedAccounts = () => {
    return (
        <div className="flex flex-col w-full text-text-primary max-w-[600px]">
            <h2 className="text-xl font-bold mb-6">Muted Accounts</h2>

            <div className="mb-6">
                <p className="text-sm text-text-secondary mb-4">
                    Here are all the accounts you've muted. They won't know that you've muted them.
                </p>
            </div>

            {/* List Header */}
            <div className="flex gap-4 border-b border-border pb-2 mb-4">
                <div className="px-4 py-2 border-b-2 border-text-primary font-semibold text-sm cursor-pointer">Posts</div>
                <div className="px-4 py-2 text-text-secondary font-semibold text-sm cursor-pointer hover:text-text-primary transition-colors">Stories</div>
                <div className="px-4 py-2 text-text-secondary font-semibold text-sm cursor-pointer hover:text-text-primary transition-colors">Notes</div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
                <div className="w-16 h-16 rounded-full border-2 border-text-primary flex items-center justify-center mb-4 opacity-40">
                    <VolumeX size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">No muted accounts</h3>
                <p className="text-sm">You haven't muted anyone's posts.</p>
            </div>
        </div>
    );
};

export default MutedAccounts;
